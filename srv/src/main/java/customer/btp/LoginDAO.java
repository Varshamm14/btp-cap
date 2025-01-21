package customer.btp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureQuery;

@Repository
public class LoginDAO {

    @Autowired
    private EntityManager entityManager;

    public int validateUserLogin(String username, String password) {
        StoredProcedureQuery storedProcedure = entityManager.createStoredProcedureQuery("LOGIN_VALIDATION");
        
        // Register all parameters according to the stored procedure definition
        storedProcedure.registerStoredProcedureParameter("userName", String.class, ParameterMode.IN);
        storedProcedure.registerStoredProcedureParameter("user_password", String.class, ParameterMode.IN);
        storedProcedure.registerStoredProcedureParameter("user_status", Integer.class, ParameterMode.OUT);
        storedProcedure.registerStoredProcedureParameter("EX_MESSAGE", String.class, ParameterMode.OUT);
        
        // Set input parameters
        storedProcedure.setParameter("userName", username);
        storedProcedure.setParameter("user_password", password);

        try {
            storedProcedure.execute();

            // Get output parameters
            Integer status = (Integer) storedProcedure.getOutputParameterValue("user_status");
            String message = (String) storedProcedure.getOutputParameterValue("EX_MESSAGE");

            if (status != null) {
                switch (status) {
                    case 1:  // Authentication successful
                        return 1;
                    case 0:  // User is inactive
                        return 0;
                    default: // Invalid credentials or other error
                        return -1;
                }
            }
        } catch (NoResultException e) {
            System.out.println("No data found for the given username and password.");
        } catch (Exception e) {
            // Handle other exceptions, possibly log the exception for further analysis
            e.printStackTrace();
        }
        return -1;
    }
}
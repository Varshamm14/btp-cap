package customer.btp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureQuery;

@Repository
public class LoginDAO {

    @Autowired
    private EntityManager entityManager;

    public int validateUserLogin(String username, String password) {
        // Create the stored procedure query for the LOGIN_VALIDATION procedure
        StoredProcedureQuery storedProcedure = entityManager.createStoredProcedureQuery("LOGIN_VALIDATION");

        // Register input and output parameters for the stored procedure
        // Register input parameters (userName and user_password) - Ensure parameter names match the ones in the stored procedure
        storedProcedure.registerStoredProcedureParameter("userName", String.class, ParameterMode.IN);
        storedProcedure.registerStoredProcedureParameter("user_password", String.class, ParameterMode.IN);
        
        // Register output parameters (user_status, EX_MESSAGE)
        storedProcedure.registerStoredProcedureParameter("user_status", Integer.class, ParameterMode.OUT);
        storedProcedure.registerStoredProcedureParameter("EX_MESSAGE", String.class, ParameterMode.OUT);

        // Bind the input parameters (username and password) to the stored procedure
        storedProcedure.setParameter("userName", username);  // Bind 'username' to the 'userName' parameter
        storedProcedure.setParameter("user_password", password);  // Bind 'password' to the 'user_password' parameter

        try {
            // Execute the stored procedure
            storedProcedure.execute();

            // Get output parameters after the stored procedure executes
            Integer status = (Integer) storedProcedure.getOutputParameterValue("user_status");
            String message = (String) storedProcedure.getOutputParameterValue("EX_MESSAGE");

            // Optional: Log the message for debugging purposes
            System.out.println("Stored Procedure Output: " + message);

            // Return the user status based on the stored procedure result
            if (status != null) {
                return status;  // Return the user status (0, 1, etc.)
            }
        } catch (Exception e) {
            // Log the exception for debugging
            e.printStackTrace();
        }

        // Default return value in case of errors (e.g., invalid credentials)
        return -1; // -1 indicates invalid credentials or an error
    }
}

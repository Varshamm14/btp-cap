package customer.btp;

import org.springframework.stereotype.Repository;
 
import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.StoredProcedureQuery;
 
@Repository
public class LoginDAO {
    @PersistenceContext
    private EntityManager entityManager;
 
    /* Validate Client Login */
    public int validateLogin(String username, String password) {
        try {
            // Initialize the stored procedure query
            StoredProcedureQuery sp_ValidateLogin = entityManager.createStoredProcedureQuery("LOGIN_VALIDATION");
 
            // Register parameters
            sp_ValidateLogin.registerStoredProcedureParameter(1, String.class, ParameterMode.IN);  // "USERNAME"
            sp_ValidateLogin.registerStoredProcedureParameter(2, String.class, ParameterMode.IN);  // "userPassword"
            sp_ValidateLogin.registerStoredProcedureParameter(3, Integer.class, ParameterMode.OUT); // "p_status"
            sp_ValidateLogin.registerStoredProcedureParameter(4, String.class, ParameterMode.OUT);  // "p_Message"
 
            // Set input parameters
            sp_ValidateLogin.setParameter(1, username);   // "USERNAME"
            sp_ValidateLogin.setParameter(2, password);   // "userPassword"
 
            // Execute the stored procedure
            sp_ValidateLogin.execute();
 
            // Retrieve output parameters
            int status = (Integer) sp_ValidateLogin.getOutputParameterValue(3);  // "p_status"
            String message = (String) sp_ValidateLogin.getOutputParameterValue(4);  // "p_Message"
 
            // Print output for debugging
            System.out.println("Status: " + status + ", Message: " + message);
 
            return status;  // Return the status (e.g., 1 for success, 0 for inactive, -1 for failure)
        } catch (Exception e) {
            e.printStackTrace();
            return -1;  // Return -1 in case of an error
        }
    }
}
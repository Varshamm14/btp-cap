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
        storedProcedure.registerStoredProcedureParameter("username", String.class, ParameterMode.IN);
        storedProcedure.registerStoredProcedureParameter("password", String.class, ParameterMode.IN);  
        storedProcedure.registerStoredProcedureParameter("status", Integer.class, ParameterMode.OUT);
        storedProcedure.registerStoredProcedureParameter("message", String.class, ParameterMode.OUT);     
        storedProcedure.setParameter("username", username);
        storedProcedure.setParameter("password", password);

        try{
        storedProcedure.execute();

        Integer status = (Integer) storedProcedure.getOutputParameterValue("p_status");
        String message = (String) storedProcedure.getOutputParameterValue("p_message"); 
        if (status != null) {
            if (status == 1) {  // Authentication successful
                return 1;  
            } else if (status == 0 && message.equals("The user is inactive")) {  // user is inactive
                return 0; 
            }
        }
    }catch (NoResultException e){
        System.out.println("No data found for the given username and password.");
    }catch (Exception e) {
        // Handle other exceptions, possibly log the exception for further analysis
        e.printStackTrace();
    }
        return -1;
    }
}

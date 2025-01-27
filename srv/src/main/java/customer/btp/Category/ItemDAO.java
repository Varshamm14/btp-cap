package customer.btp.Category;

import java.util.List;

import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.StoredProcedureQuery;

@Repository
public class ItemDAO {
    @PersistenceContext
    private EntityManager entityManager;

    /* Validate Item */
    public int validateItem(String itemName, String itemStatus) {
        try {
            // Initialize the stored procedure query
            StoredProcedureQuery sp_ValidateItem = entityManager.createStoredProcedureQuery("ITEM_VALIDATION");

            // Register parameters
            sp_ValidateItem.registerStoredProcedureParameter(1, String.class, ParameterMode.IN);  // "ITEM_NAME"
            sp_ValidateItem.registerStoredProcedureParameter(2, String.class, ParameterMode.IN);  // "ITEM_STATUS"
            sp_ValidateItem.registerStoredProcedureParameter(3, Integer.class, ParameterMode.OUT); // "p_status"
            sp_ValidateItem.registerStoredProcedureParameter(4, String.class, ParameterMode.OUT);  // "p_Message"

            // Set input parameters
            sp_ValidateItem.setParameter(1, itemName);   // "ITEM_NAME"
            sp_ValidateItem.setParameter(2, itemStatus); // "ITEM_STATUS"

            // Execute the stored procedure
            sp_ValidateItem.execute();

            // Retrieve output parameters
            int status = (Integer) sp_ValidateItem.getOutputParameterValue(3);  // "p_status"
            String message = (String) sp_ValidateItem.getOutputParameterValue(4);  // "p_Message"

            // Print output for debugging
            System.out.println("Status: " + status + ", Message: " + message);

            return status;  // Return the status (e.g., 1 for success, 0 for inactive, -1 for failure)
        } catch (Exception e) {
            e.printStackTrace();
            return -1;  // Return -1 in case of an error
        }
    }

    public static void createItem(String name, String description, String status) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createItem'");
    }

    public static List<Item> getAllItems() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAllItems'");
    }

    public Item getItemById(int id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getItemById'");
    }

    public void deleteItem(int id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteItem'");
    }
}

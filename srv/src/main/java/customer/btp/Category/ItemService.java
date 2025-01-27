package customer.btp.Category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class ItemService {
 
    @Autowired
    private ItemDAO itemDao;

    public void createItem(String name, String description, String status) {
        ItemDAO.createItem(name, description, status);
    }

    public List<Item> getAllItems() {
        return ItemDAO.getAllItems();
    }

    public Item getItemById(int id) {
        return itemDao.getItemById(id);
    }

    public void deleteItem(int id) {
        itemDao.deleteItem(id);
    }
}
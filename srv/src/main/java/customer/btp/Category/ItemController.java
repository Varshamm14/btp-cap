package customer.btp.Category;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
public class ItemController {
  
    @Autowired
    private ItemService itemService;

    @PostMapping
    public ResponseEntity<String> createItem(@RequestParam String name, 
                                             @RequestParam String description, 
                                             @RequestParam String status) {
        itemService.createItem(name, description, status);
        return ResponseEntity.ok("Item created successfully!");
    }

    @GetMapping
    public List<Item> getAllItems() {
        return itemService.getAllItems();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable int id) {
        return ResponseEntity.ok(itemService.getItemById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteItem(@PathVariable int id) {
        itemService.deleteItem(id);
        return ResponseEntity.ok("Item deleted successfully!");
    }
}
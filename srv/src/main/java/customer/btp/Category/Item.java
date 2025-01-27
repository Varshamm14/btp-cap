package customer.btp.Category;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "CATEGORY")
public class Item   {
 
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int id;

@Column(nullable = false, length = 100)
private String name;

@Column(length = 500)
private String description;

@Column(nullable = false, length = 50)
private String status;

@Column(updatable = false)
private LocalDateTime createdAt = LocalDateTime.now();

// Getters and Setters
public int getId() {
    return id;
}

public void setId(int id) {
    this.id = id;
}

public String getName() {
    return name;
}

public void setName(String name) {
    this.name = name;
}

public String getDescription() {
    return description;
}

public void setDescription(String description) {
    this.description = description;
}

public String getStatus() {
    return status;
}

public void setStatus(String status) {
    this.status = status;
}

public LocalDateTime getCreatedAt() {
    return createdAt;
}

}
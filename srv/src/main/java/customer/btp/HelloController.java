package customer.btp;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping(value = "/")
public class HelloController {
    
    @GetMapping()
    public String getMethodName() {
        return "Hello world";
    }
    
}

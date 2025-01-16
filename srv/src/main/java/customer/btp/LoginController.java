package customer.btp;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class LoginController {

  
    @Autowired
    private LoginService loginService;

    @PostMapping("/api/validateLogin")
    public ResponseEntity<LoginResponse> validateLogin(@RequestBody Login client) {
        LoginResponse response = loginService.validateLogin(client.getUsername(), client.getPassword());

        if (response.isSuccess()) {
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else if (response.getMessage().equals("The user is inactive")) {
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        } else {
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
    }
}

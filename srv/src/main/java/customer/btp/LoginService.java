package customer.btp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class LoginService {
    
   

    @Autowired
    private LoginDAO loginDao;

    public LoginResponse validateLogin(String username, String password) {
        int clientStatus = loginDao.validateClientLogin(username, password);

        if (clientStatus == -1) {
            return new LoginResponse("Invalid credentials", false);
        } else if (clientStatus == 0) {
            return new LoginResponse("The client is inactive", false);
        } else {
            return new LoginResponse("Authentication successful", true);
        }
    }
}
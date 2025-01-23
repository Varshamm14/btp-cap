package customer.btp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class LoginService {
    
   

    @Autowired
    private LoginDAO loginDao;

    public LoginResponse validateLogin(String username, String password) {
        int userStatus = loginDao.validateLogin(username, password);

        if (userStatus == -1) {
            return new LoginResponse("Invalid credentials", false);
        } else if (userStatus == 0) {
            return new LoginResponse("The user is inactive", false);
        } else {
            return new LoginResponse("Authentication successful", true);
        }
    }
}
package customer.btp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Allows all endpoints
        registry.addMapping("/**")
                .allowedOrigins("http://127.0.0.1:5500","http://localhost:8082/api/validateLogin") // Allow the specific frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allow the methods
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true); // Allow credentials (like cookies or authorization headers)
    }
}

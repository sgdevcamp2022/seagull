package smilegate.seagull;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@SpringBootApplication
public class SeagullApplication {

	public static void main(String[] args) {
		SpringApplication.run(SeagullApplication.class, args);
	}

}

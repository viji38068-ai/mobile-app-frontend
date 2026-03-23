package com.helpvoice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class HelpVoiceApplicationMongo {

	public static void main(String[] args) {
		SpringApplication.run(HelpVoiceApplicationMongo.class, args);
	}

}

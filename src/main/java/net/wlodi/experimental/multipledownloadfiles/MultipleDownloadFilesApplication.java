package net.wlodi.experimental.multipledownloadfiles;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@ServletComponentScan
public class MultipleDownloadFilesApplication implements WebMvcConfigurer {

	public static void main(String[] args) {
		SpringApplication.run(MultipleDownloadFilesApplication.class, args);
	}
	
}

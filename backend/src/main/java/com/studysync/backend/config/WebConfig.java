package com.studysync.backend.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer{
	// WebMvcConfigurer -> Spring에서 제공하는 인터페이스
		
	//전역 CORS 설정
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/api/**")
			.allowedOrigins("http://localhost:3000")
			.allowedMethods("GET", "POST", "PATCH", "PUT", "DELETE", "OPTION")
			.allowCredentials(true);
	}

	//JWT 필터 등록
	public FilterRegistrationBean<JwtFilter> jwtFilterRegistration(JwtFilter jwtFilter){
		FilterRegistrationBean<JwtFilter> registrationBean = new FilterRegistrationBean<>();
		registrationBean.setFilter(jwtFilter);
		registrationBean.addUrlPatterns("/api/users/info"); //필요한 경로 설정
		registrationBean.setOrder(Ordered.LOWEST_PRECEDENCE - 1); //필터 순서 설정
		return registrationBean;
	}
	
}


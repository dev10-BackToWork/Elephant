package com.Gen10.Elephant.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.context.AbstractSecurityWebApplicationInitializer;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	UserDetailsService userDetails;

	/*
	 * Colin Berry
	 * Pre-condition: takes in endpoint 
	 * Post-condition: decides if you can view desired endpoint
	 * 
	 */
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
		.authorizeRequests()
        .antMatchers("/account", "/accounts", "/noanswers").hasRole("ADMIN")
        .antMatchers("/times").hasAnyRole("ADMIN", "USER")
        .antMatchers("/", "home").permitAll()
        .antMatchers("/css/**", "/js/**", "/fonts/**").permitAll()
        .antMatchers("/createUser").permitAll()
       // .anyRequest().hasAnyRole("ADMIN", "STUDENT")
    .and()
    .formLogin()
        .loginPage("/login")
        .failureUrl("/login?login_error=1")
        .permitAll()
    .and()
    .logout()
        .logoutSuccessUrl("/")
        .permitAll();
			
	}
	
	/*
	 * Colin berry
	 * Pre-condition: Takes in authentication builder
	 * Post-condition: checks DB for userdetails from UserDetailsServiceImpl 
	 * with password encrypted with BCrypt
	 * 5/7/2020 10:25AM
	 */
	@Autowired
	public void configureInDB(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetails).passwordEncoder(bCryptPasswordEncoder());
	}
	
	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
}

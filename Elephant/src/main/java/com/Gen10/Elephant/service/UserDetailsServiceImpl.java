package com.Gen10.Elephant.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.Gen10.Elephant.dao.UsersRepository;
import com.Gen10.Elephant.dto.User;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{

	@Autowired
	UsersRepository usersRepo;
	
	/*
	 * Colin Berry
	 * Pre Condition: Takes in username 
	 * Post Condition: Grants permission based on role of user
	 */
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = usersRepo.findByEmail(email);
		
		Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
		
		String role = user.getRole().getName();
		
		grantedAuthorities.add(new SimpleGrantedAuthority(role));
		
		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), grantedAuthorities);
		
		
	}
}

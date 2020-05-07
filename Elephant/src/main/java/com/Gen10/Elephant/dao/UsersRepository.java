package com.Gen10.Elephant.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Gen10.Elephant.dto.User;

@Repository
public interface UsersRepository extends JpaRepository<User, Integer>{
	User findByUsername(String username);
}

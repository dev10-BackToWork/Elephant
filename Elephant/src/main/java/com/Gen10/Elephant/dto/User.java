package com.Gen10.Elephant.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Data;

@Entity
@Data
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userId;
	
	@Column(name = "firstname")
	private String firstName;
	
	@Column(name = "lastname")
	private String lastName;
        
        @Column
	private String email;
	
	@Column 
	private String passwords;
	
	@ManyToOne
	@JoinColumn(name = "locationid")
	private Location location;
	
	@ManyToOne
	@JoinColumn(name = "roleid")
	private Role role;
	
}

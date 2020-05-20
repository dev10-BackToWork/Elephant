package com.Gen10.Elephant.dto;

import java.util.Objects;

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

	public User() {
	}

	public User(String email, String password) {
		this.email = email;
		this.passwords = password;
	}
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userId;
	
	@Column(name = "firstname")
	private String firstName;
	
	@Column(name = "lastname")
	private String lastName;
        
        @Column
	private String email;
	
	@Column(name = "defaultpw")
	private String defaultPW;

	@Column 
	private String passwords;
	
	@ManyToOne
	@JoinColumn(name = "locationid")
	private Location location;
	
	@ManyToOne
	@JoinColumn(name = "roleid")
	private Role role;
	

	public int getUserId() {
		return this.userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getFirstName() {
		return this.firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return this.lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPasswords() {
		return this.passwords;
	}

	public void setPasswords(String passwords) {
		this.passwords = passwords;
	}

	public Location getLocation() {
		return this.location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public Role getRole() {
		return this.role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public String getDefaultPW() {
		return this.defaultPW;
	}

	public void setDefaultPW(String defaultPW) {
		this.defaultPW = defaultPW;
	}


	@Override
	public boolean equals(Object o) {
		if (o == this)
			return true;
		if (!(o instanceof User)) {
			return false;
		}
		User user = (User) o;
		return userId == user.userId && Objects.equals(firstName, user.firstName) && Objects.equals(lastName, user.lastName) && Objects.equals(email, user.email) && Objects.equals(defaultPW, user.defaultPW) && Objects.equals(passwords, user.passwords) && Objects.equals(location, user.location) && Objects.equals(role, user.role);
	}

	@Override
	public int hashCode() {
		return Objects.hash(userId, firstName, lastName, email, defaultPW, passwords, location, role);
	}

}

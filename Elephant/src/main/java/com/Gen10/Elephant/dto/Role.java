package com.Gen10.Elephant.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class Role {
	
	@Id
	private int roleId;
	
	@Column
	private String name;

}

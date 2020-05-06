package com.Gen10.Elephant.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class Location {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int locationId;
	
	@Column
	private String cityName;
	
	@Column
	private int timeIncrement;
	
	@Column
	private int maxOccupancy;
}

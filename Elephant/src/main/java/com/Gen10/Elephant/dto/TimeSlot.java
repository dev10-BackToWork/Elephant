package com.Gen10.Elephant.dto;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Data;

@Entity
@Data
public class TimeSlot {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int timeSlotId;
	
	@ManyToOne
	@JoinColumn(name = "locationid")
	private Location location;
}

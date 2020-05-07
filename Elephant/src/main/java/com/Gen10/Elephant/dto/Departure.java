package com.Gen10.Elephant.dto;

import java.sql.Date;

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
public class Departure {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int departureId;
	
	@Column
	private Date date;
	
	@ManyToOne
	@JoinColumn(name = "timeslotid")
	private TimeSlot timeSlot;
	
	@ManyToOne
	@JoinColumn(name = "userid")
	private User user;
}

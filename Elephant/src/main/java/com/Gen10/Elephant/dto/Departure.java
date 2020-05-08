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
	private Date departureDate;
	
	@ManyToOne
	@JoinColumn(name = "timeslotid")
	private TimeSlot timeSlot;
	
	@ManyToOne
	@JoinColumn(name = "userid")
	private User user;

	public int getDepartureId() {
		return this.departureId;
	}

	public void setDepartureId(int departureId) {
		this.departureId = departureId;
	}

	public Date getDepartureDate() {
		return this.departureDate;
	}

	public void setDepartureDate(Date departureDate) {
		this.departureDate = departureDate;
	}

	public TimeSlot getTimeSlot() {
		return this.timeSlot;
	}

	public void setTimeSlot(TimeSlot timeSlot) {
		this.timeSlot = timeSlot;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}

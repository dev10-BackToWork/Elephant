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
public class Arrival {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int arrivalId;
	
	@Column
	private Date arrivalDate;
	
	@ManyToOne
	@JoinColumn(name = "timeslotid")
	private TimeSlot timeSlot;
	
	@ManyToOne
	@JoinColumn(name = "userid")
	private User user;


	public int getArrivalId() {
		return this.arrivalId;
	}

	public void setArrivalId(int arrivalId) {
		this.arrivalId = arrivalId;
	}

	public Date getArrivalDate() {
		return this.arrivalDate;
	}

	public void setArrivalDate(Date arrivalDate) {
		this.arrivalDate = arrivalDate;
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

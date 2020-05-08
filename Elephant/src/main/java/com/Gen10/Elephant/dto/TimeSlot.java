package com.Gen10.Elephant.dto;

import java.sql.Time;

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
public class TimeSlot {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int timeSlotId;
	
	@Column
	private Time startTime;
	
	@ManyToOne
	@JoinColumn(name = "locationid")
	private Location location;

	public int getTimeSlotId() {
		return this.timeSlotId;
	}

	public void setTimeSlotId(int timeSlotId) {
		this.timeSlotId = timeSlotId;
	}

	public Time getStartTime() {
		return this.startTime;
	}

	public void setStartTime(Time startTime) {
		this.startTime = startTime;
	}

	public Location getLocation() {
		return this.location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

}

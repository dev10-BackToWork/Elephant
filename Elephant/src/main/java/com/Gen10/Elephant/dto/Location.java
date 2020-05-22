package com.Gen10.Elephant.dto;

import java.sql.Time;
import java.util.Objects;

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

	@Column
	private Time beginningTime;

	@Column
	private Time endTime;

	public int getLocationId() {
		return this.locationId;
	}

	public void setLocationId(int locationId) {
		this.locationId = locationId;
	}

	public String getCityName() {
		return this.cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

	public int getTimeIncrement() {
		return this.timeIncrement;
	}

	public void setTimeIncrement(int timeIncrement) {
		this.timeIncrement = timeIncrement;
	}

	public int getMaxOccupancy() {
		return this.maxOccupancy;
	}

	public void setMaxOccupancy(int maxOccupancy) {
		this.maxOccupancy = maxOccupancy;
	}

	public Time getBeginningTime() {
		return this.beginningTime;
	}

	public void setBeginningTime(Time beginningTime) {
		this.beginningTime = beginningTime;
	}

	public Time getEndTime() {
		return this.endTime;
	}

	public void setEndTime(Time endTime) {
		this.endTime = endTime;
	}

	@Override
	public boolean equals(Object o) {
		if (o == this)
			return true;
		if (!(o instanceof Location)) {
			return false;
		}
		Location location = (Location) o;
		return locationId == location.locationId && Objects.equals(cityName, location.cityName) && timeIncrement == location.timeIncrement && maxOccupancy == location.maxOccupancy && Objects.equals(beginningTime, location.beginningTime) && Objects.equals(endTime, location.endTime);
	}

	@Override
	public int hashCode() {
		return Objects.hash(locationId, cityName, timeIncrement, maxOccupancy, beginningTime, endTime);
	}

}

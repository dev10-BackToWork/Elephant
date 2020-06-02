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
//@Data
public class Location {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int locationId;

	@Column
	private String cityName;

	@Column
	private int maxOccupancy;

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

	public int getMaxOccupancy() {
		return this.maxOccupancy;
	}

	public void setMaxOccupancy(int maxOccupancy) {
		this.maxOccupancy = maxOccupancy;
	}

        @Override
        public int hashCode() {
            int hash = 5;
            hash = 83 * hash + this.locationId;
            hash = 83 * hash + Objects.hashCode(this.cityName);
            hash = 83 * hash + this.maxOccupancy;
            return hash;
        }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) {
                return true;
            }
            if (obj == null) {
                return false;
            }
            if (getClass() != obj.getClass()) {
                return false;
            }
            final Location other = (Location) obj;
            if (this.locationId != other.locationId) {
                return false;
            }
            if (this.maxOccupancy != other.maxOccupancy) {
                return false;
            }
            if (!Objects.equals(this.cityName, other.cityName)) {
                return false;
            }
            return true;
        }

}

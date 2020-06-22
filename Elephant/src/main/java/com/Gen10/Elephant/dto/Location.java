package com.Gen10.Elephant.dto;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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
    
    @Column
    String distributionEmail;

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

    public String getDistributionEmail() {
        return this.distributionEmail;
    }

    public void setDistributionEmail(String distributionEmail) {
        this.distributionEmail = distributionEmail;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Location)) {
            return false;
        }
        Location location = (Location) o;
        return locationId == location.locationId && Objects.equals(cityName, location.cityName) && maxOccupancy == location.maxOccupancy && Objects.equals(distributionEmail, location.distributionEmail);
    }

    @Override
    public int hashCode() {
        return Objects.hash(locationId, cityName, maxOccupancy, distributionEmail);
    }
}

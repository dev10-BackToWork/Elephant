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
    private String distributionEmail;

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
        return distributionEmail;
    }

    public void setDistributionEmail(String distributionEmail) {
        this.distributionEmail = distributionEmail;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 47 * hash + this.locationId;
        hash = 47 * hash + Objects.hashCode(this.cityName);
        hash = 47 * hash + this.maxOccupancy;
        hash = 47 * hash + Objects.hashCode(this.distributionEmail);
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
        if (!Objects.equals(this.distributionEmail, other.distributionEmail)) {
            return false;
        }
        return true;
    }
    
}

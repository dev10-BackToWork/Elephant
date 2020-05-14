package com.Gen10.Elephant.dto;

import java.sql.Date;
import java.sql.Time;
import java.util.Objects;

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
        private Date timeSlotDate;
	
	@Column
	private Time startTime;
        
        @Column
        private boolean isTaken;
	
	@ManyToOne
	@JoinColumn(name = "locationid")
	private Location location;

	public int getTimeSlotId() {
		return this.timeSlotId;
	}

	public void setTimeSlotId(int timeSlotId) {
		this.timeSlotId = timeSlotId;
	}
        
        public Date getTimeSlotDate() {
		return this.timeSlotDate;
	}

	public void setTimeSlotDate(Date timeSlotDate) {
		this.timeSlotDate = timeSlotDate;
	}

	public Time getStartTime() {
		return this.startTime;
	}

	public void setStartTime(Time startTime) {
		this.startTime = startTime;
	}

        public boolean getIsTaken() {
            return isTaken;
        }

        public void setIsTaken(boolean isTaken) {
            this.isTaken = isTaken;
        }

	public Location getLocation() {
		return this.location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 61 * hash + this.timeSlotId;
        hash = 61 * hash + Objects.hashCode(this.timeSlotDate);
        hash = 61 * hash + Objects.hashCode(this.startTime);
        hash = 61 * hash + (this.isTaken ? 1 : 0);
        hash = 61 * hash + Objects.hashCode(this.location);
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
        final TimeSlot other = (TimeSlot) obj;
        if (this.timeSlotId != other.timeSlotId) {
            return false;
        }
        if (this.isTaken != other.isTaken) {
            return false;
        }
        if (!Objects.equals(this.timeSlotDate, other.timeSlotDate)) {
            return false;
        }
        if (!Objects.equals(this.startTime, other.startTime)) {
            return false;
        }
        if (!Objects.equals(this.location, other.location)) {
            return false;
        }
        return true;
    }

}

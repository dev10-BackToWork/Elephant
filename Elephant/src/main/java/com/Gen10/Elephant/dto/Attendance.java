package com.Gen10.Elephant.dto;

import java.time.LocalDate;

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
public class Attendance {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int attendanceId;
	
	@Column
	private boolean isAttending;
	
	@Column
	private LocalDate attendanceDate;
	
	@ManyToOne
	@JoinColumn(name = "userid")
	private User user;
        
	@Column
	private boolean isAuthorized;

	public int getAttendanceId() {
		return this.attendanceId;
	}

	public void setAttendanceId(int attendanceId) {
		this.attendanceId = attendanceId;
	}

	public boolean isIsAttending() {
		return this.isAttending;
	}

	public boolean getIsAttending() {
		return this.isAttending;
	}

	public void setIsAttending(boolean isAttending) {
		this.isAttending = isAttending;
	}

	public LocalDate getAttendanceDate() {
		return this.attendanceDate;
	}

	public void setAttendanceDate(LocalDate attendanceDate) {
		this.attendanceDate = attendanceDate;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public boolean getIsAuthorized() {
		return isAuthorized;
	}

	public void setIsAuthorized(boolean isAuthorized) {
		this.isAuthorized = isAuthorized;
	}
}

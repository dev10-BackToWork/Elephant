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
public class Attendance {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int attendanceId;
	
	@Column
	private boolean isAttending;
	
	@Column
	private Date attendanceDate;
	
	@ManyToOne
	@JoinColumn(name = "userid")
	private User user;

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

	public Date getAttendanceDate() {
		return this.attendanceDate;
	}

	public void setAttendanceDate(Date attendanceDate) {
		this.attendanceDate = attendanceDate;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}

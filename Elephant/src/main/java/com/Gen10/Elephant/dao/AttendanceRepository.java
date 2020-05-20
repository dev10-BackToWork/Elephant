package com.Gen10.Elephant.dao;

import java.time.LocalDate;

import com.Gen10.Elephant.dto.Attendance;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Integer>{
	
	@Query(value = "SELECT * FROM Attendance a WHERE a.userid = ?1 and a.attendanceDate = ?2", nativeQuery = true)
	Attendance findTodayByUser(int userId, LocalDate date);
}

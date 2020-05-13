package com.Gen10.Elephant.dao;

import com.Gen10.Elephant.dto.Attendance;
import com.Gen10.Elephant.dto.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Integer>{

	Attendance findByUser(User user);

}

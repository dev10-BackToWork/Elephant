package com.Gen10.Elephant.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Gen10.Elephant.dto.Attendance;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Integer>{

}

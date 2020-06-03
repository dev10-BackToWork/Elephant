package com.Gen10.Elephant.dao;

import java.time.LocalDate;

import com.Gen10.Elephant.dto.Attendance;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {

    @Query(value = "SELECT * FROM Attendance a WHERE a.userid = ?1 and a.attendanceDate = ?2", nativeQuery = true)
    Attendance findTodayByUser(int userId, LocalDate date);

    @Query(value = "SELECT * \n"
            + "FROM attendance a\n"
            + "WHERE a.attendanceDate >= DATE(NOW() - INTERVAL 30 DAY)", nativeQuery = true)
    List<Attendance> findAttendanceWithinLast30Days();
}

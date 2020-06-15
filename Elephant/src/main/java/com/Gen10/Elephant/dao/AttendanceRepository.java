package com.Gen10.Elephant.dao;

import java.time.LocalDate;

import com.Gen10.Elephant.dto.Attendance;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {

    @Query(value = "SELECT * FROM Attendance a WHERE a.userid = ?1 and a.attendanceDate = ?2", nativeQuery = true)
    Attendance findTodayByUser(int userId, LocalDate date);

    @Query(value = "SELECT * \n"
            + "FROM Attendance a\n"
            + "WHERE a.attendanceDate >= DATE(NOW() - INTERVAL 30 DAY)", nativeQuery = true)
    List<Attendance> findAttendanceWithinLast30Days();

    @Query(value = "SELECT a.*\n"
            + "FROM Attendance a\n"
            + "WHERE a.attendanceDate = ?2\n"
            + "AND a.locationId = ?1\n"
            + "AND a.isAuthorized = 1;", nativeQuery = true)
    List<Attendance> findAttendanceAuthorizedOnDate(int locationId, LocalDate date);

    @Query(value = "SELECT a.*\n"
            + "FROM Attendance a\n"
            + "WHERE a.attendanceDate BETWEEN ?2 and ?3\n"
            + "AND a.locationId = ?1\n"
            + "AND a.isAuthorized = 1;", nativeQuery = true)
    List<Attendance> findAttendanceAuthorizedWithinRange(int locationId, LocalDate startDate, LocalDate endDate);

    @Modifying
    @Transactional
    @Query(value = "UPDATE attendance a SET\n"
            + "	a.departedEarly = 1\n"
            + "WHERE a.userId = ?1\n"
            + "AND a.attendanceDate = CURDATE();", nativeQuery = true)
    void markAttendanceDepartedEarly(int id);

    @Query(value = "SELECT *\n"
            + "FROM attendance a\n"
            + "WHERE a.userId = ?1\n"
            + "AND a.attendanceDate = CURDATE();", nativeQuery = true)
    Attendance findAttendanceDepartedEarly(int id);

}

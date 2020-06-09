package com.Gen10.Elephant.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.Gen10.Elephant.dto.Location;
import com.Gen10.Elephant.dto.User;

@Repository
public interface UsersRepository extends JpaRepository<User, Integer> {

    User findByEmail(String email);

    List<User> findAllByLocation(Location location);

    @Query(value = "SELECT u.*\n"
            + "FROM attendance a\n"
            + "INNER JOIN user u ON a.userId = u.userId\n"
            + "INNER JOIN location lo ON u.locationId = lo.locationId\n"
            + "WHERE a.attendanceDate = CURDATE()\n"
            + "AND a.isAuthorized = 1\n"
            + "AND u.locationId = ?1\n"
            + "ORDER BY u.lastName", nativeQuery = true)
    List<User> findCurrentUsersInOffice(int id);

    @Query(value = "SELECT u.userId, u.firstName, u.lastName, u.email, u.defaultPW, u.passwords, u.locationId, u.roleId, u.isActive FROM `User` u LEFT OUTER JOIN Attendance a ON u.userId = a.userId WHERE u.isActive = 1 and u.locationid = ?1 AND a.isAttending IS NULL", nativeQuery = true)
    List<User> findAllActiveByLocation(Location location);

    @Query(value = "SELECT u.*\n"
            + "FROM attendance a\n"
            + "INNER JOIN user u ON a.userId = u.userId\n"
            + "INNER JOIN location lo ON u.locationId = lo.locationId\n"
            + "WHERE a.attendanceDate = CURDATE()\n"
            + "AND a.isAttending = 1\n"
            + "AND a.isAuthorized = 0\n"
            + "AND u.locationId = ?1\n"
            + "ORDER BY u.lastName;", nativeQuery = true)
    List<User> findFlaggedUsersByLocation(int id);
}

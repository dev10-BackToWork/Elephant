package com.Gen10.Elephant.dao;

import java.util.List;

import com.Gen10.Elephant.dto.Location;
import com.Gen10.Elephant.dto.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<User, Integer> {

    User findByEmail(String email);

    @Query(value = "SELECT u.userId FROM USER u WHERE u.firstName = ?1 AND u.lastName = ?2", nativeQuery = true)
    User findByName(String firstName, String lastName);

    @Query(value = "SELECT u.*\n"
            + "FROM User u\n"
            + "WHERE u.locationId = ?1\n"
            + "AND u.roleId <> 4\n"
            + "ORDER BY u.lastName;", nativeQuery = true)
    List<User> findAllUsersOfSpecifiedLocation(int locationId);

    @Query(value = "SELECT u.*\n"
            + "FROM User u\n"
            + "WHERE u.locationId = ?1\n"
            + "AND u.roleId = 4\n"
            + "ORDER BY u.lastName;", nativeQuery = true)
    List<User> findAllGuestsOfSpecifiedLocation(int locationId);

    List<User> findAllByLocation(Location location);

    @Query(value = "SELECT u.*\n"
            + "FROM Attendance a\n"
            + "INNER JOIN User u ON a.userId = u.userId\n"
            + "WHERE a.attendanceDate = CURDATE()\n"
            + "AND a.isAuthorized = 1\n"
            + "AND a.locationId = ?1\n"
            + "ORDER BY u.lastName", nativeQuery = true)
    List<User> findCurrentUsersInOffice(int id);

    @Query(value = "SELECT u.* FROM `User` u LEFT OUTER JOIN Attendance a ON u.userId = a.userId AND a.attendanceDate = CURDATE() WHERE u.isActive = 1 and u.locationid = ?1 AND u.roleId <> 4 AND a.isAttending IS NULL ORDER BY u.lastName", nativeQuery = true)
    List<User> findAllInactiveByLocation(Location location);

    @Query(value = "SELECT u.*\n"
            + "	FROM Attendance a\n"
            + "	INNER JOIN User u ON a.userId = u.userId\n"
            + "	INNER JOIN Location lo ON u.locationId = lo.locationId\n"
            + "	WHERE a.attendanceDate = CURDATE()\n"
            + " AND u.roleId <> 4\n"
            + "	AND a.isAttending = 1\n"
            + "	AND a.isAuthorized = 0\n"
            + "	ORDER BY u.lastName;", nativeQuery = true)
    List<User> findFlaggedUsersGlobal();

    @Query(value = "SELECT u.*\n"
            + "FROM Attendance a\n"
            + "INNER JOIN User u ON a.userId = u.userId\n"
            + "INNER JOIN Location lo ON u.locationId = lo.locationId\n"
            + "WHERE a.attendanceDate = CURDATE()\n"
            + "AND u.roleId <> 4\n"
            + "AND a.isAttending = 1\n"
            + "AND a.isAuthorized = 0\n"
            + "AND u.locationId = ?1\n"
            + "ORDER BY u.lastName;", nativeQuery = true)
    List<User> findFlaggedUsersByLocation(int id);
    
    @Query(value = "SELECT a.locationId FROM User u INNER JOIN Attendance a ON u.userId = a.userId WHERE u.userId = ?1 AND a.attendanceDate = ?2", nativeQuery = true)
    int findUserLocationIdOnDate(int id, String date);

    @Query(value = "SELECT u.* FROM `User` u LEFT OUTER JOIN Attendance a ON u.userId = a.userId WHERE u.roleId = 4 AND a.isAttending IS NULL", nativeQuery = true)
    List<User> findAllOldGuestsByAge(int maxAge);
    
    @Query(value = "SELECT u.email FROM `User` u WHERE u.locationId = ? AND u.roleId = 1", nativeQuery = true)
    List<String> getAdminEmailsByLocation(int id);
    
    @Query(value = "SELECT u.* FROM `User` u WHERE u.locationId = 15", nativeQuery = true)
    List<User> findAllMilwaukee();
}

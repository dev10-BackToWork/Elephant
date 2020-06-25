package com.Gen10.Elephant.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.Gen10.Elephant.dto.Location;

@Repository
public interface LocationRepository extends JpaRepository<Location, Integer>{

	@Query(value = "SELECT lo.* FROM Location lo ORDER BY lo.cityName", nativeQuery = true)
	Location getByLocationId(int id);

	@Query(value = "SELECT lo.distributionEmail FROM Location lo WHERE lo.locationId = ?", nativeQuery = true)
	String getDistributionEmailByLocation(int id);

}

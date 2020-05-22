package com.Gen10.Elephant.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Gen10.Elephant.dto.Location;

@Repository
public interface LocationRepository extends JpaRepository<Location, Integer>{

	Location getByLocationId(int id);

}

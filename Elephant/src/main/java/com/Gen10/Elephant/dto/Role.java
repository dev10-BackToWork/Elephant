package com.Gen10.Elephant.dto;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class Role {
	
	@Id
	@Column(name = "roleid")
	private int roleId;
	
	@Column(name = "rolename")
	private String name;


	public int getRoleId() {
		return this.roleId;
	}

	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public boolean equals(Object o) {
		if (o == this)
			return true;
		if (!(o instanceof Role)) {
			return false;
		}
		Role role = (Role) o;
		return roleId == role.roleId && Objects.equals(name, role.name);
	}

	@Override
	public int hashCode() {
		return Objects.hash(roleId, name);
	}

}

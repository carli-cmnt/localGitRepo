package com.minipark.parkserver.core.system.dao;

import java.util.List;
import java.util.Map;

import com.minipark.parkserver.core.system.entity.AuMenu;
import com.minipark.parkserver.core.system.entity.AuRole;

public interface AuRoleMapper {

	public List<AuRole> getRoleList(Map<String, Object> map);
	
	public AuRole ifExists(Map<String,Object> map);
	
	public AuRole ifExistsRoleCode(Map<String,Object> map);
	
	public void delete(List list);
	
	public void insertRoleMenuRel(Map<String,Object> map);
	public void insert(AuRole role);
	public void update(AuRole role);
	
	public void deleteRoleMenuRelByRoleId(String roleId);
	
	public List<AuMenu> getAllMenusByRoleId(String roleId);
	
	public List getAllMenuRoleRel(Map<String,Object> map);
	
	public List getAllActionsRoleRel(String roleId);
	
	public void updateIsValid(Map map);

	public List getActionsRoleRel(Map<String,Object> map);
	
	public List<AuRole> getAllRolesByUserId(String userId);

	public AuRole getRoleByRoleName();
	public AuRole get(String roleId);
}
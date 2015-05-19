package com.minipark.parkserver.core.system.dao;

import java.util.List;
import java.util.Map;

import javax.management.relation.Role;

import com.minipark.parkserver.core.system.entity.AuMenu;

public interface AuMenuMapper {
    /*int deleteByPrimaryKey(String id);

    int insert(AuMenu record);

    int insertSelective(AuMenu record);

    AuMenu selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(AuMenu record);

    int updateByPrimaryKey(AuMenu record);*/
    

	public List<Role> selectRoles(String id);

	public List<AuMenu> selectAllMenus(Map<String,Object> map);

	public List<AuMenu> getAllMenusByRoleId(String roleId);

	public void delete(List list);
	public void deleteRoleMenuRel(List list);
	
	public AuMenu getMenuById(Map<String,Object> map);

	public void insert(Map<String,Object> map);
	
	public void update(Map<String,Object> map);
	
	public void updateHasChild(Map<String,Object> map);
	
	public int getChildCount(Map<String,Object> map);
	
	public List<AuMenu> getChildrenById(Map<String, Object> map);
	
	public AuMenu ifExistsMenuCode(Map<String, Object> map);
}
package com.minipark.parkserver.admin.system.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.management.relation.Role;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.minipark.parkserver.admin.utils.BeanToMapUtil;
import com.minipark.parkserver.core.system.dao.AuMenuMapper;
import com.minipark.parkserver.core.system.entity.AuMenu;

@Service
public class MenuService {

	@Autowired
	public AuMenuMapper auMenuMapper;
	
	public List<Role> selectRoles(String id){
		return auMenuMapper.selectRoles(id);
	}
	
	public List<AuMenu> selectAllMenus(Map<String,Object> map){
		map.put("isdel", "0");
		return auMenuMapper.selectAllMenus(map);
	}

	public List<AuMenu> getAllMenusByRoleId(String roleId) {
		return auMenuMapper.getAllMenusByRoleId(roleId);
	}

	public void deleteByIds(String delIds){
		List list =  new ArrayList();
		String[] ids = delIds.split(",");
		for (int i = 0; i < ids.length; i++) {
			list.add(ids[i]);
		}
		auMenuMapper.delete(list);
		auMenuMapper.deleteRoleMenuRel(list);
		
		for (int i = 0; i < ids.length; i++) {
			String menuId = ids[i];
			Map<String, Object> map =new HashMap<String, Object>();
			map.put("id", menuId);
			AuMenu menu =  auMenuMapper.getMenuById(map);
			
			if(menu.getSuperId()!=null && !"".equals(menu.getSuperId())){
				Map<String, Object> map1 =new HashMap<String, Object>();
				map1.put("id", menu.getSuperId());
				List<AuMenu> list1 = auMenuMapper.getChildrenById(map1);
				//子节点为空，就把haschild改为0
				if(list1==null || list1.size()==0){
					Map<String, Object> map2 =new HashMap<String, Object>();
					map2.put("id", menu.getSuperId());
					map2.put("hasChild", "0");
					auMenuMapper.updateHasChild(map2);
				}
			}
		}
	}
	
	public AuMenu getMenuById(Map<String,Object> map){
		return auMenuMapper.getMenuById(map);
	}
	
	public void save(AuMenu menu) throws Exception{
		if (StringUtils.isBlank(menu.getId())){
			menu.setIsValid("1");
			menu.setIsDel("0");
			menu.setHasChild("0");
			
			if (menu.getSuperId() != null){
				Map<String,Object> map = new HashMap<String,Object>();
				map.put("hasChild", "1");
				map.put("id", menu.getSuperId());
				auMenuMapper.updateHasChild(map);
				
				map.put("id", menu.getSuperId());
				AuMenu superMenu = auMenuMapper.getMenuById(map);
				if (superMenu != null && superMenu.getMenuLevel() != null){
					menu.setMenuLevel(String.valueOf(Integer.valueOf(superMenu.getMenuLevel()) + 1));
				}else{
					menu.setMenuLevel("1");
				}
			}else{
				menu.setMenuLevel("1");
			}
			String id = UUID.randomUUID().toString();
			menu.setId(id);
			auMenuMapper.insert(BeanToMapUtil.convertBean(menu));
		}else{
			auMenuMapper.update(BeanToMapUtil.convertBean(menu));
		}
	}

	public int getChildCount(Map<String,Object> map){
		map.put("isDel", "0");
		return auMenuMapper.getChildCount(map);
	}
	
	public List<AuMenu> getChildrenById(Map<String, Object> map){
		return auMenuMapper.getChildrenById(map);
	}
	
	public AuMenu ifExistsMenuCode(Map<String,Object> map){
		return auMenuMapper.ifExistsMenuCode(map);
	}
}

package com.minipark.parkserver.admin.system.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.minipark.parkserver.core.system.dao.AuRoleMapper;
import com.minipark.parkserver.core.system.entity.AuMenu;
import com.minipark.parkserver.core.system.entity.AuRole;

@Service
public class RoleService {

	@Autowired
	private AuRoleMapper auRoleMapper;

	public List<AuRole> getRoleList(Map<String, Object> map) {
		return auRoleMapper.getRoleList(map);
	}

	public void saveOrUpdate(AuRole role) {
		if (StringUtils.isBlank(role.getId())) {
			role.setIsValid("1");
			role.setIsDel("0");
			auRoleMapper.insert(role);
		} else {
			auRoleMapper.update(role);
		}
	}

	public AuRole ifExists(Map<String, Object> map) {
		return auRoleMapper.ifExists(map);
	}

	public AuRole ifExistsRoleCode(Map<String, Object> map) {
		return auRoleMapper.ifExistsRoleCode(map);
	}

	public AuRole getRoleById(String id) {
		return (AuRole) auRoleMapper.get(id);
	}

	public void deleteByIds(String delIds) {
		List list = new ArrayList();
		String[] ids = delIds.split(",");
		for (int i = 0; i < ids.length; i++) {
			list.add(ids[i]);
		}
		auRoleMapper.delete(list);
	}

	public void saveRoleMenuRel(String roleId, Map<String, String> actions) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("roleId", roleId);
		map.put("isValid", '1');
		map.put("isDel", '0');
		map.put("createDate", new Date());
		auRoleMapper.deleteRoleMenuRelByRoleId(roleId);

		Set<Entry<String, String>> set = actions.entrySet();

		for (Entry<String, String> entry : set) {
			String key = entry.getKey();
			String value = actions.get(key);

			map.put("menuId", key);
			map.put("actions", value);
			auRoleMapper.insertRoleMenuRel(map);
		}
	}

	public String getAllMenuId(String roleId) {
		List<AuMenu> menus = auRoleMapper.getAllMenusByRoleId(roleId);
		StringBuffer menuStr = new StringBuffer();
		for (AuMenu auMenu : menus) {
			if (auMenu != null) {
				menuStr.append("," + auMenu.getId());
			}
		}
		if (menuStr.length() > 1) {
			return menuStr.substring(1);
		} else {
			return "";
		}
	}

	public List getAllMenuRoleRel() {
		return auRoleMapper.getAllMenuRoleRel(new HashMap());
	}

	public List getAllActionsRoleRel(String roleId) {
		return auRoleMapper.getAllActionsRoleRel(roleId);
	}
	
	public List getActionsRoleRel(Map<String,Object> map) {
		return auRoleMapper.getActionsRoleRel(map);
	}

	public void updateIsValid(Map map) {
		auRoleMapper.updateIsValid(map);
	}

	public List<AuRole> getAllRolesByUserId(String userId) {
		return auRoleMapper.getAllRolesByUserId(userId);
	}

	public AuRole getRoleByRoleName() {
		// TODO Auto-generated method stub
		return auRoleMapper.getRoleByRoleName();
	}
}

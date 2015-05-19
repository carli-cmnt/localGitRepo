package com.minipark.parkserver.admin.common.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;

import com.minipark.parkserver.admin.system.service.MenuService;
import com.minipark.parkserver.admin.system.service.RoleService;
import com.minipark.parkserver.admin.utils.AppConstants;
import com.minipark.parkserver.core.system.entity.AuMenu;
import com.minipark.parkserver.core.system.entity.AuRole;

public class MySecurityMetadataSource implements FilterInvocationSecurityMetadataSource { 

    private final Logger logger        = Logger.getLogger(getClass().getName());

    //由spring调用  
    public MySecurityMetadataSource(RoleService roleService, MenuService menuService) {
        this.roleService = roleService;
        this.menuService = menuService;
        loadResourceDefine();
    }

    public RoleService getRoleService() {
		return roleService;
	}

	public void setRoleService(RoleService roleService) {
		this.roleService = roleService;
	}

	private RoleService roleService;
	private MenuService menuService;

    private static Map<String, Collection<ConfigAttribute>> resourceMap = null;

    public Collection<ConfigAttribute> getAllConfigAttributes() {
        // TODO Auto-generated method stub  
        return null;  
    }

    public boolean supports(Class<?> clazz) {  
        // TODO Auto-generated method stub  
        return true;  
    }

    private void putAttrMap(Map<String, Collection<ConfigAttribute>> map, String url, Collection<ConfigAttribute> configAttributes) {
    	if (url == null || url.trim().isEmpty()) {
    		return;
    	}
		if (map.get(url) != null) {
			Collection<ConfigAttribute> attrList = resourceMap.get(url);
            attrList.addAll(configAttributes);
		} else {
			map.put(url, configAttributes);
		}
    }

    private void print(Map<String, Collection<ConfigAttribute>> map) {
    	Iterator<String> i = map.keySet().iterator();
    	while (i.hasNext()) {
    		String key = i.next();
    	}
    }

    private List<String> getList(Collection<ConfigAttribute> configAttributes) {
    	List<String> list = new ArrayList<String>();
    	for (ConfigAttribute con : configAttributes) {
    		list.add(con.getAttribute());
    	}
    	return list;
    }

    //加载资源与权限的关系  
    private void loadResourceDefine() {
        if(resourceMap == null) {
            resourceMap = new HashMap<String, Collection<ConfigAttribute>>();
            HashMap<String, Object> map = new HashMap<String, Object>();
            List<AuRole> roleList = this.roleService.getRoleList(map);
            for (AuRole role : roleList) {
                List<AuMenu> menuList = menuService.getAllMenusByRoleId(role.getId());
                String menuPath = null;
                for (AuMenu menu : menuList) {
                	menuPath = menu.getMenuPath();
                	if (menuPath != null && !menuPath.trim().isEmpty()) {
                		Collection<ConfigAttribute> configAttributes = new ArrayList<ConfigAttribute>();
                		//以权限名封装为Spring的security Object
                		ConfigAttribute configAttribute = new SecurityConfig(role.getRoleCode());
                		configAttributes.add(configAttribute);
                		putAttrMap(resourceMap, menuPath, configAttributes);
                	}
                }
            }

            String allPermitPath = AppConstants.SECURITY_PERMITALL;
            Collection<ConfigAttribute> configAttributes = new ArrayList<ConfigAttribute>();
            ConfigAttribute configAttribute = new SecurityConfig("ALL");
            configAttributes.add(configAttribute);
            if (allPermitPath != null && !allPermitPath.trim().isEmpty()) {
            	String[] pathArr = allPermitPath.split(";");
            	for (String eachPath : pathArr) {
            		putAttrMap(resourceMap, eachPath, configAttributes);
            	}
            }
        }
    }

    //返回请求资源所需要的角色权限
    public Collection<ConfigAttribute> getAttributes(Object object) throws IllegalArgumentException {
        String requestUrl = ((FilterInvocation) object).getRequestUrl();
        if(resourceMap == null) {
            loadResourceDefine();
        }
        if (requestUrl != null) {
        	if (resourceMap.get(requestUrl) != null) {
        		return resourceMap.get(requestUrl);
        	}
        	Iterator<String> keys = resourceMap.keySet().iterator();
        	String key = null;
        	while (keys.hasNext()) {
        		key = keys.next();
        		if (requestUrl.indexOf(key.replaceAll("\\*", "")) == 0) {
        			return resourceMap.get(key);
        		}
        	}
        }

        Collection<ConfigAttribute> configAttributes = new ArrayList<ConfigAttribute>();
        ConfigAttribute configAttribute = new SecurityConfig("NONE");
        configAttributes.add(configAttribute);
        return configAttributes;
    }
}
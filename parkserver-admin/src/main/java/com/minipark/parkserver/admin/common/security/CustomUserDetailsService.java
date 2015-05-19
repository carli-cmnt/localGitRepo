package com.minipark.parkserver.admin.common.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.minipark.parkserver.admin.system.service.RoleService;
import com.minipark.parkserver.admin.user.service.UserService;
import com.minipark.parkserver.core.system.entity.AuRole;
import com.minipark.parkserver.core.user.entity.LoginUser;


public class CustomUserDetailsService implements UserDetailsService {

    private final Logger logger        = Logger.getLogger(getClass().getName());

	@Autowired
	private UserService userService;

	@Autowired
	private RoleService roleService;

	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        AuthUserDetails user = null;  

        try {  
   
            // 我们可以通过dao使用JDBC来访问数据库  
        	Map<String, Object> map = new HashMap<String, Object>();
    		map.put("userName", username);
            List<LoginUser> userList = userService.selectByParam(map);
   
            // Populate the Spring User object with details from the dbUser  
            // Here we just pass the username, password, and access level  
            // getAuthorities() will translate the access level to the correct  
            // role type  
   
            if (userList.size() > 0) {
            	LoginUser loginUser = userList.get(0);
            	if(loginUser.getStatus() == 0){
            		logger.debug("用户已经被删除");
            		throw new UsernameNotFoundException("1");
            	}
            	List<AuRole> roleList = roleService.getAllRolesByUserId(loginUser.getUserId());
            	user = new AuthUserDetails(loginUser.getUserName(), loginUser.getPassword()
            			.toLowerCase(), getAuthorities(roleList));
            	user.setUser(loginUser);
            	user.setUserRoleList(roleList);
            } else {
            	throw new UsernameNotFoundException("Error in retrieving user");
            }
   
        } catch (Exception e) {  
            throw new UsernameNotFoundException("Error in retrieving user");
        }  
   
        return user;  
	}

	private Collection<GrantedAuthority> getAuthorities(List<AuRole> roleList) {  
        List<GrantedAuthority> authList = new ArrayList<GrantedAuthority>();
        for (AuRole role : roleList) {
            authList.add(new SimpleGrantedAuthority(role.getRoleCode()));
        }
   
        return authList;  
    }
}

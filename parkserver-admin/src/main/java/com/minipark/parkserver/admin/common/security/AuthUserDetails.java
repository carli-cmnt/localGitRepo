package com.minipark.parkserver.admin.common.security;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import com.minipark.parkserver.core.system.entity.AuRole;
import com.minipark.parkserver.core.user.entity.LoginUser;

public class AuthUserDetails extends User {

	private static final long serialVersionUID = -2014858939062424433L;

	public AuthUserDetails(String username, String password, Collection<? extends GrantedAuthority> authorities) {
		super(username, password, true, true, true, true, authorities);
	}

	public AuthUserDetails(String username, String password, boolean enabled, boolean accountNonExpired, boolean credentialsNonExpired, boolean accountNonLocked,
			Collection<? extends GrantedAuthority> authorities) {
		super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
	}

	private LoginUser user;

	private List<AuRole> userRoleList;
	
	public List<AuRole> getUserRoleList() {
		return userRoleList;
	}

	public void setUserRoleList(List<AuRole> userRoleList) {
		this.userRoleList = userRoleList;
	}

	public LoginUser getUser() {
		return user;
	}

	public void setUser(LoginUser user) {
		this.user = user;
	}

}

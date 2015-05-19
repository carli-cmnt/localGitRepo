package com.minipark.parkserver.admin.utils;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;

import com.minipark.parkserver.admin.common.security.AuthUserDetails;
import com.minipark.parkserver.core.system.entity.AuRole;
import com.minipark.parkserver.core.user.entity.LoginUser;

public class LoginUserHelper {
	
	private LoginUserHelper(){
		
	}
	
	public static boolean isSuperAdmin(){
		if (isLogin()){
			if("SUPER_ADMIN".equals(getLoginUserId()) 
					&& "ADMIN".equals(getLoginUserName().toUpperCase())){
				return true;
			}
		}
		return false;
	}
	
	/**
	 * @author: ZHANGJH
	 * @date: 2014�?�?7�?下午2:18:07
	 * @Description: 是否已经登陆
	 * @return
	 */
	public static boolean isLogin() {
		SecurityContext sc =SecurityContextHolder.getContext();
		if (sc == null){
			return false;
		}
		Authentication auth = sc.getAuthentication();
		if (auth == null){
			return false;
		}
		if ("java.lang.String".equals(auth.getPrincipal().getClass().getName())) {
			return false;
		}
		AuthUserDetails userDetails = (AuthUserDetails) auth.getPrincipal();
		if (userDetails == null){
			return false;
		}
		return true;
	}
	
	public static LoginUser getLoginUser(){
		AuthUserDetails userDetails = (AuthUserDetails) SecurityContextHolder.getContext()
			    .getAuthentication()
			    .getPrincipal();

		return userDetails.getUser();
	}

	public static List<AuRole> getLoginUserRoles(){
		AuthUserDetails userDetails = (AuthUserDetails) SecurityContextHolder.getContext()
			    .getAuthentication()
			    .getPrincipal();

		return userDetails.getUserRoleList();
	}

	public static LoginUser getLoginUser(HttpServletRequest request){
		SecurityContextImpl securityContextImpl = (SecurityContextImpl) request
			     .getSession().getAttribute("SPRING_SECURITY_CONTEXT");
		AuthUserDetails userDetails=(AuthUserDetails)securityContextImpl.getAuthentication().getPrincipal();
		return userDetails.getUser();
	}
	
	
	public static String getLoginUserId(){
		AuthUserDetails userDetails = null;
		String userId = null;
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if(null != authentication){
			Object principal = authentication.getPrincipal();
			if(principal instanceof AuthUserDetails){
				userDetails = (AuthUserDetails)principal;
			}
		}
		if(null != userDetails && null != userDetails.getUser()){
			userId = userDetails.getUser().getUserId();
		}
		return userId;
	}
	
	public static String getLoginUserName(){
		AuthUserDetails userDetails = (AuthUserDetails) SecurityContextHolder.getContext()
			    .getAuthentication()
			    .getPrincipal();

		return userDetails.getUser().getUserName();
	}
	
}

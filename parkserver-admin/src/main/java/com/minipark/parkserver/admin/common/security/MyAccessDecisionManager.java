package com.minipark.parkserver.admin.common.security;

import java.util.Collection;
import java.util.Iterator;

import org.apache.log4j.Logger;
import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

public class MyAccessDecisionManager implements AccessDecisionManager {  
	
	Logger logger  =  Logger.getLogger(MyAccessDecisionManager.class );
    
    public void decide(Authentication authentication, Object object, Collection<ConfigAttribute> configAttributes) throws AccessDeniedException, InsufficientAuthenticationException {  
        if(configAttributes == null) {
            throw new AccessDeniedException("没有权限访问权限！");
        }
        Iterator<ConfigAttribute> iterator = configAttributes.iterator();
        while(iterator.hasNext()) {  
            ConfigAttribute configAttribute = iterator.next();  
            String needPermission = configAttribute.getAttribute();
            if (needPermission.equals("ALL")) {
            	return;
            }
            for(GrantedAuthority ga : authentication.getAuthorities()) {
                if(needPermission.equals(ga.getAuthority())) {  
                    return;  
                }  
            }  
        }  
        //没有权限  
        throw new AccessDeniedException("没有权限访问权限！");
    }  
  
    public boolean supports(ConfigAttribute attribute) {  
        // TODO Auto-generated method stub  
        return true;  
    }  
  
    public boolean supports(Class<?> clazz) {  
        // TODO Auto-generated method stub  
        return true;  
    }  
      
} 

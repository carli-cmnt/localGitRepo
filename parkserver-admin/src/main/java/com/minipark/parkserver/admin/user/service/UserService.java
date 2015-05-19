package com.minipark.parkserver.admin.user.service;

import java.beans.IntrospectionException;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.minipark.parkserver.admin.utils.BeanToMapUtil;
import com.minipark.parkserver.core.user.dao.LoginUserMapper;
import com.minipark.parkserver.core.user.entity.LoginUser;

@Service
public class UserService {

	@Autowired
	private LoginUserMapper loginUserMapper;

    public int deleteByPrimaryKey(String userId) {
    	return loginUserMapper.deleteByPrimaryKey(userId);
    }

    public int insert(LoginUser record) {
    	return loginUserMapper.insert(record);
    }

    public int insertSelective(LoginUser record) {
    	return loginUserMapper.insertSelective(record);
    }

    public LoginUser selectByPrimaryKey(String userId) {
    	return loginUserMapper.selectByPrimaryKey(userId);
    }

    public List<LoginUser> selectByParam(Map<String, Object> map) {
    	return loginUserMapper.selectByParam(map);
    }

    public List<LoginUser> selectByParam(String userId, String userName, String pwd) {
    	HashMap<String, Object> map = new HashMap<String, Object>();
    	map.put("userId", userId);
    	map.put("userName", userName);
    	map.put("password", pwd);
    	return loginUserMapper.selectByParam(map);
    }

    public int updateByPrimaryKeySelective(LoginUser record) {
    	return loginUserMapper.updateByPrimaryKeySelective(record);
    }

    public int updateByPrimaryKey(LoginUser record) {
    	return loginUserMapper.updateByPrimaryKey(record);
    }
    public List<LoginUser> selectWithPage(LoginUser user, int page, int limit) throws IllegalAccessException, IntrospectionException, InvocationTargetException {
        return loginUserMapper.selectWithPage(BeanToMapUtil.convertBean(user), new PageBounds(page, limit));
    }
}

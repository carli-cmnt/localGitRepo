package com.minipark.parkserver.core.user.dao;

import java.util.List;
import java.util.Map;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.minipark.parkserver.core.user.entity.LoginUser;

public interface LoginUserMapper {
    int deleteByPrimaryKey(String userId);

    int insert(LoginUser record);

    int insertSelective(LoginUser record);

    LoginUser selectByPrimaryKey(String userId);

    List<LoginUser> selectByParam(Map<String, Object> map);

    int updateByPrimaryKeySelective(LoginUser record);

    int updateByPrimaryKey(LoginUser record);

    List<LoginUser> selectWithPage(Map<String, Object> map,PageBounds pageBounds);
}
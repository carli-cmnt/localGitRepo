/**
 * 
 */
package com.minipark.parkserver.core.dao;

import java.util.List;
import java.util.Map;

import com.minipark.parkserver.core.entity.BaseEntity;

public interface BaseMapper {
	
	public void insert(BaseEntity entity);
	
	public void update(BaseEntity entity);
	
	/**
	 * 删除一条记录
	 */
	public void delete(String id);
	
	/**
	 * 根据ID获取记录
	 */
	public BaseEntity get(String id);
}

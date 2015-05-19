package com.minipark.parkserver.core.system.dao;

import java.util.List;
import java.util.Map;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.minipark.parkserver.core.system.entity.AuCity;


public interface AuCityMapper {

	public List<AuCity> getCityListByParameter(Map<String, Object> map);

	public List<AuCity> getCityListByParameter(Map<String, Object> map, PageBounds pageBounds);

	public AuCity getByName(String name);

	public AuCity getByCode(String code);


	public List<AuCity> getAllCityList(Map<String, Object> map);
	
	public List<AuCity> getChildrenById(Map<String, Object> map);

	public List<AuCity> getChildrenById(Map<String, Object> map, PageBounds pageBounds);

	public AuCity getById(Map<String, Object> map);
	
	public AuCity ifExists(Map<String, Object> map);
	
	public void updateHasChild(Map<String, Object> map);
	
	public void delete(List list);
	
	public List<AuCity> getAllCity(Map<String, Object> map);
	

	public void insert(AuCity entity);
	
	public void update(AuCity entity);
	
	public void delete(String id);
	
	public AuCity get(String id);
	
}
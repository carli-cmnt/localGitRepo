package com.minipark.parkserver.core.system.dao;

import java.util.List;
import java.util.Map;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.minipark.parkserver.core.dao.BaseMapper;
import com.minipark.parkserver.core.system.entity.BaseDataType;

public interface DdBaseDataTypeMapper extends BaseMapper {

	public List<BaseDataType> getBaseDataTypeList(Map<String,Object> map);

	public List<BaseDataType> getBaseDataTypeList(Map<String, Object> map, PageBounds pageBounds);
	
	public BaseDataType getBaseDataTypeByCode(String code);
	
	public BaseDataType ifTypeExists(Map<String,Object> map);
	
	public void insert(BaseDataType baseDataType);
	
	public void deleteType(List list);
	
	public void updateIsValid(Map map);
}

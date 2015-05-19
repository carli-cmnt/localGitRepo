/**
*开发单位：中疗科技 
*版权：中疗科技
*@author：clevycorn@cmnt.com
*@since： JDK1.6
*@version：1.0
*@date：2014-9-21 下午4:06:57
*/ 

package com.minipark.parkserver.core.system.dao;

import java.util.List;
import java.util.Map;

import com.minipark.parkserver.core.dao.BaseMapper;
import com.minipark.parkserver.core.system.entity.BaseDataItem;

public interface DdBaseDataItemMapper extends BaseMapper {

	public List<BaseDataItem> getBaseDataItemByTypeCode(String typeCode);
	
	public List<BaseDataItem> getBaseDataItemByTypeId(String typeId);
	
	public BaseDataItem ifItemExists(Map<String,Object> map);
	
	public List<BaseDataItem> getAllAvailableItem(String isDel);
	
	public void updateCodeByTypeId(Map<String,Object> map);

    public BaseDataItem getBelongDepartment(String id);
}
package com.minipark.parkserver.admin.system.service;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.minipark.parkserver.core.system.dao.DdBaseDataItemMapper;
import com.minipark.parkserver.core.system.dao.DdBaseDataTypeMapper;
import com.minipark.parkserver.core.system.entity.BaseDataItem;
import com.minipark.parkserver.core.system.entity.BaseDataType;

@Component
@Transactional(value="FACore")
@SuppressWarnings({ "rawtypes", "unchecked" })
public class BaseDataService {

	@Autowired
	private DdBaseDataTypeMapper ddBaseDataTypeMapper;
	
	@Autowired
	private DdBaseDataItemMapper ddBaseDataItemMapper;
	
	
	public List<BaseDataType> getBaseDataTypeList(Map<String,Object> map){
		return ddBaseDataTypeMapper.getBaseDataTypeList(map);
	}

	public List<BaseDataType> getBaseDataTypeList(Map<String,Object> map, int page, int limit){
		return ddBaseDataTypeMapper.getBaseDataTypeList(map, new PageBounds(page, limit));
	}

	public BaseDataType getById(String editId){
		return (BaseDataType) ddBaseDataTypeMapper.get(editId);
	}
	
	public void saveOrUpdateBaseDataType(BaseDataType baseDataType){
		if (StringUtils.isBlank(baseDataType.getId())){
			baseDataType.setIsValid("0");
			baseDataType.setIsDel("0");
			ddBaseDataTypeMapper.insert(baseDataType);
		}else{
			ddBaseDataTypeMapper.update(baseDataType);
			if (!baseDataType.getOldCode().equals(baseDataType.getCode())){
				Map<String,Object> map = new HashMap<String,Object>();
				map.put("typeId", baseDataType.getId());
				map.put("code", baseDataType.getCode());
				ddBaseDataItemMapper.updateCodeByTypeId(map);
			}
		}
	}
	
	public void saveOrUpdateBaseDataItem(BaseDataItem baseDataItem){
		if (StringUtils.isBlank(baseDataItem.getId())){
			baseDataItem.setIsValid("1");
			baseDataItem.setIsDel("0");
			ddBaseDataItemMapper.insert(baseDataItem);
		}else{
			ddBaseDataItemMapper.update(baseDataItem);
		}
	}
	
	public BaseDataType ifTypeExists(Map<String,Object> map){
		return ddBaseDataTypeMapper.ifTypeExists(map);
	}
	
	public BaseDataItem ifItemExists(Map<String,Object> map){
		return ddBaseDataItemMapper.ifItemExists(map);
	}
	
	public List<Map<String,Object>> getBaseDataTree(String typeId){
		List<Map<String,Object>> treeList = new ArrayList<Map<String,Object>>();
		BaseDataType baseDataType = (BaseDataType) ddBaseDataTypeMapper.get(typeId);
		Map<String,Object> rootMap = new HashMap<String,Object>();
		rootMap.put("id", baseDataType.getId());
		rootMap.put("text", baseDataType.getName());
		rootMap.put("parent", "#");
		Map<String,Object> stateMap = new HashMap<String,Object>();
		stateMap.put("opened",true);
		rootMap.put("state", stateMap);
		treeList.add(rootMap);
		List<BaseDataItem> itemList = ddBaseDataItemMapper.getBaseDataItemByTypeId(typeId);
		for (BaseDataItem baseDataItem : itemList) {
			Map<String,Object> childMap = new HashMap<String,Object>();
			childMap.put("id", baseDataItem.getId());
			childMap.put("text", baseDataItem.getName());
			childMap.put("parent", baseDataItem.getTypeId());
			childMap.put("code", baseDataItem.getCode());
			childMap.put("typeCode", baseDataItem.getTypeCode());
			childMap.put("seqNo", baseDataItem.getSeqNo());
			childMap.put("description", baseDataItem.getDescription());
			childMap.put("isValid", baseDataItem.getIsValid());
			treeList.add(childMap);
		}
		return treeList;
	}

	public Map<String, String> getBaseDataItemNameMap(String typeCode) {
		Map<String, String> map = new HashMap<String, String>();
		List<BaseDataItem> itemList = ddBaseDataItemMapper.getBaseDataItemByTypeCode(typeCode);
		for (BaseDataItem item : itemList) {
			map.put(item.getCode(), item.getName());
		}
		return map;
	}

	public Map<String, BaseDataItem> getBaseDataItemMap(String typeCode) {
		Map<String, BaseDataItem> map = new HashMap<String, BaseDataItem>();
		List<BaseDataItem> itemList = ddBaseDataItemMapper.getBaseDataItemByTypeCode(typeCode);
		for (BaseDataItem item : itemList) {
			map.put(item.getCode(), item);
		}
		return map;
	}

	public void deleteTypeByIds(String delIds){
		List list =  new ArrayList();
		String[] ids = delIds.split(",");
		for (int i = 0; i < ids.length; i++) {
			list.add(ids[i]);
		}
		ddBaseDataTypeMapper.deleteType(list);
	}
	
	public List<BaseDataItem> getBaseDataItemByTypeCode(String code){
		return ddBaseDataItemMapper.getBaseDataItemByTypeCode(code);
	}
	
	public void updateIsValid(Map map){
		ddBaseDataTypeMapper.updateIsValid(map);
	}
	
	
	public BaseDataItem getBelongDepartment(String id){
		return ddBaseDataItemMapper.getBelongDepartment(id);
	}
}

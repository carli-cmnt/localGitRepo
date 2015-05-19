package com.minipark.parkserver.admin.system.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.minipark.parkserver.core.system.dao.AuCityMapper;
import com.minipark.parkserver.core.system.entity.AuCity;

@Service
public class CityService {
	
	@Autowired
	private AuCityMapper auCityMapper;

	
//	public List<AuCity> getCityProvince(){
//		return auCityMapper.selectAllProvince();
//	}
	
	public List<AuCity> getCityListByParameter(Map<String, Object> map){
		return auCityMapper.getCityListByParameter(map);
	}

	public List<AuCity> getCityListByParameter(Map<String, Object> map, int page, int limit) {
		return auCityMapper.getCityListByParameter(map, new PageBounds(page, limit));
	}

	public List<AuCity> getAllCityList(Map<String, Object> map){
		return auCityMapper.getAllCityList(map);
	}
	
	public List<AuCity> getChildrenById(Map<String, Object> map){
		return auCityMapper.getChildrenById(map);
	}

	
	public List<AuCity> getChildrenById(Map<String, Object> map, int page, int limit){
		return auCityMapper.getChildrenById(map, new PageBounds(page, limit));
	}

	public AuCity getById(Map<String, Object> map){
		return auCityMapper.getById(map);
	}
	
	public void save(AuCity city){
		auCityMapper.insert(city);
		
		//有父节点，父节点的hasChild改为1
		if(city.getSuperCityId()!=null && !"".equals(city.getSuperCityId())){
			Map<String, Object> map =new HashMap<String, Object>();
			map.put("id", city.getSuperCityId());
			map.put("hasChild", "1");
			auCityMapper.updateHasChild(map);
		}
	}
	
	public void update(AuCity city){
		auCityMapper.update(city);
	}
	
	public AuCity ifExists(Map<String, Object> map){
		return auCityMapper.ifExists(map);
	}
	
	public void deleteByIds(String delIds){
		List list =  new ArrayList();
		String[] ids = delIds.split(",");
		for (int i = 0; i < ids.length; i++) {
			list.add(ids[i]);
		}
		auCityMapper.delete(list);
		
		//判断这些节点的父节点是否还有子项， 没有了就把haschild改为0
		for (int i = 0; i < ids.length; i++) {
			String cityId = ids[i];
			//查询删除项对象
			Map<String, Object> map =new HashMap<String, Object>();
			map.put("cityId", cityId);
			AuCity city =  auCityMapper.getById(map);
			
			if(city.getSuperCityId()!=null && !"".equals(city.getSuperCityId())){
				Map<String, Object> map1 =new HashMap<String, Object>();
				map1.put("id", city.getSuperCityId());
				//查询父节点对象旗下的子节点
				List<AuCity> list1 = auCityMapper.getChildrenById(map1);
				//子节点为空，就把haschild改为0
				if(list1==null || list1.size()==0){
					Map<String, Object> map2 =new HashMap<String, Object>();
					map2.put("id", city.getSuperCityId());
					map2.put("hasChild", "0");
					auCityMapper.updateHasChild(map2);
				}
			}
		}
	}
	
	/**
	 * 提取获得所属城市信息的方法
	 * @return 城市名
	 */
	public String getBelongCity(String[]  citys){
		HashMap<String, Object> map=new HashMap<String, Object>();
		HashMap<String, Object> map1=new HashMap<String, Object>();
		HashMap<String, Object> map2=new HashMap<String, Object>();
		for(int i=0;i<citys.length;i++){
			if(i==0){
				map.put("cityId", citys[0]);
				//System.out.println(citys[0]);
			}
			if(i==1){
				map1.put("cityId", citys[0]+"."+citys[1]);
				//System.out.println(map2.get("id"));
			}
			if (i==2) {
				map2.put("cityId", citys[0]+"."+citys[1]+"."+citys[2]);
			}
		}
		AuCity cityList=this.getById(map);
		AuCity cityList1=this.getById(map1);
		AuCity cityList2=this.getById(map2);
		String belongCity=null;
		if (citys!=null) {
		 belongCity=cityList.getCityName()+"-"+cityList1.getCityName()+"-"+cityList2.getCityName();
		}
		return belongCity;
	}
}

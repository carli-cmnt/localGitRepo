package com.minipark.parkserver.admin.system.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.github.miemiedev.mybatis.paginator.domain.PageList;
import com.minipark.parkserver.admin.common.JsonResult;
import com.minipark.parkserver.admin.common.PageForJqGrid;
import com.minipark.parkserver.admin.system.service.CityService;
import com.minipark.parkserver.admin.utils.EmptyUtil;
import com.minipark.parkserver.admin.utils.TreeOptions;
import com.minipark.parkserver.admin.utils.TreeUtils;
import com.minipark.parkserver.core.system.entity.AuCity;


@Controller
@RequestMapping("/system/city")
public class CityController {
	
	@Autowired
	private CityService cityService;
	
	@RequestMapping("/")
	public ModelAndView index(){
		return new ModelAndView("system/city/city-index");
	}
	
	@RequestMapping("/list")
	@ResponseBody
	public PageForJqGrid<AuCity> getList(PageForJqGrid<AuCity> page,AuCity city) throws Exception{
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("cityName", city.getCityName());
		map = page.pageToMap(page,map);
		List<AuCity> list = cityService.getCityListByParameter(map, page.getPage(), page.getRows());
		page.listToPage(page, list);

		PageList pageList = (PageList)list;
		page.listToPage(page, list);
		page.setRecords(pageList.getPaginator().getTotalCount());
		page.setTotal(pageList.getPaginator().getTotalPages());
		return page;
	}
	
	@RequestMapping("/listForTree")
	@ResponseBody
	public List getTreeList(String showRoot) throws Exception{
		List<AuCity> list = cityService.getAllCityList(new HashMap<String,Object>());
		
		TreeOptions options = new TreeOptions(list);
		options.setId("id");
		options.setText("cityName");
		options.setNodeLevel("cityType");
		options.setHasChild("hasChild");
		options.setParentId("superCityId");
		options.setExtendedFields(new String[]{"cityCode"});
		if ("0".equals(showRoot)){
			options.setShowRoot(false);
		}else{
			options.setShowRoot(true);
			options.setRootText("全国");
		}
		
		return TreeUtils.getListForJsTree(options);
	}
	
	@RequestMapping("/input")
	@ResponseBody
	public ModelAndView input(String cityId) throws Exception{
		ModelAndView view = new ModelAndView("system/city/city-input");
		Map<String, Object> map =new HashMap<String, Object>();
		map.put("cityId", cityId);
		AuCity city = cityService.getById(map);
		view.addObject("city", city);
		return view;
	}
	
	@RequestMapping("/getChildrenById")
	@ResponseBody
	public PageForJqGrid<AuCity> getChildrenById(PageForJqGrid<AuCity> page,AuCity city) throws Exception{
		Map<String, Object> map =new HashMap<String, Object>();
		map.put("id", city.getId());
		map = page.pageToMap(page,map);
		List<AuCity> list = cityService.getChildrenById(map, page.getPage(), page.getRows());
		page.listToPage(page, list);

		PageList pageList = (PageList)list;
		page.listToPage(page, list);
		page.setRecords(pageList.getPaginator().getTotalCount());
		page.setTotal(pageList.getPaginator().getTotalPages());
		return page;
	}
	
	@RequestMapping("save")
	@ResponseBody
	public JsonResult<AuCity> save(AuCity city){
		city.setIsDel("0");
		if(city.getIsValid()!=null && "on".equals(city.getIsValid())){
			city.setIsValid("1");
		}else{
			city.setIsValid("0");
		}
		
		if(city.getId()==null || "".equals(city.getId())){
			//新增
			if(city.getSuperCityId()==null || "".equals(city.getSuperCityId())){
				//没有父ID，即为第一级组织机构
				city.setCityType("1");
			}
			cityService.save(city);
		}else{
			//修改的情况
			cityService.update(city);
		}
		JsonResult<AuCity> json = new JsonResult<AuCity>();
		json.setResult(city);
		return json;
	}
	
	@RequestMapping("validateExist")
	@ResponseBody
	public boolean validateExist(String cityCode,String cityId){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("cityCode", cityCode);
		map.put("id", cityId);
		map.put("isDel", "0");
		AuCity city = (AuCity)cityService.ifExists(map);
		if (EmptyUtil.isEmpty(city)) {
			return true;
		}else {
			return false;
		}
	}
	
	@RequestMapping("delete")
	@ResponseBody
	public JsonResult<String> delete(String delIds){
		cityService.deleteByIds(delIds);
		JsonResult<String> json = new JsonResult<String>();
		json.setResult("done");
		return json;
	}
	
	@RequestMapping("/citySelect")
	@ResponseBody
	public List<Map<String,Object>> citySelect(String type){
		if (StringUtils.isBlank(type)){
			type = "3";
		}
		return null;//cityService.getCityByType(type);
	}
}

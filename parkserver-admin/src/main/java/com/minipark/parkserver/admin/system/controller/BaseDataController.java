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
import com.minipark.parkserver.admin.system.service.BaseDataService;
import com.minipark.parkserver.admin.utils.EmptyUtil;
import com.minipark.parkserver.core.system.entity.BaseDataItem;
import com.minipark.parkserver.core.system.entity.BaseDataType;

@Controller
@RequestMapping("/system/dataDictionary")
@SuppressWarnings({"rawtypes","unchecked"})
public class BaseDataController {
		
		@Autowired
		private BaseDataService baseDataService;
		
		@RequestMapping("/")
		public ModelAndView index(){
			return new ModelAndView("system/basedata/baseData-index");
		}
		
		/**
		 * @author: ZHANGJH
		 * @date: 2014-9-21 下午4:54:05
		 * @Description: ajax动态取列表
		 * @param page
		 * @param baseDataType
		 * @return
		 */
		@RequestMapping("/list")
		@ResponseBody
		public PageForJqGrid<BaseDataType> getList(PageForJqGrid<BaseDataType> page,BaseDataType baseDataType){
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("code", baseDataType.getCode());
			map.put("name", baseDataType.getName());
			map = page.pageToMap(page,map);
			List<BaseDataType> list = baseDataService.getBaseDataTypeList(map, page.getPage(), page.getRows());

			PageList pageList = (PageList)list;
			page.listToPage(page, list);
			page.setRecords(pageList.getPaginator().getTotalCount());
			page.setTotal(pageList.getPaginator().getTotalPages());
			return page;
		}
		
		/**
		 * @author: ZHANGJH
		 * @date: 2014-9-21 下午4:54:20
		 * @Description: 编辑页面
		 * @param editId
		 * @return
		 * @throws Exception
		 */
		@RequestMapping("/step")
		public ModelAndView input(String typeId) throws Exception{
			ModelAndView view = new ModelAndView("system/basedata/baseData-step");
			if (!StringUtils.isBlank(typeId)){
				BaseDataType baseDataType = baseDataService.getById(typeId);
				view.addObject("baseDataType", baseDataType);
			}
			return view;
		} 
		
		/**
		 * @author: ZHANGJH
		 * @date: 2014-9-22 上午9:57:58
		 * @Description: 保存数据字典类型
		 * @param baseDataType
		 * @return
		 */
		@RequestMapping("/saveBaseDataType")
		@ResponseBody
		public JsonResult<BaseDataType> saveBaseDataType(BaseDataType baseDataType){
			baseDataService.saveOrUpdateBaseDataType(baseDataType);
			JsonResult<BaseDataType> json = new JsonResult<BaseDataType>();
			json.setResult(baseDataType);
			return json;
		}
		
		
		/**
		 * @author: ZHANGJH
		 * @date: 2014-9-22 下午2:54:37
		 * @Description: 保存数据项类型
		 * @param baseDataItem
		 * @return
		 */
		@RequestMapping("/saveBaseDataItem")
		@ResponseBody
		public JsonResult<BaseDataItem> saveBaseDataItem(BaseDataItem baseDataItem){
			baseDataService.saveOrUpdateBaseDataItem(baseDataItem);
			JsonResult<BaseDataItem> json = new JsonResult<BaseDataItem>();
			json.setResult(baseDataItem);
			return json;
		}
		
		/**
		 * @author: ZHANGJH
		 * @date: 2014-9-22 上午10:08:59
		 * @Description: 检验类型编码是否已存在
		 * @param code
		 * @param id
		 * @return
		 */
		@RequestMapping("validateTypeCodeExist")
		@ResponseBody
		public boolean validateTypeCodeExist(String code,String id){
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("code", code);
			map.put("id", id);
			BaseDataType baseDataType = (BaseDataType)baseDataService.ifTypeExists(map);
			if (EmptyUtil.isEmpty(baseDataType)) {
				return true;
			}else {
				return false;
			}
		}
		
		/**
		 * @author: ZHANGJH
		 * @date: 2014-9-24 下午1:30:40
		 * @Description: Delete
		 * @param delIds
		 * @return
		 */
		@RequestMapping("delete")
		@ResponseBody
		public JsonResult<String> delete(String delIds){
			baseDataService.deleteTypeByIds(delIds);
			JsonResult<String> json = new JsonResult<String>();
			json.setResult("done");
			return json;
		}
		
		/**
		 * @author: ZHANGJH
		 * @date: 2014-9-22 上午10:08:59
		 * @Description: 检验类型编码是否已存在
		 * @param code
		 * @param id
		 * @return
		 */
		@RequestMapping("validateItemCodeExist")
		@ResponseBody
		public boolean validateItemCodeExist(String typeCode,String code,String id){
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("code", code);
			map.put("id", id);
			map.put("typeCode", typeCode);
			BaseDataItem baseDataItem = (BaseDataItem)baseDataService.ifItemExists(map);
			if (EmptyUtil.isEmpty(baseDataItem)) {
				return true;
			}else {
				return false;
			}
		}
		
		/**
		 * @author: ZHANGJH
		 * @date: 2014-9-22 下午1:10:37
		 * @Description: 以树的形式取出数据字典
		 * @param typeCode
		 * @return
		 */
		@RequestMapping("/getBaseDataTree")
		@ResponseBody
		public List getBaseDataTree(String typeId){
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("typeId", typeId);
			return baseDataService.getBaseDataTree(typeId);
		}
		
		/**
		 * @author: ZHANGJH
		 * @date: 2014年9月28日 上午11:52:33
		 * @Description: 无效与有效
		 * @param id
		 * @param flag
		 * @return
		 */
		@RequestMapping("changeValid")
		@ResponseBody
		public JsonResult<String>changeValid(String id,String flag){
			Map map = new HashMap();
			map.put("id", id);
			map.put("isValid", flag);
			baseDataService.updateIsValid(map);
			JsonResult<String> json = new JsonResult<String>();
			json.setResult("done");
			return json;
		}
}

package com.minipark.parkserver.admin.system.controller;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.minipark.parkserver.admin.common.JsonResult;
import com.minipark.parkserver.admin.common.PageForJqGrid;
import com.minipark.parkserver.admin.system.service.BaseDataService;
import com.minipark.parkserver.admin.system.service.MenuService;
import com.minipark.parkserver.admin.system.service.RoleService;
import com.minipark.parkserver.admin.utils.CmntConst;
import com.minipark.parkserver.admin.utils.CmntUtil;
import com.minipark.parkserver.admin.utils.EmptyUtil;
import com.minipark.parkserver.admin.utils.JsonUtils;
import com.minipark.parkserver.admin.utils.TreeOptions;
import com.minipark.parkserver.admin.utils.TreeUtils;
import com.minipark.parkserver.core.system.entity.AuMenu;
import com.minipark.parkserver.core.system.entity.AuRole;
import com.minipark.parkserver.core.system.entity.BaseDataItem;

@Controller
@RequestMapping("/system/role")
public class RoleController {
		@Autowired
		private RoleService roleService;

		@Autowired
		private MenuService menuService;

		@Autowired
		private BaseDataService baseDataService;

		@RequestMapping("/")
		public ModelAndView index(){
			return new ModelAndView("system/role/role-index");
		}

		@RequestMapping("/selectMenuActions")
		public ModelAndView selectMenuActions(String id){
			ModelAndView modelView = new ModelAndView("system/role/role-selectMenu");
			List actions = roleService.getAllActionsRoleRel(id);
			
			//JSONArray JsonArray = JSONArray.fromObject(actions);
		    //String jsonData =  JsonArray.toString();
			
			String jsonData = JsonUtils.parseListToString(actions);
		    //jsonData = this.fomatJsonString(jsonData);
			modelView.addObject("menuIds", jsonData);
			return modelView;
		}
		
		@RequestMapping("/list")
		@ResponseBody
		public PageForJqGrid<AuRole> getList(PageForJqGrid<AuRole> page,AuRole role){
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("roleName", role.getRoleName());
			map = page.pageToMap(page,map);
			List<AuRole> list = roleService.getRoleList(map);
			page.listToPage(page, list);
			return page;
		}
		
		@RequestMapping("/input")
		public ModelAndView input(String id){
			ModelAndView view = new ModelAndView("system/role/role-input");
			AuRole role = roleService.getRoleById(id);
			view.addObject("role", role);
			return view;
		}
		
		@RequestMapping("save")
		@ResponseBody
		public JsonResult<AuRole> save(AuRole role){
			roleService.saveOrUpdate(role);
			JsonResult<AuRole> json = new JsonResult<AuRole>();
			json.setResult(role);
			return json;
		}
		
		@RequestMapping("validateExist")
		@ResponseBody
		public boolean validateExist(String roleName,String id){
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("roleName", roleName);
			map.put("id", id);
			AuRole role = (AuRole)roleService.ifExists(map);
			if (EmptyUtil.isEmpty(role)) {
				return true;
			}else {
				return false;
			}
		}
		
		@RequestMapping("validateExistCode")
		@ResponseBody
		public boolean validateExistCode(String roleCode,String id){
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("roleCode", roleCode);
			map.put("id", id);
			AuRole role = (AuRole)roleService.ifExistsRoleCode(map);
			if (EmptyUtil.isEmpty(role)) {
				return true;
			}else {
				return false;
			}
		}
		
		@RequestMapping("delete")
		@ResponseBody
		public JsonResult<String> delete(String delIds){
			roleService.deleteByIds(delIds);
			JsonResult<String> json = new JsonResult<String>();
			json.setResult("done");
			return json;
		}
		
		@RequestMapping("saveRoleMenuRel")
		@ResponseBody
		public JsonResult<String> saveRoleMenuRel(String roleId,String actions,String menuSuperIds){
			//List<String> actionList= new ArrayList<String>();
			//Collections.addAll(actionList, CmntUtil.urlDecodeDouble(menuIds).split(","));
			String strActions = CmntUtil.urlDecodeDouble(actions);
			//JSONObject jsonObj = JSONObject.fromObject(strActions);
			Map jsonObj = JsonUtils.parseMapFromString(strActions);
			Iterator<String> itr = jsonObj.keySet().iterator();
			
			String key;
			String value;
			Map<String,String> map = new HashMap<String,String>();

			while(itr.hasNext()){
				key = itr.next();
				//value = jsonObj.getString(key);
				value = (String)jsonObj.get(key);
				map.put(key, value);
			}
			roleService.saveRoleMenuRel(roleId, map);
			JsonResult<String> json = new JsonResult<String>();
			json.setResult("done");
			return json;
		}
		
		@RequestMapping("/listForTree")
		@ResponseBody
		public List getTreeList() throws Exception{
			Map map  =  new HashMap();
			map.put("isValid", '1');
			List<AuRole> list = roleService.getRoleList(map);

			TreeOptions options = new TreeOptions(list);
			options.setId("id");
			options.setText("roleName");
			options.setNodeLevel("undefined");
			options.setHasChild("treeType");
			options.setParentId("undefined");
			
			return TreeUtils.getListForJsTree(options);
		}
		
		@RequestMapping("changeValid")
		@ResponseBody
		public JsonResult<String>changeValid(String id,String flag){
			Map map = new HashMap();
			map.put("id", id);
			map.put("isValid", flag);
			roleService.updateIsValid(map);
			JsonResult<String> json = new JsonResult<String>();
			json.setResult("done");
			return json;
		}
		
		@RequestMapping("/allValidMenu")
		@ResponseBody
		public List getAllValidMenus() throws Exception{
			List<AuMenu> list = menuService.selectAllMenus(new HashMap<String,Object>());
			
			TreeOptions options = new TreeOptions(list);
			options.setId("id");
			options.setText("menuName");
			options.setNodeLevel("menuLevel");
			options.setHasChild("hasChild");
			options.setParentId("superId");
			options.setOpenAll(true);
			options.setExtendedFields(new String[]{"iconCode","menuPath"});
			
			List rsList = TreeUtils.getListForJsTree(options);
			return rsList;
		}
		
		@RequestMapping("/menuListForTree")
		@ResponseBody
		public List getMenuTreeList(AuRole role) throws Exception{
			List<AuMenu> list = menuService.selectAllMenus(new HashMap<String,Object>());
			
			TreeOptions options = new TreeOptions(list);
			options.setId("id");
			options.setText("menuName");
			options.setNodeLevel("menuLevel");
			options.setHasChild("hasChild");
			options.setParentId("superId");
			options.setExtendedFields(new String[]{"iconCode","menuPath","menuOrder","menuCode"});
			options.setShowRoot(true);
			options.setOpenAll(true);
			options.setRootText("所有");
			
			return TreeUtils.getListForJqgridTree(options);
		}
		
		@RequestMapping("/getColumnNames")
		@ResponseBody
		public JsonResult<String> getColumnNames() throws Exception{
			List<BaseDataItem> list = baseDataService
					.getBaseDataItemByTypeCode(CmntConst.DD_KEYWORD_ACTIONINFO);
			
			JsonResult<String> json = new JsonResult<String>();
			//JSONArray JsonArray = JSONArray.fromObject(list);
		    //String jsonData =  JsonArray.toString();
			String jsonData = JsonUtils.parseListToString(list);
			json.setResult(jsonData);
			return json;
		}
		
		public static void main(String[] args) {
			/*String s = "{\"root_999\":\"add,del\",\"100000\":\"del,upd\",\"100002\":\"upd,qry\",\"100003\":\"qry\",\"100001\":\"upd\",\"100004\":\"del,upd\",\"100005\":\"upd\",\"6c7f0156-c127-11e3-9911-9c52c7f05cfa\":\"add,del,upd,qry,adt\"}";
			JSONObject json = JSONObject.fromObject(s);
			
			Iterator<String> itr = json.keys();
			
			while(itr.hasNext()){
				String key = itr.next();
				System.out.println(key + ":" + json.getString(key));
			}*/
			
			String jsonstring = "[{\"menu_id\":\"100004\",\"actions\":\"qry,adt\"},{\"menu_id\":\"100003\",\"actions\":\"del,upd\"},{\"menu_id\":\"100002\",\"actions\":\"add,del\"},{\"menu_id\":\"100001\",\"actions\":\"upd,qry\"},{\"menu_id\":\"6c7f0156-c127-11e3-9911-9c52c7f05cfa\",\"actions\":\"imp,exp\"},{\"menu_id\":\"100005\",\"actions\":\"adt,imp\"}]";
			/*JSONArray JsonArray = JSONArray.fromObject(jsonstring);
			
			for (Object obj : JsonArray) {
				String menuid = ((JSONObject)obj).get("menu_id").toString();
				String actions = ((JSONObject)obj).get("actions").toString();
				System.out.println("\"" + menuid + "\":\"" + actions + "\"");
			}*/
			
			//jsonstring = fomatJsonString(jsonstring);
			//System.out.println(jsonstring);
		}
		
		public String fomatJsonString(String mapString) {
			String jsonString = "";
			//JSONArray JsonArray = JSONArray.fromObject(mapString);
			List JsonArray = JsonUtils.parseListFromString(mapString);
			for (Object obj : JsonArray) {
				String menuid = ((Map)obj).get("menu_id").toString();
				String actions = ((Map)obj).get("actions").toString();
				
				if ("".equals(jsonString)){
					jsonString += "\"" + menuid + "\":\"" + actions + "\"";
				} else {
					jsonString += ",\"" + menuid + "\":\"" + actions + "\"";
				}
			}
			return "[{" + jsonString + "}]";
		}
}

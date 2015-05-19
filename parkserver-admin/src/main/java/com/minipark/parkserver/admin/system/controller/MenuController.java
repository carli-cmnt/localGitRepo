package com.minipark.parkserver.admin.system.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.minipark.parkserver.admin.common.JsonResult;
import com.minipark.parkserver.admin.common.PageForJqGrid;
import com.minipark.parkserver.admin.system.service.MenuService;
import com.minipark.parkserver.admin.utils.EmptyUtil;
import com.minipark.parkserver.admin.utils.LoginUserHelper;
import com.minipark.parkserver.admin.utils.TreeOptions;
import com.minipark.parkserver.admin.utils.TreeUtils;
import com.minipark.parkserver.core.system.entity.AuMenu;
import com.minipark.parkserver.core.system.entity.AuRole;

/**
 * @author: ZHANGJH
 * @pageName: com.cmnt.controller.system
 * @fileName: MenuController.java
 * @date: 2014-9-25
 * @doc: Menu Controller
 */
@Controller
@RequestMapping("/system/menu")
@SuppressWarnings({"rawtypes"})
public class MenuController {
	@Autowired
	private MenuService menuService;

	/**
	 * @author: ZHANGJH
	 * @date: 2014-9-25
	 * @doc: Menu Index Page
	 * @return
	 */
	@RequestMapping("/")
	public ModelAndView index(){
		ModelAndView model = new ModelAndView("system/menu/menu-index");
		return model;
	}
	
	/**
	 * @author: ZHANGJH
	 * @date: 2014-9-1
	 * @doc: 新增
	 * @param orgId
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/inputNew")
	@ResponseBody
	public ModelAndView inputNew(String superId) throws Exception{
		ModelAndView view = new ModelAndView("system/menu/menu-input");
		Map<String, Object> map =new HashMap<String, Object>();
		map.put("id", superId);
		AuMenu menu = menuService.getMenuById(map);
		view.addObject("superMenu", menu);
		return view;
	}
	
	/**
	 * @author: ZHANGJH
	 * @date: 2014-9-1
	 * @doc: 修改
	 * @param orgId
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/inputEdit")
	@ResponseBody
	public ModelAndView inputEdit(String menuId) throws Exception{
		ModelAndView view = new ModelAndView("system/menu/menu-input");
		Map<String, Object> map =new HashMap<String, Object>();
		map.put("id", menuId);
		AuMenu menu = menuService.getMenuById(map);
		map.put("id", menu.getSuperId());
		AuMenu superMenu = menuService.getMenuById(map);
		view.addObject("menu", menu);
		view.addObject("superMenu", superMenu);
		return view;
	}
	
	/**
	 * @author: ZHANGJH
	 * @date: 2014-9-27
	 * @doc: 取所有树的数据
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/listForTree")
	@ResponseBody
	public List getTreeList(AuMenu menu) throws Exception{
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
	
	
	/**
	 * @author: ZHANGJH
	 * @date: 2014-9-9 下午5:10:06
	 * @Description: 取出所有可用的菜单 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/allAvailableMenu")
	@ResponseBody
	public List getAllAvailableMenus() throws Exception{
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
	

	@RequestMapping("/getMenus")
	@ResponseBody
	public JsonResult<String> getMenus() throws Exception{
		JsonResult<String> json = new JsonResult<String>();
		List<AuMenu> list = new ArrayList<AuMenu>();
		if (LoginUserHelper.isLogin()) {
			List<AuRole> roleList = LoginUserHelper.getLoginUserRoles();
			for (AuRole role : roleList) {
				list.addAll(menuService.getAllMenusByRoleId(role.getId()));
			}
			//list = menuService.selectAllMenus(new HashMap<String,Object>());
		}
		TreeOptions options = new TreeOptions(list);
		options.setId("id");
		options.setText("menuName");
		options.setNodeLevel("menuLevel");
		options.setHasChild("hasChild");
		options.setParentId("superId");
		options.setOpenAll(true);
		options.setExtendedFields(new String[]{"iconCode","menuPath"});
		String jsonStr = TreeUtils.getTree2String(options);

		json.setResult(jsonStr);
		return json;
	}
	/**
	 * @author: ZHANGJH
	 * @date: 2014-9-27
	 * @doc: 取用户菜单
	 * @return
	 * @throws Exception
	 */
/*	@RequestMapping("/availableMenu")
	@ResponseBody
	public JsonResult<String> getUserAvailableMenus() throws Exception{
		JsonResult<String> json = new JsonResult<String>();
		json.setResult(LoginUserHelper.getLoginUser().getUserMenuJson());
		return json;
	}
	*/
	/**
	 * @author: ZHANGJH
	 * @date: 2014-9-27
	 * @doc: 按ID取出AuMenu对象
	 * @param menu
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/save")
	@ResponseBody
	public JsonResult<AuMenu> save(AuMenu menu) throws Exception{
		if (menu.getCreateDate() == null) {
			menu.setCreateDate(new Date());
		}
		menu.setLastUpdateDate(new Date());
		menuService.save(menu);
		JsonResult<AuMenu> json = new JsonResult<AuMenu>();
		json.setMsg("done");
		return json;
	}
	
	/**
	 * @author: ZHANGJH
	 * @date: 2014-9-28
	 * @doc: 删除
	 * @param delId
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/delete")
	@ResponseBody
	public JsonResult<String> delete(String delIds) throws Exception{
		menuService.deleteByIds(delIds);
		JsonResult<String> json = new JsonResult<String>();
		json.setMsg("done");
		return json;
	}

	
	/**
	 * @author: ZHANGJH
	 * @date: 2014-9-31
	 * @doc: CheckExistCode
	 * @param roleName
	 * @param id
	 * @return
	 */
	@RequestMapping("validateExistCode")
	@ResponseBody
	public boolean validateExistCode(String menuCode,String id){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("menuCode", menuCode);
		map.put("id", id);
		AuMenu menu = (AuMenu)menuService.ifExistsMenuCode(map);
		if (EmptyUtil.isEmpty(menu)) {
			return true;
		}else {
			return false;
		}
	}
}

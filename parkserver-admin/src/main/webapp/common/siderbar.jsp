<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%
		String path = request.getContextPath();
		String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	%>

	<script type="text/javascript">
		try{ace.settings.check('main-container' , 'fixed')}catch(e){}
	</script>
	<a class="menu-toggler" id="menu-toggler" href="#">
		<span class="menu-text"></span>
	</a>
	<div class="sidebar" id="sidebar">
		<input id="contextpath" type="hidden" value="<%=basePath%>"/>
		<script type="text/javascript">
				try{ace.settings.check('sidebar' , 'fixed')}catch(e){}
			</script>

		<div class="sidebar-shortcuts" id="sidebar-shortcuts">
			<div class="sidebar-shortcuts-large" id="sidebar-shortcuts-large">
				<button class="btn btn-success" title="显示首页" id="mainpage">
					<i class="icon-signal"></i>
				</button>

				<button class="btn btn-info" title="显示通知" id="notice">
					<i class="icon-pencil"></i>
				</button>

				<button class="btn btn-warning" title="修改密码" id="updpwd">
					<i class="icon-group"></i>
				</button>

				<button class="btn btn-danger" title="查看帮助" id="qryhelp">
					<i class="icon-cogs"></i>
				</button>
			</div>
		</div>
		<!-- #sidebar-shortcuts -->

		<ul class="nav nav-list" id="leftMenu_ul">

		</ul>
		<!-- /.nav-list -->

		<div class="sidebar-collapse" id="sidebar-collapse">
			<i class="icon-double-angle-left" data-icon1="icon-double-angle-left" data-icon2="icon-double-angle-right"></i>
		</div>

		<script type="text/javascript">
			try{ace.settings.check('sidebar' , 'collapsed')}catch(e){}
		</script>
		
		<div id="alertmsg" style="z-index:1000;"></div>
		<div id="base-input" class="modal"></div>	
		<script type="text/javascript">
			var contextpath = $("#contextpath").val();
			try{
				var help_win;
				var gui = require('nw.gui');
			}catch(ex){
			}
			
			jQuery(function($){
				$.ajax({
				    type: "post",
				    url: "${contextPath }/system/menu/getMenus",
				    dataType: "json",
				    success: function(json){
				    	treeObject = null;
				    	var tree_data= $.parseJSON(json.result);
				    	buildLeftMenu(tree_data);
				    }
				 });
				
				$("#mainpage").click(function(){
					//CommUtils.commAlert("alertmsg", "显示首页！");
					$.cookies.set("openMenuId", "mainpage");
					$.cookies.set("activeMenuId", "mainpage");
					location.href="${contextPath }/common/welcomePage";
				});
				$("#notice").click(function(){
					$.cookies.set("openMenuId", "0c0a7fac-5364-11e4-91cc-00e0ed3551d0");
					$.cookies.set("activeMenuId", "6d101e28-6881-11e4-ba90-00e0ed3551d0");
					location.href="${contextPath }/notice/inbox";
				});
				$("#updpwd").click(function(){
					$('#base-input').removeData("bs.modal");
					$('#base-input').modal({
						//remote:"${contextPath }/system/user/findPassword?timestamp=" + new Date().getTime(),
						remote:"${contextPath }/system/mainpage/inputPwd?timestamp=" + new Date().getTime(),
						backdrop:'static'
					});
				});
				
				$("#qryhelp").click(function(){
					if(help_win){
						help_win.show();
					}else{
						//alert(contextpath);
						//help_win = gui.Window.get(window.open('${contextPath }/html/portal.htm');
						help_win = gui.Window.open(contextpath + 'html/help.htm', {
							position: 'center',
							width: 1080,
							height: 800,
							toolbar:false,
							icon:'cmntedu.png'
						});
					}
					help_win.on('closed', function() {
						help_win = null;
					  });
				});
			});
			
			//构建菜单
			function buildLeftMenu(json){
				$.each(json, function (index, item) {
					var _li = $("<li id='" + item.id + "' class='level_1'>").appendTo($("#leftMenu_ul"));
					var _li_a = $("<a href=\"#\" class=\"dropdown-toggle\"/>").appendTo($(_li));
					if (item.menuPath != null && item.menuPath != ''){
						$(_li_a).attr("href","${contextPath }" + item.menuPath);			
					}
					var _li_a_i = $("<i class=\"icon-desktop\"></i>").appendTo($(_li_a));
					if (item.iconCode != null && item.iconCode != ''){
						$(_li_a_i).attr("class",item.iconCode);			
					}
					$("<span class=\"menu-text ml5\">" + item.name + "</span>").appendTo($(_li_a));
					$("<b class=\"arrow icon-angle-down\"></b>").appendTo($(_li_a));
					
					var children = item.additionalParameters.children;
					
					var _child_ul = $("<ul class=\"submenu\" id='" + item.id + "' style=\"display:none;\"/>").appendTo($(_li));
						
					$.each(children, function (index, childItem) {
						var _child_ul_li = $("<li class='level_2' id='" + childItem.id + "'/>").appendTo($(_child_ul));
						var _child_ul_li_a = $("<a href=\"#\">" + childItem.name + "</a>").appendTo($(_child_ul_li));
						if (childItem.menuPath != null && childItem.menuPath != ''){
							$(_child_ul_li_a).attr("href","${contextPath}" + childItem.menuPath);			
						}
						var _child_ul_li_a_i = $("<i class=\"icon-double-angle-right\"></i>").appendTo($(_child_ul_li_a));
						if (childItem.iconCode != null && childItem.iconCode != ''){
							$(_child_ul_li_a_i).attr("class",childItem.iconCode);			
						}
					});
				});
				
				$('.level_1').click(function(){
					var comparStr = $(this).attr("id");
					if (!cookie_openMenuId || ("" + cookie_openMenuId).indexOf(comparStr) == -1){
						$.cookies.set("openMenuId", $(this).attr("id"));
					}
				});
	
				$('.level_2').click(function(){
					var comparStr = $(this).attr("id");
					if (!cookie_activeMenuId || ("" + cookie_activeMenuId).indexOf(comparStr) == -1){
						$.cookies.set("activeMenuId", $(this).attr("id"));
					}
				});
				
				//展开当前URL的菜单栏
				$("#" + cookie_activeMenuId).addClass("active");
				$("#" + cookie_openMenuId).addClass("active open");
				$("#" + cookie_openMenuId).find("ul").css("display","");
			}
		</script>
			
	</div>

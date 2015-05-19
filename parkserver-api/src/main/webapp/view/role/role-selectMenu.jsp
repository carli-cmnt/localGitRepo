<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>

<script type="text/javascript" src="${contextPath}/js/system/menu.js"></script>

<div style="height:800px;width:1500px;margin-left:200px;" class="modal-dialog" >
	<div class="modal-content">
		<div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">
			<span id="ui-id-26" class="ui-dialog-title">
				<div class="widget-header widget-header-small">
					<h4 class="smaller">
						<i class="icon-ok"  id="input-title">权限设定</i>
					</h4>
				</div>
			</span>
		</div>
		<form id="selectMenu_fmt" role="form" class="form-horizontal">
		<input type="hidden" name="roleId" id="roleId">
		<input type="hidden" id="menuIds" name="menuIds" value='${menuIds}'>

		<div class="modal-body" style="height:800px;">
				<table id="grid-table-sub" style="height:600px;"></table>
				<div id="grid-pager-sub"></div>
				<script type="text/javascript">
					var $path_base = "/";//this will be used in gritter alerts containing images
				</script>
		</div> 
		
		<div class="modal-footer">
			<div class="col-md-offset-3 col-md-9">
				<button class="btn btn-sm btn-primary" type="button" id="save_selectMenu_btn">
					<i class="icon-ok bigger-110"></i>
					保存
				</button>
				
				<%--<tgEasyui:easyuiButton iconCls="icon-add" permission="MENU_USER:add" operationName="新增"/>--%>
				
				&nbsp; &nbsp; &nbsp;
				<button class="btn btn-sm btn-primary btn-grey" data-dismiss="modal" id="btn_close">
					关闭
				</button>
			</div>
		</div>
		</form>
	</div>
</div>
<script type="text/javascript">
	$(document).ready(function(){
		$.ajaxSetup({cache:false});    //ajax信息不缓存
		Role.loadSelectMenuPage();
		$("#grid-table-sub").css("width","590px");
		$("#grid-table-sub").css("height","350px");
	});
</script>

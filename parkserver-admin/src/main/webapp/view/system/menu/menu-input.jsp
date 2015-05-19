<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>

<div class="modal-dialog">
	<div class="modal-content">
		<div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">
			<span id="ui-id-26" class="ui-dialog-title">
				<div class="widget-header widget-header-small">
					<h4 class="smaller">
						<i class="icon-ok" id="input-title"></i>
					</h4>
				</div>
			</span>
		</div>
		<form id="menu_fmt" role="form" class="form-horizontal">
		<input type="hidden" name="id" id="editId" value="${menu.id}">
		<input id="superMenuId" name="superId" type="hidden" value="${superMenu.id}"/>
		<div class="modal-body">
			<div class="form-group">
				<div class="col-xs-6 col-sm-3">
					<label class="col-sm-12 control-label no-padding-right" >上级菜单</label>
				</div>
				<div class="col-xs-6 col-sm-9">
					<input type="text" class="col-xs-12 col-sm-8"  value="${superMenu.menuName }" readonly="readonly"/>
				</div>
			</div>
			<div class="form-group">
				<div class="col-xs-6 col-sm-3">
					<label class="col-sm-12 control-label no-padding-right" for="menuName">菜单名称</label>
				</div>
				<div class="col-xs-6 col-sm-9">
					<input type="text" name="menuName" id="menuName" class="col-xs-12 col-sm-8" placeholder="请输入菜单名称 " value="${menu.menuName }"/>
				</div>
			</div>
			<div class="form-group">
				<div class="col-xs-6 col-sm-3">
					<label class="col-sm-12 control-label no-padding-right" for="menuCode">菜单编码</label>
				</div>
				<div class="col-xs-6 col-sm-9">
					<input type="text" name="menuCode" id="menuCode" class="col-xs-12 col-sm-8" placeholder="请输入菜单编码 " value="${menu.menuCode }"/>
				</div>
			</div>
			<div class="form-group">
				<div class="col-xs-6 col-sm-3">
					<label class="col-sm-12 control-label no-padding-right" for="cityId">图标代码</label>
				</div>
				<div class="col-xs-6 col-sm-9">
					<input type="text" name="iconCode" id="iconCode" class="col-xs-12 col-sm-8" placeholder="请输入图标代码" value="${menu.iconCode}"/>
				</div>
			</div>
			<div class="form-group">
				<div class="col-xs-6 col-sm-3">
					<label class="col-sm-12 control-label no-padding-right" for="cityId">菜单URL</label>
				</div>
				<div class="col-xs-6 col-sm-9">
					<input type="text" name="menuPath" id="menuPath" class="col-xs-12 col-sm-8" placeholder="请输入菜单路径" value="${menu.menuPath}"/>
				</div>
			</div>
			<div class="form-group">
				<div class="col-xs-6 col-sm-3">
					<label class="col-sm-12 control-label no-padding-right" for="cityId">菜单顺序</label>
				</div>
				<div class="col-xs-6 col-sm-9">
					<input type="text" name="menuOrder" id="menuOrder" class="col-xs-12 col-sm-8" placeholder="请输入菜单顺序" value="${menu.menuOrder}"/>
				</div>
			</div>
		</div>
		<div class="modal-footer">
			<div class="col-md-offset-3 col-md-9">
				<button class="btn btn-sm btn-primary" type="button" id="save_btn">
					<i class="icon-ok bigger-110"></i>
					保存
				</button>
				&nbsp; &nbsp; &nbsp;
				<button class="btn btn-sm btn-primary btn-grey" data-dismiss="modal">
					关闭
				</button>
			</div>
		</div>
		</form>
	</div>
</div>
<script type="text/javascript">
	$(".chosen-select").chosen(); 

	$(document).ready(function(){
		Menu.loadInputPage();
	});
</script>

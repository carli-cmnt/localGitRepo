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
		<form id="role_fmt" role="form" class="form-horizontal">
		<input type="hidden" name="id" id="editId" value="${role.id}">
		<div class="modal-body">
			<div class="form-group">
				<div class="col-xs-6 col-sm-3">
					<label class="col-sm-12 control-label no-padding-right" for="roleName">角色名称</label>
				</div>
				<div class="col-xs-6 col-sm-9">
					<input type="text" name="roleName" id="roleNameVal" class="col-xs-12 col-sm-8" placeholder="请输入角色名称" value="${role.roleName }"/>
				</div>
			</div>
			<div class="form-group">
				<div class="col-xs-6 col-sm-3">
					<label class="col-sm-12 control-label no-padding-right" for="roleName">角色编码</label>
				</div>
				<div class="col-xs-6 col-sm-9">
					<input type="text" name="roleCode" id="roleCode" class="col-xs-12 col-sm-8" placeholder="请输入角色编码" value="${role.roleCode }"/>
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
		Role.loadInputPage();
	});
</script>

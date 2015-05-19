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
		<form id="city_fmt" role="form" class="form-horizontal">
		<input type="hidden" name="id" id="editId" value="${city.id}">
		<input id="superCityId" name="superCityId" type="hidden" value="${city.superCityId}"/>
		<input id="hasChild" name="hasChild" type="hidden" value="${city.hasChild}"/>
		<input id="oldcityType" name="oldcityType" type="hidden" value="${city.cityType}"/>
		<input id="oldisValid" name="oldisValid" type="hidden" value="${city.isValid}"/>
		<div class="modal-body">
			<div class="form-group">
				<div class="col-xs-6 col-sm-3">
					<label class="col-sm-12 control-label no-padding-right" for="cityCode">编号</label>
				</div>
				<div class="col-xs-6 col-sm-9">
					<label style="float: left;padding-top: 5px;"  id="superCode"></label>
					<input type="hidden" id="cityCode" name="cityCode" value="${city.cityCode }" />
					<input type="text" id="cityOwnCode" name="cityOwnCode" placeholder="请输入组织机构编号" class="col-xs-5 col-sm-5" value=""/>
				</div>
			</div>
			<div class="form-group">
				<div class="col-xs-6 col-sm-3">
					<label class="col-sm-12 control-label no-padding-right" for="cityName">名称</label>
				</div>
				<div class="col-xs-6 col-sm-9">
					<input type="text" name="cityName" id="cityName" class="col-xs-12 col-sm-8" placeholder="请输入城市名称 " value="${city.cityName }"/>
				</div>
			</div>
			
			<div class="form-group">
				<div class="col-xs-6 col-sm-3">
					<label class="col-sm-12 control-label no-padding-right" for="cityType">城市类型</label>
				</div>
				<div class="col-xs-6 col-sm-9">
					<select id="cityType" name="cityType" data-placeholder="--请选择--"  onfocus="this.defaultIndex=this.selectedIndex;" onchange="this.selectedIndex=this.defaultIndex;">
						<option value=""></option>
						<option value="1">省/直辖市</option>
						<option value="2">地级市</option>
						<option value="3">区县</option>
					</select>
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

	$(document).ready(function(){
		City.loadInputPage();
	});
</script>

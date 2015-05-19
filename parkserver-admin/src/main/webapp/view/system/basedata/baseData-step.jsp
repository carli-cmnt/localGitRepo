<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<%@ include file="/common/include.jsp"%>
<script type="text/javascript" src="${contextPath}/js/system/baseData.js"></script>
</head>
<body>
	<%@ include file="/common/navbar.jsp"%>
	<div class="main-container-inner">
		<%@ include file="/common/siderbar.jsp"%>
		<div class="main-content">
			<div class="breadcrumbs" id="breadcrumbs">
				<script type="text/javascript">
					try{ace.settings.check('breadcrumbs' , 'fixed')}catch(e){}
				</script>
				<ul class="breadcrumb">
					<li><a href="#">系统管理</a></li>
					<li class="active">数据字典管理</li>
				</ul>
			</div>

			<div class="page-content">
				<div class="row">
					<div class="col-xs-12">
						<!-- PAGE CONTENT BEGINS -->
						<div class="row-fluid">
							<div class="span12">
								<div class="widget-box">
									<div class="widget-header widget-header-blue widget-header-flat">
										<div class="col-xs-6">
											<h4 class="lighter">数据字典维护</h4>
										</div>
										<div class="col-xs-6 text-right" style="padding-top:  2px;">
											<button class="btn btn-sm btn-primary btn-grey" id="undo_btn">
											<i class="icon-undo align-top bigger-125"></i>
												返回
											</button>
										</div>
									</div>
									<div class="widget-body">
										<div class="widget-main">
											<div id="baseData_step" class="row-fluid" data-target="#step-container">
												<ul class="wizard-steps">
													<li data-target="#step1" class="active">
														<span class="step">1</span> 
														<span class="title">数据字典类型维护</span>
													</li>
													<li data-target="#step2">
														<span class="step">2</span> 
														<span class="title">数据字典项目维护</span>
													</li>
													<li data-target="#step3">
														<span class="step">3</span> 
														<span class="title">完成</span>
													</li>
												</ul>
											</div>
											<hr>
											<div class="step-content row-fluid position-relative" id="step-container">
												<div class="step-pane active" id="step1">
													<form class="form-horizontal" id="baseDataType_fmt" style="display: block;">
														<input type="hidden" name="id" id="typeId" value="${baseDataType.id}">
														<input type="hidden" name="oldCode" value="${baseDataType.code}">
														<input type="hidden" name="isValid" id="typeIsValid" value="${baseDataType.isValid}">
														
														<div class="form-group">
															<div class="col-xs-6 col-sm-3">
																<label class="col-sm-12 control-label no-padding-right" for="baseDataTypeName">数据字典类型名称</label>
															</div>
															<div class="col-xs-6 col-sm-9">
																<input type="text" name="name" id="baseDataTypeName" class="col-xs-12 col-sm-8" placeholder="请输入数据字典类型名称" value="${baseDataType.name }"/>
															</div>
														</div>
														<div class="form-group">
															<div class="col-xs-6 col-sm-3">
																<label class="col-sm-12 control-label no-padding-right" for="baseDataTypeCode">数据字典类型编码</label>
															</div>
															<div class="col-xs-6 col-sm-9">
																<input type="text" name="code" id="baseDataTypeCode" class="col-xs-12 col-sm-8" placeholder="请输入数据字典类型编码" value="${baseDataType.code }"/>
															</div>
														</div>
													</form>
												</div>

												<div class="step-pane" id="step2">
													<div class="col-sm-4">
														<div class="widget-box">
															<div class="widget-header">
																<h4>数据类型</h4>
															</div>
															<div class="widget-body">
																<div class="widget-main padding-8">
																	<div id="baseData_tree" class="tree"></div>
																</div>
															</div>
														</div>
													</div>
													
													<div class="col-sm-8">
														<form id="baseDataItem_fmt" role="form" class="form-horizontal">
															<input type="hidden" name="id" id="itemId" value="${baseDataItem.id}">
															<input type="hidden" name="typeCode" id="typeCode" value="${baseDataItem.typeCode}">
															<input type="hidden" name="typeId" id="item_typeId" value="${baseDataType.id}">
															<div class="widget-box">
																<div class="widget-header widget-header-flat">
																	<h4>数据项</h4>
																</div>
																<div class="widget-body">
																	<div class="widget-main">
																		<div class="form-group">
																			<div class="col-xs-6 col-sm-3">
																				<label class="col-sm-12 control-label no-padding-right" for="baseDataItemCode">项编码</label>
																			</div>
																			<div class="col-xs-6 col-sm-9">
																				<input type="text" name="code" id="baseDataItemCode" class="col-xs-12 col-sm-8" placeholder="请输入项编码" value="${baseDataItem.code}"/>
																			</div>
																		</div>
																		<div class="form-group">
																			<div class="col-xs-6 col-sm-3">
																				<label class="col-sm-12 control-label no-padding-right" for="baseDataItemName">项名称</label>
																			</div>
																			<div class="col-xs-6 col-sm-9">
																				<input type="text" name="name" id="baseDataItemName" class="col-xs-12 col-sm-8" placeholder="请输入项名称" value="${baseDataItem.name }"/>
																			</div>
																		</div>
																		<div class="form-group">
																			<div class="col-xs-6 col-sm-3">
																				<label class="col-sm-12 control-label no-padding-right" for="seqNo">顺序</label>
																			</div>
																			<div class="col-xs-6 col-sm-9">
																				<input type="text" name="seqNo" id="seqNo" class="col-xs-12 col-sm-8" placeholder="请输入顺序" value="${baseDataItem.seqNo }"/>
																			</div>
																		</div>
																		<div class="form-group">
																			<div class="col-xs-6 col-sm-3">
																				<label class="col-sm-12 control-label no-padding-right" for="description">说明</label>
																			</div>
																			<div class="col-xs-6 col-sm-9">
																				<input type="text" name="description" id="description" class="col-xs-12 col-sm-8" placeholder="请输入说明" value="${baseDataItem.description }"/>
																			</div>
																		</div>
																		<div class="form-group">
																			<div class="col-xs-6 col-sm-3">
																				<label class="col-sm-12 control-label no-padding-right" for="isValid">是否有效</label>
																			</div>
																			<div class="col-xs-6 col-sm-9">
																				<div class="control-group">
																					<div class="radio col-xs-3" >
																						<label>
																							<input name="isValid" type="radio" class="ace" value="1" checked="checked">
																							<span class="lbl">有效</span>
																						</label>
																					</div>
																					<div class="radio col-xs-3">
																						<label>
																							<input name="isValid" type="radio" class="ace"  value="0">
																							<span class="lbl">无效</span>
																						</label>
																					</div>
																				</div>
																			</div>
																		</div>
																		<div class="form-group">
																			<div class="col-md-offset-5">
																				<button class="btn btn-sm btn-primary" type="button" id="save_btn">
																					<i class="icon-ok bigger-110"></i>
																					保存
																				</button>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</form>
													</div>
												</div>
												<div class="step-pane" id="step3">
													<div class="center">
														<h3 class="blue lighter">数据字典维护完成</h3>
													</div>
												</div>
											</div>

											<hr>
											<div class="row-fluid wizard-actions">
													<button class="btn btn-prev" disabled="disabled">
													<i class="icon-arrow-left"></i> 上一步
												</button>

												<button class="btn btn-success btn-next" data-last="完成">
													下一步 <i class="icon-arrow-right icon-on-right"></i>
												</button>
											</div>
										</div>
										<!-- /widget-main -->
									</div>
									<!-- /widget-body -->
								</div>
							</div>
						</div>
						<!-- PAGE CONTENT ENDS -->
					</div>
					<!-- /.col -->
				</div>
				<!-- /.row -->
			</div>
			<!-- /.page-content -->
		</div>
	</div>

	<div id="baseData-input" class="modal"></div>

	<script type="text/javascript">
		$(document).ready(function(){
			BaseData.loadStepPage();
		});
	</script>
</body>
</html>


<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh">
	<head>
		<%@ include file="/common/include.jsp"%>
		<script type="text/javascript" src="${contextPath}/js/system/menu.js"></script>
		<script type="text/javascript" src="${contextPath}/js/system/role.js"></script>
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
						<li>
							<a href="#">系统管理</a>
						</li>
						<li class="active">
							角色管理
						</li>
					</ul>
				</div>

				<div class="page-content">
					
					<div class="row">
						
						<div class="col-xs-12">
							<!-- PAGE CONTENT BEGINS -->
							<form role="form" class="form-horizontal">
								<div class="form-group">
									<div class="col-md-2">
										<input id="roleName" type="text" placeholder="角色名称" name="roleName" value=""/>
									</div>
									<div class="col-md-2 col-md-offset-4">
										<button id="search" class="btn btn-info btn-sm" type="button"><i class="icon-search icon-on-right"></i>查询</button>
									</div>
								</div>
								<div class="hr hr10 hr-dotted"></div>
								<div class="form-group">
									<div class="col-xs-6">
											<button data-target="#role-input" id="new" data-toggle="modal" class="btn btn-info btn-sm" type="button"><i class="icon-plus bigger-110"></i>新建</button>
											<button data-target="#role-input" id="edit" data-toggle="modal" class="btn btn-info btn-sm" type="button"><i class="icon-edit bigger-110"></i>修改</button>
											<button data-target="#role-input" id="delete" data-toggle="modal" class="btn btn-danger btn-sm" type="button"><i class="icon-trash bigger-110"></i>删除</button>
											<button data-target="#role-input" id="selectMenu" data-toggle="modal" class="btn btn-warning btn-sm" type="button"><i class="icon-user bigger-110"></i>权限设定</button>
									</div>
								</div>
							</form>
					
							<table id="grid-table"></table>
							<div id="grid-pager"></div>
							<script type="text/javascript">
									var $path_base = "/";//this will be used in gritter alerts containing images
								</script>

							<!-- PAGE CONTENT ENDS -->
						</div>
						<!-- /.col -->
					</div>
					<!-- /.row -->
				</div>
				<!-- /.page-content -->
			</div>
		</div>
		
		<div id="role-input" class="modal"></div>
	
		<script type="text/javascript">
			$(document).ready(function(){
				Role.loadPage();
				//Menu.loadPage();
			});

		</script>
	</body>
</html>


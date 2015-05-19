<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh">
	<head>
		<%@ include file="/common/include.jsp"%>
		<script type="text/javascript" src="${contextPath}/js/system/menu.js"></script>
	
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
							菜单管理
						</li>
					</ul>
				</div>

				<div class="page-content">
					
					<div class="row">
						<div class="col-xs-12">
							<!-- PAGE CONTENT BEGINS -->
							<form role="form" class="form-horizontal">
								<div class="form-group">
									<div class="col-xs-8">
										<button data-target="#menu-input" id="new" data-toggle="modal" class="btn btn-info btn-sm" type="button"><i class="icon-plus bigger-110"></i>新建</button>
										<button data-target="#menu-input" id="edit" data-toggle="modal" class="btn btn-info btn-sm btn-green" type="button"><i class="icon-edit bigger-110"></i>修改</button>
										<button data-target="#menu-input" id="delete" data-toggle="modal" class="btn btn-danger btn-sm" type="button"><i class="icon-trash bigger-110"></i>删除</button>
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
					</div><!-- /.row -->
				</div><!-- /.page-content -->
			</div><!-- /.main-content -->
			
		</div>

		<!-- inline scripts related to this page -->
		
		<div id="menu-input" class="modal"></div>

		<script type="text/javascript">
		jQuery(function($){
			Menu.loadPage();
		});
			
		</script>
	</body>
</html>


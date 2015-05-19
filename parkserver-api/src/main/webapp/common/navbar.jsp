<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>

<div class="navbar navbar-default" id="navbar">
	<script type="text/javascript">
		try{ace.settings.check('navbar' , 'fixed')}catch(e){}
	</script>

	<div class="navbar-container" id="navbar-container">
		<div class="navbar-header pull-left">
			 <a href="${contextPath}/common/welcomePage" class="navbar-brand" style="padding-top:7px;">
			 <i class="icon-leaf white"></i></a>
			<!-- /.brand -->
		</div>
		<!-- /.navbar-header -->

		<div class="navbar-header pull-right" role="navigation">
			<ul class="nav ace-nav">
				<li class="light-blue">
					<span id="currentTime" style="padding:0px 5px"></span> 
				</li>
				<li class="light-blue">
					<span style="padding:0px 5px;color:#FFF">所属机构：
					<font style="font-size:15px">
					<security:authentication property="principal.user.belongCity"></security:authentication>
					</font>
					</span> 
				</li>
				
				<li class="light-blue">
					<a data-toggle="dropdown" href="#" class="dropdown-toggle"> 
							<i class="icon-user"></i> 
							<span>欢迎
							<security:authentication property="principal.user.realName"></security:authentication>
							
							<security:authentication property="principal.user.id" var="userid"></security:authentication>
								<input type="hidden" name="userid" id="userid" value="${userid }">		
								
							</span> 
							<i class="icon-caret-down"></i> 
					</a>

					<ul class="user-menu pull-right dropdown-menu dropdown-yellow dropdown-caret dropdown-closer">
						<li class="divider"></li>
						<!--  
						<li>
							<a href="#"> <i class="icon-user"></i> 账号信息 </a>
						</li>-->
						<li>
							<a onclick="logout(this)" href="javascript:void(0);"> <i class="icon-off"></i> 登出 </a>
						</li>
					</ul>
				</li>
			</ul>
			<!-- /.ace-nav -->
		</div>
		<!-- /.navbar-header -->
	</div>
	<!-- /.container -->
	<script type="text/javascript">
	$(document).ready(function(){
		//BaseData.loadPage();
		$('#currentTime').append(getCurrentTime());
	});
	
	function logout(obj) {
		$.cookies.set("openMenuId", "mainpage");
		$.cookies.set("activeMenuId", "mainpage");
		obj.href = "${contextPath}/j_spring_security_logout";
	}
	</script>
</div>
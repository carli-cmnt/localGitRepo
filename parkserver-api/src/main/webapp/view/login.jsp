<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<!DOCTYPE html>
<html lang="zh">
<head>
<title>用户登陆</title>
<style type="text/css">
.button {
	display: inline-block;
	position: relative;
	margin: 10px;
	padding: 0 20px;
	text-align: center;
	text-decoration: none;
	font: bold 12px/25px Arial, sans-serif;
}
#loginDiv td {
    color: black;
}
#loginDiv input[type="text"], #loginDiv input[type="password"] {
    border: 1px solid black;
    height: 19px;
    width: 150px;
}
#loginDiv, #loginDiv form{
    background-color: lightblue;
    border-bottom: 1px solid #dedede;
    -moz-border-radius: 0px 0px 10px 10px;      /* Gecko browsers */
    -webkit-border-radius: 0px 0px 5px 5px;   /* Webkit browsers */
    border-radius:0px 0px 10px 10px;            /* W3C syntax */
}
</style>
</head>
<body>
	<section id="content" class="content-field">
		<div id="content-title">用户登录</div>

		<c:if test="${errorMsg != null}">
			<div class="ui-widget">
				<div class="ui-state-error ui-corner-all" style="padding: 0 .7em;">
					<p style="color: black;">
						<span class="ui-icon ui-icon-alert"
							style="float: left; margin-right: .3em;"></span> <strong>警告:</strong>
						${errorMsg}
					</p>
				</div>
			</div>
		</c:if>
		<br />
        <br />
        <br />
		<h3
			class="ui-accordion-header ui-state-default ui-corner-all ui-accordion-icons"
			style="text-align: center; width: 400px; margin-left: auto; margin-right: auto;">
			会员登录</h3>
		<div id="loginDiv"
            style="width: 400px; height: 220px; margin-left: auto; margin-right: auto;">
            <form
                action="${pageContext.request.contextPath}/j_spring_security_check"
                method="post" id="log_form">
                <table
                    style="text-align: center; margin-left: 50px; width: 300px; height: 225px;">
                    <tr>
                        <td height="70" style="height:70px;font-size: 11pt;">用户名：<input type='text' id="userName" name='j_username'
                            size="10" class="ui-autocomplete-input"></td>
                    </tr>
                    <tr>
                        <td height="20" style="height:20px;font-size: 11pt;">密&nbsp;&nbsp;&nbsp;码：<input id="pwd" type="password"
                            name="j_password" size="10" class="ui-autocomplete-input"></td>
                    </tr>
                    <tr>
                        <td height="60" style="height:60px;">
                            <input id="submit" type="submit" value="登陆" class="button green" /><span style="margin-left: 50px;">&nbsp;</span>
                            <input id="reset" type="reset" value="重置" class="button green" />
                        </td>
                    </tr>
                    <tr>
                        <td height="20" style="height:20px;">
                            <a id="reg" href="${pageContext.request.contextPath}/auth/register" style="color:#19bb00;">注册请点击这里</a>
                           &nbsp; &nbsp;<a id="reg" href="${pageContext.request.contextPath}/auth/pwd_input" style="color:#19bb00;">找回密码</a>
                        </td>
                    </tr>
                    <tr>
                        <td height="20" style="height:20px;">
                        </td>
                    </tr>
                </table>
            </form>
        </div>

	</section>
	<script type="text/javascript">
		$("#log_form").submit(function() {
			var name = $("#userName").val();
			var pwd = $("#pwd").val();
			if (name == null || pwd == "") {
				alert("用户名不能为空");
				return false;
			} else if (pwd == null || pwd == "") {
				alert("密码不能为空");
				return false;
			}
			return true;
		});

        $( "#submit" ).button();
        $( "#reset" ).button();
	</script>
</body>
</html>


<%@ page contentType="image/jpeg" pageEncoding="UTF-8" %>

<%
	//设置页面不缓存
response.setHeader("Pragma","No-cache");
response.setHeader("Cache-Control","no-cache");
response.setDateHeader("Expires", 0);

String code = request.getParameter("code");
if(code == null){
	code = "11111111";
}
if(!code.startsWith("*")){
	code = "*" + code;
}
if(!code.endsWith("*")){
	code = code + "*";
}
// 输出图象到页面
try{
}
catch(Exception e){
}
out.clear();
out=pageContext.pushBody();
%> 

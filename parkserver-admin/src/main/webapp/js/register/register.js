
var User={
	loadPage:function(){
		$( "button" ).button();
		jQuery(function($){   
		     $.datepicker.regional['zh-CN'] = {   
		        clearText: '清除',   
		        clearStatus: '清除已选日期',   
		        closeText: '关闭',   
		        closeStatus: '不改变当前选择',   
		        prevText: '<上月',   
		        prevStatus: '显示上月',   
		        prevBigText: '<<',   
		        prevBigStatus: '显示上一年',   
		        nextText: '下月>',   
		        nextStatus: '显示下月',   
		        nextBigText: '>>',   
		        nextBigStatus: '显示下一年',   
		        currentText: '今天',   
		        currentStatus: '显示本月',   
		        monthNames: ['一月','二月','三月','四月','五月','六月', '七月','八月','九月','十月','十一月','十二月'],   
		        monthNamesShort: ['一','二','三','四','五','六', '七','八','九','十','十一','十二'],   
		        monthStatus: '选择月份',   
		        yearStatus: '选择年份',   
		        weekHeader: '周',   
		        weekStatus: '年内周次',   
		        dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],   
		        dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],   
		        dayNamesMin: ['日','一','二','三','四','五','六'],   
		        dayStatus: '设置 DD 为一周起始',   
		        dateStatus: '选择 m月 d日, DD',   
		        dateFormat: 'yy-mm-dd',   
		        firstDay: 1,   
		        initStatus: '请选择日期',   
		        isRTL: false};   
		        $.datepicker.setDefaults($.datepicker.regional['zh-CN']);   
		    });  
		 $("#birthday").datepicker(); 
		$("#belongCity").change(function(){
			var cityCode=$(this).val();
			$.ajax({
				url:"firstPro?cityCode="+cityCode,
				dataType:"json",
				type:"Post",
				success:function(json){
					var city=eval("("+json+")")
					$("#belongCity1").find("option").remove();
					$("#belongCity1").append(jQuery("<option>---请选择---</option>"));
					$.each(city.data,function(n,val){
						$("#belongCity1").append(jQuery("<option></option>").val(val.cityCode).html(val.cityName));
					});
				}
			});
		});
		
		$("#belongCity1").change(function(){
			var cityCode=$(this).val();
			var json = {"cityCode": cityCode};
			$.ajax({
				url:"firstPro",
				dataType:"json",
				type:"Post",
				data:json,
				success:function(json){
					var city=eval("("+json+")");
					$("#belongCity2").find("option").remove();
					$("#belongCity2").append(jQuery("<option>---请选择---</option>"));
					$.each(city.data,function(n,val){
						$("#belongCity2").append(jQuery("<option></option>").val(val.cityCode).html(val.cityName));
					});
				}
			});
		});
		//用户账户验证是否存在
		$("#username").blur(function(){
			
			var parentObj = $(this).parent();
			var errDiv = parentObj.find("div[for='username']");
			if (errDiv[0] != null) {
				$("#validateusernamemsg").html(" ");
				return;
			}
			check();
		});
		//验证身份证是否存在
		$("#idCard").blur(function(){
			var value=$(this).val();
			var json1={"idCard":value}
			$.ajax({
				url:"validateidCard",
				dataType:"json",
				type:"Post",
				data:json1,
				success:function(json){
					json2=eval("("+json+")");
					$("#validateidcardmsg").find("font").remove();
					if(json2.msg!=null){
						$("#validateidcardmsg").append(jQuery("<font>"+json2.msg+"</font>"));
						//$("#register_btn").attr({"disabled":"disabled"});
//						$( "#register_btn" ).button( "option", "disabled", true );
					}else{
						$( "#register_btn" ).button( "option", "disabled", false );
						//$("#register_btn").removeAttr("disabled");//将按钮可用
					}

				},error:function(XMLHttpRequest, textStatus, errorThrown){alert(textStatus + "..." + errorThrown);}
			});
			
		});

	//注册表单验证为空等	
	$("#register-input").validate({
			errorElement:"div",
			errorClass:"errorInputClass",
			foucsInvalide:true,
			rules:{
				username:{
					required:true,
					maxlength:8
				},
				password:{
					required:true,
					minlength:6,
					maxlength:16
				},
				realName:{
					required:true,
					minlength:2
				},
				birthday:{
					required:true,
					date:true
				},
				idCard:{
					required:true,
					isIdCard: true
				},
				email:{
					email:true
				},
				phone:{
					required:true,
					isPhone:true
				},
				postcode:{
					minlength:6,
					maxlength:6
				}
			},
				messages:{
				username:{
					required:"请输入用户名",
					maxlength:"用户名不能超过{0}个字"
				},
				password:{
					required:"请输入密码",
					minlength:"密码最少是{0}位以上",
					maxlength:"密码不能超过{0}位以上"
				},
				realName:{
					required:"请输入真实姓名",
					minlength:"请重新输入"
				},
				birthday:{
					required:"请录入出生日期",
					date:"请输入正确的日期格式，如2000-1-1"
				},
				idCard:{
					required:"请输入身份证号",
					isIdCard:"身份证号格式错误！"
				},
				email:{
					email:"请输入正确的Email格式"
				},
				phone:{ 
					required:"请输入电话号码",
					isPhone:"电话号码格式错误！"
				},
				postcode:{
					minlength:"请输入正确的邮政编码",
					maxlength:"请输入正确的邮政编码"
				}
			},
			highlight: function (e) {
				$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
			},
			success: function (e) {
				$(e).closest('.form-group').removeClass('has-error').addClass('has-info');
				$(e).remove();
			}
		});
		
		
		
		
		
		$.fn.serializeObject = function() {  
		   var o = {};  
		   var a = this.serializeArray();  
		   $.each(a, function() {  
		       if (o[this.name]) {  
		           if (!o[this.name].push) {  
		               o[this.name] = [o[this.name]];  
		           }  
		           o[this.name].push(this.value || '');  
		       } else {  
		           o[this.name] = this.value || '';  
		       }  
		   });  req
		   return o;  
		};
		(function($){  
	        $.fn.serializeJson=function(){  
	            var serializeObj={};  
	            $(this.serializeArray()).each(function(){  
	                serializeObj[this.name]=this.value;  
	            });  
	            return serializeObj;  
	        };  
	    })(jQuery);
		
		
		/****************************表单初始化验证*******************************/
		
		
		
		//提交注册表单
		$("#register_btn").click(function(){
			var idCard=$("#idCard").valueOf();
			var flg=false;
			var text = $("#validateusernamemsg").html();
			//+alert(text)
				if ($("#register-input").valid()) {
					if(text.indexOf("可以注册")>=0){
						//flg=true;
						$( "#register_btn" ).button( "option", "disabled", false );
					}else{
						check();
					}
					/*$("#resultFrm").load(function(){
						alert(111);
						var content = $(window.frames["resultFrm"].document).find("body").html();
						alert(content);
						if (content.indexOf("success") >= 0) {
							alert("注册成功！"); 	
							//window.location.href = projPath + "/auth/login";
							$("#backLogin").submit();
						} else {
							alert("注册失败！");
						}
					});*/
					var disableSymbol = $( "#register_btn" ).button( "option", "disabled");
					if (!disableSymbol) {
						$( "#register_btn" ).button( "option", "disabled", true );
						$("#register-input").submit();
					}
					
					/*var json = $("#register-input").serialize();
					alert(json);
					$.ajax({
						type:"post",
						url:"doRegister",
						data:json,
						dataType:"json",
						success:function(json){
							alert(json);
							if (json.status="success") {
								alert("注册成功！"); 	
								//window.location.href="/projPath/auth/login";
							}else{
								alert("注册失败！");
							}
						},error: function(XMLHttpRequest, textStatus, errorThrown) {
	                        alert(XMLHttpRequest.status);
	                        alert(XMLHttpRequest.readyState);
	                        alert(textStatus);
	                    },
	                    complete: function(XMLHttpRequest, textStatus) {
	                        this; // 调用本次AJAX请求时传递的options参数
	                        alert(XMLHttpRequest.status + "---");
	                        alert(textStatus + "---111");
	                    }
					});*/
				}else{
					//$( "#register_btn" ).button( "option", "disabled", true );
					//alert("验证失败！");
				}
		});
		
		function check(){
			var value=$("#username").val();
			var json1={"username":value}
			$.ajax({
				url:"validateusername",
				dataType:"json",
				type:"Post",
				data:json1,
				success:function(json){
					json2=eval("("+json+")")
					$("#validateusernamemsg").find("font").remove();
					$("#validateusernamemsg").append(jQuery("<font>"+json2.msg+"</font>"));
					if(json2.flg!=null){
						//$( "#register_btn" ).button( "option", "disabled", true );
					}else{
						$( "#register_btn" ).button( "option", "disabled", false );
					}
				},error:function(XMLHttpRequest, textStatus, errorThrown){alert(textStatus + "..." + errorThrown);}
			});
			
		}
	}
}
function frmLoad() {  
	var content = $(window.frames["resultFrm"].document).find("body").html();
	if (content.indexOf("success") >= 0) {
		alert("注册成功！请到邮箱激活你的账户！否则不能登录"); 	
		//window.location.href = projPath + "/auth/login";
		$("#backLogin").submit();
	} else {
		if ($(window.frames["resultFrm"].document).find("body").find("pre")[0] != null) {
			alert("注册失败！");
		} else {
			return;
		}
	}
}
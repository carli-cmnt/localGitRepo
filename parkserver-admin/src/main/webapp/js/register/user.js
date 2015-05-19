var User={
	loadPage:function (){
		$( "button" ).button();
		
		
		/*********************页面开始时下拉框选中默认值***************************/
		var departmentSelect = document.getElementById("department");
		var citySelect = document.getElementById("belongCity");
		var citySelect1 = document.getElementById("belongCity1");
		var citySelect2 = document.getElementById("belongCity2");
		var user_id=$("#id").val();
		var selectvalue;
		$.ajax({
			url:"selectvalue?user_id="+user_id,
			dataType:"json",
			type:"post",
			success:function(json){
				 selectvalue=eval("("+json+")");
				 //所属科室选择
				 for(var i=0;i<departmentSelect.options.length;i++ ){
					    if(departmentSelect.options[i].value==selectvalue.department){
					    	departmentSelect.options[i].selected=true;
					          
					     }
					}
				 //地区选择选中
				 for(var i=0;i<citySelect.options.length;i++ ){
					    if(citySelect.options[i].value==selectvalue.citys[0]){
					    	citySelect.options[i].selected=true;
					          
					     }
					}
				 for(var i=0;i<citySelect1.options.length;i++ ){
					    if(citySelect1.options[i].value==selectvalue.citys[1]){
					    	citySelect1.options[i].selected=true;
					          
					     }
					}
				 for(var i=0;i<citySelect2.options.length;i++ ){
					    if(citySelect2.options[i].value==selectvalue.citys[2]){
					    	citySelect2.options[i].selected=true;
					          
					     }
					}
			}
		});
		/************************************************/
/********************************三级联动事件*****************************/
		
		$("#belongCity").change(function(){
			var cityCode=$(this).val();
			$.ajax({
				url:"firstPro?cityCode="+cityCode,
				dataType:"json",
				type:"Post",
				success:function(json){
					var city=eval("("+json+")")
					$("#belongCity1").find("option").remove();
					$("#belongCity1").append(jQuery("<option></option>").val("").html("请选择"))
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
					$("#belongCity2").append(jQuery("<option></option>").val("").html("请选择"))
					$.each(city.data,function(n,val){
						$("#belongCity2").append(jQuery("<option></option>").val(val.cityCode).html(val.cityName));
					});
				}
			});
		});
		
		//修改表单验证
		$("#editform").validate({
				errorElement:"div",
				errorClass:"errorInputClass",
				foucsInvalide:true,
				rules:{
					//phone:{
					//	required:true,
					//	isPhone:true
					//},
					postcode:{
						minlength:6,
						maxlength:6
					},
					belongCity:{
						required:true
					}
				},messages:{
					//phone:{
					//	required:"请输入电话号码",
					//	isPhone:"电话号码错误"
					//},
					postcode:{
						minlength:"请输入正确的邮政编码",
						maxlength:"请输入正确的邮政编码"
					},
					belongCity:{
						required:"请选择所属省份"
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
			
			//提交修改表单
			$("#editBtn").click(function(){
				if ($("#editform").valid()) { 
					var json = $("#editform").serializeJson();
					$.ajax({
						type:"POST",
						url:"doUpdate",
						data:json,
						dataType:"json",
						success:function(json){
							var json11=eval("("+json+")");
							
							if (json11.msg=="success") {
								alert("修改成功！");
								window.location="/remoteedu/auth/welcome?mark=1";
							}else{
								alert("修改失败！");
							}
						}
					});
				}else{
					alert("验证失败！");
				}
			});
		
	}
}
	
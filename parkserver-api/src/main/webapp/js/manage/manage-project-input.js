var pathName = document.location.pathname;
var index = pathName.substr(1).indexOf("/");
var contextPath = pathName.substr(0, index + 1);

var Manage = {
	loadPage : function() {
		$("#save_btn").click(function() {
			$.ajax({
				type : 'POST',
				url : contextPath + '/manage/project/save',
				data:$("#projectinfo").serialize(),
				dataType : 'json',
				success : function(json) {
					if (json.status == "success") {
						window.location.href = "/remoteedu/manage/project/";
					}
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					alert(XMLHttpRequest.status);
					alert(XMLHttpRequest.readyState);
					alert(textStatus);
				}
			});
		});
			//日期控件
		$('.date-picker').datepicker({
			autoclose : true,
			language: 'cn',
			format:'yyyy-mm-dd'
		});
		
	}
};
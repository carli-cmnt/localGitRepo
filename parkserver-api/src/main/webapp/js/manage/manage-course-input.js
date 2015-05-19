var examObj = null;
var answerObj = null;
var examNum = 1;
var Manage = {
	loadPage:function() {
		$("#save_btn").click(function() {
			var validText = $("#coursename").val();
			if (validText == "") {
				$("#tabs").tabs('option', 'active', 0);
				alert("课程基本信息有未填项，请继续填写!");
				return;
			}
			validText = CKEDITOR.instances["content"].getData();
			if (validText == "") {
				$("#tabs").tabs('option', 'active', 1);
				alert("讲义有未填项，请继续填写!");
				return;
			}
			var validText = $("#mv").val();
			var validText = $("#allExam").val();
			var isComplete = true;
			var allExam = "[";
			$("#examArea").find("div[class='examBlock']").each(function(index, element) {
				var examTitle = $(this).find("input[name='examTitle']").val();
				var size = $(this).find("input[name='examOption']").size();
				if (size == 0) {
					isComplete = false;
				}
				var answerStr = "";
				$(this).find("input[name='examOption']").each(function(index, element) {
					answerStr += $(this).val() + "-_-";
				});
				var answerIndex = $(this).find("select[name='examAnswerIndex']").val();
				allExam = allExam + "{'title':'" + examTitle + "','index':'" + answerIndex + "','option':'" + answerStr + "'},";
			});
			allExam = allExam + "]";
			if (allExam == "[]") {
				$("#tabs").tabs('option', 'active', 3);
				alert("考题最少填写一条!");
				return;
			}
			$("#examall").val(allExam);
			$('#course').submit();
		});
		$("#tabs").tabs({active: 0});
		$("#tabs").tabs('option', 'active', 0);
		
		examObj = $("#examTemplate").find("div[class='examBlock']");
		answerObj = $("#examTemplate").find("div[class='optionBlock']");
 
		$("#addexam").click(function(){
			addExam(null, null, null);
		});
		$("#file_upload").uploadify({  
            'buttonText' : '上传文件',  
            'height' : 30,  
            swf           : contextpath+'/plugins/uploadify/uploadify.swf',  
            'uploader'      : contextpath+'/common/file/uploadFile_old',   
            'width' : 120,  
            'auto':true, 
            'multi':false,
            'fileObjName'   : 'file', 
            'queueID'  : 'some_file_queue',
            //允许上传的文件后缀  
            'fileTypeExts':'*.swf',
            //上传文件的大小限制  
            'fileSizeLimit':'20MB',  
            //上传数量  
            'queueSizeLimit' : 1,  
            'onUploadSuccess' : function(file, data, response) { 
	       		   $("#file_upload").hide(); 
	      		   $("#mv").val(contextPath+"/common/file/showVideoFile?fileName="+data);
	         	   $("a[name^='down_']").html("点击预览");
	         	   $("a[name^='down_']").bind('click', function() {
	         		   $('#video').flash(contextPath+"/common/file/showVideoFile?fileName="+data);
	         	   });
	            },
	            'onUploadError' : function(file, errorCode, errorMsg, errorString) {
	            	alert('上传失败、请重新上传');
	            },
	            'onError' : function(type, info) {
	               	alert('上传失败、请重新上传');
	            }
	        });

		var json = null;
		if ($("#Examupdate").val() != "") {
			json = eval("("+$("#Examupdate").val()+")");
		}
		if (json != null) {
			for (var i = 0;i < json.length;i ++) {
				var eachExam = json[i];
				var examTitle = eachExam["title"];
				var examIndex = eachExam["index"];
				var examOption = eachExam["option"];
				addExam(examTitle, examIndex, examOption);
			}
		}
	}
};
function addExam(examTitle, examIndex, examOption) {
	var newObj = examObj.clone();
	if (examOption != null && examOption != "") {
		var optionArr = examOption.split("-_-");
		for (var eachOption in optionArr) {
			if (optionArr[eachOption] == "") {
				continue;
			}
			addOption(newObj, optionArr[eachOption]);
		}
	}

	newObj.find("input[class='btn btn-sm btn-primary']").click(function() {
		addOption(newObj, null);
	});
	newObj.find("input[opType='delExam']").click(function() {
		var parentObj = $(this).parent();
		parentObj.remove();

		examNum = 1;
		$("#examArea").find("label[class='examTitleLabel']").each(function() {
			$(this).html("考题" + examNum);
			examNum ++;
		});
	});
	newObj.find("label[class='examTitleLabel']").html("考题" + examNum);

	var selectObj = newObj.find("select[name='examAnswerIndex']");
	if (examTitle != null && examTitle != "") {
		newObj.find("input[name='examTitle']").val(examTitle);
		selectObj.val(examIndex);
		$("#examArea").append(newObj);
		examNum ++;
	} else {
		if(examNum <= 10){
			examNum ++;
			$("#examArea").append(newObj);
		} else{
			alert("考题最多只能添加10条！");
		}
	}
}
function addOption(parentObj, optionTitle) {
	var newAnswerObj = answerObj.clone(true);
	var selectObj = parentObj.find("select[name='examAnswerIndex']");
	var optionSize = selectObj.find("option").size() + 1;
	selectObj.append("<option value='" + optionSize + "'>" + optionSize + "</option>");
	if (optionTitle != null && optionTitle != "") {
		newAnswerObj.find("input[name='examOption']").val(optionTitle);
		newAnswerObj.find("label[class='optionLabel']").html("答案" + optionSize);
	} else {
		if(optionSize >= 6){
			alert("答案不能超过5个!");
			return ;
		}else{
			newAnswerObj.find("label[class='optionLabel']").html("答案" + optionSize);
		}
	}

	newAnswerObj.find("input[opType='delOption']").click(function() {
		var parentObj = $(this).parent();
		var container = parentObj.parent();
		parentObj.remove();

		var optionNum = 1;
		var selectObj = container.find("select[name='examAnswerIndex']");
		selectObj.empty();
		container.find("label[class='optionLabel']").each(function() {
			$(this).html("答案" + optionNum);
			selectObj.append("<option value='" + optionNum + "'>" + optionNum + "</option>");
			optionNum ++;
		});
	});
	parentObj.append(newAnswerObj);
}

  
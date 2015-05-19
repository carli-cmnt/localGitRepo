var examObj = null;
var answerObj = null;
var Exam = {
	onLoadPage : function() {
		var examNum = 1;
		examObj = $("#examTemplate").find("div[class='examBlock']");
		answerObj = $("#examTemplate").find("div[class='optionBlock']");

		$("#examButton").click(function(){
			var newObj = examObj.clone();
			newObj.find("input[class='answerButton']").click(function() {
				var newAnswerObj = answerObj.clone(true);
				$(this).parent().append(newAnswerObj);
				var selectObj = $(this).parent().find("select[name='examAnswerIndex']");
				var optionSize = selectObj.find("option").size() + 1;
				selectObj.append("<option value='" + optionSize + "'>" + optionSize + "</option>");

				newAnswerObj.find("label[class='optionLabel']").html("答案" + optionSize);
			});
			newObj.find("label[class='examTitleLabel']").html("考题" + examNum);
			examNum ++;
			$("#examArea").append(newObj);
		});
	}
};

var pathName = document.location.pathname;
var index = pathName.substr(1).indexOf("/");
var contextPath = pathName.substr(0, index + 1);
var examObj = null;
var answerObj = null;
var examNum = 1;


function selExam(examTitle, examIndex, examOption) {
	var seloption = examObj.clone();
	seloption.find("label[class='examTitleLabel']").html("考题" + examNum + "：");
	examNum ++;
	seloption.find("label[class='examTitle']").html(examTitle);
	var answerIndexObj = seloption.find("input[type='hidden']");
	answerIndexObj.val(examIndex);
	if (examOption != null && examOption != "") {
		var optionArr = examOption.split("-_-");
		for (var i = 0;i < optionArr.length;i ++) {
			if (optionArr[i] == "") {
				continue;
			}
			var optionObj = answerObj.clone();
			optionObj.find("label[class='optionLabel']").html("答案" + (i + 1) + "：");
			optionObj.find("label[class='examOption']").html(optionArr[i]);
			var radio = optionObj.find("input[type='radio']");
			radio.attr("value", i + 1);
			radio.attr("name", "option" + examNum);
			seloption.append(optionObj);
		}
	}
	$("#exam").append(seloption);
	$("#exam").dialog( "open" );
}

var Learn = {
		jy:function(cl) {
			var getjy = $("#learn-table").jqGrid('getRowData',cl);
			var width = $( "#lecture" ).dialog( "option", "width" );
			var height = $( "#lecture" ).dialog( "option", "height" );
			$( "#lecture" ).dialog( "option", "height", 800 );
			$( "#lecture" ).dialog( "option", "width", 800 );
			$("#lecture").html(getjy.content);
			$( "#lecture" ).dialog( "open" );	
		},
		sp:function(cl) {
			var getsp = $("#learn-table").jqGrid('getRowData',cl);
			var width = $( "#video" ).dialog( "option", "width" );
			var height = $( "#video" ).dialog( "option", "height" );
			$( "#video" ).dialog( "open" );
			$('#mv').flash(getsp.mv);
			var height = $('#mv').find("object").height() + 150;
			var width = $('#mv').find("object").width() + 80;

			$( "#video" ).dialog( "option", "height", height );
			$( "#video" ).dialog( "option", "width", width );
		},
		ks:function(cl) {
			examObj = $("#examTemplate").find("div[class='examBlock']");
			answerObj = $("#examTemplate").find("div[class='optionBlock']");
			var getks = $("#learn-table").jqGrid('getRowData',cl);
			var width = $( "#exam" ).dialog( "option", "width" );
			var height = $( "#exam" ).dialog( "option", "height" );
			$( "#exam" ).dialog( "option", "height", 800 );
			$( "#exam" ).dialog( "option", "width", 800 );
			$( "#examall" ).attr("currentId", cl);
			var json = null;
			if ((getks.exam)!= "") {
				json = eval("("+(getks.exam)+")");
			}
			if (json != null) {
				for (var i = 0;i < json.length;i ++) {
					var eachExam = json[i];
					var examTitle = eachExam["title"];
					var examIndex = eachExam["index"];
					var examOption = eachExam["option"];
					selExam(examTitle, examIndex, examOption);
				}
			}
		},
	loadPage:function(){
		$( "#lecture" ).dialog({ autoOpen: false });
		$( "#lecture" ).dialog( "option", "buttons", 
				  [
				    {
				      text: "确定",
				      click: function() {
				        $( this ).dialog( "close" );
				      }
				    },
				    {
					      text: "取消",
					      click: function() {
					        $( this ).dialog( "close" );
					      }
					    }
				  ]
				);
		
		$( "#video" ).dialog({ autoOpen: false });
		$( "#video" ).dialog( "option", "buttons", 
				  [
				    {
				      text: "确定",
				      click: function() {
				        $( this ).dialog( "close" );
				      }
				    },
				    {
					      text: "取消",
					      click: function() {
					        $( this ).dialog( "close" );
					      }
					    }
				  ]
				);
		$( "#exam" ).dialog({ autoOpen: false });
		$( "#exam" ).dialog( "option", "buttons", 
				[
				 {
					 text: "提交",
					 click: function() {
						 var result = true;
						 $("#exam").find("div[class='examBlock']").each(function(obj, index) {
							 var okOption = $(this).find("input[type='hidden']").val();
							 var selOption = $(this).find("input[type='radio']:checked").val();
							 if (okOption == selOption) {
								 result = result ? true : result;
							 } else {
								 alert("考试答案不正确，请重新参加考试！");
								 window.location.href="/remoteedu/learn/inproject/";
								 result = false;
							 }

						 });
						 if (result) {
							 var id = $( "#examall" ).attr("currentId");
							 $("#courseId").val(id);
							 $('#examall').submit();
						 }
					 }
				 },
				 {
					 text: "取消",
					 click: function() {
						 $( this ).dialog( "close" );
					 }
				 }
				 ]
		);
		$("#return").click(function(){
			window.location.href="/remoteedu/learn/inproject/";
		});
		
		$( "button" ).button();
		//**************以下为表格操作***********************
		jQuery("#learn-table").jqGrid({
			url:'list?projectId='+$("#projectId").val(),			//数据源标识，来自后台Controller Remapping("list");
		    datatype: 'json',   //数据返回对象，默认为XML，可选JSON....等类型
			type: "POST",		//JS 提交方式 ，默认为GET
			height: "100%",		//表格高度
			rownumbers: true,	//设置是否为TRUE，如果为TRUE,则在表格左边添加一行，显示顺序号，如平时的ID自增长，顺序标识
			rownumWidth:50,		//如果rownumbers为TRUE，即可设置column(列)的宽度
			colNames:['id','','','','课程名称','课程状态','讲义','视频','考试'],	//表格列显示的字段名 
			colModel:[												//数据源传送过来的值
			 //常用到的属性：name 列显示的名称；index 传到服务器端用来排序用的列名称；width 列宽度；align 对齐方式；sortable 是否可以排序
			    {name:'id',hidden:true},
			    {name:'content',index:'content',hidden:true},
			    {name:'mv',index:'mv',hidden:true},
			    {name:'exam',index:'exam',hidden:true},
			    {name:'title',index:'title',width:8,editable:false},
			    {name:'courseStatus',index:'courseStatus',width:5,editable:false},
			    {name:'option1',index:'option1',width:5,editable:false},
			    {name:'option2',index:'option2',width:5,editable:false},
			    {name:'option3',index:'option3',width:5,editable:false},
		],
			viewrecords :true,	//是否显示记录总条数
			rowNum:10,				//设置每页显示多少条
			rowList:[10,20,30],		//设置每页显示多少条，为下拉框可选，选择后，覆盖rowNum的值
			pager : "#learn-pager",	//在HTML任意位置，通过标签ID，可设置是否要翻页功能
			altRows: true,			//设置是否要斑马纹，即表格行与行之间黑白相间，用于区分。
			autowidth: true,		//如果为TRUE时，表格首次创建时，可根据父元素宽度自动调整表格宽度，如果父元素改变了宽度，为使表格自动调整宽度，需要实现函数：SetGridWidth
			autoScroll: false,		//估计是 是否要滚动条
			caption: "课程列表",	//表格标题名称
			jsonReader : {   		//描述JSAON数据格式的数组
		      root:"result",
		      total:'totalPages',
		      page:'page',
		      records:'records'   
			},
			gridComplete : function(){
				var ids = jQuery("#learn-table").jqGrid('getDataIDs');
				for(var i=0;i < ids.length;i++){
					var cl = ids[i];
					checkbox = "<a type='button' onclick=\"Learn.jy('"+cl+"');\" class='course-content'></a>"; 
					jQuery("#learn-table").jqGrid('setRowData',ids[i],{option1:checkbox});
					checkbox1 = "<a type='button' onclick=\"Learn.sp('"+cl+"');\" class='course-mv'></a>";
					jQuery("#learn-table").jqGrid('setRowData',ids[i],{option2:checkbox1});
					checkbox2 = "<a type='button' onclick=\"Learn.ks('"+cl+"');\"  class='course-exam'></a>";
					jQuery("#learn-table").jqGrid('setRowData',ids[i],{option3:checkbox2});
					jQuery("#learn-table").setRowData ( ids[i], false, {height: 35} );
				}	
				$(window).resize(function(){ 
					$("#learn-table").trigger("reloadGrid");
				});
				
			}});
}
}

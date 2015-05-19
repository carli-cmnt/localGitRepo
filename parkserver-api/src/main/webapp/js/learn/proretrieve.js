function getHideListValue(cellvalue, options, rowObject){
		if (cellvalue){
			var code;
			if (typeof(options.colModel.formatoptions) != "undefined"){
				code = options.colModel.formatoptions.code;
			}
			var baseList = $("#hide-" + code);
			if (baseList){
				var text = $(baseList).find("#hide-" + cellvalue).html();
				if (text){
					return text;
				}else{
					return cellvalue;
				}
			}else{
				return cellvalue;
			}
		}else{
			return "";
		}
	}	
var Learn = {
	//加入学习
	click:function(id){
		$.ajax({
			type:'POST',
			url:'insert?id='+id,
			dataType:'json',
			success:function(json){
				if(json.status == "success"){
				alert("加入学习成功!");
	            window.location.href="/remoteedu/learn/inproject/";
				}
				if(json.status == "repeat"){
				alert("该项目已经添加，不能重复添加！");
				}
    		}
    	});
	},
	loadPage:function(){
		 $("#createdate").datepicker(); 
		 $("#validdate").datepicker(); 
		 $( "button" ).button();
		 $(window).resize(function(){ 
				$("#learn-table").trigger("reloadGrid");
		 });
		//**************以下为表格操作***********************


		jQuery("#learn-table").jqGrid({
			url:'list',			//数据源标识，来自后台Controller Remapping("list");
		    datatype: 'json',   //数据返回对象，默认为XML，可选JSON....等类型
			mtype: "POST",		//JS 提交方式 ，默认为GET
			height: "auto",		//表格高度
			rownumbers: true,	//设置是否为TRUE，如果为TRUE,则在表格左边添加一行，显示顺序号，如平时的ID自增长，顺序标识
			rownumWidth:50,		//如果rownumbers为TRUE，即可设置column(列)的宽度
			colNames:['id','项目名称','项目类型','所属学科','学分','创建日期','结束日期','操作'],	//表格列显示的字段名 
			colModel:[												//数据源传送过来的值
			 //常用到的属性：name 列显示的名称；index 传到服务器端用来排序用的列名称；width 列宽度；align 对齐方式；sortable 是否可以排序
			    {name:'id',hidden:true,width:20},
			    {name:'name',index:'name',width:20,editable:false},
			    {name:'type',index:'type',width:20,editable:false,formatter:getHideListValue,formatoptions:{code:'ID_PROJECT_TYPE'}},
			    {name:'belongSubject',index:'belongSubject',width:30,editable:false,formatter:getHideListValue,formatoptions:{code:'ID_SECTION_SUBJECT'}},
			    {name:'creditValue',index:'creditValue',width:30,editable:false},
			    {name:'createDateStr',index:'createDateStr',width:30,editable:false},
			    {name:'validDateStr',index:'validDateStr',width:30,editable:false},
			    {name:'option',index:'option',width:30,editable:false}
			], 
			viewrecords :true,	//是否显示记录总条数
			rowNum:10,				//设置每页显示多少条
			rowList:[10,20,30],		//设置每页显示多少条，为下拉框可选，选择后，覆盖rowNum的值
			pager : "#learn-pager",	//在HTML任意位置，通过标签ID，可设置是否要翻页功能
			altRows: true,			//设置是否要斑马纹，即表格行与行之间黑白相间，用于区分。
			autowidth: true,		//如果为TRUE时，表格首次创建时，可根据父元素宽度自动调整表格宽度，如果父元素改变了宽度，为使表格自动调整宽度，需要实现函数：SetGridWidth
			autoScroll: false,		//估计是 是否要滚动条
			caption: "项目列表",	//表格标题名称
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
					checkbox = "<a type='button' class='join-study-css' couseid='" + cl + "')'>加入学习</a>";
					jQuery("#learn-table").jqGrid('setRowData',ids[i],{option:checkbox});
					jQuery("#learn-table").setRowData ( ids[i], false, {height: 35} );
				}	
				$("a[type='button']").button();
				$("a[type='button']").click(function() {
					Learn.click($(this).attr("couseid"))
				});
			}});
        //模糊查询
		$("#searchBut").click(function(){
			var isValid=$("#likeSelect").valid();
			if(isValid){
				var content = $("#textSelect").val();
				var chooseType = $("#selectType").val();
				var createdate = $("#createdate").val();
				var validdate = $("#validdate").val();
				if (content == "请输入查询关键字") {
					content = "";
					chooseType = "";
				}
				if(createdate == "请输入创建日期"){
					createdate = "";
				}
				if (validdate == "请输入结束日期") {
					validdate = "";
				}
				var json = {
						'selectWheretext':content,
						'selectWhere':chooseType,
						'selcreatedate':createdate,
						'selvaliddate':validdate
					
				};
				jQuery("#learn-table").jqGrid('setGridParam',{postData:json}).jqGrid('setGridParam',{'page':1})
				.trigger("reloadGrid");
			}
		});
				
	}

}

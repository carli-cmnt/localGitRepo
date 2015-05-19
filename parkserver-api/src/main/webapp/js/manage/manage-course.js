var Manage = {
		loadPage:function() {
			//课程新增
			$("#insert_btn").click(function(){
				$('#manage-input').removeData("bs.modal");
				$('#manage-input').modal({
					remote: contextPath + '/manage/course/input?projectId='+$("#projectId").val(),
					backdrop:'static'
				});
			});
			//修改课程
			$("#update_btn").click(function(){	
				$('#manage-input').removeData("bs.modal");
				var rowIds = CommUtils.getJqgridSelected("manage-table");   
				if (rowIds.length > 1 || rowIds.length == 0){
					CommUtils.commAlert("manage-input", "修改记录时只能选择一条记录！");
				}else{
					var rowData = jQuery("#manage-table").jqGrid("getRowData", rowIds[0]);
					$('#manage-input').removeData("bs.modal");
					$('#manage-input').modal({
						remote:'update?rowIds='+rowIds,
						backdrop:'static'
					});
				}
			});
			//删除课程
			$("#delete_btn").click(function(){
				var rowIds = CommUtils.getJqgridSelected("manage-table");
				var options = new Object;
				options.modalId = "manage-input";
				options.msg = "确认您是否要删除所选中的记录？";
				options.delIds = rowIds;
				options.url = contextPath+ "/manage/course/delete";
				options.gridTableId = "manage-table";
				CommUtils.commDelete(options);
			});
			// **************以下为表格操作***********************
			jQuery("#manage-table").jqGrid({
				url:'list?projectId='+$("#projectId").val(),// 数据源标识，来自后台Controller Remapping("list");
				datatype: 'json',   // 数据返回对象，默认为XML，可选JSON....等类型
				mtype: "POST",		// JS 提交方式 ，默认为GET
				height: "100%",		// 表格高度
				rownumbers: true,	// 设置是否为TRUE，如果为TRUE,则在表格左边添加一行，显示顺序号，如平时的ID自增长，顺序标识
				rownumWidth:50,		// 如果rownumbers为TRUE，即可设置column(列)的宽度
				colNames:['id','','项目名称','讲义','视频','考试'],	// 表格列显示的字段名
				colModel:[// 数据源传送过来的值
						// 常用到的属性：name 列显示的名称；index 传到服务器端用来排序用的列名称；width 列宽度；align
						// 对齐方式；sortable 是否可以排序
						{name:'id',hidden:true,width:20},
						{name:'action',index:'action',width:25,hidden:false,fixed:true},
						{name:'title',index:'title',width:30,editable:false},
						{name:'content',index:'content',width:20,editable:false},
						{name:'mv',index:'mv',width:20,editable:false},
						{name:'exam',index:'exam',width:30,editable:false},
						], 
		viewrecords :true,	// 是否显示记录总条数
		rowNum:10,				// 设置每页显示多少条
		rowList:[10,20,30],		// 设置每页显示多少条，为下拉框可选，选择后，覆盖rowNum的值
		pager : "#manage-pager",	// 在HTML任意位置，通过标签ID，可设置是否要翻页功能
		altRows: true,			// 设置是否要斑马纹，即表格行与行之间黑白相间，用于区分。
		autowidth: true,		// 如果为TRUE时，表格首次创建时，可根据父元素宽度自动调整表格宽度，如果父元素改变了宽度，为使表格自动调整宽度，需要实现函数：SetGridWidth
		autoScroll: false,		// 估计是 是否要滚动条
		caption: "项目列表",	// 表格标题名称
		jsonReader : {   		// 描述JSAON数据格式的数组
			root:"result",
			total:'totalPages',
			page:'page',
			records:'records'   
		},
		loadComplete : function() {
			var table = this;
			setTimeout(function(){
				updatePagerIcons(table);
			}, 0);
		},
		gridComplete : function(){
			var ids = jQuery("#manage-table").jqGrid('getDataIDs');
			for(var i=0;i < ids.length;i++){
				var cl = ids[i];
				checkbox = "<label><input name=\"grid-checkbox\" value=\"" + cl + "\"type=\"checkbox\" class=\"ace\"><span class=\"lbl\"></span></label>"; 
				jQuery("#manage-table").jqGrid('setRowData',ids[i],{action:checkbox});
			}
	
			/**
			 * 窗口缩放时，经动态变化宽度
			 */
			$(window).resize(function(){ 
				var winwidth=$('#right_grid').width(); 	// 当前页面的宽度
				$("#manage-table").setGridWidth(winwidth);
				$('.ui-jqgrid-bdiv').css('width',winwidth+1);
			});
	
			/**
			 * 点击菜单边框收缩菜单时，动态变化表格宽度
			 */
			$('#sidebar-collapse').click(function(){
				var winwidth=$('#right_grid').width(); 	// 当前窗口中，一行的宽度
				$("#manage-table").setGridWidth(winwidth);
				$('.ui-jqgrid-bdiv').css('width',winwidth+1);
			});
		}
			});
		}
};
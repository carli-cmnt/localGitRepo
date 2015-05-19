var JqGridObj = {
	onLoadPage : function() {
		$("#date_1").datepicker(); 
		$("#test-table").jqGrid({
			url:'jqgridList',			//数据源标识，来自后台Controller Remapping("list");
		    datatype: 'json',   //数据返回对象，默认为XML，可选JSON....等类型
			mtype: "POST",		//JS 提交方式 ，默认为GET
			height: "100%",		//表格高度
			rownumbers: true,	//设置是否为TRUE，如果为TRUE,则在表格左边添加一行，显示顺序号，如平时的ID自增长，顺序标识
			rownumWidth:50,		//如果rownumbers为TRUE，即可设置column(列)的宽度
			colNames:['id','充值类型','充值金额','充值日期','充值状态','充值前金额','充值后金额','操作'],	//表格列显示的字段名 
			colModel:[												//数据源传送过来的值
			 //常用到的属性：name 列显示的名称；index 传到服务器端用来排序用的列名称；width 列宽度；align 对齐方式；sortable 是否可以排序
			    {name:'id',hidden:true,width:20},
			    {name:'rechargeType',index:'rechargeType',width:20,editable:false},
			    {name:'rechargeSum',index:'rechargeSum',width:20,editable:false},
			    {name:'rechargeDateStr',index:'rechargeDateStr',width:30,editable:false},
			    {name:'status',index:'status',width:30,editable:false},
			    {name:'originBalance',index:'originBalance',width:30,editable:false},
			    {name:'remainBalance',index:'remainBalance',width:30,editable:false},
			    {name:'operation',index:'operation',width:30,editable:false},
			], 
			viewrecords :true,	//是否显示记录总条数
			rowNum:10,				//设置每页显示多少条
			rowList:[10,20,30],		//设置每页显示多少条，为下拉框可选，选择后，覆盖rowNum的值
			pager : "#test-pager",	//在HTML任意位置，通过标签ID，可设置是否要翻页功能
			altRows: true,			//设置是否要斑马纹，即表格行与行之间黑白相间，用于区分。
			autowidth: true,		//如果为TRUE时，表格首次创建时，可根据父元素宽度自动调整表格宽度，如果父元素改变了宽度，为使表格自动调整宽度，需要实现函数：SetGridWidth
			autoScroll: false,		//估计是 是否要滚动条
			caption: "列表",	//表格标题名称
			jsonReader : {   		//描述JSAON数据格式的数组
		      root:"result",
		      total:'totalPages',
		      page:'page',
		      records:'records'   
			},
			loadComplete : function() {
			},
			gridComplete : function(){
				
			}
		});
	}
};
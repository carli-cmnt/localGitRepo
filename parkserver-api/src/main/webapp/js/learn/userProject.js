var JqGridObj = {
	onLoadPage : function() {
 
		$("#test-table").jqGrid({
			url:'userProjectList',			//数据源标识，来自后台Controller Remapping("list");
		    datatype: 'json',   //数据返回对象，默认为XML，可选JSON....等类型
			mtype: "POST",		//JS 提交方式 ，默认为GET
			height: "100%",		//表格高度
			rownumbers: true,	//设置是否为TRUE，如果为TRUE,则在表格左边添加一行，显示顺序号，如平时的ID自增长，顺序标识
			rownumWidth:50,		//如果rownumbers为TRUE，即可设置column(列)的宽度
			colNames:['projectId','项目名称','项目类型','项目学分','项目状态'],	//表格列显示的字段名 
			colModel:[												//数据源传送过来的值
			 //常用到的属性：name 列显示的名称；index 传到服务器端用来排序用的列名称；width 列宽度；align 对齐方式；sortable 是否可以排序
			    {name:'projectId',hidden:true,width:20},
			    {name:'name',index:'name',width:20,editable:false},
			    {name:'typeStr',index:'typeStr',width:20,editable:false},
			    {name:'creditValue',index:'creditValue',width:30,editable:false},
			    {name:'statusStr',index:'statusStr',width:30,editable:false},
//			    {name:'option',index:'option',width:20,editable:false,formatter:function(cellvalue, options, rowObject){
//			        return "<a class='btn btn-danger btn-sm'  href='/remoteedu/learn/inproject/course'>进入课程</a>";},},
			], 
			viewrecords :true,	//是否显示记录总条数
			rowNum:10,				//设置每页显示多少条
			rowList:[10,20,30],		//设置每页显示多少条，为下拉框可选，选择后，覆盖rowNum的值
			pager : "#test-pager",	//在HTML任意位置，通过标签ID，可设置是否要翻页功能
			altRows: true,			//设置是否要斑马纹，即表格行与行之间黑白相间，用于区分。
			autowidth: true,		//如果为TRUE时，表格首次创建时，可根据父元素宽度自动调整表格宽度，如果父元素改变了宽度，为使表格自动调整宽度，需要实现函数：SetGridWidth
			autoScroll: false,		//估计是 是否要滚动条
			caption: "项目信息",	//表格标题名称
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
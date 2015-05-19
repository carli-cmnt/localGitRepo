var Account = {
		del:function(id){
			alert(id);
			var ids=new Array();
			ids[0]=id;
			var options=new Object();
			options.modalId="org-input";
			options.msg="确定删除此条记录吗，删除后不可恢复！";
			options.delIds=ids;
			options.url="deleteAccount";
			options.gridTableId="account-table";
			CommUtils.commDelete(options);
		},
		print:function(id){
			alert("ABC");
			alert(id);
		},
	onLoadPage : function() {

//		jQuery(function($){   
//		     $.datepicker.regional['zh-CN'] = {   
//		        clearText: '清除',   
//		        clearStatus: '清除已选日期',   
//		        closeText: '关闭',   
//		        closeStatus: '不改变当前选择',   
//		        prevText: '<上月',   
//		        prevStatus: '显示上月',   
//		        prevBigText: '<<',   
//		        prevBigStatus: '显示上一年',   
//		        nextText: '下月>',   
//		        nextStatus: '显示下月',   
//		        nextBigText: '>>',   
//		        nextBigStatus: '显示下一年',   
//		        currentText: '今天',   
//		        currentStatus: '显示本月',   
//		        monthNames: ['一月','二月','三月','四月','五月','六月', '七月','八月','九月','十月','十一月','十二月'],   
//		        monthNamesShort: ['一','二','三','四','五','六', '七','八','九','十','十一','十二'],   
//		        monthStatus: '选择月份',   
//		        yearStatus: '选择年份',   
//		        weekHeader: '周',   
//		        weekStatus: '年内周次',   
//		        dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],   
//		        dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],   
//		        dayNamesMin: ['日','一','二','三','四','五','六'],   
//		        dayStatus: '设置 DD 为一周起始',   
//		        dateStatus: '选择 m月 d日, DD',   
//		        dateFormat: 'yy-mm-dd',   
//		        firstDay: 1,   
//		        initStatus: '请选择日期',   
//		        isRTL: false};   
//		        $.datepicker.setDefaults($.datepicker.regional['zh-CN']);   
//		    });  
//		 $("#date_1").datepicker(); 
		$("#account-table").jqGrid({
			url:'list',			//数据源标识，来自后台Controller Remapping("list");
		    datatype: 'json',   //数据返回对象，默认为XML，可选JSON....等类型
			mtype: "POST",		//JS 提交方式 ，默认为GET
			height: "100%",		//表格高度
			rownumbers: true,	//设置是否为TRUE，如果为TRUE,则在表格左边添加一行，显示顺序号，如平时的ID自增长，顺序标识
			rownumWidth:50,		//如果rownumbers为TRUE，即可设置column(列)的宽度
			colNames:['id','操作类型','操作金额','操作日期','操作前金额','操作后金额','操作'],	//表格列显示的字段名 
			colModel:[												//数据源传送过来的值
			 //常用到的属性：name 列显示的名称；index 传到服务器端用来排序用的列名称；width 列宽度；align 对齐方式；sortable 是否可以排序
			    {name:'id',hidden:true,width:20},
			    {name:'type',index:'type',width:20,editable:false},
			    {name:'creditMoney',index:'creditMoney',width:20,editable:false},
			    {name:'creditDateStr',index:'creditDateStr',width:30,editable:false},
			    {name:'originalMoney',index:'originalMoney',width:30,editable:false},
			    {name:'remainingMomey',index:'remainingMomey',width:30,editable:false},
//			    {name:'remainBalance',index:'remainBalance',width:30,editable:false},
			    {name:'operation',index:'operation',width:30,editable:false,formatter:function(cellvalue, options, rowObject){
			        return "<a onclick=\"Account.print("+rowObject.id+")\" style='text-decoration:none;color:blue'>"+"打印"+"</a>";
			        }
			    }
			], 
			viewrecords :true,	//是否显示记录总条数
			rowNum:10,				//设置每页显示多少条
			rowList:[10,20,30],		//设置每页显示多少条，为下拉框可选，选择后，覆盖rowNum的值
			pager : "#account-pager",	//在HTML任意位置，通过标签ID，可设置是否要翻页功能
			altRows: true,			//设置是否要斑马纹，即表格行与行之间黑白相间，用于区分。
			autowidth: true,		//如果为TRUE时，表格首次创建时，可根据父元素宽度自动调整表格宽度，如果父元素改变了宽度，为使表格自动调整宽度，需要实现函数：SetGridWidth
			autoScroll: false,		//估计是 是否要滚动条
			caption: "个人账户信息",	//表格标题名称
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
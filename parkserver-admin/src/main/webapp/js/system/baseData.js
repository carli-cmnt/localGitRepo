var BaseData = {
	//列表页面加载方法
	loadPage : function() {
		jQuery("#baseData-grid-table").jqGrid({
			url:'list',
		    datatype: 'json',     
			mtype: "POST",
			height: "100%",
			rownumbers: true,
			rownumWidth:50,
			colNames:['id','','名称', '编码', '状态', '创建人','创建时间','最后修改人','最后修改时间'],
			colModel:[
			    {name:'id',index:'id',width:90,hidden:true},
			    {name:'action',index:'action',width:25,hidden:false,fixed:true},
			    {name:'name',index:'name',width:150,editable:false},
			    {name:'code',index:'code',width:200,editable:false},
				{name:'isValid',index:'isValid', width:50,editable:false,formatter:statusChange},
				{name:'createUserName',index:'createUserName',width:90},
				{name:'createDate',index:'createDate',width:90,formatter:dateFormatter},
				{name:'lastUpdateUserName',index:'lastUpdateUserName',width:90},
				{name:'lastUpdateDate',index:'lastUpdateDate',width:90,formatter:dateFormatter},
			], 
			viewrecords : true,
			rowNum:10,
			rowList:[10,20,30],
			pager : "#grid-pager",
			multiselect: false,
	        multiboxonly: false,
			altRows: true,
			autowidth: true,
			caption: "数据字典列表",
			jsonReader : {   
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
				var ids = jQuery("#baseData-grid-table").jqGrid('getDataIDs');
				for(var i=0;i < ids.length;i++){
					var cl = ids[i];
					checkbox = "<label><input name=\"grid-checkbox\" value=\"" 
						+ cl + "\"type=\"checkbox\" class=\"ace\"><span class=\"lbl\"></span></label>"; 
					jQuery("#baseData-grid-table").jqGrid('setRowData',ids[i],{action:checkbox});
				}
				
				/**
				 * 窗口缩放时，经动态变化宽度
				 */
				$(window).resize(function(){ 
					var winwidth=$('.page-content').width(); 	//当前页面的宽度
					$("#baseData-grid-table").setGridWidth(winwidth);
					$('.ui-jqgrid-bdiv').css('width',winwidth+1);
				});
				
				/**
				 * 点击菜单边框收缩菜单时，动态变化表格宽度
				 */
				$('#sidebar-collapse').click(function(){
					var winwidth=$('.main-content .col-xs-12').width(); 	//当前窗口中，一行的宽度
					$("#baseData-grid-table").setGridWidth(winwidth);
					$('.ui-jqgrid-bdiv').css('width',winwidth+1);
				});
			}
		});
		
		//查询按钮
		$('#search').click(function(){
			var json = {
				'name':$("#name").val(),
				'code':$("#code").val()
			};
			jQuery("#baseData-grid-table").jqGrid('setGridParam', { postData: json }).jqGrid('setGridParam', { 'page': 1 })
			.trigger("reloadGrid");
		});
	
		//新增按钮
		$('#new').click(function(){
			window.location.href="step";
		});
		
		//修改按钮
		$('#edit').click(function(){
			var rowIds = CommUtils.getJqgridSelected("baseData-grid-table");    
			if (rowIds.length > 1 || rowIds.length == 0){
				CommUtils.commAlert("baseData-input", "修改记录时只能选择一条记录！");
			}else{
				window.location.href="step?timestamp=" + new Date().getTime() + "&typeId=" + rowIds[0];
			}
		});

		//删除按钮
		$('#delete').click(function(){
			var rowIds = CommUtils.getJqgridSelected("baseData-grid-table");
			if (rowIds.length == 0){
				CommUtils.commAlert("baseData-input", "请选择一条或多条记录！");
			}else{
				var options = new Object;
				options.modalId = "baseData-input";
				options.msg = "确认您是否要删除所选中的记录？";
				options.delIds = rowIds;
				options.url = "delete";
				options.gridTableId = "baseData-grid-table";
				CommUtils.commDelete(options);
			}
		});
	},
	//修改页面加载方法
	loadStepPage: function(){
		$('#baseData_step').ace_wizard()
		.on('change' , function(e, info){
			if(info.step == 1){
				if ($('#baseDataType_fmt').valid()){
					$.ajax({
						type:'POST',
						url:'saveBaseDataType',
						data:$('#baseDataType_fmt').serialize(),
						dataType:'json',
						success:function(json){
							if(json.status == "success"){
								$("#item_typeId").val(json.result.id);
								$("#typeCode").val(json.result.code);
								$("#typeIsValid").val(json.result.isValid);
								$.gritter.add({
									title: '信息提示',
									text: '数据字典类型保存成功！',
									time: '1500',
									class_name: 'gritter-light'
								});
								
								BaseData.loadStepTwoPage();
							}
						}
					});
				}else{
					return false;
				}
			}else if(info.step == 2){
			}
		})
		.on('finished', function(e) {
			if ($("#typeIsValid").val() == "0"){
				$.ajax({
					type:'POST',
					url:'changeValid',
					data:{
						id : $("#typeId").val(),
						flag : '1'
					},
					dataType:'json',
					success:function(json){
						window.location.href=contextPath + "/system/dataDictionary/";
					}
				});
			}else{
				window.location.href=contextPath + "/system/dataDictionary/";
			}
		})
		.on('stepclick', function(e){
			
		});
		$('#baseDataType_fmt').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: true,
			rules:{
				code:{
					required:true,
					remote:{//验证输入的编号是否重复
						url:'validateTypeCodeExist',
						type:'post',
						data:{
							code:function(){
								return $('#baseDataTypeCode').val();
							},
							id:function(){
								return $('#typeId').val();
							}
						}
					}		
				},
				name:{
					required:true
					
				}
			},
			messages:{
				code:{
					required:"数据字典编码为必填项",
					remote:"数据字典编码已存在"
				},
				name:{
					required: "数据字典名称必填项"
					
				}
			},
			highlight: function (e) {
				$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
			},
			success: function (e) {
				$(e).closest('.form-group').removeClass('has-error').addClass('has-info');
				$(e).remove();
			},
			errorPlacement: function(error, element) {
				if (element.is('input')){
					if ("clearfix" == element.parent().attr("class")){
						error.insertAfter(element.parent());
					}else{
						error.insertAfter(element);
					}
				}else{
					error.insertAfter(element);
				}
			}
		});
		
		$('#undo_btn').click(function(){
			window.location.href=contextPath + "/system/dataDictionary/";
		});
	},
	loadStepTwoPage: function(){
		var typeId = $("#item_typeId").val();
		$('#baseData_tree').jstree({
			core : {
				themes : {
					theme : "classic",
					dots : true,
					icons : false
				},
		    	data : {
		    		type : "json",
		    		method : "post",
		    		url : contextPath + "/system/dataDictionary/getBaseDataTree?typeId=" 
		    			+ typeId + "&timestamp=" + new Date().getTime()
		    	}
			}
		})
		.bind('load_node.jstree', function() { 
			var treeLi = $("#baseData_tree").find("li");
			$('#typeId').val($(treeLi[0]).attr("id"));
			$('#item_typeId').val($(treeLi[0]).attr("id"));
	    })
	    .bind("select_node.jstree", function(e, data) { 
	    	var node = data.node.original;

	    	if (node.id == $("#item_typeId").val()){
	    		$("#itemId").val("");
	    		$("#baseDataItemCode").val("");
	    		$("#baseDataItemName").val("");
	    		$("#seqNo").val("");
	    		$("#description").val("");
	    		$('input[name=isValid]').get(0).checked = true;
	    	}else{
	    		$("#itemId").val(node.id);
	    		$("#baseDataItemCode").val(node.code);
	    		$("#baseDataItemName").val(node.text);
	    		$("#seqNo").val(node.seqNo);
	    		$("#description").val(node.description);
	    		if ($('input[name=isValid]').get(0).value == node.isValid){
	    			$('input[name=isValid]').get(0).checked = true;
	    		}else{
	    			$('input[name=isValid]').get(1).checked = true;
	    		}
	    	}
		});
		
		$('#baseDataItem_fmt').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: true,
			rules:{
				code:{
					required:true,
					remote:{//验证输入的编号是否重复
						url:'validateItemCodeExist',
						type:'post',
						data:{
							typeCode: function(){
								return $('#typeCode').val();
							},
							code:function(){
								return $('#baseDataItemCode').val();
							},
							id:function(){
								return $('#itemId').val();
							}
						}
					}		
				},
				name:{
					required:true
					
				},
				seqNo:{
					number:true
				}
			},
			messages:{
				code:{
					required:"数据项编码为必填项",
					remote:"数据项编码已存在"
				},
				name:{
					required: "数据项名称必填项"
					
				},
				seqNo:{
					number : "顺序必须是数字"
				}
			},
			highlight: function (e) {
				$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
			},
			success: function (e) {
				$(e).closest('.form-group').removeClass('has-error').addClass('has-info');
				$(e).remove();
			},
			errorPlacement: function(error, element) {
				if (element.is('input')){
					if ("clearfix" == element.parent().attr("class")){
						error.insertAfter(element.parent());
					}else{
						error.insertAfter(element);
					}
				}else{
					error.insertAfter(element);
				}
			}
		});
		
		$('#save_btn').click(function(){
			if ($('#baseDataItem_fmt').valid()){
				$.ajax({
					type:'POST',
					url:'saveBaseDataItem',
					data:$('#baseDataItem_fmt').serialize(),
					dataType:'json',
					success:function(json){
						if(json.status == "success"){
							$.gritter.add({
								title: '信息提示',
								text: '数据项保存成功！',
								time: '1500',
								class_name: 'gritter-light'
							});
							
							CommUtils.commRefreshTree("baseData_tree");
							
							$("#itemId").val("");
				    		$("#baseDataItemCode").val("");
				    		$("#baseDataItemName").val("");
				    		$("#seqNo").val("");
				    		$("#description").val("");
				    		$('input[name=isValid]').get(0).checked = true;
						}
					}
				});
			}
		});
	}
}
	var pathName = document.location.pathname;
	var index = pathName.substr(1).indexOf("/");
	var contextPath = pathName.substr(0,index+1);

	var cookie_openMenuId = $.cookies.get("openMenuId");
	if(!cookie_openMenuId){
		$.cookies.set("openMenuIds","");
	}
	
	var cookie_activeMenuId = $.cookies.get("activeMenuId");
	if(!cookie_activeMenuId){
		$.cookies.set("activeMenuId","");
	}
	
	$.ajaxSetup({cache:false});//ajax调用不使用缓存
	
	// 日期框初始化
	function initDateField(){
		$('.date-picker').datepicker({
			autoclose : true,
			language: 'cn',
			format:'yyyy-mm-dd'
		}).next().on(ace.click_event, function() {
		});
	}
	//获取年龄
	function getAge(cellvalue, options, rowObject) {
		if ($.trim(cellvalue).length > 0) {
			var dateArray = cellvalue.split("-");
			var oldYear = new Date(dateArray[0],dateArray[1],dateArray[2]).getFullYear();
			var currentYear = new Date().getFullYear();
			return currentYear-oldYear;
		} else {
			return '未设置';
		}
	}
	/**
	 * 全局的ajax访问，处理ajax清求时sesion超时
	 * @author ZHANGJH
	 */
    $.ajaxSetup({ 
        contentType:"application/x-www-form-urlencoded;charset=utf-8", 
        complete:function(XMLHttpRequest,textStatus){ 
        	
        	var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus");
        	if(sessionstatus=="timeout"){ 
        		window.location.replace(contextPath + "/common/sessionOut"); 
        	} 
        } 
	});

	/**
	 * 替换jqgrid的分页样式
	 * @author Leo.liu
	 */
	function updatePagerIcons(table) {
		var replacement = {
			'ui-icon-seek-first' : 'icon-double-angle-left bigger-140',
			'ui-icon-seek-prev' : 'icon-angle-left bigger-140',
			'ui-icon-seek-next' : 'icon-angle-right bigger-140',
			'ui-icon-seek-end' : 'icon-double-angle-right bigger-140'
		};
		$('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function() {
			var icon = $(this);
			var $class = $.trim(icon.attr('class').replace('ui-icon', ''));

			if ($class in replacement)
				icon.attr('class', 'ui-icon ' + replacement[$class]);
		})
	}
	
	/* fileid 文件ID
	 * filequeue 上传成功后文件显示ID
	 * hiddenid  表单赋值ID
	 * type 上传文件类型如:'*.jpg;*.jpge;*.gif;*.png'
	 */
	function uploadfile(fileid,filequeue,hiddenid,type){
		$('#'+fileid).uploadify({
            'buttonText' : '上传文件',  
            'height' : 30,  
            swf           : contextPath+'/plugins/uploadify/uploadify.swf',  
            uploader      : contextPath+'/common/file/uploadFile_old',   
            'width' : 120,  
            'auto':true,  //自动上传
            'multi':false,//是否多文件上传
            'fileObjName'   : 'file',
            //上传队列容器DOM元素的ID
            'queueID'  : 'queue',
             //允许上传的文件后缀  
            'fileTypeExts':type,
            //上传文件的大小限制  
             'fileSizeLimit':'1MB',  
            //上传数量  
            'queueSizeLimit' : 1, 
            'onUploadSuccess' : function(file, data, response) {   
            	//返回文件名
                $('#'+filequeue).html('<a href="javascript:void(0);" onclick="downFile(this);" name="down_file" title="点击下载" >'+data+'</a>'); //成功显示
                $('#'+hiddenid).val(data); //表单赋值
            }     
		});
	}
	/**
	 * 下载文件
	 */
	function downFile(obj){
		
		var name = $.trim($(obj).html());
		if(typeof(name) == 'string' && name != ''){
			window.location=contextPath+"/common/file/downloadFile?fileName="+name;
		}
	}
	
	/*
	 * 时间比较，格式  yyyy-MM-dd
	 */
	jQuery.validator.addMethod("compareDate", function(value, element,param) {
		//补全yyyy-MM-dd HH:mm:ss格式
		var startDate = jQuery(param).val()+" 00:00:00";
		value=value+" 00:00:00";   
		var date1=new Date(startDate.replace("-", "/").replace("-", "/"));  
	    var date2 = new Date(value.replace("-", "/").replace("-", "/"));   
		  return this.optional(element) || date1<=date2;
	},"开始日期不能大于结束日期");
	

	jQuery.validator.addMethod("isPhone",function(value,element){
		var isMobile = /^(?:13\d|15\d|18\d)\d{5}(\d{3}|\*{3})$/;
		var isPhone = /^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
        return this.optional(element) || (isMobile.test(value) || isPhone.test(value));
    });
	jQuery.validator.addMethod("isZipCode",function(value,element){
		var isZipCode = /^[0-9]{6}$/;
        return this.optional(element) || (isZipCode.test(value));
    });
	/**
	 * 取出隐藏列表中的数据
	 * @param cellvalue
	 * @param options
	 * @param rowObject
	 * @returns
	 */
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

	/**
	 * 替换JQGRID的图标样式
	 * @author Leo.liu
	 */
	function aceSwitch( cellvalue, options, cell ) {
		setTimeout(function(){
			$(cell) .find('input[type=checkbox]')
					.wrap('<label class="inline" />')
				.addClass('ace ace-switch ace-switch-5')
				.after('<span class="lbl"></span>');
		}, 0);
	}
	
	Date.prototype.format =function(format){
		var o = {
		"M+" : this.getMonth()+1, //month
		"d+" : this.getDate(), //day
		"h+" : this.getHours(), //hour
		"m+" : this.getMinutes(), //minute
		"s+" : this.getSeconds(), //second
		"q+" : Math.floor((this.getMonth()+3)/3), //quarter
		"S" : this.getMilliseconds() //millisecond
		}
		if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
		(this.getFullYear()+"").substr(4- RegExp.$1.length));
		for(var k in o)if(new RegExp("("+ k +")").test(format))
		format = format.replace(RegExp.$1,
		RegExp.$1.length==1? o[k] :
		("00"+ o[k]).substr((""+ o[k]).length));
		return format;
	}
	
	//时间控件汉化
	$.fn.datepicker.dates['cn'] = {
		    days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
		    daysShort: ["日", "一", "二", "三", "四", "五", "六", "日"],
		    daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
		    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		    monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		    today: "今天"
	};
	
	function dateFormatter(cellvalue, options, rowObject) {
		var dateFormat;
		if (typeof(options.colModel.formatoptions) != "undefined"){
			dateFormat = options.colModel.formatoptions.dateFormat;
		}
		var returnValue = "";
		if (cellvalue){
			var dateValue = new Date(cellvalue);
			if (dateFormat){
				returnValue = dateValue.format(dateFormat);
			}else{
				returnValue = dateValue.format("yyyy-MM-dd hh:mm:ss");
			}
		}
		return returnValue;
	}
	
	function statusChange(cellvalue, options, rowObject) {
		var statusCn = '';
		if ($.trim(cellvalue).length > 0) { // 判断元素是否为空
			if (cellvalue == 1) {
				statusCn = '有效';
			} else {
				statusCn = '<font color="red">无效</font>';
			}
		} else {
			statusCn = '<font color="red">无效</font>';
		}
		return statusCn;
	}
	
	function statusPriorityChange(cellvalue, options, rowObject) {
		var statusCn = '';
		if ($.trim(cellvalue).length > 0) { // 判断元素是否为空
			switch(cellvalue){
			 case 0:
				statusCn='高';
				break;
			case 1:
				statusCn='中';
				break;
			case 2:
				statusCn='低';
				break;
			default:
				statusCn='低';
			}
		} else {
			statusCn='低';
		}
		return statusCn;
	}
	function scoretypeFormatter(cellvalue, options, rowObject){
		var scoretype = '';
		if ($.trim(cellvalue).length > 0) { // 判断元素是否为空
			if (cellvalue == '01') {
				scoretype = '国家I类';
			} else if (cellvalue == '02') {
				scoretype = '省I类';
			} else if (cellvalue == '03') {
				scoretype = 'II类';
			}
		} 
		return scoretype;
	}
	String.prototype.endWith=function(str){
		if(str==null||str==""||this.length==0||str.length>this.length)
		  return false;
		if(this.substring(this.length-str.length)==str)
		  return true;
		else
		  return false;
		return true;
	};
	
	//获取数字格式
	function getNumber(obj){
	   if (obj==null) return 0;
	   if (!checkFloat(obj)||obj+""==""){
	    return 0;
	   }else{
	        return parseFloat(""+obj);
	   }
	}
	//检查输入参数是否为浮点数
	function checkFloat(str){
	    var rc=true;
	    oneDecimal=false;
	    if (str+"" == "undefined" || str == null || str==''){
	    	rc=false;
		} else{
		    for(i=0;i<str.length;i++){
		        ch=str.charAt(i);
		        if(i==0 && ch=='-'){
		            continue;
		        }
		        if(ch=="." && !oneDecimal){
		        oneDecimal=true;
		            continue;
		        }
		        if(ch==","){
		            continue;
		        }
		        if ((ch< "0") || (ch >'9')){
	                rc=false;
	                break;
	            }
	        }
	    }
	    return rc;
	}
	//获取当前时间
	function getCurrentTime(){
		var now = new Date();
		var SY = now.getFullYear();
		var SM = now.getMonth();
		var SD = now.getDate();
		var day = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
		var xq = day[now.getDay()];
		return "今天是："+SY + '年' +(SM+1) + '月' + SD + '日' + " " +xq;
	}
	
	var CommUtils = {
		//取Jqgrid的checkbox中的值 
		getJqgridSelected : function(elementId){
			var ids = [];
			var checkboxs = $(document.getElementById(elementId)).find("input[type=checkbox].ace:checked");
			$.each(checkboxs, function (index, element) {
				ids.push($(element).val());
			});
			if (ids.length == 0){
				var radios = $(document.getElementById(elementId)).find("input[type=radio].ace:checked");
				$.each(radios, function (index, element) {
					ids.push($(element).val());
				});
			}
			return ids;
		},
		
		commAlert : function(modalId,msg){
			$(document.getElementById(modalId)).load(contextPath + "/common/alert.jsp",{msg:msg,seconds:'3000',tips:''},'');
		},
		commAlertTo : function(modalId,msg,toUrl){
			$(document.getElementById(modalId)).load(contextPath + "/common/alertTo.jsp",{msg:msg,toUrl:toUrl,tips:''},'');
		},
		commConfrim: function (modalId,msg,treeId,gridTableId){
			
			$(document.getElementById(modalId)).load(contextPath + "/common/confrimRequest.jsp",
					{msg:msg,
					 modalId:modalId,
					 treeId:treeId,
					 gridTableId:gridTableId,
					 seconds:'3000',
					 tips:''}
					,''
			);
		},
		
		commDelete : function (options){
			options.delIds = options.delIds.join(",");    
			if (!options.gridTableId){
				options.gridTableId = "grid-table";
			}
			if (!options.url){
				options.url = "delete";
			}
			$(document.getElementById(options.modalId)).load(contextPath + "/common/deleteRequest.jsp",
					{msg:options.msg,
					 delIds:options.delIds,
					 modalId:options.modalId,
					 treeId:options.treeId,
					 gridTableId:options.gridTableId,
					 deleteUrl:options.url,
					 seconds:'3000',
					 tips:''}
					,''
			);
		},
		commUpdate : function (options){
			options.updateIds = options.ids.join(",");    
			if (!options.gridTableId){
				options.gridTableId = "grid-table";
			}
			if (!options.url){
				options.url = "save";
			}
			$(document.getElementById(options.modalId)).load(contextPath + "/common/updateRequest.jsp",
					{msg:options.msg,
					 updateIds:options.updateIds,
					 status:options.status,
					 modalId:options.modalId,
					 gridTableId:options.gridTableId,
					 updateUrl:options.url,
					 seconds:'3000',
					 tips:''}
					,''
			);
		},
		commRefreshTree : function (elementId){
			$(document.getElementById(elementId)).jstree("refresh");
		},
		
		//hide and show search more
		//ZHANGJH
		//2014-04-22
		//点击后收缩效果（更多）
		activateSearchMore : function(){
			$(".search-more").click(function(){
				var nextShow = true;
				if ($(".search-more i").attr("class") == "icon-chevron-up"){
					nextShow = false;
				}
				if (nextShow){
					$(".search-more i").attr("class","icon-chevron-up");
					$("#search_more_tip").html("收起");
					$(".search-hide").slideDown(150);
				}else{
					$(".search-more i").attr("class","icon-chevron-down");
					$("#search_more_tip").html("更多");
					$(".search-hide").slideUp(150);
				}
			})
		},
		//省市联动下拉框选择
		initSearchCity:function() {			
			var option1 = '';
			 $.getJSON(contextPath+"/system/org/getAllCity",function(tt) {
				var jsonData = $.parseJSON(tt.result);
			  $.each(jsonData, function(index, indexItems) {
				  option1 += "<option value=" + indexItems.id + ">"+ indexItems.name + "</option>";
			  });
			  $("#proviceId").append(option1);
			  $("#proviceId").bind("change", function() {
			   //selectCity(jsonData);
				  var option2 = '';
				  var selectedIndex = $("#proviceId :selected").val();
				  
				  $("#cityId").empty();
				  if($("#proviceId :selected").val() == -1){
				   $("#cityId").append("<option value=\"-1\">请选择城市</option>");
				  }
				  $.each(jsonData, function(index, indexItems) {
				   var proName = indexItems.name;
				   $.each(indexItems.items, function(index, indexItems) {
					   
				    if (indexItems.superId != selectedIndex) {
				     return;
				    } else {
				    	  option2 += "<option value=" + indexItems.id + ">"+ indexItems.name + "</option>";
				    }
				   })
				  });
				  $("#cityId").append(option2);
			  })
			 });
			 function selectCity(data) {
			  
			 };
		}
	}
	
	
	

	function viewObject(s){
		var strs = '';
		for(var p in s){
			strs +=(p + '===' + s[p] + '\n');
		}
		alert(strs);
		return strs;
	}
	
	
	/*
	 * 以下代码为验证身份证
	 */
	var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];    // 加权因子   
	var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];            // 身份证验证位值.10代表X   
	function IdCardValidate(idCard) { 
	    idCard = trim(idCard.replace(/ /g, ""));               //去掉字符串头尾空格           
	    if (idCard.length == 15) {   
	        return isValidityBrithBy15IdCard(idCard);       //进行15位身份证的验证    
	    } else if (idCard.length == 18) {   
	        var a_idCard = idCard.split("");                // 得到身份证数组   
	        if(isValidityBrithBy18IdCard(idCard)&&isTrueValidateCodeBy18IdCard(a_idCard)){   //进行18位身份证的基本验证和第18位的验证
	            return true;   
	        }else {   
	            return false;   
	        }   
	    } else {   
	        return false;   
	    }   
	}   
	/**  
	 * 判断身份证号码为18位时最后的验证位是否正确  
	 * @param a_idCard 身份证号码数组  
	 * @return  
	 */  
	function isTrueValidateCodeBy18IdCard(a_idCard) {   
	    var sum = 0;                             // 声明加权求和变量   
	    if (a_idCard[17].toLowerCase() == 'x') {   
	        a_idCard[17] = 10;                    // 将最后位为x的验证码替换为10方便后续操作   
	    }   
	    for ( var i = 0; i < 17; i++) {   
	        sum += Wi[i] * a_idCard[i];            // 加权求和   
	    }   
	    valCodePosition = sum % 11;                // 得到验证码所位置   
	    if (a_idCard[17] == ValideCode[valCodePosition]) {   
	        return true;   
	    } else {   
	        return false;   
	    }   
	}   
	/**  
	  * 验证18位数身份证号码中的生日是否是有效生日  
	  * @param idCard 18位书身份证字符串  
	  * @return  
	  */  
	function isValidityBrithBy18IdCard(idCard18){   
	    var year =  idCard18.substring(6,10);   
	    var month = idCard18.substring(10,12);   
	    var day = idCard18.substring(12,14);   
	    var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));   
	    // 这里用getFullYear()获取年份，避免千年虫问题   
	    if(temp_date.getFullYear()!=parseFloat(year)   
	          ||temp_date.getMonth()!=parseFloat(month)-1   
	          ||temp_date.getDate()!=parseFloat(day)){   
	            return false;   
	    }else{   
	        return true;   
	    }   
	}   
    /**  
     * 验证15位数身份证号码中的生日是否是有效生日  
     * @param idCard15 15位书身份证字符串  
     * @return  
     */  
    function isValidityBrithBy15IdCard(idCard15){   
        var year =  idCard15.substring(6,8);   
        var month = idCard15.substring(8,10);   
        var day = idCard15.substring(10,12);   
        var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));   
        // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法   
        if(temp_date.getYear()!=parseFloat(year)   
                ||temp_date.getMonth()!=parseFloat(month)-1   
                ||temp_date.getDate()!=parseFloat(day)){   
                  return false;   
          }else{   
              return true;   
          }   
    }   
    //去掉字符串头尾空格   
    function trim(str) {   
        return str.replace(/(^\s*)|(\s*$)/g, "");   
    } 
	   
	//自定义表单验证身份证的方法，参数param为证件类型
	jQuery.validator.addMethod("checkIdCard", function(value, element,param) {
		var isIDCard = true;
		//如果是身份证，则需要验证
		if($(param.type).val()=='1'){
			isIDCard=IdCardValidate(value);
		}
		return isIDCard;
		
	});
	jQuery.validator.addMethod("decimals", function(value, element,d){  
		     var a = value.indexOf(".")+1;  
		     if(a==0){  
		        a=value.length;  
		     }  
		     var b = value.length;  
		     var c = b-a;  
		    return this.optional(element) || c<=d;   
	}); 
	
	
	jQuery.validator.addMethod("isIDCard", function(value, element) {
		return IdCardValidate(value); 
	}, $.validator.format("身份证号输入不正确!"));
	
	jQuery.extend(jQuery.validator.messages, {
		rangelength: jQuery.validator.format("输入长度必须介于 {0} 和 {1} 之间")
	});
	jQuery.validator.addMethod("stringCheck", function(value, element) {
	 return this.optional(element) || /^[^_][A-Za-z]*[a-z0-9_]*$/.test(value);
	}, "用户名只能包括英文字母、数字和下划线,下划线不能成为首字母");  
	jQuery.validator.addMethod("isTell", function(value, element) {
		var RegExp = /^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/; 
		return RegExp.test(value); 
	}, $.validator.format("手机号码输入不正确!"));
	//15位身份证转为18位身份证
	function conv_id(x){
		if (x.match(/[^0-9]/)) return '';
		var s="0",i,r;
		var id_w=new Array (0,2,4,8,5,10,9,7,3,6,1,2,4,8,5,10,9,7);
		var id_c=new Array ('1','0','X','9','8','7','6','5','4','3','2');
		s=x.substr(0,6);//地区
		s+='19'+x.substr(6,6);//年月日
		s+=x.substr(12,3);//县内编码
		r=0;
		for (i=0;i<17;i++) r+=(s.charCodeAt(i)-48)*id_w[17-i];
		r=id_c[r % 11];
		return s+r;
	}
	
	//根据入职日期，自动计算产品收费开始日期：
	//如：输入2014-04-09，返回2014-04-01
	//   输入2014-04-25，返回2014-04-30
    function tostartDate(input_date){
        var date=input_date.split('-');
        var sf_start='';
        
        //收费起始日期
        if(date[2]<'16'){//上半月
            sf_start=date[0]+'-'+date[1]+'-01';
        }else{//下半月
            //12月
            if(date[1]=='12'){
                var year=parseInt(date[0])+1;
                sf_start=year+'-01-01';
            }else{
                //1~9月
                if(date[1].substr(0,1)=='0'){
                    var mon=parseInt(date[1].substr(1,1))+1;
                    if(mon<10){
                        sf_start=date[0]+'-0'+mon+'-01';
                    }else{
                        sf_start=date[0]+'-'+mon+'-01';
                    }
                }else{//10~11月
                    var mon=parseInt(date[1])+1;
                    sf_start=date[0]+'-'+mon+'-01';
                }
            }
        }
        
        return sf_start;
    
    }
    // yangxu 
    //根据入职日期，自动计算产品收费end日期：
    //如：输入2014-04-09，返回2014-03-31
    //   输入2014-04-25，返回2014-04-30
    function toEndDate(input_date){
    	var date = new Date(input_date);
    	var sf_end='';
    	if(date.getDate()<16){//上半月
    		date.setDate(0);
    	}else{//下半月
    		date.setMonth(date.getMonth()+1);
    		date.setDate(0);
    	}
    	sf_end = date2str(date);
    	return sf_end;
    }
    function date2str(d){
    	return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
    }

/**
 * jQuery.validator 默认消息
 */
jQuery.extend(jQuery.validator.messages, {
	  required: "必选字段",
	  remote: "请修正该字段",
	  email: "请输入正确格式的电子邮件",
	  url: "请输入合法的网址",
	  date: "请输入合法的日期",
	  dateISO: "请输入合法的日期 (ISO).",
	  number: "请输入合法的数字",
	  digits: "只能输入整数",
	  creditcard: "请输入合法的信用卡号",
	  equalTo: "请再次输入相同的值",
	  accept: "请输入拥有合法后缀名的字符串",
//	  maxlength: jQuery.validator.format("请输入一个 长度最多是 {0} 的字符串"),
	  maxlength: jQuery.validator.format("长度最多是 {0} "),
	  minlength: jQuery.validator.format("请输入一个 长度最少是 {0} 的字符串"),
	  rangelength: jQuery.validator.format("请输入 一个长度介于 {0} 和 {1} 之间的字符串"),
	  range: jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
	  max: jQuery.validator.format("请输入一个最大为{0} 的值"),
	  min: jQuery.validator.format("请输入一个最小为{0} 的值")
	});

/**计算社保产品金额
base 基数 ratio 比例 addMoney 附加金额 iPrecise 精确值 iCarry 进位方式
**/
function calInsurance(base,ratio,addMoney,iPrecisePara,iCarryPara){
     var iPrecise=""+iPrecisePara;
     var iCarry=""+iCarryPara; 
     if (iPrecise=="") iPrecise="2";
     if (iCarry=="") iCarry="1";
     var anMoney=floatRound(base*ratio,5);
     if(parseFloat(iPrecise)<=2){//小数位小于等于2位，不是精确值  
       if(iCarry=="1"){//四舍五入
           }else if(iCarry=="2"){//先四舍五入再见零进整
                 var extStr="0.";
             for(var i=0;i<parseFloat(iPrecise);i++){
                extStr=extStr+"0";
             }
             extStr=extStr+"4";
             var extDouble=parseFloat(extStr);
                 anMoney=anMoney+extDouble;
           }else if(iCarry=="3"){//见零进整
               var tmpMoney=anMoney+"";
               var dotPos=tmpMoney.indexOf(".");
               if (dotPos>=0){//有小数点
                   var preMoney=tmpMoney.substring(0,dotPos+1+parseFloat(iPrecise))+"0";
                   tmpMoney=tmpMoney.substring(dotPos+1+parseFloat(iPrecise));
                   if (tmpMoney!=""){
                       if (parseFloat(tmpMoney)>0){//需要见零进位
                           anMoney=parseFloat(preMoney)+Math.pow(10,-1*parseFloat(iPrecise));       
                       }   
                   }   
               }
           }
           anMoney=floatRound(anMoney,parseFloat(iPrecise));               
           
     }else{  //小数位大于2位，是精确值 
               anMoney=floatRound(anMoney,parseFloat(iPrecise));
     }
     return anMoney+addMoney;
}

//具体页面中计算,入离职用到(陈小佩重新修改)
function calculateInsurance(base,ratio,addMoney,precision,caculateType){
	var addmm = 0;
	if(addMoney!=null && addMoney!=''){
		addmm=parseFloat(addMoney);
 	}
    //计算金额金额   
    if (ratio>=0||addmm>0){
       if (ratio>=0 && base<=0){
    	   return false;
       }else{
   	  
    	   var money=calInsurance(base,ratio,addmm,precision,caculateType);

    	   return money;
       }
     
    }else{
    	return false;
    }
  
}

//四舍五入
function floatRound(myFloat,mfNumber){ 
  if ( mfNumber == 0 ) {
    return Math.round(myFloat); 
  } else { 
    var cutNumber = Math.pow(10,mfNumber); 
    return Math.round((myFloat+0.000000000001) * cutNumber)/cutNumber; 
  } 
}


function showSex(val) {
	if(val == null || val == "") {
		return "";
	}
    var sex;
    if (15 == val.length) { //15位身份证号码
        if (parseInt(val.charAt(14) / 2) * 2 != val.charAt(14))
            sex = '男';
        else
            sex = '女';
    }
    if (18 == val.length) { //18位身份证号码
        if (parseInt(val.charAt(16) / 2) * 2 != val.charAt(16))
            sex = '男';
        else
            sex = '女';
        
        return sex;
    }
}

function contains(arrs, str){
	if(arrs == null || arrs == "" || arrs == "undefined") return false;
	for(var i=0; i<arrs.length; i++){
		if(arrs[i] == str) return true;
	}
	return false;
};

String.prototype.trim=function(){
	return this.replace(/(^\s*)|(\s*$)/g, "");
}


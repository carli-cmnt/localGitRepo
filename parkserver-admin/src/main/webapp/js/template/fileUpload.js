var FileUploadObj = {
	onLoadPage : function() {
//alert(contextPath+'/common/file/uploadFile');
		 // 项目通知
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
            	   $("a[name^='down_']").html("点击预览");
            	   $("a[name^='down_']").bind('click', function() {
            		   //window.open(contextPath+"/template/video?fileName="+data);
            		   //$("#source").attr("src", contextPath+"/common/file/showVideoFile?fileName="+data);
            		   $('#video').flash(contextPath+"/common/file/showVideoFile?fileName="+data);
            	   });
                   //alert( file.name + ' 上传成功！ '+response+'---'+data); 
                   /*$('#some_file_queue').html('<a href="javascript:void(0);" name="down_file" title="点击下载" >'+data+'</a>'); //成功显示
                   $('#iteminform').val(data); //表单赋值
                   //动态创建-重新绑定click事件
                   */
               },
               'onUploadError' : function(file, errorCode, errorMsg, errorString) {
               	//$('#some_file_queue').html('上传失败、请重新上传');
               	alert('上传失败、请重新上传');
               },
               'onError' : function(type, info) {
                  	alert('上传失败、请重新上传');
               }
           });
	}
};
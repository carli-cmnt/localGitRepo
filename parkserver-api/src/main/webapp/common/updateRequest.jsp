<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>

<div class="modal-dialog">
	<div class="modal-content">
		<div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">
			<span id="ui-id-26" class="ui-dialog-title">
				<div class="widget-header widget-header-small">
					<h4 class="smaller">
						<i class="icon-ok">警告</i>
					</h4>
				</div>
			</span>
		</div>
		<div class="modal-body">
			${param.msg}<br/>
		</div>
		<div class="modal-footer">
			<input type="hidden" id="updateIds" value="${param.updateIds }">
			<input type="hidden" id="modalId" value="${param.modalId }">
			<input type="hidden" id="cstatus" value="${param.status}">
			<input type="hidden" id="gridTableId" value="${param.gridTableId }">
			<input type="hidden" id="updateUrl" value="${param.updateUrl }">
			<button class="btn btn-success btn-sm pull-left" type="button" id="confirm">确定</button>
			<button class="btn btn-danger btn-sm pull-right" data-dismiss="modal">取消</button>
		</div>
	</div>
</div>
<script type="text/javascript">
	var myModal = $('.modal-dialog').parent('.modal');
	
	$(document).ready(function(){
		
		$('#confirm').click(function(){

			var updateIds = $("#updateIds").val();
			var modalId = $("#modalId").val();
			var gridTableId = $("#gridTableId").val();
			var updateUrl = $("#updateUrl").val();
			var cstatus = $("#cstatus").val();
			$.ajax({
				type:'POST',
				url:updateUrl,
				data: {
					ids : updateIds,
					status : cstatus
				},
				dataType:'json',
				success:function(json){
					if(json.status == "success"){
						$(document.getElementById(modalId)).load(contextPath + '/common/success.jsp',
								{msg:'操作已成功!',
								 seconds:'3000',
								 tips:''},'');
						if (gridTableId){
							$(document.getElementById(gridTableId)).trigger("reloadGrid");
						}
						if (treeId){
							CommUtils.commRefreshTree(treeId);
						}
					}else{
						//$(document.getElementById(modalId)).load();
						$(document.getElementById(modalId)).load(contextPath + '/common/success.jsp',
								{msg:"<font class=\"red\">"+json.msg+"</font>",
								 seconds:'9000',
								 tips:''},'');
					}
				}
			});
		});
		
		myModal.modal('show');

		myModal.on('hidden.bs.modal', function () {
			 $(this).removeData("bs.modal");
		});
		myModal.on('hide.bs.modal', function () {
			 $(this).removeData("bs.modal");
		})
	});
</script>

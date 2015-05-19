var CKTemplete = {
	onLoadPage : function() {
		if (CKEDITOR.instances['ck-content']) {
			CKEDITOR.remove(CKEDITOR.instances['ck-content']);
		}
		CKEDITOR.replace('ck-content');
	}
};
/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {

	  config.toolbar = 'Full';

	  config.toolbar_Full =
		  [
		      { name: 'document',    items : [ 'Source','-','Save','NewPage','DocProps','Preview','Print','-','Templates' ] },
		      { name: 'clipboard',   items : [ 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] },
		      { name: 'editing',     items : [ 'Find','Replace','-','SelectAll','-','SpellChecker', 'Scayt' ] },
		      { name: 'forms',       items : [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
		      '/',
		      { name: 'basicstyles', items : [ 'Bold','Italic','Underline','Strike','Subscript','Superscript','-','RemoveFormat' ] },
		      { name: 'paragraph',   items : [ 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote','CreateDiv','-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BidiLtr','BidiRtl' ] },
		      { name: 'links',       items : [ 'Link','Unlink','Anchor' ] },
		      { name: 'insert',      items : [ 'Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak' ] },
		      '/',
		      { name: 'styles',      items : [ 'Styles','Format','Font','FontSize' ] },
		      { name: 'colors',      items : [ 'TextColor','BGColor' ] },
		      { name: 'tools',       items : [ 'Maximize', 'ShowBlocks','-','About' ] }
		  ];
	  /*var itemshow=[
	              { name: 'styles', items : [ 'Styles', 'Format', 'Font', 'FontSize', '-', 'TextColor', 'BGColor' ] },
			      { name: 'clipboard',   items : [ 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] },
			      { name: 'editing',     items : [ 'Find','Replace','-','SelectAll','-','Bold','Italic','Underline' ] },
			      { name: 'paragraph',   items : ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','Image','Table' ] },
			      { name: 'links',       items : [ 'Link','Unlink','Anchor' ] }
			      
			  ];*/
		  
		  /*['cut', 'copy', 'paste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 
		              'justifyright', 'justifyfull', 'selectall', '|','formatblock', 
		              'fontname', 'fontsize', '|', 'image', 'table',
		              '|', 'bgcolor', 'bold','italic', 'underline'];*/
	/*config.toolbar_Full = itemshow;*/
	config.indentUnit = 'em';
	config.indentOffset = 2;
	config.extraPlugins = 'smiley';
	config.font_names='宋体/宋体;黑体/黑体;仿宋/仿宋_GB2312;楷体/楷体_GB2312;隶书/隶书;幼圆/幼圆;微软雅黑/微软雅黑;Arial;Comic Sans MS;Courier New;Tahoma;Times New Roman;Verdana;'+ (config.font_names || '');
	//config.font_names = '宋体;楷体_GB2312;新宋体;黑体;隶书;幼圆;微软雅黑;Arial;Comic Sans MS;Courier New;Tahoma;Times New Roman;Verdana;' + config.font_names;
	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	//config.removeButtons = 'Underline,Subscript,Superscript';

	// Set the most common block elements.
	//config.format_tags = 'p;h1;h2;h3;pre';

    config.format_tags = 'p;h1;h2;h3;h4;h5;h6;pre;address;div';

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';
	config.filebrowserUploadUrl="/remoteedu/ckeditor/fileUpload";
	config.filebrowserImageUploadUrl="/remoteedu/ckeditor/imgUpload";

	CKEDITOR.config.width = 800;
	CKEDITOR.config.height = 500;
	
	// add by clevy
	config.baseFloatZIndex = 9999;
	config.language = 'zh-cn';
	/*config.toolbarCanCollapse = true;
	config.toolbarStartupExpanded = true;
	config.resize_enabled = false;
	config.resize_maxHeight = 3000;
	config.resize_maxWidth = 3000;
	config.resize_minHeight = 250;
	config.resize_minWidth = 750;
	config.colorButton_enableMore = true;
	
	config.colorButton_backStyle = {
		element : 'span',
		styles : {'background-color': '#(color)'} 
	}
	config.colorButton_foreStyle = {
		element : 'span',
		styles : {'color': '#(color)'} 
	}
	
	config.colorButton_colors = '000,800000,8B4513,2F4F4F,008080,000080,4B0082,696969,B22222,A52A2A,DAA520,006400,40E0D0,0000CD,800080,808080,F00,FF8C00,FFD700,008000,0FF,00F,EE82EE, A9A9A9,FFA07A,FFA500,FFFF00,00FF00,AFEEEE,ADD8E6,DDA0DD,D3D3D3,FFF0F5, FAEBD7,FFFFE0,F0FFF0,F0FFFF,F0F8FF,E6E6FA,FFF'
	
	config.dialog_backgroundCoverColor = 'rgb(255, 254, 253)'; //可设置参考 
	config.dialog_backgroundCoverOpacity = 0.5 //背景的不透明度 数值应该在：0.0～1.0 之间 
	config.dialog_magnetDistance = 20; //移动或者改变元素时 边框的吸附距离 单位：像素
	config.disableNativeSpellChecker = true; //是否拒绝本地拼写检查和提示 默认为拒绝 目前仅firefox和safari支持
	config.enterMode = CKEDITOR.ENTER_P; //可选：CKEDITOR.ENTER_BR或CKEDITOR.ENTER_DIV 
	config.entities = true; //是否使用HTML实体进行输出
	config.entities_greek = true; //是否转换一些难以显示的字符为相应的HTML字符
	config.entities_processNumerical = false; //是否转换一些特殊字符为ASCII字符 如"This is Chinese: 汉语."转换为"This is Chinese: &amp;#27721;&amp;#35821;."
	//config.extraPlugins = 'myplugin' //添加新组件
	config.startupFocus = true; //页面载入时，编辑框是否立即获得焦点
	config.startupMode = true; //载入时，以何种方式编辑 源码和所见即所得 "source"和"wysiwyg"
	config.startupOutlineBlocks = false; //载入时，是否显示框体的边框
	config.stylesCombo_stylesSet = 'default'; //是否载入样式文件 'mystyles'|'mystyles:/editorstyles/styles.js'|'mystyles:http://www.example.com/editorstyles/styles.js'
	config.tabSpaces = 0; //当用户键入TAB时，编辑器走过的空格数，(&amp;nbsp;) 当值为0时，焦点将移出编辑框
	config.templates = 'default'; //默认使用的模板
	config.templates_files = ['plugins/templates/templates/default.js']; //用逗号分隔的模板文件
	config.templates_replaceContent = true; //当使用模板时，"编辑内容将被替换"框是否选中
	config.undoStackSize =20; //撤销的记录步数
*/	//CKFinder.SetupCKEditor(null, '/ckfinder/');// 在 CKEditor 中集成 CKFinder，注意 ckfinder 的路径选择要正确
		
  config.skin = 'office2013';
//	config.skin = 'moono';
//  config.uiColor = 'black'; 

	config.keystrokes =[[ CKEDITOR.CTRL + 13 /*Enter*/, 'maximize' ],
	                    [ CKEDITOR.ALT + 121 /*F10*/, 'toolbarFocus' ], //获取焦点
	                    [ CKEDITOR.ALT + 122 /*F11*/, 'elementsPathFocus' ], //元素焦点
	                    [ CKEDITOR.SHIFT + 121 /*F10*/, 'contextMenu' ], //文本菜单
	                    [ CKEDITOR.CTRL + 90 /*Z*/, 'undo' ], //撤销
	                    [ CKEDITOR.CTRL + 89 /*Y*/, 'redo' ], //重做
	                    [ CKEDITOR.CTRL + CKEDITOR.SHIFT + 90 /*Z*/, 'redo' ], //
	                    [ CKEDITOR.CTRL + 76 /*L*/, 'link' ], //链接
	                    [ CKEDITOR.CTRL + 66 /*B*/, 'bold' ], //粗体
	                    [ CKEDITOR.CTRL + 73 /*I*/, 'italic' ], //斜体
	                    [ CKEDITOR.CTRL + 85 /*U*/, 'underline' ], //下划线
	                    [ CKEDITOR.ALT + 109 /*-*/, 'toolbarCollapse' ]
	];
	config.EnterMode = 1;                        // p | div | br
    config.ShiftEnterMode = 2;        // p | div | br
};

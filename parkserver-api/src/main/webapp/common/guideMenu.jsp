<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
		String path = request.getContextPath();
		String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	%>
<link href="<%=basePath%>assets/matrixWeb/css/style.css" title="style"
	rel="stylesheet" type="text/css" />
<link id="clink" href="<%=basePath%>assets/matrixWeb/css/style-blue.css"
	title="style" rel="stylesheet" type="text/css" media="screen" />
<script src="<%=basePath%>assets/matrixWeb/scripts/jquery.min.js"
	type="text/javascript"></script>
<script
	src="<%=basePath%>assets/matrixWeb/scripts/jquery.masonry.min.js"
	type="text/javascript"></script>
<script src="<%=basePath%>assets/matrixWeb/scripts/jquery.easing.1.3.js"
	type="text/javascript"></script>
<script src="<%=basePath%>assets/matrixWeb/scripts/MetroJs.lt.js"
	type="text/javascript"></script>
<script
	src="<%=basePath%>assets/matrixWeb/scripts/jquery.fancybox-1.3.4.js"
	type="text/javascript" charset="utf-8"></script>
<script
	src="<%=basePath%>assets/matrixWeb/scripts/jquery.flexslider-min.js"
	type="text/javascript" charset="utf-8"></script>
<script src="<%=basePath%>assets/matrixWeb/scripts/hoverintent.js"
	type="text/javascript" charset="utf-8"></script>
<script
	src="<%=basePath%>assets/matrixWeb/scripts/organictabs.jquery.js"
	type="text/javascript" charset="utf-8"></script>

<link type="text/css" rel="stylesheet"
	href="${pageContext.request.contextPath}/plugins/jqgrid/themes/jquery-ui.min.css" />
<script type="text/javascript"
	src="${pageContext.request.contextPath}/plugins/jqgrid/themes/jquery-ui.min.js"></script>
<script type="text/javascript"
    src="${pageContext.request.contextPath}/plugins/storeJS/store.min.js"></script>
<style type="text/css">
<!--
.title-field {
	width: 70%;
	margin-left: auto;
	margin-right: auto;
}

.content-field {
	width: 70%;
	margin-left: auto;
	margin-right: auto;
}

.widget-content {
	background: #404040;
	padding: 20px;
}
-->
</style>
<input id="contextpath" type="hidden" value="<%=basePath%>" />
<input id="projPath" type="hidden" value="<%=path%>" />
<header class="clearfix title-field">
	<!-- BEGIN LOGO -->
	<img id="logo" src="<%=basePath%>/assets/matrixWeb/images/logo.png"
		alt="logo" /><span id="sitename">远程医学教育</span>

	<nav>
		<ul id="nav" class="clearfix">
		</ul>
	</nav>
</header>
<script type="text/javascript">
	var contextpath = $("#contextpath").val();
	var projPath = $("#projPath").val();

	/*初始化日期控件中文格式*/
	jQuery(function($) {
		$.datepicker.regional['zh-CN'] = {
			clearText : '清除',
			clearStatus : '清除已选日期',
			closeText : '关闭',
			closeStatus : '不改变当前选择',
			prevText : '<上月',
			prevStatus : '显示上月',
			prevBigText : '<<',   
                   prevBigStatus: '显示上一年',   
                   nextText: '下月>',
			nextStatus : '显示下月',
			nextBigText : '>>',
			nextBigStatus : '显示下一年',
			currentText : '今天',
			currentStatus : '显示本月',
			monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月',
					'九月', '十月', '十一月', '十二月' ],
			monthNamesShort : [ '一', '二', '三', '四', '五', '六', '七', '八', '九',
					'十', '十一', '十二' ],
			monthStatus : '选择月份',
			yearStatus : '选择年份',
			weekHeader : '周',
			weekStatus : '年内周次',
			dayNames : [ '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六' ],
			dayNamesShort : [ '周日', '周一', '周二', '周三', '周四', '周五', '周六' ],
			dayNamesMin : [ '日', '一', '二', '三', '四', '五', '六' ],
			dayStatus : '设置 DD 为一周起始',
			dateStatus : '选择 m月 d日, DD',
			dateFormat : 'yy-mm-dd',
			firstDay : 1,
			initStatus : '请选择日期',
			isRTL : false
		};
		$.datepicker.setDefaults($.datepicker.regional['zh-CN']);

        $.ajax({
            type : "post",
            url : contextpath + "/system/menu/getMenus",
            dataType : "json",
            success : function(json) {
            	if (json == null || json.result == null) {
            		return;
            	}
                treeObject = null;
                if (json.result.length < 9) {
                    return;
                }
                var tree_data = $.parseJSON(json.result);
                buildMenus(tree_data);
                //init
                init();
            }
        });
	});

	//构建菜单
	function buildMenus(json) {
		$.each(json, function(index, item) {
			var children = item.additionalParameters.children;
			var _li = document.createElement("li");
			$(_li).attr("itemid", item.id);
			$(_li).appendTo($("#nav"));

	        //展开当前URL的菜单栏
            if (store.enabled && store.get('currentMenuID') != null
                && store.get('currentMenuID').indexOf(item.id) >= 0) {
                $(_li).addClass("current");
            }
			var path = item.menuPath != "" ? projPath + item.menuPath : "#";
			var _li_a = $(
					"<a href='" + path + "' title='" + item.name + "'><span>"
							+ item.name + "</span></a>").appendTo($(_li));

			var _child_ul = $("<ul />").appendTo($(_li));

			$.each(children, function(index, childItem) {
				var childPath = childItem.menuPath != "" ? projPath
						+ childItem.menuPath : "#";
				var _child_ul_li = $(
						"<li><a href='" + childPath + "' title='" + childItem.name + "'><span>"
								+ childItem.name + "</span></a></li>")
						.appendTo($(_child_ul));
				_child_ul_li.attr("parentId", item.id);
			});
		});

		$('li[parentId!=null]')
				.click(
						function() {
							var comparStr = $(this).attr("itemid");
							if (store.enabled) {
								store.set('currentMenuID', $(this).attr("itemid"));
							}
						});
	}
	function init() {
		//Navigation
		$("ul#nav li").hoverIntent(function() {
			$(this).children('ul').slideDown(300);
		}, function() {
			$(this).children('ul').slideUp(300);
		});
		// Create the dropdown base
		$("<select />").appendTo("nav");

		// Create default option "Go to..."
		$("<option />", {
			"selected" : "selected",
			"value" : "",
			"text" : "Go to..."
		}).appendTo("nav select");

		// Populate dropdown with menu items
		$("nav a").each(function() {
			var el = $(this);
			$("<option />", {
				"value" : el.attr("href"),
				"text" : el.text()
			}).appendTo("nav select");
		});

		$("nav select").change(function() {
			window.location = $(this).find("option:selected").val();
		});

		//Flexslider    
		$('.flexslider').flexslider();

		//Masonry Settings
		$('#content-mos').masonry({
			itemSelector : '.tile',
			columnWidth : 160,
			isAnimated : true,
			isFitWidth : true
		});

		//Allow effects when hovering on tiles
		$('.tile').not('.exclude').hover(function() {
			$('.tile').not(this).addClass('fade');
		}, function() {
			$('.tile').removeClass('fade');
		});
		$('.tile').append(
				'<img class="tilehover" src="images/tilehover.png" alt=" "/>');

		//Live-tile effects
		$(".live").liveTile({
			pauseOnHover : true
		});

		//Toggle
		$(".toggle-button").click(
				function() {
					$(this).next("div.toggle-content").slideToggle("slow");
					$(this).children('.toggle-indicator')
							.text(
									$(this).children('.toggle-indicator')
											.text() == '+' ? '-' : '+');
				});

		//Accordion
		$(".accordion .ac-tab").click(
				function() {
					$(this).next("div.toggle-content").slideToggle("slow")
							.siblings("div.toggle-content").slideUp("slow");
					$(this).children('.toggle-indicator').text('-')
					$(this).siblings().children('.toggle-indicator').text('+');
				});

		//Table
		$(".table-info ul li").hoverIntent(
				function() {
					$(this).next("div.table-details").slideDown("slow")
							.siblings("div.table-details").slideUp("slow");
					$(this).children('.toggle-indicator').text('-')
					$(this).siblings().children('.toggle-indicator').text('+');
				}, function() {

				});
		$(".table-info ul").mouseleave(function() {
			$(this).children('div.table-details').slideUp('slow');
			$(this).find('.toggle-indicator').text('+');
		});

		//Lightbox
		$("a.lightbox").click(function() {
			$(this).next(".tile-pre").addClass("tempsrc");
		});
		var lbSRC = "";
		$("a.lightbox").fancybox({
			'margin' : 0,
			'overlayColor' : '#000',
			'transitionIn' : 'elastic',
			'transitionOut' : 'elastic',
			'speedOut' : 100,
			'cyclic' : true,
			//Lightbox iframe fix
			'onComplete' : function() {
				lbSRC = $('#fancybox-content').find('iframe').attr('src');
			},
			'onClosed' : function() {
				$('.tempsrc').find('iframe').attr('src', lbSRC);
				$('.tile-pre').removeClass('tempsrc');
			}
		});

		//Bloglist
		$('.bloglist').hover(function() {
			$(this).css({
				'margin-top' : '-5px'
			});
		}, function() {
			$(this).css({
				'margin-top' : '0'
			});
		});

		//Portfoliolist
		$('ul#port-filter a').click(function() {
			$(this).css('outline', 'none');
			$('ul#port-filter .filter-current').removeClass('filter-current');
			$(this).parent().addClass('filter-current');

			var filterVal = $(this).text().toLowerCase().replace(' ', '-');

			if (filterVal == 'all') {
				$('div.hidden').fadeIn('fast').removeClass('hidden');
			} else {
				$('div#portfolio div.tile').each(function() {
					if (!$(this).hasClass(filterVal)) {
						$(this).fadeOut('fast').addClass('hidden');
					} else {
						$(this).fadeIn('fast').removeClass('hidden');
					}
				});
				$('div.portfoliolist').each(function() {
					if (!$(this).hasClass(filterVal)) {
						$(this).fadeOut('fast').addClass('hidden');
					} else {
						$(this).fadeIn('fast').removeClass('hidden');
					}
				});
			}
			return false;
		});

		//Organic Tabs
		$("#demo-button").organicTabs();
		$("#demo-tab").organicTabs();

		//Check for placeholder
		// Released under MIT license: http://www.opensource.org/licenses/mit-license.php
		$('[placeholder]').focus(function() {
			var input = $(this);
			if (input.val() == input.attr('placeholder')) {
				input.val('');
				input.removeClass('placeholder');
			}
		}).blur(function() {
			var input = $(this);
			if (input.val() == '' || input.val() == input.attr('placeholder')) {
				input.addClass('placeholder');
				input.val(input.attr('placeholder'));
			}
		}).blur().parents('form').submit(function() {
			$(this).find('[placeholder]').each(function() {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
					input.val('');
				}
			})
		});
	}
</script>

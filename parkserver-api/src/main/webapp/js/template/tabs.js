var TabObj = {
	onLoadPage : function() {
		$( "#tabs" ).tabs();
		$( "#dialog" ).dialog({ autoOpen: false });
		$( "#dialog" ).dialog( "option", "buttons", 
				  [
				    {
				      text: "确定",
				      click: function() {
				        $( this ).dialog( "close" );
				      }
				    },
				    {
					      text: "取消",
					      click: function() {
					        $( this ).dialog( "close" );
					      }
					    }
				  ]
				);
		$( "button" ).button();
		$( "#number" )
		  .selectmenu()
		  .selectmenu( "menuWidget" )
		    .addClass( "overflow" );
		$( "#radio" ).buttonset();
		$( "#accordion" ).accordion({
			  heightStyle: "fill"
		});
		$( "#dateOP" ).datepicker();
		
		
		$("#test").click(function() {
			$( "#tabs" ).tabs('option', 'active', 0);
		});
		$("#abc").click(function() {
			$( "#dialog" ).dialog( "open" );
		});
	}
};
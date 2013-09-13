$(function() {
    var icons = {
      header: "ui-icon-circle-arrow-e",
      activeHeader: "ui-icon-circle-arrow-s"
    };
	$( "footer" ).accordion({ collapsible: true, animate: "easeOutQuad", active: false, icons: icons });
	$( "#toggle" ).button().click(function() {
		$( "section" ).accordion( "disable" );
	      if ( $( "#accordion" ).accordion( "option", "icons" ) ) {
	        $( "#accordion" ).accordion( "option", "icons", null );
	      } else {
	        $( "#accordion" ).accordion( "option", "icons", icons );
	      }
	    });
	})
// define(['jquery'], 
var $ = require("jquery");

$(function() {

	$('active').click(function(e){
		  e.stopPropagation();
	});

	var selector = '.navigation li';
	$(selector).on('click', function(event){
		if($(this).has('ul').length !== 0){
			event.preventDefault();
		}
		if($(this).hasClass('active')){
		    $(this).find('ul').toggle();
		} 
		else{
			$('.active').find('ul').hide();
			$(selector).removeClass('active');
	    	$(this).addClass('active');
	    	$(this).find('ul').toggle();
		}
	});
});
// );

// function open {}

// function close {}
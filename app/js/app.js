var $ = require("jquery");

$(function() {

	var selector = '.navigation li';
	$(selector).on('click', function(event){	
	if($(this).has('ul').length !== 0){
		event.preventDefault();
	}

	if($(this).hasClass('active')){
			getElement(this);
		  	$(this).find('ul').slideToggle("fast");
		} 
		else{
			getElement(this);
			$('.active').find('ul').slideUp("fast");
			getElement($('.active'));
			$(selector).removeClass('active');
	    	$(this).addClass('active');
	    	$(this).find('ul').slideToggle("fast");
		}
	});

	function setFunction(element) {
		if($(element).hasClass('fa-caret-up') === true){
			close(element);
		}
		else {
			open(element);
		}
	}

	function getElement(item){
		length = $(item).find('i').length;
		for (var i = 0; i< length ; i++){
			dummy = $(item).find('i')[i];
			if($(dummy).hasClass('arrow') === true){
				setFunction(dummy, item);
			 }
		};
	}

	function open (element) {
		$(element).removeClass('fa-caret-down').addClass('fa-caret-up');

	}

	function close(element) {
		$(element).removeClass('fa-caret-up').addClass('fa-caret-down');
	}


	$(document).mouseup(function (e)
	{
	    var container = $(".navigation");

	    if (!container.is(e.target)
	        && container.has(e.target).length === 0)
	    {
	    	close($('.arrow'));
	        $('.active').find('ul').hide();
	    }
	});

});
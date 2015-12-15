( function() {

	$('#btn-search').on('click', function(e) {

		e.preventDefault();
		$('#search').animate({width: 'toggle'}).focus();

	});

} () );

// JavaScript File
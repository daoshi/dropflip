(function(){

	var layout;
	var outsideLayout;
	var flipper;
	var top;
	var left;

	var cardClasses = [
		'first-level-card',
		'second-level-card',
		'third-level-card',
		'fourth-level-card',
		'fifth-level-card'
	];

	$('.card-front').on('dblclick', function(){

		unflip();

		var cardClass = cardClasses[$(this).parents('.card').length-1];

		layout = $(this).closest('.card-layout');
		flipper = layout.find('.card-flipper');

		outsideLayout = $('<div class="card-layout '+cardClass+'">');
		outsideLayout.append(flipper);

		$('body').append(outsideLayout);

		top = layout.offset().top + 'px';
		left = layout.offset().left + 'px';

		outsideLayout.css({
			position: 'fixed',
			top: top,
			left: left
		});
		outsideLayout.addClass('card-flipped');

		outsideLayout.animate({
			top: 50,
			left: $(window).width() / 2 - 300
		}, 600, function(){});

	});


	$('.unflip-card-button').on('click', unflip);


	function unflip(){

		if(!layout || !outsideLayout || !flipper) return;

		outsideLayout.removeClass('card-flipped');

		outsideLayout.animate({
			top: top,
			left: left
		}, 600, function(){});

		setTimeout(function(){
			layout.append(flipper);
			outsideLayout.remove();

			layout = outsideLayout = flipper = top = left = null;

		}, 600);
	}

})();



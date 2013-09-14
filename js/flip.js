(function(){

	var cardClasses = [
		'first-level-card',
		'second-level-card',
		'third-level-card',
		'fourth-level-card',
		'fifth-level-card'
	];

	function flip(e){

		// prevent event from bubbling to parent cards
		e.stopPropagation();

		var card = $(e.currentTarget);

		// card is already flipped. do not continue
		if(card.hasClass('card-flipped')) return;

		// unflip any already opened cards
		unflip();

		// mark the card as flipped visually in the card wall
		card.addClass('card-flipped');

		// create a container
		var flipContainer = $($('#flipContainerTemplate').html());

		// figure out the level of depth by counting how many
		// parent cards there are
		var cardClass = cardClasses[card.parents('.card').length];
		// add the class corresponding to the appropriate level of depth
		// to match look and feel
		flipContainer.addClass(cardClass);

		// set the card in the flip container
		// to the same dimensions as the card in the cardwall
		flipContainer.find('.card-front').css({
			height: card.height(),
			width: card.width()
		});

		// insert into DOM
		$('body').append(flipContainer);

		flipContainer.css({
			top: card.offset().top - $(window).scrollTop() + 'px',
			left: card.offset().left - $(window).scrollLeft() + 'px'
		});

		// do flip animation
		flipContainer.addClass('flipped').animate({
			top: 50,
			left: $(window).width() / 2 - 300 // center it on the screen
		}, 500);

	}

	function unflip(card){

		// look for an existing container
		var flipContainer = $('.flip-container');
		var flippedCard = $('.card-flipped');

		// none exists. no need to proceed
		if(!flipContainer[0]) return;

		// one exists. remove the flipped class
		flipContainer.removeClass('flipped');

		// animate back to the card's position in the card wall
		flipContainer.animate({
			top: flippedCard.offset().top - $(window).scrollTop() + 'px',
			left: flippedCard.offset().left - $(window).scrollLeft() + 'px'
		}, 500, function(){
			flipContainer.remove();
			flippedCard.removeClass('card-flipped');
		});

	}

	// setup events
	$('.card-wall').on('dblclick', '.card', flip);
	$('body').on('click', '.unflip-button', unflip);

})();



(function(){

	var cardClasses = [
		'first-level-card',
		'second-level-card',
		'third-level-card',
		'fourth-level-card',
		'fifth-level-card'
	];

	function flip(e){

		e.stopPropagation();

		var card = $(e.currentTarget);

		// card is already flipped. do not continue
		if(card.hasClass('card-flipped')) return;

		// unflip any already opened cards
		unflip();

		card.addClass('card-flipped');

		// create a container
		var flipContainer = $($('#flipContainerTemplate').html());

		// figure out the level of depth by counting how many
		// parent cards there are
		var cardClass = cardClasses[card.parents('.card').length];
		// add the class corresponding to the appropriate level of depth
		// to match look and feel
		flipContainer.addClass(cardClass);

		// insert into DOM
		$('body').append(flipContainer);

		// get the position of the card in the card wall
		var position = {
			top: card.offset().top + 'px',
			left: card.offset().left + 'px'
		};
		// store it in the container for later retreval
		flipContainer.data(position);
		// set the position the container to that of the card
		flipContainer.css(position);

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
			top: flipContainer.data('top'),
			left: flipContainer.data('left')
		}, 500, function(){
			flipContainer.remove();
			flippedCard.removeClass('card-flipped');
		});

	}

	// setup events
	$('.card-wall').on('dblclick', '.card', flip);
	$('body').on('click', '.unflip-button', unflip);

})();



(function(){

	var flippedCard;
	var oldFlippedCard;

	var cardClasses = [
		'first-level-card',
		'second-level-card',
		'third-level-card',
		'fourth-level-card',
		'fifth-level-card'
	];

	function flip(e){

		e.stopPropagation();

		// card is already flipped. do not continue
		if(flippedCard && flippedCard[0] === e.currentTarget) return;

		if(flippedCard) oldFlippedCard = flippedCard;

		// save the card that was double clicked
		flippedCard = $(e.currentTarget);
		flippedCard.addClass('flipped');

		// unflip any already opened cards
		unflip();

		// create a container
		var flipContainer = $($('#flipContainerTemplate').html());

		// figure out the level of depth by counting how many
		// parent cards there are
		var cardClass = cardClasses[flippedCard.parents('.card').length];
		// add the class corresponding to the appropriate level of depth
		// to match look and feel
		flipContainer.addClass(cardClass);

		// insert into DOM
		$('body').append(flipContainer);

		// get the position of the card in the card wall
		var position = {
			top: flippedCard.offset().top + 'px',
			left: flippedCard.offset().left + 'px'
		};
		// store it in the container for later retreval
		flipContainer.data(position);
		// set the position the container to that of the card
		flipContainer.css(position);

		// do flip animation
		flipContainer.addClass('flipped').animate({
			top: 50,
			left: $(window).width() / 2 - 300 // center it on the screen
		}, 600);

	}

	function unflip(){

		// look for an existing container
		var flipContainer = $('.flip-container');

		// none exists. no need to proceed
		if(!flipContainer[0]) return;

		// one exists. remove the flipped class
		flipContainer.removeClass('flipped');

		// animate back to the card's position in the card wall
		flipContainer.animate({
			top: flipContainer.data('top'),
			left: flipContainer.data('left')
		}, 600, function(){
			flipContainer.remove(); // remove it from the DOM
			oldFlippedCard.removeClass('flipped');
		});

	}

	// setup events
	$('.card-wall .card').on('dblclick', flip);
	$('.unflip-button').on('click', unflip);

})();



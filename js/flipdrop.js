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

	$('.card-group').sortable({
		connectWith: [ // limit nesting to 5 levels deep
			'.card-wall > .card-group',
			'.card-wall > .card-group > .card > .card-group',
			'.card-wall > .card-group > .card > .card-group > .card > .card-group',
			'.card-wall > .card-group > .card > .card-group > .card > .card-group > .card > .card-group',
			'.card-wall > .card-group > .card > .card-group > .card > .card-group > .card > .card-group > .card > .card-group'
		].join(', '),
		over: over,
		stop: stop
	}).disableSelection();

	function getDepth(card){
		// calculate how many cards are nested within a card
		if(card.find('.card .card .card .card .card')[0]) return 6;
		if(card.find('.card .card .card .card')[0]) return 5;
		if(card.find('.card .card .card')[0]) return 4;
		if(card.find('.card .card')[0]) return 3;
		if(card.find('.card')[0]) return 2;
		return 1;
	}

	function over(e, ui){
		// level of card depth for drop target area
		var targetDepth = ui.placeholder.parents('.card').length;

		// levels of nested cards for item to be dropped
		var originDepth = getDepth(ui.item);

		// if adding one card to the other would create a card depth
		// of more than 5 levels...
		if(targetDepth + originDepth > 5){
			//then show add a warning class
			ui.item.addClass('card-cant-drop');
		}else{
			// otherwise remove it
			ui.item.removeClass('card-cant-drop');
		}
	}

	function isOkToDrop(card){
		// check to see if there is a card nested more than 5 levels deep.
		return !card.find('.card .card .card .card .card')[0];
	}

	function stop(e, ui){

		// remove warning class just in case it has been applied
		ui.item.removeClass('card-cant-drop');

		// get the parent of the dropped card
		var parentCard = ui.item.parents('.card');

		// if it's ok to drop, return true
		// returning false will cancel the jqueryui sortable
		return isOkToDrop(parentCard);

	}

})();



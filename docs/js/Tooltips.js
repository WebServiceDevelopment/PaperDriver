"use strict";

(function() {

	const elements = [];

	// Select circle kome

	let kome = document.querySelectorAll('.circle.kome');
	kome.forEach(e => elements.push(e));

	let maru = document.querySelectorAll('.circle.maru');
	maru.forEach(e => elements.push(e));

	let mame = document.querySelectorAll('.circle.mame');
	mame.forEach(e => elements.push(e));


	// Add listener

	elements.forEach(e => {
		e.addEventListener('click', handleClick);
	});

	// Create Function

	function handleClick(evt) {
		let elem = evt.target;

		elements.forEach(e => {
			if(e === elem) {
				return;
			}
			e.classList.remove('open');
			clearTimeout(e.userData);
		});

		elem.classList.toggle('open');
		
		if(elem.classList.contains('open')) {
			clearTimeout(elem.userData);
			elem.userData = setTimeout( () => {
				elem.classList.remove('open');
			}, 4200);
		}
	}

})();

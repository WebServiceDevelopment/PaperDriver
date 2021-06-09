"use strict";

(function() {

	const aaa = [];
	const bbb = [];


	let list_a = document.getElementsByClassName('aaa');
	let list_b = document.getElementsByClassName('bbb');

	for(let i = 0; i < list_a.length; i++) {
		aaa.push(list_a[i]);
		list_a[i].addEventListener('click', a_click);
	}

	for(let i = 0; i < list_b.length; i++) {
		bbb.push(list_b[i]);
		list_b[i].addEventListener('click', b_click);
	}

	function a_click(evt) {

		console.log("a click");

		let elem = evt.target;
		let index = aaa.indexOf(elem);

		aaa[index].classList.add('selected');
		bbb[index].classList.remove('selected');

	}

	function b_click(evt) {

		console.log("b click");

		let elem = evt.target;
		let index = bbb.indexOf(elem);

		aaa[index].classList.remove('selected');
		bbb[index].classList.add('selected');

	}

})();

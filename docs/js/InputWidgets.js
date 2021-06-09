"use strict";

const InputWidgets = (function() {

	this.MEM = {}

	this.DOM = {
		a : {
			num : document.getElementById('InputWidgets.a.num'),
			text : document.getElementById('InputWidgets.a.text')
		},
		b : {
			num : document.getElementById('InputWidgets.b.num'),
			text : document.getElementById('InputWidgets.b.text')
		},
		c : {
			text : document.getElementById('InputWidgets.c.text')
		}
	}

	this.EVT = {
		handleNumberFocus : evt_handleNumberFocus.bind(this),
		handleNumberBlur : evt_handleNumberBlur.bind(this)
	}

	this.API = {}

	init.apply(this);
	return this;

	function init() {

		this.DOM.a.num.addEventListener('focus', this.EVT.handleNumberFocus);
		this.DOM.a.num.addEventListener('blur', this.EVT.handleNumberBlur);

		this.DOM.b.num.addEventListener('focus', this.EVT.handleNumberFocus);
		this.DOM.b.num.addEventListener('blur', this.EVT.handleNumberBlur);

	}

	function evt_handleNumberFocus(evt) {

		let elem = evt.target;
		elem.classList.remove('hide');

	}

	function evt_handleNumberBlur(evt) {

		let elem = evt.target;
		elem.classList.add('hide');

		// Update Local Text

		let val = elem.value;
		let id = elem.getAttribute('id');
		let parts = id.split('.');
		parts.pop();
		let index = parts.pop();
		
		let text = this.DOM[index].text;
		text.value = val.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

		// Update Calc

		let a = parseInt(this.DOM.a.num.value);
		let b = parseInt(this.DOM.b.num.value);

		let diff = (b - a).toString();
		console.log(diff);
		console.log(this.DOM.c.text);
		this.DOM.c.text.textContent = diff.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "km";

	}

}).apply({});

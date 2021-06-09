"use strict";

const Direction = (function() {

	this.MEM = {}

	this.DOM = {
		toggle : {
			a : document.getElementById('Direction.toggle.a'),
			b : document.getElementById('Direction.toggle.b'),
			highlight : document.getElementById('Direction.toggle.highlight')
		},
		table : {
			time : document.getElementById('Direction.table.time'),
			a : document.getElementById('Direction.table.a'),
			b : document.getElementById('Direction.table.b')
		}

	}

	this.EVT = {
		handleAClick : evt_handleAClick.bind(this),
		handleBClick : evt_handleBClick.bind(this)
	}

	this.API = {}

	init.apply(this);
	return this;

	function init() {

		this.DOM.toggle.a.addEventListener('click', this.EVT.handleAClick);
		this.DOM.toggle.b.addEventListener('click', this.EVT.handleBClick);

	}

	function evt_handleAClick() {

		console.log("a click!!!");
		
		this.DOM.toggle.highlight.setAttribute('class', 'highlight a');

		this.DOM.table.a.classList.remove('hide');
		this.DOM.table.b.classList.add('hide');

		// this.DOM.table.time.textContent = '7:30';

	}

	function evt_handleBClick() {

		console.log("b click!!");

		this.DOM.toggle.highlight.setAttribute('class', 'highlight b');

		this.DOM.table.a.classList.add('hide');
		this.DOM.table.b.classList.remove('hide');
		
		// this.DOM.table.time.textContent = '8:30';

	}

}).apply({});

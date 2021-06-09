"use strict";

const DailyReport = (function() {

	this.MEM = {}

	this.DOM = {
		toggle : {
			a : document.getElementById('DailyReport.toggle.a'),
			b : document.getElementById('DailyReport.toggle.b'),
			highlight : document.getElementById('DailyReport.toggle.highlight')
		},
		table : {
			a : document.getElementById('DailyReport.table.a'),
			b : document.getElementById('DailyReport.table.b')
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
		
		this.DOM.toggle.highlight.setAttribute('class', 'highlight c');

		this.DOM.table.a.classList.remove('hide');
		this.DOM.table.b.classList.add('hide');

	}

	function evt_handleBClick() {

		console.log("b click!!");

		this.DOM.toggle.highlight.setAttribute('class', 'highlight d');

		this.DOM.table.a.classList.add('hide');
		this.DOM.table.b.classList.remove('hide');
		
	}

}).apply({});

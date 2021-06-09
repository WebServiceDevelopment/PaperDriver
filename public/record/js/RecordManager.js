"use strict";

const RecordManager = (function() {

	this.MEM = {}

	this.DOM = {
		iframe : document.getElementById('RecordManager.iframe'),
		docs : {
			pdf_01 : document.getElementById('RecordManager.docs.pdf_01'),
			pdf_02 : document.getElementById('RecordManager.docs.pdf_02'),
			pdf_02a : document.getElementById('RecordManager.docs.pdf_02a'),
			pdf_02b : document.getElementById('RecordManager.docs.pdf_02b'),
			pdf_02c : document.getElementById('RecordManager.docs.pdf_02c'),
			pdf_03 : document.getElementById('RecordManager.docs.pdf_03'),
			pdf_04 : document.getElementById('RecordManager.docs.pdf_04'),
			pdf_05 : document.getElementById('RecordManager.docs.pdf_05'),
			pdf_05a : document.getElementById('RecordManager.docs.pdf_05a'),
			pdf_05b : document.getElementById('RecordManager.docs.pdf_05b')
		}
	}

	this.EVT = {
		handlePdf01Click : evt_handlePdf01Click.bind(this),
		handlePdf02Click : evt_handlePdf02Click.bind(this),
		handlePdf02aClick : evt_handlePdf02aClick.bind(this),
		handlePdf02bClick : evt_handlePdf02bClick.bind(this),
		handlePdf02cClick : evt_handlePdf02cClick.bind(this),
		handlePdf03Click : evt_handlePdf03Click.bind(this),
		handlePdf04Click : evt_handlePdf04Click.bind(this),
		handlePdf05Click : evt_handlePdf05Click.bind(this),
		handlePdf05aClick : evt_handlePdf05aClick.bind(this),
		handlePdf05bClick : evt_handlePdf05bClick.bind(this)
	}

	this.API = {
		setActive : api_setActive.bind(this)
	}

	init.apply(this);
	return this;

	function init() {

		this.DOM.docs.pdf_01.addEventListener('click', this.EVT.handlePdf01Click);
		this.DOM.docs.pdf_02.addEventListener('click', this.EVT.handlePdf02Click);
		this.DOM.docs.pdf_02a.addEventListener('click', this.EVT.handlePdf02aClick);
		this.DOM.docs.pdf_02b.addEventListener('click', this.EVT.handlePdf02bClick);
		this.DOM.docs.pdf_02c.addEventListener('click', this.EVT.handlePdf02cClick);
		this.DOM.docs.pdf_03.addEventListener('click', this.EVT.handlePdf03Click);
		this.DOM.docs.pdf_04.addEventListener('click', this.EVT.handlePdf04Click);
		this.DOM.docs.pdf_05.addEventListener('click', this.EVT.handlePdf05Click);
		this.DOM.docs.pdf_05a.addEventListener('click', this.EVT.handlePdf05aClick);
		this.DOM.docs.pdf_05b.addEventListener('click', this.EVT.handlePdf05bClick);

	}

	function api_setActive(elem) {

		for(let key in this.DOM.docs) {
			this.DOM.docs[key].classList.remove('active');
		}

		elem.classList.add('active');

	}

	function evt_handlePdf01Click() {

		console.log("01");
		this.API.setActive(this.DOM.docs.pdf_01);

	}

	function evt_handlePdf02Click() {

		console.log("02");
		this.API.setActive(this.DOM.docs.pdf_02);

	}

	function evt_handlePdf02aClick() {

		console.log("02a");
		this.API.setActive(this.DOM.docs.pdf_02a);

	}

	function evt_handlePdf02bClick() {

		console.log("02b");
		this.API.setActive(this.DOM.docs.pdf_02b);

	}

	function evt_handlePdf02cClick() {

		console.log("02c");
		this.API.setActive(this.DOM.docs.pdf_02c);

	}

	function evt_handlePdf03Click() {

		console.log("03");
		this.API.setActive(this.DOM.docs.pdf_03);
	
	}

	function evt_handlePdf04Click() {

		console.log("04");
		this.API.setActive(this.DOM.docs.pdf_04);

	}

	function evt_handlePdf05Click() {

		console.log("05");
		this.API.setActive(this.DOM.docs.pdf_05);

	}

	function evt_handlePdf05aClick() {

		console.log("05a");
		this.API.setActive(this.DOM.docs.pdf_05a);

	}

	function evt_handlePdf05bClick() {

		console.log("05b");
		this.API.setActive(this.DOM.docs.pdf_05b);

	}


}).apply({});

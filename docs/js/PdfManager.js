"use strict";

console.log("here!!");

const PdfManager = (function() {

	this.MEM = {}

	this.DOM = {
		iframe : document.getElementById('PdfManager.iframe'),
		toggle : document.getElementById('PdfManager.toggle'),
		display : document.getElementById('PdfManager.display')
	}

	this.EVT = {
		handleToggleClick : evt_handleToggleClick.bind(this)
	}

	this.API = {
		fetchPdf : api_fetchPdf.bind(this),
		displayPdf : api_displayPdf.bind(this),
		getIsOpen : api_getIsOpen.bind(this)
	}

	init.apply(this);
	return this;

	async function init() {
		
		console.log("do it!!");

		this.DOM.toggle.addEventListener('click', this.EVT.handleToggleClick);
		this.MEM.db = localforage;
		
		let src = 'docs/unten_kiroku.pdf';
		
		console.log("aaa");
		
		let doc;
		try {
			doc = await this.MEM.db.getItem(src);
		} catch(err) {
			console.log("err");
			throw err;
		}
		
		console.log("bbb");

		console.log("waht!!?");
		this.API.fetchPdf(src);
		
		/*
		if(doc) {
			this.API.displayPdf(src);
		} else {
			this.API.fetchPdf(src);
		}
		*/

	}

	function api_getIsOpen() {

		return this.MEM.isOpen || false;

	}

	function evt_handleToggleClick() {

		CalendarWidget.API.close();
		this.DOM.display.classList.toggle('open');
		this.DOM.toggle.classList.toggle('active');

		this.MEM.isOpen = this.DOM.display.classList.contains('open');
		SlideWidget.API.setHide(this.MEM.isOpen);

	}

	async function api_fetchPdf(src) {
		
		console.log("fetch");
		let res = await fetch(src);
		let blob = await res.blob();
		console.log("got it!!");

		await this.MEM.db.setItem(src, blob);
		this.API.displayPdf(src);
	
	}

	function api_displayPdf(src) {
		localStorage.setItem('doc_01', src);
		this.DOM.iframe.contentWindow.location.reload();
	}

}).apply({});

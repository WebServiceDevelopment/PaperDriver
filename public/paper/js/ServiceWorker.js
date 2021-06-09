"use strict";

const ServiceWorker = (function() {

	this.MEM = {}

	this.DOM = {
		version : {
			modal : document.getElementById('ServiceWorker.version.modal'),
			toggle : document.getElementById('ServiceWorker.version.toggle'),
			top : document.getElementById('ServiceWorker.version.top'),
			pdf : document.getElementById('ServiceWorker.version.pdf'),
			tacho : document.getElementById('ServiceWorker.version.tacho')
		}
	}

	this.EVT = {
		handleToggleClick : evt_handleToggleClick.bind(this)
	}

	this.API = {
		registerWorker : api_registerWorker.bind(this),
		detectVersions : api_detectVersions.bind(this)
	}

	init.apply(this);

	function init() {

		this.API.registerWorker();
		this.API.detectVersions();

		this.DOM.version.toggle.addEventListener('click', this.EVT.handleToggleClick);

	}

	function evt_handleToggleClick() {
		
		this.DOM.version.modal.classList.toggle('open');

	}

	function api_detectVersions() {

		if(window.location.href.indexOf('/table') === -1) {
			return;
		}
			
		// Grab the top version

		let url = window.location.href;
		let parts = url.split('/');
		parts.pop();
		let top = parts.pop();
		this.DOM.version.top.textContent = top;

		let iframes = document.getElementsByTagName('iframe');
		for(let i = 0; i < iframes.length; i++) {
			let f = iframes[i];

			switch(f.getAttribute('data-version')) {
			case 'tacho':
					
				url = f.getAttribute('src');
				parts = url.split('/');
				parts.pop();
				top = parts.pop();
				this.DOM.version.tacho.textContent = top;
				break;
			case 'pdf':
					
				url = f.getAttribute('src');
				parts = url.split('/');
				parts.pop();
				top = parts.pop();
				this.DOM.version.pdf.textContent = top;

				break;
			}
		}


	}

	function api_registerWorker() {

		console.log("register the worker!!!");

		if (! ('serviceWorker' in navigator)) {
			return console.error("We are screwed");
		}

		navigator.serviceWorker.register('sw.js', { scope : '/' }).then(function(registration) {

			console.log('Service worker registration succeeded:', registration);

			let reg = registration;

			if(reg.installing) {
				console.log('Service worker installing');
			} else if(reg.waiting) {
				console.log('Service worker installed');
			} else if(reg.active) {
				console.log('Service worker active');
			}

		}, function(error) {

			console.log('Service worker registration failed:', error);

		});

	}

}).apply({});

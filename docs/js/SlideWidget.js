"use strict";

const SlideWidget = (function() {

	this.MEM = {}

	this.DOM = {
		controls : {
			ul : document.getElementById('SlideWidget.controls.ul'),
			arrow_up : document.getElementById('SlideWidget.controls.arrow_up'),
			slide_a : document.getElementById('SlideWidget.controls.slide_a'), 
			slide_b : document.getElementById('SlideWidget.controls.slide_b'),
			slide_c : document.getElementById('SlideWidget.controls.slide_c'),
			slide_d : document.getElementById('SlideWidget.controls.slide_d'),
			slide_e : document.getElementById('SlideWidget.controls.slide_e'),
			arrow_down : document.getElementById('SlideWidget.controls.arrow_down')
		},
		slides : {
			slide_a : document.getElementById('SlideWidget.slides.slide_a'),
			slide_b : document.getElementById('SlideWidget.slides.slide_b'),
			slide_c : document.getElementById('SlideWidget.slides.slide_c'),
			slide_d : document.getElementById('SlideWidget.slides.slide_d'),
			slide_e : document.getElementById('SlideWidget.slides.slide_e')
		}
	}

	this.EVT = {
		handleSlideDown : evt_handleSlideDown.bind(this)
	}

	this.API = {
		openSlide : api_openSlide.bind(this),
		setHide : api_setHide.bind(this) 
	}

	init.apply(this);
	return this;

	function init() {

		this.DOM.controls.slide_a.addEventListener('mousedown', this.EVT.handleSlideDown);
		this.DOM.controls.slide_b.addEventListener('mousedown', this.EVT.handleSlideDown);
		this.DOM.controls.slide_c.addEventListener('mousedown', this.EVT.handleSlideDown);
		this.DOM.controls.slide_d.addEventListener('mousedown', this.EVT.handleSlideDown);
		this.DOM.controls.slide_e.addEventListener('mousedown', this.EVT.handleSlideDown);

		this.DOM.controls.slide_a.addEventListener('touchstart', this.EVT.handleSlideDown);
		this.DOM.controls.slide_b.addEventListener('touchstart', this.EVT.handleSlideDown);
		this.DOM.controls.slide_c.addEventListener('touchstart', this.EVT.handleSlideDown);
		this.DOM.controls.slide_d.addEventListener('touchstart', this.EVT.handleSlideDown);
		this.DOM.controls.slide_e.addEventListener('touchstart', this.EVT.handleSlideDown);

		this.MEM.activeSlide = this.DOM.slides.slide_a;
		this.MEM.activeArrow = this.DOM.controls.slide_a;
	
		// this.API.openSlide('e');

	}

	function api_setHide(bool) {

		if(bool) {
			this.DOM.controls.ul.classList.add('hide');
		} else {
			this.DOM.controls.ul.classList.remove('hide');
		}

	}

	function evt_handleSlideDown(evt) {


		let elem = evt.target;

		switch(elem) {
		case this.DOM.controls.slide_a:
			this.API.openSlide('a');
			break;
		case this.DOM.controls.slide_b:
			this.API.openSlide('b');
			break;
		case this.DOM.controls.slide_c:
			this.API.openSlide('c');
			break;
		case this.DOM.controls.slide_d:
			this.API.openSlide('d');
			break;
		case this.DOM.controls.slide_e:
			this.API.openSlide('e');
			break;
		/*
		case this.DOM.controls.arrow_up:

			if(this.MEM.activeSlide === this.DOM.slides.slide_b) {
				this.API.openSlide('a');
			} else if(this.MEM.activeSlide === this.DOM.slides.slide_c) {
				this.API.openSlide('b');
			}
			break;
		case this.DOM.controls.arrow_down:
			if(this.MEM.activeSlide === this.DOM.slides.slide_a) {
				this.API.openSlide('b');
			} else if(this.MEM.activeSlide === this.DOM.slides.slide_b) {
				this.API.openSlide('c');
			}
			break;
		*/
		}

	}

	function api_openSlide( leaf ) {

		switch(leaf) {
		case 'a':

			// Articles

			this.DOM.slides.slide_a.setAttribute('class', 'slide');
			this.DOM.slides.slide_b.setAttribute('class', 'slide down');
			this.DOM.slides.slide_c.setAttribute('class', 'slide down');
			this.DOM.slides.slide_d.setAttribute('class', 'slide down');
			this.DOM.slides.slide_e.setAttribute('class', 'slide down');

			// Button

			this.DOM.controls.slide_a.setAttribute('class', 'active');
			this.DOM.controls.slide_b.setAttribute('class', '');
			this.DOM.controls.slide_c.setAttribute('class', '');
			this.DOM.controls.slide_d.setAttribute('class', '');
			this.DOM.controls.slide_e.setAttribute('class', '');

			// Set Active Slide + Button

			this.MEM.activeSlide = this.DOM.slides.slide_a;
			this.MEM.activeArrow = this.DOM.controls.slide_a;

			break;
		case 'b':

			// Articles

			this.DOM.slides.slide_a.setAttribute('class', 'slide up');
			this.DOM.slides.slide_b.setAttribute('class', 'slide');
			this.DOM.slides.slide_c.setAttribute('class', 'slide down');
			this.DOM.slides.slide_d.setAttribute('class', 'slide down');
			this.DOM.slides.slide_e.setAttribute('class', 'slide down');

			// Button

			this.DOM.controls.slide_a.setAttribute('class', '');
			this.DOM.controls.slide_b.setAttribute('class', 'active');
			this.DOM.controls.slide_c.setAttribute('class', '');
			this.DOM.controls.slide_d.setAttribute('class', '');
			this.DOM.controls.slide_e.setAttribute('class', '');

			// Set Active Slide + Button

			this.MEM.activeSlide = this.DOM.slides.slide_b;
			this.MEM.activeArrow = this.DOM.controls.slide_b;

			break;
		case 'c':

			// Articles

			this.DOM.slides.slide_a.setAttribute('class', 'slide up');
			this.DOM.slides.slide_b.setAttribute('class', 'slide up');
			this.DOM.slides.slide_c.setAttribute('class', 'slide');
			this.DOM.slides.slide_d.setAttribute('class', 'slide down');
			this.DOM.slides.slide_e.setAttribute('class', 'slide down');

			// Button

			this.DOM.controls.slide_a.setAttribute('class', '');
			this.DOM.controls.slide_b.setAttribute('class', '');
			this.DOM.controls.slide_c.setAttribute('class', 'active');
			this.DOM.controls.slide_d.setAttribute('class', '');
			this.DOM.controls.slide_e.setAttribute('class', '');

			// Set Active Slide + Button
			
			this.MEM.activeSlide = this.DOM.slides.slide_c;
			this.MEM.activeArrow = this.DOM.controls.slide_c;

			break;
		case 'd':

			// Articles

			this.DOM.slides.slide_a.setAttribute('class', 'slide up');
			this.DOM.slides.slide_b.setAttribute('class', 'slide up');
			this.DOM.slides.slide_c.setAttribute('class', 'slide up');
			this.DOM.slides.slide_d.setAttribute('class', 'slide');
			this.DOM.slides.slide_e.setAttribute('class', 'slide down');

			// Button

			this.DOM.controls.slide_a.setAttribute('class', '');
			this.DOM.controls.slide_b.setAttribute('class', '');
			this.DOM.controls.slide_c.setAttribute('class', '');
			this.DOM.controls.slide_d.setAttribute('class', 'active');
			this.DOM.controls.slide_e.setAttribute('class', '');

			// Set Active Slide + Button

			this.MEM.activeSlide = this.DOM.slides.slide_d;
			this.MEM.activeArrow = this.DOM.controls.slide_d;

			break;
		case 'e':

			// Articles

			this.DOM.slides.slide_a.setAttribute('class', 'slide up');
			this.DOM.slides.slide_b.setAttribute('class', 'slide up');
			this.DOM.slides.slide_c.setAttribute('class', 'slide up');
			this.DOM.slides.slide_d.setAttribute('class', 'slide up');
			this.DOM.slides.slide_e.setAttribute('class', 'slide');

			// Button

			this.DOM.controls.slide_a.setAttribute('class', '');
			this.DOM.controls.slide_b.setAttribute('class', '');
			this.DOM.controls.slide_c.setAttribute('class', '');
			this.DOM.controls.slide_d.setAttribute('class', '');
			this.DOM.controls.slide_e.setAttribute('class', 'active');

			// Set Active Slide + Button

			this.MEM.activeSlide = this.DOM.slides.slide_e;
			this.MEM.activeArrow = this.DOM.controls.slide_e;

			break;
		}

	}

}).apply({});

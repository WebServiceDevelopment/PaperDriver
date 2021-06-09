"use strict";

const ArticleWidget = (function() {

	this.MEM = {}

	this.DOM = {
		underline : document.getElementById('ArticleWidget.underline'),
		tabs : {
			a : document.getElementById('ArticleWidget.tabs.a'),
			b : document.getElementById('ArticleWidget.tabs.b'),
			c : document.getElementById('ArticleWidget.tabs.c'),
			d : document.getElementById('ArticleWidget.tabs.d')
		},
		article : {
			a : document.getElementById('ArticleWidget.article.a'),
			b : document.getElementById('ArticleWidget.article.b'),
			c : document.getElementById('ArticleWidget.article.c'),
			d : document.getElementById('ArticleWidget.article.d')
		}
	}

	this.EVT = {
		handleTabClick : evt_handleTabClick.bind(this)
	}

	this.API = {
		openTab : api_openTab.bind(this)
	}

	init.apply(this);
	return this;

	function init() {

		for(let key in this.DOM.tabs) {
			this.DOM.tabs[key].addEventListener('mousedown', this.EVT.handleTabClick);
			this.DOM.tabs[key].addEventListener('touchstart', this.EVT.handleTabClick);
		}

		this.API.openTab('b');

	}

	function evt_handleTabClick(evt) {
		
		console.log("click!!!");

		let elem = evt.target;
		for(let key in this.DOM.tabs) {
			if(this.DOM.tabs[key] !== elem) {
				continue;
			}
			this.API.openTab(key);
			break;
		}

		/*
		let id = elem.getAttribute('id');
		let leaf = id.split('.').pop();
		this.API.openTab(leaf);
		*/

	}

	function api_openTab(leaf) {
		
		/*
		for(let key in this.DOM.article) {
			this.DOM.article[key].classList.remove('open');
		}
		this.DOM.article[leaf].classList.add('open');
		*/

		console.log(leaf);

		switch(leaf) {
		case 'a':

			this.DOM.article.a.setAttribute('class', '');
			this.DOM.article.b.setAttribute('class', 'right');
			this.DOM.article.c.setAttribute('class', 'right');
			this.DOM.article.d.setAttribute('class', 'right');

			this.DOM.underline.style.transform = `translateX(5px)`;

			break;
		case 'b':

			this.DOM.article.a.setAttribute('class', 'left');
			this.DOM.article.b.setAttribute('class', '');
			this.DOM.article.c.setAttribute('class', 'right');
			this.DOM.article.d.setAttribute('class', 'right');

			this.DOM.underline.style.transform = `translateX(157px)`;

			break;
		case 'c':

			this.DOM.article.a.setAttribute('class', 'left');
			this.DOM.article.b.setAttribute('class', 'left');
			this.DOM.article.c.setAttribute('class', '');
			this.DOM.article.d.setAttribute('class', 'right');

			this.DOM.underline.style.transform = `translateX(308px)`;

			break;
		case 'd':

			this.DOM.article.a.setAttribute('class', 'left');
			this.DOM.article.b.setAttribute('class', 'left');
			this.DOM.article.c.setAttribute('class', 'left');
			this.DOM.article.d.setAttribute('class', '');

			this.DOM.underline.style.transform = `translateX(460px)`;

			break;
		}
		

	}

}).apply({});

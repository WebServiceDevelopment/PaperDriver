"use strict";

const CalendarWidget = (function() {

	this.MEM = {}

	this.DOM = {
		toggle : {
			button : document.getElementById('CalendarWidget.toggle.button'),
			widget : document.getElementById('CalendarWidget.toggle.widget')
		},
		arrow : {
			label : document.getElementById('CalendarWidget.arrow.label'),
			display : document.getElementById('CalendarWidget.arrow.display'),
			next : document.getElementById('CalendarWidget.arrow.next'),
			prev : document.getElementById('CalendarWidget.arrow.prev')
		}
	}

	this.EVT = {
		handleButtonClick : evt_handleButtonClick.bind(this),
		handleNextClick : evt_handleNextClick.bind(this),
		handlePrevClick : evt_handlePrevClick.bind(this)
	}

	this.API = {
		close : api_close.bind(this),
		renderMonth : api_renderMonth.bind(this)
	}

	init.apply(this);
	return this;

	function init() {
		
		this.DOM.toggle.button.addEventListener('click', this.EVT.handleButtonClick);

		this.DOM.arrow.next.addEventListener('click', this.EVT.handleNextClick);
		this.DOM.arrow.prev.addEventListener('click', this.EVT.handlePrevClick);
		
		let m = moment();
		this.API.renderMonth(m.year(), m.month());

	}

	function evt_handleNextClick(evt) {

		evt.preventDefault();
		let elem = evt.target;
		let userData = elem.userData;

		if(!userData) {
			return;
		}

		let m = userData;
		this.API.renderMonth(m.year(), m.month(), 'next');

	}

	function evt_handlePrevClick(evt) {

		evt.preventDefault();
		let elem = evt.target;
		let userData = elem.userData;

		if(!userData) {
			return;
		}

		let m = userData;
		this.API.renderMonth(m.year(), m.month(), 'prev');

	}

	function evt_handleButtonClick() {
		
		this.DOM.toggle.widget.classList.toggle('open');
		this.DOM.toggle.button.classList.toggle('active');

	}

	function api_close() {

		this.DOM.toggle.widget.classList.remove('open');
		this.DOM.toggle.button.classList.remove('active');

	}

	function api_renderMonth(year, month, whence) {

		const t = moment();
		const n = t.clone().add(1, 'month');

		const m = moment({
			year : year,
			month : month,
			day : 1,
			hour : 0,
			minute : 0,
			seconds : 0,
			milliseconds : 0
		});
	
		// Figure out next and last months
		
		this.DOM.arrow.next.userData = m.clone().add(1, 'month');
		this.DOM.arrow.prev.userData = m.clone().subtract(1, 'month');

		// Check for next month
		
		if(m.format('YYYY-MM') === n.format('YYYY-MM')) {
			this.DOM.arrow.next.classList.add('hide');
		} else {
			this.DOM.arrow.next.classList.remove('hide');
		}

		let dayOfWeek = m.weekday();
		let daysInMonth = m.daysInMonth();
		
		if(dayOfWeek > 3) {
			
			// Start from this week
			m.subtract(dayOfWeek, 'days');

		} else {

			// Start from last week
			m.subtract(dayOfWeek, 'days');
			m.subtract(7, 'days');

		}

		// Create Outline Div

		const div = document.createElement('div');

		if(!whence) {
			div.setAttribute('class', 'month');
		} else {
			div.setAttribute('class', `month ${whence}`);
		}

		// Create Table

		const table = document.createElement('table');
		const thead = document.createElement('thead');
		const tbody = document.createElement('tbody');

		// Create Thead

		const trow = thead.insertRow();
		for(let i = 0; i < 7; i++) {
			const th = document.createElement('th');
			const span = document.createElement('span');

			switch(i) {
			case 0:
				span.textContent = '日';
				span.setAttribute('class', 'sun');
				break;
			case 1:
				span.textContent = '月';
				break;
			case 2:
				span.textContent = '火';
				break;
			case 3:
				span.textContent = '水';
				break;
			case 4:
				span.textContent = '木';
				break;
			case 5:
				span.textContent = '金';
				break;
			case 6:
				span.textContent = '土';
				span.setAttribute('class', 'sat');
				break;
			}

			th.appendChild(span);
			trow.appendChild(th);
		}

		// Create Tbody

		for(let i = 0; i < 6; i++) {

			// Create 6 Weeks

			const row = tbody.insertRow();
			
			for(let k = 0; k < 7; k++) {

				const cell = row.insertCell();
				const a = document.createElement('a');

				a.textContent = m.date();

				if(m.month() !== month) {
					cell.setAttribute('class', 'disabled');
				}

				cell.appendChild(a);
				if(m.format('YYYY-MM-DD') === t.format('YYYY-MM-DD')) {
					cell.classList.add('active');
				}

				m.add(1, 'days');


			}

		}

		// Append Elements

		table.appendChild(thead);
		table.appendChild(tbody);
		div.appendChild(table);
		
		// Create Label
		
		const lbl = document.createElement('a');
		let mm = (month + 1).toString();
		if(mm.length < 2) {
			mm = '0' + mm;
		}
		lbl.textContent = `${year}年${mm}月`

		if(whence) {
			lbl.setAttribute('class', whence);
		}
		
		this.DOM.arrow.display.appendChild(div);
		this.DOM.arrow.label.appendChild(lbl);

		if(!whence) {
			
			this.MEM.month = div;
			this.MEM.label = lbl;

		} else {
			
			console.log("slide in!!!");

			setTimeout( () => {
				div.classList.remove(whence);
				lbl.classList.remove(whence);

				if(whence === 'next') {
					this.MEM.month.classList.add('prev');
					this.MEM.label.classList.add('prev');
				} else {
					this.MEM.month.classList.add('next');
					this.MEM.label.classList.add('next');
				}

			}, 50);

			setTimeout( () => {
				
				this.MEM.month.parentNode.removeChild(this.MEM.month);
				this.MEM.label.parentNode.removeChild(this.MEM.label);

				this.MEM.month = div;
				this.MEM.label = lbl;
			}, 300);


		}


	}

}).apply({});

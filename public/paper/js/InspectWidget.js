"use strict";

const InspectWidget = (function() {

	this.MEM = {
		enabled : false
	}

	this.DOM = {
		q01 : {
			box : document.getElementById('InspectWidget.q01.box'),
			okay : document.getElementById('InspectWidget.q01.okay'),
			bad : document.getElementById('InspectWidget.q01.bad')
		},
		q02 : {
			box : document.getElementById('InspectWidget.q02.box'),
			okay : document.getElementById('InspectWidget.q02.okay'),
			bad : document.getElementById('InspectWidget.q02.bad')
		},
		q03 : {
			box : document.getElementById('InspectWidget.q03.box'),
			okay : document.getElementById('InspectWidget.q03.okay'),
			bad : document.getElementById('InspectWidget.q03.bad')
		},
		q04 : {
			box : document.getElementById('InspectWidget.q04.box'),
			okay : document.getElementById('InspectWidget.q04.okay'),
			bad : document.getElementById('InspectWidget.q04.bad')
		},
		q05 : {
			box : document.getElementById('InspectWidget.q05.box'),
			okay : document.getElementById('InspectWidget.q05.okay'),
			bad : document.getElementById('InspectWidget.q05.bad')
		},
		q06 : {
			box : document.getElementById('InspectWidget.q06.box'),
			okay : document.getElementById('InspectWidget.q06.okay'),
			bad : document.getElementById('InspectWidget.q06.bad')
		},
		q07 : {
			box : document.getElementById('InspectWidget.q07.box'),
			okay : document.getElementById('InspectWidget.q07.okay'),
			bad : document.getElementById('InspectWidget.q07.bad')
		},
		q08 : {
			box : document.getElementById('InspectWidget.q08.box'),
			okay : document.getElementById('InspectWidget.q08.okay'),
			bad : document.getElementById('InspectWidget.q08.bad')
		},
		q09 : {
			box : document.getElementById('InspectWidget.q09.box'),
			okay : document.getElementById('InspectWidget.q09.okay'),
			bad : document.getElementById('InspectWidget.q09.bad')
		},
		q10 : {
			box : document.getElementById('InspectWidget.q10.box'),
			okay : document.getElementById('InspectWidget.q10.okay'),
			bad : document.getElementById('InspectWidget.q10.bad')
		},
		q11 : {
			box : document.getElementById('InspectWidget.q11.box'),
			okay : document.getElementById('InspectWidget.q11.okay'),
			bad : document.getElementById('InspectWidget.q11.bad')
		},
		q12 : {
			box : document.getElementById('InspectWidget.q12.box'),
			okay : document.getElementById('InspectWidget.q12.okay'),
			bad : document.getElementById('InspectWidget.q12.bad')
		},
		q13 : {
			box : document.getElementById('InspectWidget.q13.box'),
			okay : document.getElementById('InspectWidget.q13.okay'),
			bad : document.getElementById('InspectWidget.q13.bad')
		},
		q14 : {
			box : document.getElementById('InspectWidget.q14.box'),
			okay : document.getElementById('InspectWidget.q14.okay'),
			bad : document.getElementById('InspectWidget.q14.bad')
		},
		q15 : {
			box : document.getElementById('InspectWidget.q15.box'),
			okay : document.getElementById('InspectWidget.q15.okay'),
			bad : document.getElementById('InspectWidget.q15.bad')
		},
		q16 : {
			box : document.getElementById('InspectWidget.q16.box'),
			okay : document.getElementById('InspectWidget.q16.okay'),
			bad : document.getElementById('InspectWidget.q16.bad')
		},
		q17 : {
			box : document.getElementById('InspectWidget.q17.box'),
			okay : document.getElementById('InspectWidget.q17.okay'),
			bad : document.getElementById('InspectWidget.q17.bad')
		},
		q18 : {
			box : document.getElementById('InspectWidget.q18.box'),
			okay : document.getElementById('InspectWidget.q18.okay'),
			bad : document.getElementById('InspectWidget.q18.bad')
		},
		q19 : {
			box : document.getElementById('InspectWidget.q19.box'),
			okay : document.getElementById('InspectWidget.q19.okay'),
			bad : document.getElementById('InspectWidget.q19.bad')
		},
		q20 : {
			box : document.getElementById('InspectWidget.q20.box'),
			okay : document.getElementById('InspectWidget.q20.okay'),
			bad : document.getElementById('InspectWidget.q20.bad')
		},
		q21 : {
			box : document.getElementById('InspectWidget.q21.box'),
			okay : document.getElementById('InspectWidget.q21.okay'),
			bad : document.getElementById('InspectWidget.q21.bad')
		},
		text : {
			report : document.getElementById('InspectWidget.text.report'),
			comment : document.getElementById('InspectWidget.text.comment')
		}
	}

	this.EVT = {
		handleOkayClick : evt_handleOkayClick.bind(this),
		handleBadClick : evt_handleBadClick.bind(this),
		handleReportKeydown : evt_handleReportKeydown.bind(this),
		handleCommentKeydown : evt_handleCommentKeydown.bind(this)
	}

	this.API = {
		enableForm : api_enableForm.bind(this),
		disableForm : api_disableForm.bind(this),
		setTruckType : api_setTruckType.bind(this),
		setFromData : api_setFromData.bind(this)
	}

	init.apply(this);
	return this;

	function init() {

		for(let key in this.DOM) {
			if(this.DOM[key].okay) {
				this.DOM[key].okay.addEventListener('click', this.EVT.handleOkayClick);
			}

			if(this.DOM[key].bad) {
				this.DOM[key].bad.addEventListener('click', this.EVT.handleBadClick);
			}
		}

		this.DOM.text.report.addEventListener('input', this.EVT.handleReportKeydown);
		this.DOM.text.comment.addEventListener('input', this.EVT.handleCommentKeydown);

	}

	function evt_handleReportKeydown(evt) {

		let val = this.DOM.text.report.value;

		let text = localStorage.getItem('step_04_tmp') || '{}';
		let data = JSON.parse(text);
		data['report'] = val;

		text = JSON.stringify(data);
		localStorage.setItem('step_04_tmp', text);

	}

	function evt_handleCommentKeydown(evt) {

		let val = this.DOM.text.comment.value;

		let text = localStorage.getItem('step_04_tmp') || '{}';
		let data = JSON.parse(text);
		data['comment'] = val;

		text = JSON.stringify(data);
		localStorage.setItem('step_04_tmp', text);

	}

	function api_setFromData(data) {

		console.log(data);

		for(let i = 1; i <= 21; i++) {
			let str = i.toString();
			if(str.length < 2) {
				str = '0' + str;
			}
			let key = 'q' + str;
			if(!data[key]) {
				continue;
			}
			this.DOM[key][data[key]].classList.add('selected');
		}

		this.DOM.text.report.value = data['report'] || '';
		this.DOM.text.comment.value = data['comment'] || '';

	}

	function api_setTruckType(type) {

		switch(type) {
		case "ローリー":
			this.DOM.q01.box.classList.add('disabled');
			this.DOM.q20.box.classList.add('disabled');
			break;
		}

	}

	function api_disableForm() {

		this.MEM.enabled = false;
		localStorage.removeItem('step_04_tmp');
		this.DOM.text.report.setAttribute('disabled', 'disabled');
		this.DOM.text.comment.setAttribute('disabled', 'disabled');

	}

	function api_enableForm() {

		this.MEM.enabled = true;
		let text = localStorage.getItem('step_04_tmp') || '{}';
		let data = JSON.parse(text);
		this.API.setFromData(data);
		this.DOM.text.report.removeAttribute('disabled');
		this.DOM.text.comment.removeAttribute('disabled');
	}

	function evt_handleOkayClick(evt) {

		if(!this.MEM.enabled) {
			return;
		}
		
		let text = localStorage.getItem('step_04_tmp') || '{}';
		let data = JSON.parse(text);
		
		let elem = evt.target;
		for(let key in this.DOM) {
			if(elem !== this.DOM[key].okay) {
				continue;
			}

			if(this.DOM[key].box.classList.contains('disabled')) {
				return;
			}

			this.DOM[key].okay.classList.add('selected');
			this.DOM[key].bad.classList.remove('selected');
			data[key] = 'okay';
		}

		text = JSON.stringify(data);
		localStorage.setItem('step_04_tmp', text);

	}

	function evt_handleBadClick(evt) {

		if(!this.MEM.enabled) {
			return;
		}
		
		let text = localStorage.getItem('step_04_tmp') || '{}';
		let data = JSON.parse(text);
		
		let elem = evt.target;
		for(let key in this.DOM) {
			if(elem !== this.DOM[key].bad) {
				continue;
			}

			if(this.DOM[key].box.classList.contains('disabled')) {
				return;
			}

			this.DOM[key].bad.classList.add('selected');
			this.DOM[key].okay.classList.remove('selected');
			data[key] = 'bad';
		}

		text = JSON.stringify(data);
		localStorage.setItem('step_04_tmp', text);

	}

}).apply({});

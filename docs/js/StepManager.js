"use strict";

const StepManager = (function() {

	this.MEM = {
		db : localforage
	}

	this.DOM = {
		step_01 : {
			label : document.getElementById('StepManager.step_01.label'),
			button : document.getElementById('StepManager.step_01.button'),
			status : document.getElementById('StepManager.step_01.status'),
			file : document.getElementById('StepManager.step_01.file')
		},
		step_02 : {
			label : document.getElementById('StepManager.step_02.label'),
			button : document.getElementById('StepManager.step_02.button'),
			status : document.getElementById('StepManager.step_02.status'),
			file : document.getElementById('StepManager.step_02.file')
		},
		step_03 : {
			label : document.getElementById('StepManager.step_03.label'),
			button : document.getElementById('StepManager.step_03.button'),
			status : document.getElementById('StepManager.step_03.status'),
			file : document.getElementById('StepManager.step_03.file')
		},
		step_04 : {
			label : document.getElementById('StepManager.step_04.label'),
			button : document.getElementById('StepManager.step_04.button'),
			status : document.getElementById('StepManager.step_04.status')
		},
		step_05 : {
			label : document.getElementById('StepManager.step_05.label'),
			button : document.getElementById('StepManager.step_05.button'),
			status : document.getElementById('StepManager.step_05.status')
		},
		step_06 : {
			label : document.getElementById('StepManager.step_06.label'),
			button : document.getElementById('StepManager.step_06.button'),
			status : document.getElementById('StepManager.step_06.status')
		},
		step_07 : {
			label : document.getElementById('StepManager.step_07.label'),
			status : document.getElementById('StepManager.step_07.status'),
			button : document.getElementById('StepManager.step_07.button'),
			file : document.getElementById('StepManager.step_07.file')
		},
		step_08 : {
			label : document.getElementById('StepManager.step_08.label'),
			status : document.getElementById('StepManager.step_08.status'),
			button : document.getElementById('StepManager.step_08.button')
		},
		step_09 : {
			label : document.getElementById('StepManager.step_09.label'),
			status : document.getElementById('StepManager.step_09.status'),
			button : document.getElementById('StepManager.step_09.button')
		}
	}

	this.EVT = {
		handleStep01Click : evt_handleStep01Click.bind(this),
		handleStep01Change : evt_handleStep01Change.bind(this),

		handleStep02Click : evt_handleStep02Click.bind(this),
		handleStep02Change : evt_handleStep02Change.bind(this),

		handleStep03Click : evt_handleStep03Click.bind(this),
		handleStep03Change : evt_handleStep03Change.bind(this),

		handleStep04Click : evt_handleStep04Click.bind(this),
		handleStep05Click : evt_handleStep05Click.bind(this),
		handleStep06Click : evt_handleStep06Click.bind(this),
		
		handleStep07Click : evt_handleStep07Click.bind(this),
		handleStep07Change : evt_handleStep07Change.bind(this),

		handleStep08Click : evt_handleStep08Click.bind(this),
		handleStep09Click : evt_handleStep09Click.bind(this),

		handleDomReady : evt_handleDomReady.bind(this)
	}

	this.API = {
		checkSteps : api_checkSteps.bind(this),
		setActiveStep : api_setActiveStep.bind(this),
		asyncReadFile : api_asyncReadFile.bind(this),
		asyncReadBlob : api_asyncReadBlob.bind(this),
		asyncSleep : api_asyncSleep.bind(this),
		setSpinner : api_setSpinner.bind(this),
		setComplete : api_setComplete.bind(this)
	}

	init.apply(this);
	return this;

	function init() {

		// Wait for the DOM to Load

		document.addEventListener('DOMContentLoaded', this.EVT.handleDomReady);

		// Events for Step 01

		this.DOM.step_01.button.addEventListener('click', this.EVT.handleStep01Click);
		this.DOM.step_01.file.addEventListener('change', this.EVT.handleStep01Change);
		
		// Events for Step 02

		this.DOM.step_02.button.addEventListener('click', this.EVT.handleStep02Click);
		this.DOM.step_02.file.addEventListener('change', this.EVT.handleStep02Change);
		
		// Events for Step 03

		this.DOM.step_03.button.addEventListener('click', this.EVT.handleStep03Click);
		this.DOM.step_03.file.addEventListener('change', this.EVT.handleStep03Change);

		// Events for Step 04

		this.DOM.step_04.button.addEventListener('click', this.EVT.handleStep04Click);

		// Events for Step 05

		this.DOM.step_05.button.addEventListener('click', this.EVT.handleStep05Click);

		// Events for Step 06

		this.DOM.step_06.button.addEventListener('click', this.EVT.handleStep06Click);
		
		// Events for Step 07

		this.DOM.step_07.button.addEventListener('click', this.EVT.handleStep07Click);
		this.DOM.step_07.file.addEventListener('change', this.EVT.handleStep07Change);

		// Events for Step 08

		this.DOM.step_08.button.addEventListener('click', this.EVT.handleStep08Click);

		// Events for Step 09

		this.DOM.step_09.button.addEventListener('click', this.EVT.handleStep09Click);

	}

	function evt_handleDomReady() {
		
		this.API.checkSteps();

	}

	function api_checkSteps() {
		
		let text, data;

		// Check for Step 01

		text = localStorage.getItem('step_01');
		if(!text) {
			this.DOM.step_01.label.classList.add('active');
			this.DOM.step_01.button.classList.add('active');
			return;
		}

		data = JSON.parse(text);
		HeaderWidget.API.fillInTable(data);
		HeaderWidget.API.fillInLoading(data);
		this.DOM.step_01.label.classList.add('complete');
		this.API.setComplete(this.DOM.step_01.status, true);

		// Check for Step 02

		text = localStorage.getItem('step_02');
		if(!text) {
			this.DOM.step_02.label.classList.add('active');
			this.DOM.step_02.button.classList.add('active');
			return;
		}

		this.DOM.step_02.label.classList.add('complete');
		this.API.setComplete(this.DOM.step_02.status, true);

		// Check for Step 03

		text = localStorage.getItem('step_03');
		if(!text) {
			this.DOM.step_03.label.classList.add('active');
			this.DOM.step_03.button.classList.add('active');
			return;
		}

		data = JSON.parse(text);
		StandardWidget.API.setData(data);
		this.DOM.step_03.label.classList.add('complete');
		this.API.setComplete(this.DOM.step_03.status, true);

		// Check for Step 04

		text = localStorage.getItem('step_04');
		if(!text) {
			
			console.log("No Step 4!!!");
			InspectWidget.API.enableForm();
			this.DOM.step_04.label.classList.add('active');
			this.DOM.step_04.button.classList.add('active');
			return;
		}
		
		data = JSON.parse(text);
		InspectWidget.API.setFromData(data);
		this.DOM.step_04.label.classList.add('complete');
		this.API.setComplete(this.DOM.step_04.status, true);

		// Check for Step 05

		text = localStorage.getItem('step_05');
		if(!text) {
			HeaderWidget.API.enableStartForm();
			this.DOM.step_05.label.classList.add('active');
			this.DOM.step_05.button.classList.add('active');
			return;
		}
		
		data = JSON.parse(text);
		HeaderWidget.API.setStartData(data);
		this.DOM.step_05.label.classList.add('complete');
		this.API.setComplete(this.DOM.step_05.status, true);

		// Check for Step 06

		text = localStorage.getItem('step_06');
		if(!text) {
			HeaderWidget.API.enableEndForm();
			this.DOM.step_06.label.classList.add('active');
			this.DOM.step_06.button.classList.add('active');
			return;
		}
		
		data = JSON.parse(text);
		HeaderWidget.API.setEndData(data);
		this.DOM.step_06.label.classList.add('complete');
		this.API.setComplete(this.DOM.step_06.status, true);

		// Check for Step 07

		text = localStorage.getItem('step_07');
		if(!text) {
			this.DOM.step_07.label.classList.add('active');
			this.DOM.step_07.button.classList.add('active');
			return;
		}
		
		data = JSON.parse(text);
		RecordWidget.API.setFromData(data);
		this.DOM.step_07.label.classList.add('complete');
		this.API.setComplete(this.DOM.step_07.status, true);
		
		// Check for Step 08

		text = localStorage.getItem('step_08');
		if(!text) {
			SlideWidget.API.openSlide('e');
			this.DOM.step_08.label.classList.add('active');
			this.DOM.step_08.button.classList.add('active');
			return;
		}
		
		RecordWidget.API.finalizeTime();
		this.DOM.step_08.label.classList.add('complete');
		this.API.setComplete(this.DOM.step_08.status, true);
	
		// Check for Step 09

		text = localStorage.getItem('step_09');
		if(!text) {
			this.DOM.step_09.label.classList.add('active');
			this.DOM.step_09.button.classList.add('active');
			return;
		}

	}

	function api_setActiveStep(no) {

		let str = no.toString();
		if(str.length < 2) {
			str = "0" + str;
		}

		let key = "step_" + str;
		this.DOM[key].label.classList.add('active');
		this.DOM[key].button.classList.add('active');

	}

	function evt_handleStep01Click() {

		this.DOM.step_01.file.click();

	}

	async function evt_handleStep01Change(evt) {

		console.log("File Change!!!");

		let files = evt.target.files;
		if(!files.length) {
			return;
		}

		let file = files[0];
		let text;
		
		this.API.setSpinner(this.DOM.step_01.status);

		try {
			text = await this.API.asyncReadFile(file);
		} catch(err) {
			throw err;
		}
		
		let data;
		try {
			data = JSON.parse(text);
		} catch(err) {
			throw err;
		}

		if(HeaderWidget.API.fillInTable(data)) {
			// Check for errors
			this.DOM.step_01.innerHTML = '';
			return;
		}

		if(HeaderWidget.API.fillInLoading(data)) {
			// Check for errors
			this.DOM.step_01.innerHTML = '';
			return;
		}

		localStorage.setItem('step_01', text);

		await this.API.asyncSleep(500);
		this.API.setComplete(this.DOM.step_01.status);
		await this.API.asyncSleep(1400);
		
		this.DOM.step_01.label.classList.add('complete');
		this.DOM.step_01.label.classList.remove('active');
		this.DOM.step_01.button.classList.remove('active');
		
		this.DOM.step_02.label.classList.add('active');
		this.DOM.step_02.button.classList.add('active');

	}

	function evt_handleStep02Click() {

		this.DOM.step_02.file.click();

	}

	async function evt_handleStep02Change(evt) {


		let files = evt.target.files;
		if(!files.length) {
			return;
		}

		let blob = files[0];
		this.API.setSpinner(this.DOM.step_02.status);
		
		// Set information to database
		
		let date = HeaderWidget.API.getDatePrefix();
		let src = date + "_特殊車両通行許可申請書";
		localStorage.setItem('step_02', src);

		try {
			await this.MEM.db.setItem(src, blob);
		} catch(err) {
			return alert(err);
		}
		
		// Animate Step completion

		await this.API.asyncSleep(500);
		this.API.setComplete(this.DOM.step_02.status);
		await this.API.asyncSleep(1400);
		
		this.DOM.step_02.label.classList.add('complete');
		this.DOM.step_02.label.classList.remove('active');
		this.DOM.step_02.button.classList.remove('active');
		
		this.DOM.step_03.label.classList.add('active');
		this.DOM.step_03.button.classList.add('active');

	}

	function evt_handleStep03Click() {

		this.DOM.step_03.file.click();

	}

	async function evt_handleStep03Change(evt) {

		let files = evt.target.files;
		if(!files.length) {
			return;
		}

		let file = files[0];
		let text;
		
		this.API.setSpinner(this.DOM.step_03.status);

		try {
			text = await this.API.asyncReadFile(file);
		} catch(err) {
			throw err;
		}
		
		let data;
		try {
			data = JSON.parse(text);
		} catch(err) {
			throw err;
		}

		if(StandardWidget.API.setData(data)) {
			return;
		}

		// Set information to database
		localStorage.setItem('step_03', text);

		// Animate Step Completion

		await this.API.asyncSleep(2000);
		this.API.setComplete(this.DOM.step_03.status);
		await this.API.asyncSleep(1400);
		
		this.DOM.step_03.label.classList.add('complete');
		this.DOM.step_03.label.classList.remove('active');
		this.DOM.step_03.button.classList.remove('active');
		
		this.DOM.step_04.label.classList.add('active');
		this.DOM.step_04.button.classList.add('active');

		// Move to show read-in Data

		await this.API.asyncSleep(1400);
		SlideWidget.API.openSlide('b');
		InspectWidget.API.enableForm();

	}

	function api_asyncReadFile(file) {
		
		return new Promise( (resolve, reject) => {

			let reader = new FileReader();

			reader.onload = e => {
				resolve(e.target.result);
			}

			reader.readAsText(file);

		});

	}

	async function evt_handleStep04Click() {

		console.log("step 04 click!!!");

		let bool = confirm("点検を確定しますか？");
		if(!bool) {
			return;
		}
		
		this.API.setSpinner(this.DOM.step_04.status);
		await this.API.asyncSleep(1400);

		let text = localStorage.getItem('step_04_tmp');
		localStorage.setItem('step_04', text);
		InspectWidget.API.disableForm();

		// Animate Step Complete
		
		this.API.setComplete(this.DOM.step_04.status);
		await this.API.asyncSleep(1400);
		
		this.DOM.step_04.label.classList.add('complete');
		this.DOM.step_04.label.classList.remove('active');
		this.DOM.step_04.button.classList.remove('active');
		
		this.DOM.step_05.label.classList.add('active');
		this.DOM.step_05.button.classList.add('active');

		// Move to Show next Step

		await this.API.asyncSleep(1400);
		SlideWidget.API.openSlide('a');
		HeaderWidget.API.enableStartForm();

		// Animate Step Complete
		
		this.API.setComplete(this.DOM.step_04.status);
		await this.API.asyncSleep(1400);
		
		this.DOM.step_04.label.classList.add('complete');
		this.DOM.step_04.label.classList.remove('active');
		this.DOM.step_04.button.classList.remove('active');
		
		this.DOM.step_05.label.classList.add('active');
		this.DOM.step_05.button.classList.add('active');

	}

	async function evt_handleStep05Click() {

		console.log("Step 05 click!!!");

		let bool = confirm("開始を確定しますか？");
		if(!bool) {
			return;
		}

		// Set Spinner

		this.API.setSpinner(this.DOM.step_05.status);
		await this.API.asyncSleep(1000);

		// Close form
		
		let text = HeaderWidget.API.disableStartForm();
		localStorage.setItem('step_05', text);

		// Animate Step Complete
		
		this.API.setComplete(this.DOM.step_05.status);
		await this.API.asyncSleep(1400);
		
		this.DOM.step_05.label.classList.add('complete');
		this.DOM.step_05.label.classList.remove('active');
		this.DOM.step_05.button.classList.remove('active');
		
		this.DOM.step_06.label.classList.add('active');
		this.DOM.step_06.button.classList.add('active');
		HeaderWidget.API.enableEndForm();

	}
	
	async function evt_handleStep06Click() {

		let bool = confirm("終了を確定しますか？");
		if(!bool) {
			return;
		}

		// Set Spinner

		this.API.setSpinner(this.DOM.step_06.status);
		await this.API.asyncSleep(1400);
		
		let text = HeaderWidget.API.disableEndForm();
		if(!text) {
			this.DOM.step_06.status.innerHTML = '';
			return;
		}
		localStorage.setItem('step_06', text);
		
		// Animate Step Complete

		this.API.setComplete(this.DOM.step_06.status);
		await this.API.asyncSleep(1400);
		
		this.DOM.step_06.label.classList.add('complete');
		this.DOM.step_06.label.classList.remove('active');
		this.DOM.step_06.button.classList.remove('active');
		
		this.DOM.step_07.label.classList.add('active');
		this.DOM.step_07.button.classList.add('active');

	}

	function evt_handleStep07Click() {

		this.DOM.step_07.file.click();

	}

	async function evt_handleStep07Change(evt) {

		let files = evt.target.files;
		if(!files.length) {
			return;
		}

		let file = files[0];
		this.API.setSpinner(this.DOM.step_07.status);

		let text;
		try {
			text = await this.API.asyncReadFile(file);
		} catch(err) {
			throw err;
		}
		
		let data;
		try {
			data = JSON.parse(text);
		} catch(err) {
			throw err;
		}

		RecordWidget.API.setFromData(data);
		localStorage.setItem('step_07', text);
		
		// Animate Set Complete

		this.API.setComplete(this.DOM.step_07.status);
		await this.API.asyncSleep(1400);
		
		this.DOM.step_07.label.classList.add('complete');
		this.DOM.step_07.label.classList.remove('active');
		this.DOM.step_07.button.classList.remove('active');
		
		this.DOM.step_08.label.classList.add('active');
		this.DOM.step_08.button.classList.add('active');

		// Move to Slider e

		await this.API.asyncSleep(400);
		SlideWidget.API.openSlide('e');

	}

	async function evt_handleStep08Click() {

		console.log("step 08 click!!");

		let bool = confirm('日報のデータを確定しますか？');
		if(!bool) {
			return;
		}
		
		this.API.setSpinner(this.DOM.step_08.status);
		await this.API.asyncSleep(400);
		RecordWidget.API.finalizeTime();
		localStorage.setItem('step_08', Date.now());

		// Animate Set Complete

		this.API.setComplete(this.DOM.step_08.status);
		await this.API.asyncSleep(1400);
		
		this.DOM.step_08.label.classList.add('complete');
		this.DOM.step_08.label.classList.remove('active');
		this.DOM.step_08.button.classList.remove('active');
		
		this.DOM.step_09.label.classList.add('active');
		this.DOM.step_09.button.classList.add('active');

		// Move to Slider e

		await this.API.asyncSleep(400);
		SlideWidget.API.openSlide('a');

	}

	async function evt_handleStep09Click() {

		console.log("now we do the step 9 click!!");

		let res;
		try {
			res = await SessionManager.API.uploadPDF();
		} catch(err) {
			throw err;
		}

		console.log(res);

	}

	function api_asyncReadBlob(file) {
		
		return new Promise( (resolve, reject) => {

			let reader = new FileReader();

			reader.onload = e => {
				resolve(e.target.result);
			}

			reader.readAsText(file);

		});

	}

	function api_asyncSleep(ms) {

		return new Promise( (resolve, reject) => {
			
			setTimeout( () => {
				resolve();
			}, ms);

		});

	}

	function api_setSpinner(elem) {

		elem.innerHTML = `
			<svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg>
		`;

	}

	function api_setComplete(elem, skipAnim) {
		
		if(skipAnim) {
		elem.innerHTML = `
			<svg class="checkmark n" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>`;
			return;
		}

		elem.innerHTML = `
			<svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
		`;

	}

}).apply({});

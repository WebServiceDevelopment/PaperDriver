"use strict";

const StepManager = (function() {

	this.MEM = {
		step : 0
	}

	this.DOM = {
		reset : document.getElementById('reset'),
		files: {
			driverInstructions : document.getElementById('StepManager.files.driverInstructions'),
			drivingPermit : document.getElementById('StepManager.files.drivingPermit')
		},
		steps : [
			document.getElementById('StepManager.steps.0'),
			document.getElementById('StepManager.steps.1'),
			document.getElementById('StepManager.steps.2')
		],
		checks : [
			document.getElementById('StepManager.checks.0'),
			document.getElementById('StepManager.checks.1'),
		]
	}

	this.EVT = {
		handleResetClick : evt_handleResetClick.bind(this),
		handleDriverInstructionClick : evt_handleDriverInstructionClick.bind(this), 
		handleDriverInstructionChange : evt_handleDriverInstructionChange.bind(this),
		handleDrivingPermitClick : evt_handleDrivingPermitClick.bind(this), 
		handleDrivingPermitChange : evt_handleDrivingPermitChange.bind(this),
	}

	this.API = {
	}

	init.apply(this);
	return this;

	function init() {
		
		console.log("----------- AAA");
		console.log(this.EVT);
		this.DOM.reset.addEventListener('click', this.EVT.handleResetClick);

		this.DOM.steps[0].addEventListener('click', this.EVT.handleDriverInstructionClick);
		this.DOM.files.driverInstructions.addEventListener('change', this.EVT.handleDriverInstructionChange);


		this.DOM.steps[1].addEventListener('click', this.EVT.handleDrivingPermitClick);
		this.DOM.files.drivingPermit.addEventListener('change', this.EVT.handleDrivingPermitChange);


	}

	function evt_handleResetClick() {

		let bool = confirm("Stepをリセットしますか？");

		if(!bool) {
			return;
		}

		localStorage.removeItem("step_01");
		localStorage.removeItem("step_02");
		localStorage.removeItem("step_03");
		localStorage.removeItem("step_04");
		localStorage.removeItem("step_05");
		localStorage.removeItem("step_06");

		alert("リセットしました\nページを再読み込みしてください");

	}


	function evt_handleDriverInstructionClick() {

		this.DOM.files.driverInstructions.click();

	}

	function evt_handleDrivingPermitClick() {
		
		this.DOM.files.drivingPermit.click();

	}

	function evt_handleDrivingPermitChange(evt) {

		let files = evt.target.files;
		if(!files.length) {
			return;
		}

		let file = files[0];

		const reader = new FileReader();

		reader.onload = e => {

			let config= e.target.result;
			console.log(config);

			this.DOM.checks[1].setAttribute('class', 'attach-button clear');
			this.DOM.checks[1].innerHTML = `
			<svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
  <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
  <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
</svg>
			`;

			setTimeout( () => {
				this.DOM.steps[1].classList.remove('active');
				this.DOM.steps[2].classList.add('active');
			}, 350);

		}

		reader.readAsText(file);

	}

	function evt_handleDriverInstructionChange(evt) {

		console.log("change!!!");

		let files = evt.target.files;
		if(!files.length) {
			return;
		}

		let file = files[0];

		const reader = new FileReader();

		reader.onload = e => {

			let config;

			try {
				config = JSON.parse(e.target.result);
			} catch(err) {
				throw err;
			}

			console.log(config);

			this.DOM.checks[0].setAttribute('class', 'attach-button clear');
			this.DOM.checks[0].innerHTML = `
			<svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
  <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
  <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
</svg>
			`;

			setTimeout( () => {
				this.DOM.steps[0].classList.remove('active');
				this.DOM.steps[1].classList.add('active');
			}, 350);

		}

		reader.readAsText(file);

	}

}).apply({});

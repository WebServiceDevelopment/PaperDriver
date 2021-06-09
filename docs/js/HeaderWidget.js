"use strict";

const HeaderWidget = (function() {

	this.MEM = {}

	this.DOM = {
		table : {
			company : document.getElementById('HeaderWidget.table.company'),
			office : document.getElementById('HeaderWidget.table.office'),
			driver_a : document.getElementById('HeaderWidget.table.driver_a'),
			driver_b : document.getElementById('HeaderWidget.table.driver_b'),
			year : document.getElementById('HeaderWidget.table.year'),
			month : document.getElementById('HeaderWidget.table.month'),
			day : document.getElementById('HeaderWidget.table.day'),
			dow : document.getElementById('HeaderWidget.table.dow'),
			truck_number : document.getElementById('HeaderWidget.table.truck_number'),
			trailer : document.getElementById('HeaderWidget.table.trailer'),
			tanker : document.getElementById('HeaderWidget.table.tanker'),
			large : document.getElementById('HeaderWidget.table.large'),
			medium : document.getElementById('HeaderWidget.table.medium')
		},
		start : {
			mileage : document.getElementById('HeaderWidget.start.mileage'),
			hour : document.getElementById('HeaderWidget.start.hour'),
			minute : document.getElementById('HeaderWidget.start.minute')
		},
		end : {
			mileage : document.getElementById('HeaderWidget.end.mileage'),
			hour : document.getElementById('HeaderWidget.end.hour'),
			minute : document.getElementById('HeaderWidget.end.minute'),
			stand_01 : document.getElementById('HeaderWidget.end.stand_01'),
			liter_01 : document.getElementById('HeaderWidget.end.liter_01'),
			stand_02 : document.getElementById('HeaderWidget.end.stand_02'),
			liter_02 : document.getElementById('HeaderWidget.end.liter_02'),

			total_km : document.getElementById('HeaderWidget.end.total_km'),
			total_hour : document.getElementById('HeaderWidget.end.total_hour'),
			total_minutes : document.getElementById('HeaderWidget.end.total_minutes'),
		},
		row0 : {
			confirmation : document.getElementById('HeaderWidget.row0.confirmation'),
			shipper_name : document.getElementById('HeaderWidget.row0.shipper_name'), 
			product_name : document.getElementById('HeaderWidget.row0.product_name'),
			packing : document.getElementById('HeaderWidget.row0.packing'),
			quantity : document.getElementById('HeaderWidget.row0.quantity'),
			origin : document.getElementById('HeaderWidget.row0.origin'),
			arrival : document.getElementById('HeaderWidget.row0.arrival'),
			load : document.getElementById('HeaderWidget.row0.load'),
			unload : document.getElementById('HeaderWidget.row0.unload'),
			drive : document.getElementById('HeaderWidget.row0.drive'),
			loading : document.getElementById('HeaderWidget.row0.loading'),
			assortment : document.getElementById('HeaderWidget.row0.assortment'),
			unloading : document.getElementById('HeaderWidget.row0.unloading'),
			loose : document.getElementById('HeaderWidget.row0.loose'),
			at_night : document.getElementById('HeaderWidget.row0.at_night')
		},
		row1 : {
			confirmation : document.getElementById('HeaderWidget.row1.confirmation'),
			shipper_name : document.getElementById('HeaderWidget.row1.shipper_name'), 
			product_name : document.getElementById('HeaderWidget.row1.product_name'),
			packing : document.getElementById('HeaderWidget.row1.packing'),
			quantity : document.getElementById('HeaderWidget.row1.quantity'),
			origin : document.getElementById('HeaderWidget.row1.origin'),
			arrival : document.getElementById('HeaderWidget.row1.arrival'),
			load : document.getElementById('HeaderWidget.row1.load'),
			unload : document.getElementById('HeaderWidget.row1.unload'),
			drive : document.getElementById('HeaderWidget.row1.drive'),
			loading : document.getElementById('HeaderWidget.row1.loading'),
			assortment : document.getElementById('HeaderWidget.row1.assortment'),
			unloading : document.getElementById('HeaderWidget.row1.unloading'),
			loose : document.getElementById('HeaderWidget.row1.loose'),
			at_night : document.getElementById('HeaderWidget.row1.at_night')
		},
		row2 : {
			confirmation : document.getElementById('HeaderWidget.row2.confirmation'),
			shipper_name : document.getElementById('HeaderWidget.row2.shipper_name'), 
			product_name : document.getElementById('HeaderWidget.row2.product_name'),
			packing : document.getElementById('HeaderWidget.row2.packing'),
			quantity : document.getElementById('HeaderWidget.row2.quantity'),
			origin : document.getElementById('HeaderWidget.row2.origin'),
			arrival : document.getElementById('HeaderWidget.row2.arrival'),
			load : document.getElementById('HeaderWidget.row2.load'),
			unload : document.getElementById('HeaderWidget.row2.unload'),
			drive : document.getElementById('HeaderWidget.row2.drive'),
			loading : document.getElementById('HeaderWidget.row2.loading'),
			assortment : document.getElementById('HeaderWidget.row2.assortment'),
			unloading : document.getElementById('HeaderWidget.row2.unloading'),
			loose : document.getElementById('HeaderWidget.row2.loose'),
			at_night : document.getElementById('HeaderWidget.row2.at_night')
		},
		row3 : {
			confirmation : document.getElementById('HeaderWidget.row3.confirmation'),
			shipper_name : document.getElementById('HeaderWidget.row3.shipper_name'), 
			product_name : document.getElementById('HeaderWidget.row3.product_name'),
			packing : document.getElementById('HeaderWidget.row3.packing'),
			quantity : document.getElementById('HeaderWidget.row3.quantity'),
			origin : document.getElementById('HeaderWidget.row3.origin'),
			arrival : document.getElementById('HeaderWidget.row3.arrival'),
			load : document.getElementById('HeaderWidget.row3.load'),
			unload : document.getElementById('HeaderWidget.row3.unload'),
			drive : document.getElementById('HeaderWidget.row3.drive'),
			loading : document.getElementById('HeaderWidget.row3.loading'),
			assortment : document.getElementById('HeaderWidget.row3.assortment'),
			unloading : document.getElementById('HeaderWidget.row3.unloading'),
			loose : document.getElementById('HeaderWidget.row3.loose'),
			at_night : document.getElementById('HeaderWidget.row3.at_night')
		},
		totals : {
			loading : document.getElementById('HeaderWidget.totals.loading'),
			assortment : document.getElementById('HeaderWidget.totals.assortment'),
			unloading : document.getElementById('HeaderWidget.totals.unloading'),
			loose : document.getElementById('HeaderWidget.totals.loose'),
			at_night : document.getElementById('HeaderWidget.totals.at_night')
		}
	}

	this.EVT = {
		handleStandInput : evt_handleStandInput.bind(this)
	}

	this.API = {
		clearTable : api_clearTable.bind(this),
		fillInTable : api_fillInTable.bind(this),
		getDatePrefix : api_getDatePrefix.bind(this),
		fillInLoading : api_fillInLoading.bind(this),
		getTruckType : api_getTruckType.bind(this),
		enableStartForm : api_enableStartForm.bind(this),
		disableStartForm : api_disableStartForm.bind(this),
		setStartData : api_setStartData.bind(this),
		enableEndForm : api_enableEndForm.bind(this),
		disableEndForm : api_disableEndForm.bind(this),
		setEndData : api_setEndData.bind(this)
	}

	init.apply(this);
	return this;

	function init() {

		this.API.clearTable();
		
		this.DOM.end.stand_01.addEventListener('input', this.EVT.handleStandInput);
		this.DOM.end.liter_01.addEventListener('input', this.EVT.handleStandInput);
		
		this.DOM.end.stand_02.addEventListener('input', this.EVT.handleStandInput);
		this.DOM.end.liter_02.addEventListener('input', this.EVT.handleStandInput);
		
		// Clear start inputs 
		
		this.DOM.start.mileage.setAttribute('disabled', 'disabled');
		this.DOM.start.hour.setAttribute('disabled', 'disabled');
		this.DOM.start.minute.setAttribute('disabled', 'disabled');

		this.DOM.start.mileage.value = '';
		this.DOM.start.hour.value = '';
		this.DOM.start.minute.value = '';

		// Clear stand inputs 
		
		this.DOM.end.stand_01.value = '';
		this.DOM.end.liter_01.value = '';
		
		this.DOM.end.stand_02.value = '';
		this.DOM.end.liter_02.value = '';

		this.DOM.end.stand_01.setAttribute('disabled', 'disabled');
		this.DOM.end.liter_01.setAttribute('disabled', 'disabled');
		this.DOM.end.stand_02.setAttribute('disabled', 'disabled');
		this.DOM.end.liter_02.setAttribute('disabled', 'disabled');

		// Clear End Inputs
		
		this.DOM.end.mileage.setAttribute('disabled', 'disabled');
		this.DOM.end.hour.setAttribute('disabled', 'disabled');
		this.DOM.end.minute.setAttribute('disabled', 'disabled');

		this.DOM.end.mileage.value = '';
		this.DOM.end.hour.value = '';
		this.DOM.end.minute.value = '';
		
		this.DOM.end.total_km.value = '';
		this.DOM.end.total_hour.value = '';
		this.DOM.end.total_minutes.value = '';

	}

	function api_setEndData(data) {

		console.log("Set the end data!!!");
		
		this.DOM.end.stand_01.value = data.stand_01;
		this.DOM.end.liter_01.value = data.liter_01;
		this.DOM.end.stand_02.value = data.stand_02;
		this.DOM.end.liter_02.value = data.liter_02;

		this.DOM.end.mileage.value = data.mileage;
		this.DOM.end.hour.value = data.hour;
		this.DOM.end.minute.value = data.minute;

		this.DOM.end.total_hour.value = data.total_hour;
		this.DOM.end.total_minutes.value = data.total_minutes;
		this.DOM.end.total_km.value = data.total_km;

	}

	function evt_handleStandInput(evt) {

		let text = localStorage.getItem('step_06_tmp') || '{}';
		let data = JSON.parse(text);

		for(let key in this.DOM.end) {
			if(evt.target !== this.DOM.end[key]) {
				continue;
			}

			data[key] = evt.target.value;
			break;
		}

		text = JSON.stringify(data);
		localStorage.setItem('step_06_tmp', text);

	}

	function api_enableEndForm() {

		this.DOM.end.mileage.removeAttribute('disabled');
		// this.DOM.end.hour.removeAttribute('disabled');
		// this.DOM.end.minute.removeAttribute('disabled');
		
		this.DOM.end.stand_01.removeAttribute('disabled');
		this.DOM.end.liter_01.removeAttribute('disabled');
		
		this.DOM.end.stand_02.removeAttribute('disabled');
		this.DOM.end.liter_02.removeAttribute('disabled');

		this.DOM.end.mileage.setAttribute('type', 'number');
		
		// Set Stand Data

		let text = localStorage.getItem('step_06_tmp') || '{}';
		let data = JSON.parse(text);
		
		this.DOM.end.stand_01.value = data.stand_01 || '';
		this.DOM.end.liter_01.value = data.liter_01 || '';
		
		this.DOM.end.stand_02.value = data.stand_02 || '';
		this.DOM.end.liter_02.value = data.liter_02 || '';

	}

	function api_disableEndForm() {

		// Do check for End Odometer

		let end = parseInt(this.DOM.end.mileage.value) || 0;
		if(end <= this.MEM.data.odometer) {
			alert('終了オドメーターを入力して下さい');
			return false;
		}

		// Collect the Data

		localStorage.removeItem('step_06_tmp');

		let n = moment();
		this.DOM.end.hour.value = n.format('HH');
		this.DOM.end.minute.value = n.format('mm');

		let data = {
			time : n.format(),
			mileage : this.DOM.end.mileage.value,
			hour : this.DOM.end.hour.value,
			minute : this.DOM.end.minute.value,
			stand_01 : this.DOM.end.stand_01.value,
			liter_01 : this.DOM.end.liter_01.value,
			stand_02 : this.DOM.end.stand_02.value,
			liter_02 : this.DOM.end.liter_02.value
		}

		data.mileage = data.mileage.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		this.DOM.end.mileage.setAttribute('type', 'text');
		this.DOM.end.mileage.value = data.mileage;

		this.DOM.end.mileage.setAttribute('disabled', 'disabled');
		this.DOM.end.hour.setAttribute('disabled', 'disabled');
		this.DOM.end.minute.setAttribute('disabled', 'disabled');
		
		this.DOM.end.stand_01.setAttribute('disabled', 'disabled');
		this.DOM.end.liter_01.setAttribute('disabled', 'disabled');
		this.DOM.end.stand_02.setAttribute('disabled', 'disabled');
		this.DOM.end.liter_02.setAttribute('disabled', 'disabled');

		// Calculate the total mileage and time

		let text = localStorage.getItem('step_05');
		let prev = JSON.parse(text);
		let m = moment(prev.time);

		let minutes = n.diff(m, 'minutes');
		
		let hours = Math.floor(minutes / 60).toString();
		if(hours.length < 2) {
			hours = '0' + hours;
		}

		let min = (minutes % 60).toString();
		if(min.length < 2) {
			min = '0' + min;
		}
		
		let start_km = parseInt(prev.mileage.replace(/,/g, ''));
		let end_km = parseInt(data.mileage.replace(/,/g, ''));
		let total_km = (end_km - start_km).toString();

		total_km = total_km.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		
		data.total_hour = hours;
		data.total_minutes = min;
		data.total_km = total_km;

		this.DOM.end.total_km.value = total_km;
		this.DOM.end.total_hour.value = hours;
		this.DOM.end.total_minutes.value = min;

		// Return the data to store it

		console.log(data);

		return JSON.stringify(data);

	}

	function api_setStartData(data) {

		this.DOM.start.hour.value = data.hour;
		this.DOM.start.minute.value = data.minute;
		this.DOM.start.mileage.value = data.mileage;

	}

	function api_enableStartForm() {

		this.DOM.start.mileage.setAttribute('type', 'number');
		this.DOM.start.mileage.removeAttribute('disabled');
		this.DOM.start.mileage.value = this.MEM.data.odometer;

		/*
		this.DOM.start.hour.removeAttribute('disabled');
		this.DOM.start.minute.removeAttribute('disabled');
		let n = moment();
		this.DOM.start.hour.value = n.format('HH');
		this.DOM.start.minute.value = n.format('mm');
		*/

	}

	function api_disableStartForm() {

		let n = moment();
		this.DOM.start.hour.value = n.format('HH');
		this.DOM.start.minute.value = n.format('mm');

		let data = {
			time : n.format(),
			mileage : this.DOM.start.mileage.value,
			hour : this.DOM.start.hour.value,
			minute : this.DOM.start.minute.value
		}

		data.mileage = data.mileage.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		this.DOM.start.mileage.setAttribute('type', 'text');
		this.DOM.start.mileage.value = data.mileage;

		this.DOM.start.mileage.setAttribute('disabled', 'disabled');
		this.DOM.start.hour.setAttribute('disabled', 'disabled');
		this.DOM.start.minute.setAttribute('disabled', 'disabled');

		return JSON.stringify(data);

	}

	function api_getTruckType() {

		return this.MEM.data.truck_type;

	}

	function api_getDatePrefix() {

		return this.MEM.date.format('YYYY-MM-DD');

	}

	function api_clearTable() {

		console.log("Clear the table!!");
		
		this.DOM.table.company.textContent = '';
		this.DOM.table.office.value = '';
		this.DOM.table.driver_a.value = '';
		this.DOM.table.driver_b.value = '';

		this.DOM.table.year.value = '';
		this.DOM.table.month.value = '';
		this.DOM.table.day.value = '';
		this.DOM.table.dow.textContent = '';

		this.DOM.table.truck_number.value = '';
		this.DOM.table.tanker.classList.remove('selected');
		this.DOM.table.trailer.classList.remove('selected');

	}

	function api_fillInTable(data) {

		console.log(this.DOM.table);

		this.MEM.data = data;
		
		this.DOM.table.company.textContent = data.company;
		this.DOM.table.office.value = data.office;
		this.DOM.table.driver_a.value = data.driver_a;
		this.DOM.table.driver_b.value = data.driver_b || '';

		let n = moment(data.date);
		this.DOM.table.year.value = n.format('YYYY');
		this.DOM.table.month.value = n.format('MM');
		this.DOM.table.day.value = n.format('DD');
		this.MEM.date = n;

		switch(n.day()) {
		case 0:
			this.DOM.table.dow.textContent = '日';
			break;
		case 1:
			this.DOM.table.dow.textContent = '月';
			break;
		case 2:
			this.DOM.table.dow.textContent = '火';
			break;
		case 3:
			this.DOM.table.dow.textContent = '水';
			break;
		case 4:
			this.DOM.table.dow.textContent = '木';
			break;
		case 5:
			this.DOM.table.dow.textContent = '金';
			break;
		case 6:
			this.DOM.table.dow.textContent = '土';
			break;
		}
		
		this.DOM.table.truck_number.value = data.truck_number;
		
		switch(data.truck_type) {
		case 'ローリー':
			this.DOM.table.tanker.classList.add('selected');
			break;
		case 'トレーラー':
			this.DOM.table.trailer.classList.add('selected');
			break;
		}

		InspectWidget.API.setTruckType(data.truck_type);
		return null;
	}

	function api_fillInLoading(data) {

		let loading = 0;
		let assortment = 0;
		let unloading = 0;
		let loose = 0;
		let at_night = 0;

		for(let i = 0; i < data.loading.length; i++) {
			let key = 'row' + i;
			const d = data.loading[i];

			if(d.confirmation) {
				this.DOM[key].confirmation.textContent = '〇';
			}
			
			// String Content

			this.DOM[key].shipper_name.textContent = d.shipper_name;
			this.DOM[key].product_name.textContent = d.product_name;
			this.DOM[key].packing.textContent = d.packing;
			this.DOM[key].quantity.textContent = d.quantity;
			this.DOM[key].origin.textContent = d.origin;
			this.DOM[key].arrival.textContent = d.arrival;

			// Active Circles

			if(d.work_content.indexOf('積') !== -1) {
				this.DOM[key].load.classList.add('active');
			}

			if(d.work_content.indexOf('卸') !== -1) {
				this.DOM[key].unload.classList.add('active');
			}

			if(d.work_content.indexOf('運行') !== -1) {
				this.DOM[key].drive.classList.add('active');
			}

			// Last five numbers
			
			if(d.loading) {
				this.DOM[key].loading.textContent = d.loading;
				loading += d.loading;
			}
			
			if(d.assortment) {
				this.DOM[key].assortment.textContent = d.assortment;
				assortment += d.assortment;
			}
			
			if(d.unloading) {
				this.DOM[key].unloading.textContent = d.unloading;
				unloading += d.unloading;
			}
			
			if(d.loose) {
				this.DOM[key].loose.textContent = d.loose;
				loose += d.loose;
			}
			
			if(d.at_night) {
				this.DOM[key].at_night.textContent = d.at_night;
				at_night += d.at_night;
			}

		}
		
		this.DOM.totals.loading.textContent = loading || '';
		this.DOM.totals.assortment.textContent = assortment || '';
		this.DOM.totals.unloading.textContent = unloading || '';
		this.DOM.totals.loose.textContent = loose || '';
		this.DOM.totals.at_night.textContent = at_night || '';

		return false;

	}

}).apply({});

"use strict";

const RecordWidget = (function() {

	this.MEM = {}

	this.DOM = {
		header : {
			company_name : document.getElementById('RecordWidget.header.company_name'),
			driver_name : document.getElementById('RecordWidget.header.driver_name'),
			start_date : document.getElementById('RecordWidget.header.start_date'),
			end_date : document.getElementById('RecordWidget.header.end_date')
		},
		table : {
			tbody : document.getElementById('RecordWidget.table.tbody')
		},
		stats : {
			drive_time : document.getElementById('RecordWidget.stats.drive_time'),
			operating_time : document.getElementById('RecordWidget.stats.operating_time'),
			non_working_time : document.getElementById('RecordWidget.stats.non_working_time'),
			mileage : document.getElementById('RecordWidget.stats.mileage'),
			actual_distance : document.getElementById('RecordWidget.stats.actual_distance'),
			empty_distance : document.getElementById('RecordWidget.stats.empty_distance'),
			general_road_distance : document.getElementById('RecordWidget.stats.general_road_distance'),
			highway_distance : document.getElementById('RecordWidget.stats.highway_distance'),
			private_road_distance : document.getElementById('RecordWidget.stats.private_road_distance'),
			highway_costs : document.getElementById('RecordWidget.stats.highway_costs'),

			excessive_continuous_operation : document.getElementById('RecordWidget.stats.excessive_continuous_operation'),
			comprehensive_evaluation : document.getElementById('RecordWidget.stats.comprehensive_evaluation'),
			safety : document.getElementById('RecordWidget.stats.safety'),
			fuel_economy : document.getElementById('RecordWidget.stats.fuel_economy'),
			notes : document.getElementById('RecordWidget.stats.notes'),
			tbody : document.getElementById('RecordWidget.stats.tbody')
		},
		maximum_speed : {
			general : document.getElementById('RecordWidget.maximum_speed.general'),
			private : document.getElementById('RecordWidget.maximum_speed.private'),
			highway : document.getElementById('RecordWidget.maximum_speed.highway') 
		},
		maximum_engine_speed : {
			general : document.getElementById('RecordWidget.maximum_engine_speed.general'),
			private : document.getElementById('RecordWidget.maximum_engine_speed.private'),
			highway : document.getElementById('RecordWidget.maximum_engine_speed.highway') 
		},
		average_speed : {
			general : document.getElementById('RecordWidget.average_speed.general'),
			private : document.getElementById('RecordWidget.average_speed.private'),
			highway : document.getElementById('RecordWidget.average_speed.highway') 
		},
		over_speed_limit : {
			general : document.getElementById('RecordWidget.over_speed_limit.general'),
			private : document.getElementById('RecordWidget.over_speed_limit.private'),
			highway : document.getElementById('RecordWidget.over_speed_limit.highway') 
		},
		over_engine_speed : {
			general : document.getElementById('RecordWidget.over_engine_speed.general'),
			private : document.getElementById('RecordWidget.over_engine_speed.private'),
			highway : document.getElementById('RecordWidget.over_engine_speed.highway') 
		}
	}

	this.EVT = {
		handleTimeChange : evt_handleTimeChange.bind(this)
	}

	this.API = {
		setFromData : api_setFromData.bind(this),
		createTimeInput : api_createTimeInput.bind(this),
		tableToData : api_tableToData.bind(this),
		calculateDuration : api_calculateDuration.bind(this),
		finalizeTime : api_finalizeTime.bind(this),
		textToDate : api_textToDate.bind(this),
		dateToString : api_dateToString.bind(this)
	}

	init.apply(this);
	return this;

	function init() {

		this.DOM.header.company_name.textContent = "";
		this.DOM.header.driver_name.textContent = "";
		this.DOM.header.start_date.textContent = "";
		this.DOM.header.end_date.textContent = "";

		this.DOM.table.tbody.innerHTML = '';

	}

	function api_dateToString(timeObj) {

		let y = timeObj.format('YYYY');
		let m = timeObj.format('MM');
		let d = timeObj.format('DD');
		let w = parseInt(timeObj.format('d'));
		let h = timeObj.format('HH');
		let n = timeObj.format('mm');
		
		const dow = ['日', '月', '火', '水', '木', '金', '土'][w];
		return `${y}年${m}月${d}日（${dow}）${h}:${n}`;

	}

	function api_textToDate(input) {
		
		console.log("got input!!");
		console.log(input);

		return {
			year : input.substr(0,  4),
			month : input.substr(5, 2),
			day : input.substr(8, 2),
			hour : input.substr(14, 2),
			minute : input.substr(17, 2)
		}

	}

	function api_finalizeTime() {

		for(let i = 0; this.DOM.table.tbody.rows.length; i++) {
			
			const record = {};
			const row = this.DOM.table.tbody.rows[i];
			if(!row) {
				break;
			}
			const cells = row.cells;
			
			// Start

			if(cells[2].children.length === 3) {
				cells[2].children[0].setAttribute('disabled', 'disabled');
				cells[2].children[2].setAttribute('disabled', 'disabled');
			}

			// End

			if(cells[3].children.length === 3) {
				cells[3].children[0].setAttribute('disabled', 'disabled');
				cells[3].children[2].setAttribute('disabled', 'disabled');
			}

		}

	}

	function api_setFromData(data) {

		let text = localStorage.getItem('step_07_tmp');
		if(text) {
			data = JSON.parse(text);
		} else {
			localStorage.setItem('step_07_tmp', JSON.stringify(data));
		}

		this.DOM.header.company_name.textContent = data.header.company_name;
		this.DOM.header.driver_name.textContent = data.header.driver_name;
		this.DOM.header.start_date.textContent = data.header.start_date;
		this.DOM.header.end_date.textContent = data.header.end_date;

		this.MEM.times = [];

		// Set Table Data

		data.drive_record.forEach( record => {
			
			const row = this.DOM.table.tbody.insertRow();

			// Create Cells

			const a = row.insertCell();
			const b = row.insertCell();
			const c1 = row.insertCell();
			const c2 = row.insertCell();
			const e = row.insertCell();
			const f = row.insertCell();
			const g = row.insertCell();
			const h = row.insertCell();
			const i = row.insertCell();
			const j = row.insertCell();
			const k = row.insertCell();
			const l = row.insertCell();
			const m = row.insertCell();
			const n = row.insertCell();

			// Set Classes

			a.setAttribute('class', 'a');
			b.setAttribute('class', 'b');
			c1.setAttribute('class', 'c1');
			c2.setAttribute('class', 'c2');
			e.setAttribute('class', 'e');
			f.setAttribute('class', 'f');
			g.setAttribute('class', 'g');
			h.setAttribute('class', 'h');
			i.setAttribute('class', 'i');
			j.setAttribute('class', 'j');
			k.setAttribute('class', 'k');
			l.setAttribute('class', 'l');
			m.setAttribute('class', 'm');
			n.setAttribute('class', 'n');

			// Set Row Number

			let str = this.DOM.table.tbody.rows.length.toString();
			if(str.length < 2) {
				str = '0' + str;
			}
			a.textContent = str;
			
			// Create Inputs

			const inputs = {
				b : document.createElement('input'),
				e : document.createElement('input'),
				f : document.createElement('input'),
				g : document.createElement('input'),
				h : document.createElement('input'),
				i : document.createElement('input'),
				j : document.createElement('input'),
				k : document.createElement('input'),
				l : document.createElement('input'),
				m : document.createElement('input'),
				n : document.createElement('input')
			};

			for(let key in inputs) {
				inputs[key].setAttribute('readonly', 'readonly');
			}

			// Set Values

			inputs.b.value = record.status;
			inputs.e.value = record.duration;
			inputs.f.value = record.distance;
			inputs.g.value = record.location;
			if(record.costs.length) {
				inputs.h.value = record.costs + '円';
			}
			inputs.i.value = record.shipper;
			inputs.j.value = record.product;
			inputs.k.value = record.quantity;
			inputs.l.value = record.unit;
			inputs.m.value = record.weight;
			inputs.n.value = record.loading;

			let km = document.createTextNode('km');

			// Append Inputs to Cells

			b.appendChild(inputs.b);
			e.appendChild(inputs.e);

			f.appendChild(inputs.f);
			f.appendChild(km);
			if(record.distance.length === 0) {
				f.classList.add('hide');
			}

			g.appendChild(inputs.g);
			h.appendChild(inputs.h);
			i.appendChild(inputs.i);
			j.appendChild(inputs.j);
			k.appendChild(inputs.k);
			l.appendChild(inputs.l);
			m.appendChild(inputs.m);
			n.appendChild(inputs.n);

			// Create Time Inputs
			
			switch(record.status) {
			case '':
			case 'ETC':
				c1.textContent = record.start;
				c2.textContent = record.end;
				break;
			case '乗務開始':
				this.API.createTimeInput(c1, record.start, 'end');
				break;
			case '乗務終了':
				this.API.createTimeInput(c2, record.end, 'start');
				break;
			default:
				this.API.createTimeInput(c1, record.start, 'start');
				this.API.createTimeInput(c2, record.end, 'end');
				break;
			}

			if(record.status === '休憩') {
				e.classList.add('break');
			}

		});
		
		this.API.calculateDuration();
		
		// Set Records

		this.DOM.stats.drive_time.textContent = data.drive_stats.drive_time;
		this.DOM.stats.operating_time.textContent = data.drive_stats.operating_time;
		this.DOM.stats.non_working_time.textContent = data.drive_stats.non_working_time;

		this.DOM.stats.mileage.textContent = data.drive_stats.mileage;
		this.DOM.stats.actual_distance.textContent = data.drive_stats.actual_distance;
		this.DOM.stats.empty_distance.textContent = data.drive_stats.empty_distance;
		
		this.DOM.stats.general_road_distance.textContent = data.drive_stats.general_road_distance;
		this.DOM.stats.highway_distance.textContent = data.drive_stats.highway_distance;
		this.DOM.stats.private_road_distance.textContent = data.drive_stats.private_road_distance;
		this.DOM.stats.highway_costs.textContent = data.drive_stats.highway_costs;
		
		this.DOM.stats.excessive_continuous_operation.textContent = data.drive_stats.excessive_continuous_operation;
		this.DOM.stats.comprehensive_evaluation.textContent = data.drive_stats.comprehensive_evaluation;
		this.DOM.stats.safety.textContent = data.drive_stats.safety;
		this.DOM.stats.fuel_economy.textContent = data.drive_stats.fuel_economy;
		this.DOM.stats.notes.textContent = data.drive_stats.notes;

		// Set Max Speed

		this.DOM.maximum_speed.general.textContent = data.drive_stats.maximum_speed.general;
		this.DOM.maximum_speed.private.textContent = data.drive_stats.maximum_speed.private;
		this.DOM.maximum_speed.highway.textContent = data.drive_stats.maximum_speed.highway;

		// Set Max Engine Speed

		this.DOM.maximum_engine_speed.general.textContent = data.drive_stats.maximum_engine_speed.general;
		this.DOM.maximum_engine_speed.private.textContent = data.drive_stats.maximum_engine_speed.private;
		this.DOM.maximum_engine_speed.highway.textContent = data.drive_stats.maximum_engine_speed.highway;

		// Set Average Speed

		this.DOM.average_speed.general.textContent = data.drive_stats.average_speed.general;
		this.DOM.average_speed.private.textContent = data.drive_stats.average_speed.private;
		this.DOM.average_speed.highway.textContent = data.drive_stats.average_speed.highway;

		// Set Over Speed Limit

		this.DOM.over_speed_limit.general.textContent = data.drive_stats.over_speed_limit.general;
		this.DOM.over_speed_limit.private.textContent = data.drive_stats.over_speed_limit.private;
		this.DOM.over_speed_limit.highway.textContent = data.drive_stats.over_speed_limit.highway;

		// Set Over Engine Speed

		this.DOM.over_engine_speed.general.textContent = data.drive_stats.over_engine_speed.general;
		this.DOM.over_engine_speed.private.textContent = data.drive_stats.over_engine_speed.private;
		this.DOM.over_engine_speed.highway.textContent = data.drive_stats.over_engine_speed.highway;

		// Set the Stats table
		
		console.log(data.drive_stats.costs);

		this.DOM.stats.tbody.innerHTML = '';
		for(let i = 0; i < 5; i++) {
			const row = this.DOM.stats.tbody.insertRow();
			const ca = row.insertCell();
			const cb = row.insertCell();
			const cc = row.insertCell();
			const cd = row.insertCell();
			const ce = row.insertCell();
			const cf = row.insertCell();
			const cg = row.insertCell();
			const ch = row.insertCell();
			const ci = row.insertCell();
			const cj = row.insertCell();
			const ck = row.insertCell();
			const cl = row.insertCell();
			const cm = row.insertCell();
			
			ca.setAttribute('class', 'av');
			cb.setAttribute('class', 'bv');
			cc.setAttribute('class', 'cv');
			cd.setAttribute('class', 'dv');
			ce.setAttribute('class', 'ev');
			cf.setAttribute('class', 'fv');
			cg.setAttribute('class', 'gv');
			ch.setAttribute('class', 'hv');
			ci.setAttribute('class', 'iv');
			cj.setAttribute('class', 'jv');
			ck.setAttribute('class', 'kv');
			cl.setAttribute('class', 'lv');
			cm.setAttribute('class', 'mv');

			if(!data.drive_stats.costs[i]) {
				ca.innerHTML = '&nbsp;';
				continue;
			}

			ca.textContent = data.drive_stats.costs[i].truck_id;
			cb.textContent = data.drive_stats.costs[i].truck_name;
			cc.textContent = data.drive_stats.costs[i].truck_type;
			cd.textContent = data.drive_stats.costs[i].start_time;
			ce.textContent = data.drive_stats.costs[i].end_time;
			cf.textContent = data.drive_stats.costs[i].duration;
			cg.textContent = data.drive_stats.costs[i].start_odometer;
			ch.textContent = data.drive_stats.costs[i].end_odometer;
			ci.textContent = data.drive_stats.costs[i].distance;
			cj.textContent = data.drive_stats.costs[i].refueling_amount;
			ck.textContent = data.drive_stats.costs[i].refueling_cost;
			cl.textContent = data.drive_stats.costs[i].fuel_economy;
			cm.textContent = data.drive_stats.costs[i].highway_costs;

		}
		

	}

	function api_createTimeInput(cell, val, pos) {

		const hours = document.createElement('select');
		const minutes = document.createElement('select');

		this.MEM.times.push({
			h : hours,
			m : minutes
		});

		let parts = val.split(':');


		// Append Values to hour

		hours.setAttribute('data-type', 'h');
		hours.setAttribute('data-pos', pos);

		for(let i = 0; i < 24; i++) {
			let str = i.toString();
			if(str.length < 2) {
				str = '0' + str;
			}

			let option = document.createElement('option');
			option.textContent = str;
			option.setAttribute('value', str);
			hours.appendChild(option);
		}

		hours.value = parts[0];
		hours.addEventListener('change', this.EVT.handleTimeChange);

		// Append Values to minutes

		minutes.setAttribute('data-type', 'm');
		minutes.setAttribute('data-pos', pos);

		for(let i = 0; i < 60; i++) {
			let str = i.toString();
			if(str.length < 2) {
				str = '0' + str;
			}

			let option = document.createElement('option');
			option.textContent = str;
			option.setAttribute('value', str);
			minutes.appendChild(option);
		}

		minutes.value = parts[1];
		minutes.addEventListener('change', this.EVT.handleTimeChange);

		// Append to Cell

		let span = document.createElement('span');
		span.textContent = ':';

		cell.appendChild(hours);
		cell.appendChild(span);
		cell.appendChild(minutes);

	}

	function evt_handleTimeChange(evt) {

		// Get Elements

		let elem = evt.target;
		let type = elem.getAttribute('data-type');
		let pos = elem.getAttribute('data-pos');
		
		// Get the Index

		let index;
		for(let i = 0; i < this.MEM.times.length; i++) {
			if(this.MEM.times[i][type] !== elem) {
				continue;
			}
			index = i;
			break;
		}

		// Figure out what to do based on the type
		
		let nextIndex = pos === 'start' ? (index - 1) : (index + 1);
		this.MEM.times[nextIndex].m.value = this.MEM.times[index].m.value;
		this.MEM.times[nextIndex].h.value = this.MEM.times[index].h.value;

		// Convert the Table to Data
		
		let nextDay = this.API.calculateDuration();
		this.API.tableToData(nextDay);
	
	}

	function api_calculateDuration() {

		console.log("i guess we need to calculate this!!");

		let nextDay = false;

		for(let i = 0; this.DOM.table.tbody.rows.length; i++) {
			
			const record = {};
			const row = this.DOM.table.tbody.rows[i];
			if(!row) {
				break;
			}
			const cells = row.cells;
			
			if(cells[2].children.length !== 3) {
				continue;
			}

			if(cells[3].children.length !== 3) {
				continue;
			}

			let start = moment().startOf('day');
			let end = moment().startOf('day');
			
			// Set Start Time

			start.hour(cells[2].children[0].value);
			start.minute(cells[2].children[2].value);
			
			// Set End Time

			end.hour(cells[3].children[0].value);
			end.minute(cells[3].children[2].value);
			
			// If end is before start, we subtract one day
			
			if(end.isBefore(start)) {
				end.add(1, 'day');
				nextDay = true;
			}

			// Get Minutes
			
			let diff = end.diff(start, 'minutes');

			let min = (diff % 60).toString();
			if(min.length < 2) {
				min = '0' + min;
			}

			let hour = Math.floor(diff / 60).toString();
			if(hour.length < 2) {
				hour = '0' + hour;
			}

			cells[4].textContent = hour + ":" + min;

		}

		return nextDay;

	}

	function api_tableToData(nextDay) {
		
		const drive_record = [];

		let first = {};
		let last = {};

		for(let i = 0; this.DOM.table.tbody.rows.length; i++) {
			
			const record = {};
			const row = this.DOM.table.tbody.rows[i];
			if(!row) {
				break;
			}
			const cells = row.cells;
			
			// Status
			
			record.status = cells[1].children[0].value;

			// Start

			if(cells[2].children.length !== 3) {
				record.start = cells[2].textContent;
			} else {
				let h = cells[2].children[0].value;
				let m = cells[2].children[2].value;
				record.start = h + ":" + m;

				if(i === 0) {
					first.hour = h;
					first.minute = m;
				}
			}

			// End

			if(cells[3].children.length !== 3) {
				record.end = cells[3].textContent;
			} else {
				let h = cells[3].children[0].value;
				let m = cells[3].children[2].value;
				record.end = h + ":" + m;

				last.hour = h;
				last.minute = m;
			}

			// Duration

			record.duration = cells[4].textContent;

			// Distance
			
			record.distance = cells[5].children[0].value;

			// Location
			
			record.location = cells[6].children[0].value;

			// Costs
			
			record.costs = cells[7].children[0].value.replace('円', '');

			// Shipper
			
			record.shipper = cells[8].children[0].value;
			
			// Product

			record.product = cells[9].children[0].value;

			// Quantity
			
			record.quantity = cells[10].children[0].value;

			// Unit
			
			record.unit = cells[11].children[0].value;

			// Weight
			
			record.weight = cells[12].children[0].value;

			// Loading
			
			record.loading = cells[13].children[0].value;

			drive_record.push(record);

		}

		let text = localStorage.getItem('step_07_tmp');
		let data = JSON.parse(text);
		data.drive_record = drive_record;
		console.log(data);

		let startDate = this.API.textToDate(data.header.start_date);
		let endDate = this.API.textToDate(data.header.end_date);
		let startMoment = moment().startOf('day');
		let endMoment = moment().startOf('day');
		
		console.log(startDate);

		startMoment.year(startDate.year);
		startMoment.month(parseInt(startDate.month) - 1);
		startMoment.date(startDate.day);
		startMoment.hour(first.hour);
		startMoment.minute(first.minute);

		let str = this.API.dateToString(startMoment);
		this.DOM.header.start_date.textContent = str;
		data.header.start_date = str;


		endMoment.year(startDate.year);
		endMoment.month(parseInt(startDate.month) - 1);
		endMoment.date(startDate.day);

		if(nextDay) {
			endMoment.add(1, 'day');
		}

		endMoment.hour(last.hour);
		endMoment.minute(last.minute);
		str = this.API.dateToString(endMoment);
		this.DOM.header.end_date.textContent = str;
		data.header.end_date = str;

		localStorage.setItem('step_07_tmp', JSON.stringify(data));

	}

}).apply({});

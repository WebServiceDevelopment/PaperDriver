"use strict";

const StandardWidget = (function() {

	this.MEM = {}

	this.DOM = {
		header : {
			run_name : document.getElementById('StandardWidget.header.run_name'),
			highway : document.getElementById('StandardWidget.header.highway'),
			mileage : document.getElementById('StandardWidget.header.mileage'),
			address : document.getElementById('StandardWidget.header.address'),
			general_access : document.getElementById('StandardWidget.header.general_access'),
			restraint_time : document.getElementById('StandardWidget.header.restraint_time')
		},
		outbound : {
			tbody : document.getElementById('StandardWidget.outbound.tbody')
		},
		return_trip : {
			tbody : document.getElementById('StandardWidget.return_trip.tbody')
		}
	}

	this.EVT = {}

	this.API = {
		setData : api_setData.bind(this),
		clearData : api_clearData.bind(this)
	}

	init.apply(this);
	return this;

	function init() {

		console.log(this.DOM);
		this.API.clearData();

	}

	function api_clearData() {

		this.DOM.header.run_name.value = '';
		this.DOM.header.highway.value = '';
		this.DOM.header.mileage.value = '';
		this.DOM.header.address.value = '';
		this.DOM.header.general_access.value = '';
		this.DOM.header.restraint_time.value = '';
		
		// Outbound Table

		this.DOM.outbound.tbody.innerHTML = '';
		for(let i = 0; i < 16; i++) {
			
			let row = this.DOM.outbound.tbody.insertRow();
			let h1 = row.insertCell();
			let i1 = row.insertCell();
			let i2 = row.insertCell();
			let h2 = row.insertCell();
			let f = row.insertCell();
			let g = row.insertCell();

			h1.setAttribute('class', 'h');
			i1.setAttribute('class', 'i');
			i2.setAttribute('class', 'i');
			h2.setAttribute('class', 'h');
			f.setAttribute('class', 'f');
			g.setAttribute('class', 'g');

			h1.innerHTML = '&nbsp;';
		}
		
		// Outbound Table

		this.DOM.return_trip.tbody.innerHTML = '';
		for(let i = 0; i < 16; i++) {
			
			let row = this.DOM.return_trip.tbody.insertRow();
			let h1 = row.insertCell();
			let i1 = row.insertCell();
			let i2 = row.insertCell();
			let h2 = row.insertCell();
			let f = row.insertCell();
			let g = row.insertCell();

			h1.setAttribute('class', 'h');
			i1.setAttribute('class', 'i');
			i2.setAttribute('class', 'i');
			h2.setAttribute('class', 'h');
			f.setAttribute('class', 'f');
			g.setAttribute('class', 'g');

			h1.innerHTML = '&nbsp;';
		}

	}

	function api_setData(data) {

		console.log("set the data!!");

		// Set the Header Data

		this.DOM.header.run_name.value = data.header.run_name;
		this.DOM.header.highway.value = data.header.highway;
		this.DOM.header.mileage.value = data.header.mileage;
		this.DOM.header.address.value = data.header.address;
		this.DOM.header.general_access.value = data.header.general_access;
		this.DOM.header.restraint_time.value = data.header.restraint_time;

		// Set the outbound table data
		
		this.DOM.outbound.tbody.innerHTML = '';
		for(let i = 0; i < 16; i++) {
			
			let row = this.DOM.outbound.tbody.insertRow();
			let h1 = row.insertCell();
			let i1 = row.insertCell();
			let i2 = row.insertCell();
			let h2 = row.insertCell();
			let f = row.insertCell();
			let g = row.insertCell();

			h1.setAttribute('class', 'h');
			i1.setAttribute('class', 'i');
			i2.setAttribute('class', 'i');
			h2.setAttribute('class', 'h');
			f.setAttribute('class', 'f');
			g.setAttribute('class', 'g');

			const d = data.outbound[i];
			if(!d) {
				h1.innerHTML = '&nbsp;';
				continue;
			}

			h1.textContent = d.distinguish;
			i1.textContent = d.route_a;
			i2.textContent = d.route_b;
			h2.textContent = d.time;
			f.textContent = d.remarks;
			g.textContent = d.button_operation.join(" ");

		}

		// Set the return trip data
		
		this.DOM.return_trip.tbody.innerHTML = '';
		for(let i = 0; i < 16; i++) {
			
			let row = this.DOM.return_trip.tbody.insertRow();
			let h1 = row.insertCell();
			let i1 = row.insertCell();
			let i2 = row.insertCell();
			let h2 = row.insertCell();
			let f = row.insertCell();
			let g = row.insertCell();

			h1.setAttribute('class', 'h');
			i1.setAttribute('class', 'i');
			i2.setAttribute('class', 'i');
			h2.setAttribute('class', 'h');
			f.setAttribute('class', 'f');
			g.setAttribute('class', 'g');

			const d = data.return_trip[i];
			if(!d) {
				h1.innerHTML = '&nbsp;';
				continue;
			}

			h1.textContent = d.distinguish;
			i1.textContent = d.route_a;
			i2.textContent = d.route_b;
			h2.textContent = d.time;
			f.textContent = d.remarks;
			g.textContent = d.button_operation.join(" ");

		}

		return false;

	}

}).apply({});

"use strict";

const SessionManager = (function() {

	this.MEM = {}

	this.DOM = {}

	this.EVT = {}

	this.API = {
		uploadPDF : api_uploadPDF.bind(this)
	}

	init.apply(this);
	return this;

	function init() {

		this.MEM.db = localforage;

	}

	function api_uploadPDF() {


		return new Promise( async (resolve, reject) => {

			// For now as a test, we will try reading the sample 'untenkiroku'
			
			let src = 'docs/unten_kiroku.pdf';
			let doc;
			try {
				doc = await this.MEM.db.getItem(src);
			} catch(err) {
				throw err;
			}

			console.log(doc);

			// Upload the things to the form

			let form = new FormData();
			var fileOfBlob = new File([doc], 'filename_aaa.pdf');

			let args = JSON.stringify({
				type : 'pdf',
				location : '20210507/truck_005/'
			});
			form.append('args', args);
			form.append('pdf', fileOfBlob);

			let ajax = new XMLHttpRequest();
			ajax.open('POST', '/api/v1/upload');
			ajax.send(form);

			ajax.onload = () => {
				
				console.log(ajax.responseText);
				resolve();

			}

		});

	}

}).apply({});

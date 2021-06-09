"use strict";

const fs = require('fs');
const cpr = require('cpr');
const html = require('node-html-parser');
const UglifyJS = require('uglify-es');
const uniqid = require('uniqid');
const minify = require('minify');


const HEADER = `
/**
 * Copyright 2021 Web Service Development Inc.
 * All Rights Reserved
 **/

// console.log = function() {}
`;


!function() {

	console.log("let's go!!!");
	buildClient();

}();

/**
 * Generate the iPad Client
 **/

async function buildClient() {

	let start, path, dir, max;

	const version_debug = {};

	// First we need to look at the existing folders 
	// and create a new one to hold our client data

	path = 'public/client/';
	dir = fs.readdirSync(path);

	start = 0;
	dir.forEach( folder => {
		let num = parseInt(folder);
		if(num > start) {
			start = num;
		}
	});
	start++;

	let version = start.toString();
	while(version.length < 3) {
		version = '0' + version;
	}
	version_debug.production = version;
	
	const dst = 'public/client/' + version + '/';

	// Grab the viewer

	path = '/opt/AptanaJaxer/public/pdf/viewer/';
	let viewer = path + getLatest(path);
	version_debug.viewer = viewer.split('/').pop();
	console.log(viewer);

	// Grab the tachograph
	
	path = '/opt/AptanaJaxer/public/daily_report_1/';
	let graph = path + getLatest(path);
	version_debug.graph = graph.split('/').pop();
	console.log(graph);

	// Grab the outline
	
	path = '/opt/AptanaJaxer/public/table/';
	let app = path + getLatest(path);
	version_debug.app = app.split('/').pop();
	console.log(app);

	let parts = minimize(app, version_debug);

	const minify_options = {
		html: {
			removeAttributeQuotes: false,
			removeOptionalTags: false
		},
		css: {
			compatibility: '*'
		}
	};

	fs.mkdirSync(dst);
	fs.mkdirSync(dst + 'js');
	fs.mkdirSync(dst + 'docs');
	
	fs.writeFileSync(dst + 'index.html', parts.index);
	minify(dst + 'index.html', minify_options).then(function(res){
		fs.writeFileSync(dst + 'index.html', res);
	}).catch(console.error);

	fs.writeFileSync(dst + 'js/app.min.js', parts.js);

	cpr(app + '/css', dst + 'css', function(err, files) {
		for(let i = 0; i < files.length; i++) {
			if(files[i].indexOf('.css') === -1) {
				continue;
			}

			if(files[i].indexOf('.swp') !== -1) {
				continue;
			}

			minify(files[i], minify_options).then(function(res) {
				fs.writeFileSync(this, res);
			}.bind(files[i])).catch(console.error);

		}
	});

	cpr(app + '/img', dst + 'img', function(err, files) {
		for(let i = 0; i < files.length; i++) {
			// minify(files[i], minify_options).then().catch(console.error);
		}
	});

	cpr(graph, dst + 'mod_graph', function(err, files) {
		// console.log(files);
	});

	cpr(viewer, dst + 'mod_viewer', function(err, files) {
		// console.log(files);
	});

	// Copy over docs for testing, this will be changed in production

	cpr(app + '/docs', dst + 'docs', function(err, files) {
		// console.log(files);
	});

}

/**
 * Get the latest version
 **/

function getLatest(path, debug) {
	
	let str;
	let max = 0;
	let dir = fs.readdirSync(path);


	dir.forEach( folder => {
		if(!fs.lstatSync(path + folder).isDirectory()) {
			return;
		}
		
		let num = parseInt(folder);
		if(debug) {
			console.log(num);
		}

		if(num > max) {
			max = num;
			str = folder;
		}

	});

	return str;

}

/**
 * Minimize the provided Index
 **/

function minimize(path, version_debug) {

	path += '/';
	const index = fs.readFileSync(path + 'index.html');
	const root = html.parse(index.toString());

	// iFrame Sources

	let report = root.querySelector('#DailyReport');
	report.setAttribute('src', '/pt01/mod_graph/');
	report.removeAttribute('id');

	let viewer = root.querySelector("[id='PdfManager.iframe']")
	viewer.setAttribute('src', '/pt01/mod_viewer/');

	// Set Versions

	let version_a = root.querySelector("[id='ServiceWorker.version.production']")
	version_a.textContent = version_debug.production;

	let version_b = root.querySelector("[id='ServiceWorker.version.top']")
	version_b.textContent = version_debug.app;

	let version_c = root.querySelector("[id='ServiceWorker.version.pdf']")
	version_c.textContent = version_debug.viewer;

	let version_d = root.querySelector("[id='ServiceWorker.version.tacho']")
	version_d.textContent = version_debug.graph;

	// Minimize the Scripts

	let scripts = root.querySelectorAll('script');
	let srcs = [];
	
	for(let i = 0; i < scripts.length; i++) {
		let src = scripts[i].getAttribute('src');
		srcs.push(path + src);
	}
	
	let last = scripts.pop();
	last.setAttribute('src', 'js/app.min.js');

	for(let i = 0; i < scripts.length; i++) {
		scripts[i].parentNode.removeChild(scripts[i]);
	}

	let code = '';
	let pattern = /\(([^)]+)\)/;
	srcs.forEach ( src => {
		console.log(src);

		let js = fs.readFileSync(src).toString();
		let lines = js.split('\n');
		
		for(let i = 0; i < lines.length; i++) {
			if(lines[i].indexOf('this.EVT') !== -1) {
				break;
			}

			if(lines[i].indexOf('document.getElementById') === -1) {
				continue;
			}

			let id = pattern.exec(lines[i])[1];
			id = id.replace(/['"]+/g, '');
			
			let new_id = uniqid();
			let elem = root.querySelector('[id="' + id + '"]');
			
			if(elem) {
				elem.setAttribute('id', new_id);
				lines[i] = lines[i].replace(id, new_id);
			}

		}

		code += lines.join('\n');
	});

	let options = { 
		toplevel: true,
		output : {
			beautify: false,
			preamble: HEADER
		}
	};

	let minjs = UglifyJS.minify(code, options).code;

	let str = root.toString();
	str = str.replace(/\<textarea\>/g, '<textarea></textarea>');

	return {
		'js' : minjs,
		'index' : str
	}

}

"use strict";

const express = require('express')
const app = express()
const port = 3000

app.get('*', function(req, res, next) {
	
	console.log(req.url);
	let parts = req.url.split('/');
	switch(parts[1]) {
	case 'record':
	case 'status':
	case 'tracker':

		break;
	default:
		req.url = '/paper' + req.url
		break;
	}

	next();
});

app.use(express.static('public'))
app.listen(port, () => {
  console.log(`PaperDriver listening at http://localhost:${port}`)
})


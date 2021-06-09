/*
* Copyright 2021 Web Service Development Inc.
*/
'use strict';

_core.setCreateTableInDrive (
 (parent) => {

	const className = "drive-area";
	let width = 70;

	let span = document.createElement("span");
	span.setAttribute("class", className);
	parent.appendChild(span);

	let t = document.createElement("table");
	t.setAttribute("class", className);
	span.appendChild(t);

	let tb =  document.createElement("tbody");
	t.appendChild(tb);

	let i,tr,td ,s,id;

// 1段目
	tr = _addTrByClass(tb,  className);
	

	let max = 12;

	for(i=0;i<max;i++) {
		_addTdById(tr, className, "drive_plan_"+i, width);
	}

	return;

	function _addTrByClass(tb, _class){
		let tr =  document.createElement("tr");
		tr.setAttribute("class", _class);
		tb.appendChild(tr);

		return tr;
	}

	function _addThByString(tr, _class, str){
		let th =  document.createElement("th");
		th.setAttribute("class", _class);
		th.innerText = str;
		tr.appendChild(th);
	}

	function _addTdByString(tr, _class, str, width){
		let td =  document.createElement("td");
		td.setAttribute("class", _class);
		td.innerText = str;
		td.style.width = width+"px";
		tr.appendChild(td);
	}

	function _addTdById(tr, _class, id, width){
		let td =  document.createElement("td");
		td.setAttribute("id", id);
		td.setAttribute("class", _class);
		td.style.width = width+"px";
		tr.appendChild(td);
	}

	function _addTdByColspan(tr){
		let td =  document.createElement("td");
		td.setAttribute("colspan", 4);
		tr.appendChild(td);
	}
 }
);


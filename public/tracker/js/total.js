/*
* Copyright 2021 Web Service Development Inc.
*/

'use strict';

_core.setCreateTableInTotal (
 (parent, num) => {

	
	const className_left = "total-area-left";
	const className = "total-area";

	this.totalTable = [];

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
	
	let str = [
		"運転",
		"運転外実務",
		"休憩・仮眠",
		"その他",
		"待機",
		"休息",
		"労働時間合計",
		"拘束時間合計",
		"連続運転超過",
		"附帯作業"
	];

	s = "";
	_addThByString(tr, className_left, s)

	for(i in str) {
		_addThByString(tr, className, str[i])
	}

// 2段目
	tr = _addTrByClass(tb,  className);
	
	s = "指示";
	_addThByString(tr, className_left, s);

	let plan_id = [
		"plan-driving"+num,
		"plan-practice"+num,
		"plan-rest"+num,
		"plan-other"+num,
		"plan-standby"+num,
		"plan-longrest"+num,
		"plan-work-total"+num,
		"plan-restraint-total"+num,
		"plan-continuous-operation-overtime"+num,
		"plan-attendant_work"+num
	];

	

	for(i in plan_id) {
		_addTdById(tr, className, plan_id[i]);
	}

// 3段目
	tr = _addTrByClass(tb,  className);

	let result_id = [
		"result-driving"+num,
		"result-practice"+num,
		"result-rest"+num,
		"result-other"+num,
		"result-standby"+num,
		"result-longrest"+num,
		"result-work-total"+num,
		"result-restraint-total"+num,
		"result-continuous-operation-overtime"+num,
		"result-attendant_work"+num
	];

	s = "実績(日報)";
	_addThByString(tr, className_left, s);


	for(i in result_id) {
		_addTdById(tr, className, result_id[i]);
	}

	this.totalTable.plan_id = plan_id;
	this.totalTable.result_id = result_id;
	this.totalTable.plan = [];
	this.totalTable.result = [];
	this.totalTable.init = _init.bind(this,this.totalTable.plan_id, this.totalTable.result_id, this.totalTable.plan, this.totalTable.result);

	this.totalTable.reinit = _reinit.bind(this.totalTable.plan, this.totalTable.result);

	return this.totalTable;

	function _reinit (plan,result) {

		let i,elm;
		for(i in plan) {
			elm = plan[i];
			elm.innerText="00:00";
		}
		for(i in result) {
			elm = result[i];
			elm.innerText="00:00";
		}
		
	}

	function _init (plan_id,result_id, plan,result) {

		let i,elm;
		for(i in plan_id) {
			elm = plan[i] = document.getElementById(plan_id[i])
			elm.innerText="00:00";
		}
		for(i in result_id) {
			elm = result[i] = document.getElementById(result_id[i])
			elm.innerText="00:00";
		}
		
	}

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

	function _addTdByString(tr, _class, str){
		let td =  document.createElement("td");
		td.setAttribute("class", _class);
		td.innerText = str;
		tr.appendChild(td);
	}

	function _addTdById(tr, _class, id){
		let td =  document.createElement("td");
		td.setAttribute("id", id);
		td.setAttribute("class", _class);
		tr.appendChild(td);
	}

	function _addTdByColspan(tr){
		let td =  document.createElement("td");
		td.setAttribute("colspan", 4);
		tr.appendChild(td);
	}
 }
);


/*
* 計画データをtableに表示
*/
_core.setDrawTablePlanTimes (
 (data) => {

	let time ,id, num;

	num = 0;


	time = data.work_1;
	id = "plan-driving"+num;
	_printTdById(id, time );

	time = data.work_2;
	id = "plan-practice"+num;
	_printTdById(id, time );

	time = data.work_3;
	id = "plan-rest"+num;
	_printTdById(id, time );

	time = data.other;
	id = "plan-other"+num;
	_printTdById(id, time );

	time = data.attendant_work;
	id = "attendant_work";
	_printTdById(id, time );

	time = data.standby;
	id = "plan-standby"+num;
	_printTdById(id, time );

	time = data.rest;
	id = "plan-longrest"+num,
	_printTdById(id, time );

	time = data.work_total;
	id = "plan-work-total"+num,
	_printTdById(id, time );

	time = data.longrest;
	id = "plan-longrest"+num;
	_printTdById(id, time );

	time = data.restraint_total;
	id = "plan-restraint-total"+num;
	_printTdById(id, time );

	time = data.continuous_operation_overtime;
	id = "plan-continuous-operation-overtime"+num;
	_printTdById(id, time );

	time = data.attendant_work;
	id = "plan-attendant_work"+num;
	_printTdById(id, time );


	return;

	function _printTdById(id, time ){
		let td =  document.createElement("td");
		let t = time.split(":");
		td.textContent = t[0]+"時間 "+ t[1]+"分";
	}
 }
);

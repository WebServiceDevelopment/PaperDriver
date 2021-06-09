/*
* Copyright 2021 Web Service Development Inc.
*/
'use strict';

const OUTSTOCK 	= "outstock";

const DEBUG 	= 0;
const DEBUG_2 	= 0;
const DEBUG_4 	= 0;
const DEBUG_5 	= 0;
/*
* For windows 
*/

_core.event.setFunctions(
 (it, api) => {

//let api = it.api;

//console.log("className="+document.documentElement.className+":");
if(document.documentElement.className == "") {

// plan
 api.addPlanLineClick(
 (event) => {
        (DEBUG) ?  console.log("Click="+event.target.id): void(0);
	let obj = event.target;
        console.log( "dateNumber:"+obj.lineAttribute.dateNumber +
                "workNumber:" +obj.lineAttribute.workNumber +
                "begin:"+obj.lineAttribute.begin +
                "end:"+obj.lineAttribute.end +
                "plan_result:"+obj.lineAttribute.plan_result +
                "lineNumber:"+obj.lineAttribute.lineNumber
                );
 }
 );

 api.addPlanLineMouseover(
 (event) => {
        (DEBUG) ?  console.log("Mouseover="+event.target.id): void(0);
 }
 );

 api.addPlanLineMouseout(
 (event) => {
        (DEBUG) ?  console.log("Mouseout="+event.target.id): void(0);

	_api_upLine(event);
 }
 );

 api.addPlanLineMousemove(
 (event) => {
        (DEBUG) ?  console.log("Mousemove="+event.target.id): void(0);
 }
 );

 api.addPlanLineMousedown(
 (event) => {
        (DEBUG) ?  console.log("Mousedown="+event.target.id): void(0);

	_api_downLine(event);
 }
 );

 api.addPlanLineMouseup(
 (event) => {
        (DEBUG) ?  console.log("Mouseup="+event.target.id): void(0);

	_api_upLine(event);
 }
 );


// result
 api.addResultLineClick(
 (event) => {
        (DEBUG) ?  console.log("Click="+event.target.id): void(0);
 }
 );

 api.addResultLineMouseover(
 (event) => {
        (DEBUG) ?  console.log("Mouseover="+event.target.id): void(0);
 }
 );

 api.addResultLineMouseout(
 (event) => {
        (DEBUG) ?  console.log("Mouseout="+event.target.id): void(0);
 }
 );

 api.addResultLineMousemove(
 (event) => {
        (DEBUG) ?  console.log("Mousemove="+event.target.id): void(0);
 }
 );


 api.addResultLineMousedown(
 (event) => {
        (DEBUG) ?  console.log("Mousedown="+event.target.id): void(0);
 }
 );

 api.addResultLineMouseup(
 (event) => {
        (DEBUG) ?  console.log("Mouseup="+event.target.id): void(0);
 }
 );


// work
 api.addWorkLineClick(
 (event) => {
        (DEBUG) ?  console.log("Click="+event.target.id): void(0);
 }
 );

 api.addWorkLineMouseover(
 (event) => {
        (DEBUG) ?  console.log("Mouseover="+event.target.id): void(0);
 }
 );

 api.addWorkLineMouseout(
 (event) => {
        (DEBUG) ?  console.log("Mouseout="+event.target.id): void(0);
 }
 );

 api.addWorkLineMousemove(
 (event) => {
        (DEBUG) ?  console.log("Mousemove="+event.target.id): void(0);
 }
 );

 api.addWorkLineMousedown( 
 (event) => {
        (DEBUG) ?  console.log("Mousedown="+event.target.id): void(0);

	_api_down(event);
 }
 );

 api.addWorkLineMouseup(
 (event) => {
        (DEBUG) ?  console.log("Mouseup="+event.target.id): void(0);
	_api_up(event);
 }
  );


} else {

/*
* For iPad 
*/
// plan
 api.addPlanLineTouchmove (
 (event) => {
	event.preventDefault();
	(DEBUG_2) ? alert("addPlanLineTouchmove"): void(0);
	(DEBUG) ?  console.log("Touchmove="+event.target.id): void(0);
 }
 );

 api.addPlanLineTouchstart (
 (event) => {
	event.preventDefault();
	(DEBUG_2) ? alert("addPlanLineTouchstart"): void(0);
        (DEBUG) ?  console.log("Touchstart="+event.target.id): void(0);

	_api_downLine(event);
 }
 );

 api.addPlanLineTouchend (
 (event) => {
	event.preventDefault();
	(DEBUG_2) ? alert("addPlanLineTouchend"): void(0);
        (DEBUG) ?  console.log("Touchend="+event.target.id): void(0);

	_api_upLine(event);
 }
 );


// result
 api.addResultLineTouchmove (
 (event) => {
	event.preventDefault();
	(DEBUG_2) ? event.preventDefault(): void(0);
	(DEBUG) ?  console.log("Touchmove="+event.target.id): void(0);
 }
 );

 api.addResultLineTouchstart (
 (event) => {
	event.preventDefault();
	(DEBUG_2) ? event.preventDefault(): void(0);
        (DEBUG) ?  console.log("Touchstart="+event.target.id): void(0);
 }
 );

 api.addResultLineTouchend (
 (event) => {
	event.preventDefault();
	(DEBUG_2) ? event.preventDefault(): void(0);
        (DEBUG) ?  console.log("Touchend="+event.target.id): void(0);
 }
 );


// work
 api.addWorkLineTouchmove (
 (event) => {
	event.preventDefault();
	(DEBUG_2) ? event.preventDefault(): void(0);
	(DEBUG) ?  console.log("Touchmove="+event.target.id): void(0);
 }
 );


 api.addWorkLineTouchstart ( _api_down );

 api.addWorkLineTouchend ( _api_up );
}

 return;


 function _api_down (event) {
	let obj = event.target.areaAttribute;

/*
        console.log( "dateNumber:"+obj.dateNumber +
                "workNumber:" +obj.workNumber +
                "areaNumber:"+obj.areaNumber
                );
*/

	let visibility = 'hidden';

//選択したcellの背景の操作
	it.api.setAreaBackgroundColor (
		event.target, 
		visibility
	);

//運行情報
	it.api.setTransitionPointsVisibility (
		obj.dateNumber, 
		obj.workNumber , 
		visibility
	) ;
	//console.log(this.toString());

	let id,elm, prefix;

	visibility = "visible"; 

	switch(obj.workTime_area) {
	case true:
		//console.log("obj.workTime_area = true");
		prefix = "total";
		_vis(obj, prefix, visibility) ;

	break;
	default:
/*
		console.log("obj.workTime_area = null");
		console.log("obj.workNumber ="+obj.workNumber);
		console.log("obj.areaNumber ="+obj.areaNumber);
*/

		prefix = "drive";
		_vis(obj, prefix, visibility) ;

		switch(obj.workNumber) {
		case 0:
			it.api.setDriveTransitionPointsVisibility (
				obj.dateNumber, 
				obj.workNumber , 
				visibility
			) ;
		break;
		case 1:
			it.api.setPracticeTransitionPointsVisibility (
				obj.dateNumber, 
				obj.workNumber , 
				visibility
			) ;
		break;
		case 2:
			it.api.setRestTransitionPointsVisibility (
				obj.dateNumber, 
				obj.workNumber , 
				visibility
			) ;
		break;
		case 3:
			it.api.setOtherTransitionPointsVisibility (
				obj.dateNumber, 
				obj.workNumber , 
				visibility
			) ;
		break;
		case 4:
			it.api.setLongrestTransitionPointsVisibility (
				obj.dateNumber, 
				obj.workNumber , 
				visibility
			) ;
		break;
		default:
		break;
		}
	break;
	}

	return;
	function _vis(obj, prefix, visibility) {
		let id = prefix+(obj.dateNumber+1);
		elm = document.getElementById(id);
		elm.style.visibility = visibility; 
	}
 }


 function _api_up (event) {
	let obj = event.target.areaAttribute;

/*
        console.log( "dateNumber:"+obj.dateNumber +
                "workNumber:" +obj.workNumber +
                "areaNumber:"+obj.areaNumber
                );
*/

	let visibility = 'visible';

//選択したcellの背景の操作
	it.api.setAreaBackgroundColor (
		event.target, 
		visibility
	);

//運行情報
	it.api.setTransitionPointsVisibility (
		obj.dateNumber, 
		obj.workNumber , 
		visibility
	) ;

	let id,elm, prefix;

	visibility = "hidden"; 

	switch(obj.workTime_area) {
	case true:
		//console.log("obj.workTime_area = true");
		prefix = "total";
		_vis(obj, prefix, visibility) ;
	break;
	default:
		//console.log("obj.workTime_area = null");
/*
		console.log("obj.dateNumber ="+obj.dateNumber);
		console.log("obj.workNumber ="+obj.workNumber);
		console.log("obj.areaNumber ="+obj.areaNumber);
*/

		prefix = "drive";
		_vis(obj, prefix, visibility) ;

		switch(obj.workNumber) {
		case 0:
			it.api.setDriveTransitionPointsVisibility (
				obj.dateNumber, 
				obj.workNumber , 
				visibility
			) ;
		break;
		case 1:
			it.api.setPracticeTransitionPointsVisibility (
				obj.dateNumber, 
				obj.workNumber , 
				visibility
			) ;
		break;
		case 2:
			it.api.setRestTransitionPointsVisibility (
				obj.dateNumber, 
				obj.workNumber , 
				visibility
			) ;
		break;
		case 3:
			it.api.setOtherTransitionPointsVisibility (
				obj.dateNumber, 
				obj.workNumber , 
				visibility
			) ;
		break;
		case 4:
			it.api.setLongrestTransitionPointsVisibility (
				obj.dateNumber, 
				obj.workNumber , 
				visibility
			) ;
		break;
		default:
		break;
		}
	break;
	}

	return;
	function _vis(obj, prefix, visibility) {
		let id = prefix+(obj.dateNumber+1);
		elm = document.getElementById(id);
		elm.style.visibility = visibility; 
	}
 }

 function _api_downLine (event) {
	let obj = event.target.lineAttribute;

/*
        console.log( "dateNumber:"+obj.dateNumber +
                "workNumber:" +obj.workNumber +
                "lineNumber:"+obj.lineNumber
                );
*/
	let visibility = 'hidden';

	it.api.setTransitionPointsVisibility (
		obj.dateNumber, 
		obj.workNumber , 
		visibility
	) ;

	let mouse_event = 'down';

	it.api.setLineBackgroundColor (
		event.target, 
		mouse_event
	);

	visibility = 'visible';
	it.api.setLineTransitionPointsVisibility (
		obj, 
		visibility
	);

	return;

	function _vis(obj, prefix, visibility) {
		let id = prefix+(obj.dateNumber+1);
		elm = document.getElementById(id);
		elm.style.visibility = visibility; 
	}
 }


 function _api_upLine (event) {
	let obj = event.target.lineAttribute;

/*
        console.log( "dateNumber:"+obj.dateNumber +
                "workNumber:" +obj.workNumber +
                "lineNumber:"+obj.lineNumber
                );
*/
	let visibility = 'visible';

	it.api.setTransitionPointsVisibility (
		obj.dateNumber, 
		obj.workNumber , 
		visibility
	) ;

	let mouse_event = 'up';

	it.api.setLineBackgroundColor (
		event.target, 
		mouse_event
	);

	visibility = 'hidden';
	it.api.setLineTransitionPointsVisibility (
		obj, 
		visibility
	);

	return;

	function _vis(obj, prefix, visibility) {
		let id = prefix+(obj.dateNumber+1);
		elm = document.getElementById(id);
		elm.style.visibility = visibility; 
	}
 }

}
);



_core.touch.setFunctions(
 (it, api) => {

//let api = it.api;

//console.log("className="+document.documentElement.className+":");
if(document.documentElement.className == "") {
// plan
 api.addJobLineClick(
 (event) => {
        (DEBUG_4) ?  console.log("Click="+event.target.id): void(0);

 }
 );

 api.addJobLineMouseover(
 (event) => {
        (DEBUG_4) ?  console.log("Mouseover="+event.target.id): void(0);
 }
 );

 api.addJobLineMouseout(
 (event) => {
        (DEBUG_4) ?  console.log("Mouseout="+event.target.id): void(0);

	_touch_up(event);
 }
 );

 api.addJobLineMousemove(
 (event) => {
        (DEBUG_4) ?  console.log("Mousemove="+event.target.id): void(0);
 }
 );

 var timeoutID = null;

 api.addJobLineMousedown(
 (event) => {

	timeoutID = setTimeout( _result_do.bind(null,event),it.touch.timeout);
 }
 );

 api.addJobLineMouseup(
 (event) => {
	let target = event.target;

	window.clearTimeout(timeoutID);

        (DEBUG_4) ?  console.log("Mouseup="+event.target.id): void(0);

	_touch_up(event, it);
 }
 );


// ststus_view
 api.addStatusViewMouseup(
 (event) => {
        (DEBUG_4) ?  console.log("Mouseup="+event.target.id): void(0);

	let status = it.touch.getStatus();
	(DEBUG_4) ? console.log("status="+status): void(0);

	switch(status) {
	case OUTSTOCK:
	break;
	default:
		return;
	}
	_api_view_touchstart(event);
 }
 );

 api.addStatusViewMousedown(
 (event) => {
        (DEBUG_4) ?  console.log("Mousedown="+event.target.id): void(0);

	let status = it.touch.getStatus();
	(DEBUG_4) ? console.log("status="+status): void(0);

	switch(status) {
	case OUTSTOCK:
	break;
	default:
		return;
	}
	_api_view_touchend(event);
 }
 );

} else {

 var timeoutID = null;
/*
* For iPad 
*/
// plan
 api.addJobLineTouchmove (
 (event) => {

	event.preventDefault();

	(DEBUG_4) ? alert("addJobLineTouchmove"): void(0);
	(DEBUG_5) ?  console.log("Touchmove="+event.target.id): void(0);
 }
 );

 api.addJobLineTouchstart (
 (event) => {

	event.preventDefault();
	timeoutID = setTimeout( _result_do.bind(null,event),it.touch.timeout);
 }
 );

 api.addJobLineTouchend (
 (event) => {
	event.preventDefault();

	(DEBUG_4) ? alert("addJObLineTouchend"): void(0);
        (DEBUG_5) ?  console.log("Touchend="+event.target.id): void(0);

	window.clearTimeout(timeoutID);

	_touch_up(event, it);
 }
 );


// status_view
 api.addStatusViewTouchstart (
 (event) => {
	event.preventDefault();
	(DEBUG_2) ? alert("addViewTouchstart"): void(0);
        (DEBUG_4) ?  console.log("Touchstart="+event.target.id): void(0);

	let status = it.touch.getStatus();
	(DEBUG_4) ? console.log("status="+status): void(0);

	switch(status) {
	case OUTSTOCK:
	break;
	default:
		return;
	}

	_api_view_touchstart(event);
 }
 );

 api.addStatusViewTouchend (
 (event) => {
	event.preventDefault();
	(DEBUG_2) ? alert("addViewTouchend"): void(0);
        (DEBUG_4) ?  console.log("Touchend="+event.target.id): void(0);

	let status = it.touch.getStatus();
	(DEBUG_4) ? console.log("status="+status): void(0);

	switch(status) {
	case OUTSTOCK:
	break;
	default:
		return;
	}
	_api_view_touchend(event);
 }
 );

}

 return;

 function _api_view_touchstart(event) {
	console.log(" _api_status_view_touchstart");
 }

 function _api_view_touchend(event) {
	console.log(" _api_status_view_touchend");
 }


/*
"outstock", "instock", "inspection", "other", "loading",
	"attendant_work",
        "unloading", "longrest", "standby", "drive", "ferry"
*/

 function _touch_down(event, it) {

	let target = event.target;
	let elm;
	let j_elm = it.jobStatus.getJObStatusElement();

        (DEBUG_5) ? console.log( "down id=:"+target.id ): void(0);

	switch(target.id) {
	case "outstock" : // 出庫
		elm = document.getElementById("outstock");
		elm.innerText = "走行";

		j_elm.innerText = "走 行 中";
	break;
	case "instock" : //入庫
		elm = document.getElementById("outstock");
		elm.innerText = "出 庫";

		j_elm.innerText = "停 止 中";
	break;
	case "inspection" :
		j_elm.innerText = "点 検 中";
	break;
	case "other" :
		j_elm.innerText = "そ の 他";
	break;
	case "attendant_work" :
		j_elm.innerText = "附帯作業";
	break;
	case "loading" :
		j_elm.innerText = "荷 積 中";
	break;
	case "unloading" :
		j_elm.innerText = "荷 卸 中";
	break;
	case "longrest" :
		j_elm.innerText = "休憩/休息 中";
	break;
	case "standby" :
		j_elm.innerText = "待 機 中";
	break;
	case "ferry" :
		j_elm.innerText = "フェリー乗船";
	break;
	default:
	break;
	}

	return elm;

	function _vis(obj, prefix, visibility) {
		let id = prefix+(obj.dateNumber+1);
		elm = document.getElementById(id);
		elm.style.visibility = visibility; 
	}
 }


 function _touch_up(event, it) {
	let target = event.target;

        (DEBUG_5) ? console.log( "up id=:"+target.id ): void(0);
	switch(target.id) {
	case "outstock" :// 出庫
	break;
	case "instock" ://入庫
	break;
	case "inspection" :
	break;
	case "attendant_work" :// 附帯作業
	break;
	case "other" :
	break;
	case "loading" :
	break;
	case "unloading" :
	break;
	case "longrest" :
	break;
	case "standby" :
	break;
	case "ferry" :
	break;
	default:
	break;
	}

	return;

	function _vis(obj, prefix, visibility) {
		let id = prefix+(obj.dateNumber+1);
		elm = document.getElementById(id);
		elm.style.visibility = visibility; 
	}
 }


 function  _result_do(event){
	const HOLDING = "holding";
	const OUTSTOCK = "outstock";
	const INSTOCK = "instock";

//
// 作業経過時間のインターバルの無効化
//

	let now = Date.now();
	
	let target = event.target;
	let touch = it.touch;

	let elm = document.getElementById(target.id);
	let status = touch.getStatus();
	let o_elm;
	let rt;


//
// 入庫時の確認
//
	switch(target.id) {
	case INSTOCK :
		let jobStatus = _core.jobStatus;
		if( jobStatus.getOutstockBeginTime() == null) {
			if(DEBUG_5) console.log("出庫していないなら入庫>出来ない");
			return;
		}
		if(DEBUG_5) console.log("出庫しているので入庫出来る");


		rt =  window.confirm("業務を終了しますか？");
		if(rt == true) {
		} else {
			return;
		}
	}


	// 連続して同じ操作ボタンは押せない
	if(status == target.id) {
		return;
	}
	//console.log(status +":"+ target.id);

	it.jobStatus.clearInterval();


	if(status == null ) {
		let jobStatus = _core.jobStatus;

		//
		// 出庫登録（作業開始）
		//
		jobStatus.setOutstockBeginTime(now);


		it.touch.setStatus(target.id);
		elm.classList.add( HOLDING );

		switch(target.id) {
		case OUTSTOCK :
			rt = it.resultInterface("driving", status, now);
		break;
		case INSTOCK:
			console.log("Error : INSTOCK 1");
		break;
		default:
			rt = it.resultInterface(target.id, status, now);
		break;
		}

	} else if (status == target.id) {

		switch(target.id) {
		case OUTSTOCK :
			rt = it.resultInterface("driving", status, now);

			it.touch.setStatus(target.id);

		break;
		case INSTOCK:
			console.log("Error : INSTOCK 2");
		break;
		default:
			rt = it.resultInterface("driving", status, now);

			elm.classList.remove( HOLDING );
			
			it.touch.setStatus( OUTSTOCK );
			elm = document.getElementById( OUTSTOCK );
			elm.classList.add( HOLDING );

			if(elm.innerText == "出 庫") {
				elm.innerText = "走 行";
			}

			let j_elm = it.jobStatus.getJObStatusElement();
			j_elm.innerText = "走 行 中";

		return;
		}

	} else {

		switch(target.id) {
		case OUTSTOCK :
			rt = it.resultInterface("driving", status, now);

			it.touch.setStatus(target.id);
			elm.classList.add( HOLDING );

		break;
		case INSTOCK:
			let jobStatus = _core.jobStatus;

			rt = it.resultInterface(target.id, status, now);

			it.touch.setStatus(null);

			o_elm = document.getElementById( OUTSTOCK );
			if(o_elm.classList.contains(HOLDING) == true) {
				o_elm.classList.remove( HOLDING );
			}

			// 出庫時間の初期化
			jobStatus.addOutstockBeginTimes (jobStatus.getOutstockBeginTime ());
			jobStatus.initOutstockBeginTime ();

		break;
		default:
			rt = it.resultInterface(target.id, status, now);

			it.touch.setStatus(target.id);
			elm.classList.add( HOLDING );


			o_elm = document.getElementById( OUTSTOCK );
			if(o_elm.classList.contains(HOLDING) == true) {
				o_elm.classList.remove( HOLDING );
			}

		break;
		}

		elm = document.getElementById(status);
		elm.classList.remove( HOLDING );

	}

//
// 作業経過時間のインターバルの登録
//
	it.jobStatus.setInterval(rt);
	
        (DEBUG_4) ?  console.log("Mousedown="+event.target.id): void(0);

	_touch_down(event, it);

 }

}
);



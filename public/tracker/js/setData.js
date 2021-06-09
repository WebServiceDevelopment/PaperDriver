/*
* Copyright 2021 Web Service Development Inc.
*/
'use strict';

const DEBUG_20 = 0;

/*
* 計画、経過 データの表示
*
*------------------------------------------------------------------------------
* 日付
* this.setMonthDates(
*			yyyy,
*			mm,
*			dd,
*			times //何日表示するか
*			);
*
*
*------------------------------------------------------------------------------
* 計画データ
*  var Plans = [
*	{dateNumber: 0, // 1日目:0, 2日目:1, 3日目:2
*	 workNumber: 1, // 運転:0, 運転外実務:1, 休息・仮眠:2, その他:3, 休息時間:4
*	begin:"7:30", //開始時間
*	end:"8:00", //終了時間
*	string // 表示文字
*	},
* ]
*
*------------------------------------------------------------------------------
* 経過データ
* var Results = [
*  	{dateNumber: 0,// 1日目:0, 2日目:1, 3日目:2
*	 workNumber: 1,//　運転:0, 運転外実務:1, 休息・仮眠:2, その他:3, 休息時間:4
*	begin:"7:30", //開始時間
*	end:"8:00" //終了時間
*	},
* ]
*
*
*------------------------------------------------------------------------------
*
*
* 経過地点データ
* var TransitionPoints = [
*  	{dateNumber: 0, // 1日目:0, 2日目:1, 3日目:2
*	 workNumber: 1, //　運転:0, 運転外実務:1, 休息・仮眠:2, その他:3, 休息時間:4
*	begin:"7:30", //開始時間
*	string:"", // 表示文字
*	up_down:0, //上三角 :0, 下三角:1
* 	fill: false //塗りつぶし三角 :true, 塗りつぶし無し三角: false
*
*/
_core.addSetData(
 function (api) {
 	const ROW_MAX = 40;
   	const COL_MAX = 8;

	_core.view_change = new _view_change_class(ROW_MAX, COL_MAX);

	// 日付
	api.setMonthDates("2021","2","27")

/*
	// 計画データ
	var Plans = [
  		{dateNumber: 0, workNumber: 1, begin:"3:10", end:"3:30", string:"",info:"点検","loading":""},
  		{dateNumber: 0, workNumber: 0, begin:"3:25", end:"7:00", string:"",info:"井上運送本社～長泉沼津IC～刈谷PA","loading":""},
  		{dateNumber: 0, workNumber: 1, begin:"7:00", end:"7:05",info:"作業"},
  		{dateNumber: 0, workNumber: 2, begin:"7:05", end:"7:35", string:"",info:"休憩","loading":""},
  		{dateNumber: 0, workNumber: 0, begin:"7:35", end:"8:10",info:"刈谷PA～湾岸長嶋PA"},
  		{dateNumber: 0, workNumber: 2, begin:"8:10", end:"9:10", string:"",info:"休憩","loading":""},
  		{dateNumber: 0, workNumber: 0, begin:"9:10", end:"9:45",info:"湾岸長嶋PA～三重川越IC～四日市市東邦町１－２"},
  		{dateNumber: 0, workNumber: 1, begin:"9:45", end:"9:50", loading:"荷卸"},
  		{dateNumber: 0, workNumber: 0, begin:"9:50", end:"9:55",info:"四日市市東邦町１ー２～四日市市東邦町１"},
  		{dateNumber: 0, workNumber: 1, begin:"9:55", end:"10:25", loading:"荷卸"},
  		{dateNumber: 0, workNumber: 0, begin:"10:25", end:"13:30",info:"四日市市東邦町１～三重川越IC～東名日本平"},
  		{dateNumber: 0, workNumber: 2, begin:"13:30", end:"14:00", string:"",info:"休憩","loading":""},
  		{dateNumber: 0, workNumber: 0, begin:"14:00", end:"15:35",info:"東名日本平～裾野IC～小山物流センター"},
  		{dateNumber: 0, workNumber: 1, begin:"15:35", end:"15:45", loading:"荷卸"},
  		{dateNumber: 0, workNumber: 0, begin:"15:45", end:"16:05",info:"小山物流センター～第２危険物倉"},
  		{dateNumber: 0, workNumber: 1, begin:"16:05", end:"16:30",info:"","loading":"荷積"},
  		{dateNumber: 0, workNumber: 0, begin:"16:30", end:"17:00",info:"第２危険物倉庫～井上運送本社"}
	];


	//経過地点データ
	var TransitionPoints = [
		{dateNumber:0, workNumber:1, begin:"3:10", string:"点検", up_down:0, fill:false},
		{dateNumber:0, workNumber:0, begin:"3:25", string:"井上運送本社", up_down:0, fill:false},
		{dateNumber:0, workNumber:0, begin:"4:00", string:"長泉沼津IC", up_down:0, fill:true},
		{dateNumber:0, workNumber:2, begin:"7:05", string:"刈谷PA", up_down:0, fill:1},
		{dateNumber:0, workNumber:2, begin:"08:10", string:"湾岸長嶋PA", up_down:0, fill:true},
		{dateNumber:0, workNumber:0, begin:"9:15", string:"三重川越IC", up_down:0, fill:true},
		{dateNumber:0, workNumber:1, begin:"9:45", string:"四日市市東邦町１－２", up_down:0, fill:false, time_align:"left"},
		{dateNumber:0, workNumber:1, begin:"9:55", string:"四日市市東邦町１", up_down:0, fill:false},
		{dateNumber:0, workNumber:0, begin:"10:55", string:"三重川越IC", up_down:0, fill:true},
		{dateNumber:0,	workNumber:2,	begin:"13:30",	string:"東名日本平",	up_down:0,	fill:true},
		{dateNumber:0, workNumber:0, begin:"14:50", string:"裾野IC", up_down:0, fill:true},
		{dateNumber:0, workNumber:1, begin:"15:35", string:"小山物流センター", up_down:0, fill:false},
		{dateNumber:0, workNumber:0, begin:"15:45", string:"第２危険物倉庫", up_down:0, fill:false},
		{dateNumber:0, workNumber:1, begin:"16:05", string:"山北営業所", up_down:0, fill:false},
		{dateNumber:0, workNumber:0, begin:"17:00", string:"井上運送本社", up_down:0, fill:false}
	];


	//運転データ
	var DriveTransitionPoints = [
  		{dateNumber: 0, workNumber: 0, begin:"3:25", end:"7:00", string:"井上運送本社",fill:true,  time_align:"left"},
  		{dateNumber: 0, workNumber: 0, begin:"7:35", end:"8:10",string:"刈谷PA",fill:true,  time_align:"left"},
  		{dateNumber: 0, workNumber: 0, begin:"9:10", end:"9:45",string:"湾岸長嶋PA",fill:true,  time_align:"left"},
  		{dateNumber: 0, workNumber: 0, begin:"9:50", end:"9:55",string:"四日市市東邦町１ー２",fill:true,  time_align:"left"},
  		{dateNumber: 0, workNumber: 0, begin:"10:25", end:"13:30",string:"四日市市東邦町１",fill:true,  time_align:"left"},
  		{dateNumber: 0, workNumber: 0, begin:"14:00", end:"15:35",string:"東名日本平",fill:true,  time_align:"left"},
  		{dateNumber: 0, workNumber: 0, begin:"15:45", end:"16:05",string:"小山物流センター",fill:true,  time_align:"left"},
  		{dateNumber: 0, workNumber: 0, begin:"16:30", end:"17:00",string:"第２危険物倉庫",fill:true,  time_align:"left"}
	];


	//運転外・実務データ
	var PracticeTransitionPoints = [
		{dateNumber:0, workNumber:1, begin:"3:10", end:"3:25", string:"点検", up_down:0, fill:false, time_align:"left", period:true},
		{dateNumber:0, workNumber:1, begin:"9:45",end:"9:50", string:"荷卸 三菱ガス化学", up_down:0, fill:true , time_align:"left", period:true},
		{dateNumber:0, workNumber:1, begin:"9:55",end:"10:25", string:"荷卸 三菱ガス化学", up_down:0, fill:true , time_align:"left", period:true},
		{dateNumber:0, workNumber:1, begin:"15:35", end:"15:45",string:"荷卸 小山物流センター", up_down:0, fill:true, time_align:"left", period:true},
		{dateNumber:0, workNumber:1, begin:"16:05",end:"16:30", string:"積載 北山営業所", up_down:1, fill:true, time_align:"left", period:true},
	];

	//休憩データ
	var RestTransitionPoints = [
		{dateNumber:0, workNumber:2, begin:"7:05", end:"7:35", string:"刈谷PA", up_down:0, fill:1, time_align:"left", time_align:"left", period:true},
		{dateNumber:0, workNumber:2, begin:"08:10", end:"9:10", string:"湾岸長嶋PA", up_down:0, fill:true, time_align:"left", time_align:"left", period:true},
		{dateNumber:0,	workNumber:2,	begin:"13:30", end:"14:00", string:"東名日本平",	up_down:0,	fill:true,	time_align:"left", time_align:"left", period:true},
	];

	//その他データ
	var OtherTransitionPoints = [
		//{dateNumber:0, workNumber:3, begin:"13:00", string:"フェリー", up_down:0, fill:true},
	];

	//休息データ
	var LongrestTransitionPoints = [
		//{dateNumber:0, workNumber:4, begin:"13:00", string:"休息", up_down:0, fill:true},
	];
*/
	var Plans = [];
	var TransitionPoints = [];
	var DriveTransitionPoints = [];
	var RestTransitionPoints = [];
	var PracticeTransitionPoints = [];
	var OtherTransitionPoints = [];
	var LongrestTransitionPoints = [];

	// 指示データ
	var TablePlan =  {
		'plan-driving':'00:00',
		'plan-practice':'00:00',
		'plan-rest':'00:00',
		'plan-other':'00:00',
		'plan-standby':'00:00',
		'plan-longrest':'00:00',
		'plan-work-total':'00:00',
		'plan-restraint-total':'00:00',
		'plan-continuous-operation-overtime':'00:00',
		'plan-attendant_work':'00:00'
	};


	// 計画データ表示
	api.drawPlanLines(Plans);

	//経過地点データ表示
	api.drawTransitionPoints(TransitionPoints);

	//運転データ表示
	api.drawDriveTransitionPoints(DriveTransitionPoints);

	//実務データ表示
	api.drawPracticeTransitionPoints(PracticeTransitionPoints);

	//休憩データ表示
	api.drawRestTransitionPoints(RestTransitionPoints);

	//その他データ表示
	api.drawOtherTransitionPoints(OtherTransitionPoints);

	//休息データ表示
	api.drawLongrestTransitionPoints(LongrestTransitionPoints);


	//console.log("ResultLineNumber="+this.getResultLineNumber());
	//console.log("BarLineNumber="+this.getBarLineNumber());

	//geoFindMe();

	// 指示データの表示
	api.setTablePlan(TablePlan);

	const spread_options = {
		"max_rows" : ROW_MAX,
		"parent_node_id" : "plan_tbody",
		"cell_class_name" : "cell",
		"cell": 
		[
		{"type":"no","class":"no",}, 
		{"type":"select","class":"a", "change":_change_a,
		"option" : ["","1","2"] },
		{"type":"select","class":"b", "change":_change_b,
		"option" : ["","00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"] },
		{"type":"select","class":"c", "change":_change_c,
		"option" : ["","00","05","10","15","20","25","30","35","40","45","50","55"] },
		{"type":"select","class":"d", "change":_change_d,
		"option" : ["","00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"] },
		{"type":"select","class":"e", "change":_change_e,
		"option" : ["","00","05","10","15","20","25","30","35","40","45","50","55"] },
		{"type":"select","class":"f", "change":_change_f,
		"option" : ["", "出庫", "走行", "入庫", "点検", "待機", "荷積", "荷卸", "休憩", "休息", "附帯作業"], },
		{"type":"input","class":"g", "keyup":_keyup_g},
/*
		{"type":"input","class":"h", "keyup":_keyup_h},
		{"type":"input","class":"i", "keyup":_keyup_i},
		{"type":"checkbox","class":"j1", "keyup":_keyup_j1},
		{"type":"checkbox","class":"j2", "keyup":_keyup_j2},
		{"type":"checkbox","class":"j3", "keyup":_keyup_j3},
		{"type":"checkbox","class":"j4", "keyup":_keyup_j4},
		{"type":"checkbox","class":"j5", "keyup":_keyup_j5}
*/
		],
	}

	_core.spread = new _spread_class(spread_options);

	return ;

	function _keydown_a(args) {
		if(DEBUG_20) console.log("_keydown_a ="+args.row+":"+args.col+":"+args.target.value);
	}

	function _keydown_b(args) {
		if(DEBUG_20) console.log("_keydown_b ="+args.row+":"+args.col+":"+args.target.value);
	}

	function _keydown_c(args) {
		if(DEBUG_20) console.log("_keydown_c ="+args.row+":"+args.col+":"+args.target.value);
	}

	function _keydown_d(args) {
		if(DEBUG_20) console.log("_keydown_d ="+args.row+":"+args.col+":"+args.target.value);
	}

	function _keydown_e(args) {
		if(DEBUG_20) console.log("_keydown_e ="+args.row+":"+args.col+":"+args.target.value);
	}

	function _keydown_f(args) {
		if(DEBUG_20) console.log("_keydown_f ="+args.row+":"+args.col+":"+args.target.value);
	}

	function _keydown_g(args) {
		if(DEBUG_20) console.log("_keydown_g ="+args.row+":"+args.col+":"+args.target.value);
	}

	function _keydown_h1(args) {
		if(DEBUG_20) console.log("_keydown_h1 ="+args.row+":"+args.col+":"+args.target.value);
	}

	function _keydown_h2(args) {
		if(DEBUG_20) console.log("_keydown_h2 ="+args.row+":"+args.col+":"+args.target.value);
	}

	function _keydown_h3(args) {
		if(DEBUG_20) console.log("_keydown_h3 ="+args.row+":"+args.col+":"+args.target.value);
	}

	function _keydown_h4(args) {
		if(DEBUG_20) console.log("_keydown_h4 ="+args.row+":"+args.col+":"+args.target.value);
	}

	function _keydown_h5(args) {
		if(DEBUG_20) console.log("_keydown_h5 ="+args.row+":"+args.col+":"+args.target.value);
	}

	function _change_a(args) {
		if(DEBUG_20) console.log("_change_a ="+args.row+":"+args.col+":"+args.target.value);

		if(args.row == 0) {
			return;
		}
		if(args.target.value == "") {
			return;
		}
		let row = args.row ;
		let before_row = args.row - 1;


		let hour =  _core.spread.getCellSelectedIndex(before_row, 4)
		let min =  _core.spread.getCellSelectedIndex(before_row, 5)

		_core.spread.setCellSelectedIndex(row, 2, hour)
		_core.spread.setCellSelectedIndex(row, 3, min)

	}

	function _change_b(args) {
		if(DEBUG_20) console.log("_change_b ="+args.row+":"+args.col+":"+args.target.value);
		if(args.target.value == "") {
			return;
		}
		let row = args.row ;

		let hour =  _core.spread.getCellSelectedIndex(row, 2)

		_core.spread.setCellSelectedIndex(row, 4, hour)
	}

	function _change_c(args) {
		if(DEBUG_20) console.log("_change_c ="+args.row+":"+args.col+":"+args.target.value);
		if(args.target.value == "") {
			return;
		}
		let row = args.row ;

		let min =  _core.spread.getCellSelectedIndex(row, 3)

		_core.spread.setCellSelectedIndex(row, 5, min)
	}

	function _change_d(args) {
		if(DEBUG_20) console.log("_change_d ="+args.row+":"+args.col+":"+args.target.value);
	}

	function _change_e(args) {
		if(DEBUG_20) console.log("_change_e ="+args.row+":"+args.col+":"+args.target.value);
	}

	function _change_f(args) {
		if(DEBUG_20) console.log("_change_f ="+args.row+":"+args.col+":"+args.target.value);
	}

	function _change_g(args) {
		if(DEBUG_20) console.log("_change_b ="+args.row+":"+args.col+":"+args.target.value);
	}

		
	function _keyup_a(args) {
		if(DEBUG_20) console.log("_keyup_a ="+args.row+":"+args.col+":"+args.target.value);
	}

	function _keyup_b(args) {
		if(DEBUG_20) console.log("_keyup_b ="+args.row+":"+args.col+":"+args.target.value);
	}

	function _keyup_c(args) {
		if(DEBUG_20) console.log("_keyup_c ="+args.row+":"+args.col+":"+args.target.value);
	}

	function _keyup_d(args) {
		if(DEBUG_20) console.log("_keyup_d ="+args.row+":"+args.col+":"+args.target.value);
	}

	function _keyup_e(args) {
		if(DEBUG_20) console.log("_keyup_e ="+args.row+":"+args.col+":"+args.target.value);
	}

	function _keyup_f(args) {
		if(DEBUG_20) console.log("_keyup_f ="+args.row+":"+args.col+":"+args.target.value);
	}

	function _keyup_g(args) {
		if(DEBUG_20) console.log("_keyup_g ="+args.row+":"+args.col+":"+args.target.value);
	}

	function _keyup_h(args) {
		if(DEBUG_20) console.log("_keyup_h ="+args.row+":"+args.col+":"+args.target.value);
	}

	function _keyup_i(args) {
	if(DEBUG_20) 	console.log("_keyup_i ="+args.row+":"+args.col+":"+args.target.value);
	}

	function _keyup_j1(args) {
		if(DEBUG_20) console.log("_keyup_j1 ="+args.row+":"+args.col+":"+args.target.value);
	}

	function _keyup_j2(args) {
		if(DEBUG_20) console.log("_keyup_j2 ="+args.row+":"+args.col+":"+args.target.value);
	}

	function _keyup_j3(args) {
		if(DEBUG_20) console.log("_keyup_j3 ="+args.row+":"+args.col+":"+args.target.value);
	}

	function _keyup_j4(args) {
		if(DEBUG_20) console.log("_keyup_j4 ="+args.row+":"+args.col+":"+args.target.value);
	}

	function _keyup_j5(args) {
		if(DEBUG_20) console.log("_keyup_j5 ="+args.row+":"+args.col+":"+args.target.value);
	}
 }

);


function standard_book_class() {

   const OUTBOUND	= "outbound";
   const RETURN_TRIP	= "return_trip";

   this.outbound_reload = _outbound_reload.bind(this);
   this.return_trip_reload = _return_trip_reload.bind(this);

   this.status		= null;
   this.setStatus	= (status) => this.status = status;
   this.getStatus	= () => this.status = status;

   return this;

   function _outbound_reload(e) {
	let json = _getOperationStandard();
	let outbound = json.outbound;

	this.setStatus (OUTBOUND);
   	_reload(outbound);

	setTimeout(
   	_setColorOfOutbound(OUTBOUND),10);
   }

   function _return_trip_reload(e) {
	let json = _getOperationStandard();
	let return_trip = json.return_trip;

	this.setStatus (RETURN_TRIP);
   	_reload(return_trip);

	setTimeout(
   	_setColorOfReturn_trip(OUTBOUND),10);
   }

   function _setColorOfOutbound(status) {
	let elm;
	elm = document.getElementById(OUTBOUND);
	elm.classList.add("outbound_select");

	elm = document.getElementById(RETURN_TRIP);
	elm.classList.remove("return_trip_select");
	
   }

   function _setColorOfReturn_trip(status) {
	let elm;
	elm = document.getElementById(OUTBOUND);
	elm.classList.remove("outbound_select");

	elm = document.getElementById(RETURN_TRIP);
	elm.classList.add("return_trip_select");
   }

   function _reload(obj) {
	let tableRef =  document.getElementById("operation_tbody");

	tableRef.innerHTML = "";

	let len, row, cell, node;

	len = obj.length;
	let s,i,j,l,k, wk;
	let att = ["distinguish","route_a","route_b","time","remarks","button_operation"];
	let classArray = ["a","b1","b2","c","d","e","f"];
	const search_term = '積載量送信';
	
	
	for (i =0; i< len; i++) {
		wk = "";
		// テーブルのインデックスiの行（i行目）に行を挿入
		row   = tableRef.insertRow(i);

		for (j =0; j< att.length; j++) {

			// j行目にセルを挿入
			cell  = row.insertCell(j);

			s = obj[i][att[j]]

			if(s == undefined) {
				s = "";
			}

			if(j != (att.length -1)) {
				// 作成したセルにテキストノードを挿入
				_addNode(cell, classArray[j], s);
				
				continue;
			}

			l = s.length;
			if(l < 1) {
				break;	
			}
			// 操作ボタンから積載量送信の時
			// kgを分離
				s = s[l-1];
				if(s.indexOf(search_term) != -1) {
					//console.log("search_term="+search_term);
					if(s.indexOf('kg') != -1) {
						 wk = s.split(' ')[1];
					}
					s = "";
					for (k =0; k<(l-1); k++) {
						s += obj[i][att[j]][k];
						s += ' ';
					}
					s += search_term;
					
				} else {
					s = obj[i][att[j]]
				
					if( s.length > 0) {
						s = s.join(' ');
					} else {
						s = "";
					}
				}

			// 作成したセルにテキストノードを挿入
			_addNode(cell, classArray[j], s);
		}

		// 積載量
		s = wk;
		cell  = row.insertCell(j);
		_addNode(cell, classArray[j], s);

	}
	return ;

	function _addNode(cell, className, s) {
		let node  = document.createTextNode(s)
		cell.appendChild(node);
		cell.setAttribute("class",className);
	}

   }
}

function geoFindMe() {
  const DEBUG3 = 1;

  //const status = document.querySelector('#status');
  //const mapLink = document.querySelector('#map-link');

  //mapLink.href = '';
  //mapLink.textContent = '';

  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    //status.textContent = '';
    //console.log(status.textContent);
    //if(DEBUG3) alert(status.textContent);

    //mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    //mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    console.log(`Latitude: ${latitude}  , Longitude: ${longitude}  `);
  }

  function error() {
    //status.textContent = 'Unable to retrieve your location';
    let textContent = 'Unable to retrieve your location';

    //console.log(status.textContent);
    console.log(textContent);
    if(DEBUG3) alert(textContent);
  }

  if(!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';

    //console.log(status.textContent);
    //alert(status.textContent);
  } else {
    //status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);

    //console.log(status.textContent);
    //alert(status.textContent);
  }

}

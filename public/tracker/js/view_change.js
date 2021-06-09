
function _view_change_class(row_max, col_max) {
   const ROW_MAX = row_max;
   const COL_MAX = col_max;

   document.getElementById('job').style.display = "none";
   document.getElementById('panel').style.display = "none";
   document.getElementById('arrow').style.display = "none";
   document.getElementById('time_bar').style.display = "none";

   this.reload = _reload.bind(this);
   this.save_file = _save_file.bind(this);

   this.json_preview = _json_preview.bind(this);
   this.json_plan_preview = _json_plan_preview.bind(this);
   this.json_transitionPoints_preview = _json_transitionPoints_preview.bind(this);
   this.json_driveTransitionPoints_preview = _json_driveTransitionPoints_preview.bind(this);
   this.json_practiceTransitionPoints_preview = _json_practiceTransitionPoints_preview.bind(this);
   this.json_restTransitionPoints_preview = _json_restTransitionPoints_preview.bind(this);

   _core.api.standard_book = new standard_book_class();

   document.getElementById('outbound').addEventListener ("click", _core.api.standard_book.outbound_reload, false);
   document.getElementById('return_trip').addEventListener ("click", _core.api.standard_book.return_trip_reload, false);

   document.getElementById('draw_plan').addEventListener ("click", this.reload, false);
   document.getElementById('save_file').addEventListener ("click", this.save_file, false);

   document.getElementById('draw_json').addEventListener ("click", this.json_preview, false);
   document.getElementById('draw_json_plan').addEventListener ("click", this.json_plan_preview, false);
   document.getElementById('draw_json_transitionPoints').addEventListener ("click", this.json_transitionPoints_preview, false);
   document.getElementById('draw_json_driveTransitionPoints').addEventListener ("click", this.json_driveTransitionPoints_preview, false);
   document.getElementById('draw_json_practiceTransitionPoints').addEventListener ("click", this.json_practiceTransitionPoints_preview, false);
   document.getElementById('draw_json_restTransitionPoints').addEventListener ("click", this.json_restTransitionPoints_preview, false);

   this.json	= {};
   this.setJson = (json) => this.json = json;
   this.getJson = () => this.json;

   return ;

   function _save_file (e) {
	console.log("save_file ");
   }

   function _json_preview (e) {
	const str = ['"TransitionPoints"','"DriveTransitionPoints"','"PracticeTransitionPoints"','"RestTransitionPoints"','"LongrestTransitionPoints"'];

	const id = "json_body";
	const id2 = "json_object_key";
	let elm = document.getElementById(id) ;
	let s = JSON.stringify(this.getJson());


	for( var i in str) {
		var j = str[i];
		s = s.replace(j,"\n"+j);

		//console.log(s);
	}
	elm.innerText = s;

	document.getElementById(id2).innerText = "ALL";
   }

   function _json_plan_preview (e) {
	const id = "json_body";
	const id2 = "json_object_key";
	let elm = document.getElementById(id) ;
	let s = JSON.stringify(this.getJson().Plans);

	elm.innerText = s;

	document.getElementById(id2).innerText = "Plans";
   }

   function _json_transitionPoints_preview (e) {
	const id = "json_body";
	const id2 = "json_object_key";
	let elm = document.getElementById(id) ;
	let s = JSON.stringify(this.getJson().TransitionPoints);

	elm.innerText = s;

	document.getElementById(id2).innerText = "TransitionPoints";
   }

   function _json_driveTransitionPoints_preview (e) {
	const id = "json_body";
	const id2 = "json_object_key";
	let elm = document.getElementById(id) ;
	let s = JSON.stringify(this.getJson().DriveTransitionPoints);

	elm.innerText = s;

	document.getElementById(id2).innerText = "DriveTransitionPoints";
   }

   function _json_practiceTransitionPoints_preview (e) {
	const id = "json_body";
	const id2 = "json_object_key";
	let elm = document.getElementById(id) ;
	let s = JSON.stringify(this.getJson().PracticeTransitionPoints);

	elm.innerText = s;

	document.getElementById(id2).innerText = "PracticeTransitionPoints";
   }

   function _json_restTransitionPoints_preview (e) {
	const id = "json_body";
	const id2 = "json_object_key";
	let elm = document.getElementById(id) ;
	let s = JSON.stringify(this.getJson().RestTransitionPoints);

	elm.innerText = s;

	document.getElementById(id2).innerText = "RestTransitionPoints";
   }

   function _reload(e) {

	//計画データ

	let i,j,k, value, begin, end, wk;

	//計画データ
	var Plans = [];

	//経過地点データ
	var TransitionPoints = [];

	//運転データ
	var DriveTransitionPoints = [];

	//運転外・実務データ
	var PracticeTransitionPoints = [];

	//休憩データ
	var RestTransitionPoints = [];

	//休息データ
	var LongrestTransitionPoints = [];

	let plans = [];

	for(i= 0, k=0; i<ROW_MAX;i++) {
		plans[i] = {};

		for(j=0; j< COL_MAX;j++) {
			
			if(j == 0) {
				continue;
			}
			value = _core.spread.getCellValue(i,j);
			//console.log("value="+value)
			

			switch(j) {
			case 1:
				plans[k].dateNumber = parseInt(value)-1;
			break;
			case 2:
				plans[k].begin = value +":";
				begin = parseInt(value) * 60 * 60 * 1000;
			break;
			case 3:
				plans[k].begin += value;
				begin += parseInt(value) * 60 * 1000;
			break;
			case 4:
				plans[k].end = value +":";
				end = parseInt(value) * 60 * 60 * 1000;
			break;
			case 5:
				plans[k].end += value;
				end += parseInt(value) * 60 * 1000;
			break;
			case 6:
				let jobStatus = _core.jobStatus;
				let begin_status = _core.lib.kanji2status(value);
				plans[k].string = value;
				plans[k].begin_status = begin_status;
				let elapsed_time = _calcTime(end , begin);
				plans[k].workNumber = _core.lib.status2workNumber (jobStatus, begin_status, elapsed_time);
				//console.log("begin_status="+begin_status+":"+"workNumber = "+plans[k].workNumber);
			break;
			case 7:
				plans[k].info = value;
			break;
			case 8:
				//plans[k].string = value;
			break;
			case 9:
				//plans[k].loading = value;
			break;
			}
		}
		//console.log(plans[i]);
		k++;
	}

	let ii,i0,i1,i2,i3,i4;
	ii=i0=i1=i2=i3=i4=0;

	Plans = [];
	TransitionPoints = [];
	DriveTransitionPoints = [];
	PracticeTransitionPoints = [];
	RestTransitionPoints = [];
	LongrestTransitionPoints = [];

	for(i= 0; i< ROW_MAX;i++) {
		if(plans[i].begin.charAt(0) == ":") {
			continue;
		}

		if(Plans[i] == null) {
			Plans[ii] = {};
		}
		if(TransitionPoints[ii] == null ) {
			TransitionPoints[ii] = {};
		}

		Plans[ii].dateNumber = plans[i].dateNumber;
		Plans[ii].workNumber =  plans[i].workNumber;
		Plans[ii].begin = plans[i].begin;
		Plans[ii].end = plans[i].end;
		Plans[ii].info = plans[i].string+":"+plans[i].info;

		TransitionPoints[ii].dateNumber = plans[i].dateNumber;
		TransitionPoints[ii].begin = plans[i].begin;
		if(plans[i].workNumber == undefined) {
			TransitionPoints[ii].string = plans[i].info;
		} else {
			TransitionPoints[ii].string = plans[i].string;
		}
		TransitionPoints[ii].up_down = 0;
		TransitionPoints[ii].fill = false;

		ii++;

		switch(plans[i].workNumber) {
		case 0:
			if(DriveTransitionPoints[i0] == null) {
				DriveTransitionPoints[i0] = {};
			}
			wk = DriveTransitionPoints[i0]

			wk.dateNumber = plans[i].dateNumber;
			wk.dateNumber = plans[i].dateNumber;
			wk.begin = plans[i].begin;
			wk.end = plans[i].end;
			wk.string = plans[i].string
			wk.fill = false;
			wk.time_align = "left";

			i0++;
		break;
		case 1:
			if(PracticeTransitionPoints[i1] == null) {;
				PracticeTransitionPoints[i1] = {};
			}
			wk = PracticeTransitionPoints[i1]

			wk.dateNumber = plans[i].dateNumber;
			wk.dateNumber = plans[i].dateNumber;
			wk.begin = plans[i].begin;
			wk.end = plans[i].end;
			wk.string = plans[i].string
			wk.fill = false;
			wk.time_align = "left";

			switch(plans[i].begin_status) {
			case "loading":
				TransitionPoints[i].up_down = 1;
				TransitionPoints[i].fill = true;
			break;
			case "unloading":
				TransitionPoints[i].up_down = 0;
				TransitionPoints[i].fill = true;
			break;
			}

			i1++;
		break;
		case 2:
			if(RestTransitionPoints[i2] == null) {
				RestTransitionPoints[i2] = {};
			}
			wk = RestTransitionPoints[i2]

			wk.dateNumber = plans[i].dateNumber;
			wk.dateNumber = plans[i].dateNumber;
			wk.begin = plans[i].begin;
			wk.end = plans[i].end;
			wk.string = plans[i].string
			wk.fill = false;

			i2++;
		break;
		case 4:
			if(LongrestTransitionPoints[i4] == null) {
				LongrestTransitionPoints[i4] = {};
			}
			wk = LongrestTransitionPoints[i4]

			wk.dateNumber = plans[i].dateNumber;
			wk.dateNumber = plans[i].dateNumber;
			wk.begin = plans[i].begin;
			wk.end = plans[i].end;
			wk.string = plans[i].string
			wk.fill = false;
			wk.time_align = "left";

			i4++;
		break;
		}
	}

	// データが空なら
	if(ii == 0) {
		return;
	}


	// 指示データ
	var TablePlan =  {
		'plan-driving':'03:00',
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

	_core.api.reloadPlans(Plans);
	_core.api.reloadTransitionPoints(TransitionPoints);
	_core.api.reloadDriveTransitionPoints(DriveTransitionPoints);
	_core.api.reloadPracticeTransitionPoints(PracticeTransitionPoints);
	_core.api.reloadRestTransitionPoints(RestTransitionPoints);
	_core.api.reloadLongrestTransitionPoints(LongrestTransitionPoints);

	_core.api.setTablePlan(TablePlan);


	this.json.Plans = Plans;
	this.json.TransitionPoints = TransitionPoints;
	this.json.DriveTransitionPoints = DriveTransitionPoints;
	this.json.PracticeTransitionPoints = PracticeTransitionPoints;
	this.json.RestTransitionPoints = RestTransitionPoints;
	this.json.LongrestTransitionPoints = LongrestTransitionPoints;

	
	
	return;

	function _calcTime(end , begin) {
		let wk =end - begin;
		if(wk >= 0) {
			return wk;
		}

		wk = 24 * 60 * 60 * 1000 - begin + end;
		//console.log(wk/60/1000);
		return wk;
	}
   }
}


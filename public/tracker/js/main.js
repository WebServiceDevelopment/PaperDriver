/*
* Copyright 2021 Web Service Development Inc.
*/

//'use strict';

const _core = new function () {

 this.canvas		= null;
 this.main_element	= null;
 this.getMainElement	= () => this.main_element;
 this.initMainElement	= () => this.main_element = document.getElementById("main");

 this.init		= _init.bind(this);
 window.onload		= this.init;


 //this.innerWidth	= window.innerWidth;
 this.innerWidth	= 1024;
 this.innerHeight	= window.innerHeight;

 this.bodyMarginTop	= 5;
 this.bodyMarginBottom	= 5;
 this.bodyMarginLeft	= 5;
 this.bodyMarginRight	= 5;

 this.bodyPaddingTop	= 2;

 //表示を重ならさせないため
 this.transitionPointsTimes = 6;

//日にちの表示数
 this.dayTimes 		= 2;

 this.spanW		= 38;
 this.spanH		= 30;
 this.margin_top 	= 27;
 this.topHeight 	= 13*this.transitionPointsTimes-1+this.margin_top;
 this.startX		= 90;
 this.lineStartPosY	= this.topHeight+ 7 + this.bodyPaddingTop;
 this.timeSpanWidth	= 910;
 this.getTimeSpanWidth	= () => this.timeSpanWidth;
 this.barHeight		= this.topHeight + this.spanH * 5;

 this.outerFrame	= 0.5;
 this.innerFrame	= 0.2;

 this.str = ["経過地点", "月", "日","運転","運転外実務","休憩・仮眠","その他",
	"休息時間","労","働","時","間"];


 this.base_table	= _base_table.bind(this);

 this.parseHour		= _parseHour.bind(this);
 this.parseMin		= _parseMin.bind(this);

 this.drawPlanLine	= _drawPlanLine.bind(this);
 this.drawResultLine	= _drawResultLine.bind(this);
 this.drawVerticalBar	= _drawVerticalBar.bind(this);

 this.getLineTopPosition = _getLineTopPosition.bind(this);
 this.draw_line		= _draw_line.bind(this);

 this.plan_line_number	= -1;
 this.countupPlanLineNumber	= () => { return ++this.plan_line_number; }
 this.getPlanLineNumber		= () => this.plan_line_number;
 this.initPlanLineNumber	= () => this.plan_line_number = -1;
 this.planLinesAttribute	= [];

 this.result_line_number	= -1;
 this.countupResultLineNumber	= () => { return ++this.result_line_number; }
 this.getResultLineNumber	= () => this.result_line_number;
 this.initResultLineNumber	= () => this.result_line_number = -1;
 this.resultLinesAttribute	= [];

 this.bar_line_number	= -1;
 this.countupBarLineNumber	= () => { return ++this.bar_line_number; }
 this.getBarLineNumber	= () => this.bar_line_number;
 this.initBarLineNumber	= () => this.bar_line_number = -1;
 this.barLinesAttribute	= [];


 this.area_number	= -1;
 this.countupAreaNumber	= () => { return ++this.area_number; }
 this.getAreaNumber	= () => this.area_number;
 this.areaAttribute	= [];


 this.transitionPoint_number = -1;
 this.countupTransitionPointNumber = () => { return ++this.transitionPoint_number; }
 this.getTransitionPointNumber = () => this.transitionPoint_number;
 this.initTransitionPointNumber = () => this.transitionPoint_number = -1;
 this.transitionPointAttribute = [];

 this.driveTransitionPoint_number = -1;
 this.countupDriveTransitionPointNumber = () => { return ++this.driveTransitionPoint_number; }
 this.getDriveTransitionPointNumber = () => this.driveTransitionPoint_number;
 this.initDriveTransitionPointNumber = () => this.driveTransitionPoint_number = -1;
 this.driveTransitionPointAttribute = [];

 this.practiceTransitionPoint_number = -1;
 this.countupPracticeTransitionPointNumber = () => { return ++this.practiceTransitionPoint_number; }
 this.getPracticeTransitionPointNumber = () => this.practiceTransitionPoint_number;
 this.initPracticeTransitionPointNumber = () => this.practiceTransitionPoint_number = -1;
 this.practiceTransitionPointAttribute = [];

 this.restTransitionPoint_number = -1;
 this.countupRestTransitionPointNumber = () => { return ++this.restTransitionPoint_number; }
 this.getRestTransitionPointNumber = () => this.restTransitionPoint_number;
 this.initRestTransitionPointNumber = () => this.restTransitionPoint_number = -1;
 this.restTransitionPointAttribute = [];

 this.otherTransitionPoint_number = -1;
 this.countupOtherTransitionPointNumber = () => { return ++this.otherTransitionPoint_number; }
 this.getOtherTransitionPointNumber = () => this.otherTransitionPoint_number;
 this.initOtherTransitionPointNumber = () => this.otherTransitionPoint_number = -1;
 this.otherTransitionPointAttribute = [];

 this.attendant_workTransitionPoint_number = -1;
 this.countupAttendant_workTransitionPointNumber = () => { return ++this.attendant_workTransitionPoint_number; }
 this.getAttendant_workTransitionPointNumber = () => this.attendant_workTransitionPoint_number;
 this.initAttendant_workTransitionPointNumber = () => this.attendant_workTransitionPoint_number = -1;
 this.attendant_workTransitionPointAttribute = [];

 this.longrestTransitionPoint_number = -1;
 this.countupLongrestTransitionPointNumber = () => { return ++this.longrestTransitionPoint_number; }
 this.getLongrestTransitionPointNumber = () => this.longrestTransitionPoint_number;
 this.initLongrestTransitionPointNumber = () => this.longrestTransitionPoint_number = -1;
 this.longrestTransitionPointAttribute = [];


 this.planColor		= "green";
 this.planChangeColor	= "darkgreen";
 this.resultColor	= "darkblue";
 this.verticalLineColor = "gray";
 this.planStringColor	= "#fff";

 this.planLineHeight	= 18;
 this.resultLineHeight	= 3;
 this.capRadius		= 10;
 this.verticalLineWidth	= 2;
 this.linePaddingTop	= -2;
 this.linePaddingBottom = 2;
 this.viewPosHeight	= 15;
 this.viewFontSize	= 12;
 this.viewFontColor	= "#333";
 this.planFontSize	= 12;
 this.resultFontSize	= 12;

 this.diff_h		= 22;

 this.workAreaWidth	= 993;
 this.workTime_area_width = 21+this.workAreaWidth;

 this.planOpacity	= 0.2;
 this.resultOpacity	= 0.33;
 this.viewOpacity	= 0.67;

 this.date		= [3];
 this.month_date	= _month_date.bind(this);
 this.getMonthDate	= _getMonthDate.bind(this);

 this.addEvent		= _addEvent.bind(this);

 this.setUserAgent 	= _setUserAgent.bind(this);

 this.draw_work_area	= _draw_work_area.bind(this);
 this.draw_workTime_area = _draw_workTime_area.bind(this);

 //
 // set event function.
 //
 this.planFuncs		= null;
 this.setPlanFuncs	= (funcs) => this.planFuncs = funcs; 
 this.getPlanFuncs	= () => this.planFuncs;

 this.resultFuncs	= null;
 this.setResultFuncs	= (funcs) => this.resultFuncs = funcs; 
 this.getResultFuncs	= () => this.resultFuncs;

 this.workFuncs		= null;
 this.setWorkFuncs	= (funcs) => this.workFuncs = funcs; 
 this.getWorkFuncs	= () => this.workFuncs;

 this.jobFuncs		= null;
 this.setJobFuncs	= (funcs) => this.jobFuncs = funcs; 
 this.getJobFuncs	= () => this.jobFuncs;

 this.statusViewFuncs	= null;
 this.setStatusViewFuncs= (funcs) => this.statusViewFuncs = funcs; 
 this.getStatusViewFuncs= () => this.statusViewFuncs;

// api

 this.api		= new api_class (this);

 this.setData 		= null;
 this.addSetData	= (func) => this.setData = func.bind(this, this.api);

 this.resultInterface 	= null;
 this.setResultInterface= (func) => this.resultInterface = func.bind(this, this.api);

 this.drawTotal		= _drawTotal.bind(this);

 this.createTableInTotal= null;
 this.setCreateTableInTotal= (func) => this.createTableInTotal = func.bind(this);

 this.drawDrive		= _drawDrive.bind(this);
 this.createTableInDrive= null;
 this.setCreateTableInDrive= (func) => this.createTableInDrive = func.bind(this);


 this.drawTablePlanTimes	= null;
 this.setDrawTablePlanTimes	= (func) => this.drawTablePlanTimes = func.bind(this);


 this.event		= new event_class ();
 this.touch		= new touch_class ();
 this.jobStatus		= new jobStatus_class();

 this.draw_TransitionPoint = _draw_TransitionPoint.bind(this);

 this.addJobEvent	= _addJobEvent.bind(this);

 this.lib		= {};
 this.lib.geolocation	= new geolocation_class();

// plans
 this.plans		= [];
 this.setPlans	= (plans) => {
				let len = this.plans.length;
				this.plans.splice(0, len);
				return this.plans =  plans.slice();
			}
 this.getPlans	= () => this.plans;
 this.popPlans	= () => this.plans.pop();
 this.pushPlans	= (plans) => this.plans.push(plans);

/// results
 this.results		= [];
 this.setResults	= (results) => {
				let len = this.results.length;
				this.results.splice(0, len);
				return this.results =  results.slice();
			}
 this.getResults	= () => this.results;
 this.popResults	= () => this.results.pop();
 this.pushResults	= (result) => this.results.push(result);

 this.lib		= new lib_class();

 return this;

 function jobStatus_class() {
	// 中央左上の現在時間を表示するのHTMLのID名
	const NOW_TIME_ID 	= "now_time";

	// 中央右の経過時間を表示するのHTMLのID名
	const VIEW_ID 		= "esplead_time";

	const INTERVAL_TIME	= 1000;

	// 中央のステータスを表示するのHTMLのID名
	const JOB_STATUS_ID	= "job_status";

	// 時間軸の縦バーのHTMLのID名
	const TIME_BAR_ID	= "time_bar";


	// 拘束時間
	const RESTRAINT_TIME_ID = "restraint_time";

	// 残り拘束時間
	const REMAINING_RESTRAINT_TIME_ID = "remaining_restraint_time";

	// 休憩時間
	const REST_TIME_ID = "rest_time";

	// 休憩時間残
	const REMAINING_REST_TIME_ID = "remaining_rest_time";

	// 休息時間
	const LONGREST_TIME_ID = "longrest_time";

	// 休息時間残
	const REMAINING_LONGREST_TIME_ID = "remaining_longrest_time";

	//中断時間
	const DRIVING_INTERRUPTION_TIME_ID = "driving_interruption_time";

	//連続運転許容時間
	const CONTINUOUS_DRIVEING_ALLOWABLE_TIME_ID = "continuous_driveing_allowable_time";

	//最小休憩時間
	const MINIMUM_BREAK_TIME = 5 * 1000* 60;
	this.getMINIMUM_BREAK_TIME = () => MINIMUM_BREAK_TIME;

//
// 中央のステータス左上に現在の時間を表示
//
	this.now_time_element	= null;
	this.getNowTimeElement = () => this.now_time_element;
	this.initNowTimeElement = () => this.now_time_element = document.getElementById(NOW_TIME_ID);

//
// 中央のステータス右に経過時間を表示
//
	this.status_view_element	= null;
	this.getStatusViewElement = () => this.status_view_element;
	this.initStatusViewElement = () => this.status_view_element = document.getElementById(VIEW_ID);

//
// 中央のステータス表示
//
	this.status_view_element	= null;
	this.job_status_element = null;
	this.getJObStatusElement= () => this.job_status_element;
	this.initJObStatusElement= () => this.job_status_element = document.getElementById(JOB_STATUS_ID);

//
// 時間軸の縦バー
//
	this.time_bar_element	= null;
	this.getTimeBarElement = () => this.time_bar_element;
	this.initTimeBarElement = () => this.time_bar_element = document.getElementById(TIME_BAR_ID);
	

	this.init	= () => {

		const INIT_STATUS = "停 止 中";
		let rt, elm;


		this.initJObStatusElement ();
		this.getJObStatusElement().innerText = INIT_STATUS;

		this.initNowTimeElement ();

		this.initStatusViewElement ();

		elm = this.initTimeBarElement();
		elm.style.height = _core.barHeight + 'px';
		

		// 拘束時間
		this.restraint_time_element = document.getElementById( RESTRAINT_TIME_ID );

		// 残り拘束時間
		this.remaining_restraint_time_element = document.getElementById( REMAINING_RESTRAINT_TIME_ID );
		rt = this.elapsed.initRemainingRestraintTime();
		this.elapsed.drawRemainingRestraintTime(rt);

		// 休憩時間
		this.rest_time_element = document.getElementById( REST_TIME_ID ); 

		// 休憩時間残
		this.remaining_rest_time_element = document.getElementById( REMAINING_REST_TIME_ID ); 

		// 休息時間
		this.longrest_time_element = document.getElementById( LONGREST_TIME_ID ); 

		// 休息時間残・初期化
		this.remaining_longrest_time_element = document.getElementById( REMAINING_LONGREST_TIME_ID ); 
		rt = this.elapsed.initRemainingRestTime ();
		this.elapsed.drawRemainingRestTime(rt);

		//中断時間
		this.driving_interruption_time_element = document.getElementById( DRIVING_INTERRUPTION_TIME_ID ); 

		//連続運転許容時間
		this.continuous_driveing_allowable_time_element = document.getElementById( CONTINUOUS_DRIVEING_ALLOWABLE_TIME_ID ); 


		//連続運転超過時間・初期化
		this.elapsed.initContinuousOperationOvertime ();

		// 直前の運転中断時間・初期化
		this.elapsed.initDrivingInterruptionOld ();

		// 運転中断時間ワーク・初期化
		this.elapsed.initDrivingInterruptionWork ();

		// 以前の休憩経過時間・初期化
		this.elapsed.initRestTimeOld ();

		//出庫時間
		this.initOutstockBeginTime ();

		//出庫時間の配列
		this.initOutstockBeginTimes ();
	}

	this.reinit	= () => {
		let rt;

		// 残り拘束時間
		rt = this.elapsed.initRemainingRestraintTime();
		this.elapsed.drawRemainingRestraintTime(rt);

		rt = this.elapsed.initRemainingRestTime ();
		this.elapsed.drawRemainingRestTime(rt);

		//連続運転超過時間・初期化
		this.elapsed.initContinuousOperationOvertime ();

		// 直前の運転中断時間・初期化
		this.elapsed.initDrivingInterruptionOld ();

		// 運転中断時間ワーク・初期化
		this.elapsed.initDrivingInterruptionWork ();

		// 以前の休憩経過時間・初期化
		this.elapsed.initRestTimeOld ();

		//出庫時間
		this.initOutstockBeginTime ();

		//出庫時間の配列
		this.initOutstockBeginTimes ();
	}

	// 拘束時間
	this.getRestraintTimeElement = () => this.restraint_time_element;

	// 残り拘束時間
	this.getRemainingRestraintTimeElement = () => this.remaining_restraint_time_element;

	// 休憩時間
	this.getRestTimeElement = () => this.rest_time_element;

	// 休憩時間残
	this.getRemainingRestTimeElement = () => this.remaining_rest_time_element;

	// 休息時間
	this.getLongrestTimeElement = () => this.longrest_time_element;

	// 休息時間残
	this.getRemainingLongrestTimeElement = () => this.remaining_longrest_time_element;

	//中断時間
	this.getDrivingInterruptionTimeElement = () => this.driving_interruption_time_element;

	//連続運転許容時間
	this.getContinuousDriveingAllowableTimeElement = () => this.continuous_driveing_allowable_time_element;

//
//時間をカウントするためのインターバルイベント用
//
	this.interval = null;
	this.setInterval = (interval) => this.interval = interval;
	this.getInterval = () => this.interval;
	this.clearInterval = () => {
		if(this.interval == null) {
			return;
		}
		window.clearInterval(this.interval);
		this.interval = null;
	}


//
//時間をカウントするためのインターバルの間隔
//
	this.getIntervalTime = () => INTERVAL_TIME;

//
//作業の開始時間
//
	this.begin_time	= null;
	this.setBeginTime= (time) =>  this.begin_time = time; 
	this.getBeginTime= () =>  this.begin_time;
	this.clearBeginTime= () =>  this.begin_time = null;


	this.elapsed = new _elapsed_class (this);

//
// 出庫時間
//
	this.outstock_begin_time = null;
	this.setOutstockBeginTime = (time) => this.outstock_begin_time = time;
	this.getOutstockBeginTime = () => this.outstock_begin_time;
	this.initOutstockBeginTime = () => this.outstock_begin_time = null;
			
//
// 出庫時間の配列
//
	this.outstock_begin_times = [];
	this.initOutstockBeginTimes = () => this.outstock_begin_times = [];
	this.getOutstockBeginTimes = () => this.outstock_begin_times;
	this.getLengthOfOutstockBeginTimes = () => this.outstock_begin_times.length;
	this.addOutstockBeginTimes = (time) => this.outstock_begin_times.push(time);

//
// 入庫時間
//
	this.instock_end_time = null;
	this.setInstockEndTime = (time) => this.instock_end_time = time;
	this.getInstockEndTime = () => this.instock_end_time;


//
// 経過データ
//
	this.result_data	= [];
	this.addResultData   = (data) => this.result_data.push(data);
	this.getResultData	= () => this.result_data;


	this.result_data	= [];
//
// 残り拘束時間の算出の為のワーク
//
	this.interval_last_time = null;
	this.getIntervalLastTime = () => this.interval_last_time;
	this.setIntervalLastTime = (time) => this.interval_last_time = time;

	return this;
 }


 function _elapsed_class (it) {

	this.parent = it;
//
// 経過時間
//
	this.elapsed_time = 0;
	this.setElapsedTime = (time) => this.elapsed_time = time;
	this.getElapsedTime = () => this.elapsed_time;
	this.initElapsedTime = () => this.elapsed_time = 0;

//
// 拘束時間合計 or 拘束経過時間
//
	this.restraint_time = 0
	this.setRestraintTime = (restraint) => this.restraint_time = restraint;
	this.addRestraintTime = (restraint) => this.restraint_time +=  restraint;
	this.getRestraintTime = () => this.restraint_time ;
	this.initRestraintTime = () => this.restraint_time = 0;
	this.calcRestraintTime = (now) => {
		return	now -
			this.parent.getOutstockBeginTime() -
			this.getLongrestTime() -
			this.getOtherTime();
	}

//
// 残り拘束時間
//
	this.getREMAINING_RESTRAINT_TIME = () => (15 * 60 * 60 -1)* 1000;
	this.remaining_restraint_time = 0;
	this.setRemainingRestraintTime = (time) => this.remaining_restraint_time = time;
	this.getRemainingRestraintTime = () => this.remaining_restraint_time;
	this.initRemainingRestraintTime = () => this.remaining_restraint_time = this.getREMAINING_RESTRAINT_TIME();

//
// 運転経過時間
//
	this.driving_time = 0
	this.setDrivingTime = (driving) => this.driving_time = driving;
	this.addDrivingTime = (driving) => this.driving_time += driving;
	this.getDrivingTime = () => this.driving_time ;
	this.initDrivingTime = () => this.driving_time = 0;

//
// 入庫経過時間
//
	this.instock_time = 0
	this.setInstockTime = (instock) => this.instock_time = instock;
	this.addInstockTime = (instock) => this.instock_time += instock;
	this.getInstockTime = () => this.instock_time ;
	this.initInstockTime = () => this.instock_time = 0;

//
// 点検経過時間
//
	this.inspection_time = 0
	this.setInspectionTime = (inspection) => this.inspection_time = inspection;
	this.addInspectionTime = (inspection) => this.inspection_time += inspection;
	this.getInspectionTime = () => this.inspection_time ;
	this.initInspectionTime = () => this.inspection_time = 0;

//
// その他経過時間
//
	this.other_time = 0
	this.setOtherTime = (other) => this.other_time = other;
	this.addOtherTime = (other) => this.other_time +=  other;
	this.getOtherTime = () => this.other_time ;
	this.initOtherTime = () => this.other_time = 0;

//
// 附帯作業
//
	this.attendant_work_time = 0
	this.setAttendant_workTime = (work) => this.attendant_work_time = work;
	this.addAttendant_workTime = (work) => this.attendant_work_time += work;
	this.getAttendant_workTime = () => this.attendant_work_time ;
	this.initAttendant_workTime = () => this.attendant_work_time  = 0;

//
// 荷積経過時間
//
	this.loading_time = 0
	this.setLoadingTime = (loading) => this.loading_time = loading;
	this.addLoadingTime = (loading) => this.loading_time += loading;
	this.getLoadingTime = () => this.loading_time ;
	this.initLoadingTime = () => this.loading_time = 0;

//
// 荷卸経過時間
//
	this.unloading_time = 0
	this.setUnloadingTime = (unloading) => this.unloading_time = unloading;
	this.addUnloadingTime = (unloading) => this.unloading_time += unloading;
	this.getUnloadingTime = () => this.unloading_time ;
	this.initUnloadingTime = () => this.unloading_time = 0;

//
// 休憩経過時間
//
	this.rest_time = 0
	this.setRestTime = (rest) => this.rest_time = rest;
	this.addRestTime = (rest) => this.rest_time += rest;
	this.getRestTime = () => this.rest_time ;
	this.initRestTime = () => this.rest_time = 0;

//
// 以前の休憩経過時間
//
	this.rest_time_old = 0
	this.setRestTimeOld = (rest) => this.rest_time_old = rest;
	this.getRestTimeOld = () => this.rest_time_old ;
	this.initRestTimeOld = () => this.rest_time_old  = 0;

//
// 休憩時間残
//
	this.getREMAINING_REST_TIME = () => 60*60*1000;
	this.remaining_rest_time = 0;
	this.setRemainingRestTime = (rest) => this.remaining_rest_time = rest;
	this.getRemainingRestTime = () => this.remaining_rest_time ;
	this.initRemainingRestTime = () => this.remaining_rest_time = this.getREMAINING_REST_TIME();

//
// 分割休息回数
//
	this.split_longrest_count = 0
	this.initSplitLongrestCount = () => this.split_longrest_count = 0;
	this.setSplitLongrestCount = (split) => this.split_longrest_count = split;
	this.countupSplitLongrestCount = (split) => ++this.split_longrest_count;
	this.getSplitLongrestCount = () => this.split_longrest_count ;

//
// 休息経過時間
//
	this.longrest_time = 0
	this.setLongrestTime = (longrest) => this.longrest_time = longrest;
	this.addLongrestTime = (longrest) => this.longrest_time += longrest;
	this.getLongrestTime = () => this.longrest_time ;
	this.initLongrestTime = () => this.longrest_time = 0;

//
// 休息時間残
//
	this.getREMAINING_LONGREST_TIME = () => 8 * 60 * 60 * 1000;
	this.remaining_longrest_time = this.getREMAINING_LONGREST_TIME();
	this.setRemainingLongrestTime = (time) => this.remaining_longrest_time = time; 
	this.getRemainingLongrestTime = () => this.remaining_longrest_time;
	this.initRemainingLongrestTime = () => this.remaining_longrest_time = 0;

//
// 待機経過時間
//
	this.standby_time = 0
	this.setStandbyTime = (standby) => this.standby_time = standby;
	this.addStandbyTime = (standby) => this.standby_time += standby;
	this.getStandbyTime = () => this.standby_time ;
	this.initStandbyTime = () => this.standby_time = 0;

//
// フェリー乗船経過時間
//
	this.ferry_time = 0
	this.setFerryTime = (ferry) => this.ferry_time = ferry;
	this.addFerryTime = (ferry) => this.ferry_time += ferry;
	this.getFerryTime = () => this.ferry_time ;
	this.initFerryTime = () => this.ferry_time = 0;

//
// 運転中断時間
//
	this.getDRIVING_INTERRUPTION_TIME = () => 30 * 60 * 1000;
	this.driving_interruption_time = 0;
	this.setDrivingInterruptionTime = (time) => this.driving_interruption_time = time;
	this.addDrivingInterruptionTime = (time) => this.driving_interruption_time += time;
	this.initDrivingInterruptionTime = () => this.driving_interruption_time = 0;
	this.getDrivingInterruptionTime = () => this.driving_interruption_time;

//
// 直前の運転中断時間
//
	this.driving_interruption_old= 0;
	this.setDrivingInterruptionOld = (time) => this.driving_interruption_old = time;
	this.initDrivingInterruptionOld = () => this.driving_interruption_old= 0;
	this.getDrivingInterruptionOld = () => this.driving_interruption_old;

//
// 運転中断時間ワーク
//
	this.driving_interruption_work = 0;
	this.setDrivingInterruptionWork = (work) => this.driving_interruption_work = work;
	this.addDrivingInterruptionWork = (work) => this.driving_interruption_work += work;
	this.initDrivingInterruptionWork = () => this.driving_interruption_work = 0;
	this.getDrivingInterruptionWork = () => this.driving_interruption_work;

//
// 連続運転超過時間
//
	//elm = document.getElementById("plan-continuous-operation-overtime");
	this.continuous_operation_overtime = 0;
	this.initContinuousOperationOvertime = () => this.continuous_operation_overtime = 0;
	this.setContinuousOperationOvertime = (time) => this.continuous_operation_overtime = time;
	this.getContinuousOperationOvertime = () => this.continuous_operation_overtime;
	this.addContinuousOperationOvertime = (time) => this.continuous_operation_overtime += time;

//
// 連続運転許容時間
//
	//elm = document.getElementById("continuous_driveing_allowable_time");
	this.getCONTINUOUS_DRIVEING_ALLOWABLE_TIME = () => 240 * 60 *1000;
	this.continuous_driveing_allowable_time = this.getCONTINUOUS_DRIVEING_ALLOWABLE_TIME();
	this.setContinuousDriveingAllowableTime = (time) => this.continuous_driveing_allowable_time = time;
	this.subtractionContinuousDriveingAllowableTime = (time) => {

		const base1 = "連続運転許容時間は、残り、";
		const base2 = "分、です。休憩してください。";
		const text30 = "30";
		const text20 = "20";
		const text15 = "15";
		const text10 = "10";
		const text5 = "5";
		const text1 = "1";
		let text = "";
		let uttr;

		let remain;
		let elm;
		let overtime;

		if(this.continuous_driveing_allowable_time -time < 0) {
			this.continuous_operation_overtime += time - this.continuous_driveing_allowable_time;

			overtime = this.continuous_operation_overtime;
			this.setContinuousOperationOvertime (overtime);

			elm = document.getElementById("result-continuous-operation-overtime"+0);
			let hour = ('0'+parseInt(overtime/1000/60/60)). slice(-2);
			let min =  ('0'+parseInt(overtime/1000/60%60)). slice(-2);
			elm.innerText = hour+":"+min;
			
			remain = 0;
		} else {
			remain =  this.continuous_driveing_allowable_time -= time;
		}

		if (remain <= 30 * 60 * 1000 && remain > (30 * 60 -1) * 1000) {
			text = base1 + text30 + base2;		
		} else if (remain <= 20 * 60 * 1000 && remain > (20 * 60 -1) * 1000) {
			text = base1 + text20 + base2;		
		} else if (remain <= 15 * 60 * 1000 && remain > (15 * 60 -1) * 1000) {
			text = base1 + text15 + base2;		
		} else if (remain <= 10 * 60 * 1000 && remain > (10 * 60 -1) * 1000) {
			text = base1 + text10 + base2;		
		} else if (remain <= 5 * 60 * 1000 && remain > (5 * 60 -1) * 1000) {
			text = base1 + text5 + base2;		
		} else if (remain <= 1 * 60 * 1000 && remain > (1 * 60 -1) * 1000) {
			text = base1 + text1 + base2;		
		}  
		// 発言を再生 (発言キュー発言に追加)
		if(text != "") {
			uttr = new SpeechSynthesisUtterance(text)
			uttr.lang = "ja-JP";
			uttr.rate = 0.9
			speechSynthesis.speak(uttr)
		}

		return remain;

			
	}
	this.getContinuousDriveingAllowableTime = () => this.continuous_driveing_allowable_time;

	this.initContinuousDriveingAllowableTime = () => {
		let time = this.continuous_driveing_allowable_time - this.getCONTINUOUS_DRIVEING_ALLOWABLE_TIME();
		if(time > 0) {
			this.addContinuousOperationOvertime (time);
		}
		
		return this.continuous_driveing_allowable_time = this.getCONTINUOUS_DRIVEING_ALLOWABLE_TIME();
	}


		
// 拘束時間
	this.drawRestraintTime = _drawRestraintTime.bind(this);

// 残り拘束時間
	this.drawRemainingRestraintTime = _drawRemainingRestraintTime.bind(this);

// 休憩時間
	this.drawRestTime = _drawRestTime.bind(this);

// 休憩時間残
	this.drawRemainingRestTime = _drawRemainingRestTime.bind(this);

// 休息時間
	this.drawLongrestTime = _drawLongrestTime.bind(this);

// 休息時間残
	this.drawRemainingLongrestTime = _drawRemainingLongrestTime.bind(this);

// 連続運転許容時間
	this.drawDrivingInterruptionTime = _drawDrivingInterruptionTime.bind(this);

// 中断時間
	this.drawContinuousDriveingAllowableTime = _drawContinuousDriveingAllowableTime.bind(this);

	return this;
/*
* 拘束時間
*/
	function _drawRestraintTime (time) {

		let elm = this.parent.getRestraintTimeElement();
		elm.innerText = _hour(time)+ ":"+ _min(time);

	}

/*
* 残り拘束時間
*/
	function _drawRemainingRestraintTime (time) {

		let min = _min(time);
		let hour = _hour(time);

		let elm = this.parent.getRemainingRestraintTimeElement();

		// マイナスであれば、

		if(time < 0) {
			hour = ('-'+Math.trunc(-1*time/1000/60/60)). slice(-3);
			min =  ('0'+Math.trunc(-1*time/1000/60%60)). slice(-2);
		}
		elm.innerText = hour + ":"+ min;

	}

/*
* 休憩時間
*/
	function _drawRestTime(time) {

		let elm = this.parent.getRestTimeElement();
		elm.innerText = _hour(time)+ ":"+ _min(time);

	}

/*
* 休憩時間残
*/
	function _drawRemainingRestTime(time) {

		let elm = this.parent.getRemainingRestTimeElement();
		let rtime = parseInt(time/60/1000);
		let hour, min;

		if(rtime == 60) {

			hour = '01';
			min = '00';

		} else if(rtime < 60 && rtime >0) {

			hour = '00';
			min =  ('0'+parseInt(time/1000/60%60)). slice(-2);

		} else if(rtime == 0) {

			hour = '00';
			min = '00';

		} else {
			hour = ('-'+Math.trunc(-1*time/1000/60/60)). slice(-3);
			min =  ('0'+Math.trunc(-1*time/1000/60%60)). slice(-2);

		}

		elm.innerText = hour+ ":"+min;

	}

/*
* 休息時間
*/
	function _drawLongrestTime(time) {

		let elm = this.parent.getLongrestTimeElement();
		elm.innerText = _hour(time)+ ":"+ _min(time);

	}

/*
* 休息時間残
*/
	function _drawRemainingLongrestTime(time) {

		let elm = this.parent.getRemainingLongrestTimeElement();
		let hour, min,max;

		min =  '00';

		switch(time ) {
		case 0:
			hour = '00';
		break;
		case (6 * 60*60*1000) :
			hour = "06";
		break;
		case (4 * 60*60*1000) :
			hour = "04";
		break;
		default:
			return;
		}

		elm.innerText = hour+ ":"+min;

	}

/*
* 中断時間
*/
	function _drawDrivingInterruptionTime(time) {

		let elm = this.parent.getDrivingInterruptionTimeElement();
		elm.innerText = _hour(time)+ ":"+ _min(time);

	}

/*
* 連続運転許容時間
*/
	function _drawContinuousDriveingAllowableTime(time) {

		let elm = this.parent.getContinuousDriveingAllowableTimeElement();
		elm.innerText = _hour(time)+ ":"+ _min(time);

	}

	function _hour (time) {
		return ('0'+parseInt(time/1000/60/60)). slice(-2);
	}

	function _min (time) {
		return ('0'+parseInt(time/1000/60%60)). slice(-2);
	}

 }


 function event_class () {
	this.init	= null;
	this.setFunctions = (funcs) => { this.init = funcs; };

	return this;
 }

 function touch_class () {
	this.statusList = {
		outstock :"出庫", instock :"入庫", inspection :"点検",
		attendant_work:"附帯作業",
		loading :"荷積", unloading :"荷卸",
		longrest :" 休憩 / 休息", standby :" 待機",
		other :"その他",
		ferry :" フェリー"};

	this.init	= null;
	this.setFunctions = (funcs) => { this.init = funcs; };

	this.status	= null;
	this.setStatus	= (status) => { this.status = status; };
	this.getStatus	= () => this.status;
	
//
// this.timeout 
// Time to hold down the touch panel.
// The unit is millisecond.
//
	this.timeout	= 300;

	return this;
 }

 function api_class (it) {

   const F = 'function';

   this.parent	= it;

   this.lineFontSize	= 12;
   this.lineFontColor	= "#444";


   this.setMonthDates	= _setMonthDates.bind(it);

// 計画データ表示
   this.drawPlanLines	= _drawPlanLines.bind(it);
   this.clearPlanLines	= _clearPlanLines.bind(it);

   this.reloadPlans = function (plans) {

        this.clearPlanLines();
        it.setPlans( this.drawPlanLines(plans) );

   }

//経過データ表示
   this.drawResultLines	= _drawResultLines.bind(it);
   this.clearResultLines= _clearResultLines.bind(it);

   this.reloadResults = function (results) {

        this.clearResultLines();
        it.setResults( this.drawResultLines(results) );

   }

// Resultに現在のステータスの進捗を追加

   this.addResult = function (result) {

// Resultから古いステータスの進捗を削除、つまりResultの最後のデータを削除

	it.popResults();

// 進捗ラインの描画

	let rt =  this.drawResultLines(result);

// その後、 Resultに現在のステータスの進捗を追加

	it.pushResults( rt);

   }

//経過地点データ表示
   this.drawTransitionPoints = _drawTransitionPoints.bind(it);
   this.clearTransitionPoints = _clearTransitionPoints.bind(it);

   this.reloadTransitionPoints = function (TransitionPoints) {

	this.clearTransitionPoints ();
   	this.drawTransitionPoints (TransitionPoints);

   }

//運転データ表示
   this.drawDriveTransitionPoints = _drawDriveTransitionPoints.bind(it);
   this.clearDriveTransitionPoints = _clearDriveTransitionPoints.bind(it);

   this.reloadDriveTransitionPoints = function (DriveTransitionPoints) {

	this.clearDriveTransitionPoints ();
   	this.drawDriveTransitionPoints (DriveTransitionPoints);

   }

//実務データ表示
   this.drawPracticeTransitionPoints = _drawPracticeTransitionPoints.bind(it);
   this.clearPracticeTransitionPoints = _clearPracticeTransitionPoints.bind(it);

   this.reloadPracticeTransitionPoints = function (PracticeTransitionPoints) {

	this.clearPracticeTransitionPoints ();
	this.drawPracticeTransitionPoints (PracticeTransitionPoints);
   }

//休憩データ表示
   this.drawRestTransitionPoints = _drawRestTransitionPoints.bind(it);
   this.clearRestTransitionPoints = _clearRestTransitionPoints.bind(it);

   this.reloadRestTransitionPoints = function (RestTransitionPoints) {

	this.clearRestTransitionPoints ();
	this.drawRestTransitionPoints (RestTransitionPoints);

   }

//その他データ表示
   this.drawOtherTransitionPoints = _drawOtherTransitionPoints.bind(it);
   this.clearOtherTransitionPoints = _clearOtherTransitionPoints.bind(it);

   this.reloadOtherTransitionPoints = function (OtherTransitionPoints) {

	this.clearOtherTransitionPoints ();
	this.drawOtherTransitionPoints (OtherTransitionPoints);

   }

//休息データ表示
   this.drawLongrestTransitionPoints = _drawLongrestTransitionPoints.bind(it);
   this.clearLongrestTransitionPoints = _clearLongrestTransitionPoints.bind(it);

   this.reloadLongrestTransitionPoints = function (LongrestTransitionPoints) {

	this.clearLongrestTransitionPoints ();
	this.drawLongrestTransitionPoints (LongrestTransitionPoints);

   }

 //
 // add event function.
 //

// plan
   this.planLineClick	= null;
   this.addPlanLineClick	= (func) => this.planLineClick = (typeof func == F)? func.bind(this) : null;

   this.planLineMouseover = null;
   this.addPlanLineMouseover = (func) => this.planLineMouseover = (typeof func == F)? func.bind(this) : null;

   this.planLineMouseout	= null;
   this.addPlanLineMouseout = (func) => this.planLineMouseout = (typeof func == F)? func.bind(this) : null;

   this.planLineMousemove	= null;
   this.addPlanLineMousemove = (func) => this.planLineMousemove = (typeof func == F)? func.bind(this) : null;

   this.planLineMousedown	= null;
   this.addPlanLineMousedown = (func) => this.planLineMousedown = (typeof func == F)? func.bind(this) : null;

   this.planLineMouseup	= null;
   this.addPlanLineMouseup = (func) => this.planLineMouseup = (typeof func == F)? func.bind(this) : null;


// result
   this.resultLineClick	= null;
   this.addResultLineClick= (func) => this.resultLineClick = (typeof func == F)? func.bind(this) : null;

   this.resultLineMouseover = null;
   this.addResultLineMouseover = (func) => this.resultLineMouseover = (typeof func == F)? func.bind(this) : null;

   this.resultLineMouseout  = null;
   this.addResultLineMouseout = (func) => this.resultLineMouseout = (typeof func == F)? func.bind(this) : null;

   this.resultLineMousemove = null;
   this.addResultLineMousemove = (func) => this.resultLineMousemove = (typeof func == F)? func.bind(this) : null;

   this.resultLineMousedown	= null;
   this.addResultLineMousedown = (func) => this.resultLineMousedown = (typeof func == F)? func.bind(this) : null;

   this.resultLineMouseup	= null;
   this.addResultLineMouseup = (func) => this.resultLineMouseup = (typeof func == F)? func.bind(this) : null;


// work
   this.workLineClick	= null;
   this.addWorkLineClick= (func) => this.workLineClick = (typeof func == F)? func.bind(this) : null;

   this.workLineMouseover = null;
   this.addWorkLineMouseover = (func) => this.workLineMouseover = (typeof func == F)? func.bind(this) : null;

   this.workLineMouseout  = null;
   this.addWorkLineMouseout = (func) => this.workLineMouseout = (typeof func == F)? func.bind(this) : null;

   this.workLineMousemove = null;
   this.addWorkLineMousemove = (func) => this.workLineMousemove = (typeof func == F)? func.bind(this) : null;

   this.workLineMousedown	= null;
   this.addWorkLineMousedown = (func) => this.workLineMousedown = (typeof func == F)? func.bind(this) : null;

   this.workLineMouseup	= null;
   this.addWorkLineMouseup = (func) => this.workLineMouseup = (typeof func == F)? func.bind(this) : null;

// job
   this.jobLineClick	= null;
   this.addJobLineClick= (func) => this.jobLineClick = (typeof func == F)? func.bind(this) : null;

   this.jobLineMouseover = null;
   this.addJobLineMouseover = (func) => this.jobLineMouseover = (typeof func == F)? func.bind(this) : null;

   this.jobLineMouseout  = null;
   this.addJobLineMouseout = (func) => this.jobLineMouseout = (typeof func == F)? func.bind(this) : null;

   this.jobLineMousemove = null;
   this.addJobLineMousemove = (func) => this.jobLineMousemove = (typeof func == F)? func.bind(this) : null;

   this.jobLineMousedown	= null;
   this.addJobLineMousedown = (func) => this.jobLineMousedown = (typeof func == F)? func.bind(this) : null;

   this.jobLineMouseup	= null;
   this.addJobLineMouseup = (func) => this.jobLineMouseup = (typeof func == F)? func.bind(this) : null;

// view
// 高速、一般道 切り替え
//
   this.statusViewMousedown	= null;
   this.addStatusViewMousedown = (func) => this.statusViewMousedown = (typeof func == F)? func.bind(this) : null;

   this.statusViewMouseup	= null;
   this.addStatusViewMouseup = (func) => this.statusViewMouseup = (typeof func == F)? func.bind(this) : null;


// For iPad
// plan
   this.planLineTouchmove	= null
   this.addPlanLineTouchmove = (func) => this.planLineTouchmove = (typeof func == F)? func.bind(this) : null;

   this.planLineTouchstart = null
   this.addPlanLineTouchstart = (func) => this.planLineTouchstart = (typeof func == F)? func.bind(this) : null;

   this.planLineTouchend	= null
   this.addPlanLineTouchend = (func) => this.planLineTouchend = (typeof func == F)? func.bind(this) : null;

// result
   this.resultLineTouchmove = null
   this.addResultLineTouchmove = (func) => this.resultLineTouchmove = (typeof func == F)? func.bind(this) : null;

   this.resultLineTouchstart = null
   this.addResultLineTouchstart = (func) => this.resultLineTouchstart = (typeof func == F)? func.bind(this) : null;

   this.resultLineTouchend = null
   this.addResultLineTouchend = (func) => this.resultLineTouchend = (typeof func == F)? func.bind(this) : null;

// work
   this.workLineTouchmove = null
   this.addWorkLineTouchmove = (func) => this.workLineTouchmove = (typeof func == F)? func.bind(this) : null;

   this.workLineTouchstart = null
   this.addWorkLineTouchstart = (func) => this.workLineTouchstart = (typeof func == F)? func.bind(this) : null;

   this.workLineTouchend = null
   this.addWorkLineTouchend = (func) => this.workLineTouchend = (typeof func == F)? func.bind(this) : null;


// job
   this.jobLineTouchmove = null
   this.addJobLineTouchmove = (func) => this.jobLineTouchmove = (typeof func == F)? func.bind(this) : null;

   this.jobLineTouchstart = null
   this.addJobLineTouchstart = (func) => this.jobLineTouchstart = (typeof func == F)? func.bind(this) : null;

   this.jobLineTouchend = null
   this.addJobLineTouchend = (func) => this.jobLineTouchend = (typeof func == F)? func.bind(this) : null;


// view
// 高速、一般道 切り替え
//
   this.statusViewTouchstart	= null;
   this.addStatusViewTouchstart = (func) => this.statusViewTouchstart = (typeof func == F)? func.bind(this) : null;

   this.statusViewTouchend	= null;
   this.addStatusViewTouchend = (func) => this.statusViewTouchend = (typeof func == F)? func.bind(this) : null;


//
// For iPad
// plan


//
   this.setTransitionPointsVisibility = _setTransitionPointsVisibility;

   this.setAreaBackgroundColor = _setAreaBackgroundColor;
   this.setLineBackgroundColor = _setLineBackgroundColor;

   this.setLineTransitionPointsVisibility = _setLineTransitionPointsVisibility;
   this.setDriveTransitionPointsVisibility = _setDriveTransitionPointsVisibility;
   this.setPracticeTransitionPointsVisibility = _setPracticeTransitionPointsVisibility;
   this.setRestTransitionPointsVisibility = _setRestTransitionPointsVisibility;
   this.setOtherTransitionPointsVisibility = _setOtherTransitionPointsVisibility;
   this.setLongrestTransitionPointsVisibility = _setLongrestTransitionPointsVisibility;


// Plan:
   this.drawPlanDriving		= _drawPlanDriving;
   this.drawPlanPractice	= _drawPlanPractice;
   this.drawPlanRest		= _drawPlanRest;
   this.drawPlanLongrest	= _drawPlanLongrest;
   this.drawPlanOther		= _drawPlanOther;
   this.drawPlanStandby		= _drawPlanStandby;
   this.drawPlanWorkTotal	= _drawPlanWorkTotal;
   this.drawPlanRestraintTotal	= _drawPlanRestraintTotal;
   this.drawPlanContinuousOperationExcessTime = _drawPlanContinuousOperationExcessTime;
   this.drawPlanAttendant_work	= _drawPlanAttendant_work;

// Result:
   this.drawResultDriving	= _drawResultDriving;
   this.drawResultPractice	= _drawResultPractice;
   this.drawResultRest		= _drawResultRest;
   this.drawResultLongrest	= _drawResultLongrest;
   this.drawResultOther		= _drawResultOther;
   this.drawResultStandby	= _drawResultStandby;
   this.drawResultWorkTotal	= _drawResultWorkTotal;
   this.drawResultRestraintTotal= _drawResultRestraintTotal;
   this.drawResultContinuousOperationExcessTime = _drawResultContinuousOperationExcessTime;
   this.drawResultAttendant_work= _drawResultAttendant_work;

/*
*   this.drawResultTotal		= _drawResultTotal;
*/

   this.time	= _time;

   this.setTablePlan		= _setTablePlan;

   return this;

/*
*
* tableに表示
*
*/
	function _setTablePlan(plan) {

		this.drawPlanDriving (_w( plan['plan-driving']));

		this.drawPlanPractice (_w( plan['plan-practice']));

		this.drawPlanRest (_w( plan['plan-rest']));

		this.drawPlanLongrest (_w( plan['plan-other']));

		this.drawPlanOther (_w( plan['plan-standby']));

		this.drawPlanStandby (_w( plan['plan-longrest']));

		this.drawPlanWorkTotal (_w( plan['plan-work-total']));

		this.drawPlanRestraintTotal (_w( plan['plan-restraint-total']));

		this.drawPlanContinuousOperationExcessTime (_w( plan['plan-continuous-operation-overtime']));

		this.drawPlanAttendant_work (_w( plan['plan-attendant_work']));
		
		return;

		function _w(w) {
			return w ? w:'';
		}
	}

/*
* 運転 時間の表示
*/
	function __drawPlan(id, time) {
		document.getElementById(id).innerText = (typeof time == 'string')? time:_time(time);
	}

	function __drawResult(id, time) {
		document.getElementById(id).innerText = _time(time);
	}

	function _drawPlanDriving (time) {
		let id = 'plan-driving'+0;
		__drawPlan(id, time);
	}

	function _drawResultDriving (time) {
		let id = 'result-driving'+0;
		__drawResult(id, time);
	}

// 運転外実務 時間の表示
	function _drawPlanPractice (time) {
		let id = 'plan-practice'+0;
		__drawPlan(id, time);
	}

	function _drawResultPractice (time) {
		let id = 'result-practice'+0;
		__drawResult(id, time);
	}

// 休憩 時間の表示
	function _drawPlanRest (time) {
		let id = 'plan-rest'+0;
		__drawPlan(id, time);
	}

	function _drawResultRest (time) {
		let id = 'result-rest'+0;
		__drawResult(id, time);
	}

// その他 時間の表示
	function _drawPlanOther (time) {
		let id = 'plan-other'+0;
		__drawPlan(id, time);
	}

	function _drawResultOther (time) {
		let id = 'result-other'+0;
		__drawResult(id, time);
	}

// 待機 時間の表示
	function _drawPlanStandby (time) {
		let id = 'plan-standby'+0;
		__drawPlan(id, time);
	}

	function _drawResultStandby (time) {
		let id = 'result-standby'+0;
		__drawResult(id, time);
	}

// 休息 時間の表示
	function _drawPlanLongrest (time) {
		let id = 'plan-longrest'+0;
		__drawPlan(id, time);
	}

	function _drawResultLongrest (time) {
		let id = 'result-longrest'+0;
		__drawResult(id, time);
	}

// 労働時間合計 時間の表示
	function _drawPlanWorkTotal (time) {
		let id = 'plan-work-total'+0;
		__drawPlan(id, time);
	}

	function _drawResultWorkTotal (time) {
		let id = 'result-work-total'+0;
		__drawResult(id, time);
	}

// 拘束時間合計 時間の表示
	function _drawPlanRestraintTotal (time) {
		let id = 'plan-restraint-total'+0;
		__drawPlan(id, time);
	}

	function _drawResultRestraintTotal (time) {
		let id = 'result-restraint-total'+0;
		__drawResult(id, time);
	}

// 連続運転超過 時間の表示
	function _drawPlanContinuousOperationExcessTime (time) {
		let id = 'plan-continuous-operation-overtime'+0;
		__drawPlan(id, time);
	}

	function _drawResultContinuousOperationExcessTime (time) {
		let id = 'result-continuous-operation-overtime'+0;
		__drawResult(id, time);
	}

// 附帯作業 時間の表示
	function _drawPlanAttendant_work (time) {
		let id = 'plan-attendant_work'+0;
		__drawPlan(id, time);
	}

	function _drawResultAttendant_work (time) {
		let id = 'result-attendant_work'+0;
		__drawResult(id, time);
	}


   function _time (time) {

	if(time < 0) {
		return ('-'+Math.trunc(-1*time/1000/60/60)). slice(-2) +":"+ ('0'+Math.trunc(-1*time/1000/60%60)). slice(-2);
	}

	return ('0'+parseInt(time/1000/60/60)).slice(-2) +":"+ ('0'+parseInt(time/1000/60%60)).slice(-2);

   }


   function _setLineBackgroundColor (target, _event) {
	const MOUSEDOWN_COLOR	= this.planColor;
	const MOUSEUP_COLOR	= this.planColor;
	const MOUSEDOWN_OPACITY = 0.4;
	const MOUSEUP_OPACITY	= this.parent.planOpacity;

	let color;
	let opacity;

	switch(_event) {
	case "down":
		color = MOUSEDOWN_COLOR;
		opacity = MOUSEDOWN_OPACITY;
	break;
	case "up":
		color = MOUSEUP_COLOR;
		opacity = MOUSEUP_OPACITY;
	break;
	}

	target.style.backgroundColor = color;
	target.style.opacity =opacity;
	
   }

   function _setAreaBackgroundColor (target, visibility) {
	const MOUSEDOWN_COLOR	= "#cdf";
	const MOUSEUP_COLOR	= "transparent";
	const MOUSEDOWN_OPACITY = 0.2;
	const MOUSEUP_OPACITY	= 1;

	let color;
	let opacity;

	switch(visibility) {
	case "hidden":
		color = MOUSEDOWN_COLOR;
		opacity = MOUSEDOWN_OPACITY;
	break;
	default:
	case "visible":
		color = MOUSEUP_COLOR;
		opacity = MOUSEUP_OPACITY;
	break;
	}

	target.style.backgroundColor = color;
	target.style.opacity =opacity;
	
   }

   function _setTransitionPointsVisibility (_dateNumber, _workNumber ,_visibility) {

	//console.log(_dateNumber+":"+_workNumber);
	let len = this.parent.getTransitionPointNumber();
	let dateNumber, workNumber, target;

	for(let i = 0; i <= len; i++) {
		target = this.parent.transitionPointAttribute[i];
		dateNumber=target.dateNumber
		workNumber=target.workNumber

		//console.log(dateNumber+":"+workNumber);

		if(_dateNumber != dateNumber ) {
			continue;
		}
		target.element.style.visibility = _visibility;
	}
   }

   function _setLineTransitionPointsVisibility (obj, _visibility) {

	const spanNames = ["line1","line2","line3"];
	const up_down = 0;
	const fill = false;

	let dateNumber, workNumber, target;
	let begin, end, info, spanName, child;
	let top,left,wk,width, diff_h, prefix, textContent;
	let beginHour, beginMin, endHour, endMin;


/*
	for(let i in obj) {
		if(obj[i] == null) continue;
		console.log(i+":"+obj[i].toString());
	}
*/

	dateNumber = obj.dateNumber;
	workNumber = obj.workNumber;
	
	begin = obj.begin;
	end = obj.end;

	wk = end.split(":");
	if( wk[0] == "24") {
		end = "24:00";
	}
	

	if((obj.info == null || obj.info == "") 
		&& (obj.loading == null || obj.loading == "")) {
		//console.log("info == null");
		return;
	}
	if(obj.info == null || obj.info == "") {
		info =  begin+"～"+end+" "+obj.loading;
	} else  if(obj.loading == null || obj.loading == "") {
		info =  begin+"～"+end+" "+obj.info;
	} else {
		info =  begin+"～"+end+" "+obj.info+":"+obj.loading;
	}
	
	diff_h = this.diff_h;

        wk = begin.split(":");
        beginHour = this.parent.parseHour(wk[0]);
        beginMin = this.parent.parseMin(wk[1]);

	switch(up_down){
	default:
	case 0:
		if(fill == true) {
			prefix = "▼";
		} else {
			prefix = "▽";
		}
	break;
	case 1:
		if(fill == true) {
			prefix = "▲";
		} else {
			prefix = "△";
		}
	break;
	}

	left = this.parent.startX + beginHour + beginMin -5 -0.5;

	let metrics = this.parent.ctx.measureText(info+' '+prefix);
	width = parseInt((metrics.width+1)*this.parent.planFontSize/11);

	//console.log("metrics.width="+metrics.width+":width="+width);
        if((left+width) < (this.parent.innerWidth-6) ) {
                textContent = prefix+info;
        } else {
                left -= width -12 ;
                textContent = info+prefix;
        }

	top = this.parent.bodyPaddingTop+5 + dateNumber*(this.parent.spanH*5 + this.parent.topHeight + 2);

	spanName = spanNames[dateNumber];
	
	child = document.getElementById(spanName);
	switch(_visibility) {
	case "visible":
	break;
	case "hidden":
		child.textContent = "";
	return;
	}

        child.style.position = "absolute";
        child.style.top = top + "px";
        child.style.left = left +"px";
        child.style.width = width + "px";
	child.style.fontSize = this.lineFontSize + "px";
	child.style.color = this.lineFontColor;
	child.textContent = textContent;

	return child;

   }

   function _setDriveTransitionPointsVisibility (_dateNumber, _workNumber ,_visibility) {

	//console.log(_dateNumber+":"+_workNumber);
	let len = this.parent.getDriveTransitionPointNumber();
	let dateNumber, workNumber, target;

	for(let i = 0; i <= len; i++) {
		target = this.parent.driveTransitionPointAttribute[i];
		dateNumber=target.dateNumber
		workNumber=target.workNumber

		//console.log(dateNumber+":"+workNumber);

		if(_dateNumber != dateNumber ) {
			continue;
		}
		target.element.style.visibility = _visibility;
	}
   }

   function _setPracticeTransitionPointsVisibility (_dateNumber, _workNumber ,_visibility) {

	//console.log(_dateNumber+":"+_workNumber);
	let len = this.parent.getPracticeTransitionPointNumber();
	let dateNumber, workNumber, target;

	for(let i = 0; i <= len; i++) {
		target = this.parent.practiceTransitionPointAttribute[i];
		dateNumber=target.dateNumber
		workNumber=target.workNumber

		//console.log(dateNumber+":"+workNumber);

		if(_dateNumber != dateNumber ) {
			continue;
		}
		target.element.style.visibility = _visibility;
	}
   }

   function _setRestTransitionPointsVisibility (_dateNumber, _workNumber ,_visibility) {

	//console.log(_dateNumber+":"+_workNumber);
	let len = this.parent.getRestTransitionPointNumber();
	let dateNumber, workNumber, target;

	for(let i = 0; i <= len; i++) {
		target = this.parent.restTransitionPointAttribute[i];
		dateNumber=target.dateNumber
		workNumber=target.workNumber

		//console.log(dateNumber+":"+workNumber);

		if(_dateNumber != dateNumber ) {
			continue;
		}
		target.element.style.visibility = _visibility;
	}
   }

   function _setOtherTransitionPointsVisibility (_dateNumber, _workNumber ,_visibility) {

	//console.log(_dateNumber+":"+_workNumber);
	let len = this.parent.getOtherTransitionPointNumber();
	let dateNumber, workNumber, target;

	for(let i = 0; i <= len; i++) {
		target = this.parent.otherTransitionPointAttribute[i];
		dateNumber=target.dateNumber
		workNumber=target.workNumber

		//console.log(dateNumber+":"+workNumber);

		if(_dateNumber != dateNumber ) {
			continue;
		}
		target.element.style.visibility = _visibility;
	}
   }

   function _setLongrestTransitionPointsVisibility (_dateNumber, _workNumber ,_visibility) {

	//console.log(_dateNumber+":"+_workNumber);
	let len = this.parent.getLongrestTransitionPointNumber();
	let dateNumber, workNumber, target;

	for(let i = 0; i <= len; i++) {
		target = this.parent.longrestTransitionPointAttribute[i];
		dateNumber=target.dateNumber
		workNumber=target.workNumber

		//console.log(dateNumber+":"+workNumber);

		if(_dateNumber != dateNumber ) {
			continue;
		}
		target.element.style.visibility = _visibility;
	}
   }

 }


 function _setMonthDates(yyyy, mm, dd) {

	let second = new Date(yyyy, (parseInt(mm) -1), (parseInt(dd)+1).toString());
	let third = new Date(yyyy, (parseInt(mm) -1), (parseInt(dd)+2).toString());

	let times = this.dayTimes;

	switch(times) {
	default:
	case 3:
		this.month_date(
			2, 
			(third.getMonth()+1).toString(), 
			(third.getDate()).toString()
		);

	case 2:
		this.month_date(
			1, 
			(second.getMonth()+1).toString(), 
			(second.getDate()).toString()
		);

	case 1:
		this.month_date(
			0,
			mm,
			dd
		);
	break;
	}
 }

/*
* 計画データ
*  var Plans = [
*       {dateNumber: 0, // 1日目:0, 2日目:1, 3日目:2
*        workNumber: 1, // 運転:0, 運転外実務:1, 休息・仮眠:2, その他:3, 休息時>間:4
*       begin:"7:30", //開始時間
*       end:"8:00", //終了時間
*       string // 表示文字
*       },
* ]
*/

 function _drawPlanLines(Plans) {

	let d;
	let len = Plans.length;
	let objs, i, l, j, k;

	for (i=0; i < len ;i++) {

		d = Plans[i];

		objs = this.drawPlanLine(
				d.dateNumber,
				d.workNumber,
				d.begin,
				d.end
			);

		objs[0].textContent = d.string;

		l = objs.length;

		j = this.getPlanLineNumber();

		for(k=0; k < l; k++) {
			objs[k].lineAttribute.string = d.string;
			objs[k].lineAttribute.info = d.info;
			objs[k].lineAttribute.loading = d.loading;
		}

	}

	return objs;
 }

/*
* 経過データ
* var Results = [
*       {dateNumber: 0,// 1日目:0, 2日目:1, 3日目:2
*        workNumber: 1,//　運転:0, 運転外実務:1, 休息・仮眠:2, その他:3, 休息時>
間:4
*       begin:"7:30", //開始時間
*       end:"8:00" //終了時間
*       },
* ]
*/

 function _drawResultLines(Results) {

	let d, d1, child;
	let len = Results.length;
	let i, l, j, k;
	let objs = [];

	for (i=0; i < len ;i++) {

		d = Results[i];

		objs[i] = this.drawResultLine(
				d.dateNumber,
				d.workNumber,
				d.begin,
				d.end
			)

		if(i < len -1) {

			d1 = Results[i+1];
			child = this.drawVerticalBar(
				d1.dateNumber, //d.dateNumber,
				d.workNumber,
				d1.workNumber,
				d.end
			);
		}
	}

	return objs;
 }

 function _clearPlanLines() {

	let i;
	let len,obj;


	len = this.getPlanLineNumber();
	for (i=len; i >= 0 ;i--) {
		obj = _core.planLinesAttribute[i]
		if(obj != null) {
			if(obj.element != null) {
				obj.element.remove();
			}
			delete _core.planLinesAttribute[i];
		} else {
			for(let j in obj) {
				console.log("Error="+j+":"+obj[j].toString());
			}
		}
	}
	this.initPlanLineNumber();
	

// Planに縦棒はないので縦棒の初期化は不要

 }

 function _clearResultLines() {

	let i;
	let len,obj;


	len = this.getResultLineNumber();
	for (i=len; i >= 0 ;i--) {
		obj = _core.resultLinesAttribute[i]
		if(obj != null) {
			if(obj.element != null) {
				obj.element.remove();
			}
			delete _core.resultLinesAttribute[i];
		} else {
			for(let j in obj) {
				console.log("Error="+j+":"+obj[j].toString());
			}
		}
	}
	this.initResultLineNumber();
	
// 縦棒
	len = this.getBarLineNumber();
	for (i=len; i >= 0 ;i--) {
		obj = _core.barLinesAttribute[i];
		if(obj != null) {
			if(obj.element != null) {
				obj.element.remove();
			}
			delete _core.barLinesAttribute[i];
		} else {
			for(let j in obj) {
				console.log("Error="+j+":"+obj[j].toString());
			}
		}
	}
	this.initBarLineNumber();

 }

/*
* 経過地点データ
* var TransitionPoints = [
*       dateNumber: 0, // 1日目:0, 2日目:1, 3日目:2
*        workNumber: 1, //　運転:0, 運転外実務:1, 休息・仮眠:2, その他:3, 休息時間:4
*       begin:"7:30", //開始時間
*       end:"8:30", //終了時間
*       string:"", // 表示文字
*       up_down:0, //上三角 :0, 下三角:1
*       fill: false //塗りつぶし三角 :true, 塗りつぶし無し三角: false
*	time_align: null, //時間表示の位置: left , right, null
*	period: false, //期間表示: true:有り, false:無し
*
*/

 function _drawTransitionPoints(TransitionPoints) {

	let d,j,child;
	let len = TransitionPoints.length;
	let time = 0;

	let parent = this.getMainElement() ;
	
	for (let i=0; i < len ;i++,time++) {
		if(time == this.transitionPointsTimes) {
			time = 0;
		}

		d = TransitionPoints[i];

		let j = this.countupTransitionPointNumber();

		let transitionPointAttribute = this.transitionPointAttribute[i] = {
			"dateNumber":d.dateNumber,
			"workNumber":d.workNumber,
			"viewPosY":time,
			"begin":d.begin,	
			"end":d.end,	
			"string":d.string,
			"up_down": d.up_down,
			"fill":d.fill,
			"time_align":d.time_align,
			"period":d.period,
			"transitionPointNumber":j,
			"element":null
			};

 		child = this.draw_TransitionPoint(parent, d.dateNumber, d.workNumber, time, d.begin, d.end, d.string, d.up_down, d.fill, d.time_align, d.period, j, transitionPointAttribute);

		this.transitionPointAttribute[i].element = child;
 		child.transitionPointAttribute = transitionPointAttribute;
	}
 
 }

 function _clearTransitionPoints() {

	let obj,j,child;
	let len ;

 	len = this.getTransitionPointNumber();
	
	for (i=len; i >= 0 ;i--) {
		obj = _core.transitionPointAttribute[i];
		if(obj != null) {
			if(obj.element != null) {
				obj.element.remove();
			}
 			delete _core.transitionPointAttribute[i];
		} else {
			for(let j in obj) {
				console.log("Error="+j+":"+obj[j].toString());
			}
		}

	}
	this.initTransitionPointNumber();
 
 }

 function _drawDriveTransitionPoints(TransitionPoints) {

	let d,j,child;
	let len = TransitionPoints.length;
	let time = 0;

	let parent = document.getElementById('sub');
	
	for (let i=0; i < len ;i++,time++) {
		if(time == this.transitionPointsTimes) {
			time = 0;
		}

		d = TransitionPoints[i];

		j = this.countupDriveTransitionPointNumber();

		let transitionPointAttribute = this.driveTransitionPointAttribute[i] = {
			"dateNumber":d.dateNumber,
			"workNumber":d.workNumber,
			"viewPosY":time,
			"begin":d.begin,	
			"end":d.end,	
			"string":d.string,
			"up_down": d.up_down,
			"fill":d.fill,
			"time_align":d.time_align,
			"period":d.period,
			"transitionPointNumber":j,
			"element":null
			};

 		child = this.draw_TransitionPoint(parent, d.dateNumber, d.workNumber, time, d.begin, d.end, d.string, d.up_down, d.fill, d.time_align, d.period, j, transitionPointAttribute);
		if(child == null) {
			continue;
		}

		this.driveTransitionPointAttribute[i].element = child;
 		child.transitionPointAttribute = transitionPointAttribute;

		child.style.visibility = "hidden";
	}
 
 }

 function _clearDriveTransitionPoints() {

	let obj,j,child;
	let len;

	len = this.getDriveTransitionPointNumber();
	
	for (i=len; i >= 0 ;i--) {
		obj = _core.driveTransitionPointAttribute[i];
		if(obj != null) {
			if(obj.element != null) {
				obj.element.remove();
			}
 			delete _core.driveTransitionPointAttribute[i];
		} else {
			for(let j in obj) {
				console.log("Error="+j+":"+obj[j].toString());
			}
		}

	}

	this.initDriveTransitionPointNumber();

 }

 function _drawPracticeTransitionPoints(TransitionPoints) {

	let d,j,child;
	let len = TransitionPoints.length;
	let time = 0;

	let parent = document.getElementById('sub');
	
	for (let i=0; i < len ;i++,time++) {
		if(time == this.transitionPointsTimes) {
			time = 0;
		}

		d = TransitionPoints[i];

		j = this.countupPracticeTransitionPointNumber();

		let transitionPointAttribute = this.practiceTransitionPointAttribute[i] = {
			"dateNumber":d.dateNumber,
			"workNumber":d.workNumber,
			"viewPosY":time,
			"begin":d.begin,	
			"end":d.end,	
			"string":d.string,
			"up_down": d.up_down,
			"fill":d.fill,
			"time_align":d.time_align,
			"period":d.period,
			"transitionPointNumber":j,
			"element":null
			};

 		child = this.draw_TransitionPoint(parent, d.dateNumber, d.workNumber, time, d.begin, d.end , d.string, d.up_down, d.fill, d.time_align, d.period, j, transitionPointAttribute);
		if(child == null) {
			continue;
		}

		this.practiceTransitionPointAttribute[i].element = child;
 		child.transitionPointAttribute = transitionPointAttribute;

		child.style.visibility = "hidden";
	}
 }

 function _clearPracticeTransitionPoints() {

	let obj,j,child;
	let len;

	len = this.getPracticeTransitionPointNumber();
	
	for (i=len; i >= 0 ;i--) {
		obj = _core.practiceTransitionPointAttribute[i];
		if(obj != null) {
			if(obj.element != null) {
				obj.element.remove();
			}
			delete _core.practiceTransitionPointAttribute[i];
		} else {
			for(let j in obj) {
				console.log("Error="+j+":"+obj[j].toString());
			}
		}

	}

	this.initPracticeTransitionPointNumber();

 }
 
 function _drawRestTransitionPoints(TransitionPoints) {

	let d,j,child;
	let len = TransitionPoints.length;
	let time = 0;

	let parent = document.getElementById('sub');
	
	for (let i=0; i < len ;i++,time++) {
		if(time == this.transitionPointsTimes) {
			time = 0;
		}

		d = TransitionPoints[i];

		j = this.countupRestTransitionPointNumber();

		let transitionPointAttribute = this.restTransitionPointAttribute[i] = {
			"dateNumber":d.dateNumber,
			"workNumber":d.workNumber,
			"viewPosY":time,
			"begin":d.begin,	
			"end":d.end,	
			"string":d.string,
			"up_down": d.up_down,
			"fill":d.fill,
			"time_align":d.time_align,
			"period":d.period,
			"transitionPointNumber":j,
			"element":null
			};

 		child = this.draw_TransitionPoint(parent, d.dateNumber, d.workNumber, time, d.begin, d.end, d.string, d.up_down, d.fill, d.time_align, d.period, j, transitionPointAttribute);
		if(child == null) {
			continue;
		}

		this.restTransitionPointAttribute[i].element = child;
 		child.transitionPointAttribute = transitionPointAttribute;

		child.style.visibility = "hidden";
	}
 
 }

 function _clearRestTransitionPoints() {

	let obj,j,child;
	let len;

	len = this.getRestTransitionPointNumber();
	
	for (i=len; i >= 0 ;i--) {
		obj = _core.restTransitionPointAttribute[i];
		if(obj != null) {
			if(obj.element != null) {
				obj.element.remove();
			}
			delete _core.restTransitionPointAttribute[i];
		} else {
			for(let j in obj) {
				console.log("Error="+j+":"+obj[j].toString());
			}
		}

	}

	this.initRestTransitionPointNumber();

 }
 

 function _drawOtherTransitionPoints(TransitionPoints) {

	let d,j,child;
	let len = TransitionPoints.length;
	let time = 0;

	let parent = document.getElementById('sub');
	
	for (let i=0; i < len ;i++,time++) {
		if(time == this.transitionPointsTimes) {
			time = 0;
		}

		d = TransitionPoints[i];

		j = this.countupOtherTransitionPointNumber();

		let transitionPointAttribute = this.otherTransitionPointAttribute[i] = {
			"dateNumber":d.dateNumber,
			"workNumber":d.workNumber,
			"viewPosY":time,
			"begin":d.begin,	
			"end":d.end,	
			"string":d.string,
			"up_down": d.up_down,
			"fill":d.fill,
			"time_align":d.time_align,
			"period":d.period,
			"transitionPointNumber":j,
			"element":null
			};

 		child = this.draw_TransitionPoint(parent, d.dateNumber, d.workNumber, time, d.begin, d.end , d.string, d.up_down, d.fill, d.time_align, d.period, j, transitionPointAttribute);

		this.otherTransitionPointAttribute[i].element = child;
 		child.transitionPointAttribute = transitionPointAttribute;

		child.style.visibility = "hidden";
	}
 
 }

 function _clearOtherTransitionPoints() {

	let obj,j,child;
	let len;

	len = this.getOtherTransitionPointNumber();
	
	for (i=len; i >= 0 ;i--) {
		obj = _core.otherTransitionPointAttribute[i];
		if(obj != null) {
			if(obj.element != null) {
				obj.element.remove();
			}
			delete _core.otherTransitionPointAttribute[i];
		} else {
			for(let j in obj) {
				console.log("Error="+j+":"+obj[j].toString());
			}
		}

	}

	this.initOtherTransitionPointNumber();

 }

 function _drawLongrestTransitionPoints(TransitionPoints) {

	let d,j,child;
	let len = TransitionPoints.length;
	let time = 0;

	let parent = document.getElementById('sub');
	
	for (let i=0; i < len ;i++,time++) {
		if(time == this.transitionPointsTimes) {
			time = 0;
		}

		d = TransitionPoints[i];

		j = this.countupLongrestTransitionPointNumber();

		let transitionPointAttribute = this.longrestTransitionPointAttribute[i] = {
			"dateNumber":d.dateNumber,
			"workNumber":d.workNumber,
			"viewPosY":time,
			"begin":d.begin,	
			"end":d.end,	
			"string":d.string,
			"up_down": d.up_down,
			"fill":d.fill,
			"time_align":d.time_align,
			"period":d.period,
			"transitionPointNumber":j,
			"element":null
			};

 		child = this.draw_TransitionPoint(parent, d.dateNumber, d.workNumber, time, d.begin, d.end , d.string, d.up_down, d.fill, d.time_align, d.period, j, transitionPointAttribute);
		if(child == null) {
			continue;
		}

		this.longrestTransitionPointAttribute[i].element = child;
 		child.transitionPointAttribute = transitionPointAttribute;

		child.style.visibility = "hidden";
	}
 
 }

 function _clearLongrestTransitionPoints() {

	let obj,j,child;
	let len;

	len = this.getLongrestTransitionPointNumber();
	
	for (i=len; i >= 0 ;i--) {
		obj = _core.otherTransitionPointAttribute[i];
		obj = _core.longrestTransitionPointAttribute[i];
		if(obj != null) {
			if(obj.element != null) {
				obj.element.remove();
			}
			delete _core.longrestTransitionPointAttribute[i];
		} else {
			for(let j in obj) {
				console.log("Error="+j+":"+obj[j].toString());
			}
		}

	}

	this.initLongrestTransitionPointNumber();

 }


 function _setLines(child, i) {
	this.lines [i] = child;
 }


 function _init() {

	this.initMainElement();
 	this.setUserAgent ();
 	this.event.init (this, this.api);
 	this.touch.init (this, this.api);
 	this.jobStatus.init (this);


	const F = 'function';
	let planFuncs, resultFuncs, workFuncs, jobFuncs, statusViewFuncs, f;
	let api = this.api;

	//console.log("here="+document.documentElement.className+":");
	if(document.documentElement.className == "macintosh "  ||
		document.documentElement.className == "ipad ") {
		//alert("ipad");

		planFuncs = {"touchmove":typeof (f=api.planLineTouchmove) == F? f.bind(api):null,
			"touchstart":typeof (f=api.planLineTouchstart) == F? f.bind(api):null,
			"touchend":typeof (f=api.planLineTouchend) == F? f.bind(api):null
			};

		resultFuncs = {"touchmove":typeof (f=api.resultLineTouchmove) == F? f.bind(api):null,
			"touchstart":typeof (f=api.resultLineTouchstart) == F? f.bind(api):null,
			"touchend":typeof (f=api.resultLineTouchend) == F? f.bind(api):null
			};

		workFuncs = {"touchmove":typeof (f=api.workLineTouchmove) == F? f.bind(api):null,
			"touchstart":typeof (f=api.workLineTouchstart) == F? f.bind(api):null,
			"touchend":typeof (f=api.workLineTouchend) == F? f.bind(api):null
			};
		jobFuncs = {"touchmove":typeof (f=api.jobLineTouchmove) == F? f.bind(api):null,
			"touchstart":typeof (f=api.jobLineTouchstart) == F? f.bind(api):null,
			"touchend":typeof (f=api.jobLineTouchend) == F? f.bind(api):null
			};
		statusViewFuncs = {
			"touchstart":typeof (f=api.statusViewTouchstart) == F? f.bind(api):null,
			"touchend":typeof (f=api.statusViewTouchend) == F? f.bind(api):null
			};

	} else {
		//alert("!ipad");

		planFuncs = {"click":typeof (f=api.planLineClick) == F? f.bind(api):null,
			"mouseover":typeof (f=api.planLineMouseover) == F? f.bind(api):null,
			"mouseout":typeof (f=api.planLineMouseout) == F? f.bind(api):null,
			"mousemove":typeof (f=api.planLineMousemove) == F? f.bind(api):null,
			"mousedown":typeof (f=api.planLineMousedown) == F? f.bind(api):null,
			"mouseup":typeof (f=api.planLineMouseup) == F? f.bind(api):null
			};

		resultFuncs = {"click":typeof (f=api.resultLineClick) == F? f.bind(api):null,
			"mouseover":typeof (f=api.resultLineMouseover) == F? f.bind(api):null,
			"mouseout":typeof (f=api.resultLineMouseout) == F? f.bind(api):null,
			"mousemove":typeof (f=api.resultLineMousemove) == F? f.bind(api):null,
			"mousedown":typeof (f=api.resultLineMousedown) == F? f.bind(api):null,
			"mouseup":typeof (f=api.resultLineMouseup) == F? f.bind(api):null 
			};

		workFuncs = {"click":typeof (f=api.workLineClick) == F? f.bind(api):null,
			"mouseover":typeof (f=api.workLineMouseover) == F? f.bind(api):null,
			"mouseout":typeof (f=api.workLineMouseout) == F? f.bind(api):null,
			"mousemove":typeof (f=api.workLineMousemove) == F? f.bind(api):null,
			"mousedown":typeof (f=api.workLineMousedown) == F? f.bind(api):null,
			"mouseup":typeof (f=api.workLineMouseup ) == F? f.bind(api):null
			};

		jobFuncs = {"click":typeof (f=api.jobLineClick) == F? f.bind(api):null,
			"mouseover":typeof (f=api.jobLineMouseover) == F? f.bind(api):null,
			"mouseout":typeof (f=api.jobLineMouseout) == F? f.bind(api):null,
			"mousemove":typeof (f=api.jobLineMousemove) == F? f.bind(api):null,
			"mousedown":typeof (f=api.jobLineMousedown) == F? f.bind(api):null,
			"mouseup":typeof (f=api.jobLineMouseup ) == F? f.bind(api):null
			};

		statusViewFuncs = {
			"mousedown":typeof (f=api.statusViewMousedown) == F? f.bind(api):null,
			"mouseup":typeof (f=api.statusViewMouseup ) == F? f.bind(api):null
			};


	}

	this.setPlanFuncs(planFuncs);
	this.setResultFuncs(resultFuncs);
	this.setWorkFuncs(workFuncs);
	this.setJobFuncs(jobFuncs);
	this.setStatusViewFuncs(statusViewFuncs);
 
 	let h, total, drive;
	h = this.base_table(this.bodyPaddingTop, 0);

 	h = this.base_table( h-5 , 1);

	if(this.dayTimes >= 3) {
 		this.base_table( h-5 , 2);
	}

	this.total = [3];

	let  diff_h = this.spanH * 5 + this.topHeight + this.bodyMarginTop - 2;
 	total = this.drawTotal ("total1", 0, this.margin_top);
	this.total[0] = this.createTableInTotal(total, 0);
	this.total[0].init();

 	total = this.drawTotal ("total2", (diff_h-2), this.margin_top);
	this.total[1] = this.createTableInTotal(total, 1);
	this.total[1].init();

	if(this.dayTimes >= 3) {
 		total = this.drawTotal ("total3", (diff_h-2)*2, this.margin_top);
		this.total[2] = this.createTableInTotal(total,3);
		this.total[2].init();
	}



 	drive = this.drawDrive ("drive1", 0);
	this.createTableInDrive(drive);

 	drive = this.drawDrive ("drive2", diff_h);
	this.createTableInDrive(drive);

	if(this.dayTimes >= 3) {
 		drive = this.drawDrive ("drive3", diff_h*2);
		this.createTableInDrive(drive);
	}

	this.addJobEvent();

 	this.setData();

 	//this.resultInterface();

	return ;
 }

 function _addJobEvent() {
	const ids = [
	"outstock", "instock", "inspection", "loading",
	"attendant_work",
	"unloading", "longrest", "standby",
	"other", "ferry"
];

	let i, child, funcs;

	funcs = this.getJobFuncs();

	for( i in ids) {

		child = document.getElementById(ids[i]);
		this.addEvent(child, funcs);

	}

	funcs = this.getStatusViewFuncs();
	child = document.getElementById("job_status");
	this.addEvent(child, funcs);
	
 }


 function _drawDrive (id, diff_h) {

	let sub
	sub  = document.getElementById(id);
	sub.style.top = (this.bodyMarginTop + this.bodyPaddingTop)+diff_h+1+"px";
	sub.style.left = (this.startX+1)+"px";
	sub.style.width = (this.innerWidth - this.startX - 6)+"px";
	sub.style.height = (this.topHeight*2/3)+"px";

	return sub;
 }

 function _drawTotal (id, diff_h, margin_top) {

	let sub
	sub  = document.getElementById(id);
	sub.style.top = (this.bodyMarginTop + this.bodyPaddingTop )+diff_h+1+"px";
	sub.style.left = (this.startX+1)+"px";
	sub.style.width = (this.innerWidth - this.startX - 6)+"px";
	//sub.style.height = (this.topHeight-2- margin_top)+"px";
	sub.style.height = (this.topHeight-1)+"px";

	return sub;
 }

 function _addEvent(child, funcs) {
	
	//console.log("2"+JSON.stringify(funcs));
	//console.log("2:"+(funcs)+":"+funcs.click);
	for(let i in funcs) {

		//console.log("3:"+child.id+":"+i +","+ funcs[i]);
		//alert("3:"+child.id+":"+i +","+ funcs[i]);
		if(funcs[i] == null) {
			continue;
		}
		child.addEventListener (i, funcs[i].bind(this) , false); 
	}

 }


 function _getMonthDate(dateNumber) {
	return this.date[dateNumber];
 }

/*
* _month_date(
*	dateNumber,  //1日目:0, 2日目:1, 3日目:2
*	 _mm, //月 
*	 _dd  //日
* )
*/

 function _month_date(dateNumber, _mm, _dd) {

	let mm, dd;

	if (_mm.length == 2 && _mm.charAt(0) == "0") {
		mm = _mm.charAt(1);
	} else {
		mm = _mm;
	}

	if (_dd.length == 2 && _dd.charAt(0) == "0") {
		dd = _dd.charAt(1);
	} else {
		dd = _dd;
	}

	this.date[dateNumber] = {};
	this.date[dateNumber].mm = mm;
	this.date[dateNumber].dd = dd;

	let bodyPaddingTop = this.bodyPaddingTop;

	// 月日
	let topX, topY, x1, y1, ctx, l;
	let strW = 13;
	let strH = 26;

	topX	= this.bodyMarginLeft;
	topY	= this.bodyMarginTop + bodyPaddingTop;

	ctx = this.ctx;

	l = mm.length;
	x1 = topX +strW*(2-l*3/5);
	y1 = topY + dateNumber*this.spanH*5 + dateNumber*(this.topHeight+2) + strH*2;
	ctx.fillText(mm, x1, y1);

	l = dd.length;
	x1 = topX +strW*(5-l*3/5);
	ctx.fillText(dd, x1, y1);

 }

/*
* drawPlanLine(
*	dateNumber,  //1日目:0, 2日目:1, 3日目:2
*	workNumber,  //運転:0, 運転外実務:1, 休息・仮眠:2, その他:3, 休息時間:4
*	plan_result, //計画;0, 結果:1
*	begin,       //開始時間
*	end          //終了時間
* ) 
*/
 function _drawPlanLine(dateNumber, workNumber, begin, end) {

	const plan_result = 0;

	let funcs = {};

	let beginHour, beginMin, endHour, endMin, BeginHour, EndHour;
	let i,wk, rt, rt1, rt2;
	const prefix = "plan_";

	switch(plan_result) {
	case 0:
		funcs = this.getPlanFuncs();
		//console.log(JSON.stringify(funcs));
	break;
	case 1:
		funcs = this.getResultFuncs();
		//console.log(JSON.stringify(funcs));
	break;
	default:
		//console.log("Error :plan_result");
	break;
	}

	wk = begin.split(":");

	beginHour = this.parseHour(wk[0]);
	beginMin = this.parseMin(wk[1]);

	wk = end.split(":");
	endHour = this.parseHour(wk[0]);
	endMin = this.parseMin(wk[1]);

	EndHour = parseInt(wk[0]);

	if(beginHour <= endHour && EndHour < 24) {
		i = this.countupPlanLineNumber();

 		rt = this.draw_line(prefix, i, dateNumber, workNumber, plan_result, begin, end) ;
		this.addEvent (rt, funcs);

		this.planLinesAttribute[i] =  rt.lineAttribute;

		return [rt];
	} 

	if(EndHour == 24 && wk[1] == "00") {

		i = this.countupPlanLineNumber();
 		rt = this.draw_line(prefix, i, dateNumber, workNumber, plan_result, begin, end) ;
		this.addEvent (rt, funcs);

		this.planLinesAttribute[i] =  rt.lineAttribute;

		return [rt];
	}

	i = this.countupPlanLineNumber();
	rt1 = this.draw_line(prefix, i, dateNumber, workNumber, plan_result, begin, "24:29", "left");
	this.addEvent (rt1, funcs);

	this.planLinesAttribute[i] =  rt1.lineAttribute;


	i = this.countupPlanLineNumber();
	if(EndHour == 24) {

		rt2 = this.draw_line(prefix, i, dateNumber+1, workNumber, plan_result, "0:00", "0:"+wk[1], "right");

	} else {

		rt2 = this.draw_line(prefix, i, dateNumber+1, workNumber, plan_result, "0:00", end, "right");

	}

	this.addEvent (rt2, funcs);

	this.planLinesAttribute[i] =  rt2.lineAttribute;

	return [rt1, rt2];

 }

/*
* drawResultLine(
*	dateNumber,  //1日目:0, 2日目:1, 3日目:2
*	workNumber,  //運転:0, 運転外実務:1, 休息・仮眠:2, その他:3, 休息時間:4
*	plan_result, //計画;0, 結果:1
*	begin,       //開始時間
*	end          //終了時間
* ) 
*/
 function _drawResultLine(dateNumber, workNumber , begin, end) {

	const plan_result = 1;

	let funcs = {};

	let beginHour, beginMin, endHour, endMin, BeginHour, EndHour;
	let i,wk, rt, rt1, rt2;
	const prefix = "result_";

	switch(plan_result) {
	case 0:
		funcs = this.getPlanFuncs();
		//console.log(JSON.stringify(funcs));
	break;
	case 1:
		funcs = this.getResultFuncs();
		//console.log(JSON.stringify(funcs));
	break;
	default:
		//console.log("Error :plan_result");
	break;
	}

	wk = begin.split(":");

	beginHour = this.parseHour(wk[0]);
	beginMin = this.parseMin(wk[1]);

	wk = end.split(":");
	endHour = this.parseHour(wk[0]);
	endMin = this.parseMin(wk[1]);

	EndHour = parseInt(wk[0]);

	if(beginHour <= endHour && EndHour < 24) {

		i = this.countupResultLineNumber();

 		rt = this.draw_line(prefix, i, dateNumber, workNumber, plan_result, begin, end) ;
		this.addEvent (rt, funcs);

		this.resultLinesAttribute[i] =  rt.lineAttribute;

		return [rt];
	} 

	if(EndHour == 24 && wk[1] == "00") {

		i = this.countupResultLineNumber();

 		rt = this.draw_line(prefix, i, dateNumber, workNumber, plan_result, begin, end) ;
		this.addEvent (rt, funcs);

		this.resultLinesAttribute[i] =  rt.lineAttribute;

		return [rt];
	}

	i = this.countupResultLineNumber();

	rt1 = this.draw_line(prefix, i, dateNumber, workNumber, plan_result, begin, "24:29", "left");
	this.addEvent (rt1, funcs);

	this.resultLinesAttribute[i] =  rt1.lineAttribute;

	i = this.countupResultLineNumber();

	if(EndHour == 24) {

		rt2 = this.draw_line(prefix, i, dateNumber+1, workNumber, plan_result, "0:00", "0:"+wk[1], "right");

	} else {

		rt2 = this.draw_line(prefix, i, dateNumber+1, workNumber, plan_result, "0:00", end, "right");

	}

	this.addEvent (rt2, funcs);

	this.resultLinesAttribute[i] =  rt2.lineAttribute;

	return [rt1, rt2];

 }

 function _parseHour(hh) {

	return parseInt(hh) * this.spanW;

 }

 function _parseMin(mm) {

	let min, j ;

	if(mm == "00") {
		min = 0;
	} else {
		j = parseInt(mm);
		if(j < 0) {
			min = 0;
		} else if(j > 59) {
			min = 0;
		} else { 
			min = parseInt((j * this.spanW ) / 60);
		}
	}

	return  min;
 }


/*
* _draw_TransitionPoint(
*	dateNumber,  //1日目:0, 2日目:1, 3日目:2
*	workNumber,  //運転:0, 運転外実務:1, 休息・仮眠:2, その他:3, 休息時間:4
*       viewPosY,    //表示位置:0 , 1, 2
*	begin,       //開始時間
*       string,      //表示文字:
*	up_down,     //三角の向き:0:下 , 1:上
*       fill.         //三角の塗りつぶし:true:塗りつぶし:false:塗りつぶさない
*	timePosition,// 時間表示の位置 非表示:0,左:1,右:2
*	i,	     // 縦方向の位置
* ) 
*/

 function _draw_TransitionPoint(parent, dateNumber, workNumber, viewPosY, begin , end, string, up_down, fill, time_align, period, i, transitionPointAttribute) {

	if(begin  == null) {
		return;
	}
	let startTimePosX;
	let beginHour, beginMin, endHour, endMin;
	let wk, min, j, opacity, width, lineHeight, capRadius;
	let prefix, textContent;
	let str, align, period_str;

	let top, left ;
	//let end = begin;


	let diff_h = 0;
	let color ;

	try {
	wk = begin.split(":");
	} catch(e) {
		console.log( begin +":"+ end+":"+ string);
	}
	beginHour = this.parseHour(wk[0]);
	beginMin = this.parseMin(wk[1]);

	switch(up_down){
	default:
	case 0:
		if(fill == true) {
			prefix = "▼";
		} else {
			prefix = "▽";
		}
	break;
	case 1:
		if(fill == true) {
			prefix = "▲";
		} else {
			prefix = "△";
		}
	break;
	}


	diff_h = this.diff_h;
	color = this.verticalLineColor;
	opacity = this.viewOpacity;
	top = this.bodyMarginTop + viewPosY*this.viewPosHeight + (this.topHeight + this.spanH*5)*dateNumber +1 ;

	if(period == true ) {
		//console.log("1: time_align = "+time_align);
		switch( time_align) {
		case undefined:
		case "left":
			str = ((begin != null)? begin:"")+"～"+((end != null)? end:"") +" "+string;
		break;
		case "right":
			str = string + " "+((begin != null)? begin:"")+"～"+((end != null)? end:""); 
		break;
		default:
			str = string;
			//console.log(time_align+":"+_draw_TransitionPoint.caller);
		break;
		}
	} else if (period == null) {
		//console.log("2: time_align = "+time_align);
		switch( time_align) {
		case "left":
			str = ((begin != null)? begin:"")+"～"+((end != null)? end:"") +" "+string;
		break;
		case "right":
			str = string + " "+((begin != null)? begin:"")+"～"+((end != null)? end:""); 
		break;
		case undefined:
		default:
			str = begin +" "+string;
			//console.log(time_align+":"+_draw_TransitionPoint.caller);
		break;
		}
	} else {
		//console.log("3: time_align = "+time_align);

		switch( time_align) {
		case "left":
			str = begin +" "+string;
		break;
		case "right":
			str = string + " "+begin; 
		break;
		case undefined:
		default:
			str = string;
			//console.log(time_align+":"+_draw_TransitionPoint.caller);
		break;
		}
	}

	let metrics = this.ctx.measureText(str+' '+prefix);
	width = parseInt((metrics.width+1)*_core.planFontSize/11);
	//console.log(str+":width="+width);
	
	let child, radius;
	//parent = this.canvas;

	left = this.startX + beginHour + beginMin -5 -0.5;
	if((left+width) < (this.innerWidth-6) ) {
		textContent = prefix+str;
		align = "left";
	} else {
		left -= width -12;
		textContent = str+prefix;
		align = "right";
	}


// 
	child = document.createElement('span');
	//child.setAttribute('class', 'transition_point_'+i);
	child.setAttribute('class', 'transition_point');
	child.setAttribute('id', 'transition_point_'+i);
	child.style.backgroundColor = color;

	child.style.position = "absolute";
	child.style.top = top + "px";
	child.style.left = left +"px";
	child.style.width = width + "px";

	child.style.height = lineHeight + "px";
	child.style.opacity = opacity;
	child.textContent = textContent;
	child.style.backgroundColor = "transparent";
 	child.style.fontSize = this.viewFontSize +"px";
 	child.style.color = this.viewFontColor ;
 	child.style.textAlign = align;


	parent.appendChild(child);

	return child;
 }



/*
* _drawVerticalBar(
*	dateNumber,  //1日目:0, 2日目:1, 3日目:2
*	startworkNumber, 開始workNumber
*		//運転:0, 運転外実務:1, 休息・仮眠:2, その他:3, 休息時間:4
*	endworkNumber,  終了workNumber
*		//運転:0, 運転外実務:1, 休息・仮眠:2, その他:3, 休息時間:4
*	plan_result, //計画;0, 結果:1
*	begin        //開始時間
* ) 
*/
 function _drawVerticalBar(dateNumber, begin_workNumber, end_workNumber, begin ) {

	let top, left, plan_result;
	let end = begin;
	plan_result = 2;

	let i = this.countupBarLineNumber();


	let startTimePosX;
	let beginHour, beginMin, endHour, endMin;
	let wk, min, j, opacity, width, lineHeight, capRadius;

	let diff_h = 0;
	let color , workNumber;

	diff_h = this.diff_h;
	color = this.verticalLineColor;
	opacity = this.resultOpacity;

	if((begin_workNumber - end_workNumber) > 0) {

		lineHeight = this.spanH * (begin_workNumber - end_workNumber)
		workNumber = begin_workNumber;

		top = this.lineStartPosY + 
			dateNumber * (this.spanH*5 + this.topHeight) + 
			(end_workNumber ) * (this.spanH )+diff_h + 3.5;

	} else {

		lineHeight = this.spanH * (end_workNumber - begin_workNumber)
		workNumber = end_workNumber;

		top = this.lineStartPosY + 
			dateNumber * (this.spanH*5 + this.topHeight) + 
			(begin_workNumber ) * (this.spanH )+diff_h + 2.5 ;

	}
	
 	this.barLinesAttribute[i] = {
			"dateNumber":dateNumber,
			"workNumber":workNumber,
			"begin":begin,	
			"end":end,
			"plan_result": plan_result,
			"lineNumber":i
			};

	wk = begin.split(":");
	beginHour = this.parseHour(wk[0]);
	beginMin = this.parseMin(wk[1]);

	wk = end.split(":");
	endHour = this.parseHour(wk[0]);
	endMin = this.parseMin(wk[1]);


	let child, parent, radius;
	parent = this.canvas;
	left = this.startX + beginHour + beginMin  -1.5;

	parent = this.getMainElement() ;
	width = this.verticalLineWidth;

// 
	child = document.createElement('span');
	child.setAttribute('id', 'span_'+i);
	child.style.backgroundColor = color;

	child.style.position = "absolute";
	child.style.top = top + "px";
	child.style.left = left +"px";
	child.style.width = width + "px";

	child.style.height = lineHeight + "px";
	child.style.opacity = opacity;


// cap形状の決定
	radius = "0";
	child.style.borderRadius = radius;


	parent.appendChild(child);


 	this.barLinesAttribute[i].left = left;
 	this.barLinesAttribute[i].element = child;

	return child;
 }

 function _getLineTopPosition (dateNumber, workNumber, diff_h) {

	return this.lineStartPosY + dateNumber*this.spanH*5 + workNumber*this.spanH+diff_h+(this.topHeight)*dateNumber;

 }

/*
* draw_line(
*	dateNumber,  //1日目:0, 2日目:1, 3日目:2
*	workNumber,  //運転:0, 運転外実務:1, 休息・仮眠:2, その他:3, 休息時間:4
*	plan_result, //計画;0, 結果:1
*	begin,       //開始時間
*	end,         //終了時間
*       cap          //端のround形状:right, left
* ) 
*/
 function _draw_line(prefix, i, dateNumber, workNumber, plan_result, begin, end, cap) {


 	let lineAttribute = {
			"dateNumber":dateNumber,
			"workNumber":workNumber,
			"begin":begin,	
			"end":end,
			"plan_result": plan_result,
			"lineNumber":i
			};

	let startTimePosX;
	let beginHour, beginMin, endHour, endMin;
	let wk, min, j, opacity, width, lineHeight, capRadius;
	let top;

	let diff_h = 0;
	let color,font_size ;
	switch(plan_result) {
	case 0:
		color = this.planColor;
		opacity = this.planOpacity;
		lineHeight = this.planLineHeight;
		font_size = this.planFontSize;
		
	break;
	case 1:
		diff_h = this.diff_h;
		color = this.resultColor;
		opacity = this.resultOpacity;
		lineHeight = this.resultLineHeight;
		font_size = this.resultFontSize;
	break;
	default:
		console.log("Error :plan_result");
	break;
	}

	wk = begin.split(":");
	beginHour = this.parseHour(wk[0]);
	beginMin = this.parseMin(wk[1]);

	wk = end.split(":");
	endHour = this.parseHour(wk[0]);
	endMin = this.parseMin(wk[1]);


	let child, parent, radius;
	parent = this.canvas;

	parent = this.getMainElement() ;

	width = endHour + endMin - beginHour - beginMin;

	//top = this.lineStartPosY + dateNumber*this.spanH*5 + workNumber*this.spanH+diff_h+(this.topHeight)*dateNumber;
	top = this.getLineTopPosition (dateNumber, workNumber, diff_h);
// 
	child = document.createElement('span');
	child.setAttribute('id', prefix+i);
	child.style.backgroundColor = color;
	child.style.color = this.planStringColor;
	child.style.textAlign = "center";

	child.style.position = "absolute";
	child.style.top = top +"px";
	child.style.left = this.startX + beginHour + beginMin +"px";
	child.style.width = width + "px";

	child.style.height = lineHeight + "px";
	child.style.paddingTop = this.linePaddingTop + "px";
	child.style.paddingBottom = this.linePaddingBottom + "px";
	child.style.opacity = opacity;
 	child.style.fontSize = font_size + "px";
 	child.style.cursor = "pointer";
	//child.style.userSelect = "none";


// cap形状の決定
	switch(plan_result) {
	case 0:
		capRadius = this.capRadius;
		if( width > this.spanW/3) {
			switch(cap) {
			case "right":
				radius = "0 "+capRadius+"px "+capRadius+"px 0";
			break;
			case "left":
				radius = capRadius+"px 0 0 "+capRadius+"px";
			break;
			default:
				if(width >= 20) {
					radius = capRadius +"px";
				} else {
					radius = (capRadius-2) +"px";
				}
			break;
			}
		} else if( width > this.spanW/4) {
			radius = (capRadius-2)+"px";
		} else {
			radius = (capRadius-4)+"px";
		}
	break;
	case 1:
		radius = "3px";
	break;
	}
	child.style.borderRadius = radius;


	parent.appendChild(child);

 	child.lineAttribute = lineAttribute;
 	child.lineAttribute.element = child

	return child;
 }


 function _base_table(bodyPaddingTop, dateNumber) {

	this.canvas = document.getElementById('canvas');
	this.ctx = this.canvas.getContext('2d');

	let ctx = this.ctx;
	let topX, topY, width, height;
	let i, x1, x2,  y, y1, y2 ,y3 ,spanW, spanH, startX, startY, topHeight;
	let child, funcs;
	funcs = this.getWorkFuncs();

	topX	= this.bodyMarginLeft;
	topY	= this.bodyMarginTop + bodyPaddingTop;

	spanW	= this.spanW;
	spanH	= this.spanH;
	topHeight = this.topHeight;
	startX	= this.startX;
	startY	= topY+ topHeight;


	width	= this.innerWidth - (this.bodyMarginLeft+this.bodyMarginRight) ;
	height	= this.topHeight + (spanH)*5;
 
	// 外枠
	ctx.fillStyle = 'transparent';
	ctx.lineWidth = this.outerFrame;
	ctx.setLineDash([]);
	ctx.strokeStyle = "gray";
	ctx.strokeRect(topX+0.5, topY+0.5, width, height);

	// Draw lines
	ctx.lineWidth = this.innerFrame;
	ctx.beginPath();

	// 縦線
	x1 = startX+0.5;
	y1 = topY+1+0.5;
	y2 = topY + height+0.5;
	ctx.moveTo(x1, y1);
	ctx.lineTo(x1, y2);

	// 1-24時 縦破線
	for (i = 1; i < 25 ; i++) {
		x1 = startX+i * spanW+0.5;
		ctx.moveTo(x1, startY);
		ctx.lineTo(x1, y2);
	}

	i = 0;
	x1 = topX + 2;
	x2 = width +4;
	y1 = topY +  topHeight +0.5;
	
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y1);
	ctx.stroke();

	ctx.beginPath();
	ctx.setLineDash([5, 1]);

	x1 = topX + 2+19;
	x2 = width +4;

 	child = this.draw_workTime_area(dateNumber, x1 - 21, y1);
 	this.addEvent(child, funcs);

	child = this.draw_work_area(dateNumber, i, x1, y1);
 	this.addEvent(child, funcs);


	// 横破線
	for (i++; i < 3 ; i++) {
		y1 = topY +  topHeight+ spanH*i;
		
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y1);

		child = this.draw_work_area(dateNumber, i, x1, y1);
 		this.addEvent(child, funcs);
	}
	
	// 労働時間-縦破線
	y1 = topY +  topHeight;
	y3 = topY +  topHeight + spanH*i;
	x1 += 0.5;
	ctx.moveTo(x1, y1);
	ctx.lineTo(x1, y3);

	// 横破線
	for (; i < 5 ; i++) {
		x1 = topX + 2;
		x2 = width +4;
		y1 = topY +  topHeight+ spanH*i+0.5;
		
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y1);

		child = this.draw_work_area(dateNumber, i, x1, y1);
 		this.addEvent(child, funcs);
	}
 	this.addEvent(child, funcs);


	ctx.stroke();

	let str = this.str;
	let strW = 13;
	let strH = 26;

	ctx.fillStyle = '#444';
	ctx.font = "12px serif";

	// 経過地点
	x1 = topX +strW;
	y1 = topY +strH;
	ctx.fillText(str[0], x1, y1);

	// 月日
	x1 = topX +strW*2;
	y1 = topY +strH*2;
	ctx.fillText(str[1], x1, y1);

	x1 = topX +strW*5;
	ctx.fillText(str[2], x1, y1);

	//alert(this.innerHeight+","+this.innerWidth);
	// 1-24時
	x1 = startX;
	y1 = topY+topHeight-3;

	for (i = 1; i < 25 ; i++) {
		x1 = startX+i * spanW -7;
		let s = ((i<10)? ' ':'')+i.toString();

		ctx.fillText(s, x1, y1);
	}

	// 文字
	for (i = 1; i < 4 ; i++) {
		x1 = topX + 4+19;
		y1 = topY +  topHeight+ spanH*i -6;
		
		ctx.fillText(str[2+i], x1, y1);
	}
	for (; i < 6 ; i++) {
		x1 = topX + 4;
		y1 = topY +  topHeight+ spanH*i -6;
		
		ctx.fillText(str[2+i], x1, y1);
	}

	// 労働時間
	for (i = 1; i < 5 ; i++) {
		x1 = topX + 5;
		y1 = topY +  topHeight+ (spanH-9)*i -2;
		
		ctx.fillText(str[7+i], x1, y1);
	}
	
	return y2
 }

 function _setUserAgent () {

	this.ua = window.navigator.userAgent.toLowerCase();
        this.browser = null;

        if (this.ua.indexOf('msie') != -1 ||
                this.ua.indexOf('trident') != -1) {
                this.browser = "msie";
        } else if (this.ua.indexOf('edge') != -1) {
                this.browser = "edge";
        } else if (this.ua.indexOf('chrome') != -1) {
                this.browser = "chrome";
        } else if (this.ua.indexOf('safari') != -1) {
                this.browser = "safari";

                /*
                 * iPadの場合 browser のuserAgentが2種類ある
                 * OS　versionが同一であってもブラウザは異なる場合がある
                 * 判定:core.js
                 *  ua:(ipad)
                 *   --slide-bar: 10px;
                 *  ua:(macintosh)
                 *   --slide-bar: 0px;
                 *
                 * document.documentElementに識別のためのclassNameを追加
                 * ipad or macintosh
                 * layout.cssで--slide-barを切り替える
                 */
                let doc = document.documentElement
                if (this.ua.indexOf('macintosh') != -1) {
                        doc.className += 'macintosh ';
                } else {
                        doc.className += 'ipad ';
                }

        } else if (this.ua.indexOf('firefox') != -1) {
                this.browser = "firefox";
        } else if (this.ua.indexOf('opera') != -1) {
                this.browser = "opera";
        } else {
                this.browser = "unkown";
        }
        //alert("this.browser ="+this.browser+":ua="+this.ua);

	return this.browser;
 }

 function _draw_work_area(dateNumber, workNumber, left, top) {
	//console.log(top+":"+left);

	let i = this.countupAreaNumber();

 	this.areaAttribute[i] = {
			"dateNumber":dateNumber,
			"workNumber":workNumber,
			"areaNumber":i,
			"work_area":true
			};

	let width, height,opacity;

	let diff_h = 0;
	let color,font_size ;

	color = this.planColor;
	opacity = this.planOpacity;

	width = this.workAreaWidth;
	switch(workNumber) {
	case 4:
	case 3:
		width += 20;
	//console.log("workNumber ="+workNumber);
	break;
	}
	height = this.spanH-2;

	var child, parent;
	parent = this.canvas;

	parent = this.getMainElement() ;
// 
	child = document.createElement('span');
	child.setAttribute('id', 'area_'+i);
	child.style.backgroundColor = 'transparent';
	//child.style.backgroundColor = 'red';

	child.style.position = "absolute";
	child.style.top = (top +1)+ "px";
	child.style.left = left + "px";

	child.style.width = width + "px";
	child.style.height = height + "px";

 	child.style.cursor = "pointer";
 	//child.style.userSelect = "none";

	child.areaAttribute = this.areaAttribute[i];

	parent.appendChild(child);

	return child;
 }

 function _draw_workTime_area(dateNumber, left, top) {
	//console.log(top+":"+left);

	let i = this.countupAreaNumber();

 	this.areaAttribute[i] = {
			"dateNumber":dateNumber,
			"areaNumber":i,
			"workTime_area":true
			};

	let width, height,opacity;

	let diff_h = 0;
	let color,font_size ;

	color = this.planColor;
	opacity = this.planOpacity;

	width = this.workTime_area_width;
	height = this.spanH*3-2;

	var child, parent;
	parent = this.canvas;

	parent = this.getMainElement() ;
// 
	child = document.createElement('span');
	child.setAttribute('id', 'area_'+i);
	child.style.backgroundColor = 'transparent';
	//child.style.backgroundColor = 'red';

	child.style.position = "absolute";
	child.style.top = (top +1)+ "px";
	child.style.left = left + "px";

	child.style.width = width + "px";
	child.style.height = height + "px";

 	child.style.cursor = "pointer";
 	//child.style.userSelect = "none";

	child.areaAttribute = this.areaAttribute[i];

	parent.appendChild(child);

	return child;
 }

 function lib_class () {
	this.status2workNumber	= _status2workNumber.bind(this);
	this.kanji2status	= _kanji2status.bind(this);

	return this;

	function _kanji2status (kanji) {
		switch (kanji) {
		case "出庫":
			return "outstock";

		case "走行":
			return "driving";

		case "入庫":
			return "instock";

		case "待機":
			return "standby";

		case "点検":
			return "inspection";
		case "荷積":
			return "loading";
		case "荷卸":
			return "unloading";
		case "附帯作業":
			return "attendant_work";
		case "休息":
			return "longrest";
		case "休憩":
			return "longrest";
		case "フェリー":
			return "ferry";
		case "その他":
			return "other";
		}

		return "";
	}

/*
* status から workNumber を引き当て
*/
	function _status2workNumber (jobStatus, begin_status, elapsed_time) {
		const MINIMUM_BREAK_TIME = jobStatus.getMINIMUM_BREAK_TIME();

		switch(begin_status) {
		case null:// 最初の出庫
		case "outstock" :// 出庫
		case "driving" :// 走行
			return 0;
		break;
        	case "instock" ://入庫
			return 0;
		break;
        	case "standby" ://待機
		case "inspection" ://点検
		case "loading" ://荷積
		case "unloading" ://荷卸
        	case "attendant_work" ://附帯作業
			return 1;
		break;
		case "longrest" ://休憩/休息
		case "ferry" ://
			if(elapsed_time == 0) {
				return 2;
			}

			if(elapsed_time < MINIMUM_BREAK_TIME) {
				return 0;
			}

			if(elapsed_time < 4 * 60 * 60 * 1000) {
				return 2;
			}

			return 4;
		break;
		case "other" ://その他
			return 3;
		break;
		}
	}

 }

}

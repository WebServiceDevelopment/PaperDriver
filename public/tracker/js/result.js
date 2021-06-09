/*
* Copyright 2021 Web Service Development Inc.
*/

'use strict';

/*
* この、_core.setResultInterfaceで定義したfunctionは無名関数である.
* これは、addFuncs.jsで以下のfunction名で呼び出される。
* it.resultInterface (status, now_time, now);
* now_timeは、Date.nowで求めた1970年からの経過時間
* 例)
* it.resultInterface("driving", status, now);
*
* 戻り値:intervalID
*/

_core.setResultInterface (
 function (api, status, begin_status, now) {


	const DEBUG_6 = 0;
	const DEBUG_7 = 1;
	const DEBUG_8 = 0;
	const DEBUG_9 = 0;
	const DEBUG_10 = 0;
	const DEBUG_11 = 0;
	const DEBUG_12 = 0;
	const DEBUG_13 = 0;
	const DEBUG_14 = 0;
	const DEBUG_15 = 0;

	// MAGNIFICATION: 倍率:10
	const MAGNIFICATION = 10;
	//const MAGNIFICATION = 1;


	let jobStatus = this.jobStatus;
	let elapsed_time = jobStatus.elapsed.getElapsedTime();
	let f = null;
	let rt;
	let elapsed = jobStatus.elapsed;

	jobStatus.clearInterval();

	_searchLocation(jobStatus, begin_status) ;


	//console.log("begin_status="+begin_status+":"+jobStatus.getOutstockBeginTime());

/*
* "longrest" ://休憩/休息の変換
*
* 条件
* ・10分未満は、中断にカウントしない
* ・5分以上は.休憩にカウント
* 
* ・連続4時間未満は休憩時間にカウント
* 
* ・4～6時間未満の場合は分割休息としてカウントし、
* 休息時間残は１０時間から差し引いた時間
* 
* ・6～8時間未満の場合は分割休息としてカウントし、
* 休息時間残は４時間
* 
* ・８時間または、分割休息１０時間を取得した場合は、
* 「休息取得済み」状態 になり、出勤可能
* 
* 
* 休憩時間の表示
* 必要休憩時間 （通常８時間以上の労働に対して６０分の残り時間）
* のみを表示し、経過後には「取得済み」状態にする
* 6時間未満、6－8時間のロジックは考慮しない
* 
*/
        switch ( begin_status ) {
        case "longrest" ://休憩/休息

		// 判定の単位:分
		const HOUR_8 = 8*60*60*1000;
		const HOUR_6 = 6*60*60*1000;
		const HOUR_4 = 4*60*60*1000;
		const HOUR_0 = 0;

		const MINIMUM_BREAK_TIME = jobStatus.getMINIMUM_BREAK_TIME();

		let c_time , b_time ;
		let msg;
		let limit,hour, min , wk;
		

		b_time = jobStatus.getBeginTime();
		elapsed_time = now - b_time;

		c_time = parseInt(elapsed_time/1000/60);


		if( elapsed_time < MINIMUM_BREAK_TIME ){
			// 休憩時間が５分未満の場合
			// 運行に加算して、begin_statusを"driving"に変更する

			rt = elapsed.addDrivingTime(elapsed_time);
			begin_status = "driving";


			//休息時間を戻す
			rt = elapsed.getRestTime();
			// 休息時間を表示
			elapsed.drawRestTime(rt);

			// テーブルの休息時間を表示
			_core.api.drawResultRest(rt);

			wk = elapsed.getDrivingInterruptionWork();
			if(wk < 10*1000*60) {
				//中断時間を取得 
				rt = elapsed.getDrivingInterruptionTime ();
				//中断時間を表示
				elapsed.drawDrivingInterruptionTime(rt);

				console.log("11-1");
			} else {
				//中断時間を取得 
				rt = elapsed.getDrivingInterruptionOld ();
				rt = elapsed.setDrivingInterruptionTime (rt);
				//中断時間を表示
				elapsed.drawDrivingInterruptionTime(rt);

				console.log("11-2 rt = "+ rt);
			}

			//中断時間が5分未満の場合は、連続運転許容時間を減算する
			rt = elapsed.subtractionContinuousDriveingAllowableTime(elapsed_time );
			elapsed.drawContinuousDriveingAllowableTime(rt);

		} else if( c_time < 24 * MAGNIFICATION ){
			// 休憩時間が４時間未満の場合

			msg = "休憩時間にカウント";

			// 休憩時間
			rt = elapsed.addRestTime(elapsed_time);
			_core.api.drawResultRest(rt);
			elapsed.drawRestTime(rt);


			// 休憩時間残
			let remainingRestTime = elapsed.getREMAINING_REST_TIME();
			elapsed.setRemainingRestTime( remainingRestTime - rt);
			elapsed.drawRemainingRestTime( elapsed.getRemainingRestTime());

		} else if( c_time < 36 * MAGNIFICATION ){
			// 休憩時間が４時間以上の場合

			msg = "4時間の分割休息としてカウント";
			if(DEBUG_12) console.log(msg+":elapsed_time="+elapsed_time+":rt = "+rt);
			// 休憩時間の取消し
			rt = elapsed.getRestTimeOld();
			rt = elapsed.setRestTime(rt);
			_core.api.drawResultRest(rt);
			elapsed.drawRestTime(rt);

			// 休憩時間残の取消し
			let remainingRestTime = elapsed.getREMAINING_REST_TIME();
			elapsed.setRemainingRestTime( remainingRestTime - rt);
			elapsed.drawRemainingRestTime( elapsed.getRemainingRestTime());

			// 休息
			rt = elapsed.addLongrestTime(elapsed_time);
			_core.api.drawResultLongrest(rt);
			elapsed.drawLongrestTime(rt);


			switch(elapsed.getRemainingLongrestTime()) {
			case HOUR_8:
				// 6時間の休息時間残
				elapsed.countupSplitLongrestCount();
				elapsed.setRemainingLongrestTime(HOUR_6);

				elapsed.drawRemainingLongrestTime(HOUR_6);

			break;
			case HOUR_6:
				// 4時間の休息時間残
				elapsed.countupSplitLongrestCount();
				elapsed.setRemainingLongrestTime(HOUR_4);

				elapsed.drawRemainingLongrestTime(HOUR_4);

			break;
			case HOUR_4:
			case HOUR_0:
				// 0時間の休息時間残
				elapsed.setRemainingLongrestTime(HOUR_0);
				elapsed.drawRemainingLongrestTime(HOUR_0);

				// 拘束時間は開始時間から休息時間を引いたもの
				rt = elapsed.calcRestraintTime(now);
				rt = elapsed.setRestraintTime(rt);
				// 拘束時間を再表示
				elapsed.drawRestraintTime(rt);

			break;
			default:
				alert("Error: "+msg);
			break;
			}

		} else if( c_time < 48 * MAGNIFICATION ){

			msg = "6時間の分割休息としてカウント";

			// 休憩時間の取消し
			rt = elapsed.getRestTimeOld();
			rt = elapsed.setRestTime(rt);
			_core.api.drawResultRest(rt);
			elapsed.drawRestTime(rt);

			// 休憩時間残の取消し
			let remainingRestTime = elapsed.getREMAINING_REST_TIME();
			elapsed.setRemainingRestTime( remainingRestTime - rt);
			elapsed.drawRemainingRestTime( elapsed.getRemainingRestTime());

			// 休息時間
			rt = elapsed.addLongrestTime(elapsed_time);
			_core.api.drawResultLongrest(rt);
			elapsed.drawLongrestTime(rt);


			switch(elapsed.getRemainingLongrestTime()) {
			case HOUR_8:
				// 4時間の休息時間残
				elapsed.countupSplitLongrestCount();
				elapsed.setRemainingLongrestTime(HOUR_4);
				elapsed.drawRemainingLongrestTime(HOUR_4);
			break;
			case HOUR_6:
			case HOUR_4:
			case HOUR_0:
				// 0時間の休息時間残
				elapsed.setRemainingLongrestTime(HOUR_0);
				elapsed.drawRemainingLongrestTime(HOUR_0);

				// 拘束時間は開始時間から休息時間を引いたもの
				rt = elapsed.calcRestraintTime(now);
				rt = elapsed.setRestraintTime(rt);
				// 拘束時間を再表示
				elapsed.drawRestraintTime(rt);

			break;
			default:
				alert("Error: "+mesg);
			break;
			}



		} else {

			msg = "8時間の休息としてカウント";

			// 休憩時間の取消し
			rt = elapsed.getRestTimeOld();
			rt = elapsed.setRestTime(rt);
			_core.api.drawResultRest(rt);
			elapsed.drawRestTime(rt);

			// 休憩時間残の取消し
			let remainingRestTime = elapsed.getREMAINING_REST_TIME();
			elapsed.setRemainingRestTime( remainingRestTime - rt);
			elapsed.drawRemainingRestTime( elapsed.getRemainingRestTime());

			// 休息時間
			rt = elapsed.addLongrestTime(elapsed_time);
			_core.api.drawResultLongrest(rt);
			elapsed.drawLongrestTime(rt);


			//0時間の休息時間残
			elapsed.setRemainingLongrestTime(HOUR_0);
			elapsed.drawRemainingLongrestTime(HOUR_0);

			// 拘束時間は開始時間から休息時間を引いたもの
			rt = elapsed.calcRestraintTime(now);
			rt = elapsed.setRestraintTime(rt);
			// 拘束時間を再表示
			elapsed.drawRestraintTime(rt);

		}

        }


//
// 時間軸縦棒
//
	_drawTimeBar(now);

//
// 連続運転許容時間の算出
// 運転中断時間の算出
// 中断時間の加算は10分以上
// 
// 以下を中断時間とする
// standby:待機, inspection:点検, other:その他, loading:荷積, unloading:荷卸
// attendant_work:附帯作業
// longrest:休憩/休息, ferry:
//
        switch ( begin_status ) {
	case null:// 最初の出庫
        case "outstock" :// 出庫
        case "driving" :// 走行
	// 連続運転許容時間の算出
	// ここで、計算すると、setIntervalで２重に減算することになるので
	// ここでは行わない
		 if(DEBUG_14) console.log("10-0");
        break;

        case "instock" ://入庫
		if(DEBUG_9) console.log(12);
        break;

        case "standby" ://待機
        case "inspection" ://点検
        case "other" ://その他
        case "attendant_work" ://附帯作業
        case "loading" ://荷積
        case "unloading" ://荷卸
        case "longrest" ://休憩/休息
        case "ferry" ://

		//走行開始していなければ、中断時間の加算は無い
		if(elapsed.getDrivingTime() == 0) {
			if(DEBUG_14) console.log("10-1");
			// 中断時間が0で無ければ初期化
			//【理由】４時間以内に運転を中断する場合、
			// 少なくとも１回１０分以上、
			// 合計３０分以上の休憩を分割して取る
			// 従って、運転の前は中断にならないので、0に初期化する
		
			rt = elapsed.initDrivingInterruptionTime();
			elapsed.drawDrivingInterruptionTime(rt);

			break;
		}

		//中断時間を取得 
		rt = elapsed.getDrivingInterruptionTime ();

		// 直前の中断時間が0なら中断時間を保存
		if(elapsed.getDrivingInterruptionOld () == 0) {

			if(DEBUG_14) console.log("10-2");

			// 直前の中断時間を保存
			elapsed.setDrivingInterruptionOld (rt);

		}

		// 今回の中断時間をworkに加算
		let wk = elapsed.addDrivingInterruptionWork(elapsed_time);

		// 分換算に変換
		let c_time = parseInt(wk / 1000 / 60);
		if(DEBUG_14) console.log("中断時間="+c_time +":");

		// statusはoutstockまたはdrivingか？
		if(status =="outstock" || status == "driving") {
			;
			if(DEBUG_14) console.log("10-3");
		} else {

			// 今回の中断時間と中断時間を加えたものを中断時間に表示
			elapsed.drawDrivingInterruptionTime(wk + rt);

			// 中断時間を保存
			elapsed.setDrivingInterruptionOld (wk);

			if(DEBUG_14) console.log("10-4");
			break;
		}

		//10分以下は中断時間の加算をしない
		if( (c_time ) < 1 * MAGNIFICATION) {

			//中断時間が10分未満の場合は、連続運転許容時間を減算する
			rt = elapsed.subtractionContinuousDriveingAllowableTime(wk );
			elapsed.drawContinuousDriveingAllowableTime(rt);

			// 直前の中断時間の取得し
			// 中断時間を直前の中断時間に戻す
			rt = elapsed.getDrivingInterruptionOld ();

			elapsed.setDrivingInterruptionTime(rt)
			elapsed.drawDrivingInterruptionTime(rt);

			if(DEBUG_14) console.log("10-10:"+elapsed_time+":rt="+rt);

			break;

		}

		// 中断時間を保存
		elapsed.setDrivingInterruptionOld (rt);

		if(DEBUG_14) console.log("10-11 rt = "+rt);

		//中断時間の加算は10分以上
		// 中断時間の加算
		rt = elapsed.addDrivingInterruptionTime(wk);

		// 中断時間の表示変更
		elapsed.drawDrivingInterruptionTime(rt);


		// 運転中断時間（３０分）未満は表示の変更まで
		if( parseInt(rt/1000/60) < 3 * MAGNIFICATION) {
			break;
		}
		if(DEBUG_9) console.log(16);


		// 運転中断時間（３０分）が取得された時点で、
		// 運転中断時間を０分にリセット(initDrivingInterruptionTime)
		// 但し、現在のステータスが、以下の場合はリセットしない
		// 入庫、待機、点検、その他、荷積、荷卸、休憩/休息、フェリー
		// 但し、begin_status とstatusが同じ値の場合は、
		// 運転中断時間を０分にリセット(initDrivingInterruptionTime)
		//
        	switch ( status ) {
		case "instock" ://入庫
        	case "standby" ://待機
		case "inspection" ://点検
		case "other" ://その他
        	case "attendant_work" ://附帯作業
		case "loading" ://荷積
		case "unloading" ://荷卸
		case "longrest" ://休憩/休息
		case "ferry" ://
		break;

		case "driving" ://走行
		case "outstock" ://走行
			// 中断時間の初期化
			rt  = elapsed.initDrivingInterruptionTime();
			// 中断時間の表示変更
			elapsed.drawDrivingInterruptionTime(rt);
			if(DEBUG_14) console.log("10-13 rt = "+rt);

			// 運転中断時間（３０分）が取得された時点で、
			// 連続運転許容時間を４時間にリセット
			elapsed.drawContinuousDriveingAllowableTime( elapsed.initContinuousDriveingAllowableTime());
		break;

		default:	
			console.log("Error : status="+status);
		break;
		}

        break;

        default:
        break;
        }

//
// 拘束時間の算出
// 残り拘束時間の算出
//

	// 拘束時間の算出
	let restraint_time = elapsed.calcRestraintTime (now);
	if(DEBUG_14) console.log("1:"+restraint_time);

	// 拘束時間の再表示
	elapsed.drawRestraintTime (restraint_time);

	// 労働時間の再表示
	_core.api.drawResultWorkTotal (restraint_time - elapsed.getRestTime());

	// 残り拘束時間の算出
	let remaining_restraint_time = elapsed.getREMAINING_RESTRAINT_TIME() - restraint_time;

	// 残り拘束時間の再表示
	elapsed.drawRemainingRestraintTime (remaining_restraint_time);

			

	let Results, results, res;

//
// 今回の１件の経過データを生成
//
	results = _createResultData(
		jobStatus,
		status,
		begin_status, 
		elapsed_time, 
		now
		);

//
// 初回のデータはnullなので保存しない
//
	if( results != null) {

		// データを保存
		jobStatus.addResultData(results);
	}


	//経過データの取得
	Results = jobStatus.getResultData();

	// 経過データを複製
	results = Results.slice();

/*
* テスト用ダミーデータ
*
*	Results = [
*		{"dateNumber":0, "workNumber":1, "begin":"7:30", "end":"8:00"},
*		{"dateNumber":0, "workNumber":0, "begin":"8:00", "end":"10:30"},
*	];
*/

/*
* 入庫以外、変更したステータスの初期データを生成
*/
        switch ( status ) {
        case "instock" ://入庫

//拘束時間=始業時間から終業時間までの時間で、労働時間と休憩時間(仮眠時間を含む。)-休息時間

		_core.api.drawResultWorkTotal (
			now-
			jobStatus.getOutstockBeginTime()-
			elapsed.getLongrestTime()
			);
	break;
	default:



//
// 変更したステータスの初期データを生成
//
		res = _createResultData(
			jobStatus,
			status, 
			"",
			0, 
			now
			);

		if(DEBUG_13) console.log("dateNumber:"+res.dateNumber+":workNumber:"+res.workNumber);

// 経過データにステータスの初期データを追加
		results.push(res);
        break;
	}


/// 直前の中断時間とworkの初期化
        switch ( status ) {
        case "outstock" :// 出庫
        case "driving" :// 走行
        case "instock" ://入庫
		// 直前の中断時間とworkの初期化
		elapsed.initDrivingInterruptionOld ();
		elapsed.initDrivingInterruptionWork ();

		if(elapsed.getDrivingInterruptionTime()/1000/60 >= 30 ){
			// 中断時間が30分を超えていれば初期化
			rt = elapsed.initDrivingInterruptionTime();
			elapsed.drawDrivingInterruptionTime(rt);
		}

	break;
        case "longrest" ://休憩/休息
		// 休憩時間が４時間を超えて、休息時間になった時、
		// 休憩時間のカウントを戻すために休憩時間を覚えておく
		rt = elapsed.getRestTime();
		elapsed.setRestTimeOld(rt);
	break;
	}

//
//経過データの表示
//
	api.reloadResults(results);
		

	if( DEBUG_6 ) console.log("status="+status+":time="+now);

	return _interval_do(jobStatus, status, begin_status, now);

/* --------------------------------------------------------------------------*/

/*
* 経過データの生成
*/
	function _createResultData(
		jobStatus,
		status,
		begin_status, 
		elapsed_time, 
		now
		) {

		let _begin_status;

		if(DEBUG_12) {
			console.log( status, begin_status, 
				jobStatus.getOutstockBeginTime(),
				_core.lib.status2workNumber (jobStatus, begin_status, elapsed_time),
				jobStatus.getBeginTime() ,
				now);
		}

		let d0, d1, d2, result_str, res, dateNumber, workNumber, date;

		d0 = new Date(jobStatus.getOutstockBeginTime());

		switch(begin_status) {
		case null:

			if(DEBUG_12) console.log(d0);
			return null;

		case "":

			d1 = new Date(now);
//
// 経過時間より経過日を求め、これがdateNumberと成る
//
			dateNumber = _calc_dateNumber(d0, d1);

			workNumber = _core.lib.status2workNumber (jobStatus, status, elapsed_time);

			date = _calcDate(d1);
			

			result_str = "{\"dateNumber\":"+dateNumber+", \"workNumber\":"+workNumber+", \"begin\":\""+d1.getHours()+":"+d1.getMinutes()+"\",  \"end\":\""+d1.getHours()+":"+d1.getMinutes() + "\", \"date\":\""+date+"\"}";

			res = JSON.parse(result_str);
			
			return res;
		}


		d1 = new Date(jobStatus.getBeginTime());
		d2 = new Date(now);
//
// 経過時間より経過日を求め、これがdateNumberと成る
//
		dateNumber = _calc_dateNumber(d0, d1);
		//console.log("dateNumber="+dateNumber);


//
// ステータスからworkNumberを求め、
// begin_status が"longrest"もしくは"ferry"の時は、
// workNumberの戻り値でbegin_statusを書き換える
// 0:"driving",2:"rest",4:"longrest"
//
		workNumber = _core.lib.status2workNumber (jobStatus, begin_status, elapsed_time);
		switch(begin_status) {
		case "longrest" :
			switch (workNumber) {
			case 0:
				_begin_status = "driving";
			break;
			case 2:
				_begin_status = "rest";
			break;
			case 4:
				_begin_status = "longrest";
			break;
			}
		break;
		case"ferry":
			switch (workNumber) {
			case 0:
				_begin_status = "driving";
			break;
			case 2:
				_begin_status = "rest";
			break;
			case 4:
				_begin_status = "longrest";
			break;
			}
		break;
		default:
			_begin_status = begin_status;
		break;
		}

		date = _calcDate(d1);
//
// JSONデータの生成
//
		result_str = "{\"dateNumber\":"+dateNumber+", \"workNumber\":"+workNumber+", \"begin\":\""+d1.getHours()+":"+d1.getMinutes()+"\",  \"end\":\""+d2.getHours()+":"+d2.getMinutes() +"\", \"btime\":"+ jobStatus.getBeginTime() +",\"etime\":" +now+ ", \"status\":\"" +_begin_status+"\", \"next\":\"" +status+"\", \"date\":\""+date+"\"}";

		if(DEBUG_12) {
			console.log("begin_status="+begin_status+":status="+status+":elapsed_time="+elapsed_time+":time="+now);
		}

		res = JSON.parse(result_str);

		if(DEBUG_13) {
			console.log(result_str);
		}
		if(DEBUG_12) {
			console.log(JSON.stringify(res));
		}

		return res;

	} 

	function _calc_dateNumber(d0, d1) {
		let w1, w2, w3, d3;

		// 入庫を押した後は、2回目の出庫になり
		// 開始日付がリセットされるため、入庫の1回目の日付で
		// 日付の差分の判定を行う
		// 処理が複雑になるので、日付が同じでない場合は、
		// 差分は１に固定する
		// times.lengthは、入庫の回数

		let times = _core.jobStatus.getOutstockBeginTimes () 
		let diff = 0;


		w1 = _calcDate(d0).split(":");
		w2 = _calcDate(d1).split(":");

		//if(times.length > 0) {
		if(times.length > 1) {
			let w0;
			//console.log("times[0]="+times[0]);
			w0 = _calcDate(new Date(times[0])).split(":");

			if(w1[0] > w0[0]) {
				diff = 1;
			} else if( parseInt(w1[1]) > parseInt(w0[1]) ) {
				diff = 1;
			} else if( parseInt(w1[2]) > parseInt(w0[2]) ) {
				diff = 1;
			} else {
				diff = 0;
			}
			
		}


		// 年が異なる場合 月を超えて日にちに差があるわけではないので 
		// 差は２，３日なので、月は比較しない
		// 年が異なる場合は、１２月と１月なので、差を取得し３１を加算

		if(w1[0] < w2[0]) {
			return parseInt(w2[2]) - parseInt(w1[2]) + 31 + diff;
		}

		// 年が同じ場合かつ月が同じ場合 
		// 日の差を取得

		if(w1[1] == w2[1]) {
			return parseInt(w2[2]) - parseInt(w1[2]) + diff;
		}

		// 年が同じ場合かつ月が違う場合
		// 開始日の月の日数を求め、
		// 日の差を取得し月の日数を加算

		d3 = new Date(d1.getFullYear(), d1.getMonth(), 0);
		w3 = _calcDate(d3).split(":");
		return parseInt(w2[2]) - parseInt(w1[2]) + parseInt(w3[2]) + diff;
		
	}
/*
* 日付を返す月、日に前方に0を含まない
*/

	function _calcDate(d) {
		return d.getFullYear()+":"+(d.getMonth()+1)+":"+d.getDate();
	}


/*
* 経過時間の算出
*
* 経過時間の初期化
* 作業経過時間の登録
* 作業経過時間のインターバルの開始
* 事務所のPCにデータを同期する処理
*/

	function _interval_do(jobStatus, status, begin_status, now) {
		let elapsed_time = 0;
		let old;

		if(DEBUG_13) console.log("_interval_do="+now);
		jobStatus.setIntervalLastTime(now);

		if(begin_status == null) {
			// 経過時間は初期化

			let elapsed_time = elapsed.getElapsedTime();

			jobStatus.setBeginTime(now);

			_view_print(jobStatus, elapsed_time);

			//return false;

		} 

		if(begin_status != status ) {
			if(status == "driving" && begin_status == "outstock") {
				// 経過時間は継続

				old = jobStatus.getBeginTime(now);
				elapsed_time = now - old;

				_view_print(jobStatus, elapsed_time);

				//return true;

			} else {
				// 経過時間は初期化

				let elapsed_time = elapsed.getElapsedTime();

				jobStatus.setBeginTime(now);

				_view_print(jobStatus, elapsed_time);

				//return false;

			}
		} else {
			// 経過時間は継続

			old = jobStatus.getBeginTime(now);
			elapsed_time = now - old;

			_view_print(jobStatus, elapsed_time);

			//return true;
		}
	

		if( status == "instock") {
			// 入庫
			_instock_do(jobStatus, elapsed, now);

			// 入庫後は時間をカウントしない
			return;
		}

//
// 作業経過時間の登録
//
		elapsed.setElapsedTime(elapsed_time);



//
// 作業経過時間のインターバルの開始
//
		return window.setInterval(
				_interval_done,
				jobStatus.getIntervalTime(),
				jobStatus,
				begin_status);

	}

/*
* 入庫登録 (作業終了)
*/
	function _instock_do(jobStatus, elapsed, now) {
		let rt;

		// 入庫の時間を記録
		jobStatus.setInstockEndTime(now);

		// 運転時間を再表示
		_core.api.drawResultDriving (elapsed.getDrivingTime());

		// 拘束時間合計を再表示
		rt = elapsed.calcRestraintTime(now);
		elapsed.drawRestraintTime(rt);
		_core.api.drawResultWorkTotal(rt);

		elapsed.setRestraintTime(rt);

		// 労働時間合計を再表示
		_core.api.drawResultRestraintTotal (rt - elapsed.getRestTime());

		// 待機時間を表示
		_core.api.drawResultStandby (elapsed.getStandbyTime());

		// 連続運転超過時間を再表示
		_core.api.drawResultContinuousOperationExcessTime (elapsed.getContinuousOperationOvertime());


		// 附帯作業 時間を再表示
		_core.api.drawResultAttendant_work(elapsed.getAttendant_workTime());

		// 事務所のPCにデータを同期する処理

		let wk = jobStatus.getResultData();
		let res="";
		for(let i in wk) {
			res += JSON.stringify(wk[i])+",";
		} 

		console.log(res);

		return;
	}

/*
* 作業経過時間のインターバル
*
* 経過時間の登録
* 拘束時間の算出
* 残り拘束時間の算出
* 連続運転許容時間の算出
*/
	function _interval_done(jobStatus, begin_status) {

		let btime, elapsed_time, now, old_elapsed_time, diff;

		btime = jobStatus.getBeginTime();

		now = Date.now();

		elapsed_time = now - btime;

// 中央のViewの経過時間表示
		_view_print(jobStatus, elapsed_time);

// １つ前の経過時間の取得
		old_elapsed_time = elapsed.getElapsedTime();

// 経過時間の登録
		elapsed.setElapsedTime(elapsed_time);

//
		diff = elapsed_time-old_elapsed_time;

		switch ( status ) {
		case null:// 最初の出庫
                case "outstock" :// 出庫
                case "driving" :// 走行
			elapsed.addDrivingTime(diff);

// 位置情報の取得間隔
// 3秒間隔
			if(parseInt(elapsed_time/1000)%600 == 0) {
				// 位置情報の確認
				_searchLocation(jobStatus, begin_status);
			}
		break;
        	case "standby" ://待機
			 elapsed.addStandbyTime(diff);
		break;

		case "inspection" ://点検
		 	elapsed.addInspectionTime(diff);
		break;

		case "loading" ://荷積
		 	elapsed.addLoadingTime(diff);
		break;

		case "unloading" ://荷卸
		 	elapsed.addUnloadingTime(diff);
		break;

        	case "attendant_work" ://附帯作業
			// 附帯作業 時間を再表示
			_core.api.drawResultAttendant_work( elapsed.addAttendant_workTime(diff) );
		break;

        	case "other" ://その他
			elapsed.addOtherTime(diff);
		break;

        	case "ferry" ://フェリー
			elapsed.addFerryTime(diff);
		break;

        	case "longrest" ://休息
		break;

		}



// １分間隔
		if(parseInt(elapsed_time/1000)%60 != 0) {
			return;
		}

// time bar
		if(parseInt(elapsed_time/1000)%(60*2) != 0) {
			_drawTimeBar(now);
		}

//
// 拘束時間の算出
// 残り拘束時間の算出
//
		let rt, rt1, last, d0, d1 ,d2;

		let restraint_time = elapsed.calcRestraintTime (now);

		let remaining_restraint_time = 
			elapsed.getREMAINING_RESTRAINT_TIME() -
			restraint_time;


		// 拘束時間の再表示
		elapsed.drawRestraintTime(restraint_time);
		_core.api.drawResultRestraintTotal (restraint_time);

		// 残り拘束時間
		elapsed.drawRemainingRestraintTime(remaining_restraint_time);

	
		// 労働時間合計の表示
	        switch ( status ) {
		case null:// 最初の出庫
		case "outstock" :// 出庫
		case "driving" :// 走行
        	case "standby" ://待機
		case "inspection" ://点検
		case "loading" ://荷積
		case "unloading" ://荷卸
        	case "attendant_work" ://附帯作業

			_core.api.drawResultWorkTotal (restraint_time - elapsed.getRestTime());

		break;
		}

		// 
	        switch ( status ) {
		case null:// 最初の出庫
		case "outstock" :// 出庫
		case "driving" :// 走行
			//連続運転許容時間の算出
			// 運転時間の表示
			_core.api.drawResultDriving (elapsed.getDrivingTime());


			last = jobStatus.getIntervalLastTime();

			rt = elapsed.subtractionContinuousDriveingAllowableTime(now -  last);
			
			jobStatus.setIntervalLastTime(now);

			elapsed.drawContinuousDriveingAllowableTime(rt);

			if( DEBUG_10 ) console.log(begin_status+":now="+now+":elapsed_time="+elapsed_time);
		break;
        	case "standby" ://待機
		case "inspection" ://点検
		case "loading" ://荷積
		case "unloading" ://荷卸
        	case "attendant_work" ://附帯作業

			// 運転外実務 時間の表示
			_core.api.drawResultPractice (
			 	elapsed.getInspectionTime() +
			 	elapsed.getLoadingTime() +
			 	elapsed.getUnloadingTime() +
			 	elapsed.getStandbyTime() +
				elapsed.getAttendant_workTime()
				) ;

			//　中断時間のカウントアップ表示
			_drivingInterruptionCountup (btime, now);
		break;

        	case "other" ://その他
			_core.api.drawResultOther ( elapsed.getOtherTime());

			//　中断時間のカウントアップ表示
			_drivingInterruptionCountup (btime, now);
		break;

        	case "longrest" ://休息
			//この処理で４時間を超えた休息の処理は行わない
			// 休憩のカウントのみ行う

			//  休憩時間
			rt1 = elapsed.getRestTime()+now-btime;
			elapsed.drawRestTime(rt1);
			_core.api.drawResultRest(rt1);

			//  休憩時間残り
			elapsed.drawRemainingRestTime(elapsed.getREMAINING_REST_TIME() -rt1);

			//　中断時間のカウントアップ表示
			_drivingInterruptionCountup (btime, now);

		break;
		}

		//console.log("dateNumber:"+res.dateNumber+":workNumber:"+res.workNumber);

		let results, len, obj;
		let dateNumber ;

		results = _core.getResults();
		len = results.length;
		obj = results[len-1];


//
//		diff 日付が変わったかどうかの判定値
//
		d1 = new Date(btime);
	 	d2 = new Date(now);
		diff = _calc_dateNumber(d1, d2);

/*
/* デフォルト １日目 dateNumber は 0
/*		dateNumber = 0;
*/
		d0 = new Date(_core.jobStatus.getOutstockBeginTime ());
		dateNumber = _calc_dateNumber(d0, d1);


//
// 日付が変わった時のbar　chartの処理
// 該当ステータス中に日付が変わったらlineを追加
//
		switch( diff ) {
		case 0:
		default:
			//日付は変わっていない
			//console.log("日付は変わっていない");

			if( ( status == "longrest") && ((d2-d1)/1000/60/60 > 4) ) {
				//2日目の判定

				let workNumber = _core.lib.status2workNumber (jobStatus, status, elapsed_time);
				// 休息、4時間以上なら
				_drawProgress_3 (elapsed_time, dateNumber, workNumber);
				if(DEBUG_15) console.log("0-3");

			} else {
				// 現在のステータスの進捗を表示
				_drawProgress_0 (elapsed_time);
				if(DEBUG_15) console.log("0-0");
			}
		return;

		case 1:
			//日付は変わった1日目
			// 既に２日目のlineが引かれていればbreak;
			// つまり、resultの最後の要素の配列が２であれば既に
			// 引かれていると判断

			// 2021/05/06 不要
			//dateNumber = _calc_dateNumber(d0, d2);

			// 2021/03/24 change
			let workNumber = _core.lib.status2workNumber (jobStatus, status, elapsed_time);

			//
			// 既に、２目のlineが引かれていれば
			//
			if(len == 2) {
				let r = _core.getResults();
				obj = r.slice(-1)[0];

				// iPadがsleep状態から回復時に、
				// 休憩から休息に変わった場合の判定
				if(obj.workNumber == workNumber) {
 					if(DEBUG_14) console.log("日付は更新しているがlineは追加しない 2");
					_drawProgress_2 (btime, now, d2);
					if(DEBUG_15) console.log("1-2");
					return;
				}

				//
				// 一度入庫しているならば
				//
				len = jobStatus.getLengthOfOutstockBeginTimes();
				if(len > 0) {

					_drawProgress_3 (elapsed_time, dateNumber, workNumber);
					if(DEBUG_15) console.log("1-3");
					return;
				}

				// 休憩から休息に変わった場合は、
				//lineを再度作成する

 			}


			if(DEBUG_14) console.log("日付が更新したらlineを追加");


			// 進捗データの作成
			let result_str = "{\"dateNumber\":"+dateNumber+", \"workNumber\":"+workNumber+", \"begin\":\""+d1.getHours()+":"+d1.getMinutes()+"\",  \"end\":\""+d2.getHours()+":"+d2.getMinutes() + "\"}";

			_new_line (jobStatus, api, result_str, d2);

		return;

		case 2:
			// 日付は変わっているが、２日目は考慮しない
			if(DEBUG_14) console.log("日付は変わっているが、２日目は考慮しない");
		return;

		}

		return;

		//　中断時間のカウントアップ表示
		function _drivingInterruptionCountup (btime, now) {
			let rt;
			//　中断時間のカウントアップ表示
			rt = elapsed.getDrivingInterruptionTime()+
				elapsed.getDrivingInterruptionWork()+now-btime;

			elapsed.drawDrivingInterruptionTime(rt);

			if( DEBUG_13) console.log("10-15");
			//console.log(elapsed.getDrivingInterruptionTime()+":"+now+":"+btime);

			if(parseInt(rt/1000/60) < 3 * MAGNIFICATION) {
				return;
			}
			if(DEBUG_14) console.log("30 < longrest="+(rt));

			// 連続運転許容時間を４時間にリセット
			elapsed.drawContinuousDriveingAllowableTime( elapsed.initContinuousDriveingAllowableTime() );
		}

		// 新しいLineを引く
		function _new_line (jobStatus,  api, result_str , d1) {
			let res = JSON.parse(result_str);

			// Resultに現在のステータスの進捗を追加

			//経過データの取得
			let Results = jobStatus.getResultData();

			// 経過データを複製
			results = Results.slice();

			// 経過データにステータスの初期データを追加
			results.push(res);

			api.reloadResults(results);

			// 現在のステータスの進捗を表示
			_drawProgress_1 (btime, now, d1);
		}

	}

/*
* 休息、4時間以上の高さを算出
*/
	function _drawProgress_3 (elapsed_time, dateNumber, workNumber) {

		let elm = _drawProgress_0 (elapsed_time);
		let top = _core.getLineTopPosition (dateNumber, workNumber, _core.diff_h);
		elm.style.top = top + "px";
	}

/*
* 現在のステータスの進捗をline表示
*/
	function _drawProgress_0 (elapsed_time) {

		const TIME_SPAN_WIDTH	= _core.getTimeSpanWidth();
		let results, len, obj;

		results = _core.getResults();
		len = results.length;
		obj = results[len-1];

		let id0, width0, elm0 ;

		if(obj == null) return;

		if(DEBUG_13) console.log(" 現在のステータスの進捗を表示 1");

		id0=obj[0].id;
		elm0 = document.getElementById(id0);

		width0 = parseInt(TIME_SPAN_WIDTH/24/60 * elapsed_time/1000/60)
		elm0.style.width = width0 + 'px';

		return elm0;
	}

/*
* 現在のステータスの進捗をline表示
*/
	function _drawProgress_1 (btime, now, d1) {

		const TIME_SPAN_WIDTH	= _core.getTimeSpanWidth();
		let results, len, obj, d0;

		results = _core.getResults();
		len = results.length;
		obj = results[len-1];

		let id0, id1, width0, width1, elm0, elm1;

		if(obj == null) return;

		if(DEBUG_13) console.log(" 現在のステータスの進捗を表示 2");

		d0 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());

		id0=obj[0].id;
		elm0 = document.getElementById(id0);
		width0 = parseInt(TIME_SPAN_WIDTH/24/60 * (d0-btime)/1000/60)
		elm0.style.width = width0 + 'px';

		//console.log(btime+":"+d0+":"+(d0-now)/1000/60);

		id1=obj[1].id;
		elm1 = document.getElementById(id1);
		width1 = parseInt(TIME_SPAN_WIDTH/24/60 * (now-d0)/1000/60)
		elm1.style.width = width1 + 'px';

	}

/*
* 現在のステータスの進捗をline表示
*/
	function _drawProgress_2 (btime, now, d1) {

		const TIME_SPAN_WIDTH	= _core.getTimeSpanWidth();
		let results, len, obj, d0;

		results = _core.getResults();
		len = results.length;
		obj = results[len-1];

		let id1, width1, elm1;

		if(obj == null) return;

		if(DEBUG_13) console.log(" 現在のステータスの進捗を表示 2");

		d0 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());

		id1=obj[1].id;
		elm1 = document.getElementById(id1);
		width1 = parseInt(TIME_SPAN_WIDTH/24/60 * (now-d0)/1000/60)
		elm1.style.width = width1 + 'px';

	}

/*
* 時間軸縦棒
*/
	function _drawTimeBar(now) {

		const TIME_SPAN_WIDTH	= _core.getTimeSpanWidth();
		let d1, d2, hh, mm, left;

		d1 = new Date(jobStatus.getOutstockBeginTime());
		d2 = new Date(now);

		hh = d2.getHours();
		mm = d2.getMinutes()


		left = parseInt(hh * TIME_SPAN_WIDTH / 24) + parseInt(mm * TIME_SPAN_WIDTH / 24 / 60) + 91;


                jobStatus.getTimeBarElement().style.left = left + 'px';
                jobStatus.getNowTimeElement().innerText = ('0'+hh).slice(-2) +"時" + ('0'+mm).slice(-2)  + "分";

		let dateNumber = _calc_dateNumber(d1, d2);

		jobStatus.getTimeBarElement().style.top = 8+(255 * dateNumber) +"px";
	}

/*
* 中央のViewの経過時間表示
*/
	function _view_print(jobStatus, elapsed_time) {

		let hour, min, sec;

		hour = ('0'+parseInt(elapsed_time / 1000/ 60/ 60) % 24).slice(-2);
		min = ('0'+parseInt(elapsed_time / 1000/ 60) % 60).slice(-2);
		sec = ('0'+parseInt(elapsed_time / 1000) % 60).slice(-2);

		jobStatus.getStatusViewElement().innerText = hour+":"+min+":"+sec;

		if( DEBUG_6 ) console.log(status +":"+ begin_status+":now="+now+":elapsed_time="+elapsed_time);
	}

/*
* geo lovcation
*/
	function _searchLocation(jobStatus, begin_status) {

		if(navigator.geolocation){
			try {
			return navigator.geolocation.getCurrentPosition(_successFunc, _errorFunc);
			} catch {
				alert('エラー：3:geolocationを取得できません。');
			}
		}else{
			alert('エラー：geolocationを取得できません。');
		}


		return null;

	}

	function _successFunc(position){
		let crd = position.coords;

/*
		let text = "緯度 latitude：" + crd.latitude 
		+ "経度 longitude：" + crd.longitude 
		+ ",高度 altitude：" + crd.altitude 
		+ "水平方向の誤差 accuracy：" + crd.accuracy 
		+ "垂直方向の誤差 altitudeAccuracy：" + crd.altitudeAccuracy 
		+ "方向 heading：" + crd.heading 
		+ "速度 speed：" + crd.speed
		;
		let text = "緯度 latitude：" + crd.latitude 
		+ ",経度 longitude：" + crd.longitude ;
		document.getElementById('baggage').innerText = crd.latitude+","+crd.longitude;
*/
		let text = crd.latitude +',' + crd.longitude ;
		//document.getElementById('baggage').innerText = text;

		console.log(text);

		return text;
	}

	function _errorFunc(error){
		console.log("エラーコード：" + error.code + ":エラー内容：" + error.message);
		document.getElementById('baggage').innerText = error.code+":"+error.message;
	}

 }
);

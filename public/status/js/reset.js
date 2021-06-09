document.getElementById('reset').addEventListener('click', function() {

	let bool = confirm("ステップをリセットしますか？");

	if(!bool) {
	    return;
	}

	localStorage.removeItem("step_01");
	localStorage.removeItem("step_02");
	localStorage.removeItem("step_03");
	localStorage.removeItem("step_04");
	localStorage.removeItem("step_04_tmp");
	localStorage.removeItem("step_05");
	localStorage.removeItem("step_06");
	localStorage.removeItem("step_07");
	localStorage.removeItem("step_07_tmp");
	localStorage.removeItem("step_08");
	localStorage.removeItem("step_08");
	localStorage.removeItem("step_09");

	alert("リセットしました\nページを再読み込みしてください");

});

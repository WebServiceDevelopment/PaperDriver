/*
* Copyright 2021 Web Service Development Inc.
*/
'use strict';

function _spread_class(spread_options) {

	const PARENT_NODE_ID	= spread_options.parent_node_id;
	const CELL_CLASS_NAME	= spread_options.cell_class_name;
	const SELECTOR = '.'+ spread_options.cell_class_name;

	this.CELL_CLASS_NAME	= CELL_CLASS_NAME;
	this.cell		= spread_options.cell;

	const MAX_ROWS		= spread_options.max_rows;
	const MAX_COLS		= this.cell.length;
	
	this.addNode		= _addNode.bind(this);
	this.getNewId		= _getNewId.bind(this);
	this.keydown_input 	= _keydown_input.bind(this);
	this.keydown_select 	= _keydown_select.bind(this);
	this.keydown_checkbox 	= _keydown_checkbox.bind(this);
	this.keyup_input 	= _keyup_input.bind(this);
	this.keyup_select 	= _keyup_select.bind(this);
	this.keyup_checkbox 	= _keyup_checkbox.bind(this);
	this.blur_input 	= _blur_input.bind(this);
	this.blur_select 	= _blur_select.bind(this);
	this.blur_checkbox 	= _blur_checkbox.bind(this);
	this.change_input 	= _change_input.bind(this);
	this.change_select 	= _change_select.bind(this);
	this.change_checkbox 	= _change_checkbox.bind(this);

	this.getCell 		= _getCell.bind(this);
	this.addNode		= _addNode.bind(this);
	this.context_menu	= _context_menu.bind(this);

	this.selected_number	= null;
	this.setSelectedNumber	= (number)=> this.selected_number = number;
	this.getSelectedNumber	= ()=> this.selected_number;
	this.moveLines		= _moveLines.bind(this);
	this.deleteLines	= _deleteLines.bind(this);

	let i, j, s, row, cell, node;

	let parentNode = document.getElementById(PARENT_NODE_ID);

	s = "";
	for (i =0; i< MAX_ROWS; i++) {
		// テーブルのインデックスiの行（i行目）に行を挿入
		row = parentNode.insertRow(i);

		for (j =0; j< this.cell.length; j++) {
			// j行目にセルを挿入
			cell  = row.insertCell(j);

			// 作成したセルにノードを挿入
			node = 　this.addNode(cell, this.cell[j].class, s, i, j);

		}
	}

	this.elms = parentNode.querySelectorAll(SELECTOR);

	//_addEventListener(parentNode, this.elms) ;

	this.getCellValue	= _getCellValue.bind(this);
	this.getCellSelectedIndex	= _getCellSelectedIndex.bind(this);
	this.setCellSelectedIndex	= _setCellSelectedIndex.bind(this);

	this.call_popup		= _call_popup.bind(this);
	this.call_menu		= _call_menu.bind(this);
	this.call_delete	= _call_delete.bind(this);
	this.call_add		= _call_add.bind(this);
	this.call_insert	= _call_insert.bind(this);

	const POPUP  = "popup";
	const POPUP_MENU  = "frame_menu";
	const INSERT  = "insert_menu";
	const ADD  = "add_menu";
	const DELETE  = "delete_menu";

	this.popupElement = document.getElementById(POPUP);
	this.menuElement = document.getElementById(POPUP_MENU);
	this.insertElement = document.getElementById(INSERT);
	this.addElement = document.getElementById(ADD);
	this.deleteElement = document.getElementById(DELETE);

	this.popupElement.addEventListener("click",this.call_popup,false);
	//this.menuElement.addEventListener("click",this.call_menu,false);
	this.insertElement.addEventListener("click",this.call_insert,false);
	this.addElement.addEventListener("click",this.call_add,false);
	this.deleteElement.addEventListener("click",this.call_delete,false);

	return this;

	function _call_popup(e){
		console.log("popup");
		let num = e.target.innerHTML;
		console.log("num="+num);
		switch(e.button) {
		case 2:
		break;
		default:
			this.popupElement.style.visibility="hidden";
			this.menuElement.style.visibility="hidden";
			return;
		}
		
		
		this.popupElement.style.visibility="hidden";
		this.menuElement.style.visibility="hidden";
	}

	function _call_menu(e){
		console.log("menu");
	}

	function _call_delete(e){
		e.preventDefault();
		
		//console.log("delete");
		console.log("_call_delete:"+  this.getSelectedNumber());

		let l = parseInt(this.getSelectedNumber())-1;
		this.deleteLines(l) ;

		this.popupElement.style.visibility="hidden";
		this.menuElement.style.visibility="hidden";
	}

	function _call_add(e){
		e.preventDefault();

		//console.log("add");
		console.log("_call_add:"+  this.getSelectedNumber());

		let l = parseInt(this.getSelectedNumber());
		this.moveLines(l) ;

		this.popupElement.style.visibility="hidden";
		this.menuElement.style.visibility="hidden";
	}
	
	function _call_insert(e){
		e.preventDefault();

		//console.log("insert");
		console.log("_call_insert:"+  this.getSelectedNumber());


		let l = parseInt(this.getSelectedNumber())-1;
		this.moveLines(l) ;

		this.popupElement.style.visibility="hidden";
		this.menuElement.style.visibility="hidden";
	}

	function _moveLines(l) {
		let i,j,k, b,a;

		for(i=MAX_ROWS-1; i> l;i--) {
			k = i-1;
			for(j=0; j< MAX_COLS;j++) {
				b = document.getElementById("cell"+k+"_"+j);
				a = document.getElementById("cell"+i+"_"+j);


				//console.log(this.cell[j].type+":"+i+":"+j+":"+k);
				switch(this.cell[j].type) {
				case "no":
					// ここは通過しない
				break;
				case "input":
					a.value = b.value;
				break;
				case "select":
					a.selectedIndex = b.selectedIndex;
					//console.log("selectIndex="+b.selectedIndex)
				break;
				case "checkbox":
					a.checked = b.checked;
				break;
				}
				
			}
		}

		for(j=0; j< MAX_COLS;j++) {
			a = document.getElementById("cell"+i+"_"+j);

			switch(this.cell[j].type) {
			case "no":
				// ここは通過しない
			break;
			case "input":
				a.value = "";
			break;
			case "select":
				a.selectedIndex = 0;
			break;
			case "checkbox":
				a.checked = false;
			break;
			}
			
		}
	}

	function _deleteLines(l) {
		let i,j,k, b,a;

		for(i=l ;i < MAX_ROWS-1; i++) {
			k = i+1;
			for(j=0; j< MAX_COLS;j++) {
				b = document.getElementById("cell"+k+"_"+j);
				a = document.getElementById("cell"+i+"_"+j);

				switch(this.cell[j].type) {
				case "no":
					// ここは通過しない
				break;
				case "input":
					a.value = b.value;
				break;
				case "select":
					a.selectedIndex = b.selectedIndex;
				break;
				case "checkbox":
					a.checked = b.checked;
				break;
				}
				
			}
		}

		for(j=l; j< MAX_COLS-1;j++) {
			b = document.getElementById("cell"+i+"_"+j);

			switch(this.cell[j].type) {
			case "no":
				// ここは通過しない
			break;
			case "input":
				b.value = "";
			break;
			case "select":
				b.selectexIndex = 0;
			break;
			case "checkbox":
				b.checked = false;
			break;
			}
			
		}
	}

	

	function _setCellSelectedIndex(row, col, index) {
		let id = "cell"+row+"_"+col;
		document.getElementById(id).selectedIndex = index;
	}

	function _getCellSelectedIndex(row, col) {
		let id = "cell"+row+"_"+col;
		return document.getElementById(id).selectedIndex;
	}

	function _getCellValue(row, col) {
		let id = "cell"+row+"_"+col;
		try {
			return document.getElementById(id).value;
		} catch(e) {
			console.log(id);
		}
	}

	function _getCell(col) {
		return this.cell[col];
	}

	function _change_input(e) {

		let oldId = e.target.id;
		let num = oldId.substr(4).split('_');
		let row = parseInt(num[0]);
		let col = parseInt(num[1]);
		let cell = this.getCell(col);

		if(cell.change == null) {
			retrun;
		}
		let args = {"target":e.target, "row":row, "col":col};
		cell.change(args);
	}

	function _change_select(e) {

		let oldId = e.target.id;
		let num = oldId.substr(4).split('_');
		let row = parseInt(num[0]);
		let col = parseInt(num[1]);
		let cell = this.getCell(col);

		if(cell.change == null) {
			retrun;
		}
		let args = {"target":e.target, "row":row, "col":col};
		cell.change(args);
	}

	function _change_checkbox(e) {

		let oldId = e.target.id;
		let num = oldId.substr(4).split('_');
		let row = parseInt(num[0]);
		let col = parseInt(num[1]);
		let cell = this.getCell(col);

		if(cell.change == null) {
			retrun;
		}
		let args = {"target":e.target, "row":row, "col":col};
		cell.change(args);
	}

	function _blur_input(e) {

		let oldId = e.target.id;
		let num = oldId.substr(4).split('_');
		let row = parseInt(num[0]);
		let col = parseInt(num[1]);
		let cell = this.getCell(col);

		if(cell.blur == null) {
			retrun;
		}
		let args = {"target":e.target, "row":row, "col":col};
		cell.blur(args);
	}

	function _blur_select(e) {

		let oldId = e.target.id;
		let num = oldId.substr(4).split('_');
		let row = parseInt(num[0]);
		let col = parseInt(num[1]);
		let cell = this.getCell(col);

		if(cell.blur == null) {
			return;
		}
		let args = {"target":e.target, "row":row, "col":col};
		cell.blur(args);
	}

	function _blur_checkbox(e) {

		let oldId = e.target.id;
		let num = oldId.substr(4).split('_');
		let row = parseInt(num[0]);
		let col = parseInt(num[1]);
		let cell = this.getCell(col);

		if(cell.blur == null) {
			return;
		}
		let args = {"target":e.target, "row":row, "col":col};
		cell.blur(args);
	}

	function _keyup_input(e) {

		let oldId = e.target.id;
		let num = oldId.substr(4).split('_');
		let row = parseInt(num[0]);
		let col = parseInt(num[1]);
		let cell = this.getCell(col);

		if(cell.keyup == null) {
			retrun;
		}
		let args = {"target":e.target, "row":row, "col":col};
		cell.keyup(args);
	}

	function _keyup_select(e) {

		let oldId = e.target.id;
		let num = oldId.substr(4).split('_');
		let row = parseInt(num[0]);
		let col = parseInt(num[1]);
		let cell = this.getCell(col);

		if(cell.keyup == null) {
			return;
		}
		let args = {"target":e.target, "row":row, "col":col};
		cell.keyup(args);
	}

	function _keyup_checkbox(e) {

		let oldId = e.target.id;
		let num = oldId.substr(4).split('_');
		let row = parseInt(num[0]);
		let col = parseInt(num[1]);
		let cell = this.getCell(col);

		if(cell.keyup == null) {
			return;
		}
		let args = {"target":e.target, "row":row, "col":col};
		cell.keyup(args);
	}

	function _keydown_input(e) {

		if( e.shiftKey) {
			e.stopPropagation();
			e.preventDefault();

			let oldId = e.target.id;
			let num = oldId.substr(4).split('_');
			let row = parseInt(num[0]);
			let col = parseInt(num[1]);

			let newId = this.getNewId(e.key, row, col);
			if(oldId == newId) {
				return;
			}
			document.getElementById(oldId).blur();
			document.getElementById(newId).focus();
				
			
			const event = new CustomEvent('eventname');

			elem.addEventListener('eventname', function(e) {
				console.log(e.detail);
			});
			document.getElementById(newId).dispatchEvent(event);



			
			return;
		}

		let oldId = e.target.id;
		let num = oldId.substr(4).split('_');
		let row = parseInt(num[0]);
		let col = parseInt(num[1]);
		let cell = this.getCell(col);

		if(cell.keydown == null) {
			return;
		}

		let args = {"target":e.target, "row":row, "col":col};

		cell.keydown(args);
	}

	function _keydown_select(e) {

		if( e.shiftKey) {
			e.stopPropagation();
			e.preventDefault();

			let oldId = e.target.id;
			let num = oldId.substr(4).split('_');
			let row = parseInt(num[0]);
			let col = parseInt(num[1]);

			let newId = this.getNewId(e.key, row, col);
			if(oldId == newId) {
				return;
			}
			console.log("newId="+ newId );
			document.getElementById(oldId).blur();
			document.getElementById(newId).focus();
			return;
		}

		let oldId = e.target.id;
		let num = oldId.substr(4).split('_');
		let row = parseInt(num[0]);
		let col = parseInt(num[1]);
		let cell = this.getCell(col);

		if(cell.keydown == null) {
			return;
		}
		let args = {"target":e.target, "row":row, "col":col};
		cell.keydown(args);
	}

	function _keydown_checkbox(e) {

		if( e.shiftKey) {
			e.stopPropagation();
			e.preventDefault();

			let oldId = e.target.id;
			let num = oldId.substr(4).split('_');
			let row = parseInt(num[0]);
			let col = parseInt(num[1]);
			let newId = this.getNewId(e.key, row, col);
			if(oldId == newId) {
				return;
			}
			document.getElementById(oldId).blur();
			document.getElementById(newId).focus();
			return;
		}

		let oldId = e.target.id;
		let num = oldId.substr(4).split('_');
		let row = parseInt(num[0]);
		let col = parseInt(num[1]);
		let cell = this.getCell(col);

		if(cell.keydown == null) {
			retrun;
		}
		let args = {"target":e.target, "row":row, "col":col};
		cell.keydown(args);
	}

	function _getNewId(_key, _row, _col, ) {

		let row, col;
		row = _row;
		col = _col;

		switch(_key) {
		case "ArrowDown":
			if(row <MAX_ROWS -1) {
				row++ ;
			}
		break;

		case "ArrowUp":
			if(row > 0) {
				row-- ;
			}
		break;

		case "ArrowRight":
			if(col <MAX_COLS -1) {
				col++ ;
			}
		break;

		case "ArrowLeft":
			if(col > 1) {
				col-- ;
			}
		break;
		}

		return this.CELL_CLASS_NAME+row+"_"+col;
	}

	function _addNumberNode(cell, className, s) {

		let node  = document.createTextNode(s)
		cell.appendChild(node);
		cell.setAttribute("class",className);
	}

	// 作成したセルにノードを挿入
	function _addNode(cell, className, s, row, col) {

		let input;
	
		switch(this.cell[col].type) {
		case "no":
			let node  = document.createTextNode(row+1)
			cell.appendChild(node);
			cell.setAttribute("class",className);
			cell.addEventListener ("mouseup", this.context_menu, false);
			cell.addEventListener ("contextmenu", _cancel, false);

			return node;
		break;
		case "input":
			input = document.createElement("input");
			input.setAttribute("type","text");
			input.addEventListener ("keydown", this.keydown_input, false);
			input.addEventListener ("keyup", this.keyup_input, false);
		break;
		case "select":
			input = document.createElement("select");
			_addOption(input, this.cell[col].option);
			input.addEventListener ("keydown", this.keydown_select, false);
			input.addEventListener ("keyup", this.keyup_select, false);
			input.addEventListener ("change", this.change_select, false);
		break;
		case "checkbox":
			input = document.createElement("input");
			input.setAttribute("type","checkbox");
			input.addEventListener ("keydown", this.keydown_checkbox, false);
			input.addEventListener ("keyup", this.keyup_checkbox, false);
		break;
		}

		input.setAttribute("class","cell");
		input.setAttribute("id","cell"+row+"_"+col);

		cell.appendChild(input);
		cell.setAttribute("class",className);

		return node;

		function _addOption(input, option) {
			let op;

			for(let i in option) {
				op = document.createElement("option");
				op.value = option[i];
				op.text = option[i];
				input.appendChild(op);
			}
			
		}

		function _cancel (e) {
			e.preventDefault();
		}
        }

	function _addEventListener(parentNode, elms) {

		let len = elms.length;

		for(let i =0;i<len;i++) {
			elms[i].addEventListener ("keydown", _dummy, false);
		}
	}

	function _context_menu(e) {

		e.preventDefault();

		switch(e.button) {
		case 2:
		break;
		default:
			return;
		}
		//console.log("1:"+  e.target.innerText);

		this.setSelectedNumber(e.target.innerText);

		setTimeout(_call.bind(null,e.clientX,e.clientY),10);

		return;

		function _call(x,y) {
			const id1 = "popup";
			const id2 = "frame_menu";
			let elm;

			elm = document.getElementById(id1);
			elm.style.visibility = "visible";
	
			elm = document.getElementById(id2);
			elm.style.visibility = "visible";

			elm.style.top = y+"px";
			elm.style.left = x+"px";
		}
	}

}

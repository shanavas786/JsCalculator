/********************************************************************
 * Copyright (C) 2014 Shanavas m <shanavas[dot]m2[at]gmail.com>
 *
 * This script is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 2 of the License, or (at your option) any later
 * version. See http://www.gnu.org/copyleft/gpl.html the full text of the
 * license.
 ********************************************************************/

function init(){
	inputBottom = document.getElementById("input-bottom");
	inputTop = document.getElementById("input-top");
	opString = '';
	operator = false;
	decimal = false;
	equal = false;
	sqString = '';
	minusNode = document.createTextNode('-');
	while(inputBottom.firstChild){
		inputBottom.removeChild(inputBottom.firstChild);
	}
}

function showMenu(){
	 document.getElementById("menu-mode").style.display = "block";
}

function hideMenu(){
 document.getElementById("menu-mode").style.display = "none";
}

function showAbout(){
	// Set height and width
	 var NewWinHeight=300;
	 var NewWinWidth=270;

	 // Place the window
	 var w=window.innerWidth
	 || document.documentElement.clientWidth
	 || document.body.clientWidth;

	 var h=window.innerHeight
	 || document.documentElement.clientHeight
	 || document.body.clientHeight; 

	 //Get what is below onto one line

	 TheNewWin =window.open("about.html",'TheNewpop','fullscreen=no,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no'); 

	 //Get what is above onto one line

	 TheNewWin.resizeTo(NewWinWidth,NewWinHeight);
	 TheNewWin.moveTo((w-200)/2,(h-200)/2);
}

function showHelp(){
	// Set height and width
	 var NewWinHeight=500;
	 var NewWinWidth=500;

	 // Place the window
	 var w=window.innerWidth
	 || document.documentElement.clientWidth
	 || document.body.clientWidth;

	 var h=window.innerHeight
	 || document.documentElement.clientHeight
	 || document.body.clientHeight; 

	 //Get what is below onto one line

	 TheNewWin =window.open("help.html",'TheNewpop','fullscreen=no,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no'); 

	 //Get what is above onto one line

	 TheNewWin.resizeTo(NewWinWidth,NewWinHeight);
	 TheNewWin.moveTo((w-200)/2,(h-200)/2);
}

function buttonPress(button){
	//if number append to input-bottom
	if(!isNaN(button) && !equal){
		var keyNode = document.createTextNode(button);
		inputBottom.appendChild(keyNode);
	}
	
	//if operator collect the input string
	if((button == '+' || button == '-' || button == '*'  || button == '/') && (inputBottom.childNodes.length>0)){
		while(inputBottom.firstChild){
			opString += inputBottom.firstChild.nodeValue;
			inputBottom.removeChild(inputBottom.firstChild);
		}
		//if first operator, append with the string and display at top
		//else evaluate and display result at top along with new operator
		if(!operator){
			opString += button;
			var opNode = document.createTextNode(opString);
			inputTop.appendChild(opNode);
			operator = true;
		}else{
			opString = eval(opString) + button;
			var opNode = document.createTextNode(opString);
			while(inputTop.firstChild){
				inputTop.removeChild(inputTop.firstChild);
			}			
			inputTop.appendChild(opNode);
		}
		equal = false;
		decimal = false;
	}
	
	//if equal sign display equation at top and result at bottom
	if(button == 'eq' && operator){
		while(inputBottom.firstChild){
			opString += inputBottom.firstChild.nodeValue;
			inputBottom.removeChild(inputBottom.firstChild);
		}
		while(inputTop.firstChild){
			inputTop.removeChild(inputTop.firstChild);
		}
		var resNode = document.createTextNode(eval(opString));
		inputBottom.appendChild(resNode);
		opString = '';
		operator = false;
		equal = true;
		decimal = true;
	}
	
	//clear button function
	if(button =='cl'){
		while(inputBottom.firstChild){
			inputBottom.removeChild(inputBottom.firstChild);
		}
		equal = false;
		decimal = false;
	}
	
	//back button function
	if(button =='bs'){
		if(inputBottom.lastChild.nodeValue == '.'){
			decimal = false;
		}
		inputBottom.removeChild(inputBottom.lastChild);
		equal = false;
	}
	
	//square root button function
	if(button =='sr'){
		while(inputBottom.firstChild){
			sqString += inputBottom.firstChild.nodeValue;
			inputBottom.removeChild(inputBottom.firstChild);
		}
		sqNode = document.createTextNode(Math.sqrt(sqString).toFixed(3));
		inputBottom.appendChild(sqNode);
		sqString = '';
		equal = true;
		decimal = true;
	}
	
	//decimal button function
	if(button =='.' && !decimal){
		var keyNode = document.createTextNode(button);
		inputBottom.appendChild(keyNode);
		decimal = true;
	}
	
	//plus or minus button function
	if(button =='pm'){
		if(inputBottom.firstChild.nodeValue == '-'){
			inputBottom.removeChild(inputBottom.firstChild);
		}else{
			inputBottom.insertBefore(minusNode, inputBottom.firstChild);
		}
	}
	
}

// function handling keyboard inputs
function keyCalc(){
	key = getKey();
	buttonPress(key);
}
function getKey(){
	if(event.keyCode>=48 && event.keyCode <=57){
		return event.keyCode - 48;
	}
	switch(event.keyCode){
	case 43:
		return '+';
	case 45:
		return '-';
	case 42:
		return '*';
	case 47:
		return '/';
	case 61:
	case 13:
		return 'eq';
	case 46:
		return '.';
	default:
		return rull;
	}
}

window.onload = init;
window.onkeypress = keyCalc;

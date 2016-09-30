var app = (function(){
	var getElementById = document.getElementById.bind(document);
	var input1,
	input2,
	inputText1,
	inputText2,
	date1,
	date2,
	result,
	resultElem,
	inputParsedElem;

	function main(){
		var modalOn = getElementById("mdlO");
		var modalOff = getElementById("mdlX");

		input1 = getElementById("d1");
		input2 = getElementById("d2");
		inputParsedElem = getElementById("sub");
		resultElem = getElementById("result1");

		input1.addEventListener("keyup", onInput);
		input2.addEventListener("keyup", onInput);

		modalOn.onclick = modalOff.onclick = mdl;

		onInput();
	};

	function onInput(event) {
		if (event && event.keyCode == 13) {
			event.preventDefault();
			input2.focus();
		}
		inputText1 = input1.value;
		inputText2 = input2.value;
		date1 = DP(inputText1);
		date2 = DP(inputText2);
		result = DC(date1, date2);

		resultElem.innerHTML = inputParsedElem.innerHTML = "";
		if (!result) {
			resultElem.innerHTML = "Waiting for input...";
			if (inputText1 !== "" || inputText2 !== "") {
				inputParsedElem.innerHTML = formatDate(date1, inputText1) + " – " + formatDate(date2, inputText2);
			}
		}
		else if (result instanceof Date) {
			resultElem.innerHTML = formatDate(result);

			var sum = date2.reduce(function(a, b) {
			    return a + b;
			}, 0);

			inputParsedElem.innerHTML = formatDate(date1) + ((sum > 0) ? " +" : " -") + formatUnit(date2);
		}
		else {
			var timeBetweenString = appendUnitString("year", result[0], timeBetweenString);
			timeBetweenString += appendUnitString("month", result[1], timeBetweenString);
			timeBetweenString += appendUnitString("day", result[2], timeBetweenString, timeBetweenString === "");

			resultElem.innerHTML = timeBetweenString + ((result[0] > 0 || result[1] > 0) ? (" (" + appendUnitString("day", result[3], "") + ")") : "");;
			inputParsedElem.innerHTML = "Between " + formatDate(date1) + " – " + formatDate(date2);
		}
	};

	function appendUnitString(unit, value, str, force) {
		return (value > 0 || force) ? (((str === "") ? "" : " ") + value + " " + ((value !== 1) ? unit + "s" : unit)) : "";
	};

	function formatDate(date, originalText) {
		return (date) ? MN[date.getMonth()] + " " + getOrdinal(date.getDate()) + ", " + date.getFullYear() : ((originalText === "") ? "No Date Entered" : "Invalid Date");
	};

	function formatUnit(interval) {
		var abs = Math.abs.bind(Math);
		var str = getUnitString(abs(interval[0]), Un[0]);
		str += ((str != "") ? ", " : "") + getUnitString(abs(interval[1]), Un[1]);
		str += (str.endsWith(", ") ? "" : ((str != "") ? ", " : "")) + getUnitString(abs(interval[2]), Un[2]);
		return str;
	};

	
	function mdl(){
		if (!document.body.classList.contains('mdl-visible')) {
			document.getElementsByClassName("close")[0].focus();
		}
		else {
			document.getElementsByClassName("mdl-launch")[0].focus();
		}
		document.body.classList.toggle('mdl-visible');
	};

	function getUnitString (amount, singularUnit) {
		var str = "";
		if (amount != 0)
		{
			str = amount + " " + singularUnit;
			if (amount !== 1) {
				str += "s";
			}
		}
		return str;
	};

	// http://stackoverflow.com/questions/12487422/take-a-value-1-31-and-convert-it-to-ordinal-date-w-javascript/12487454#12487454
	function getOrdinal(n) {
		if((parseFloat(n) == parseInt(n)) && !isNaN(n)){
			var s=["th","st","nd","rd"],
			v=n%100;
			return n+(s[(v-20)%10]||s[v]||s[0]);
		}
		return n;     
	};
	
	return main;
}());

window.onload = app;

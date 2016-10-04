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
	otherSection,
	otherList,
	inputParsedElem;

	function main(){
		var modalOn = getElementById("mdlO");
		var modalOff = getElementById("mdlX");

		input1 = getElementById("d1");
		input2 = getElementById("d2");
		inputParsedElem = getElementById("sub");
		resultElem = getElementById("result1");
		otherSection = getElementById("otherSection");
		otherList = getElementById("otherList");

		input1.addEventListener("keyup", onInput);
		input2.addEventListener("keyup", onInput);

		input1.value = input2.value = "";

		modalOn.onclick = modalOff.onclick = mdl;

		modalOn.classList.remove("hidden");

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

		resultElem.innerHTML = inputParsedElem.innerHTML = otherList.innerHTML = "";
		otherSection.classList.add("hidden");
		if (!result) {
			resultElem.innerHTML = "Waiting for input...";
			if (inputText1 !== "" || inputText2 !== "") {
				var output1 = formatTime(date1, inputText1);
				var output2 = formatTime(date2, inputText2);
				inputParsedElem.innerHTML = output1 + ((output1) ? " – " : "") + output2;
			}
		}
		else if (result instanceof Date) {
			resultElem.innerHTML = formatTime(result);

			inputParsedElem.innerHTML = formatTime(date1) + formatTime(date2);
		}
		else {
			var timeBetweenString = appendUnitString(Un[0], result[0], timeBetweenString);
			timeBetweenString += appendUnitString(Un[1], result[1], timeBetweenString);
			timeBetweenString += appendUnitString(Un[2], result[2], timeBetweenString, timeBetweenString === "");

			resultElem.innerHTML = timeBetweenString + ((result[0] > 0 || result[1] > 0) ? (" (" + appendUnitString(Un[2], result[3], "") + ")") : "");
			inputParsedElem.innerHTML = "Between " + formatDate(date1) + " – " + formatDate(date2);

			createOtherOutput(appendList([getUnitString(result[0], Un[0]), getUnitString(result[1], Un[1]), getUnitString(result[2], Un[2])]));
			createOtherOutput(appendList([getUnitString(result[0] * 12 + result[1], Un[1]), getUnitString(result[2], Un[2])]));
			createOtherOutput(appendList([getUnitString(Math.floor(result[3] / 7), "week"), getUnitString(result[3] % 7, Un[2])]));
			createOtherOutput(getUnitString(result[3], Un[2]));
			createOtherOutput(getUnitString(result[3] * 24, "hour"));
			createOtherOutput(getUnitString(result[3] * 1440, "minute"));
			createOtherOutput(getUnitString(result[3] * 86400, "second"));
			createOtherOutput(getUnitString(result[3] * 86400000, "millisecond"));

			if (otherList.innerHTML !== "") {
				otherSection.classList.remove("hidden");
			}
		}
	};

	function appendUnitString(unit, value, str, force) {
		return (value > 0 || force) ? (((str === "") ? "" : " ") + value + " " + ((value !== 1) ? unit + "s" : unit)) : "";
	};

	function formatTime(value, originalText) {
		if (value instanceof Array) {
			return formatUnit(value);
		}
		else {
			return formatDate(value, originalText);
		}
	}

	function formatDate(date, originalText) {
		return (date) ? MN[date.getMonth()] + " " + getOrdinal(date.getDate()) + ", " + date.getFullYear() : ((originalText === "") ? "No Date Entered" : "Invalid Date");
	};

	function formatUnit(interval) {
		var sum = interval.reduce(function(a, b) {
		    return a + b;
		}, 0);
		var abs = Math.abs.bind(Math);
		var str = ((sum > 0) ? " +" : " -")
		str += appendList([getUnitString(abs(interval[0]), Un[0]), getUnitString(abs(interval[1]), Un[1]), getUnitString(abs(interval[2]), Un[2])], true);
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

	function appendList(list, force) {
		if (list[0] != "" || force) {
			var str = "";
			list.some(function (element, i, arr) {
				str += ((str != "" && element != "") ? ", " : "") + element;
			});
			return str;	
		}
		return "";
	}

	// http://stackoverflow.com/questions/12487422/take-a-value-1-31-and-convert-it-to-ordinal-date-w-javascript/12487454#12487454
	function getOrdinal(n) {
		if((parseFloat(n) == parseInt(n)) && !isNaN(n)){
			var s=["th","st","nd","rd"],
			v=n%100;
			return n+(s[(v-20)%10]||s[v]||s[0]);
		}
		return n;     
	};

	function createOtherOutput(str) {
		if (str !== "") {
			var li = document.createElement("li");
			li.innerHTML = str;
			otherList.appendChild(li);
		}
	}
	
	return main;
}());

window.onload = app;

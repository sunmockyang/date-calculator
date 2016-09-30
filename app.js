var express = require('express');
var compression = require('compression')
var fs = require('fs');


var projectRoot = "./";

require(projectRoot + "js/DateCalculator.js");
require(projectRoot + "js/DateParser.js");
require(projectRoot + "js/DateUtils.js");

var app = express();
app.use(compression())

var indexFile = projectRoot + "index.html"

app.get('/', function(req, res){
	// res.writeHead(200, {'Content-Type': 'text/html', 'Content-Encoding': 'gzip'});

	var inputText1 = req.query.d1;
	var inputText2 = req.query.d2;

	inputText1 = (inputText1) ? inputText1 : "";
	inputText2 = (inputText2) ? inputText2 : "";

	fs.readFile(indexFile, "utf8", function (err, indexBody) {
		if (err) {
			console.log("Error opening " + indexFile);
		}

		// String Replaces on all the values
		indexBody = injectValue(indexBody, "$$INPUT1$$", inputText1);
		indexBody = injectValue(indexBody, "$$INPUT2$$", inputText2);

		// Do input calculations
		if (inputText1 && inputText2){
			var date1 = DP(inputText1);
			var date2 = DP(inputText2);
			var result = DC(date1, date2);
		}

		if (!result) {
			if (inputText1 == "" && inputText2 == "") {
				indexBody = injectValue(indexBody, "$$RESULT1$$", "");
				indexBody = injectValue(indexBody, "$$RESULTSUB$$", "");
			}
			else if (inputText1 !== "" || inputText2 !== "") {
				var output1 = formatTime(date1, inputText1);
				var output2 = formatTime(date2, inputText2);
				indexBody = injectValue(indexBody, "$$RESULT1$$", "Invalid input, try again.");
				indexBody = injectValue(indexBody, "$$RESULTSUB$$", output1 + ((output1) ? " – " : "") + output2);
			}
			else {
				indexBody = injectValue(indexBody, "$$RESULT1$$", "Invalid input, try again.");
				indexBody = injectValue(indexBody, "$$RESULTSUB$$", "");
			}
			indexBody = injectValue(indexBody, "$$OTHERTIMEFORMATSVISIBILITY$$", "hidden");
		}
		else if (result instanceof Date) {
			// Date Interval calculation
			indexBody = injectValue(indexBody, "$$RESULT1$$", formatTime(result));
			indexBody = injectValue(indexBody, "$$RESULTSUB$$", formatTime(date1) + formatTime(date2));
			indexBody = injectValue(indexBody, "$$OTHERTIMEFORMATSVISIBILITY$$", "hidden");
		}
		else {
			// Date Date calculation
			var timeBetweenString = appendUnitString("year", result[0], timeBetweenString);
			timeBetweenString += appendUnitString("month", result[1], timeBetweenString);
			timeBetweenString += appendUnitString("day", result[2], timeBetweenString, timeBetweenString === "");

			var result1 = timeBetweenString + ((result[0] > 0 || result[1] > 0) ? (" (" + appendUnitString("day", result[3], "") + ")") : "");;
			var resultsub = "Between " + formatDate(date1) + " – " + formatDate(date2);

			indexBody = injectValue(indexBody, "$$RESULT1$$", result1);
			indexBody = injectValue(indexBody, "$$RESULTSUB$$", resultsub);

			var listText = createOtherOutput(appendList([getUnitString(result[0], "year"), getUnitString(result[1], "month"), getUnitString(result[2], "day")]));
			listText += createOtherOutput(appendList([getUnitString(result[0] * 12 + result[1], "month"), getUnitString(result[2], "day")]));
			listText += createOtherOutput(appendList([getUnitString(Math.floor(result[3] / 7), "week"), getUnitString(result[3] % 7, "day")]));
			listText += createOtherOutput(getUnitString(result[3], "day"));
			listText += createOtherOutput(getUnitString(result[3] * 12, "hour"));
			listText += createOtherOutput(getUnitString(result[3] * 720, "minute"));
			listText += createOtherOutput(getUnitString(result[3] * 720 * 60, "second"));
			listText += createOtherOutput(getUnitString(result[3] * 720 * 60 * 1000, "millisecond"));

			indexBody = injectValue(indexBody, "$$RESULTTIMEFORMATS$$", listText);
		}
		// zlib.gzip(indexBody, function (_, result) {
		// 	res.send(result);
		// });
		res.send(indexBody);
	});
});

function injectValue(str, placeholder, value) {
	return str.replace(placeholder, value)
}

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

// http://stackoverflow.com/questions/12487422/take-a-value-1-31-and-convert-it-to-ordinal-date-w-javascript/12487454#12487454
function getOrdinal(n) {
	if((parseFloat(n) == parseInt(n)) && !isNaN(n)){
		var s=["th","st","nd","rd"],
		v=n%100;
		return n+(s[(v-20)%10]||s[v]||s[0]);
	}
	return n;     
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

function appendUnitString(unit, value, str, force) {
	return (value > 0 || force) ? (((str === "") ? "" : " ") + value + " " + ((value !== 1) ? unit + "s" : unit)) : "";
};

function createOtherOutput(str) {
	if (str !== "") {
		return "<li>" + str + "</li>"
	}
	return "";
}

app.listen(80);
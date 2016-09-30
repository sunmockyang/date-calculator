// Date Parser
// Parse a string for a date. Basic natural language parsing

var DP = (function(){
	var numberRegex = new RegExp(/[0-9]*?[0-9]+/g);

	function DP(dateString){
		dateStringLower = dateString.toLowerCase();
		var date = 0;
		var firstChar = dateStringLower.match(/^\s*(\S)/m);
		var allNumbers = dateStringLower.match(numberRegex);

		if (dateStringLower.includes("today")) {
			date = new Date();
		}
		else if (dateStringLower.includes("tomorrow") || dateStringLower.includes("tommorrow")) {
			date = new Date();
			date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
		}
		else if (firstChar && firstChar.length > 0 && (firstChar[0].match(/[\+|\-]/) || firstChar[0].match(numberRegex)) && dateStringLower.match(/[a-z]/)) {
			date = parseInterval(dateStringLower);
		}
		else if (parseMonth(dateStringLower) !== null) {
			date = parseText(dateStringLower);
		}
		else if (allNumbers && allNumbers.length <= 3){
			date = parseMMDDYYYY(dateStringLower);
		}
		// else {
		// 	console.log("Yolo-ing...");
		// 	date = new Date(dateString); // YOLO
		// }

		return date;
	};

	function parseText(dateString) {
		var numbers = dateString.match(numberRegex),

		// Get first set of numbers for date
		// Default to first day of month
		day = (numbers && numbers[0]) || 1,

		// Get second set of numbers for year
		// Default to this year
		year = (numbers && numbers[1]) || (new Date).getFullYear(),

		month = 0;

		// Parse Month
		month = parseMonth(dateString);

		if (day > (new Date(year, month + 1, 0).getDate())) {
			return null;
		}

		return new Date(year, month, day);
	};

	function parseMMDDYYYY(dateString) {
		var numbers = dateString.match(numberRegex)

		// Default format = MM/DD/YYYY
		var month = numbers[0];
		var day = numbers[1];
		var year = numbers[2];

		// Try YYYY/MM/DD
		if (!isValidDay(day, month, year)) {
			year = numbers[0];
			month = numbers[1];
			day = numbers[2];
		}

		// Try DD/MM/YYYY
		if (!isValidDay(day, month, year)) {
			day = numbers[0];
			month = numbers[1];
			year = numbers[2];
		}

		// Try YYYY/DD/MM
		if (!isValidDay(day, month, year)) {
			year = numbers[0];
			day = numbers[1];
			month = numbers[2];
		}

		if (!isValidDay(day, month, year)) {
			return null;
		}

		return new Date(year, month - 1, day);
	};

	function parseInterval(dateString) {
		var timeValues = [0, 0, 0],
		inputValues = dateString.split(",")
		operation = dateString.startsWith("-") ? -1 : 1;

		inputValues.forEach(function (cv) {
			var words = cv.split(" "),
			value = cv.match(numberRegex)[0],
			unit = 2, // default day
			daysInWeekMultiplier = 1; // Kind of a hack

			words.forEach(function (word, i, arr) {
				if (!numberRegex.test(word)) {
					SU.forEach(function (unitType, i, arr) {
						if (word.startsWith(unitType)) {
							if (word.startsWith("w")) {
								unit = 2;
								daysInWeekMultiplier = 7;
							}
							else {
								unit = i;
							}
						}
					});
				}
			});

			timeValues[unit] += (operation) * cv.match(numberRegex)[0] * daysInWeekMultiplier;
		});

		return [timeValues[0], timeValues[1], timeValues[2]];
	};

	function parseMonth(dateString) {
		var month = null;
		SMN.some(function(cv, i) {
			return dateString.includes(cv) && (month = i);
		});
		return month;
	}

	function isValidDay(day, month, year) {
		var isValid = !(month > 12 ||
							year < 1000 ||
							day > new Date(year, month, 0).getDate());

		return isValid;
	}
	
	return DP;
}());

// console.log(DP("January 1st, 1991"));
// console.log(DP("Jan.1st, 1991"));
// console.log(DP("Jan 1st, 1991"));
// console.log(DP("May 1st, 2014"));
// console.log(DP("May 1st, 2015"));
// console.log(DP("5/19/2016"));
// console.log(DP("+1000 y"));
// console.log(DP("-200 yar"));
// console.log(DP("-100 year"));
// console.log(DP("+1 months"));
// console.log(DP("-50"));
// console.log(DP("-50 days, 100 years"));
// console.log(DP("2016-09-28T03:25:12.140Z"));

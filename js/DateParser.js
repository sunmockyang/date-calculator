// Date Parser
// Parse a string for a date. Basic natural language parsing

var DP = (function(){
	var numberRegex = new RegExp(/[0-9]*?[0-9]+/g);

	function DP(dateString){
		dateStringLower = dateString.toLowerCase();
		var date = 0;

		if (dateStringLower.match(/^\s*(\S)/m)[0].match(/[\+|\-]/)) {
			date = parseInterval(dateStringLower);
		}
		else if (dateStringLower.match(/[j,f,m,a,s,o,n,d]/i)) {
			date = parseText(dateStringLower);
		}
		else if (dateStringLower.match(numberRegex).length <= 3){
			date = parseMMDDYYYY(dateStringLower);
		}
		else {
			console.log("Yolo-ing...");
			date = new Date(dateString); // YOLO
		}

		return date;
	};

	function parseText(dateString) {
		var numbers = dateString.match(numberRegex),

		// Get first set of numbers for date
		// Default to first day of month
		day = numbers[0] || 1,

		// Get second set of numbers for year
		// Default to this year
		year = numbers[1] || (new Date).getFullYear(),

		month = 0;

		// Parse Month
		SMN.some(function(cv, i) {
			return dateString.includes(cv) && (month = i);
		});

		return new Date(year, month, day);
	};

	function parseMMDDYYYY(dateString) {
		var numbers = dateString.match(numberRegex),
		time = [(new Date).getFullYear(), 0, 1]; //year, month, date

		time = numbers;

		return new Date(time[2], time[0] - 1, time[1]);
	};

	function parseInterval(dateString) {
		var timeValues = [0, 0, 0],
		inputValues = dateString.split(",")
		operation = dateString.startsWith("-") ? -1 : 1;

		inputValues.forEach(function (cv) {
			var words = cv.split(" "),
			value = cv.match(numberRegex)[0],
			unit = 2; // default day

			words.forEach(function (word, i, arr) {
				if (!numberRegex.test(word)) {
					SU.forEach(function (unitType, i, arr) {
						if (word.startsWith(unitType)) {
							unit = i;
						}
					});
				}
			});

			timeValues[unit] = (operation) * cv.match(numberRegex)[0];
		});

		return [timeValues[0], timeValues[1], timeValues[2]];
	};
	
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

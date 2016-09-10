var DCA = {};

// start and end times must be JS date objects
DCA.getDaysBetween = function (start, end) {

	// Put all variable declarations here so that they can be minified better
	var startTime = start.getTime();
	var endTime = end.getTime();

	var days = Math.round((endTime - startTime) / 864e5); // 864e5 is the number of milliseconds in 1 day

	var startYear = start.getFullYear();
	var endYear = end.getFullYear();

	var startMonth = start.getMonth();
	var endMonth = end.getMonth();

	var startDay = start.getDate();
	var endDay = end.getDate();

	var yearsBetween = endYear - startYear;
	var monthsBetween = endMonth - startMonth;
	var daysBetween = endDay - startDay;

	var timeBetweenString = "";

	if (startTime > endTime) {
		return DCA.getDaysBetween(end, start);
	}

	if (startDay > endDay) {
		endDay += DCA.getDaysInMonth(startMonth++, startYear);
	}

	if (startMonth > endMonth) {
		endMonth += 12;
		startYear++;	
	}
	
	timeBetweenString = appendUnitString("year", yearsBetween, timeBetweenString);
	timeBetweenString += appendUnitString("month", monthsBetween, timeBetweenString);
	timeBetweenString += appendUnitString("day", daysBetween, timeBetweenString);

	return timeBetweenString + " (" + appendUnitString("day", days, "") + ")";
};

DCA.addTime = function(date, years, months, days) {
	return new Date(date.getFullYear() + (years || 0),
		date.getMonth() + (months || 0),
		date.getDate() + (days || 0));
};

// Jan = 0, Feb = 1, etc
DCA.getDaysInMonth = function(month, year) {
	return new Date(year, month, 0).getDate();
};

function appendUnitString(unit, value, str) {
	return (value > 0) ? (((str === "") ? "" : " ") + value + " " + ((value !== 1) ? unit + "s" : unit)) : "";
};

console.log(DCA.getDaysBetween(new Date(2017, 1, 1), new Date(2016, 0, 1)));
console.log(DCA.addTime(new Date(2017, 1, 1), 0, 20));

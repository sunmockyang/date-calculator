// Date Calculator
// DC(date1, date2) - returns interval string
// DC(date, years, months, days) - returns date

var DC = (function(){
	function DC(arg1, arg2){
		if (arg1 && arg2) {
			// Route to:
			if (arg2 instanceof Date) { // Date - Date calculation
				return getDaysBetween(arg1, arg2);
			}
			else { // Date +- Interval calculation
				return addTime(arg1, arg2);
			}
		}
		else {
			return 0;
		}
	};

	function addTime(date, interval) {
		return new Date(date.getFullYear() + (interval[0] || 0),
			date.getMonth() + (interval[1] || 0),
			date.getDate() + (interval[2] || 0));
	};

	function getDaysBetween(start, end) {
		start = new Date(start.getFullYear(), start.getMonth(), start.getDate());
		end = new Date(end.getFullYear(), end.getMonth(), end.getDate());
		var startTime = start.getTime();
		var endTime = end.getTime();

		if (startTime > endTime) {
			return getDaysBetween(end, start);
		}

		// Put all variable declarations here so that they can be minified better
		var days = Math.round((endTime - startTime) / 864e5); // 864e5 is the number of milliseconds in 1 day

		var startYear = start.getFullYear();
		var endYear = end.getFullYear();

		var startMonth = start.getMonth();
		var endMonth = end.getMonth();

		var startDay = start.getDate();
		var endDay = end.getDate();

		if (startDay > endDay) {
			endDay += getDaysInMonth(++startMonth, startYear);
		}

		if (startMonth > endMonth) {
			endMonth += 12;
			startYear++;	
		}

		var yearsBetween = endYear - startYear;
		var monthsBetween = endMonth - startMonth;
		var daysBetween = endDay - startDay;

		var intervalArray = [yearsBetween, monthsBetween, daysBetween, days];

		return intervalArray;
	};

	// Jan = 0, Feb = 1, etc
	function getDaysInMonth(month, year) {
		return new Date(year, month, 0).getDate();
	};
	
	return DC;
}());

// console.log(DC(new Date(2017, 1, 1), new Date(2016, 1, 2)));
// console.log(DC(new Date(2017, 1, 1), [0, 20, 5]));
// console.log(DC(new Date(2017, 1, 1), [0, 0, 5]));

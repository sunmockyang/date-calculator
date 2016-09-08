var DateCalcApp = {};

DateCalcApp.units = ["year", "month", "week", "day", "hour", "minute", "second"]

DateCalcApp.getTimeStringBetweenDates = function(_date1, _date2, maxUnit) {
	var date1 = new Date(_date1.getTime());
	var date2 = new Date(_date2.getTime());

	// Make sure date1 > date2
	if (date1.getTime() < date2.getTime()) {
		return this.getTimeStringBetweenDates(date2, date1, maxUnit);
	}

	var str = "";

	var msToS = 1000;
	var msToM = 60 * msToS;
	var msToH = 60 * msToM;
	var msToD = 24 * msToH;
	var msToW = 7 * msToD;

	var date1T = date1.getTime();
	var date2T = date2.getTime();

	switch (maxUnit) {
		default:
		case "year" :
			// Years
			var yearsInBetween = date1.getYear() - date2.getYear();
			var isNotQuiteAYear = false;
			isNotQuiteAYear = isNotQuiteAYear || date1.getMonth() < date2.getMonth();
			isNotQuiteAYear = isNotQuiteAYear || (date1.getMonth() == date2.getMonth() && date1.getDate() < date2.getDate());
			// isNotQuiteAYear = isNotQuiteAYear || date1.getHours() < date2.getHours();
			// isNotQuiteAYear = isNotQuiteAYear || date1.getMinutes() < date2.getMinutes();
			// isNotQuiteAYear = isNotQuiteAYear || date1.getSeconds() < date2.getSeconds();
			yearsInBetween -= (isNotQuiteAYear) ? 1 : 0;

			if (yearsInBetween > 0) {
				str += getUnitString(yearsInBetween, "year");
				date1.setFullYear(date1.getFullYear() - yearsInBetween);
			}

		case "month" :
			// Months
			var yearsInBetween = date1.getYear() - date2.getYear();
			var monthsInBetween = date1.getMonth() - date2.getMonth() + ((yearsInBetween > 0) ? 12 * yearsInBetween : 0);
			var isNotQuiteAMonth = false;
			isNotQuiteAMonth = isNotQuiteAMonth || date1.getDate() < date2.getDate();
			// isNotQuiteAMonth = isNotQuiteAMonth || date1.getHours() < date2.getHours();
			// isNotQuiteAMonth = isNotQuiteAMonth || date1.getMinutes() < date2.getMinutes();
			// isNotQuiteAMonth = isNotQuiteAMonth || date1.getSeconds() < date2.getSeconds();
			monthsInBetween -= (isNotQuiteAMonth) ? 1 : 0;
			if (monthsInBetween > 0) {
				str += str ? " + " : "";
				str += getUnitString(monthsInBetween, "month");
				date1.setMonth(date1.getMonth() - monthsInBetween);
			}

		case "week":
			// Weeks
			// date1T = date1.getTime();
			// date2T = date2.getTime();
			// if (date1T - date2T >= msToW) {
			// 	var weeksInBetween = Math.floor((date1T - date2T) / msToW);
			// 	date1T -= msToW * weeksInBetween;
			// 	date1 = new Date(date1T);
			// 	str += str ? " + " : "";
			// 	str += getUnitString(weeksInBetween, "week");
			// }

		case "day" :
			date1T = date1.getTime();
			date2T = date2.getTime();
			if (date1T - date2T >= msToD) {
				var daysInBetween = Math.floor((date1T - date2T) / msToD);
				date1T -= msToD * daysInBetween;
				date1 = new Date(date1T);
				str += str ? " + " : "";
				str += getUnitString(daysInBetween, "day");
			}

		case "hour":
			date1T = date1.getTime();
			date2T = date2.getTime();
			if (date1T - date2T >= msToH) {
				var hoursInBetween = Math.floor((date1T - date2T) / msToH);
				date1T -= msToH * hoursInBetween;
				date1 = new Date(date1T);
				str += str ? " + " : "";
				str += getUnitString(hoursInBetween, "hour");
			}

		case "minute":
			date1T = date1.getTime();
			date2T = date2.getTime();
			if (date1T - date2T >= msToM) {
				var minutesInBetween = Math.floor((date1T - date2T) / msToM);
				date1T -= msToM * minutesInBetween;
				date1 = new Date(date1T);
				str += str ? " + " : "";
				str += getUnitString(minutesInBetween, "minute");
			}

		case "second":
			date1T = date1.getTime();
			date2T = date2.getTime();
			if (date1T - date2T >= msToS) {
				var secondsInBetween = Math.floor((date1T - date2T) / msToS);
				date1T -= msToS * secondsInBetween;
				date1 = new Date(date1T);
				str += str ? " + " : "";
				str += getUnitString(secondsInBetween, "second");
			}
	}

	return str;
}

function getUnitString (amount, singularUnit) {
	var str = "";
	if (amount > 0)
	{
		str = amount + " " + singularUnit;
		if (amount !== 1) {
			str += "s";
		}
	}
	return str;
}

function prependTime(str, interval) {
	if (interval) {
		str = interval + (str ? " + " : "") + str;
	}
	return str;
}

function daysInYear(year) {
	return leapYear(year) ? 366 : 365;
}

function leapYear(year) {
	return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

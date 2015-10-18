//Date handler this module contains methods to handle dates
var moment = require('moment');

var getDateFromUnixTimeStamp = function (timeStamp) {
	var date = moment(timeStamp,'x').format('MM-DD-YYYY');
	console.log('The timestamp '+ timeStamp+ ' converted to ' + date);

	return date;
};
exports.getDateFromUnixTimeStamp = getDateFromUnixTimeStamp;
var json2xls = require('../lib/json2xls');
var interview = require('../spec/interview.json');
var fs = require('fs');

var xls = json2xls(interview,{});
fs.writeFileSync('interview.xlsx',xls, 'binary');
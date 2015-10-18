//Token tests

var expect =  require('chai').expect;
var request = require('superagent');
require('superagent-proxy')(request);

describe('Token',function(){
	this.timeout(4000);


	it('GET /Authentication/token',function(done){
		request
			.get('https://todo.ly/api/authentication/token.json')
			//.proxy('http://172.20.240.5:8080')
			.auth('gordines007@gmail.com','control123!@#')
		.end(function(err, res){
			console.log(res.body);
			console.log(res.status);
			
			expect(res.body.TokenString).not.to.be.null;
			expect(res.body.UserEmail).to.equal('gordines007@gmail.com');

			var regExpress = '[0-9]+';
			var expireDate = res.body.ExpirationTime.match(regExpress);

			console.log(expireDate);
			var date = new Date();
			var currentDate = date.getTime();

			var diffTime = expireDate - currentDate;
			var calcHours = diffTime/(1000*60*60);

			console.log('+++' + diffTime);
			console.log(calcHours);

			expect(calcHours).to.be.below(4).and.to.be.above(3.9);
			done();
		});
	});
});


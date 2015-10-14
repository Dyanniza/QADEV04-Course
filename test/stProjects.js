//SmokeTest for projects

var request = require('superagent');
require('superagent-proxy')(request);

var expect = require('chai').expect;


describe('Smoke Tests for Projects',function(){
	it('GET /projects.json returns 200',function(done){
		request
			.get('https://todo.ly/api/projects.json')
			.proxy('http://172.20.240.5:8080')
		.end(function(err,res){
			expect(res.status).to.equal(200);
			done();
		});
	});

	it('GET /projects/[id].json returns 200',function(done){
		request
			.get('https://todo.ly/api/projects/-1.json')
			.proxy('http://172.20.240.5:8080')
		.end(function(err,res){
			console.log(res.body);
			expect(res.status).to.equal(200);
			done();
		})
	});


});



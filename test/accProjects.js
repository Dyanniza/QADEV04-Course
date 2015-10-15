//CRUD example v1.0


var request = require('superagent');
require('superagent-proxy')(request);

var expect = require('chai').expect;

describe('CRUD operation over Todo.ly Projects',function(){
	this.timeout(10000);
	it('POST /projects',function(done){
		//getting the token
		console.log('Getting the token...');
		request
			.get('https://todo.ly/api/authentication/token.json')
			.proxy('http://172.20.240.5:8080')
			.auth('gordines007@gmail.com','control123!@#')
		.end(function(err,resp){
			//creating the project
			console.log(err);
			console.log(resp)
			var token = resp.body.TokenString;
			console.log(token);

			console.log('Creating a project...');
			request
				.post('https://todo.ly/api/projects.json')
				.proxy('http://172.20.240.5:8080')
				.set('token',token)//token
				.send({Content:'PRSuperagent'})
			.end(function(err, res){
				//Verifications
				var proj = res.body;
				console.log(proj.Content);
				expect(proj.Content).to.equal('PRSuperagent');

				//deleting the project
				console.log('Deleting the project...' + proj.Content);
				request
					.del('https://todo.ly/api/projects/'+proj.Id+'.json')
					.proxy('http://172.20.240.5:8080')
					.set('token',token)//token
				.end(function(er,re){
					var projDel = re.body;
					console.log('Project deleted...' + projDel.Content);
					expect(projDel.Deleted).to.be.true;

					//deleting the token
					console.log('Deleting the token...' + token);
					request
						.del('https://todo.ly/api/authentication/token.json')
						.proxy('http://172.20.240.5:8080')
						.set('token',token)//token
					.end(function(err, res){
						var tokenDel = res.body;
						//console.log('Token deleted...' + tokenDel.TokenString);
						expect(tokenDel.TokenString).to.equal(token);
						done();
					});
					
				});
			});
		});
	});

	it('PUT /projects/[id].json when contains at least one item',function(){


	});

});




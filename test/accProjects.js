//acceptance tests CRUD

var request = require('superagent');
require('superagent-proxy')(request);

var expect = require('chai').expect;

describe('CRUD operation over Todo.ly Projects',function(){
	this.timeout(10000);

	it('POST /api/projects.json api creates a project',function(done){
		//getting the token
		console.log('Getting the token...');
		request
			.get('https://todo.ly/api/authentication/token.json')
			//.proxy('http://172.20.240.5:8080')
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
				//.proxy('http://172.20.240.5:8080')
				.set('token',token)//token
				.send({Content:'PRSuperagent'})
			.end(function(err, res){
				//Verifications
				var proj = res.body;
				console.log(proj.Content);
				expect(proj.Content).to.equal('PRSuperagent');
				// and many other assertions

				//deleting the project
				console.log('Deleting the project...' + proj.Content);
				request
					.del('https://todo.ly/api/projects/'+proj.Id+'.json')
					//.proxy('http://172.20.240.5:8080')
					.set('token',token)//token
				.end(function(er,re){
					var projDel = re.body;
					console.log('Project deleted...' + projDel.Content);
					expect(projDel.Deleted).to.be.true;

					//deleting the token
					console.log('Deleting the token...' + token);
					request
						.del('https://todo.ly/api/authentication/token.json')
						//.proxy('http://172.20.240.5:8080')
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

	it.only('PUT /projects/[id].json edit a project',function(done){
		//getting the token
		console.log('Getting the token...');
		request
			.get('https://todo.ly/api/authentication/token.json')
			//.proxy('http://172.20.240.5:8080')
			.auth('gordines007@gmail.com','control123!@#')
		.end(function(err,resp){
			//creating the project
			//console.log(err);
			//console.log(resp)
			var token = resp.body.TokenString;
			console.log(token);

			console.log('Creating a project...');
			request
				.post('https://todo.ly/api/projects.json')
				//.proxy('http://172.20.240.5:8080')
				.set('token',token)//token
				.send({Content:'ProjectWithItem'})
			.end(function(err, res){
				//Verifications
				var proj = res.body;
				console.log(proj.Content);
				expect(proj.Content).to.equal('ProjectWithItem');

				//creating an item under the project
				console.log('Creating an item under a project');
				request
					.post('https://todo.ly/api/items.json')
					//.proxy('http://172.20.240.5:8080')
					.set('token',token)
					.send({
						Content:'ItemInsideProject',
						ProjectId:proj.Id
					})
				.end(function(err,res){
					var itemCreated = res.body;
					console.log('Item created...' + itemCreated.Content);
					expect(itemCreated.Content).to.equal('ItemInsideProject');
					expect(itemCreated.ProjectId).to.equal(proj.Id);
					
					//editing the project's name and icon
					request
						.put('https://todo.ly/api/projects/'+proj.Id+'.json')
						//.proxy('http://172.20.240.5:8080')
						.set('token',token)
						.send({
							Content:'ProjectUpdated',
							Icon:8
						})	
					.end(function(err,res){
						var projEdited = res.body;
						console.log('Project Updated to ...' + projEdited.Content);						
						expect(projEdited.Content).to.equal('ProjectUpdated');
						expect(projEdited.Icon).to.equal(8);
						//and many other assertions
						
						//deleting the project
						console.log('Deleting the project...' + proj.Content);
						request
							.del('https://todo.ly/api/projects/'+proj.Id+'.json')
							//.proxy('http://172.20.240.5:8080')
							.set('token',token)//token
						.end(function(er,re){
							var projDel = re.body;
							console.log('Project deleted...' + projDel.Content);
							expect(projDel.Deleted).to.be.true;

							//deleting the item
							request
								.del('https://todo.ly/api/items/'+itemCreated.Id+'.json')
								//.proxy('http://172.20.240.5:8080')
								.set('token',token)//token
							.end(function(err,res){
								var itemDeleted = res.body;
								console.log('Item Deleted...' + itemCreated.Content);
								expect(itemDeleted.Deleted).to.be.true;

								//deleting the token
								console.log('Deleting the token...' + token);

								request
									.del('https://todo.ly/api/authentication/token.json')
									//.proxy('http://172.20.240.5:8080')
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
			});
		});

	});

});




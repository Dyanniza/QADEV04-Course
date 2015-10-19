//CRUD example v1.0
https://github.com/JFVF/QADEV04-Course

var request = require('superagent');
require('superagent-proxy')(request);

var expect = require('chai').expect;
var tokenAPI = require('../lib/tokenAPI');
var projectsAPI = require('../lib/projectsAPI');
var dateHandler = require('../utils/dateHandler');

describe('CRUD operation over Todo.ly Projects',function(){
	this.timeout(10000);
	var userCredential = {
		userAccount:'gordines007@gmail.com',
		userPassword:'control123!@#'
	};
	var tk = null;

	before('Getting the token',function(done){
		//getting the token
		tokenAPI
			.get(userCredential,function(res){
				tk = res.body;
				expect(tk.UserEmail).to.equal(userCredential.userAccount);
				done();
			});
	});
	
	it('POST /projects returns 200',function(done){
		var prj = {
			Content:'Proyecto Refactoring',
			Icon:8
		};

				
		projectsAPI
			.create(prj,tk.TokenString,function(res){
						var prjCreated = res.body;
						var lastSyncedDate = dateHandler.getDateFromUnixTimeStamp(prjCreated.LastSyncedDateTime.match('[0-9]+'));//the date in milisecond it is in first position
						var currentDate = dateHandler.getDateFromUnixTimeStamp((new Date()).getTime());

						expect(res.status).to.equal(200);
						expect(prjCreated.Id).not.to.be.null;
						expect(prjCreated.Content).to.equal(prj.Content);
						expect(prjCreated.ItemsCount).to.equal(0);
						expect(prjCreated.Icon).to.equal(8);
						expect(prjCreated.Deleted).to.be.false;
						expect(prjCreated.Children).to.deep.equal([]);
						expect(lastSyncedDate).to.equal(currentDate);
						//many other assertions
						

						//deleting the project
						projectsAPI
							.delete(prjCreated.Id,tk.TokenString,function(res){
								var prjDeleted = res.body;
								expect(res.status).to.equal(200);
								expect(prjDeleted.Id).to.equal(prjCreated.Id);
								expect(prjDeleted.Deleted).to.be.true;

								tokenAPI
									.delete(tk,function(res){	
										var tkDeleted = res.body;
										expect(tkDeleted.TokenString).to.equal(tk.TokenString);
										tk = null;
										done();
									});							
							});

					});
			
	});

	//assuming the pre and pos conditions don't need assertions
	it('PUT /projects/[id].json returns 200',function(done){
		
		//create a project
		var bProject = {
			Content:'Base Project'
		};

		projectsAPI
			.create(bProject,tk.TokenString,function(res){
							var prjCreated = res.body;

							//editing the project
							var eProject = {
								Content : 'Base Project edited',
								Icon: 1,							
							};
							projectsAPI
								.edit(prjCreated.Id,eProject,tk.TokenString,function(res){

									var editProject = res.body;
									var lastSyncedDate = dateHandler.getDateFromUnixTimeStamp(editProject.LastSyncedDateTime.match('[0-9]+'));//the date in milisecond it is in first position
									var currentDate = dateHandler.getDateFromUnixTimeStamp((new Date()).getTime());

									expect(res.status).to.equal(200);
									expect(editProject.Id).to.equal(prjCreated.Id);
									expect(editProject.Content).to.equal(eProject.Content);
									expect(editProject.ItemsCount).to.equal(0);
									expect(editProject.Icon).to.equal(eProject.Icon);
									expect(editProject.Deleted).to.be.false;
									expect(editProject.Children).to.deep.equal([]);
									expect(lastSyncedDate).to.equal(currentDate);
									//many other assertions

									//deleting the project
									projectsAPI
										.delete(editProject.Id,tk.TokenString,function(res){

											//deleting the token
											tokenAPI
												.delete(tk,function(res){
													done();
											});
									});
							});
					
				});

		
	});
});




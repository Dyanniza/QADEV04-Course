//projectsAPI
var request = require('superagent');
require('superagent-proxy')(request);

var proxy = 'http://172.20.240.5:8080';
var projectsEndPoint = 'https://todo.ly/api/projects.json';
var projectByIdEndPoint = 'https://todo.ly/api/projects/[id].json';
var tokenHeader = 'token';

var create = function(projectJSON,token,callback){
	console.log('Creating the project...' + projectJSON.Content);
	console.log('POST ' + projectsEndPoint + ' ' + JSON.stringify(projectJSON));
	request
		.post(projectsEndPoint)
		.proxy(proxy)
		.set(tokenHeader,token)
		.send(projectJSON)
	.end(function(err,res){
		if(err){
			console.log('Error when creating the project...'+projectJSON.Content);
			console.log('Error...' + JSON.stringify(err));
		}
		else{
			console.log('The project has been created...' + JSON.stringify(res.body));
		}
		callback(res);
	});
};
exports.create = create;

var del = function(projectId,token,callback){
	console.log('Deleting the project...' + projectId);
	var prjByIdEndPoint = projectByIdEndPoint.replace('[id]',projectId);
	console.log('DELETE ' + prjByIdEndPoint);

	request
		.del(prjByIdEndPoint)
		.proxy(proxy)
		.set(tokenHeader,token)
	.end(function(err,res){
		if(err){
			console.log('Error when creating the project...'+projectJSON.Content);
			console.log('Error...' + JSON.stringify(err));
		}
		else{
			console.log('The project has been deleted...' + JSON.stringify(res.body));
		}
		callback(res);
	});
};
exports.delete = del;

var edit = function(projectId,projectJSON, token,callback){
	console.log('Editing the project...' + projectId);
	var prjByIdEndPoint = projectByIdEndPoint.replace('[id]',projectId);
	console.log('PUT ' + prjByIdEndPoint);

	request
		.put(prjByIdEndPoint)
		.proxy(proxy)
		.set(tokenHeader,token)
		.send(projectJSON)
	.end(function(err, res){
		if(err){
			console.log('Error when editing the project...' + projectJSON.Content);
			console.log('Error...' + JSON.stringify(err));
		}else{
			console.log('The project has been edited...' + JSON.stringify(res.body));
		};
		callback(res);
	});
};
exports.edit = edit;
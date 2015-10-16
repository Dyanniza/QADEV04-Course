//projectsAPI
var request = require('superagent');
require('superagent-proxy')(request);

var proxy = 'http://172.20.240.5:8080';
var projectsEndPoint = 'https://todo.ly/api/projects.json';
var tokenHeader = 'token';

var createProject = function(projectJSON,token,callback){
	console.log('Creating the project...' + projectJSON.Content);
	request
		.post(projectsEndPoint)
		.proxy(proxy)
		.set(tokenHeader,token)
		.send(projectJSON)
	.end(function(err,res){
		console.log('The project has been created' + JSON.stringify(res.body));
		callback(res.body);
	});
};
exports.createProject = createProject;

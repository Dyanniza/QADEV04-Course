//tokenAPI
var request = require('superagent');
require('superagent-proxy')(request);

var proxy = 'http://172.20.240.5:8080';
var tokenEndPoint = 'https://todo.ly/api/authentication/token.json';

var getToken = function(userCredentialJSON,callback){
	console.log('Getting token for...' + userCredentialJSON.userAccount);
	request
		.get(tokenEndPoint)
		.proxy(proxy)
		.auth(userCredentialJSON.userAccount,userCredentialJSON.userPassword)
	.end(function(err,res){
		if(err) {
			console.log('Error when getting the token...' + JSON.stringify(res.body));
		}
		else{
			console.log('Token object...' + JSON.stringify(res.body));
			console.log('Token...' + res.body.TokenString);
		}
		callback(res.body);
	});
};
exports.getToken = getToken;
/*
var getToken = function(userCredentialJSON){
	return request
		.get(tokenEndPoint)
		.proxy(proxy)
		.auth(userCredentialJSON.userAccount,userCredentialJSON.userPassword);
}
exports.getToken = getToken;*/


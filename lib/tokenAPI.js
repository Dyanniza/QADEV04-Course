//tokenAPI
var request = require('superagent');
require('superagent-proxy')(request);

var proxy = 'http://172.20.240.5:8080';
var tokenEndPoint = 'https://todo.ly/api/authentication/token.json';
var tokenHeader = 'token';

var get = function(userCredentialJSON,callback){
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
		callback(res);
	});
};
exports.get = get;

var del = function(token,callback){
	console.log('Deleting the token...' + token.TokenString);
	request
		.del(tokenEndPoint)
		//proxy(proxy)
		.set(tokenHeader,token.TokenString)
	.end(function(err,res){
		if(err){
			console.log('Error when deleting the token' + JSON.stringify(res.body));
		}else{
			console.log('Token was deleted...' + JSON.stringify(res.body));
			console.log('Token...' + res.body.TokenString) ;
		}
		callback(res);

	});
};
exports.delete = del;


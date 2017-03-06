var request = require('request');
var should = require('should');
var RequestsUtile = require('../../../utile/requests.server.utile.js');
var assert = require("assert");
var supertest = require("supertest")("https://www.walmart.com.br");
var config = require('../../../../config/config.js');

var urlJson = 'http://api.zanox.com/json/2011-03-01/products?connectid=43EEF0445509C7205827&q=fogao+brastemp&programs=12011';


describe('Requests Utile Server Tests:',function(){

	it('Should return status code 200 from getJson',function(done){

		this.timeout(4000);
		
		var call = new RequestsUtile();
		var timeRequest = 0;

		call.getJson(urlJson,timeRequest,function(error,response,body){
			should(response.statusCode).equal(200);
			done();
		});
	});

});
	

var request = require('request');
var should = require('should');
var StringUtile = require('../../../utile/string.server.utile.js');
var stringUtile = new StringUtile();
var assert = require("assert");
var supertest = require("supertest")("https://www.walmart.com.br");
var config = require('../../../../config/config.js');

var urlJson = 'http://api.zanox.com/json/2011-03-01/products?connectid=43EEF0445509C7205827&q=fogao+brastemp&programs=12011';


describe('String Utile Server Tests >> ',function(){

	it('Should return name url === panela-wok-euro-home-intense-com-revestimento-ceramico-32-cm',function(done){

		this.timeout(4000);

		var string = "Panela Wok Euro Home Intense com Revestimento Cerâmico - 32 cm";
		var result = stringUtile.makeslug(string);
		result.should.equal("panela-wok-euro-home-intense-com-revestimento-ceramico-32-cm");
		done();
	});

});
	
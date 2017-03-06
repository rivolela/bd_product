var request = require('request');
var should = require('should');
var requestsUtile = require('../../../utile/requests.server.utile.js');
var zanox = require('../../../controllers/zanox.server.controller.js');
var Offer = require('../../../controllers/offer.server.controller.js');
var config = require('../../../../config/config.js');
var assert = require("assert");


var supertest = require("supertest")("https://www.walmart.com.br");

var apiZanox = "http://api.zanox.com/json/2011-03-01/products?connectid=43EEF0445509C7205827&q=fogao+brastemp&programs=12011";


// Code here will be linted with JSHint.
/* jshint ignore:start */
describe('Zanox Unit Tests:',function(done){

	//var offer = new Offer();
	var currentPage = 0;
	var currentItem = 0;

	var Context = {};

	var group = config.programs_all;
	var departament = config.dep_eletrodomesticos;
  
  
	describe('Testing connection api zanox >>',function(){
		it('Should return items == 10',function(done){
			this.timeout(6000);
			var call = new requestsUtile();
			var timeRequest = 0;
			call.getJson(apiZanox,timeRequest,function(data,response,error){
				data.items.should.be.equal(10);
				done();
			});
		});
	});


	describe('Testing context about the searched offers >>',function(){
		it('Should return totalItems > 0',function(done){
			this.timeout(10000);
			var itemsByPage = 50;
			zanox.getOffersContext(apiZanox,itemsByPage,function(totalPaginacao,totalItems,itemsByPage){
				totalItems.should.be.above(0);
				done();
			});
		});
	});


	describe('Testing pagination == 1 >>',function(){
		it('Should not exists error',function(done){
			this.timeout(8000);
			var totalPagination = 0;
			zanox.getOffersPagination(currentPage,totalPagination,apiZanox,group,departament,function(error){
				should.not.exist(error);
				done();
			});
		});
	});

});
// Code here will be ignored by JSHint.
/* jshint ignore:end */



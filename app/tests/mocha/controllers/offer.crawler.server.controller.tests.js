var config = require('../../../../config/config.js');
var request = require('request');
var should = require('should');
var requestsUtile = require('../../../utile/requests.server.utile.js');
var offerController = require('../../../controllers/offer.crawler.server.controller.js');
var assert = require("assert");
var apiZanox = "http://api.zanox.com/json/2011-03-01/products?connectid=43EEF0445509C7205827&q=fogao+brastemp&programs=12011";



describe('Offer Crawler Unit Tests:',function(done){

	var currentPage = 0;
	var currentItem = 0;

	var Context = {};
  
	describe('Testing BD >>',function(){

		before(function(){

			this.timeout(2000);

			var data1 = new Object ({
				name:'Fogao de Embutir 5 Bocas Brastemp Clean BYS5TAR Inox com Timer',
	  			ean:77777777777777,
	  			category:"Eletrodomésticos / Fogões / Embutir 5 Bocas",
	  			categoryBD: config.query_offer_crawler_zanox,
	  			merchantProductId: 1109777,
	  			url:"http://ad.zanox.com/ppc/?25371034C45550273&ULP=[[1109777/sk?utm_medium=afiliados&utm_source=zanox&utm_campaign=xml_zanox&utm_term=zanox]]&zpar9=[[43EEF0445509C7205827]]",
	  			advertiser:"walmart",
	  			price: 742.9,
	  			image_medium: "https://static.wmobjects.com.br/imgres/arquivos/ids/9884910-250-250",
  				image_large: "https://static.wmobjects.com.br/imgres/arquivos/ids/9884910-250-250",
  				departamentBD: config.dep_eletrodomesticos,
  				programGroup: config.programs_all
			});

			var data2 = new Object ({
				name:'Fogao de Embutir 5 Bocas Brastemp Clean BYS5TAR Inox com Timer',
	  			ean:88888888888888,
	  			category:"Eletrodomésticos / Fogões / Embutir 5 Bocas",
	  			categoryBD: config.query_offer_crawler_zanox,
	  			merchantProductId: 1109777,
	  			url:"http://ad.zanox.com/ppc/?25371034C45550273&ULP=[[1109777/sk?utm_medium=afiliados&utm_source=zanox&utm_campaign=xml_zanox&utm_term=zanox]]&zpar9=[[43EEF0445509C7205827]]",
	  			advertiser:"walmart",
	  			price: 742.9,
	  			image_medium: "https://static.wmobjects.com.br/imgres/arquivos/ids/9884910-250-250",
  				image_large: "https://static.wmobjects.com.br/imgres/arquivos/ids/9884910-250-250",
  				departamentBD: config.dep_eletrodomesticos,
  				programGroup: config.programs_all
			});

			var data3 = new Object ({
				name:'Fogao de Embutir 5 Bocas Brastemp Clean BYS5TAR Inox com Timer',
	  			ean:88888888888888,
	  			category:"Eletrodomésticos / Fogões / Embutir 5 Bocas",
	  			categoryBD: config.query_offer_crawler_zanox,
	  			merchantProductId: 1109777,
	  			url:"http://ad.zanox.com/ppc/?25371034C45550273&ULP=[[1109777/sk?utm_medium=afiliados&utm_source=zanox&utm_campaign=xml_zanox&utm_term=zanox]]&zpar9=[[43EEF0445509C7205827]]",
	  			advertiser:"walmart",
	  			price: 742.9,
	  			image_medium: "https://static.wmobjects.com.br/imgres/arquivos/ids/9884910-250-250",
  				image_large: "https://static.wmobjects.com.br/imgres/arquivos/ids/9884910-250-250",
  				departamentBD: config.dep_eletrodomesticos,
  				programGroup: config.programs_all
			});

			var dataToRemove = new Object ({
				name:'Fogao de Embutir 5 Bocas Brastemp Clean BYS5TAR Inox com Timer',
	  			ean:9999999999999,
	  			category:"Eletrodomésticos / Fogões / Embutir 5 Bocas",
	  			categoryBD: config.query_offer_crawler_zanox,
	  			merchantProductId: 1109777,
	  			url:"http://ad.zanox.com/ppc/?25371034C45550273&ULP=[[1109777/sk?utm_medium=afiliados&utm_source=zanox&utm_campaign=xml_zanox&utm_term=zanox]]&zpar9=[[43EEF0445509C7205827]]",
	  			advertiser:"walmart",
	  			price: 742.9,
	  			image_medium: "https://static.wmobjects.com.br/imgres/arquivos/ids/9884910-250-250",
  				image_large: "https://static.wmobjects.com.br/imgres/arquivos/ids/9884910-250-250",
  				departamentBD: config.dep_eletrodomesticos,
  				programGroup: config.programs_all
			});

			Context.dataToRemove = dataToRemove; 

			var arrayProducts = [];
			arrayProducts.push(data1);
			arrayProducts.push(data2);
			arrayProducts.push(data3);

			Context.arrayProducts = arrayProducts; 

		});


		it('Should save one offer in bd >>',function(done){
			offerController.saveOfferBD(Context.dataToRemove,function(err){
				should.not.exist(err);
				done();
			});
		});


		it('Should save array offers in bd >>',function(done){
			this.timeout(4000);
			var currentItem = 0;
			offerController.saveArray(currentItem,Context.arrayProducts,function(productsArray){
				productsArray.length.should.be.equal(3);
				done();
			});
		});


		it('Should get array walmart offers from DB >>',function(done){

			this.timeout(5000);

			query = {
				advertiser:'walmart'
			};
			
			offerController.getOffersBD(query,function(offersArray){
				console.log(offersArray);
				offersArray.length.should.be.equal(4);
				done();
			});
		});


		it('Should remove object BD and not return err >>',function(done){
			this.timeout(4000);
			var currentItem = 0;
			console.log("object",Context.dataToRemove);
			offerController.deleteOfferBD(Context.dataToRemove,function(err){
				should.not.exist(err);
				done();
			});
		});


		after(function(){
			this.timeout(4000);
			offerController.deleteCollectionOffersBD(function(){
			});

		});

	});

});




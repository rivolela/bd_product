var config = require('../../../../config/config.js');
var request = require('request');
var should = require('should');
var requestsUtile = require('../../../utile/requests.server.utile.js');
var offerController = require('../../../controllers/offer.server.controller.js');
var reviewController = require('../../../controllers/review.server.controller.js');
var assert = require("assert");
var apiZanox = "http://api.zanox.com/json/2011-03-01/products?connectid=43EEF0445509C7205827&q=fogao+brastemp&programs=12011";



describe('Offer Unit Tests:',function(done){

	var currentPage = 0;
	var currentItem = 0;

	var Context = {};

	Context.currentItem = currentItem; 

	before(function(){

		this.timeout(4000);

		var data1 = new Object ({
			name:'Fogao de Embutir 5 Bocas Brastemp Clean BYS5TAR Inox com Timer',
  			ean:77777777777777,
  			category:"Eletrodomésticos / Fogões / Embutir 5 Bocas",
  			merchantProductId: 1109777,
  			url:"http://ad.zanox.com/ppc/?25371034C45550273&ULP=[[1109777/sk?utm_medium=afiliados&utm_source=zanox&utm_campaign=xml_zanox&utm_term=zanox]]&zpar9=[[43EEF0445509C7205827]]",
  			advertiser:"walmart",
  			price: 742.9,
  			price_display: 742.9,
  			image_medium: "https://static.wmobjects.com.br/imgres/arquivos/ids/9884910-250-250",
			image_large: "https://static.wmobjects.com.br/imgres/arquivos/ids/9884910-250-250",
			departamentBD: config.programs_all,
  			programGroup: config.programs_all
		});

		var data2 = new Object ({
			name:'Fogao de Embutir 5 Bocas Brastemp Clean BYS5TAR Inox com Timer',
  			ean:88888888888888,
  			category:"Eletrodomésticos / Fogões / Embutir 5 Bocas",
  			merchantProductId: 1109777,
  			url:"http://ad.zanox.com/ppc/?25371034C45550273&ULP=[[1109777/sk?utm_medium=afiliados&utm_source=zanox&utm_campaign=xml_zanox&utm_term=zanox]]&zpar9=[[43EEF0445509C7205827]]",
  			advertiser:"walmart",
  			price: 742.9,
  			price_display: 742.9,
  			image_medium: "https://static.wmobjects.com.br/imgres/arquivos/ids/9884910-250-250",
			image_large: "https://static.wmobjects.com.br/imgres/arquivos/ids/9884910-250-250",
			departamentBD: config.programs_all,
  			programGroup: config.programs_all
		});

		var data3 = new Object ({
			name:'Fogao de Embutir 5 Bocas Brastemp Clean BYS5TAR Inox com Timer',
  			ean:18888888888889,
  			category:"Eletrodomésticos / Fogões / Embutir 5 Bocas",
  			merchantProductId: 1109777,
  			url:"http://ad.zanox.com/ppc/?25371034C45550273&ULP=[[1109777/sk?utm_medium=afiliados&utm_source=zanox&utm_campaign=xml_zanox&utm_term=zanox]]&zpar9=[[43EEF0445509C7205827]]",
  			advertiser:"walmart",
  			price: 742.9,
  			price_display: 742.9,
  			image_medium: "https://static.wmobjects.com.br/imgres/arquivos/ids/9884910-250-250",
			image_large: "https://static.wmobjects.com.br/imgres/arquivos/ids/9884910-250-250",
			departamentBD: config.programs_all,
  			programGroup: config.programs_all
		});


		var data4 = new Object ({
			name:'Fogao de Embutir 5 Bocas Brastemp Clean BYS5TAR Inox com Timer',
  			ean:18888888888889,
  			category:"Eletrodomésticos / Fogões / Embutir 5 Bocas",
  			merchantProductId: 1109777,
  			url:"http://ad.zanox.com/ppc/?25371034C45550273&ULP=[[1109777/sk?utm_medium=afiliados&utm_source=zanox&utm_campaign=xml_zanox&utm_term=zanox]]&zpar9=[[43EEF0445509C7205827]]",
  			advertiser:"walmart",
  			price: 100.9,
  			price_display: 100.9,
  			image_medium: "https://static.wmobjects.com.br/imgres/arquivos/ids/9884910-250-250",
			image_large: "https://static.wmobjects.com.br/imgres/arquivos/ids/9884910-250-250",
			departamentBD: config.programs_all,
  			programGroup: config.programs_all
		});


		var arrayProducts = [];
		arrayProducts.push(data1);
		arrayProducts.push(data2);
		arrayProducts.push(data3);
		arrayProducts.push(data4);

		Context.arrayProducts = arrayProducts; 

	});
  

	describe('Testing reviews conter in offer controller >>',function(){

		before(function(done){

			var review1 = new Object ({
				title: "Indicação 100% para Walmart ",
				description: "Comprei esse fogão com o prazo de entrega para dia 19/08/2016 foi entreguei no dia 04/08/2016 sobre a entrega perfeito deixou no 1º andar e o pessoal da entrega muito educado o fogão muito lindo superou todas minha espectativas. Parabéns Walmart ",
				author: 'thalita ',
				location: 'Curitiba',
				ean: "77777777777777",
				date: '777777777777',
  				category: "Eletrodomésticos / Fogões / Embutir 5 Bocas",
  				advertiser:"walmart",
  				url:"http://ad.zanox.com/ppc/?25371034C45550273&ULP=[[1109777/sk?utm_medium=afiliados&utm_source=zanox&utm_campaign=xml_zanox&utm_term=zanox]]&zpar9=[[43EEF0445509C7205827]]",
  				manufacturer: "brastemp",
  				rating:1,
			});

			var review2 = new Object ({
				title: "Indicação 100% para Walmart ",
				description: "Comprei esse fogão com o prazo de entrega para dia 19/08/2016 foi entreguei no dia 04/08/2016 sobre a entrega perfeito deixou no 1º andar e o pessoal da entrega muito educado o fogão muito lindo superou todas minha espectativas. Parabéns Walmart ",
				author: 'thalita ',
				location: 'Curitiba',
				ean: "77777777777777",
				date: '999999999999',
  				category: "Eletrodomésticos / Fogões / Embutir 5 Bocas",
  				advertiser:"walmart",
  				url:"http://ad.zanox.com/ppc/?25371034C45550273&ULP=[[1109777/sk?utm_medium=afiliados&utm_source=zanox&utm_campaign=xml_zanox&utm_term=zanox]]&zpar9=[[43EEF0445509C7205827]]",
  				manufacturer: "brastemp",
  				rating:2,
			});

			var review3 = new Object ({
				title: "Indicação 100% para Walmart ",
				description: "Comprei esse fogão com o prazo de entrega para dia 19/08/2016 foi entreguei no dia 04/08/2016 sobre a entrega perfeito deixou no 1º andar e o pessoal da entrega muito educado o fogão muito lindo superou todas minha espectativas. Parabéns Walmart ",
				author: 'thalita ',
				location: 'Curitiba',
				ean: "77777777777777",
				date: '8888888888888',
  				category: "Eletrodomésticos / Fogões / Embutir 5 Bocas",
  				advertiser:"walmart",
  				url:"http://ad.zanox.com/ppc/?25371034C45550273&ULP=[[1109777/sk?utm_medium=afiliados&utm_source=zanox&utm_campaign=xml_zanox&utm_term=zanox]]&zpar9=[[43EEF0445509C7205827]]",
  				manufacturer: "brastemp",
  				rating:3,
			});

			var review4 = new Object ({
				title: "Indicação 100% para Walmart ",
				description: "Comprei esse fogão com o prazo de entrega para dia 19/08/2016 foi entreguei no dia 04/08/2016 sobre a entrega perfeito deixou no 1º andar e o pessoal da entrega muito educado o fogão muito lindo superou todas minha espectativas. Parabéns Walmart ",
				author: 'thalita ',
				location: 'Curitiba',
				ean: "77777777777777",
				date: '0000000000',
  				category: "Eletrodomésticos / Fogões / Embutir 5 Bocas",
  				advertiser:"walmart",
  				url:"http://ad.zanox.com/ppc/?25371034C45550273&ULP=[[1109777/sk?utm_medium=afiliados&utm_source=zanox&utm_campaign=xml_zanox&utm_term=zanox]]&zpar9=[[43EEF0445509C7205827]]",
  				manufacturer: "brastemp",
  				rating:4,
			});

			var review5 = new Object ({
				title: "Indicação 100% para Walmart ",
				description: "Comprei esse fogão com o prazo de entrega para dia 19/08/2016 foi entreguei no dia 04/08/2016 sobre a entrega perfeito deixou no 1º andar e o pessoal da entrega muito educado o fogão muito lindo superou todas minha espectativas. Parabéns Walmart ",
				author: 'thalita ',
				location: 'Curitiba',
				ean: "77777777777777",
				date: '11111111',
  				category: "Eletrodomésticos / Fogões / Embutir 5 Bocas",
  				advertiser:"walmart",
  				url:"http://ad.zanox.com/ppc/?25371034C45550273&ULP=[[1109777/sk?utm_medium=afiliados&utm_source=zanox&utm_campaign=xml_zanox&utm_term=zanox]]&zpar9=[[43EEF0445509C7205827]]",
  				manufacturer: "brastemp",
  				rating:5,
			});

			var arrayReviews = [];
			arrayReviews.push(review1);
			arrayReviews.push(review2);
			arrayReviews.push(review3);
			arrayReviews.push(review4);
			arrayReviews.push(review5);

			Context.arrayReviews = arrayReviews; 

			reviewController.saveArrayReviews(Context.currentItem,Context.arrayReviews,function(arrayReviews){
				done();
			});

		});


		it('Should add total of reviews = 5, total of countSad = 3 and total of countHappy = 5 from ean(77777777777777) >>',function(done){
			
			this.timeout(1000);

			offerController.setReviewsCounterOffer(Context.arrayProducts[0],function(offer){
				console.log("offer with reviews >> ",offer);
				offer.totalReviews.should.be.equal(5);
				offer.countSad.should.be.equal(3);
				offer.countHappy.should.be.equal(2);
				done();
			});
		});


		it('Should save offer in bd with reviews >>',function(done){
			offerController.saveOfferWithReviews(Context.arrayProducts[0],function(error){
				should.not.exist(error);
				done();
			});
		});
	});
	

	describe('Testing saveArrayOffers >>',function(){
 		this.timeout(10000);
		it('Should return offersArray === 3',function(done){
			offerController.saveArrayOffers(0,Context.arrayProducts,function(offersArray){
				offersArray.length.should.be.equal(4);
				done();
			});
		});
	});


	describe('Testing saveMinorPriceInArray >>',function(){

		before(function(done){

			this.timeout(5000);

			query = {
				advertiser:'walmart'
			};

			var arrayOffers = [];
			Context.arrayOffers = arrayOffers; 

			offerController.getOffersBD({},function(offersArray){
				Context.arrayOffers = offersArray; 
				done();
			});
		});

 		
		it('Should save minor price without error >>',function(done){
			this.timeout(20000);
			offerController.saveMinorPriceOffers(0,Context.arrayOffers,function(error){
				should.not.exist(error);
				done();
			});
		});


		it('should get offers array with minor price set >>',function(done){
			this.timeout(10000);
			offerController.getOffersBD({},function(offersArray){
				console.log("offersArray >>",offersArray);
				done();
			});
		});
	});


	after(function(){
		this.timeout(4000);
		offerController.deleteCollectionOffersBD(config.programs_all,config.programs_all,function(){
		});

		reviewController.deleteAllReviews(function(){
		});
	});

});




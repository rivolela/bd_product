var config = require('../../../../config/config.js');
var request = require('request');
var should = require('should');
var requestsUtile = require('../../../utile/requests.server.utile.js');
var offerController = require('../../../controllers/offer.server.controller.js');
var reviewController = require('../../../controllers/review.server.controller.js');
var assert = require("assert");
var apiZanox = "http://api.zanox.com/json/2011-03-01/products?connectid=43EEF0445509C7205827&q=fogao+brastemp&programs=12011";



describe('Reviews Controller Unit Tests:',function(done){

	var currentPage = 0;
	var currentItem = 0;

	var Context = {};
  
	describe('Testing Reviews Counter >>',function(done){

		before(function(done){

			this.timeout(2000);

			var offer = new Object ({
				name:'Fogao de Embutir 5 Bocas Brastemp Clean BYS5TAR Inox com Timer',
	  			ean: "77777777777777",
	  			category:"Eletrodomésticos / Fogões / Embutir 5 Bocas",
	  			merchantProductId: 1109777,
	  			url:"http://ad.zanox.com/ppc/?25371034C45550273&ULP=[[1109777/sk?utm_medium=afiliados&utm_source=zanox&utm_campaign=xml_zanox&utm_term=zanox]]&zpar9=[[43EEF0445509C7205827]]",
	  			advertiser:"walmart",
	  			price: 742.9,
	  			image_medium: "https://static.wmobjects.com.br/imgres/arquivos/ids/9884910-250-250",
  				image_large: "https://static.wmobjects.com.br/imgres/arquivos/ids/9884910-250-250",
  				departamentBD: config.dep_eletro,
  				programGroup: config.programs_label_01
			});

			var arrayOffers = [];
			var currentItem = 0;
			Context.currentItem = currentItem; 

			arrayOffers.push(offer);

			Context.arrayOffers = arrayOffers; 

			offerController.saveArray(Context.currentItem,Context.arrayOffers,function(productsArray){
				
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
		});


		it('Should add total of reviews = 5, total of countSad = 3 and total of countHappy = 5 by Offer >>',function(done){
			
			reviewController.getReviewsCounterByEan(77777777777777,function(result){
				console.log("result",result);
				result[0].totalReviews.should.be.equal(5);
				result[0].countSad.should.be.equal(3);
				result[0].countHappy.should.be.equal(2);
				done();
			});
		});


		it('Should return result.length = 0 by ean = 0',function(done){
			
			reviewController.getReviewsCounterByEan(0,function(result){
				console.log("result",result);
				result.length.should.be.equal(0);
				done();
			});
		});


		it('Should return result.length = 0 by ean = null',function(done){
			
			reviewController.getReviewsCounterByEan(null,function(result){
				console.log("result",result);
				result.length.should.be.equal(0);
				done();
			});
		});


		it('Should return result.length = 0 by ean = undefined',function(done){
			
			reviewController.getReviewsCounterByEan(undefined,function(result){
				console.log("result",result);
				result.length.should.be.equal(0);
				done();
			});
		});


		after(function(){
			this.timeout(4000);
			offerController.deleteCollectionOffersBD(config.programs_label_01,config.dep_eletro,function(){
			});

			reviewController.deleteAllReviews(function(){
			});
		});

	});

});




var config = require('../../../../config/config.js');
var request = require('request');
var should = require('should');
var requestsUtile = require('../../../utile/requests.server.utile.js');
var productController = require('../../../controllers/product.server.controller.js');
var reviewController = require('../../../controllers/review.server.controller.js');
var assert = require("assert");
var apiZanox = "http://api.zanox.com/json/2011-03-01/products?connectid=43EEF0445509C7205827&q=fogao+brastemp&programs=12011";



describe('Product Controller Unit Tests:',function(done){

	var currentPage = 0;
	var currentItem = 0;

	var Context = {};

	Context.currentItem = currentItem; 

	
  	describe('Testing save array products >>',function(){

  		before(function(){

  			this.timeout(2000);

			var product1 = new Object ({
				name:'Fogao de Embutir 5 Bocas Brastemp Clean BYS5TAR Inox com Timer',
	  			ean:77777777777777,
	  			advertiser:"walmart",
	  			image: "https://static.wmobjects.com.br/imgres/arquivos/ids/9884910-250-250",
				departamentBD: "Eletrodomésticos",
				countSad: 9,
	  			countHappy: 71,
	  			totalReviews: 80,
			});

			var product2 = new Object ({
				name:'Fogao de Embutir 5 Bocas Brastemp Clean BYS5TAR Inox com Timer',
	  			ean:77777777777777,
	  			advertiser:"walmart",
	  			image: "https://static.wmobjects.com.br/imgres/arquivos/ids/9884910-250-250",
				departamentBD: "Eletrodomésticos",
				countSad: 9,
	  			countHappy: 71,
	  			totalReviews: 80,
			});

			var arrayProducts = [];
			arrayProducts.push(product1);
			arrayProducts.push(product2);

			Context.arrayProducts = arrayProducts; 
		});

 		
		it('Should return productsArray === 2',function(done){
			this.timeout(5000);
			productController.saveArray(0,Context.arrayProducts,function(productsArray){
				productsArray.length.should.be.equal(2);
				done();
			});
		});
	});


	describe('Testing reviews conter in product controller >>',function(){

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

			productController.setReviewsCounterProduct(Context.arrayProducts[0],function(product){
				console.log("product with reviews >> ",product);
				product.totalReviews.should.be.equal(5);
				product.countSad.should.be.equal(3);
				product.countHappy.should.be.equal(2);
				done();
			});
		});


		it('Should save product in bd with reviews >>',function(done){
			productController.saveProductWithReviews(Context.arrayProducts[0],function(error){
				should.not.exist(error);
				done();
			});
		});
	});
	

	describe('Testing get products >>',function(){

		it('should get products array with minor price set >>',function(done){
			this.timeout(10000);
			productController.getProductsBD({},function(productsArray){
				console.log("productsArray >>",productsArray);
				done();
			});
		});
	});


	after(function(){
		this.timeout(4000);
		productController.deleteCollectionProductsBD('arg',function(){
		});

		reviewController.deleteAllReviews(function(){
		});
	});

});




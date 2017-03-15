var app = require('../../../../server.js'),
	async = require('async'),
 	mongoose = require('mongoose'),
 	ProductSchema = require('../../../models/product.server.model'),
 	Product = mongoose.model( 'Product', ProductSchema),
 	should = require('should');



describe('Product Model Unit Tests:',function(){

	before(function(done){
		product_01 = new Product({
			name: 'Smartphone Motorola Moto X 2ª Geracao Xt1097 Preto Android 4.4.4, Camera 13mp, Tela 5.2\", Quadcore 2.5 Ghz, 32gb Memoria, 3g e 4g',
			ean: 7892597336616,
			manufacturer: 'Motorola',
			image: 'https://static.wmobjects.com.br/imgres/arquivos/ids/10538240-250-250',
			departamentBD: "smartphones",
			countSad: 9,
  			countHappy: 71,
  			totalReviews: 80,
  			nameURL:'Smartphone Motorola Moto X 2ª Geracao Xt1097 Preto Android 4.4.4, Camera 13mp, Tela 5.2\", Quadcore 2.5 Ghz, 32gb Memoria, 3g e 4g',
		});

		product_02 = new Product({
			name: 'Smartphone Motorola Moto X 2ª Geracao Xt1097 Preto Android 4.4.4, Camera 13mp, Tela 5.2\", Quadcore 2.5 Ghz, 32gb Memoria, 3g e 4g',
			ean: 88888888888888,
			manufacturer: 'Motorola',
			image: 'https://static.wmobjects.com.br/imgres/arquivos/ids/10538240-250-250',
			departamentBD: "smartphones",
			countSad: 9,
  			countHappy: 71,
  			totalReviews: 80,
  			nameURL:'Smartphone Motorola Moto X 2ª Geracao Xt1097 Preto Android 4.4.4, Camera 13mp, Tela 5.2\", Quadcore 2.5 Ghz, 32gb Memoria, 3g e 4g',
		});

		async.series([
    		function(callback) {
    			product_01.save(function(err){
    				callback(null, 'product one saved');
				});
    		},
    		function(callback) {
    			product_02.save(function(err){
    				callback(null, 'product two saved');
				});
    		}
		],
		// optional callback
		function(err, results) {
			console.log("results >>",results);
			done();
		    // results is now equal to ['one', 'two']
		});
		
	});


	describe('Testing the get products price method',function(){
		it('Should return the products`s list ==  2',function(done){
		    Product.find({},function(err,products){
		    	products.length.should.be.equal(2);
		    	done();
			});
		});
	});


	describe('Testing save product method',function(){
		
		
		it('Should not save the product with EAN == 7892597336616',function(done){
			product_03 = new Product({
				name: 'Smartphone Motorola Moto X 2ª Geracao Xt1097 Preto Android 4.4.4, Camera 13mp, Tela 5.2\", Quadcore 2.5 Ghz, 32gb Memoria, 3g e 4g',
				ean: 7892597336616,
				manufacturer: 'Motorola',
				image: 'https://static.wmobjects.com.br/imgres/arquivos/ids/10538240-250-250',
				departamentBD: "smartphones",
				countSad: 9,
  				countHappy: 71,
  				totalReviews: 80,
  				nameURL:'Smartphone Motorola Moto X 2ª Geracao Xt1097 Preto Android 4.4.4, Camera 13mp, Tela 5.2\", Quadcore 2.5 Ghz, 32gb Memoria, 3g e 4g',
			});

		    product_03.save(function(error){
		    	should.exist(error);
		    	done();
			});
		});
	});


	after(function(done){
		Product.remove({},function(){
			done();
		});
	});
});


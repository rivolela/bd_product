var mongoose = require('mongoose'),
 	ProductSchema = require('../models/product.server.model'),
 	Product = mongoose.model( 'Product', ProductSchema),
 	reviewController = require('./review.server.controller.js'),
 	async = require('async'),
 	CurrencyUtile = require('../utile/currency.server.utile.js'),
 	flatten = require('flat'),
	requestsUtile = require('../utile/requests.server.utile.js');


var call = new requestsUtile();


var setReviewsCounterProduct = function(product,next){

	try{
		reviewController.getReviewsCounterByEan(product.ean,function(result){
			if(result.length > 0){
				product.countSad = result[0].countSad;
				product.countHappy = result[0].countHappy;
				product.totalReviews = result[0].totalReviews;
			}else{
				product.countSad = 0;
				product.countHappy = 0;
				product.totalReviews = 0;
			}

			return next(product);
		});
		
	}catch(e){
		console.log('An error has occurred: setReviewsCounterProduct >> '+ e.message);
	}
};

/**
 * @description save array of product ( pre-condition: product needs to have totalReviews > 0) )
 * @param  {currentItem}
 * @param  {productsArray}
 * @param  {next}
 * @return {productsArray}
 */
var saveArray = function(currentItem,productsArray,next){
	
	try{
		if(currentItem < productsArray.length){

			async.waterfall([
			    // step_01 >> get total of reviews of the product
			    function(callback){
			    	setReviewsCounterProduct(productsArray[currentItem],function(productWithReviews){
						callback(null,productWithReviews);
			    	});
			    },
			    // step_02 >> save products
			    function(productWithReviews,callback){
			    	if(productWithReviews.totalReviews > 0){
			    		saveAndUpdateProduct(productWithReviews,function(product){
							callback(null,'arg');
						});
			    	}else{
			    		callback(null,'arg');
			    	}
			    }
			], function (err, result) {
				if(err){
					console.log("err >>",err);
					return next(err);
				}else{
					saveArray(currentItem+1,productsArray,next);
				}
			});

		}else{
			return next(productsArray);
		}
	}catch(e){
		console.log('An error has occurred: ' + e.message);
	}
};


var saveArrayProducts = function(currentItem,productsArray,next){

	try{
		if(currentItem < productsArray.length){

			var product = productsArray[currentItem];

			saveProductBD(product,function(){
				saveArrayProducts(currentItem+1,productsArray,next);
			});
	
		}else{
			return next(productsArray);
		}
	}catch(e){
		console.log('An error has occurred: ' + e.message);
	}
};


var saveProductWithReviews = function(product,next){

	try{
		setReviewsCounterProduct(product,function(productWithReviews){
			if(productWithReviews.totalReviews > 0){
				saveProductBD(productWithReviews,function(){
					return next();
				});
			}else{
				return next();
			}				
		});

	}catch(e){
		console.log('An error has occurred: ' + e.message);
	}
};


var saveProductBD = function(data,next){

	try{
		var product = new Product(data);
  	
	  	product.save(function(err){
			if(err){
				console.log("product not saved >>",err);
				return next(err);
			}else{
				console.log("product saved");
				return next();
			}
		});

	}catch(e){
		console.log('An error has occurred: ' + e.message);
	}
};


var saveAndUpdateProduct = function(data,next){

	try{
		var product = new Product ({
			name:data.name,
  			ean:data.ean,
  			departamentBD: data.departamentBD,
			countSad: data.countSad,
  			countHappy: data.countHappy,
  			totalReviews: data.totalReviews,
  			manufacturer: data.manufacturer,
  			nameURL:data.name,
		});

		if(data.image_medium === undefined){
			product.image = data.image_large;
		}else{
			product.image = data.image_medium;
		}

		console.log("product.image >>",product.image);
  	
	  	product.save(function(err){

			if(err){

				console.log("product not saved >>",err);

				var updateFields = {
					// image: product.image,
					// manufacturer: product.manufacturer,
					countSad: product.countSad,
					countHappy: product.countHappy,
					totalReviews: product.totalReviews,
					// departamentBD: product.departamentBD,
					updated:new Date()
				};

				updateProduct(product,updateFields,function(productUpdated){
					console.log("callback updateProduct");
					return next(productUpdated);
				});
	
			}else{
				console.log("product saved");
				return next();
			}
		});

	}catch(e){
		console.log('An error has occurred: ' + e.message);
	}
};


var deleteProductBD = function(data,next){

	product = new Product(data);

  	Product.remove({ean:product.ean},function(err){
		if(err){
			console.log(err);
			return next(err);
		}else{
			console.log("product removed:",product);
			return next();
		}
	});
};


var deleteCollectionProductsBD = function(arg,next){

  	Product.remove({},function(err){
		if(err){
			console.log(err);
			return next(err);
		}else{
			console.log("all products were removed:");
			return next();
		}
	});
};


var getProductsBD = function(query,next){
	console.log(query);
	Product.find(query,function(err,products){
		if(err){
			console.log(err);
			return next(err);
		}else{
			console.log(products);
			return next(products);
		}
	});
};



/**
 * [updateProduct description]
 * @param  {Product}   product      [description]
 * @param  {String}  updateFields 	[description]
 * @param  {Function} next         	[description]
 * @return {Product}                [Product updated]
 */
var updateProduct = function(product,updateFields,next){

	query = {ean:product.ean};

	var options = {new:true,upsert:false,setDefaultsOnInsert:true};

    Product.findOneAndUpdate(query,{"$set":updateFields}, options, function(err, productUpdated){
		if(err){
			console.log("product not updated >>",err);
			return next(err);
		}else{
			console.log("product updated >>");
			return next(productUpdated);
		}
	});
};




exports.saveArray = saveArray;
exports.saveProductBD = saveProductBD;
exports.getProductsBD = getProductsBD;
exports.deleteProductBD = deleteProductBD;
exports.deleteCollectionProductsBD = deleteCollectionProductsBD;
exports.setReviewsCounterProduct = setReviewsCounterProduct;
exports.saveProductWithReviews = saveProductWithReviews;
exports.saveArrayProducts = saveArrayProducts;
exports.updateProduct = updateProduct;
exports.setReviewsCounterProduct = setReviewsCounterProduct;
exports.saveAndUpdateProduct = saveAndUpdateProduct;




var mongoose = require('mongoose');
var OfferCrawlerSchema = require('../models/offer.crawler.server.model');
var Offer = mongoose.model( 'Offer_Crawler', OfferCrawlerSchema);
var reviewController = require('./review.server.controller.js');

var flatten = require('flat'),
	requestsUtile = require('../utile/requests.server.utile.js'),
 	host = 'api.zanox.com/json/2011-03-01/',
 	uri = 'products',
 	connectid = 'connectid=43EEF0445509C7205827',
 	programs = 'programs=12011',
 	query = 'q=geladeira%20brastemp',
 	category = 'merchantcategory=Eletrodomésticos / Fogões / Fogão 4 bocas',	
 	items = 'items=50',
 	url = 'https://' + host + uri + '?' + connectid + '&' + programs + '&' + query + '&' + category + '&' + items;


var call = new requestsUtile();


/**
 * @description save array of offer)
 * @param  {currentItem}
 * @param  {productsArray}
 * @param  {next}
 * @return {offersArray}
 */
var saveArray = function(currentItem,offersArray,next){

	try{
		if(currentItem < offersArray.length){

			var offer = offersArray[currentItem];

			saveOfferBD(offer,function(){
				saveArray(currentItem+1,offersArray,next);
			});
							
		}else{
			return next(offersArray);
		}
	}catch(e){
		console.log('An error has occurred: ' + e.message);
	}
};


var saveOfferBD = function(data,next){

	try{
		var offer = new Offer(data);
  	
	  	offer.save(function(err){
			if(err){
				console.log("offer not saved >>",err);
				return next(err);
			}else{
				console.log("offer saved");
				return next();
			}
		});

	}catch(e){
		console.log('An error has occurred: ' + e.message);
	}
};


var deleteOfferBD = function(data,next){

	offer = new Offer(data);

  	Offer.remove({ean:offer.ean},function(err){
		if(err){
			console.log(err);
			return next(err);
		}else{
			console.log("offer removed:",offer);
			return next();
		}
	});
};


var deleteCollectionOffersBD = function(next){

  	Offer.remove({},function(err){
		if(err){
			console.log(err);
			return next(err);
		}else{
			console.log("all offers were removed:");
			return next();
		}
	});
};


var getOffersBD = function(query,next){
	console.log(query);
	Offer.find(query,function(err,offers){
		if(err){
			console.log(err);
			return next(err);
		}else{
			console.log(offers);
			return next(offers);
		}
	});
};


exports.saveArray = saveArray;
exports.saveOfferBD = saveOfferBD;
exports.getOffersBD = getOffersBD;
exports.deleteOfferBD = deleteOfferBD;
exports.deleteCollectionOffersBD = deleteCollectionOffersBD;
exports.Offer = Offer;




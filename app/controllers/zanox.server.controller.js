var flatten = require('flat'),
	config = require('../../config/config.js'),
 	requestsUtile = require('../utile/requests.server.utile.js'),
 	Offer = require('../controllers/offer.server.controller.js'),
 	OfferCrawler = require('../controllers/offer.crawler.server.controller.js'),
 	config = require('../../config/config.js'),
 	utf8_decode = require('locutus/php/xml/utf8_decode'),
 	offerController = require('../controllers/offer.server.controller.js'),
 	call = new requestsUtile();


var getOffersContext = function(url,itemsByPage,next){

	try{

		var call = new requestsUtile();
		var timeRequest = 0;

		call.getJson(url,timeRequest,function(data){
			var totalItems = Number(data.total);
			var totalItemsByPage = Number(data.items);

			var totalPaginacao = Math.trunc(totalItems / totalItemsByPage);
			
			console.log("resume to search:");
			console.log("total paginação:", totalPaginacao);
			console.log("total items:", totalItems);
			console.log("items by Page:", totalItemsByPage);
			console.log("url:", url);			
			console.log('\n');

			return next(totalPaginacao,totalItems,totalItemsByPage);
		});
	}catch(error){
		console.log(error);
	}
	
};


var getOffersCrawlerPagination = function(currentPage,totalPaginacao,url,next){

	try{
		console.log("currentPage >>",currentPage);

		if(currentPage <= totalPaginacao){

			// var pagination = new Object();// jshint ignore:line
			var url_offers = url + "&page=" + currentPage;
			console.log('\n');

			call.getJson(url_offers,config.timeRequest,function(json,response,error) {
				console.log("callback getOffersCrawlerPagination >> ");
				var currentItem = 0;
				saveOffersCrawler(currentItem,json,function(){
					console.log("callback saveOffersCrawler >> ");
					getOffersCrawlerPagination(currentPage+1,totalPaginacao,url,next);
				});
			});
		}else{
			return next();
		}
	}catch(error){
		console.log(error);
		throw error;
	}
};


var getOffersPagination = function(currentPage,totalPaginacao,url,group,departament,next){
	
	try{
		console.log("currentPage >>",currentPage);

		if(currentPage <= totalPaginacao){

			// var pagination = new Object();// jshint ignore:line
			var url_offers = url + "&page=" + currentPage;
			console.log('\n');

			call.getJson(url_offers,config.timeRequest,function(json,response,error) {
				console.log("callback getOffersPagination >> ");
				var currentItem = 0;
				saveOffers(currentItem,json,group,departament,function(){
					console.log("callback saveOffers >> ");
					getOffersPagination(currentPage+1,totalPaginacao,url,group,departament,next);
				});
			});
		}else{
			return next();
		}
	}catch(error){
		console.log(error);
		throw error;
	}
};



var saveOffers = function(currentItem,data,group,departament,next){
	
	try{
		if(currentItem < data.items){

			console.log(data.productItems.productItem[currentItem]);

			var offer = new Object({
				name : data.productItems.productItem[currentItem].name,
				ean : data.productItems.productItem[currentItem].ean,
				category :  data.productItems.productItem[currentItem].merchantCategory,
				merchantProductId : data.productItems.productItem[currentItem].merchantProductId,
				url : data.productItems.productItem[currentItem].trackingLinks.trackingLink[0].ppc,
				manufacturer: data.productItems.productItem[currentItem].manufacturer,
				image_medium: data.productItems.productItem[currentItem].image.medium,
				image_large: data.productItems.productItem[currentItem].image.large,
				price: data.productItems.productItem[currentItem].price,
				price_display: data.productItems.productItem[currentItem].price,
				advertiser: data.productItems.productItem[currentItem].program.$,
				departamentBD: departament,
				programGroup: group
			});

			// TO DO - the zanox api result, although of header response is configured to UTF-8
			// is bringing caracteres with different encode.
			// It is the case of Lojas Colombo BR, that is bringing names like this :
			// Cervejeira Venax, 1 Porta, 100 Litros, IluminaÃ§Ã£o LED, Preta - EXPVQBL100"
			if(offer.advertiser=="Lojas Colombo BR"){
				offer.ean = utf8_decode(offer.ean);
				offer.name = utf8_decode(offer.name);
				offer.category = utf8_decode(offer.category);
				offer.advertiser = utf8_decode(offer.advertiser);
			}

			offerController.saveOfferWithReviews(offer,function(){
				saveOffers(currentItem+1,data,group,departament,next);
			});

		}else{
		  return next();
		}
	}catch(error){
		console.log(error);
		throw error;
	}
};


var saveOffersCrawler = function(currentItem,data,next){
	
	try{
		if(currentItem < data.items){

			console.log(data.productItems.productItem[currentItem]);

			var offer = new Object({
				name : data.productItems.productItem[currentItem].name,
				ean : data.productItems.productItem[currentItem].ean,
				category :  data.productItems.productItem[currentItem].merchantCategory,
				merchantProductId : data.productItems.productItem[currentItem].merchantProductId,
				url : data.productItems.productItem[currentItem].trackingLinks.trackingLink[0].ppc,
				manufacturer: data.productItems.productItem[currentItem].manufacturer,
				image_medium: data.productItems.productItem[currentItem].image.medium,
				image_large: data.productItems.productItem[currentItem].image.large,
				price: data.productItems.productItem[currentItem].price,
				price_display: data.productItems.productItem[currentItem].price,
				advertiser: data.productItems.productItem[currentItem].program.$,
			});

			// TO DO - the zanox api result, although of header response is configured to UTF-8
			// is bringing caracteres with different encode.
			// It is the case of Lojas Colombo BR, that is bringing names like this :
			// Cervejeira Venax, 1 Porta, 100 Litros, IluminaÃ§Ã£o LED, Preta - EXPVQBL100"
			if(offer.advertiser=="Lojas Colombo BR"){
				offer.ean = utf8_decode(offer.ean);
				offer.name = utf8_decode(offer.name);
				offer.category = utf8_decode(offer.category);
				offer.advertiser = utf8_decode(offer.advertiser);
			}

			OfferCrawler.saveOfferBD(offer,function(){
				saveOffersCrawler(currentItem+1,data,next);
			});

		}else{
		  return next();
		}
	}catch(error){
		console.log(error);
		throw error;
	}
};

exports.getOffersContext = getOffersContext;
exports.getOffersPagination = getOffersPagination;
exports.getOffersCrawlerPagination = getOffersCrawlerPagination;
exports.saveOffersCrawler = saveOffersCrawler;
exports.saveOffers= saveOffers;








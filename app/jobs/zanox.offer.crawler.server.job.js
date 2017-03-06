var config = require('../../config/config.js'),
 	offerCrawlerController = require('../controllers/offer.crawler.server.controller.js'),
 	zanoxController = require('../controllers/zanox.server.controller.js'),
 	request = require('request'),
 	flatten = require('flat'),
 	flatten2 = require('flat'),
 	urlTeste = "http://api.zanox.com/json/2011-03-01/products?connectid=43EEF0445509C7205827&q=ventilador&programs=12011,13212,16588&items=50",
 	cheerio = require('cheerio'),
 	async = require('async'),
 	cron = require('node-cron'),
	DateUtile = require('../utile/date.server.utile.js');


var job_crawler = cron.schedule(config.schedule_crawler,  function(err){
  console.log('starting job_crawler ...');
  var time_start = new Date();
  var dateUtile = new DateUtile();	
  var url = null;
  start(url,
  		config.query_crawler,
  		config.programs,
  		config.programs_all,
  		config.dep_eletroportateis,
  		config.dictionary_crawler,
  		function(){
  			dateUtile.getJobTime(time_start,function(){
  				console.log(" end job_crawler !");
  			});
   		});
},false);


 // if(process.env.NODE_ENV == 'test_job'){
	// start(urlTeste,function(){
	// 	console.log("end test zanox job");
	// });
 // }


function start(urlSearchOffers,query,programs,group,departament,dictionary,next){

	var currentPage = 0;
	var currentItem = 0;

	offerCrawlerController.deleteCollectionOffersBD(function(){

		console.log("callback deleteCollectionOffersBD >>");

		setUrlOffers(urlSearchOffers,query,programs,dictionary,function(url){

			console.log("callback setUrlOffers >> ",url);
			console.log('\n');

			zanoxController.getOffersContext(url,50,function(totalPaginacao,totalItems,itemsByPage){
				
				console.log("callback getOffersContext >> ");
				
				zanoxController.getOffersCrawlerPagination(currentPage,totalPaginacao,url,function(){

					console.log("callback getOffersPagination >>");
					
	    			return next();
				});
			});
		});

	});

}



var setUrlOffers = function(urlSearchOffers,query,programs,dictionary,next){

	try{
		//if urlSearchOffers is null or empty, set url default
		if(Boolean(urlSearchOffers) === false){
			var host = 'api.zanox.com/json/2011-03-01/';
			var uri = 'products';
			var connectid = 'connectid=' + config.connectid;
			var set_programs = 'programs=' + programs;
			var set_query = 'q=' + query;
			var searchtype = 'searchtype=' + config.searchtype;
			var merchantcategory = dictionary;
			var items = 'items=50';
			var url = 'https://' + host + uri + '?' + connectid + '&' + set_programs + '&' + set_query + '&' + merchantcategory + '&' + items ;
			return next(url);
		}else{
			return next(urlSearchOffers);
		}
	}catch(error){
		console.log('An error has occurred >> zanox.server.job >>  setUrlOffers : '+ error.message);
    	throw error ;
	}
};


var startCrawlerJob = function(next){
	return (job_crawler.start());
};

 
exports.setUrlOffers = setUrlOffers;
exports.startCrawlerJob = startCrawlerJob;




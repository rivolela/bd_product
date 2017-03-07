var config = require('../../config/config.js'),
 	productController = require('../controllers/product.server.controller.js'),
 	offerController = require('../controllers/offer.server.controller.js'),
	request = require('request'),
	flatten = require('flat'),
	flatten2 = require('flat'),
	urlTeste = "http://api.zanox.com/json/2011-03-01/products?connectid=43EEF0445509C7205827&q=ventilador&programs=12011,13212,16588&items=50",
	cheerio = require('cheerio'),
	async = require('async'),
	cron = require('node-cron'),
	DateUtile = require('../utile/date.server.utile.js'),
	async = require('async');


var job_products = cron.schedule(config.schedule_product, function(err){
  console.log('starting job_products ...');
  var time_start = new Date();	
  var dateUtile = new DateUtile();
  start('param',function(){
	dateUtile.getJobTime(time_start,function(){
		console.log(" job_products finished !");
	});
  });
},false);




function start(arg,next){

	var currentPage = 0;
	var currentItem = 0;

	async.waterfall([
	    // step_05 >> get products
	    function(callback){
	    	offerController.getOffersBD({},function(productsArray){
				console.log("productsArray >>",productsArray);
				callback(null,productsArray);
			});
	    },
	    // step_06 >> save minor price in products
	    function(productsArray,callback){
	    	var currentItem = 0;
			productController.saveArray(currentItem,productsArray,function(){
				console.log("callback saveArray >>");
				callback(null,'arg');
			});
	    }
	], function (err, result) {
		if(err){
			console.log("err >>",err);
			return next(err);
		}else{
			return next();
		}
	});
}


var startProductJob = function(next){
	return (job_products.start());
};


exports.startProductJob = startProductJob;



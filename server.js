process.env.NODE_ENV = process.env.NODE_ENV || 'production';

var mongoose = require('./config/mongoose'),
 	express = require('./config/express'),
 	cron = require('node-cron'),
 	async = require('async'),
 	// jobs offer bd
 	job_eletrodomesticos = require('./app/jobs/zanox.offer.server.job.js'),
 	job_eletroportateis = require('./app/jobs/zanox.offer.server.job.js'),
 	job_smartphones = require('./app/jobs/zanox.offer.server.job.js'),
 	// jobs offer crawler
	job_crawler = require('./app/jobs/zanox.offer.crawler.server.job.js');

var db = mongoose();
var app = express();


//app.listen(3000);
var server_port;

if(process.env.NODE_ENV == 'production'){
	server_port = process.env.PORT || 80;
}else{
	server_port = 3000;
}

app.listen(server_port,function() {
    console.log('Server runnning on port %d', server_port);
});


// jobs offer bd
job_eletrodomesticos.startEletrodomesticos();
job_eletroportateis.startEletroportateis();
job_smartphones.startSmartphones();

// jobs offer crawler
job_crawler.startCrawlerJob();


module.exports = app;


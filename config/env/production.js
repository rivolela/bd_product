var dic_eletrodomesticos = require('../dictionaries/eletrodomesticos.js');
var dic_smartphones = require('../dictionaries/smartphones.js');

module.exports = {
	
	// Production configuration options
	db:'mongodb://bdeciding:rovel1954@ds035776.mlab.com:35776/heroku_5lt8spw4',
	sessionSecret:'productSessionSecret',
	connectid:'A3697E2455EA755B758F',
	timeRequest:0,
	searchtype:'contextual',

	// Crawler Options 
	// programs ids
	// 12011 : Walmart BR
	// 13212 : Ricardo Eletro BR
	// 16588 : Lojas Colombo BR
	// 12781 : Pontofrio BR
	// 12785 : Casas Bahia BR
	// 12784 : Extra BR
	// 13604 : Brastemp BR
	// 18878 : Girafa BR
	// 13602 : Consul BR
	// 13314 : Fastshop BR

	// all programs
	programs:'12011,13212,16588,12781,12785,12784,13604,18878,13602,13314',
	programs_all:'group_all',
	
	// offer crawler job
	
	//queries
	query_eletrodomesticos:'geladeira' + ',' +
					'fogão' + ',' +
					'microondas' + ',' +
					'ar condicionado' + ',' +
					'lavadora' + ',' +
					'secadora',

	query_eletroportateis:'ventilador' + ',' +
					'aspirador pó' + ',' +
					'fritadeiras óleo' + ',' +
					'cafeteira' + ',' +
					'máquina costura' + ',' +
					'purificador' + ',' +
					'batedeira' + ',' +
					'liquidificador' + ',' +
					'mixer' + ',' +
					'ferro',

	query_smartphones:'iphone' + ',' +
					'motorola'  + ',' +
					'samsung galaxy',

	//departaments
	dep_eletrodomesticos:'eletrodomésticos',
	dep_eletroportateis:'eletroportáteis',
	dep_smartphones:'smartphones',

	// schedule offers jobs
	schedule_eletrodomesticos:'0 1 * * *',
	schedule_eletroportateis:'15 17 * * *',
	schedule_smartphones:'0 5 * * *',

	dictionary_offers:'',
	dictionary_smartphones:dic_smartphones.iphone  + '&' + 
							dic_smartphones.motorola + '&' + 
							dic_smartphones.samsung,

	// end offer crawler job


	// crawler job

	query_crawler:'samsung galaxy',
	dictionary_crawler:dic_smartphones.motorola,
	schedule_crawler:'0 16 * * *',

	// end crawler job

};


// var task = cron.schedule('* * * * *', function() {
//   console.log('immediately started');
// }, true);

// task.start()

 // # ┌────────────── second (optional)
 // # │ ┌──────────── minute
 // # │ │ ┌────────── hour
 // # │ │ │ ┌──────── day of month
 // # │ │ │ │ ┌────── month
 // # │ │ │ │ │ ┌──── day of week
 // # │ │ │ │ │ │
 // # │ │ │ │ │ │
 // # * * * * * *
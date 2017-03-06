var dic_eletrodomesticos = require('../dictionaries/eletrodomesticos.js');
var dic_smartphones = require('../dictionaries/smartphones.js');

module.exports = {

	// Development configuration options
	db:'mongodb://teste1:teste1234@ds145138.mlab.com:45138/heroku_l4pp17t7',
	// db:'mongodb://127.0.0.1:27017/bd_dev',
	sessionSecret:'developmentSessionSecret',
	connectid:'A3697E2455EA755B758F',
	timeRequest:0,
	searchtype:'contextual',

	// Crawler Options 
	// programs ids
	// 12011 : Walmart BR
	// 13212 : Ricardo Eletro BR
	// 16588 : Lojas Colombo BR
	// 12781 : Ponto Frio
	// 12785 : Casas Bahia BR
	// 12784 : Extra BR
	// 13604 : Brastemp BR
	// 18878 : Girafa BR
	// 13602 : Consul BR

	// all programs
	programs:'12011,13212,16588,12781,12785,12784,13604,18878,13602',
	programs_all:'group_all',
	
	// offer crawler job
	
	//queries
	query_eletrodomesticos:'geladeira' + ',' +
					'fogão' + ',' +
					'microondas' + ',' +
					'ar condicionado' + ',' +
					'lavadora' + ',' +
					'secadora',

	query_eletroportateis:'aspirador pó' + ',' +
					'liquidificador' + ',' +
					'batedeira' + ',' +
					'ventilador',

	query_smartphones:'iphone' + ',' +
					'motorola'  + ',' +
					'samsung galaxy',

	//departaments
	dep_eletrodomesticos:'eletrodomésticos',
	dep_eletroportateis:'eletroportáteis',
	dep_smartphones:'smartphones',

	// schedule offers jobs
	schedule_eletrodomesticos:'14 14 * * *',
	schedule_eletroportateis:'13 13 * * *',
	schedule_smartphones:'21 17 * * *',

	dictionary_offers:'',
	dictionary_smartphones:dic_smartphones.iphone  + '&' + 
							dic_smartphones.motorola + '&' + 
							dic_smartphones.samsung,

	// end offer crawler job


	// crawler job

	query_crawler:'iphone',
	dictionary_crawler:dic_smartphones.iphone,
	schedule_crawler:'8 11 * * *',

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
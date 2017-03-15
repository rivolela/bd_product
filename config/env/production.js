module.exports = {

	// Development configuration options
	db:'mongodb://bdeciding:rovel1954@ds035776.mlab.com:35776/heroku_5lt8spw4',
	// db:'mongodb://127.0.0.1:27017/bd_dev',
	timeRequest:0,
	sessionSecret:'productSessionSecret',

	// product job

	schedule_product:'10 0 * * *',

	// end product job
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
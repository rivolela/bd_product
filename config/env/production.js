module.exports = {

	// Development configuration options
	db:'mongodb://teste1:teste1234@ds145138.mlab.com:45138/heroku_l4pp17t7',
	// db:'mongodb://127.0.0.1:27017/bd_dev',
	timeRequest:0,
	sessionSecret:'productSessionSecret',

	// product job

	schedule_product:'0 10 * * *',

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
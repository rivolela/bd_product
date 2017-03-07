var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  name: {
    type:String,
    trim: true,
    index: true 
  },
  ean: Number,
  image: String,
  // category: {
  //   type:String,
  //   index: true 
  // },
  // merchantProductId: String,
  manufacturer:{
    type:String,
    index: true
  },
  // advertiser: String,
  created:{
    type:Date,
    default: Date.now
  },
  countSad: Number,
  countHappy: Number,
  totalReviews: Number,
  departamentBD: String,
  updated:{
    type:Date,
    default: Date.now
  },
});


module.exports = mongoose.model('Product', ProductSchema);



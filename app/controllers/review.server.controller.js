var mongoose = require('mongoose');
var ReviewSchema = require('../models/review.server.model');
var Review = mongoose.model( 'Review', ReviewSchema);

var cheerio = require('cheerio');
var requestUtile = require('../utile/requests.server.utile.js');
var timeRequest = 3000;



var saveArrayReviews = function(currentItem,arrayReviews,next){

  var query = null;

  try{

    if(currentItem < arrayReviews.length){
     
      var review = arrayReviews[currentItem];

      findOneAndUpdate(query,review,function(){
        saveArrayReviews(currentItem+1,arrayReviews,next);
      });
    }else{
      return next(arrayReviews);
    }
  }catch(error){
    console.log('An error has occurred >> review.server.controller >>  saveArrayReviews : '+ error.message);
    throw error ;
  }
};


var save = function(data,next){

  var review = new Review(data);

  review.save(function(err){
    if(err){
      console.log(err);
      return next(err);
    }else{
      console.log("review saved:",review);
      return next();
    }
  });
};


var deleteAllReviews = function(next){

    Review.remove({},function(err){
    if(err){
      console.log(err);
      return next(err);
    }else{
      console.log("all reviews were removed:");
      return next();
    }
  });
};


var findOneAndUpdate = function(query,object,next){

  // if query null or empty, this query should be the default
  // only create new review, if the condition below doesnt exist
  // this rule avoids recreate review already created in db
  if(Boolean(query) === false){
    query = {date:object.date,
            manufacturer:object.manufacturer,
            advertiser:object.advertiser,
            author:object.author,
            ean:object.ean
          };
  }

  var updateFields = {ean:object.ean,
                title:object.title,
                description:object.description,
                location:object.location,
                date:object.date,
                advertiser:object.advertiser,
                manufacturer:object.manufacturer,
                rating:object.rating,
                category:object.category
                };


  //{ "$set": { "name": name, 

  //var update = new Review(data);
  var options = {new:true,upsert:true,setDefaultsOnInsert:true};

  Review.findOneAndUpdate(query,{"$set":updateFields},options,function(err,review){
    if(err){
      console.log(err);
      return next(err,review);
    }else{
      console.log("review saved:",review);
      return next(err,review);
    }
  });

};


var getReviewsCounterByEan = function(ean,next){

  var query = String(ean);

  Review.aggregate(
      {$match:{
          ean:query
        }
      },
      {$project: {
          rating: 1,
          countSad:{ 
            $cond: [ { $lt: ["$rating", 4 ] }, 1, 0]
          },
          countHappy:{
            $cond: [ { $gt: [ "$rating", 3 ] }, 1, 0]
          }
        }
      },
      {$group: {
        _id:"rating",
        countSad:{
          $sum:"$countSad"
        },
        countHappy:{
          $sum:"$countHappy"
        },
        totalReviews:{
          $sum:1
        }
      }
    },function(err, res){
      if(err){
        console.log(err);
        return next(err);
      }else{
        console.log(res);
        return next(res);
      } 
    }
  );

};


exports.saveArrayReviews = saveArrayReviews;
exports.save = save;
exports.deleteAllReviews = deleteAllReviews;
exports.findOneAndUpdate = findOneAndUpdate;
exports.getReviewsCounterByEan = getReviewsCounterByEan;



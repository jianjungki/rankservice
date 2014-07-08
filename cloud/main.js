//require("cloud/app.js");
// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("rankinfo", function(request, response) {

   var better = new AV.Query("GameScore");
   better.greaterThanOrEqualTo("score", request.params.score);
   better.limit(1);
   
   var lower = new AV.Query("GameScore");
   lower.lessThan("score", request.params.score);
   lower.limit(1);
   
   var greater;
   var less;
   better.find({
		success: function(results) {
		  for (var i = 0; i < results.length; ++i) {
			greater = {
				name: results[i].get("playerName"), 
				score: results[i].get("score")
			};
		  }
		},
		error: function() {
		  response.error("rankinfo find failed");
		}
   })
   
   better.find({
		success: function(results) {
		  for (var i = 0; i < results.length; ++i) {
			less = {
				name: results[i].get("playerName"), 
				score: results[i].get("score")
			};
		  }
		},
		error: function() {
		  response.error("rankinfo find failed");
		}
   })
   
   var ret_arr = new Array(greater ,less);
   response.success(JSON.stringify(ret_arr));
});
//require("cloud/app.js");
// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("rankinfo", function(request, response) {

   var better = new AV.Query("GameScore");
   better.greaterThanOrEqualTo("score", request.params.score);
   
   var lower = new AV.Query("GameScore");
   lower.lessThan("score", request.params.score);
   
   var mainQuery = AV.Query.or(lotsOfWins, fewWins);
   mainQuery.find({
		success: function(results) {
	      var ret_arr = new Array();
		  for (var i = 0; i < results.length; ++i) {
			var element = {
				name: results[i].get("playerName"), 
				score: results[i].get("score")
			};
			ret_arr.push(element);
		  }
		  response.success(JSON.stringify(ret_arr));
		},
		error: function() {
		  response.error("rankinfo find failed");
		}
   })
});
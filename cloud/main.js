//require("cloud/app.js");
// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("rankinfo", function(request, response) {

  var better = new AV.Query("GameScore");
  better.greaterThan("score", request.params.score);

	var lower = new AV.Query("GameScore");
	lower.lessThan("score", request.params.score);
  
  var mainQuery = AV.Query.or(better, lower);
  mainQuery.find({
    success: function(results) {
      for (var i = 0; i < results.length; ++i) {
        sum += results[i].get("score");
      }
      response.success(sum);
    },
    error: function() {
      response.error("rankinfo find failed");
    }
	})
});
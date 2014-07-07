//require("cloud/app.js");
// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("rankinfo", function(request, response) {
	
  var query = new AV.Query("GameScore");
  query.near("score", request.params.score);
  
  query.find({
    success: function(results) {
      var sum = 0;
      for (var i = 0; i < results.length; ++i) {
        sum += results[i].get("score");
      }
      response.success(sum);
    },
    error: function() {
      response.error("rankinfo find failed");
    }
});
//require("cloud/app.js");
// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("rankinfo", function(request, response) {

  var better = new AV.Query("GameScore");
  better.greaterThan("score", request.params.score);
  
  better.find({
    success: function(results) {
      response.success(request.params.score);
    },
    error: function() {
      response.error("rankinfo find failed");
    }
	})
});
document.addEventListener('DOMContentLoaded', function () {
	
  	//var url = "http://127.0.0.1:3000/"; //Local
  	var url = "http://sign-kicker.meteor.com/";
	
	chrome.storage.local.get("registerGCM1", function(result) {
		// If already registered, bail out.
		if (result["registerGCM1"])
		  return;

		var el = document.getElementById('iframe');
		el.src = url + "registerGCM/";;

		
	});
	
	var el = document.getElementById('iframe');
	el.src = url;
});


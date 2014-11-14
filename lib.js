document.addEventListener('DOMContentLoaded', function () {
	
  	var url = "http://127.0.0.1:3000/";
  	//var url = "http://sign-kicker.meteor.com/";
	
	chrome.storage.local.get("registerGCM", function(result) {
		// If already registered, bail out.
		if (result["registerGCM"])
		  return;

		var el = document.getElementById('iframe');
		el.src = url + "registerGCM/";;

		
	});
	
	var el = document.getElementById('iframe');
	el.src = url;
});


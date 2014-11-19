document.addEventListener('DOMContentLoaded', function () {
	
  	//var url = "http://127.0.0.1:3000/"; //Local
  	var url = "http://sign-kicker.meteor.com/";
	
	chrome.storage.local.get("registerGCM4", function(result) {
		// If already registered, bail out.
		if (result["registerGCM4"])
		  return;

		var el = document.getElementById('iframe');
		el.src = url + "registerGCM/";;

		
	});
	
	var el = document.getElementById('iframe');
	el.src = url;
});
/*document.addEventListener('DOMContentLoaded', function () {
	/*console.log(chrome.extension.getViews());
	console.log(chrome.extension.getBackgroundPage());
	console.log(chrome.extension.getBackgroundPage().document.getElementById("iframe"));
	//mytest = this;
	console.log(this.getElementById("mycontainer"));

	iframe = chrome.extension.getBackgroundPage().document.getElementById("iframe");
	container = this.getElementById("mycontainer");
	//container.appendChild(iframe.cloneNode(true));
	//container.appendChild(iframe);
	//console.log(arguments);
	//console.log(this.document.getElementById("mycontainer"));
	//chrome.extension.getViews()[1].document.getElementById("mycontainer").appendChild(this.document.getElementById("iframe"));
})*/

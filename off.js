

function createNotification(title, msg){
	var opt = {
		type: "basic",
		title: title,
		message: msg,
		iconUrl: "logo.png"
	}

	chrome.notifications.create("notificationName",opt,function(){});
	
	//include this line if you want to clear the notification after 5 seconds
	setTimeout(function(){chrome.notifications.clear("notificationName",function(){});},5000);
}

chrome.browserAction.onClicked.addListener(function(tab) { 
  //alert("adsf");
});



//chrome.runtime.onStartup.addListener(function() {
chrome.runtime.onInstalled.addListener(function() {
	
});

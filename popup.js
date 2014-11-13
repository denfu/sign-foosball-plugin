MSG_IDS = {
    PROFILE_CHANGE : "profileChange",
    GAME_START : "gameStart"
};

function withProfile(f) {
	chrome.storage.sync.get('profile', function(profile){
		f(profile.profile);
	});
}

function withUserId(f) {
	chrome.storage.sync.get('userId', function(userId){
		f(userId.userId);
	});
}

function withChromeUserId(f) {
	chrome.storage.sync.get('chromeUserId', function(chromeUserId){
		f(chromeUserId.chromeUserId);
	});
}

function withUser(f) {
	withProfile(function(profile){
		withUserId(function(userId){
			f(userId, profile);
		});
	});
}



chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
  	switch(request.msgId) {  		
       case MSG_IDS.PROFILE_CHANGE:
       		withChromeUserId(function(chromeUserId){
       			var user = request.msgObject;
       			if (chromeUserId && user.profile.chromeUserId && user.profile.chromeUserId === chromeUserId) {
       				chrome.storage.sync.set(request.msgObject);
       				createNotification("Info", "Chrome plugin was synced with profile.");
       			}
       		});
       		break;
       	case MSG_IDS.GAME_START:
       		var match = request.msgObject;
       		withUser(function(userId, profile){
       			if (match.places.indexOf(userId) >= 0 && profile.notifyOnStart) {       					       			
       				createNotification("Game Start", "Game started");	       			     				       		
       			}       			
       		});       		
       		
       		break;
       default:
       	break;
  	}
		//chrome.browserAction.setBadgeText({text: "10+"});
		//chrome.browserAction.setBadgeBackgroundColor({color:[0,255,0,255]});
		//createNotification("title", "msg");
});

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
  
});

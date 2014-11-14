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


/* GCM Stuff */
function registerCallback(registrationId) {
  if (chrome.runtime.lastError) {
    // When the registration fails, handle the error and retry the
    // registration later.
    console.log("ERROR: registerCallback:")
    console.log(chrome.runtime.lastError);
    return;
  }

  // Send the registration ID to your application server.
  sendRegistrationId(registrationId, function(succeed) {
    // Once the registration ID is received by your server,
    // set the flag such that register will not be invoked
    // next time when the app starts up.
    if (succeed)
    	//console.log("never called");
      chrome.storage.local.set({registered: true});
  });
}

function sendRegistrationId(registrationId, callback) {
	console.log("SUCCESS: sendRegistrationId: " + registrationId);
    
  // Send the registration ID to your application server
  // in a secure way AND call callback
}

//chrome.runtime.onStartup.addListener(function() {
chrome.runtime.onInstalled.addListener(function() {
	console.log("start register");
  chrome.storage.local.get("registered", function(result) {
    // If already registered, bail out.
    if (result["registered"])
      return;

    // Up to 100 senders are allowed.
    var senderIds = ["945883142192"];
    chrome.gcm.register(senderIds, registerCallback);
  });
});

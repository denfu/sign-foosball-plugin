MSG_IDS = {
    REGISTER_GCM 		: "registerGCM",
    REGISTER_GCM_SUCCED	: "registerGCMSuccsess",
    GAME_START : "gameStart",
    SENDER_IDS	 : ["945883142192"] // google aplication project id
};

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

chrome.gcm.onMessage.addListener(function(message) {
	// A message is an object with a data property that
	// consists of key-value pairs.
	//console.log(message);
	if (message.data.msgId === MSG_IDS.GAME_START) {
		createNotification(message.data.title, message.data.message);
	}
});

chrome.runtime.onConnectExternal.addListener(function(port) {
  	port.onMessage.addListener(function(msg) {
    	if (msg.msgId === MSG_IDS.REGISTER_GCM) {
    		console.log("Trying to get registration id from gcm...");

    		chrome.gcm.register(MSG_IDS.SENDER_IDS, function(registrationId) {
				if (chrome.runtime.lastError) {
				    // When the registration fails, handle the error and retry the
				    // registration later.
				    console.log("ERROR: registerCallback:")
				    console.log(chrome.runtime.lastError);
				    return;
				  }

     			console.log("registration id received.")
				console.log("Sending registration id to server...");
				port.postMessage({registrationId: registrationId});       			
			});
     	} else if (msg.msgId === MSG_IDS.REGISTER_GCM_SUCCED) {
     		console.log("registration id sccessfully send.");
     		//console.log("// TODO: save to local storage");
     		chrome.storage.local.set({registerGCM: true});
     	}   
  });
});


/*chrome.runtime.onMessageExternal.addListener(
  	
  	function(request, sender, sendResponse) {
	  	if(request.msgId === MSG_IDS.REGISTER_GCM) {  		
	       sendResponse("test1");
       		//var user = request.msgObject;
			chrome.gcm.register(MSG_IDS.SENDER_IDS, function(registrationId) {
				if (chrome.runtime.lastError) {
				    // When the registration fails, handle the error and retry the
				    // registration later.
				    console.log("ERROR: registerCallback:")
				    console.log(chrome.runtime.lastError);
				    return;
				  }

       			sendResponse("test2");
       			/*if (succeed)
			    	//console.log("never called");
			      chrome.storage.local.set({registered: true});
			});
       	}
	}

);*/
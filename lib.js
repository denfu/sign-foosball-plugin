// Run our kitten generation script as soon as the document's DOM is ready.
getUUID = function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  };
}();


document.addEventListener('DOMContentLoaded', function () {
	
  	var url = "http://127.0.0.1:3000/";
	
	chrome.storage.sync.get('chromeUserId', function(obj){
		
		if (!obj || !obj.id) {
			var id = getUUID();
			chrome.storage.sync.set({'chromeUserId': id});
		}
		
		var el = document.getElementById('iframe');
		el.src = url + "chrome/" + id;
		
	});
	
	var el = document.getElementById('iframe');
	el.src = url;
});


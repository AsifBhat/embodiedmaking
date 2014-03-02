(function() {
  jQuery(function($) {
    /* 
    		*** SHOULD EXECUTE POST FILE LOAD ***
    
    		This method fetches the Google UserId for the current user and 
    		returns it.  
    		Easiest try is to fetch it from the URL once the application is loaded. 
    		The Method MUST return a valid userId, else it shall return an empty string.
    		In case this method returns an empty string, it must be rejected and an error
    		should be reported.
    	*/
    var generateSHA1;
    AppContext.global.getUserId = function() {
      var appHash, userId;
      appHash = window.location.hash ? window.location.hash : '';
      if (userId !== '') {
        return userId = appHash.split('userId=')[1];
      } else {
        return '';
      }
    };
    AppContext.global.generateTimeStamp = function() {
      return Date.now();
    };
    AppContext.global.generateUniqueId = function(userId, timestamp) {
      var idString;
      if (!userId) {
        userId = AppContext.global.getUserId();
      }
      if (!timestamp) {
        timestamp = AppContext.global.generateTimeStamp();
      }
      idString = userId + timestamp + Math.ceil(Math.random() * 100000);
      return generateSHA1(idString);
    };
    return generateSHA1 = function(inputString) {
      var shaObject;
      Util.log.console('Generating SHA1 for ');
      Util.log.console(inputString);
      shaObject = new jsSHA(inputString, 'TEXT');
      return shaObject.getHash('SHA-1', 'HEX');
    };
  });
}).call(this);

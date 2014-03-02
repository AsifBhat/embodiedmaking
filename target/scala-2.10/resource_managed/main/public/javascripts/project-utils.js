(function() {
  AppContext.project.getFileDetails = function() {
    var fileId;
    try {
      if (rtclient.params !== void 0) {
        fileId = rtclient.params['fileIds'];
        if (window.location.search.length !== 0) {
          fileId = rtclient.params['ids'];
        }
        if (fileId !== void 0) {
          AppContext.project.fileId = fileId;
          return rtclient.getFileMetadata(fileId, function(resp) {
            AppContext.project.projectTitle = resp.title;
            AppContext.project.projectDescription = resp.description;
            AppContext.project.updateTitleText();
            return Util.log.console('Fetched file details');
          });
        }
      }
    } catch (err) {
      return Util.log.console(err);
    }
  };
  AppContext.project.updateTitleText = function() {
    return $('.proj_title').text(AppContext.project.projectTitle.split('\.')[0]);
  };
  /*
    Send a request to the Google Drive API to change 
    the title of the file associated with the making.
    If the title change is a success, then update the 
    associated viz data in the RealTime datastructure.
  */
  AppContext.project.sendChangeTitleRequest = function(newTitle) {
    var body, fileId, request;
    newTitle = newTitle + '.ema';
    fileId = AppContext.project.fileId;
    body = {
      'title': newTitle
    };
    request = gapi.client.drive.files.patch({
      'fileId': fileId,
      'resource': body
    });
    return request.execute(function(resp) {
      AppContext.project.projectTitle = newTitle;
      AppContext.vizdata.updateTitle(newTitle);
      return Util.log.console('Project Title Changed');
    });
  };
  AppContext.project.showPicture = function(pictureurl) {
    if (pictureurl !== null) {
      pictureurl = pictureurl.substr(pictureurl.lastIndexOf('//'), pictureurl.length);
      return $('#profile_picture').css("display", "").attr("xlink:href", pictureurl);
    } else {
      return $('#profile_picture').css("display", "").attr("xlink:href", '/assets/images/avatar.svg');
    }
  };
  AppContext.project.getUserInfo = function() {
    /*
      * Get information about the current user 
      */
    var callback, request;
    callback = function() {};
    Util.log.console('Fetching User Info..');
    if (gapi.client.drive === void 0) {
      gapi.client.load('drive', 'v2', callback);
    }
    try {
      if (gapi.client.drive !== void 0) {
        request = gapi.client.drive.about.get();
        return request.execute(function(resp) {
          try {
            if (resp !== void 0) {
              $('#authorizeButton').html(resp.name);
              if (resp.user.picture !== void 0) {
                return AppContext.project.showPicture(resp.user.picture.url);
              } else {
                return AppContext.project.showPicture(null);
              }
            }
          } catch (err) {
            Util.log.console('Error while fetching user information');
            return Util.log.console(err);
          }
        });
      } else {
        return Util.log.console('Error since the GAPI is not loaded completely');
      }
    } catch (err) {
      Util.log.console('Error Occured while fetching user info');
      return Util.log.console(err);
    }
  };
}).call(this);

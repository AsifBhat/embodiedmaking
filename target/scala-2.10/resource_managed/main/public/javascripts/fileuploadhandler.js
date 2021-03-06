(function() {
  jQuery(function($) {
    var checkForHTML5FileSupport, createElementJSON, handleFileSelect, readFile, readFileText;
    checkForHTML5FileSupport = function() {
      if (window.File && window.FileReader && window.FileList && window.Blob) {
        Util.log.console("All the File APIs are supported.");
        return true;
      } else {
        Util.log.console("The File APIs are not fully supported in this browser.");
        return false;
      }
    };
    createElementJSON = function(elemDescArray) {
      var elemJSON;
      return elemJSON = {
        "elementId": elemDescArray[0],
        "description": elemDescArray[1]
      };
    };
    readFileText = function(fileText) {
      var contentLineExp, fileLines, splitToken;
      splitToken = /\n/;
      contentLineExp = /([CFS]\d+)\s+(.+)/i;
      fileLines = fileText.split(splitToken);
      if (AppContext.vizdata.getPositions().length > 0) {
        AppContext.vizdata.removeAllPositions();
      }
      if (AppContext.vizdata.getRelations().length > 0) {
        AppContext.vizdata.removeAllRelations();
      }
      if (AppContext.vizdata.getElements().length > 0) {
        AppContext.vizdata.removeAllElements();
      }
      $.each(fileLines, function(idx, line) {
        var tokens;
        if (contentLineExp.test(line)) {
          tokens = line.split(/\s+(.+)/);
          AppContext.vizdata.addElement(createElementJSON(tokens));
          return true;
        }
      });
      return AppContext.grid.reloadTypeahead(AppContext.vizdata.getElements());
    };
    readFile = function(file) {
      var fileReader, fileText;
      fileReader = new FileReader();
      fileReader.readAsText(file);
      fileText = '';
      return fileReader.onloadend = function() {
        fileText = fileReader.result;
        return readFileText(fileText);
      };
    };
    handleFileSelect = function(evt) {
      var file, _i, _len, _ref, _results;
      if (checkForHTML5FileSupport()) {
        Util.log.console("HTML5 File API is supported by the browser");
        _ref = evt.target.files;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          file = _ref[_i];
          _results.push(readFile(file));
        }
        return _results;
      } else {
        return Util.log.console('HTML5 File API is not supported on your browser');
      }
    };
    return AppContext.project.bindFileUpload = function() {
      if (document.getElementById('import_file_input') !== null) {
        return document.getElementById('import_file_input').addEventListener('change', handleFileSelect, false);
      }
    };
  });
}).call(this);

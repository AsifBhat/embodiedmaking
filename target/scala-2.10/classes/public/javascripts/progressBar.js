(function() {
  AppContext.grid.showProgressBar = function(progress_bar, delay) {
    var progBar, progress;
    progress = 0;
    progBar = function(progress, delay) {
      Util.log.console('in the bar: ' + progress);
      progress_bar.children().css('width', progress + '%');
      if (progress > 90) {
        progress_bar.children().css('width', 100 + '%');
        return;
      }
      progress = progress + delay;
      return setTimeout(function() {
        return progBar(progress, delay);
      }, delay);
    };
    return progBar(progress, delay);
  };
  AppContext.grid.showMessageBoard = function(message_board, message) {
    return message_board.html(message);
  };
  AppContext.grid.fadeItem = function(item, fadeTimeout, activateItemCallback) {
    var args;
    Util.log.console('Fading in the message items');
    args = Array.prototype.slice.call(arguments, 3);
    item.fadeIn(500);
    activateItemCallback.call(this, item, args[0]);
    return item.fadeOut(fadeTimeout);
  };
}).call(this);

(function() {
  jQuery(function($) {
    var defaultNuggetDataSet, getNextNuggetId, getNuggetTokens, removeAddSection;
    defaultNuggetDataSet = {
      template: ['<p class="content-id">{{nuggetId}}</p>', '<p class="nugget-description">{{description}}</p>'].join(''),
      engine: Hogan
    };
    getNuggetTokens = function(nuggetList) {
      var nuggetTokens;
      nuggetTokens = [];
      return $.each(nuggetList, function(idx, nugget) {
        return nuggetTokens.push({
          value: nugget.nuggetId,
          nuggetId: nugget.nuggetId,
          description: nugget.description,
          nuggetTokens: (nugget.nuggetId + nugget.description).split(' ')
        });
      });
    };
    AppContext.grid.initNuggetTypeahead = function(nuggetList) {
      Util.log.console('Intializing Nugget typeahead');
      return $('#nugget-search input').typeahead($.extend(true, {
        name: 'Nuggets' + Math.random(),
        local: getNuggetTokens(nuggetList)
      }, defaultNuggetDataSet));
    };
    AppContext.grid.addNuggetSection = function() {
      $('.edit_nuggets').css({
        'display': 'block',
        'opacity': 1
      });
      return AppContext.grid.prependNuggetToDisplay(AppContext.vizdata.getNuggets());
    };
    $('.add_nugget_section').click(function() {
      Util.log.console('This is event being called');
      $('.nugget_view').fadeOut(1000);
      $('.add_nugget_control').fadeIn(2000);
      return $('#add_nugget_textarea').focus();
    });
    $('#add_nugget_textarea').keydown(function(evt) {
      var keyCode, nugget, nuggetText;
      keyCode = evt.keyCode ? evt.keyCode : evt.which;
      if (keyCode === 27) {
        removeAddSection();
      }
      if (keyCode === 13) {
        nuggetText = $(this).val();
        console.log($(this).val());
        nugget = {};
        nugget.nuggetId = getNextNuggetId();
        nugget.description = nuggetText;
        AppContext.vizdata.addNugget(nugget);
        AppContext.grid.prependNuggetToDisplay([nugget]);
        return removeAddSection();
      }
    });
    $('.close_add_nugget').click(function() {
      return removeAddSection();
    });
    AppContext.grid.prependNuggetToDisplay = function(nuggetList) {
      Util.log.console('Adding the nugget');
      return $.each(nuggetList, function(idx, nugget) {
        return $('.nugget_desc').prepend("<div class='nugget_listing row'>" + nugget.description + "</div>");
      });
    };
    removeAddSection = function() {
      $('#add_nugget_textarea').blur().val('');
      $('.add_nugget_control').fadeOut(1000);
      return $('.nugget_view').fadeIn(2000);
    };
    return getNextNuggetId = function() {
      var allNuggets, nextId, _ref;
      nextId = 1;
      allNuggets = AppContext.vizdata.getNuggets();
      nextId = (_ref = AppContext.vizdata.getNuggets().length === 0) != null ? _ref : {
        1: AppContext.vizdata.getNuggets().length(+1)
      };
      Util.log.console('Next Nugget Id ' + nextId);
      return 'N' + nextId;
    };
  });
}).call(this);

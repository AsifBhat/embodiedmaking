(function() {
  jQuery(function($) {
    var datasetDefaults, generateLocalElements;
    datasetDefaults = {
      template: ['<p class="content-description">{{description}}</p>'].join(''),
      engine: Hogan
    };
    generateLocalElements = function(elementsList) {
      var importedElements;
      importedElements = [];
      $.each(elementsList, function(idx, element) {
        return importedElements.push({
          value: element.elementId,
          elementId: element.elementId,
          description: element.description.substr(0, 35) + '...',
          tokens: (element.elementId.substr(0, 1) + element.description).split(' ')
        });
      });
      return importedElements;
    };
    AppContext.grid.activateTypeahead = function(elementList) {
      $('body').append('<div class="accordion span4 rounded_border" id="element_edit"><div class="accordion-group"><div class="accordion-heading text-center"><h5 class="accordion-toggle cellHeader" data-toggle="collapse" data-parent="#element_edit" href="#collapseOne"></h5></div><div id="collapseOne" class="accordion-body collapse in" style="overflow : visible;"><div class="accordion-inner"><div class="row"><ul id="elementsTab" class="nav nav-tabs"><li class="tab_head"><a href="#" data-toggle="tab"><h6>Stories</h6></a></li><li class="tab_head"><a href="#" data-toggle="tab"><h6>Forces</h6></a></li><li class="tab_head"><a href="#" data-toggle="tab"><h6>Solutions</h6></a></li></ul><div class="row edit_inner" id="edit_input_container"></div><div class="row edit_inner"><span class="cellTitle" style="display: none"></span><div class="row cellDesc" contenteditable="true"></div><hr><div class="row cellControls span2" style="float: right"><button class="btn btn-mini" id="delposButton" data-toggle="tooltip" data-placement="left" title="" data-original-title="Remove this occurrence" disabled><span class="icon-remove-circle remove_btn"></span></button> &nbsp; <button class="btn btn-mini" id="deleteAllElements" data-toggle="tooltip" data-placement="right" title="" data-original-title="Delete and remove all occurrences" disabled><span class="icon-trash"></span></button><span id="clickedLocation" style="display: none"></span></div></div></div></div></div></div></div>');
      $('#element_edit').collapse('show');
      $('.tab_head').click(function() {
        var currentType, idstr, tabText;
        $(this).siblings().css('text-decoration', '');
        tabText = $(this).find('a').text();
        idstr = '';
        currentType = '';
        if (tabText === 'Stories') {
          idstr = "S" + AppContext.global.generateUniqueId();
          currentType = 'stories';
        } else if (tabText === 'Forces') {
          idstr = "F" + AppContext.global.generateUniqueId();
          currentType = 'forces';
        } else if (tabText === 'Solutions') {
          idstr = "C" + AppContext.global.generateUniqueId();
          currentType = 'solutionComponents';
        }
        $('#newElementText').remove();
        $('.cellDesc').text('');
        return handleAddNewElement(idstr, currentType, $(this));
      });
      $('#element_edit').on('hidden', function() {
        $('#element_edit').css('overflow', 'hidden');
        $('#collapseOne').css('overflow', 'hidden');
        return AppContext.grid.drawMakingSummary();
      });
      $('#element_edit').on('shown', function() {
        $('#element_edit').css('overflow', 'visible');
        $('#collapseOne').css('overflow', 'visible');
        return AppContext.grid.drawTipHeader($('.cellTitle').text());
      });
      $('#edit_input_container').append('<div id="content-search"><input type="text" id="input-elem-search" name="query" placeholder="Search Elements..."></div> <hr>');
      $('.cellDesc').keypress(function(e) {
        if (e.which === 13) {
          e.preventDefault();
          return AppContext.cluster.updateElem($('.cellTitle').text(), $('.cellDesc').text());
        }
      });
      $('#deleteAllElements').click(function() {
        var idToDelete;
        idToDelete = $('.cellTitle').text().trim();
        AppContext.cluster.deleteElem(idToDelete);
        $('.cellTitle').text('');
        return $('.cellDesc').text('');
      }).tooltip();
      $("#delposButton").click(function() {
        var pos, posArr;
        pos = $('#clickedLocation').text();
        posArr = pos.split(',');
        AppContext.cluster.deletePosition(posArr[0], posArr[1]);
        $('.cellTitle').text('');
        return $('.cellDesc').text('');
      }).tooltip();
      $('#content-search').keypress(function(evt) {
        return handleKeyPress(evt);
      });
      return AppContext.grid.initTypeahead(elementList);
    };
    AppContext.grid.initTypeahead = function(elementList) {
      Util.log.console('Re-intializing typeahead');
      return $('#content-search input').typeahead($.extend(true, {
        name: 'Elements' + Math.random(),
        local: generateLocalElements(elementList)
      }, datasetDefaults));
    };
    return AppContext.grid.reloadTypeahead = function(elementList) {
      $('#content-search input').typeahead('destroy');
      return AppContext.grid.initTypeahead(elementList);
    };
  });
}).call(this);

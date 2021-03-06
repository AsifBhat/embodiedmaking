(function() {
  var getBorderString, isTopEmpty, showborders;
  jQuery(function($) {
    context.init({
      fadeSpeed: 100,
      above: 'auto',
      preventDoubleContext: true,
      compress: false
    });
    AppContext.grid.zoomValue = 3;
    AppContext.grid.DEFAULT_ZOOM = 3;
    AppContext.grid.MAX_ZOOM_LEVEL = 7;
    AppContext.grid.MIN_ZOOM_LEVEL = 0;
    AppContext.grid.ZOOM_ARRAY = [1 / 3, 1 / 2, 2 / 3, 1, 1.5, 2, 2.5];
    return AppContext.grid.defaultSize = {
      width: 42,
      height: 48
    };
  });
  AppContext.grid.createGrid = function(domelem) {
    AppContext.grid.grid = hex.grid(domelem, {});
    AppContext.grid.size = hex.size(AppContext.grid.grid.elem);
    return AppContext.grid.grid.size;
  };
  AppContext.grid.createHex = function(styleClass, text) {
    if (text == null) {
      text = "";
    }
    return $('<div class="hex ' + styleClass + '" >' + text + '</div>').css({
      'width': AppContext.grid.grid.tileWidth + 'px',
      'height': AppContext.grid.grid.tileHeight + 'px',
      'line-height': AppContext.grid.grid.tileHeight + 'px'
    }).addClass(styleClass);
  };
  AppContext.grid.addGridDomEventListeners = function() {
    $('#hexagonal-grid').bind('mousemove', AppContext.grid.mousemovehandler);
    return $('#hexagonal-grid').bind('mousedown', AppContext.grid.mousedownhandler);
  };
  AppContext.grid.initialize = function() {
    AppContext.grid.hoveredElement = AppContext.grid.createHex('current');
    $(AppContext.grid.grid.root).append(AppContext.grid.hoveredElement);
    AppContext.grid.idwithtooltip = $('#desctooltip');
    AppContext.grid.reorient();
    AppContext.grid.addGridDomEventListeners();
    return AppContext.grid;
  };
  AppContext.grid.placeHex = function(elem, x, y) {
    var inv;
    inv = AppContext.grid.grid.screenpos(x, y);
    elem.css("left", inv.x + "px");
    elem.css("top", inv.y + "px");
    return elem;
  };
  AppContext.grid.showHoveredElement = function(xc, yc) {
    AppContext.grid.placeHex(AppContext.grid.hoveredElement, xc, yc);
    return AppContext.grid.hoveredElement;
  };
  AppContext.grid.placeNewElement = function(xc, yc) {
    AppContext.grid.newElement = AppContext.grid.createHex('new');
    AppContext.grid.placeHex(AppContext.grid.newElement, xc, yc);
    $(AppContext.grid.grid.root).append(AppContext.grid.newElement);
    return AppContext.grid.newElement;
  };
  AppContext.grid.showTooltip = function(x, y, elemId, tooltipInfo) {
    var inv, tooltipHTML;
    inv = AppContext.grid.grid.screenpos(x, y);
    AppContext.grid.idwithtooltip.css({
      "left": ((inv.x + AppContext.grid.grid.origin.x) + 10) + "px",
      "top": (inv.y + AppContext.grid.grid.origin.y - 2) + "px",
      "z-index": 10
    });
    tooltipHTML = '<textarea id="elemtext" class="elementsView" style="background-color:#555;width:90%;overflow:hidden;color:#FFF;font-size:10px;" onclick="$(this).autogrow()">' + tooltipInfo + '</textarea><br><button class="btn-warning btn-mini" style="height: 20px;width: 20px;padding: 0px;" data-elementid="' + elemId + '" onclick="AppContext.cluster.deleteElem($(this))">' + '<span class="icon-remove remove_btn"></span></button>' + '&nbsp;&nbsp;&nbsp;<button class="btn-mini" data-elementid="' + elemId + '" onclick="AppContext.cluster.updateElem($(this))" style="height: 20px;width: 20px;padding: 0px;"><span class="icon-pencil"></span></button>' + '</textarea><hr style="margin-top:4px;margin-bottom:4px; padding:0px;"><button id="delposButton" btn-mini" style="height: 20px;width: 20px;padding: 0px;"><span class="icon-remove"></span></button>';
    AppContext.grid.idwithtooltip.tooltip('show');
    AppContext.grid.idwithtooltip.attr("data-original-title", tooltipHTML);
    $('.tooltip-inner').html(tooltipHTML);
    /*
      $("#delposButton").click(() -> 
        AppContext.cluster.deletePosition(parseInt(x,10),parseInt(y,10))
      )
      */
    return AppContext.grid.idwithtooltip;
  };
  AppContext.grid.hideTooltip = function() {
    return AppContext.grid.idwithtooltip.tooltip('hide');
  };
  AppContext.grid.placeOnGrid = function(elemwithpos, displaytext) {
    var cellToPlace, cls, elemid, etype;
    if (displaytext == null) {
      displaytext = "";
    }
    elemid = elemwithpos.elementId;
    if (displaytext === "") {
      displaytext = (AppContext.vizdata.getElementDescription(elemid)).substr(0, 5);
    }
    etype = elemid.substr(0, 1);
    switch (etype) {
      case 'S':
        cls = "stories";
        break;
      case 'F':
        cls = "forces";
        break;
      case 'C':
        cls = "solutionComponents";
    }
    cellToPlace = AppContext.grid.createHex(cls, displaytext);
    $(cellToPlace).attr("id", elemwithpos.posId);
    $(AppContext.grid.grid.root).append(cellToPlace);
    return AppContext.grid.placeHex(cellToPlace, elemwithpos.x, elemwithpos.y);
  };
  AppContext.grid.removeFromGrid = function(elemwithpos) {
    var domelem;
    domelem = $('#' + elemwithpos.posId);
    return domelem.remove();
  };
  AppContext.grid.getGridPos = function(e) {
    var elem, g, mousepos, pos, trans, x, y, zeropos;
    x = 0;
    y = 0;
    elem = $('#hexagonal-grid')[0];
    g = {
      x: AppContext.grid.grid.origin.x,
      y: AppContext.grid.grid.origin.y
    };
    if (e.pageX !== void 0 && e.pageY !== void 0) {
      x = e.pageX;
      y = e.pageY;
    } else if (e.clientX !== void 0 && e.clientY !== void 0) {
      x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    if (elem) {
      zeropos = hex.position(elem);
      x = x - zeropos.x;
      y = y - zeropos.y;
    }
    mousepos = {
      x: x,
      y: y
    };
    pos = {
      x: mousepos.x - g.x,
      y: mousepos.y - g.y
    };
    trans = AppContext.grid.grid.translate(pos.x, pos.y);
    return trans;
  };
  AppContext.grid.displayAllPositions = function(positions) {
    $('.forces, .solutionComponents, .stories').remove();
    $("#desctooltip").tooltip('hide');
    $.each(positions, function(i, value) {
      return AppContext.grid.placeOnGrid(value);
    });
    context.attach('.hex', [
      {
        "text": "Select cluster",
        "action": AppContext.grid.selectCluster
      }
    ]);
    if ($("#showborders").attr("value") === "hide") {
      return showborders();
    }
  };
  AppContext.grid.clearGridCache = function() {
    AppContext.grid.size = '';
    AppContext.grid.hoveredElement = '';
    AppContext.grid.idwithtooltip = '';
    AppContext.grid.newElement = '';
    AppContext.grid.toDrag = [];
    AppContext.grid.toDragRef = '';
    AppContext.grid.clonesToDrag = [];
    AppContext.grid.toDragRefClone = '';
    AppContext.grid.selectedElemPos = [];
    return AppContext.grid.rightClickedelempos = '';
  };
  AppContext.grid.getAllNeighbourCells = function(pos) {
    var allNeighbourCells;
    allNeighbourCells = [];
    allNeighbourCells[0] = {
      x: pos.x - 1,
      y: pos.y
    };
    allNeighbourCells[1] = {
      x: pos.x + 1,
      y: pos.y
    };
    allNeighbourCells[2] = {
      x: pos.x - 1,
      y: pos.y + 1
    };
    allNeighbourCells[3] = {
      x: pos.x,
      y: pos.y - 1
    };
    allNeighbourCells[4] = {
      x: pos.x,
      y: pos.y + 1
    };
    allNeighbourCells[5] = {
      x: pos.x + 1,
      y: pos.y - 1
    };
    return allNeighbourCells;
  };
  AppContext.grid.initApp = function() {
    if ($('#hexagonal-grid')[0] !== void 0) {
      AppContext.grid.createGrid($('#hexagonal-grid')[0]);
      return AppContext.grid.initialize();
    }
  };
  AppContext.grid.activateListeners = function() {
    AppContext.grid.grid.addEvent("tileover", AppContext.grid.hoverEventHandler);
    AppContext.grid.grid.addEvent("tiletap", AppContext.grid.clickEventHandler);
    AppContext.grid.grid.addEvent("tileout", AppContext.grid.hoveroutEventHandler);
    AppContext.grid.grid.addEvent("tiledown", AppContext.grid.tileDownHandler);
    AppContext.grid.grid.addEvent("tileup", AppContext.grid.tileUpHandler);
    AppContext.grid.grid.addEvent("tileclick", AppContext.grid.tileClickHandler);
    return $('#nugget_btn').click(function(evt) {
      return AppContext.controls.handleNuggetDisplay(evt);
    });
  };
  AppContext.grid.activateZoomListeners = function() {
    $('#zoomin-controller').click(function(evt) {
      return AppContext.grid.zoomEventHandler(evt, 1);
    });
    return $('#zoomout-controller').click(function(evt) {
      return AppContext.grid.zoomEventHandler(evt, -1);
    });
  };
  AppContext.grid.drawTipDesc = function(elementUnderMouse, description, pos) {
    $('.cellTitle').text(elementUnderMouse);
    $('.cellDesc').text(description);
    $('#clickedLocation').text(pos.x + ',' + pos.y);
    return AppContext.grid.drawTipHeader(elementUnderMouse);
  };
  AppContext.grid.drawTipHeader = function(elementId) {
    var cellTitleTxt, currentElementType, elemType;
    cellTitleTxt = elementId;
    if (elementId !== '' && elementId !== void 0) {
      elemType = AppContext.vizdata.getContentElementType(cellTitleTxt);
      currentElementType = elemType;
      cellTitleTxt = currentElementType + ': ' + cellTitleTxt;
      return $('.cellHeader').text(cellTitleTxt);
    } else {
      return AppContext.grid.drawMakingSummary();
    }
  };
  AppContext.grid.drawMakingSummary = function() {
    var nForces, nSolutions, nStories;
    nStories = AppContext.vizdata.getStories().length;
    nForces = AppContext.vizdata.getForces().length;
    nSolutions = AppContext.vizdata.getSolutions().length;
    return $('.cellHeader').text('Stories: ' + nStories + ' Forces: ' + nForces + ' Solutions: ' + nSolutions);
  };
  AppContext.grid.reorient = function() {
    return AppContext.grid.grid.reorient(AppContext.grid.size.x * 0.5, AppContext.grid.size.y * 0.5);
  };
  AppContext.grid.hasOneEmptyNeighbour = function(pos) {
    var allnbcells, emptynbs;
    emptynbs = false;
    allnbcells = AppContext.grid.getAllNeighbourCells(pos);
    $.each(allnbcells, function(i, nbcell) {
      var nbposition;
      nbposition = AppContext.vizdata.getPositionInCell(nbcell);
      if (AppContext.vizdata.isEmpty(nbposition)) {
        return emptynbs = true;
      }
    });
    return emptynbs;
  };
  isTopEmpty = function(posx, posy) {
    return AppContext.vizdata.isEmpty({
      x: posx,
      y: posy + 1
    });
  };
  getBorderString = function(posx, posy) {
    var borders;
    borders = [];
    if (AppContext.vizdata.isEmpty({
      x: posx,
      y: posy + 1
    })) {
      Util.log.console("top");
      borders.push("27% 0%");
      borders.push("72% 0%");
    } else {
      borders.push("27% 10%");
      borders.push("72% 10%");
    }
    if (AppContext.vizdata.isEmpty({
      x: posx + 1,
      y: posy
    })) {
      Util.log.console("top right");
      borders.push("72% 0%");
      borders.push("95% 45%");
      borders.push("95% 50%");
    } else {
      borders.push("72% 10%");
      borders.push("90% 42%");
      borders.push("90% 53%");
    }
    if (AppContext.vizdata.isEmpty({
      x: posx + 1,
      y: posy - 1
    })) {
      Util.log.console("bottom right");
      borders.push("95% 50%");
      borders.push("72% 100%");
    } else {
      borders.push("90% 48%");
      borders.push("90% 52%");
      borders.push("68% 90%");
    }
    if (AppContext.vizdata.isEmpty({
      x: posx,
      y: posy - 1
    })) {
      Util.log.console("bottom");
      borders.push("72% 100%");
      borders.push("30% 100%");
    } else {
      borders.push("72% 90%");
      borders.push("32% 90%");
    }
    if (AppContext.vizdata.isEmpty({
      x: posx - 1,
      y: posy
    })) {
      Util.log.console("bottom left");
      borders.push("30% 100%");
      borders.push("3% 53%");
      borders.push("3% 50%");
    } else {
      borders.push("32% 90%");
      borders.push("10% 54%");
    }
    if (AppContext.vizdata.isEmpty({
      x: posx - 1,
      y: posy + 1
    })) {
      Util.log.console("top left");
      borders.push("0% 53%");
      borders.push("27% 0%");
    } else {
      borders.push("10% 45%");
      borders.push("29% 10%");
    }
    return borders.join();
  };
  showborders = function() {
    var allpositions;
    allpositions = AppContext.vizdata.getPositions();
    return $.each(allpositions, function(i, position) {
      var clip, domElem, emptynbs, pos;
      domElem = $('#' + position.posId);
      pos = {
        x: position.x,
        y: position.y
      };
      emptynbs = AppContext.grid.hasOneEmptyNeighbour(pos);
      if (emptynbs) {
        $(domElem).addClass("bordered");
      }
      clip = getBorderString(pos.x, pos.y);
      return $(domElem).css("-webkit-clip-path", "polygon(" + clip + ")");
    });
  };
  AppContext.grid.markBorder = function(posx, posy) {
    var action, allpositions, borderbtn;
    borderbtn = $('#showborders')[0];
    action = $(borderbtn).attr("value");
    allpositions = AppContext.vizdata.getPositions();
    if (action === 'show') {
      $(borderbtn).html('Hide Borders');
      $(borderbtn).attr("value", "hide");
      return showborders();
    } else {
      $.each(allpositions, function(i, position) {
        var domElem;
        domElem = $('#' + position.posId);
        $(domElem).removeClass("bordered");
        return $(domElem).css("-webkit-clip-path", "");
      });
      $(borderbtn).html('Show Borders');
      return $(borderbtn).attr("value", "show");
    }
  };
  jQuery(function($) {
    AppContext.grid.clearGridCache();
    return AppContext.grid.contextmenu = context.init({
      fadeSpeed: 100,
      above: 'auto',
      preventDoubleContext: true,
      compress: false
    });
  });
}).call(this);

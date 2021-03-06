(function() {
  jQuery(function($) {
    var dragOnMouseMove, getCluster, gx, gy, isInArray, setRightClickedPos;
    gx = 0;
    gy = 0;
    AppContext.grid.toDrag = [];
    AppContext.grid.clonesToDrag = [];
    AppContext.grid.hoverEventHandler = function(e, x, y) {
      var domelem, elementUnderMouse, inv, pos;
      if (AppContext.grid.toDrag !== '') {
        domelem = $('#' + AppContext.grid.toDrag.posId);
        inv = AppContext.grid.grid.screenpos(x, y);
        domelem.css("left", inv.x);
        domelem.css("top", inv.y);
      } else {
        pos = {
          x: x,
          y: y
        };
        elementUnderMouse = AppContext.vizdata.getElementInCell(pos);
      }
      return AppContext.grid.showHoveredElement(x, y);
    };
    AppContext.grid.posValueAddedCallback = function(addedPos) {
      return AppContext.grid.placeOnGrid(addedPos);
    };
    AppContext.grid.posValueRemovedCallback = function(addedPos) {
      return AppContext.grid.removeFromGrid(addedPos);
    };
    AppContext.grid.addGridPos = function(obj, datum, dataset) {
      var tooltipInfo;
      AppContext.cluster.updatePosition(datum.value, gx, gy);
      tooltipInfo = AppContext.vizdata.getElementDescription(datum.value);
      return AppContext.grid.drawTipDesc(datum.value, tooltipInfo, {
        x: gx,
        y: gy
      });
    };
    AppContext.grid.clickEventHandler = function(e, x, y) {
      var cellClicked, contentSearch, elementUnderMouse, inv, pos, tooltipInfo;
      Util.log.console(e);
      $('#element_edit').css({
        display: 'block',
        height: ''
      });
      pos = {
        x: x,
        y: y
      };
      cellClicked = AppContext.vizdata.getPositionInCell(pos);
      $('.new').remove();
      if (cellClicked === '') {
        AppContext.grid.newElement = AppContext.grid.placeNewElement(x, y);
      } else {
        AppContext.grid.newElement = $('#' + cellClicked.posId);
      }
      inv = AppContext.grid.grid.screenpos(x, y);
      elementUnderMouse = AppContext.vizdata.getElementInCell(pos);
      if (elementUnderMouse !== '') {
        tooltipInfo = AppContext.vizdata.getElementDescription(elementUnderMouse);
        $('.cellControls > button').removeAttr('disabled');
      } else {
        tooltipInfo = '';
        $('.cellControls > button').attr('disabled', '');
      }
      AppContext.grid.drawTipDesc(elementUnderMouse, tooltipInfo, pos);
      contentSearch = $("#content-search");
      gx = x;
      gy = y;
      $('#addFromTypeahead').css("display", "none");
      if ($('#newElementText').length > 0) {
        resetDescSection();
      }
      return contentSearch.css({
        "display": "",
        'opacity': 1
      }).find("input").off('typeahead:selected').on('typeahead:selected', AppContext.grid.addGridPos).typeahead('setQuery', '').focus();
    };
    AppContext.grid.hoveroutEventHandler = function(e, x, y) {
      return AppContext.grid.hideTooltip();
    };
    AppContext.project.handleNameChange = function() {
      return $('.proj_title').text(AppContext.vizdata.getProjectTitle());
    };
    AppContext.grid.tileUpHandler = function(e, x, y) {
      var deltax, deltay, domelem;
      if (AppContext.grid.toDrag.length !== 0) {
        domelem = $('#' + AppContext.grid.toDragRef.posId);
        $(domelem).removeClass("dragged");
        deltax = x - AppContext.grid.toDragRef.x;
        deltay = y - AppContext.grid.toDragRef.y;
        AppContext.cluster.deletePosition(AppContext.grid.toDragRef.x, AppContext.grid.toDragRef.y);
        AppContext.cluster.updatePosition(AppContext.grid.toDragRef.elementId, AppContext.grid.toDragRef.x + deltax, AppContext.grid.toDragRef.y + deltay);
        $.each(AppContext.grid.toDrag, function(i, todrag) {
          if (todrag.posId !== AppContext.grid.toDragRef.posId) {
            AppContext.cluster.deletePosition(todrag.x, todrag.y);
            return AppContext.cluster.updatePosition(todrag.elementId, todrag.x + deltax, todrag.y + deltay);
          }
        });
        AppContext.grid.toDrag = [];
        AppContext.grid.toDragRef = '';
        AppContext.grid.clonesToDrag = [];
        AppContext.grid.toDragRefClone = '';
        return AppContext.grid.selectedElemPos = [];
      }
    };
    AppContext.grid.tileClickHandler = function(e, x, y) {
      return e.preventDefault();
    };
    AppContext.grid.markTobeDragged = function() {
      return $.each(AppContext.grid.toDrag, function(i, todrag) {
        var domelem;
        domelem = $('#' + todrag.posId);
        return $(domelem).addClass("dragged");
      });
    };
    AppContext.grid.tileDownHandler = function(e, x, y) {
      var elempos, pos;
      if ((AppContext.grid.selectedElemPos === void 0) || (AppContext.grid.selectedElemPos.length === 0)) {
        pos = {
          x: x,
          y: y
        };
        elempos = AppContext.vizdata.getPositionInCell(pos);
        if (elempos !== '') {
          AppContext.grid.toDrag = [];
          AppContext.grid.toDrag.push(elempos);
          AppContext.grid.toDragRef = AppContext.vizdata.getPositionInCell(pos);
        }
      } else {
        AppContext.grid.toDrag = AppContext.grid.selectedElemPos;
        AppContext.grid.toDragRef = AppContext.grid.rightClickedelempos;
      }
      if (AppContext.grid.toDrag.length > 0) {
        AppContext.grid.markTobeDragged();
        return e.preventDefault();
      }
    };
    AppContext.grid.zoomEventHandler = function(e, zoomDir) {
      var cssFile;
      Util.log.console('Zoom initiated!');
      Util.log.console('Resetting grid:');
      if (AppContext.grid.zoomValue + zoomDir >= 0 && AppContext.grid.zoomValue + zoomDir < AppContext.grid.ZOOM_ARRAY.length) {
        $('#hexagonal-grid').remove();
        $('.grid_css').remove();
        AppContext.grid.clearGridCache();
        cssFile = '/assets/stylesheets/grid-';
        if (zoomDir !== 0) {
          AppContext.grid.zoomValue = AppContext.grid.zoomValue + zoomDir;
          Util.log.console('Selected zoom level:');
          Util.log.console(AppContext.grid.ZOOM_ARRAY[AppContext.grid.zoomValue]);
          if (AppContext.grid.zoomValue >= AppContext.grid.DEFAULT_ZOOM) {
            cssFile = cssFile + AppContext.grid.ZOOM_ARRAY[AppContext.grid.zoomValue] + 'x.css';
          } else {
            cssFile = cssFile + '1-' + (1 / AppContext.grid.ZOOM_ARRAY[AppContext.grid.zoomValue]) + 'x.css';
          }
        } else {
          cssFile = cssFile + AppContext.grid.ZOOM_ARRAY[AppContext.grid.DEFAULT_ZOOM] + 'x.css';
        }
        Util.log.console('Appended file name: ');
        Util.log.console(cssFile);
        $('head').append('<link class="grid_css">');
        $('.grid_css').attr({
          rel: "stylesheet",
          type: "text/css",
          href: cssFile,
          "class": ''
        });
        $('body').append('<div id="hexagonal-grid"></div>');
        AppContext.grid.grid.tileHeight = AppContext.grid.defaultSize.height * AppContext.grid.ZOOM_ARRAY[AppContext.grid.zoomValue];
        AppContext.grid.grid.tileWidth = AppContext.grid.defaultSize.width * AppContext.grid.ZOOM_ARRAY[AppContext.grid.zoomValue];
        hex.grid.hexagonal.tileWidth = AppContext.grid.grid.tileWidth;
        hex.grid.hexagonal.tileHeight = AppContext.grid.grid.tileHeight;
        AppContext.grid.initApp();
        AppContext.grid.activateListeners();
        return AppContext.grid.displayAllPositions(AppContext.vizdata.getPositions());
      }
    };
    dragOnMouseMove = function(event) {
      var clonedelem, dx, dy, newx, newy, refdomelem;
      AppContext.grid.hideTooltip();
      if ((AppContext.grid.toDragRef !== '') && (AppContext.grid.toDragRef !== void 0)) {
        if ((AppContext.grid.toDragRefClone === void 0) || (AppContext.grid.toDragRefClone === '')) {
          refdomelem = $('#' + AppContext.grid.toDragRef.posId);
          AppContext.grid.toDragRefClone = $(refdomelem).clone();
          $(AppContext.grid.toDragRefClone).prependTo($(refdomelem));
          $(AppContext.grid.toDragRefClone).css("position", "fixed");
          $(AppContext.grid.toDragRefClone).css("z-index", "1010");
          $(AppContext.grid.toDragRefClone).css("opacity", "0.9");
        }
        dx = (event.pageX - 20) - $(AppContext.grid.toDragRefClone).position().left;
        dy = (event.pageY - 20) - $(AppContext.grid.toDragRefClone).position().top;
        newx = $(AppContext.grid.toDragRefClone).position().left + dx;
        newy = $(AppContext.grid.toDragRefClone).position().top + dy;
        $(AppContext.grid.toDragRefClone).css("left", newx + "px");
        $(AppContext.grid.toDragRefClone).css("top", newy + "px");
      }
      if (AppContext.grid.toDrag.length > 1) {
        clonedelem = '';
        if (AppContext.grid.clonesToDrag.length === 0) {
          $.each(AppContext.grid.toDrag, function(i, todrag) {
            var domelem;
            if (todrag.posId !== AppContext.grid.toDragRef.posId) {
              domelem = $('#' + todrag.posId);
              clonedelem = $(domelem).clone();
              $(clonedelem).prependTo($(domelem));
              $(clonedelem).css("position", "fixed");
              $(clonedelem).css("z-index", "1010");
              $(clonedelem).css("opacity", "0.9");
              return AppContext.grid.clonesToDrag.push(clonedelem);
            }
          });
        }
        return $.each(AppContext.grid.clonesToDrag, function(i, todragclone) {
          newx = $(todragclone).position().left + dx;
          newy = $(todragclone).position().top + dy;
          $(todragclone).css("left", newx + "px");
          return $(todragclone).css("top", newy + "px");
        });
      }
    };
    AppContext.grid.mousemovehandler = function(event) {
      if (AppContext.grid.toDrag !== '') {
        return dragOnMouseMove(event);
      }
    };
    isInArray = function(elem, array) {
      var toreturn;
      toreturn = false;
      $.each(array, function(i, member) {
        if (member.posId === elem.posId) {
          return toreturn = true;
        }
      });
      return toreturn;
    };
    AppContext.grid.markSelected = function() {
      return $.each(AppContext.grid.selectedElemPos, function(i, sel) {
        var domelem;
        domelem = $('#' + sel.posId);
        return $(domelem).css("opacity", "0.5");
      });
    };
    getCluster = function(nbelemcells, startIndex) {
      var currentIndex;
      currentIndex = startIndex;
      $.each(nbelemcells, function(i, nbelemcell) {
        var nbcells;
        if (i >= startIndex) {
          nbcells = AppContext.grid.getAllNeighbourCells({
            x: nbelemcell.x,
            y: nbelemcell.y
          });
          $.each(nbcells, function(j, nbcell) {
            var newnbelemcell;
            newnbelemcell = AppContext.vizdata.getPositionInCell(nbcell);
            if ((newnbelemcell !== '') && (!isInArray(newnbelemcell, nbelemcells))) {
              return nbelemcells.push(newnbelemcell);
            }
          });
        }
        return currentIndex = i;
      });
      if (currentIndex < nbelemcells.length - 1) {
        return getCluster(nbelemcells, currentIndex + 1);
      } else {
        return nbelemcells;
      }
    };
    AppContext.grid.selectCluster = function(e) {
      var nbelemcells, rightClickedelempos;
      nbelemcells = [];
      rightClickedelempos = AppContext.vizdata.getPositionInCell(AppContext.grid.rightClickedPos);
      if (rightClickedelempos !== '') {
        nbelemcells.push(rightClickedelempos);
      }
      AppContext.grid.selectedElemPos = getCluster(nbelemcells, 0);
      AppContext.grid.rightClickedelempos = rightClickedelempos;
      AppContext.grid.toDrag = [];
      return AppContext.grid.markSelected();
    };
    setRightClickedPos = function(event) {
      AppContext.grid.rightClickedPos = AppContext.grid.getGridPos(event);
      return console.log(AppContext.grid.rightClickedPos);
    };
    AppContext.grid.mousedownhandler = function(event) {
      if (event.which) {
        if (event.which === 3) {
          return setRightClickedPos(event);
        }
      } else if (even.button) {
        if (event.button === 3) {
          return setRightClickedPos(event);
        }
      }
    };
    AppContext.controls.handleNuggetDisplay = function(evt) {
      Util.log.console('Handling nugget display click');
      if ($('#edit_pane').css('display') === 'none') {
        $('#edit_pane').css('display', 'block');
        return AppContext.grid.addNuggetSection();
      } else {
        if ($('.edit_nuggets').css('display') === 'none') {
          return AppContext.grid.addNuggetSection();
        } else {
          return $('.cont_edit_pane').css('display', 'none');
        }
      }
    };
    return $("#hexagonal-grid").mousemove(function(event) {
      var domelem;
      if (AppContext.grid.downtile !== '') {
        AppContext.grid.hideTooltip();
        if (AppContext.grid.clonedelem === '') {
          domelem = $('#' + AppContext.grid.downtile.posId);
          $(domelem).removeClass("bordered");
          $(domelem).css("-webkit-clip-path", "");
          AppContext.grid.clonedelem = $(domelem).clone();
          $(AppContext.grid.clonedelem).prependTo($(domelem));
          $(AppContext.grid.clonedelem).css("position", "fixed");
          $(AppContext.grid.clonedelem).css("z-index", "1010");
          $(AppContext.grid.clonedelem).css("opacity", "0.9");
        }
        $(AppContext.grid.clonedelem).css("left", event.pageX - 20);
        return $(AppContext.grid.clonedelem).css("top", event.pageY - 20);
      }
    });
  });
}).call(this);

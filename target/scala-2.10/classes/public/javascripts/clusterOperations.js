(function() {
  var getNextPosId;
  getNextPosId = function() {
    return $.newUUID();
  };
  AppContext.cluster.updatePosition = function(datum, posx, posy) {
    var existingPosition, nbcells, nbelements, pos, posIdtoEdit, posid, position, relations;
    posid = getNextPosId();
    pos = {
      x: posx,
      y: posy
    };
    existingPosition = AppContext.vizdata.getPositionInCell(pos);
    if (existingPosition === '') {
      position = {
        posId: posid,
        x: posx,
        y: posy,
        elementId: datum
      };
      AppContext.vizdata.addPosition(position);
      nbelements = [];
      nbcells = AppContext.grid.getAllNeighbourCells(pos);
      return $.each(nbcells, function(i, nbcell) {
        var rel, targetPosition, targetelem;
        targetelem = AppContext.vizdata.getElementInCell(nbcell);
        if (targetelem !== '') {
          targetPosition = AppContext.vizdata.getPositionInCell(nbcell);
          rel = {
            srcElementId: datum,
            targetElementId: targetelem,
            srcPosId: posid,
            targetPosId: targetPosition.posId
          };
          return AppContext.vizdata.addRelation(rel);
        }
      });
    } else {
      position = {
        posId: existingPosition.posId,
        x: posx,
        y: posy,
        elementId: datum
      };
      posIdtoEdit = existingPosition.posId;
      AppContext.vizdata.removePosition(existingPosition);
      AppContext.vizdata.addPosition(position);
      relations = AppContext.vizdata.getRelations();
      return $.each(relations, function(i, relation) {
        var newRelation;
        if (relation.srcPosId === posIdtoEdit) {
          newRelation = {
            srcElementId: datum,
            targetElementId: relation.targetElementId,
            srcPosId: relation.srcPosId,
            targetPosId: relation.targetPosId
          };
          AppContext.vizdata.removeRelation(relation);
          return AppContext.vizdata.addRelation(newRelation);
        } else if (relation.targetPosId === posIdtoEdit) {
          newRelation = {
            srcElementId: relation.srcElementId,
            targetElementId: datum,
            srcPosId: relation.srcPosId,
            targetPosId: relation.targetPosId
          };
          AppContext.vizdata.removeRelation(relation);
          return AppContext.vizdata.addRelation(newRelation);
        }
      });
    }
  };
  AppContext.cluster.deletePosition = function(posx, posy) {
    var relations, todel;
    todel = AppContext.vizdata.getPositionInCell({
      x: posx,
      y: posy
    });
    AppContext.vizdata.removePosition(todel);
    relations = AppContext.vizdata.getRelations();
    return $.each(relations, function(i, relation) {
      if ((relation.srcPosId === todel.posId) || (relation.targetPosId === todel.posId)) {
        return AppContext.vizdata.removeRelation(relation);
      }
    });
  };
}).call(this);

'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {
  // --- below is for UI Template ----
  $scope.msg = {};
  const cxAttr = "cx-type";
  const cxMove = "cx_move";
  const cxColor = "cx_color";
  const cxStatus = "cx_status";
  const cxHide = "cx_hide";
  const cxStroke = "cx_stroke";
  // --- END ----

  $scope.selectedColorEl = null;
  $scope.color = {
    red: 0,
    green: 0,
    blue: 0
  };

  $scope.changeColor = function() {
    if (!$scope.selectedColorEl) return;
    $scope.msg = { payload: 'rgb(' + Object.values($scope.color).join(',') + ')', topic: $scope.selectedColorEl };
  };

  $scope.selectedOnOffEl = null;
  $scope.switchOn = function(_value) {
    if (!$scope.selectedOnOffEl) return;
    const color = (_value) ? '#eaeaea' : '#8b8b8b';
    $scope.msg = { payload: color, topic: $scope.selectedOnOffEl };
  };

  $scope.position = {
    x: 0,
    y: 0,
    deg: 0
  };
  $scope.selectedMoveEl = null;
  $scope.changePosition = function() {
    if (!$scope.selectedMoveEl) return;
    const config = {
      x: $scope.position.x,
      y: $scope.position.y,
      deg: $scope.position.deg
    };
    $scope.msg = { payload: config, topic: scope.selectedMoveEl.split("@")[0] + "@" + cxMove};
  };
  $scope.zeroPosition = function(key) {
    $scope.position[key] = 0;
    $scope.changePosition();
  };

  $scope.selectedStatusEl = null;
  $scope.newStatus = 'Running';
  $scope.changeStatus = function() {
    if (!$scope.selectedStatusEl) return;
    $scope.msg = { payload: $scope.newStatus, topic: $scope.selectedStatusEl };
  };

  $scope.selectedHideEl = null;
  $scope.hide = function(toHide) {
    if (!$scope.selectedHideEl) return;
    $scope.msg = { payload: toHide, topic: scope.selectedHideEl.split("@")[0] + "@" + cxHide };
  };

  $scope.combinedEl = null;
  let combinedElRequest = false;
  $scope.mixedAnimation = function() {
    if (!$scope.combinedEl) return;
    combinedElRequest = !combinedElRequest;
    const color = (combinedElRequest) ? '#eaeaea' : '#8b8b8b';
    const text = (combinedElRequest) ? 'Running' : 'Stopped';
    $scope.msg = {
      payload: [
        {payload: color, topic: $scope.combinedEl.split("@")[0] + "@" + cxColor},
        {payload: text, topic: $scope.combinedEl.split("@")[0] + "@" + cxStatus}
      ]
    }
  };

  $scope.stroke = {
    color: "",
    width: 1
  };
  $scope.selectedStrokeEl = null;
  $scope.changeStroke = function(color, width) {
    if (!$scope.selectedStrokeEl) return;
    const config = {
      color: (color != null) ? color : $scope.stroke.color,
      width: (width != null) ? width : $scope.stroke.width
    };
    $scope.msg = { payload: config, topic: scope.selectedStrokeEl.split("@")[0] + "@" + cxStroke};
  };


}]);

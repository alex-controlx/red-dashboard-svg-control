'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', function($scope) {

  // --- below is for UI Template ----
  $scope.msg = {};
  $scope.msgOut = null;

  const cxAttr = "cx-type";
  const cxMove = "move";
  const cxColor = "color";
  const cxStatus = "status";
  const cxHide = "hide";
  const cxStroke = "stroke";
  // --- END ----
  let buttonCount = 0;

  $scope.send = function(msg) {
    if (typeof msg === "object") msg.count = buttonCount;
    buttonCount++;
    $scope.msgOut = msg;
    $scope.$apply();
  };


  $scope.selectedColorEl = null;
  $scope.color = {
    red: 0,
    green: 0,
    blue: 0
  };

  $scope.changeColor = function() {
    if (!$scope.selectedColorEl) return;
    $scope.msg = {
      payload: 'rgb(' + Object.values($scope.color).join(',') + ')',
      topic: $scope.selectedColorEl + "@" + cxColor
    };
  };

  $scope.selectedOnOffEl = null;
  $scope.switchOn = function(_value) {
    if (!$scope.selectedOnOffEl) return;
    const color = (_value) ? '#eaeaea' : '#8b8b8b';
    $scope.msg = { payload: color, topic: $scope.selectedOnOffEl + "@" + cxColor};
  };

  $scope.position = {
    x: 0,
    y: 0,
    deg: 0,
    pivotX: 0,
    pivotY: 0,
    pivotType: null // "abs", "relBox", "relParBox"
  };
  $scope.selectedMoveEl = null;
  $scope.changePosition = function() {
    if (!$scope.selectedMoveEl) return;
    const config = {
      x: $scope.position.x,
      y: $scope.position.y,
      deg: $scope.position.deg,
      pivotX: $scope.position.pivotX,
      pivotY: $scope.position.pivotY,
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
    $scope.msg = { payload: $scope.newStatus, topic: $scope.selectedStatusEl + "@" + cxStatus};
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
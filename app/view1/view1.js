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
  // --- END ----

  $scope.selectedColorEl = null;
  $scope.color = {
    red: 0,
    green: 0,
    blue: 0
  };

  $scope.changeColor = function() {
    if (!$scope.selectedColorEl) return;
    $scope.msg = { payload: 'rgb(' + Object.values($scope.color).join(',') + ')', topic: cxColor + "@" + $scope.selectedColorEl };
  };

  $scope.selectedOnOffEl = null;
  $scope.switchOn = function(_value) {
    if (!$scope.selectedOnOffEl) return;
    const color = (_value) ? '#eaeaea' : '#8b8b8b';
    $scope.msg = { payload: color, topic: cxColor + "@" + $scope.selectedOnOffEl };
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
    $scope.msg = { payload: config, topic: cxMove + "@" + $scope.selectedMoveEl };
  };
  $scope.zeroPosition = function(key) {
    $scope.position[key] = 0;
    $scope.changePosition();
  };

  $scope.selectedStatusEl = null;
  $scope.newStatus = 'Running';
  $scope.changeStatus = function() {
    if (!$scope.selectedStatusEl) return;
    $scope.msg = { payload: $scope.newStatus, topic: cxStatus + "@" + $scope.selectedStatusEl };
  };

  $scope.selectedHideEl = null;
  $scope.hide = function(toHide) {
    if (!$scope.selectedHideEl) return;
    $scope.msg = { payload: toHide, topic: cxHide + "@" + $scope.selectedHideEl };
  };

}]);

// old way
function getMatrix(config, box) {
  // x: 51.95399475097656, y: 54.69599914550781, width: 94.41000366210938, height: 94.41000366210938

  if (!config || !box) return;

  const tx = config.x || 0;
  const ty = config.y || 0;
  const deg = config.deg || 0;

    const centre = {
    x: box.x + box.width/2 || 0,
    y: box.y + 0 || 0
  };

  const translation = {
    x: tx,
    y: ty
  };
  const scaling = {
    x: 1, // 1.5,
    y: 1 // 1.5

  };
  const angleInRadians = deg * (Math.PI / 180);
  const translationMatrix = [
    [1, 0, translation.x],
    [0, 1, translation.y],
    [0, 0, 1]
  ];
  const scalingMatrix = [
    [scaling.x, 0, 0],
    [0, scaling.y, 0],
    [0, 0, 1]
  ];
  const rotationMatrix = [
    [ Math.cos(angleInRadians), -Math.sin(angleInRadians), (-Math.cos(angleInRadians) * centre.x + Math.sin(angleInRadians) * centre.y + centre.x) ],
    [ Math.sin(angleInRadians), Math.cos(angleInRadians), (-Math.sin(angleInRadians) * centre.x - Math.cos(angleInRadians) * centre.y + centre.y) ],
    [ 0, 0, 1 ]
  ];

  const transformMatrix = multiply(multiply(translationMatrix, scalingMatrix), rotationMatrix);

  // matrix(0.594088, -0.516432, 0.62601, 0.720144, -223.586029, 145.949615)
  return `matrix(` +
      `${transformMatrix[0][0]}, ` +
      `${transformMatrix[1][0]}, ` +
      `${transformMatrix[0][1]}, ` +
      `${transformMatrix[1][1]}, ` +
      `${transformMatrix[0][2]}, ` +
      `${transformMatrix[1][2]}` +
      `)`;

  function multiply(a, b) {
    const aNumRows = a.length, aNumCols = a[0].length, bNumCols = b[0].length, m = new Array(aNumRows);  // initialize array of rows
    for (let r = 0; r < aNumRows; ++r) {
      m[r] = new Array(bNumCols); // initialize the current row
      for (let c = 0; c < bNumCols; ++c) {
        m[r][c] = 0;             // initialize the current cell
        for (let i = 0; i < aNumCols; ++i) {
          m[r][c] += a[r][i] * b[i][c];
        }
      }
    }
    return m;
  }
}

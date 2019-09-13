'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');
      $routeProvider.otherwise({redirectTo: '/view1'});
    }])
    .directive('uiTemplate', [function () {
        return {
            restrict: 'E',
            // transclude: true,
            // scope: true,
            templateUrl: './view1/ui_template.html',
            link: function(scope) {
                // console.log(scope);
            }
        }
    }]);

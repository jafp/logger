'use strict';

var app = angular.module('logger', ['logger.services']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider.when('/', {controller: IndexCtrl, templateUrl: 'pages/index.html'}).
		otherwise({redirectTo: '/'});

	$locationProvider.html5Mode(true);
}]);
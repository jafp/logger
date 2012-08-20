'use strict';	

function AppCtrl($scope, socket) {
	$scope.version = '0.0001';
	
	// Empty log entry
	// Status is per default success
	$scope.log = { status: 'success' };

	$scope.addLog = function() {
		var log = $scope.log;
		log.date = new Date().toString();

		$scope.log = { status: 'success' };

		socket.emit('log:add', log);
	};
}

function IndexCtrl($scope, socket) {

	socket.on('log:change', function(data) {
		$scope.logs = data;
	});

}
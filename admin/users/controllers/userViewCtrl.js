'use strict';
mimicTrading.controller('userViewCtrl', ['$scope', '$state', 'RestSvr', 'loginSrv', '$rootScope', '$log','trader', 'Upload','$location','appSvr',
	function($scope, $state, RestSvr, loginSrv, $rootScope, $log, trader, Upload, $location, appSvr){
		$scope.$on('$viewContentLoaded', function() {
			/**
			 * Initialize the jquery components when view contents loaded properly
			 */
			appSvr.init();
		});

		/**
		 * Request would only sent if state params has id
		 * @param  {integer} $state.params.id [user id]
		 * @return {Object}                  [user data]
		 */
        $scope.userinfo = trader.user;

		/**
		 * it would take you to the edit page
		 * 
		 */
		$scope.goToEdit = function () {
			$state.go('edituser', {id: $state.params.id});
		};

		$scope.goBack = function () {
			var queryString = $location.search();
			$state.go((queryString) ? ((queryString.back === 'strategies') ? 'strategies':'users'):'users');
		};
	}
]);

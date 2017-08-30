'use strict';
mimicTrading.controller('emailLogsViewCtrl', ['$scope', '$state', 'RestSvr', 'appSvr', '$rootScope','emailLog',
	($scope, $state, RestSvr, appSvr, $rootScope, emailLog) => {
		$scope.$on('$viewContentLoaded', () => {
			/**
			 * Initialize the jquery components when view contents loaded properly
			 */
			appSvr.init();
		});

		$scope.logs = emailLog.records;

		/**
		 * Get contract by id using contract resolver and service contractSvr.getContractById
		 * @type {Object}
		 */
		// $scope.instrument = contract.records;

        $scope.goToEdit = () => {
            $state.go('editContract', {id: $state.params.id});
        };
	}
]);

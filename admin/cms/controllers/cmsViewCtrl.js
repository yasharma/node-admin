'use strict';
mimicTrading.controller('cmsViewCtrl', ['$scope', '$state', 'RestSvr', '$rootScope','appSvr','cms',
	($scope, $state, RestSvr, $rootScope, appSvr, cms) => {
		
		$scope.$on('$viewContentLoaded', () => {
			/**
			 * Initialize the jquery components when view contents loaded properly
			 */
			appSvr.init();
		});
		$scope.cms = cms.records;

		$scope.goToEdit = () => $state.go('cms',{id: $scope.cms.id});
	}
]);

'use strict';
mimicTrading.controller('cmsViewCtrl', ['$scope', '$state', 'RestSvr', '$rootScope','appSvr','cms',
	($scope, $state, RestSvr, $rootScope, appSvr, cms) => {
		
		$scope.$on('$viewContentLoaded', () => {
			/**
			 * Initialize the jquery components when view contents loaded properly
			 */
			appSvr.init();
		});
		
		$scope.cms = cms.record;
		
		$scope.goToEdit = () => $state.go('editCms',{id: $scope.cms.type});
	}
]);

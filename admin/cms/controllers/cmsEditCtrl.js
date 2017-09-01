'use strict';
mimicTrading.controller('cmsEditCtrl', ['$scope', '$state', 'RestSvr', '$rootScope','appSvr','cms',
	($scope, $state, RestSvr, $rootScope, appSvr, cms) => {
		
		$scope.$on('$viewContentLoaded', () => {
			/**
			 * Initialize the jquery components when view contents loaded properly
			 */
			appSvr.init();
		});
		$scope.cms = cms.records;
		
		$scope.edit_cms = (isValid) => {
			if( !isValid ){
				return;
			}
			
			$scope.isLoading = true;
			RestSvr.post('cms/edit/', $scope.cms)
			.then(response => {
				$state.go('cms');
			})
			.catch(errors => {
				App.alert({type: ('danger'), icon: ( 'warning'), message: errors.message, container: $rootScope.settings.errorContainer, place: 'prepend'});
			})
			.then(() => {
				$scope.isLoading = false;
			});
		};
	}
]);

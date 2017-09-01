'use strict';
mimicTrading.controller('cmsEditCtrl', ['$scope', '$state', 'RestSvr', '$rootScope','appSvr','cms','cmsSvr',
	($scope, $state, RestSvr, $rootScope, appSvr, cms, cmsSvr) => {
		
		$scope.$on('$viewContentLoaded', () => {
			/**
			 * Initialize the jquery components when view contents loaded properly
			 */
			appSvr.init();
		});
		$scope.cms_type = cmsSvr.getCmsTypes();
		$scope.cms = cms.record;
		
		$scope.edit_cms = (isValid) => {
			if( !isValid ){
				return;
			}
			
			$scope.isLoading = true;
			RestSvr.put('cms/edit', $scope.cms)
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

'use strict';
angular.module('mimicTrading').controller('dashboardCtrl', ['$scope', '$location', '$rootScope',
	function($scope, $location, $rootScope){
		$scope.$on('$viewContentLoaded', function() {   
		        // initialize core components
	        App.initAjax();
	    });

	    // set sidebar closed and body solid layout mode
	    $rootScope.settings.layout.pageContentWhite = true;
	    $rootScope.settings.layout.pageBodySolid = false;
	    $rootScope.settings.layout.pageSidebarClosed = false;
	    $rootScope.settings.hideLoginForm = true;
	    console.log('I am loaded properly!!!');
	}
]);
'use strict';
mimicTrading.controller('customerViewCtrl', ['$scope','customer', '$state','appSvr',
	function($scope, customer, $state, appSvr){
		
		$scope.$on('$viewContentLoaded', function() {
			/**
			 * Initialize the jquery components when view contents loaded properly
			 */
			appSvr.init();
		});

		/**
		 * Get the customer by id using router resolver
		 * @type {Object}
		 */
		$scope.customerinfo = customer.user;

		/**
		 * it would take you to the edit page
		 * 
		 */
		$scope.goToEdit = function () {
			$state.go('editCustomer', {id: $state.params.id});
		};
	}
]);
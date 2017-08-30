'use strict';
mimicTrading.controller('customerEditCtrl', ['$scope', '$state', 'RestSvr', 'loginSrv', '$rootScope', '$log','$timeout', 'Upload','appSvr','customer',
	function($scope, $state, RestSvr, loginSrv, $rootScope, $log, $timeout, Upload, appSvr, customer){
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
		$scope.customer = customer.user;	

		/**
		 * Check if form is valid and send the data to server
		 * @param  {isValid} isValid [form.valid]
		 * @return {redirect to user listing on successful insertion}
		 */
		$scope.edit_customer = function (isValid) {
			if( !isValid ){
				App.scrollTop();
				return;
			}
			// We need to manaually assign user type to user's scope
			// for customer the value is 1 (customer -> 1)
			_.assign($scope.customer, {user_type: 1});

			var customer = {};
			if( !angular.isObject($scope.customer.profile_img) ){
				angular.copy($scope.customer, customer);
				delete customer.profile_img;
			} else {
				customer = $scope.customer;
			}
			
			$scope.isLoading = true;
			Upload.upload({
				url: baseUrl('customer/edit/' + customer.id),
				data: customer
			})
			.then(function (response) {
				$state.go('customers');
			})
			.catch(function (error) {
				if( error.data ) {
					angular.forEach(error.data, function (value, prop) {
						$scope.editCustomerForm[prop].$setValidity('unique', false);
					});
					App.scrollTop();
				}
			})
			.finally(function () {
				$scope.isLoading = false;
			});
		};

		/**
		 * this will clear the
		 * @param  input name attr
		 */
		$scope.clear = function (name, form) {
			form[name].$setValidity('unique', true);
		};
	}
]);
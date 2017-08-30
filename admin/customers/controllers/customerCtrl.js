'use strict';
mimicTrading.controller('customerCtrl', ['$scope', '$state', 'RestSvr', 'loginSrv', '$rootScope', '$log','$timeout', 'Upload', 'marketTradedSvr','appSvr',
	function($scope, $state, RestSvr, loginSrv, $rootScope, $log, $timeout, Upload, marketTradedSvr, appSvr){
		
		$scope.$on('$viewContentLoaded', function() {
			/**
			 * Initialize the jquery components when view contents loaded properly
			 */
			appSvr.init();
		    

		     /**
		     * only Intialize datatable if current state is customers
		     * @param  {String} $state.current.name [current state name]
		     */
		    if($state.current.name === 'customers'){
			    // Intialize datatable
			    TableAjax.init({
			    	url: 'user/listing/1',
			    	columns: [
		                { "data": "id", "orderable": false },
		                { "data": "first_name" },
		                { "data": "last_name" },
		                { "data": "email" },
		                { "data": "status" },
		                { "data": "date_joined" },
		                { "data": "action", "orderable": false }
		            ]
			    });
			}    
		});

		/**
		 * Check if form is valid and send the data to server
		 * @param  {isValid} isValid [form.valid]
		 * @return {redirect to user listing on successful insertion}
		 */
		$scope.new_customer = function (isValid) {
			if( !isValid ){
				App.scrollTop();
				return;
			}

			// We need to manaually assign user type to user's scope
			// for customer the value is 1 (customer -> 1)
			_.assign($scope.customer, {user_type: 1});

			$scope.isLoading = true;
			Upload.upload({
				url: baseUrl('customer/add/'),
				data: $scope.customer
			})
			.then(function (response) {
				$state.go('customers');
			})
			.catch(function (errors) {
				if( errors.data ) {
					angular.forEach(errors.data, function (value, prop) {
						$scope.newCustomerForm[prop].$setValidity('unique', false);
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
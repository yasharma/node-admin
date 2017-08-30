'use strict';
mimicTrading.controller('userEditCtrl', ['$scope', '$state', 'RestSvr', 'loginSrv', '$rootScope', '$log','trader', 'Upload', 'marketTradedSvr','appSvr',
	function($scope, $state, RestSvr, loginSrv, $rootScope, $log, trader, Upload, marketTradedSvr, appSvr){
		$scope.$on('$viewContentLoaded', function() {
			/**
			 * Initialize the jquery components when view contents loaded properly
			 */
			appSvr.init();
		});

		$scope.user = trader.user;

		/**
		* Market Traded values from service
		* only if state is new ie when we are on page for new trader info
		*/
		
		// marketTradedSvr.getValue()
		// .then(function (response) {
		// 	$scope.marketTraded = response.records;
		// })
		// .catch(function (errors) {
		// 	App.alert({type: ('danger'), icon: ( 'warning'), message: errors.message, container: $rootScope.settings.tableContainer, place: 'prepend'});
		// });

		/**
		 * Check if form is valid and send the data to server
		 * @param  {isValid} isValid [form.valid]
		 * @return {redirect to user listing on successful insertion}
		 */
		$scope.edit_user = function (isValid) {

			if( !isValid ){
				App.scrollTop();
				return;
			}
			// We need to manaually assign user type to user's scope
			// for trader the value is 2 (trader -> 2)
			_.assign($scope.user, {user_type: 2});

			var user = {};
			if( !angular.isObject($scope.user.profile_img) ){
				angular.copy($scope.user, user);
				delete user.profile_img;
			} else {
				user = $scope.user;
			}
			
			$scope.isLoading = true;
			Upload.upload({
				url: baseUrl('user/edit/' + user.id),
				data: user
			})
			.then(function (response) {
				$state.go('users');
			})
			.catch(function (error) {
				if( error.data ) {
					angular.forEach(error.data, function (value, prop) {
						$scope.editUserForm[prop].$setValidity('unique', false);
					});
					App.scrollTop();
				}
			})
			.finally(function () {
				$scope.isLoading = false;
			});
		};

		/**
		 * this will clear the form error
		 * @param  input name attr
		 */
		$scope.clear = function (name, form) {
			form[name].$setValidity('unique', true);
		};
	}
]);

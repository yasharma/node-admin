'use strict';

mimicTrading.directive('notificationPanel', ['notificationSvr', '$location','$rootScope', 
	function(notificationSvr, $location, $rootScope) {
		return {
			restrict: 'A',
			link: function (scope, elem) {
				notificationSvr.getNotificationList()
				.then(({records, paging}) => {
					scope.notifications = records;
					return notificationSvr.getNotificationCount();
				})
				.then($rootScope.manageCount)
				.catch(errors => console.log(errors));
			},
			templateUrl: 'notifications/directives/notification-panel.html'
		};
	}
]);	
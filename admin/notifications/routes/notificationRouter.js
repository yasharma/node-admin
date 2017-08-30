'use strict';

/* Application routes */
mimicTrading.config(['$stateProvider',($stateProvider) => {

	$stateProvider
	.state('notifications',{
		url: '/notifications',
		controller: 'notificationCtrl',
		templateUrl: '/admin/notifications/views/notifications.html',
		data: {pageTitle: 'Notifications'},
		resolve: {
		    deps: ['$ocLazyLoad', ($ocLazyLoad) => {
		        return $ocLazyLoad.load({
		            name: 'mimicTrading',
		            insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
		            files: [
		                'apps/css/inbox.css', 
		            ] 
		        });
		    }],
		    notifications: ['notificationSvr', (notificationSvr) => notificationSvr.getNotificationList()]
		},
		authenticate: true
	});
}]);
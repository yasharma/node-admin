'use strict';

/* Application routes */
mimicTrading.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider){
	 // the known route
    $urlRouterProvider.when('', '/');

    // For any unmatched url, send to 404
    //$urlRouterProvider.otherwise('/404');
    $urlRouterProvider.otherwise(function($injector, $location){
	   var state = $injector.get('$state');
	   state.go('404');
	   return $location.path();
	});
    
	$stateProvider
	.state('login',{
		url: '/',
		controller: 'loginCtrl',
		templateUrl: 'login/views/login.html',
		authenticate: false,
		data: {pageTitle: 'Login'},
		resolve: {
		    deps: ['$ocLazyLoad', function($ocLazyLoad) {
		        return $ocLazyLoad.load({
		            name: 'mimicTrading',
		            insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
		            files: [
		                'css/admin-login-style.css'
		            ] 
		        });
		    }]
		},
	})
	.state('dashboard',{
		url: '/dashboard',
		controller: 'dashboardCtrl',
		templateUrl: 'dashboard/views/dashboard.html',
		data: {pageTitle: 'Dashboard', smallTitle: 'dashboard & statistics'},
		resolve: {
		    deps: ['$ocLazyLoad', function($ocLazyLoad) {
		        return $ocLazyLoad.load({
		            name: 'mimicTrading',
		            insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
		            files: [
		                'global/plugins/morris/morris.css',                            
		                'global/plugins/morris/morris.min.js',
		                'global/plugins/morris/raphael-min.js',                            
		                'global/plugins/jquery.sparkline.min.js',

		                'pages/scripts/dashboard.min.js',
		            ] 
		        });
		    }]
		},
		authenticate: true
	})
	.state('404',{
		templateUrl: 'tpl/404.html',
		data: {pageTitle: '404 Page Not Found'},
		authenticate: false,
		resolve: {
		    deps: ['$ocLazyLoad', function($ocLazyLoad) {
		        return $ocLazyLoad.load({
		            name: 'mimicTrading',
		            insertBefore: '#ng_load_plugins_before',
		            files: [
		                'pages/css/error.min.css',
		            ] 
		        });
		    }]
		},
	})
	.state('500',{
		templateUrl: '/admin/tpl/500.html',
		data: {pageTitle: '500 Internal Server Error'},
		authenticate: false,
		resolve: {
		    deps: ['$ocLazyLoad', function($ocLazyLoad) {
		        return $ocLazyLoad.load({
		            name: 'mimicTrading',
		            insertBefore: '#ng_load_plugins_before',
		            files: [
		                'pages/css/error.min.css',
		            ] 
		        });
		    }]
		},
	});
}]);
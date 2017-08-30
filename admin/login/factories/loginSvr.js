'use strict';

mimicTrading.factory('loginSrv', ['localStorageService', '$rootScope', function(localStorageService, $rootScope)  { // Don't use arrow function here because it will change the "this" to undefined
    return {
    	isLogged: false,
    	initAdminSession: function(admin, token) { // Don't use arrow function here because it will change the "this" to undefined
    		this.isLogged = true;
    		localStorageService.set('token', token);
    		localStorageService.set('admin', admin);
    		$rootScope.admin = localStorageService.get('admin');
    	},
    	getToken: () => localStorageService.get('token')
    };
}]);

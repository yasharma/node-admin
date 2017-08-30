'use strict';

/* Application config */
/*Angular interceptors are service factories that are registered with the $httpProvider */
mimicTrading.config(['$httpProvider', function($httpProvider){
	var interceptor = ['$q', '$rootScope', 'loginSrv',function ($q, $rootScope, loginSrv) {
        return {
        	request: function (config) {
                // TRUE (Authorization: Token 205468286028d2d9df99a2f8f7a423220ef44452)
                config.headers = config.headers || {};
                var token = loginSrv.getToken();
                
                if (token) {
                    config.headers.Authorization = 'Token '+ token;
                    loginSrv.isLogged = true;
                }
	           	return config;
	       	},

            requestError: function (rejection) {
                return $q.reject(rejection);
            },

            response: function (response) {
                return response || $q.when(response);
            },

            // Revoke client authentication if 400 is received
            responseError: function (rejection) {
                if( 'onLine' in navigator ){
                    if( !navigator.onLine ){
                        $rootScope.$broadcast('server_error',{message:'ERR_INTERNET_DISCONNECTED'});
                        return;    
                    }
                }
                if(rejection.status === 401) {
                    if(rejection.data.detail === 'Invalid token.') {
                        $rootScope.$broadcast('server_error',{message:'Your Session has been expired, please login again to continue.', status_code: 401});
                        return;
                    }
                }
                
                if(rejection.status <= 0) {
                    $rootScope.$broadcast('server_error',{message:'ERR_CONNECTION_REFUSED'});
                    return;
                }
                return $q.reject(rejection);
            }
        };
    }];

	$httpProvider.interceptors.push(interceptor);
}])
.config(['$compileProvider', function ($compileProvider) {
  $compileProvider.debugInfoEnabled(false);
}])
.config(['laddaProvider', function (laddaProvider) {
    laddaProvider.setOption({
        style: 'zoom-in',
    });
}])
.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}])
.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}])
.config(['localStorageServiceProvider', function(localStorageServiceProvider){
    var hostname = window.location.hostname;
    var prefix;
    switch(hostname){
        case 'localhost': 
        case 'local.mimic.com':
        prefix = 'localAdmin';
        break;

        default:
        prefix = 'prodAdmin';
    }
    localStorageServiceProvider.setPrefix(prefix);
}])
.run(['$location','$rootScope','loginSrv','$state','localStorageService','$timeout','$injector','notificationSvr',
	function($location, $rootScope, loginSrv, $state,localStorageService, $timeout, $injector, notificationSvr){

		$rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            $rootScope.isPageLoading = true; 
            if (toState.authenticate && !loginSrv.isLogged && !localStorageService.get('admin')){
                loginSrv.isLogged = false;
                $state.go("login");
                event.preventDefault(); 
            }else {
                var token = localStorageService.get('token');
                if($location.path() === '/' && token ){
                    $location.path('/dashboard');
                }
            }
		});

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            $rootScope.isPageLoading = false;
        });

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            if( error.errors ) {
                /**
                 * This will help in resolve 500 state
                 * without url change
                 */
                let state = $injector.get('$state');
                state.go('500');
                App.alert({type: ('danger'), icon: ( 'warning'), message: error.message, container: $rootScope.settings.errorContainer, place: 'prepend'});
                return $location.path();
            }
        });

        /* This will logout the admin from the application */
        $rootScope.clearToken = function () {
            localStorageService.remove('token');
            localStorageService.remove('admin');
            delete $rootScope.admin;
            loginSrv.isLogged = false;
            $state.go("login");
        };

        // Set the admin for entire application
        $rootScope.admin = localStorageService.get('admin');

        // If any global error occured
        $rootScope.$on('server_error', function (event, res) {
            
            if(res.status_code){
                if(res.status_code === 401){
                    $rootScope.clearToken();
                }
            }
            $rootScope.server_error_message = res.message;
        });

        $rootScope.manageCount = (data) => {
            if( data ) {
                $rootScope.notificationCount = data.records.count;    
            } else {
                if( $rootScope.notificationCount > 0 ) {
                    $rootScope.notificationCount -= 1;
                }
            }
        };

        $rootScope.goToNotificationUrl = (data) => {
            notificationSvr.markAsRead([data.id])
            .then(response => {
                $rootScope.manageCount();
                $location.path(data.url);
            })
            .catch(errors => App.alert({type: ('danger'), icon: ( 'warning'), message: errors.message, container: $rootScope.settings.errorContainer, place: 'prepend'}));
        };
    }
]);

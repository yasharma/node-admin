'use strict';

mimicTrading.factory('RestSvr', ['$http', '$window', '$httpParamSerializerJQLike','$q',
	($http, $window, $httpParamSerializerJQLike, $q) => {
		return{
			login: (apiUrl, data) => {
				var req = {
					method: 'POST',
					url: baseUrl(apiUrl),
				 	data: data
				};
				return $q((resolve, reject) => {
					$http(req).then(response => {
						resolve({
							result: response.data.message, 
							user: response.data.user,
							token: response.data.token
						});
					})
					.catch(response => {
						reject({
							errors: true,
							message: response.data.errors.message || 'Internal Server Error',
						});
					});
				});
			},
			get: (apiUrl, params) => {
				let p = !angular.isUndefined(params) ? params : null,
				req = {
					method: 'GET',
					url: baseUrl(apiUrl),
				 	params: p
				};
				
				return $q((resolve, reject) => {
					$http(req).then(response => {
						resolve({
							record: response.data.data
						});
					})
					.catch(response => {
						reject({
							errors: true,
							message: response.data.message || 'Internal Server Error',
						});
					});	
				});
			},
			post: (apiUrl, data) => {
				let req = {
					method: 'POST',
					url: baseUrl(apiUrl),
				 	data: data
				};
				return $q( (resolve, reject) => {
					$http(req).then(response => {
						resolve({
							result: response.data.message, 
							user: response.data.user,
							records: response.data.result
						});
					})
					.catch(response => {
						let message = 'Internal Server Error';
						if( response.status === 404 ){
							message = '404 Route not found';
						}
						reject({
							message: response.data.message || response.data.detail || message,
							status: response.status
						});
					});	
				});
			},
			paginate: (apiUrl, data, params) => {
				let req = {
					method: 'POST',
					url: baseUrl(apiUrl),
				 	data: data,
				 	params: params
				};
				return $q((resolve, reject) => {
					$http(req).then(response => {
						resolve({
							records: response.data.result,
							paging: response.data.paging
						});
					})
					.catch(errors => {
						let message = 'Internal Server Error';
						if( errors.status === 404 ){
							message = '404 Route not found';
						}
						reject({
							data: errors.data,
							message: errors.data.message || errors.data.detail || message,
						});
					});
				});	
			},
		};
	}
]);

function baseUrl(apiUrl) {
	var protocol = window.location.protocol;
	var baseUrl = (window.location.hostname === 'localhost') ? protocol + '//' + 'localhost:9000' : protocol + '//' + '130.211.224.61:8010';
	return 	baseUrl + '/adminapi/' + apiUrl;
}

function prefix(item) {
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
    return localStorage.getItem(prefix + '.' + item);
}
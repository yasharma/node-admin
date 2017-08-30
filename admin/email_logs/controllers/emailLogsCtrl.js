'use strict';
mimicTrading.controller('emailLogsCtrl', ['$scope', '$state', 'RestSvr', '$rootScope','appSvr',
	($scope, $state, RestSvr, $rootScope, appSvr) => {
		
		$scope.$on('$viewContentLoaded', () => {
			/**
			 * Initialize the jquery components when view contents loaded properly
			 */
			appSvr.init();			

		    TableAjax.init({
		    	url: 'email/logs/listing/',
		    	columns: [
	                { "data": "id", "orderable": false },
                    { "data": "email" },
                    { "data": "type" },
                    { "data": "timestamp" },
                    { "data": "action", "orderable": false }
	            ]
		    });
		});
	}
]);

'use strict';

/* Application routes */
mimicTrading.config(['$stateProvider',function($stateProvider){

	//let detailObjResolver = ['contractSvr', (contractSvr) => contractSvr.getData()];

	$stateProvider
	.state('emailLogs',{
		url: '/email-logs',
		controller: 'emailLogsCtrl',
		templateUrl: '/admin/email_logs/views/email_logs_listing.html',
		data: {pageTitle: 'Email Logs'},
		resolve: {
		    deps: ['$ocLazyLoad', function($ocLazyLoad) {
		        return $ocLazyLoad.load({
		            name: 'mimicTrading',
		            insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
		            files: [
		                '/assets/global/plugins/datatables/datatables.min.css', 
                        '/assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
                        '/assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                        '/assets/global/plugins/datatables/datatables.all.min.js',
                        '/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                        '/assets/global/scripts/datatable.min.js'
		            ] 
		        });
		    }]
		},
		authenticate: true
	})
	.state('viewEmailLogs',{
		url: '/view-logs/:id',
		controller: 'emailLogsViewCtrl',
		templateUrl: '/admin/email_logs/views/view_email_logs.html',
		data: {pageTitle: 'View instrument Detail'},
		authenticate: true,
		resolve: {
		    emailLog: ['$stateParams', 'emailLogsSvr', ($stateParams, emailLogsSvr) => emailLogsSvr.getLogsList($stateParams.id)]
		}
	});
}]);

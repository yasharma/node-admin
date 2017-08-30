'use strict';

/* Application routes */
mimicTrading.config(['$stateProvider',function($stateProvider){
	/**
	 * Common Resolver for two states, 
	 * it will fetch all the trader by id ,
	 * this will populate during edit and view trader,
	 * JUST Following D.R.Y (don't repeat yourself)
	 * @type {Object}
	 */
	let traderResolver = {
		trader: ['traderSvr', '$stateParams', (traderSvr, $stateParams) => traderSvr.getTraderById($stateParams.id)]
	};
	$stateProvider
	.state('users',{
		url: '/users',
		controller: 'userCtrl',
		templateUrl: 'users/views/userListing.html',
		data: {pageTitle: 'Trader Management'},
		resolve: {
		    deps: ['$ocLazyLoad', function($ocLazyLoad) {
		        return $ocLazyLoad.load({
		            name: 'mimicTrading',
		            insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
		            files: [
		                
		                'global/plugins/datatables/datatables.min.css', 
                        'global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
                        'global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',

                        'global/plugins/datatables/datatables.all.min.js',
                        'global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                        'global/scripts/datatable.min.js',
		            ] 
		        });
		    }]
		},
		authenticate: true
	})
	.state('new',{
		url: '/new',
		controller: 'userCtrl',
		templateUrl: 'users/views/new_user.html',
		data: {pageTitle: 'Add New Trader'},
		authenticate: true
	})
	.state('viewuser',{
		url: '/view/:id',
		controller: 'userViewCtrl',
		templateUrl: 'users/views/view_user.html',
		data: {pageTitle: 'Trader Detail'},
		authenticate: true,
		resolve: traderResolver
	})
	.state('edituser',{
		url: '/edit/:id',
		controller: 'userEditCtrl',
		templateUrl: 'users/views/edit_user.html',
		data: {pageTitle: 'Update Trader Detail'},
		authenticate: true,
		resolve: traderResolver
	});
}]);
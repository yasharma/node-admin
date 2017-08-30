'use strict';

/* Application routes */
mimicTrading.config(['$stateProvider',function($stateProvider){
	/**
	 * Common Resolver for two states, 
	 * it will fetch all the customer by id ,
	 * this will populate during edit and view customer,
	 * JUST Following D.R.Y (don't repeat yourself)
	 * @type {Object}
	 */
	let customerResolver = {
		customer: ['customerSvr', '$stateParams', (customerSvr, $stateParams) => customerSvr.getCustomerById($stateParams.id)]
	};

	$stateProvider
	.state('customers',{
		url: '/customers',
		controller: 'customerCtrl',
		templateUrl: 'customers/views/customer_listing.html',
		data: {pageTitle: 'Customer Management'},
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
                        'global/scripts/datatable.min.js'
		            ] 
		        });
		    }]
		},
		authenticate: true
	})
	.state('newCustomer',{
		url: '/new-customer',
		controller: 'customerCtrl',
		templateUrl: 'customers/views/new_customer.html',
		data: {pageTitle: 'Add New Customer'},
		authenticate: true
	})
	.state('viewCustomer',{
		url: '/view-customer/:id',
		controller: 'customerViewCtrl',
		templateUrl: 'customers/views/view_customer.html',
		data: {pageTitle: 'Customer Detail'},
		authenticate: true,
		resolve: customerResolver
	})
	.state('editCustomer',{
		url: '/edit-customer/:id',
		controller: 'customerEditCtrl',
		templateUrl: 'customers/views/edit_customer.html',
		data: {pageTitle: 'Update Customer Detail'},
		authenticate: true,
		resolve: customerResolver
	});
}]);
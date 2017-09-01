'use strict';

/* Application routes */
mimicTrading.config(['$stateProvider',function($stateProvider){

	let cmsResolver = ['cmsSvr', '$stateParams', (cmsSvr, $stateParams) => cmsSvr.getCmsById($stateParams.id)];

	$stateProvider
	.state('cms',{
		url: '/cms',
		controller: 'cmsCtrl',
		templateUrl: 'cms/views/cms.html',
		data: {pageTitle: 'Manage Content'},
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
	.state('newCms',{
		url: '/new-cms',
		controller: 'cmsCreateCtrl',
		templateUrl: 'cms/views/new_cms.html',
		data: {pageTitle: 'New CMS'},
		authenticate: true
	})
	.state('editCms',{
		url: '/edit-cms/:id',
		controller: 'cmsEditCtrl',
		templateUrl: 'cms/views/edit_cms.html',
		data: {pageTitle: 'Update CMS Detail'},
		authenticate: true,
		resolve: {
		    cms: cmsResolver
		}
	})
	.state('viewCms',{
		url: '/view-cms/:id',
		controller: 'cmsViewCtrl',
		templateUrl: 'cms/views/view_cms.html',
		data: {pageTitle: 'View CMS Detail'},
		authenticate: true,
		resolve: {
		    cms: cmsResolver
		}
	});
}]);

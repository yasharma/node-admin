'use strict';

mimicTrading.factory('appSvr', ['$rootScope', ($rootScope) => {
		return {
			init: () => {
				// initialize core components
				App.initAjax();
				// set default layout mode
				$rootScope.settings.layout.pageContentWhite = true;
			    $rootScope.settings.layout.pageBodySolid = false;
			    $rootScope.settings.layout.pageSidebarClosed = false;		
			}
		};
	}
]);
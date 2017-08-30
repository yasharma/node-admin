/*
All the required vendor javascript files for admin
*/
exports.adminVendorList = [
	"./assets/global/plugins/jquery.min.js",
	"./assets/global/plugins/jquery-migrate.min.js",
	"./assets/global/plugins/bootstrap/js/bootstrap.min.js",
	"./assets/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js",
	"./assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js",
	"./assets/global/plugins/jquery.blockui.min.js",
	"./assets/global/plugins/js.cookie.min.js",
	"./assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js",
	"./bower_components/angular/angular.min.js",
	"./assets/global/plugins/angularjs/angular-sanitize.min.js",
	"./assets/global/plugins/angularjs/angular-touch.min.js",
	"./bower_components/angular-animate/angular-animate.min.js",
	"./bower_components/angular-aria/angular-aria.min.js",
	"./bower_components/angular-messages/angular-messages.min.js",
	"./bower_components/angular-ui-router/release/angular-ui-router.min.js",
	"./assets/global/plugins/angularjs/plugins/ocLazyLoad.min.js",
	"./assets/global/plugins/angularjs/plugins/ui-bootstrap-tpls.min.js",
	"./bower_components/angular-local-storage/dist/angular-local-storage.min.js",
	"./bower_components/ng-file-upload/ng-file-upload-shim.min.js",
	"./bower_components/ng-file-upload/ng-file-upload.min.js",
	"./bower_components/ladda/js/spin.js",
	"./bower_components/ladda/js/ladda.js",
	"./bower_components/angular-ladda/dist/angular-ladda.js",
	"./assets/global/scripts/app.min.js",
	"./assets/layouts/layout3/scripts/layout.min.js",
	"./assets/layouts/global/scripts/quick-sidebar.min.js",
	"./assets/layouts/global/scripts/quick-nav.min.js",
	"./assets/layouts/layout3/scripts/demo.min.js",
	"./assets/global/scripts/lodash.min.js",
	"./bower_components/angular-ui-mask/dist/mask.min.js",
];

/*
All the required application javascript files for admin
*/
exports.adminAppList = [
	"./admin/admin.app.js",
	"./admin/core/*.js",
	"./admin/directives/*.js",
	"./admin/*/*/*Ctrl.js",
	"./admin/*/*-ajax.js",
	"./admin/table-ajax.js",
	"./admin/*/*/*Router.js",
	"./admin/*/*/*-directive.js",
	"./admin/*/*/*Svr.js",
	"./admin/factories/*.js",
	"./admin/login/loginSvr.js"
];

/*
All the required vendor javascript files for User
*/
exports.userVendorList = [
	"./assets/global/plugins/jquery.min.js",
	"./assets/global/plugins/jquery-migrate.min.js",
	"./assets/global/plugins/bootstrap/js/bootstrap.min.js",
	"./bower_components/angular/angular.min.js",
	"./bower_components/angular-animate/angular-animate.min.js",
	"./bower_components/angular-aria/angular-aria.min.js",
	"./bower_components/angular-messages/angular-messages.min.js",
	"./bower_components/angular-material/angular-material.min.js",
	"./assets/global/plugins/angularjs/angular-sanitize.min.js",
	"./assets/global/plugins/angularjs/angular-touch.min.js",
	"./bower_components/angular-ui-router/release/angular-ui-router.min.js",
	"./assets/global/plugins/angularjs/plugins/ocLazyLoad.min.js",
	"./bower_components/angular-local-storage/dist/angular-local-storage.min.js",
	"./bower_components/ng-file-upload/ng-file-upload-shim.min.js",
	"./bower_components/ng-file-upload/ng-file-upload.min.js",
	"./assets/global/plugins/angularjs/plugins/ui-bootstrap-tpls.min.js",
	"./bower_components/moment/min/moment.min.js",
	"./assets/global/scripts/lodash.min.js",
	"./bower_components/angular-ui-mask/dist/mask.min.js",
	"./bower_components/ui-cropper/compile/unminified/ui-cropper.js"
];

/*
All the required application javascript files for user
*/
exports.userAppList = [
	"./user/app.js",
	"./user/core/*.js",
	"./user/factories/*.js",
	"./user/directives/*.js",
	"./user/*/*/*-directive.js",
	"./user/*/*/*Srv.js",
	"./user/*/*/*Ctrl.js",
	"./user/*/*/*Router.js"
];

/**
 * CSS Files for user vendor list
 * @type {Array}
 */
exports.userVendorCSSList = [
	"./assets/global/plugins/font-awesome/css/font-awesome.min.css",
	"./assets/global/plugins/simple-line-icons/simple-line-icons.min.css",
	"./bower_components/angular-material/angular-material.min.css",
	"./bower_components/bootstrap/dist/css/bootstrap.min.css",
	"./assets/global/css/components-md.min.css",
	"./assets/css/layout.css",
	"./assets/layouts/layout3/css/themes/default.min.css",
	"./assets/layouts/layout3/css/custom.min.css"
];

/**
 * CSS Files for admin vendor list
 * @type {Array}
 */
exports.adminVendorCSSListFirst = [
	"./assets/global/plugins/font-awesome/css/font-awesome.min.css",
	"./assets/global/plugins/simple-line-icons/simple-line-icons.min.css",
	"./assets/global/plugins/bootstrap/css/bootstrap.min.css",
	"./assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css",
	"./bower_components/ladda/dist/ladda-themeless.min.css"
	
];
exports.adminVendorCSSListTwo = [
	"./assets/global/css/components-md.min.css",
	"./assets/global/css/plugins-md.min.css",
	"./assets/layouts/layout3/css/layout.min.css",
	"./assets/layouts/layout3/css/themes/default.min.css",
	"./assets/layouts/layout3/css/custom.min.css"
];

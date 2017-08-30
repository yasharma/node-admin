'use strict';

mimicTrading.factory('settings', ['$rootScope', ($rootScope) => {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000, // auto scroll to top on page load
            hideLoginForm: false // auto scroll to top on page load
        },
        assetsPath: '../assets',
        globalPath: '../assets/global',
        layoutPath: '../assets/layouts/layout3',
        errorContainer: '.error_waraper_div',
        tableContainer: '.table-container'
    };

    $rootScope.settings = settings;

    return settings;
}]);
'use strict';


/***
GLobal Directives
***/

// Route State Load Spinner(used on page or content load)
mimicTrading.directive('ngSpinnerBar', ['$rootScope', '$state',
    function($rootScope, $state) {
        return {
            link: function(scope, element, attrs) {
                // by defult hide the spinner bar
                element.addClass('hide'); // hide spinner bar by default

                // display the spinner bar whenever the route changes(the content part started loading)
                $rootScope.$on('$stateChangeStart', function() {
                    element.removeClass('hide'); // show spinner bar
                    Layout.closeMainMenu();
                });

                // hide the spinner bar on rounte change success(after the content loaded)
                $rootScope.$on('$stateChangeSuccess', function(event) {
                    element.addClass('hide'); // hide spinner bar
                    $('body').removeClass('page-on-load'); // remove page loading indicator
                    Layout.setAngularJsMainMenuActiveLink('match', null, event.currentScope.$state); // activate selected link in the sidebar menu
                   
                    // auto scorll to page top
                    setTimeout(function () {
                        App.scrollTop(); // scroll to the top on content load
                    }, $rootScope.settings.layout.pageAutoScrollOnLoad);     
                });

                // handle errors
                $rootScope.$on('$stateNotFound', function() {
                    element.addClass('hide'); // hide spinner bar
                });

                // handle errors
                $rootScope.$on('$stateChangeError', function() {
                    element.addClass('hide'); // hide spinner bar
                });
            }
        };
    }
])

// Handle global LINK click
.directive('a',
    function() {
        return {
            restrict: 'E',
            link: function(scope, elem, attrs) {
                if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                    elem.on('click', function(e) {
                        e.preventDefault(); // prevent link click for above criteria
                    });
                }
            }
        };
    })

// Handle Dropdown Hover Plugin Integration
.directive('dropdownMenuHover', function () {
  return {
    link: function (scope, elem) {
      elem.dropdownHover();
    }
  };  
})
.directive('statusLabel', function () {
    return {
        restrict: 'E',
        scope:{
            status: '='
        },
        template: `<span class="label label-sm" ng-class="'label-' + statusType">{{statusText}}</span>`,
        link: (scope) => {
            switch(scope.status){
                case true:
                case 1:
                    scope.statusType = 'info';
                    scope.statusText = 'ACTIVE';
                    break;

                case false:
                case 0:
                    scope.statusType = 'danger';
                    scope.statusText = 'INACTIVE';
                    break;

                default:
                    scope.statusType = 'default';
                    scope.statusText = 'NOT FOUND';
            }
        }
    };  
});
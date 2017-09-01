'use strict';

mimicTrading.factory('cmsSvr', ['RestSvr', (RestSvr) => {
    return {
        getCmsById: (id) => RestSvr.get(`cms/view/${id}`),
        getCmsTypes: () => ['about_us','privacy_policy','terms_conditions']
    };
}]);
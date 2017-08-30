'use strict';

mimicTrading.factory('customerSvr', ['RestSvr', (RestSvr) => {
    return {
        getCustomerById: (id) => RestSvr.post(`user/view/${id}`)
    };
}]);
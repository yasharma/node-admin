'use strict';

mimicTrading.factory('traderSvr', ['RestSvr', (RestSvr) => {
    return {
        getTraderById: (id) => RestSvr.post(`user/view/${id}`)
    };
}]);
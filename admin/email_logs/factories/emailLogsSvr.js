'use strict';

mimicTrading.factory('emailLogsSvr', ['RestSvr', (RestSvr) => {
    return {
        getLogsList: (id) => RestSvr.post(`email/logs/view/${id}/`),
    };
}]);

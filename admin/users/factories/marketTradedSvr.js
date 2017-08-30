'use strict';

mimicTrading.factory('marketTradedSvr', ['RestSvr', (RestSvr) => {
    return {
        getValue: () => RestSvr.post('market/traded/'),
        getTraderList: () => RestSvr.post('trader/listing/').then(({records}) => records)
    };
}]);
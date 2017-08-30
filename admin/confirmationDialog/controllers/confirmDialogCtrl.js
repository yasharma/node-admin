'use strict';
mimicTrading.controller('confirmationDialogCtrl', ['$uibModalInstance', 'data', 
	function ($uibModalInstance, data) {
		
		let $ctrl = this;

		$ctrl.ok =  () => {
			$uibModalInstance.close(data);
		};

		$ctrl.cancel =  () => {
			$uibModalInstance.dismiss('cancel');
		};
	}
]);	
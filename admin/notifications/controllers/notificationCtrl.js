'use strict';
mimicTrading.controller('notificationCtrl', ['$scope', '$state', 'RestSvr','appSvr','notifications','notificationSvr','$rootScope','$location','$document','$uibModal',
	($scope, $state, RestSvr, appSvr, notifications, notificationSvr, $rootScope, $location, $document, $uibModal) => {
		
		$scope.$on('$viewContentLoaded', () => {
			/**
			 * Initialize the jquery components when view contents loaded properly
			 */
			appSvr.init();
		});

		$scope.notifications = notifications.records;
		$scope.paging = notifications.paging;

		$scope.selected = [];

		/**
		 * load function will reload the list when pagination changes
		 * @param  {int} page [page number]
		 * @return {Object}
		 */
		let load = (page) => notificationSvr.getNotificationList(page)
		.then(({records, paging}) => {
			$scope.notifications = records;
			$scope.paging = paging;
		})
		.catch(errors => App.alert({type: ('danger'), icon: ( 'warning'), message: errors.message, container: $rootScope.settings.errorContainer, place: 'prepend'}));

		/**
		 * when pagination clicked pageChanged will triggered automatically
		 * @return {}
		 */
		$scope.pageChanged = () => load($scope.paging.page);
	
		/**
		 * toggle will check and uncheck the checkbox
		 * @param  {int} item
		 * @param  {array} list
		 */
		$scope.toggle = (item, list) => {
		    let idx = list.indexOf(item);
		    if (idx > -1) {
		    	list.splice(idx, 1);
		    } else {
		      	list.push(item);
		    }
		};

		/**
		 * check if selected item already exists in list array
		 * @param  {int} 
		 * @param  {array} list
		 * @return {Boolean}
		 */
		$scope.exists = (item, list) =>  list.indexOf(item) > -1;

		/**
		 * isChecked function will let the system know about list array length is equals to notifications array length
		 * @return {Boolean}
		 */
		$scope.isChecked = () => $scope.selected.length === $scope.notifications.length;
		 
		/**
		 * toggleAll will use to toggle all the checkboxes 
		 * @return {}
		 */
		$scope.toggleAll = () => {			
			if ($scope.selected.length === $scope.notifications.length) {
		    	$scope.selected = [];
		    } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
		    	$scope.selected = $scope.notifications.map(x => x.id).slice(0);
		    }
		};

		$scope.markAsRead = () => {
			if( $scope.selected.length > 0 ){
				$scope.open('markAsRead');
			} else {
				App.alert({
				    type: 'danger',
				    icon: 'warning',
				    message: 'Please select atleast one notification',
				    container: $rootScope.settings.errorContainer,
				    place: 'prepend'
				});
			}
		};

		$scope.delete = () => {
			if( $scope.selected.length > 0 ){
				$scope.open('delete');
			} else {
				App.alert({
				    type: 'danger',
				    icon: 'warning',
				    message: 'Please select atleast one notification',
				    container: $rootScope.settings.errorContainer,
				    place: 'prepend'
				});
			}
		};

		$scope.open = (action) => {
			let modalInstance = $uibModal.open({
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: '/admin/confirmationDialog/views/confirmation_dialog.html',
				size: 'sm',
				controller: 'confirmationDialogCtrl',
				controllerAs: '$ctrl',
				resolve: { data: () => $scope.selected }
			});

		    modalInstance.result.then(selectedItem => {
		      if( action === 'markAsRead' ){
		      	notificationSvr.markAsRead(selectedItem)
		      	.then(response => $state.reload())
		      	.catch(handleCatch);
		      } else {
		      	notificationSvr.deleteNotification(selectedItem)
		      	.then( () => $rootScope.manageCount())
		      	.then(response => $state.reload())
		      	.catch(handleCatch);
		      }
		    }, () => {
		      console.log('Modal dismissed at: ' + new Date());
		    });
  		};

  		let handleCatch = (errors) => App.alert({type: ('danger'), icon: ( 'warning'), message: errors.message, container: $rootScope.settings.errorContainer, place: 'prepend'});
  		
	}
]);
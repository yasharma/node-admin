'use strict';

mimicTrading.factory('notificationSvr', ['RestSvr', (RestSvr) => {
    return {
        getNotificationList: (page = 1) => RestSvr.paginate('notification/list/', {page}),
        markAsRead: (notification_id) => RestSvr.post('notification/status/', {notification_id}),
        deleteNotification: (notification_id) => RestSvr.post('notification/delete/', {notification_id}),
        getNotificationCount: () => RestSvr.post('notification/unread/count/')
    };
}]);
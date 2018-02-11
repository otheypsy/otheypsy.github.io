ResumeApp.
directive('detailList', function() {
    return {
        restrict: 'EA',
        scope: {
            list: '=list'
        },
        templateUrl: 'app/directives/detail-list/detail-list.template.html'
    };
});

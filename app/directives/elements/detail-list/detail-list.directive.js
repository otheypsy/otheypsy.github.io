ResumeApp.
directive('detailListDirective', function() {
    return {
        restrict: 'EA',
        scope: {
            list: '=list'
        },
        templateUrl: 'app/directives/elements/detail-list/detail-list.template.html'
    };
});

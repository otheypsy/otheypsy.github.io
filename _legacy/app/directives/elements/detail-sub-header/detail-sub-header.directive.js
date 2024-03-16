ResumeApp.
directive('detailSubHeaderDirective', function() {
    return {
        restrict: 'EA',
        scope: {
            subHeader: '=subHeader'
        },
        templateUrl: 'app/directives/elements/detail-sub-header/detail-sub-header.template.html'
    };
});

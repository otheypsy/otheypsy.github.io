ResumeApp.
directive('detailSubHeader', function() {
    return {
        restrict: 'EA',
        scope: {
            subHeader: '=subHeader'
        },
        templateUrl: 'app/directives/detail-sub-header/detail-sub-header.template.html'
    };
});

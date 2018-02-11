ResumeApp.
directive('detailHeader', function() {
    return {
        restrict: 'EA',
        scope: {
            header: '=header'
        },
        templateUrl: 'app/directives/detail-header/detail-header.template.html'
    };
});

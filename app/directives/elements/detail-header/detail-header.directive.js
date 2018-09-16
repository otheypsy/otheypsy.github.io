ResumeApp.
directive('detailHeaderDirective', function() {
    return {
        restrict: 'EA',
        scope: {
            header: '=header'
        },
        templateUrl: 'app/directives/elements/detail-header/detail-header.template.html'
    };
});

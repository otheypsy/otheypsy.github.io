ResumeApp.
directive('detailBlockHeaderDirective', function() {
    return {
        restrict: 'EA',
        scope: {
            icon: "=icon",
            header: '=header'
        },
        templateUrl: 'app/directives/elements/detail-block-header/detail-block-header.template.html'
    };
});

ResumeApp.
directive('detailBlockHeader', function() {
    return {
        restrict: 'EA',
        scope: {
            icon: "=icon",
            header: '=header'
        },
        templateUrl: 'app/directives/detail-block-header/detail-block-header.template.html'
    };
});

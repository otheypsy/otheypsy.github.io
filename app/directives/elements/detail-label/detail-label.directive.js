ResumeApp.
directive('detailLabelDirective', function() {
    return {
        restrict: 'EA',
        scope: {
            label: '=label'
        },
        templateUrl: 'app/directives/elements/detail-label/detail-label.template.html'
    };
});

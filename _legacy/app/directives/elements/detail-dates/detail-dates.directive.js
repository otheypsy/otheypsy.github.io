ResumeApp.
directive('detailDatesDirective', function() {
    return {
        restrict: 'EA',
        scope: {
            startDate: '=startDate',
            endDate: '=endDate'
        },
        templateUrl: 'app/directives/elements/detail-dates/detail-dates.template.html'
    };
});

ResumeApp.
directive('detailDates', function() {
    return {
        restrict: 'EA',
        scope: {
            startDate: '=startDate',
            endDate: '=endDate'
        },
        templateUrl: 'app/directives/detail-dates/detail-dates.template.html'
    };
});

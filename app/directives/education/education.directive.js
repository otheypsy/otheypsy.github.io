ResumeApp.
directive('education', function(firebaseService) {
    return {
        restrict: 'EA',
        scope: {},
        templateUrl: 'app/directives/education/education.template.html',
        link: function (scope) {
            firebaseService.get('education').then(function (data) {
                scope.details = data;
                scope.$digest();
            });
        }
    };
});

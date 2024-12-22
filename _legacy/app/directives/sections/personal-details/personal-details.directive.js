ResumeApp.
directive('personalDetailsDirective', function(firebaseService) {
    return {
        restrict: 'EA',
        scope: {},
        templateUrl: 'app/directives/sections/personal-details/personal-details.template.html',
        link: function (scope) {
            firebaseService.get('personal-details').then(function (data) {
                scope.details = data;
                scope.$digest();
            });
        }
    };
});

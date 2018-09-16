ResumeApp.
directive('businessExperienceDirective', function(firebaseService) {
    return {
        restrict: 'EA',
        scope: {},
        templateUrl: 'app/directives/sections/business-experience/business-experience.template.html',
        link: function (scope) {
            firebaseService.get('business-experience').then(function (data) {
                scope.details = data;
                console.log(scope.details);
                scope.$digest();
            });
        }
    };
});

ResumeApp.
directive('technicalSkills', function(firebaseService) {
    return {
        restrict: 'EA',
        scope: {},
        templateUrl: 'app/directives/technical-skills/technical-skills.template.html',
        link: function (scope) {
            firebaseService.get('technical-skills').then(function (data) {
                scope.details = data;
                scope.$digest();
            });
        }
    };
});

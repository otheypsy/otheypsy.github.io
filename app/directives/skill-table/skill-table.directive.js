ResumeApp.
directive('skillTable', function(firebaseService) {
    return {
        scope: {
            skills: '=skills'
        },
        restrict: 'EA',
        templateUrl: 'app/directives/skill-table/skill-table.template.html'
    };
});

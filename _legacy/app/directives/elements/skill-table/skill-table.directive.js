ResumeApp.
directive('skillTableDirective', function(firebaseService) {
    return {
        scope: {
            skills: '=skills'
        },
        restrict: 'EA',
        templateUrl: 'app/directives/elements/skill-table/skill-table.template.html'
    };
});

ResumeApp.
directive('projects', function(firebaseService) {
    return {
        restrict: 'EA',
        scope: {},
        templateUrl: 'app/directives/projects/projects.template.html',
        link: function (scope) {
            firebaseService.get('projects').then(function (data) {
                scope.details = data;
                scope.sortParameter = 'priority';
                scope.$digest();
            });

            scope.toggleDetails = function (item) {
                item.toggle = !item.toggle;
            };
        }
    };
});

ResumeApp.
directive('resume', function(firebaseService) {
    return {
        restrict: 'EA',
        templateUrl: 'app/directives/resume/resume.template.html'
    };
});

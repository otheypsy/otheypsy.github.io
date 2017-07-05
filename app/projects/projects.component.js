angular.
module('ResumeApp').
component('projects', {
    templateUrl: 'app/projects/projects.template.html',
    controller: function ProjectsController($timeout, projectsService) {
        var self = this;
        projectsService.getDetails()
            .then(function (response) {
                self.details = response.data;
            }, function (error) {
                console.log('Error loading data...')
            });

        self.$postLink= function() {
            $timeout(function () {
                resizeSidebar();
            }, 100);
        };
    }
});
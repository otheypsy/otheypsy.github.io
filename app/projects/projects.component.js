angular.
module('ResumeApp').
component('projects', {
    templateUrl: 'app/projects/projects.template.html',
    controller: function ProjectsController($scope, projectsService, globalService) {

        var self = this;

        self.$onInit = function () {
            self.details = {};
            projectsService.getDetails().then(function (snapshot) {
                self.details = snapshot.val();
                $scope.$digest();
                globalService.resizeSidebar();
            });
        };
    }
});
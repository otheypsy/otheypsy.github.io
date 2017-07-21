angular.
module('ResumeApp').
component('projects', {
    templateUrl: 'app/projects/projects.template.html',
    controller: function ProjectsController($scope, projectsService, resizeSidebarService) {

        var self = this;

        self.$onInit = function () {
            self.details = {};
            projectsService.getDetails().then(function (snapshot) {
                self.details = snapshot.val();
                $scope.$digest();
                resizeSidebarService.runService();
            });
        };
    }
});
angular.
module('ResumeApp').
component('projects', {
    templateUrl: 'app/projects/projects.template.html',
    controller: function ProjectsController($scope, projectsService, globalService) {

        var self = this;

        self.$onInit = function () {
            self.details = {};
            projectsService.getDetails().then(function (snapshot) {
                snapshot.forEach(function(child) {
                    console.log(child.val())
                });
                self.details = snapshot.val();
                console.table(self.details);
                $scope.$digest();
                globalService.resizeSidebar();
            });
        };
    }
});
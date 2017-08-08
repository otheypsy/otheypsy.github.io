angular.
module('ResumeApp').
component('projects', {
    templateUrl: 'app/projects/projects.template.html',
    controller: function ProjectsController($scope, projectsService, globalService) {

        var self = this;

        self.$onInit = function () {
            self.details = [];
            self.sort_parameter = 'priority';
            projectsService.getDetails().then(function (snapshot) {
                self.details = globalService.acceptFirebaseData(snapshot);
                self.details = globalService.dateConverter(self.details, ['start_date']);
                $scope.$digest();
                globalService.resizeSidebar();
            });
        };

        self.toggleDetails = function (item) {
            item.toggle = !item.toggle;
        }
    }
});
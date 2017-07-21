angular.
module('ResumeApp').
component('technicalSkills', {
    templateUrl: 'app/technical-skills/technical-skills.template.html',
    controller: function TechnicalSkillsController($scope, technicalSkillsService, resizeSidebarService) {

        var self = this;

        self.$onInit = function () {
            self.details = {};
            technicalSkillsService.getDetails().then(function (snapshot) {
                self.details = snapshot.val();
                $scope.$digest();
                resizeSidebarService.runService();
            });
        };
    }
});
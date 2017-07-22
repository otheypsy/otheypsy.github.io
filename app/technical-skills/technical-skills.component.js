angular.
module('ResumeApp').
component('technicalSkills', {
    templateUrl: 'app/technical-skills/technical-skills.template.html',
    controller: function TechnicalSkillsController($scope, technicalSkillsService, globalService) {

        var self = this;

        self.$onInit = function () {
            self.details = {};
            technicalSkillsService.getDetails().then(function (snapshot) {
                self.details = globalService.acceptFirebaseData(snapshot);
                $scope.$digest();
                globalService.resizeSidebar();
            });
        };
    }
});
angular.
module('ResumeApp').
component('technicalSkills', {
    templateUrl: 'app/directives/technical-skills/technical-skills.template.html',
    controller: function ($scope, technicalSkillsService, globalService) {

        var self = this;

        self.$onInit = function () {
            self.details = {};
            technicalSkillsService.getDetails().then(function (snapshot) {
                self.details = globalService.acceptFirebaseData(snapshot);
                $scope.$digest();
            });
        };
    }
});

angular.
module('ResumeApp').
component('businessExperience', {
    templateUrl: 'app/business-experience/business-experience.template.html',
    controller: function BusinessExperienceController($scope, businessExperienceService, globalService) {

        var self = this;

        self.$onInit = function () {
            self.details = {};
            businessExperienceService.getDetails().then(function (snapshot) {
                self.details = snapshot.val();
                $scope.$digest();
                globalService.resizeSidebar();
            });
        };
    }
});
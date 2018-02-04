angular.
module('ResumeApp').
component('businessExperience', {
    templateUrl: 'app/components/business-experience/business-experience.template.html',
    controller: function ($scope, businessExperienceService, globalService) {

        var self = this;

        self.$onInit = function () {
            self.details = {};
            businessExperienceService.getDetails().then(function (snapshot) {
                self.details = globalService.acceptFirebaseData(snapshot, self);
                $scope.$digest();
            });
        };
    }
});

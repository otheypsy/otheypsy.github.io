angular.
module('ResumeApp').
component('education', {
    templateUrl: 'app/components/education/education.template.html',
    controller: function ($scope, educationService, globalService) {

        var self = this;

        self.$onInit = function () {
            self.details = {};
            educationService.getDetails().then(function (snapshot) {
                self.details = globalService.acceptFirebaseData(snapshot);
                $scope.$digest();
            });
        };
    }
});

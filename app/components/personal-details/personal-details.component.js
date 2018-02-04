angular.
module('ResumeApp').
component('personalDetails', {
    templateUrl: 'app/components/personal-details/personal-details.template.html',
    controller: function ($scope, personalDetailsService) {

        var self = this;

        self.$onInit = function () {
            self.details = {};
            personalDetailsService.getDetails().then(function (snapshot) {
                self.details = snapshot.val();
                $scope.$digest();
            });
        };
    }
});

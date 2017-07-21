angular.
module('ResumeApp').
component('personalDetails', {
    templateUrl: 'app/personal-details/personal-details.template.html',
    controller: function PersonalDetailsController($scope, personalDetailsService, resizeSidebarService) {

        var self = this;

        self.$onInit = function () {
            self.details = {};
            personalDetailsService.getDetails().then(function (snapshot) {
                self.details = snapshot.val();
                $scope.$digest();
                resizeSidebarService.runService();
            });
        };
    }
});
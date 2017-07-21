angular.
module('ResumeApp').
component('education', {
    templateUrl: 'app/education/education.template.html',
    controller: function EducationController($scope, educationService, resizeSidebarService) {

        var self = this;

        self.$onInit = function () {
            self.details = {};
            educationService.getDetails().then(function (snapshot) {
                self.details = snapshot.val();
                $scope.$digest();
                resizeSidebarService.runService();
            });
        };
    }
});
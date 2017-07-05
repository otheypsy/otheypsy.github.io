angular.
module('ResumeApp').
component('education', {
    templateUrl: 'app/education/education.template.html',
    controller: function EducationController($timeout, educationService) {
        var self = this;
        educationService.getDetails()
            .then(function (response) {
                self.details = response.data;
            }, function (error) {
                console.log('Error loading data...')
            });

        self.$postLink= function() {
            $timeout(function () {
                resizeSidebar();
            }, 100);
        };
    }
});
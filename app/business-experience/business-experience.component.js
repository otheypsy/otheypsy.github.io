angular.
module('ResumeApp').
component('businessExperience', {
    templateUrl: 'app/business-experience/business-experience.template.html',
    controller: function BusinessExperienceController($timeout, businessExperienceService) {
        var self = this;
        businessExperienceService.getDetails()
            .then(function (response) {
                self.details = response.data;
                resizeSidebar();
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
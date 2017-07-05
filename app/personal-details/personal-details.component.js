angular.
module('ResumeApp').
component('personalDetails', {
    templateUrl: 'app/personal-details/personal-details.template.html',
    controller: function PersonalDetailsController($timeout, personalDetailsService) {
        var self = this;
        personalDetailsService.getDetails()
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
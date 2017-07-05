angular.
module('ResumeApp').
component('technicalSkills', {
    templateUrl: 'app/technical-skills/technical-skills.template.html',
    controller: function TechnicalSkillsController($timeout, technicalSkillsService) {
        var self = this;
        technicalSkillsService.getDetails()
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
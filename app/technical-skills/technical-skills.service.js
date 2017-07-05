angular.
module('ResumeApp').
service('technicalSkillsService', function ($http) {
    this.getDetails = function () {
        return $http.get('app/technical-skills/technical-skills.json');
    }
});


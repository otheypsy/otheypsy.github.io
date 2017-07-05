angular.
module('ResumeApp').
service('businessExperienceService', function ($http) {
    this.getDetails = function () {
        return $http.get('app/business-experience/business-experience.json');
    }
});


angular.
module('ResumeApp').
service('educationService', function ($http) {
    this.getDetails = function () {
        return $http.get('app/education/education.json');
    }
});


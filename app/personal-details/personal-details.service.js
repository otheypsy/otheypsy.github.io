angular.
module('ResumeApp').
service('personalDetailsService', function ($http) {
    this.getDetails = function () {
        return $http.get('app/personal-details/personal-details.json');
    }
});


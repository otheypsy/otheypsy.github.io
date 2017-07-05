angular.
module('ResumeApp').
service('projectsService', function ($http) {
    this.getDetails = function () {
        return $http.get('app/projects/projects.json');
    }
});


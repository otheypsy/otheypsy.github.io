angular.
module('ResumeApp').
service('githubService', function ($http) {

    this.getGithubProjects = function () {
        if(this.projectList === undefined)
            this.projectList = $http.get('https://api.github.com/users/omkard3sai/repos');
        return this.projectList;
    };

    this.getGithubProjectReadme = function (repo) {
        return $http.get('https://api.github.com/repos/omkard3sai/' + repo + '/readme');
    };

});

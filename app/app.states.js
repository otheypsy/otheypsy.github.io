var ResumeApp = angular.module('ResumeApp', [
    'ui.router',
    'ngSanitize'
]);

ResumeApp.
config(function config($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/overview');

    var overview = {
        name: 'overview',
        url: '/overview',
        component: 'overviewComponent'
    };

    var resume = {
        name: 'resume',
        url: '/resume',
        component: 'resumeComponent'
    };

    var github_projects = {
        name: 'github-projects',
        url: '/github-projects',
        component: 'githubProjectsComponent'
    };

    $stateProvider
        .state(overview)
        .state(resume)
        .state(github_projects);
});

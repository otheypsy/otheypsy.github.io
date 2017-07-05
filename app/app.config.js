angular.
module('ResumeApp').
config(function config($locationProvider) {
            $locationProvider.hashPrefix('!');
        }
    );
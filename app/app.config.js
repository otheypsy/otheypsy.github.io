angular.
module('ResumeApp').
config(function config($locationProvider) {
        $locationProvider.hashPrefix('!');
        var dbConfig = {
            apiKey: "AIzaSyD2KUh24RqbQ8JjJZc3Acw38kyFw6TDxqM",
            authDomain: "github-personal.firebaseapp.com",
            databaseURL: "https://github-personal.firebaseio.com",
            storageBucket: "github-personal.appspot.com"
        };
        firebase.initializeApp(dbConfig);
    }
);
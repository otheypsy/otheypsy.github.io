angular.
module('ResumeApp').
service('firebaseService', function () {

    firebase.initializeApp({
        apiKey: "AIzaSyD2KUh24RqbQ8JjJZc3Acw38kyFw6TDxqM",
        authDomain: "github-personal.firebaseapp.com",
        databaseURL: "https://github-personal.firebaseio.com",
        storageBucket: "github-personal.appspot.com"
    });

    this.get = function (location) {
        return firebase.database().ref('/' + location).once('value').then(function (snapshot) {
            return snapshot.val();
        });
    };

});

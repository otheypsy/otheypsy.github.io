angular.
module('ResumeApp').
service('personalDetailsService', function () {

    this.getDetails = function () {
        return firebase.database().ref('/personal-details').once('value')
    };

});


angular.
module('ResumeApp').
service('educationService', function () {

    this.getDetails = function () {
        return firebase.database().ref('/education').once('value');
    };

});




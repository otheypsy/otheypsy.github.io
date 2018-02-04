angular.
module('ResumeApp').
service('resumeService', function () {

    this.getDetails = function () {
        return firebase.database().ref('/education').once('value');
    };

});

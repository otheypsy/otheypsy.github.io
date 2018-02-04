angular.
module('ResumeApp').
service('businessExperienceService', function () {

    this.getDetails = function () {
        return firebase.database().ref('/business-experience').once('value');
    };

});
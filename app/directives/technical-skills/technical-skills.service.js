angular.
module('ResumeApp').
service('technicalSkillsService', function () {

    this.getDetails = function () {
        return firebase.database().ref('/technical-skills').once('value');
    };

});


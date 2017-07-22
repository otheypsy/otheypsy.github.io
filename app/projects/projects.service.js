angular.
module('ResumeApp').
service('projectsService', function () {

    return {
        getDetails: function () {
            return firebase.database().ref('/projects').orderByChild('priority').once('value');
        }
    }

});


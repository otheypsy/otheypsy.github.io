angular.
module('ResumeApp').
service('projectsService', function () {

    return {
        getDetails: function () {
            return firebase.database().ref('/projects').orderByChild('end_date').once('value');
        }
    }

});


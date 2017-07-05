angular.
module('SoccerStatsApp').
component('competitionTeams', {
    templateUrl: 'app/competition-teams/competition-teams.template.html',
    controller: function CompetitionTeamsController($routeParams, $http) {
        var self = this;
        $http.get('ajax/getCompetitionTeams.php?competitionId=' + $routeParams.competitionId).then(function(response) {
            self.competitionTeams = response.data['teams'];
            self.competitionName = response.data['name']
        });
    }
});
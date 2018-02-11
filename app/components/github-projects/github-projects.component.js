
ResumeApp.
component('githubProjectsComponent', {
    templateUrl: 'app/components/github-projects/github-projects.template.html',
    controller: function (githubService) {
        var self = this;

        self.$onInit = function () {
            githubService.getGithubProjects().then(function(response) {
                self.projects = response.data;
                $('.modal').modal();
            });
        };

        self.getProjectReadme = function (repo) {
            githubService.getGithubProjectReadme(repo).then(
                function(response) {
                    var converter = new showdown.Converter();
                    self.projectReadme = converter.makeHtml(atob(response.data.content));
                    $('#projectModal').modal('open');
                },
                function(response) {
                    alert('No Readme found');
                }
            );
        };

    }
});

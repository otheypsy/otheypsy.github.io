angular.
module('ResumeApp').
service('resizeSidebarService', function ($timeout) {

    this.runService = function () {
        $timeout(function(){
            resizeSidebar();
        },0,false)
    };

});
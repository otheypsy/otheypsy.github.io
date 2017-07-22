angular.
module('ResumeApp').
service('globalService', function ($timeout) {

    this.resizeSidebar = function () {
        $timeout(function(){
            resizeSidebar();
        },0,false)
    };

});
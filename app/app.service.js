angular.
module('ResumeApp').
service('globalService', function ($timeout) {

    this.resizeSidebar = function () {
        $timeout(function(){
            resizeSidebar();
        },0,false)
    };

    this.acceptFirebaseData = function (snapshot) {
        var returnData = {};
        var key = 0;
        snapshot.forEach(function(child) {
            returnData[key] = child.val();
            key++;
        });
        return returnData;
    }

});
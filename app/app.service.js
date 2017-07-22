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
        snapshot.val().forEach(function(value, key) {
            returnData[key] = value;
        });
        return returnData;
    }

});
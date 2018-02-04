angular.
module('ResumeApp').
service('globalService', function ($timeout) {

    this.acceptFirebaseData = function (snapshot) {
        var returnData = [];
        var key = 0;
        snapshot.forEach(function(child) {
            returnData[key] = child.val();
            key++;
        });
        return returnData;
    };

    this.dateConverter = function (details, date_identifiers) {
        var identifier = [];
        var count = date_identifiers.length;
        angular.forEach(details, function (item) {
            for(var i=0; i<count; i++) {
                identifier = date_identifiers[i] + '_filter';
                item[identifier] = new Date(item[date_identifiers[i]])
            }
        });
        return details;
    }

});

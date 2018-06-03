var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {

    $scope.logOut = function () {
        logOut(function(correct){
            if (correct) {
                $(location).attr('href', './index.html', '_top');
            } else {
                alert('mostrar al usuario que algo ha salido mal a la hora de hacer log out');
            }
        });
    }

});
var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
    $scope.noEstoyLogeado = true;
    $scope.estoyLogeado = false;

    $scope.logInUser = function () {
        logInUser($scope.usernameUser, $scope.passwordUser, function(correct){
            if (correct) {
                $scope.noEstoyLogeado = false;
                $scope.estoyLogeado = true;
                $(location).attr('href', './index.html');
            } else {
                alert('mostrar al usuario que algo ha salido mal');
            }
        });
    }
});
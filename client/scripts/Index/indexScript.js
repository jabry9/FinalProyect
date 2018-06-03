var app = angular.module('indexApp', []);



app.controller('indexCtrl', function ($scope, $http) {

    $scope.estoyLogeado = false;
    $scope.noEstoyLogeado = !$scope.estoyLogeado;

    alredyLogged(function(isLogged){
        if (isLogged){
            $scope.estoyLogeado = true;
            $scope.noEstoyLogeado = !$scope.estoyLogeado;
            $scope.$apply();
        }else{
            $scope.estoyLogeado = false;
            $scope.noEstoyLogeado = !$scope.estoyLogeado;
            $scope.$apply();
        }
        
    });

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
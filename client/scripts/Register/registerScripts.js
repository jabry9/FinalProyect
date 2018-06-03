alredyLogged(function(isLogged){
    if (isLogged)
        $(location).attr('href', './index.html', '_top');

});

currentLocation();

var app = angular.module('signInApp', []);

app.controller('signInCtrl', function ($scope, $http) {
    $scope.noEstoyLogeado = true;
    $scope.estoyLogeado = false;

    $scope.signIn = function () {
        insertUser(coord, $scope.signInUserName, $scope.signInEmail, $scope.signInPassword, function(correct) {
            if (correct) {
                $(location).attr('href', './Login.html', '_top');
            } else {
                alert('mostrar al usuario que algo ha salido mal');
            }
        });
    }
});


const insertUser = (coord, userName, email, password, cb) => {

    if (null === coord) {
        coord = {
            coords: {
                latitude: 0,
                longitude: 0
            }
        };
    }
     $.post(direction+'Usuarios',
        {
        location: {
            lat: coord.coords.latitude,
            lng: coord.coords.longitude
        },
        username: userName,
        email: email,
        password: password
        }
    ).then(function() {
       cb(true);
    }).fail(function(){
        cb(false);
    });
}
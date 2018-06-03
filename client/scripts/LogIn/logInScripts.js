alredyLogged(function(isLogged){
    if (isLogged)
        $(location).attr('href', './index.html', '_top');

});

var app = angular.module('logInApp', []);
app.controller('logInCtrl', function ($scope, $http) {

    $scope.logIn = function () {
        logIn($scope.usernameUser, $scope.passwordUser, function(correct){
            if (correct) {
                $(location).attr('href', './index.html', '_top');
            } else {
                alert('mostrar al usuario que algo ha salido mal a la hora de hacer un log in');
            }
        });
    }

});

const logIn = (nameOrEmail = '', password = '', cb) => {
    alredyLogged(function(isLogged){
        if (false === isLogged){
                $.post(direction+'Usuarios/login',
                {
                    username: nameOrEmail,
                    password: password
                }
                ).then(function(data) {
                    createCookieAccesToken(data.id, data.created, data.ttl);
                    cb(true);
                }).fail(function(xhr, status, error){
                    $.post(direction+'Usuarios/login',
                        {
                            email: nameOrEmail,
                            password: password
                        }
                        ).then(function(data) {
                            createCookieAccesToken(data.id, data.created, data.ttl);
                            cb(true);
                        }).fail(function(xhr, status, error){
                            cb(false);
                        });
                });
            }
        else
            cb(true);
    });

}
var app = angular.module('indexApp', []);


app.controller('indexCtrl', function ($scope, $http) {

    $scope.records = [];
$scope.page = 0;



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




  

 


    $scope.nextAds = function () {


        $http.get(direction+"Anuncios/getByPaginatione?page="+$scope.page+"&adsPerPage=4")
        .then(function(response) {
            console.log(response.data);
            response.data.map(e => {
                
                $scope.records.push({
                    img: e.multimedia[0],
                    titulo: e.titulo,
                    description: e.description,
                    city: e.city,
                    autor: e.usuario.username
                });
    
               
            });

            $scope.$apply();

        });
        $scope.page++;
    }






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


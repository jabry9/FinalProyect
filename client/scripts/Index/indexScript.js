var app = angular.module('indexApp', []);


app.controller('indexCtrl', function ($scope, $http) {

    $scope.records = [];
    $scope.page = 0;
    $scope.muestraFiltroTitulo = false;
    $scope.muestraFiltroCategoria = false;


    $scope.estoyLogeado = false;
    $scope.noEstoyLogeado = !$scope.estoyLogeado;


    $scope.titulo = '';

    if (null !== sessionStorage.getItem("searchBar"));{
        $scope.muestraFiltroTitulo = true;
        $scope.titulo = sessionStorage.getItem("searchBar");
    }

    $scope.categoria = 0;

    if (null !== sessionStorage.getItem("searchCate"));{
        $scope.categoria = parseInt(sessionStorage.getItem("searchCate"));
    }
        
    $scope.categoriaName = 0;

    if (null !== sessionStorage.getItem("searchName"));{
        $scope.muestraFiltroCategoria = true;
        $scope.categoriaName = sessionStorage.getItem("searchName");
    }
    

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



        $http.get(direction+"Anuncios/getByPaginatione?page="+$scope.page+"&adsPerPage=4&title="+$scope.titulo+"&category="+$scope.categoria)
        .then(function(response) {
            response.data.map(e => {
                $scope.records.push({
                    img: e.multimedia[0],
                    titulo: e.titulo,
                    city: e.city,
                    materialsInclude: e.materialsINC,
                    autor: e.usuario.username
                });
  

               
            });

            

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


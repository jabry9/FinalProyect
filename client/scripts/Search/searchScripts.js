var app = angular.module('searchApp', []);


app.controller('searchCtrl', function ($scope, $http) {


    $scope.categories = [];
    $scope.parentCategory = 0;
    $scope.bread = [];
    $scope.bread.push(0);
    $scope.oldI = 0;
    $scope.searchBar = '';
    $scope.categorySearch = null;
    $scope.currentCat = 'Toda las categorias';


        $http.get(direction+"Categories/getByParentCategory?parentCategory=0")
        .then(function(response) {
            
            response.data.map(e => {
                $scope.categories.push({cat: e.name, val: e.id});
            });

        });

        sessionStorage.setItem("searchCate", 0);
       if (null !== sessionStorage.getItem("searchBar")){
        $scope.searchBar = sessionStorage.getItem("searchBar");
       }


        $scope.saveData = function() {
            if ($scope.categorySearch === null)
                $scope.categorySearch = 0;


            sessionStorage.setItem("searchCate", $scope.categorySearch);
            sessionStorage.setItem("searchName", $scope.currentCat);
            sessionStorage.setItem("searchBar", $scope.searchBar);
        }



        $scope.back = function() {
           

            if ($scope.bread.length > 2){
                const cate = parseInt($scope.bread.shift());

                $scope.currentCat = $scope.categories.filter(function( obj ) {
                    return obj.val == cate;
                  });
                  $scope.currentCat = $scope.currentCat[0].cat;

                $http.get(direction+"Categories/getByParentCategory?parentCategory="+cate)
                .then(function(response) {
                    if (0 !== response.data.length) {
                        $scope.categories = [];
                        response.data.map(e => {
                            $scope.categories.push({cat: e.name, val: e.id});
                        });
                    }
                });
            }else if ($scope.bread.length === 2){
                $scope.currentCat = 'Toda las categorias';
                $http.get(direction+"Categories/getByParentCategory?parentCategory=0")
                .then(function(response) {
                    if (0 !== response.data.length) {
                        $scope.categories = [];
                        response.data.map(e => {
                            $scope.categories.push({cat: e.name, val: e.id});
                        });
                    }
                });
            }
         }
    
        $scope.update = function() {

            

            if (null != $scope.item){
                $scope.categorySearch = $scope.item;

                $scope.currentCat = $scope.categories.filter(function( obj ) {
                    return obj.val == $scope.item;
                  });
                  $scope.currentCat = $scope.currentCat[0].cat;

                $http.get(direction+"Categories/getByParentCategory?parentCategory="+parseInt($scope.item))
                .then(function(response) {
                    
                    if (0 !== response.data.length) {
                        $scope.bread.unshift($scope.oldI);
                        $scope.oldI = $scope.item;
                        $scope.categories = [];
                        response.data.map(e => {
                            $scope.categories.push({cat: e.name, val: e.id});
                        });
                    }

                });
            }

         }

    

});


var app = angular.module('authApp', []);
app.controller('authController', function($scope, $http) {

    var user = window.location.href.substring(window.location.href.indexOf("user=")+5);
    var data = {"id" : user};
    $http({
        method : "POST",
        url : window.location.origin+"/authUser",
        params : data
      }).then(function(response){
        console.log(response);
      });

    $scope.redirect = function(){
        window.location.href = window.location.origin + "/index.html";
    }
});
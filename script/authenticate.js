var app = angular.module('authApp', []);
app.controller('authController', function($scope) {
    $scope.redirect = function(){
        window.location.href = window.location.origin + "/index.html";
    }
});
var app = angular.module('mainApp', []);
app.controller('mainController', function($scope, $timeout, $http) {
  
  // Purchase analysis dashboard content
  var divElement = document.getElementById('viz1584757337675');                    
  var vizElement = divElement.getElementsByTagName('object')[0];                    
  vizElement.style.width='1100px';vizElement.style.height='1150px';                    
  var scriptElement = document.createElement('script');                    
  scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    
  vizElement.parentNode.insertBefore(scriptElement, vizElement);

  // Employee turnover dashboard content
  var divElement = document.getElementById('viz1584764713356');
  var vizElement = divElement.getElementsByTagName('object')[0];
  if (divElement.offsetWidth > 800) {
      vizElement.style.width = '1000px';
      vizElement.style.height = '1027px';
  } else if (divElement.offsetWidth > 500) {
      vizElement.style.width = '1000px';
      vizElement.style.height = '1027px';
  } else {
      vizElement.style.width = '100%';
      vizElement.style.height = '2127px';
  }
  var scriptElement = document.createElement('script');
  scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
  vizElement.parentNode.insertBefore(scriptElement, vizElement);

  // Facebook app register
  

  $scope.showPurchaseAnalysis = function(){
      $scope.purchaseAnalysis = true;
      $scope.employeeTurnover = false;
  }

  $scope.showEmployeeTurnover = function(){
    $scope.employeeTurnover = true;
    $scope.purchaseAnalysis = false;
  }

  $scope.facebookLogin = function(){
    FB.login(function(response){
      $scope.facebookLoginDetails = response; 
    });
    $timeout(function(){
      if($scope.facebookLoginDetails.status === 'connected'){
        $scope.facebookLoggedin = true;
        FB.api(
          "/"+$scope.facebookLoginDetails.authResponse.userID+"/feed",
          function (response) {
            if (response && !response.error) {
              console.log(response);
            }
          }
        );
      }
      else{
        $scope.facebookLoggedin = false;
      }
    },5000);
  }

  $scope.facebookLogout = function(){
    FB.logout(function(response){
      $scope.facebookLoginDetails = response;
    });
    $scope.facebookLoggedin = false;
  }

  $scope.instaLogin = function(){
    var url = "https://api.instagram.com/oauth/authorize/?client_id=1082737448785994&redirect_uri=https://dibyajit30.github.io/Analytics-Platform/&scope=user_profile,user_media&response_type=code";
    window.location.href = url;
  }

  $scope.instaLogout = function(){
    $scope.instaLoggedin = false;
  }

  $scope.showFacebook = function(){
      $scope.facebook = true;
      $scope.instagram = false;
      FB.getLoginStatus(function(response) {
        $scope.facebookLoginDetails = response;
        if(response.status === 'connected'){
          $scope.facebookLoggedin = true;
        }
        else{
          $scope.facebookLoggedin = false;
        }
      });
  }

  $scope.showInstagram = function(loggedin){
    $scope.instagram = true;
    $scope.facebook = false;
    $scope.instaLoggedin = loggedin;
  }
  
  $scope.showDashboard = function(){
    $scope.dashboard = true;
    $scope.socialMedia = false;
    $scope.showPurchaseAnalysis();
  }

  $scope.showSocialMedia = function(){
      $scope.socialMedia = true;
      $scope.dashboard = false;
      $scope.showFacebook();
  }

  if(window.location.href.includes("code=")){
    var code = window.location.href.substring(window.location.href.indexOf("code=")+5,window.location.href.indexOf("#_"));
    $scope.showSocialMedia();
    $scope.showInstagram(true);
    console.log("code="+code);
  }
  else{
    $scope.showDashboard();
  }
});
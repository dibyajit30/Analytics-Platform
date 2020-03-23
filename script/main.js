var app = angular.module('mainApp', []);
app.controller('mainController', function($scope, $timeout, $http, $document, $httpParamSerializer) {
  
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

  var instaAuthURL = "https://api.instagram.com/oauth/authorize/?client_id=1082737448785994&redirect_uri=https://dibyajit30.github.io/Analytics-Platform/&scope=user_profile,user_media&response_type=code";
  $scope.instaLogin = function(){
    var url = instaAuthURL;
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
    $scope.isLoggedin = true;
    $scope.dashboard = true;
    $scope.socialMedia = false;
    $scope.showPurchaseAnalysis();
  }

  $scope.showSocialMedia = function(){
      $scope.socialMedia = true;
      $scope.dashboard = false;
      $scope.showFacebook();
  }

  $scope.sendEmail = function() {
    var link = window.location.origin + "/authenticate.html?user=" + document.getElementById("signupID").value;
    var emailBody = "Click on this link to authenticate- " + link;
    var emailId = document.getElementById("signupEmail").value;
    var data = {"id": document.getElementById("signupID").value, "password": document.getElementById("signupPassword").value};
    $http({
      method : "POST",
      url : window.location.origin+"/addUser",
      params : data
    }).then(function(response){
      console.log(response);
    });
    Email.send({
    Host: "smtp.gmail.com",
    Port: 587,
    Username : "developer.dibyajit@gmail.com",
    Password : "Developer@123",
    To : emailId,
    From : "developer.dibyajit@gmail.com",
    Subject : "Email authentication for Analytics Platform",
    Body : emailBody,
    }).then(function(response){
      console.log(response);
    });
  }

  $scope.authenticateUser = function(){
    var id = document.getElementById("userID").value;
    var password = document.getElementById("userPassword").value;
    $http.get("resources/user_data.json")
    .then(function(response) {
      if(response.statusText === "OK"){
        var profiles = response.data.users;
        var access = false;
        for(var i=0; i<profiles.length; i++){
          if(profiles[i].id === id && profiles[i].password === password && profiles[i].auth === "yes"){
            access = true;
            $scope.showDashboard();
            break;
          }
        }
        if(access === false){
          console.log("Access denied");
        }
      }
      else{
        console.log("Access denied");
      }
    });
  }

  $scope.authenticateAdmin = function(){

  }

  if(window.location.href.includes("code=")){
    var code = window.location.href.substring(window.location.href.indexOf("code=")+5,window.location.href.indexOf("#_"));
    var url = "https://api.instagram.com/oauth/access_token";
    var fd = new FormData();    
    fd.append( 'client_id', '1082737448785994' );
    fd.append( 'client_secret', '79b6da878350944fbbe6d37aa0cf625e' );
    fd.append("grant_type", "authorization_code");
    fd.append("redirect_uri", "https://dibyajit30.github.io/Analytics-Platform/");
    fd.append("code", code);
    // $.ajax({
    //   url: url,
    //   data: fd,
    //   processData: false,
    //   contentType: false,
    //   type: 'POST',
    //   success: function(data){
    //     console.log(data);
    //   }
    // });
    $http.post(url, fd)
    .then(function(response) {
      console.log(response);
    });
    $scope.showSocialMedia();
    $scope.showInstagram(true);
  }
  else{
    $scope.isLoggedin = false;
    $scope.signin = true;
  }
});
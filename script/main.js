var app = angular.module('mainApp', []);
app.controller('mainController', function($scope, $sce) {
  
  var divElement = document.getElementById('viz1584757337675');                    
  var vizElement = divElement.getElementsByTagName('object')[0];                    
  vizElement.style.width='1100px';vizElement.style.height='1150px';                    
  var scriptElement = document.createElement('script');                    
  scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    
  vizElement.parentNode.insertBefore(scriptElement, vizElement);

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

  $scope.showFacebook = function(){
      $scope.facebook = true;
      $scope.instagram = false;
  }

  $scope.showInstagram = function(){
    $scope.instagram = true;
    $scope.facebook = false;
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

  $scope.showDashboard();

});
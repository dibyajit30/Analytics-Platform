var app = angular.module('mainApp', []);
app.controller('mainController', function($scope, $sce) {
  
  //$scope.purchaseAnalysisLink = $sce.trustAsResourceUrl("https://public.tableau.com/profile/lovelytics#!/vizhome/LovelyticsRetailDashboards/PurchaseAnalysis");
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
myApp.controller('RegistrationController', 
  ['$scope', 'Authentication', function($scope, Authentication){
    $scope.login = function() {
      Authentication.login($scope.user);
    };
    
    $scope.logout = function() {
      Authentication.logout();
    };
    
    $scope.register = function() {
      Authentication.register($scope.user);
    };
    
    $scope.googleAuth = function() {
      Authentication.googleAuth($scope.user);
    };
    
    $scope.facebookAuth = function() {
      Authentication.facebookAuth($scope.user);
    };
    
    
}]);
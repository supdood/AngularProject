myApp.controller('RegistrationController', 
  ['$scope', function($scope){
    $scope.login = function() {
      $scope.message = "Welcome " + $scope.user.email;
    };
    
    $scope.register = function() {
      firebase.auth().createUserWithEmailAndPassword($scope.user.email, $scope.user.password)
        .then(function(){
          $scope.message = "Thanks for registering!";
          $scope.$apply();
      })
        .catch(function(error) {
        // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          $scope.message = errorMessage;
        
          console.log($scope.message);
        // ...
        $scope.$apply();
        });
    };
}]);
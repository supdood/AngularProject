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
    
    $scope.google = function() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    };
    
    $scope.facebook = function() {
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    };
    
    
    
}]);
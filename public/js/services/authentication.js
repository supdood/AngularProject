/*global myApp */
myApp.factory('Authentication', ['$rootScope', function($rootScope) {
  
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      firebase.database().ref('users/' + user.uid).on('value', function(snapshot) {
        $rootScope.session = snapshot.val();
        $rootScope.$apply();
      });
    } else {
      $rootScope.session = "";
    }
  });
  
  
  return {
    login: function(user) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(function(){
          $rootScope.message = "Welcome " + user.email;  
          $rootScope.$apply();
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          $rootScope.message = errorMessage;
          $rootScope.$apply();
          // ...
        });
    }, //login
    
    logout: function() {
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }, function(error) {
        // An error happened.
      });
    }, //logout
    
    register: function(user) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(function(regUser){
          $rootScope.message = user.firstname + ", thanks for registering!";
          $rootScope.$apply();
        
          firebase.database().ref('users/' + regUser.uid).set({
            id: regUser.uid,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname
          });
      })
      .catch(function(error) {
      // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        $rootScope.message = errorMessage;
        $rootScope.$apply();
      });
    },
    
    googleAuth: function(user) {
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
        $rootScope.message = errorMessage;
        $rootScope.$apply();
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    },
    
    facebookAuth: function(user) {
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
        $rootScope.message = errorMessage;
        $rootScope.$apply();
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    }
    
  };
  
}]);
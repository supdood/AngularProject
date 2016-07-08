/*global myApp */
myApp.factory('Authentication', ['$rootScope', '$firebaseAuth', '$firebaseObject', function($rootScope, $firebaseAuth, $firebaseObject) {
  
  $rootScope.authObj = $firebaseAuth();
  $rootScope.authObj.$onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {
      console.log("Signed in as:", firebaseUser.uid);
      var ref = firebase.database().ref("users/" + firebaseUser.uid);
      //var child = ref.child(firebaseUser.uid);
      $firebaseObject(ref).$loaded().then(function(val) {
        $rootScope.session = val;
      });
    } else {
      console.log("Signed out");
      $rootScope.session = null;
    }
  });
  
  return {
    login: function(user) {
      $rootScope.authObj.$signInWithEmailAndPassword(user.email, user.password).then(function(firebaseUser) {
          $rootScope.message = "Signed in as: " + user.email;
        }).catch(function(error) {
          $rootScope.message = error;
        });
    }, //login
    
    logout: function() {
      $rootScope.authObj.$signOut();
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
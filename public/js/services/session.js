myApp.factory('Session', function() {
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
  
});
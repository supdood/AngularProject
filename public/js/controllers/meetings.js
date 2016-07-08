myApp.controller('MeetingsController', ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', function($scope, $rootScope, $firebaseAuth, $firebaseArray){
  
  var ref;
  var list;
  
  $rootScope.session.$watch().then(function(val) {
        ref = firebase.database().ref("users/" + $rootScope.session.id + '/meetings');
        list = $firebaseArray(ref);
  });
  
  $scope.addMeeting = function() {
    $rootScope.session.firstname = list;
    list.$add({
        name: $scope.meetingname,
        date: firebase.database.ServerValue.TIMESTAMP
    });
  };
  
  $scope.deleteMeeting = function(key) {
    var ref = firebase.database().ref("users/" + $rootScope.session.id + '/meetings');
    var list = $firebaseArray(ref);
    list.$remove(key);
  };
  
}]);
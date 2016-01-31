(function() {
  var app = angular.module('queup', ['ionic', 'angularMoment', 'firebase'])

  app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('queue', {
        url: '/queue',
        templateUrl: 'templates/queue.html'
      })
      .state('edit', {
        url: '/edit/:personId',
        controller: 'EditController',
        templateUrl: 'templates/edit.html'
      })

      .state('add', {
        url: '/add',
        controller: 'AddController',
        templateUrl: 'templates/edit.html'
      });

    $urlRouterProvider.otherwise('/queue');
  });
  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  app.controller('QueueController', function($scope, $state, $ionicPopup, Queue) {
    $scope.queue = Queue;

    // $scope.queue.$loaded(function() {
    //   if($scope.queue.length === 0) {
    //     $scope.queue.$add({
    //       name: 'Min Zhu',
    //       status: 'Added to queue',
    //       updatedTime: Firebase.ServerValue.TIMESTAMP
    //     });
    //     $scope.queue.$add({
    //       name: 'David Cai',
    //       status: 'Added to queue',
    //       updatedTime: Firebase.ServerValue.TIMESTAMP
    //     });
    //   }
    // });

    $scope.add = function() {
      $state.go('add');
    };

    $scope.delete = function(person) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete',
        template: 'Are you sure that you want to delete?',
      });

      confirmPopup.then(function(res) {
        if (res) {
          Queue.$remove(person);
        }
      });

    };

  });

  app.controller('AddController', function($scope, $state, Queue){
    $scope.person = {
      name: '',
      status: 'waiting in queue'
    };

    $scope.save = function() {
      $scope.person.updatedTime = Firebase.ServerValue.TIMESTAMP;
      Queue.$add($scope.person);
      $state.go('queue');
    };
  });

  app.controller('EditController', function($scope, $state, $ionicPopup, Queue) {

    var person = Queue.$getRecord($state.params.personId);
    $scope.person = angular.copy(person);
    console.log('person',person);

    $scope.save = function() {
      person.name = $scope.person.name;
      person.status = $scope.person.status;
      person.updatedTime = Firebase.ServerValue.TIMESTAMP;
      Queue.$save(person);
      $state.go('queue');
    };
    $scope.delete = function() {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete',
        template: 'Are you sure that you want to delete?',
      });

      confirmPopup.then(function(res) {
        if (res) {
          Queue.$remove(person);
        }
      });
    }
  });

})();

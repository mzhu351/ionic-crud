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

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  app.controller('QueueController', function($scope, $state, queueService) {
    $scope.queue = queueService.getPeople();

    $scope.add = function() {
      $state.go('add');
    };

    $scope.delete = function(personId) {
      queueService.deletePerson(personId);
    };

  });

  app.controller('AddController', function($scope, $state, queueService){
    $scope.person = {
      name: '',
      status: 'waiting in queue'
    };

    $scope.save = function() {
      queueService.addPerson($scope.person);
      $state.go('queue');
    }
  });

  app.controller('EditController', function($scope, $state, queueService) {

    $scope.person = angular.copy(queueService.getPerson($state.params.personId));

    $scope.save = function() {
      queueService.updatePerson($scope.person);
      $state.go('queue');
    };
    $scope.delete = function() {
      queueService.deletePerson($scope.person.id)
      $state.go('queue');
    }
  });

})();

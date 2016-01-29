(function() {
  var app = angular.module('queup', ['ionic'])

  app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('queue', {
        url: '/queue',
        templateUrl: 'templates/queue.html'
      })
      .state('edit', {
        url: '/edit/:personId',
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

  app.controller('QueueController', function($scope, queueService) {
    $scope.queue = queueService.getPeople();
  });

  app.controller('EditController', function($scope, $state) {
    $scope.save = function() {
      $state.go('queue');
    };
    $scope.delete = function() {
      $state.go('queue');
    }
  });

})();

(function() {
	var app = angular.module('queup');

	app.factory('queueService', function() {
console.log('svc called');
		var searchValue,
				index = -1;

		var people = [
	    {
	      id: '1',
	      name: 'David Cai',
	      status: 'Waiting in queue'
	    },
	    {
	      id: '2',
	      name: 'Jon Burt',
	      status: 'Waiting in queue'
	    }
		];

		function indexOf(id) {
			_.findIndex(people, ['id', id]);
		}

		return {
			getPeople: function() {
				return people;
			},

			getPerson: function(id) {
				return people[indexOf(id)];
			},

			updatePerson: function(person) {
				people[indexOf(person.id)] = person;
			},

			deletePerson: function(id) {
				var i = indexOf(id);
				people.splice(i, 1);
			}
		}



	})
})();

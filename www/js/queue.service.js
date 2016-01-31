(function() {
	var app = angular.module('queup');

	app.factory('queueService', function() {
console.log('svc called');

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
	    },
			{
	      id: '3',
	      name: 'Min Zhu',
	      status: 'Waiting in queue'
	    }
		];

		function indexOf(id) {
			return _.findIndex(people, ['id', id]);
		}

		return {
			getPeople: function() {
				return people;
			},

			getPerson: function(id) {
				console.log('getPerson', people[indexOf(id)]);
				return people[indexOf(id)];
			},

			updatePerson: function(person) {
				people[indexOf(person.id)] = person;
			},

			deletePerson: function(id) {
				var i = indexOf(id);
				people.splice(i, 1);
			},

			addPerson: function(person) {
				person.id = person.length + 1 + '';
				people.push(person);
			}
		}



	})
})();

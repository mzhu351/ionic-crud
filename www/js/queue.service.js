(function() {
	var app = angular.module('queup');

	app.factory('queueService', function() {

		function indexOf(id) {
			return _.findIndex(people, ['id', id]);
		}

		return {
			getPeople: function() {
				return people;
			},

			getPerson: function(id) {
				return people[indexOf(id)];
			},

			updatePerson: function(person) {
				person.updatedTime = moment();
				people[indexOf(person.id)] = person;
			},

			deletePerson: function(id) {
				var i = indexOf(id);
				people.splice(i, 1);
			},

			addPerson: function(person) {
				person.updatedTime = moment();
				person.id = person.length + 1 + '';
				people.push(person);
			}
		}



	})
})();

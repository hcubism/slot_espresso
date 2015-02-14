DRINK_TYPES = ['coffee', 'tea', 'espresso'];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function commonElement(array) {
	for (var i = 0; i < array.length - 1 ; i++) {
		if (array[i] !== array[i + 1]) {
			return null
		}
	}
	return array[0];
}

var slotmachineApp = angular.module('slotmachineApp', []);

slotmachineApp.controller('SlotMachineCtrl', function() {
	this.slots = [];
	this.slotResults = [];
	this.currentDrink = null;

	this.startSlots = function() {
		this.slots = [];
		for (var i = 0; i < 3; i++) {
			this.slots.push(getRandomInt(0, 3));
		};
	};

	this.setDrinkIfAny = function() {
		this.currentDrink = commonElement(this.slots);
	}

	this.doTheSpin = function() {
		this.startSlots();
		this.setDrinkIfAny();
	}
});


var Slot = function() {
	this.currentDrink = null;

	this.pickDrink = function() {
		this.currentDrink = getRandomInt(0, 3);
	}
};
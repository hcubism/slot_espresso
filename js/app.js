var Util = {
	'getRandomInt': function(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	},
	'commonElement': function(array) {
		for (var i = 0; i < array.length - 1 ; i++) {
			if (array[i] !== array[i + 1]) {
				return null
			}
		}
		return array[0];
	}
};


var DRINK_TYPES = ['coffee', 'tea', 'espresso'];

var slotmachineApp = angular.module('slotmachineApp', []);

slotmachineApp.controller('SlotMachineCtrl', function() {

	this.slots = {
		'vessel': new Slot('vessel'),
		'filter': new Slot('filter'),
		'ingredient': new Slot('ingredient')
	};

	this.currentDrink = null;

	this.startSlots = function() {
		for (var partType in this.slots) {
			this.slots[partType].pickDrink();
		};
	};

	this.setDrinkIfAny = function() {
		var temp = [];
		for (var partType in this.slots) {
			temp.push(this.slots[partType].currentDrink);
		}
		this.currentDrink = Util.commonElement(temp);
	};

	this.doTheSpin = function() {
		this.startSlots();
		this.setDrinkIfAny();
	};

	this.showDrinkForSlot = function(index) {
		var slotDrink = this.slots[index];
		return this.DRINK_TYPES[slotDrink];
	};
});


var Slot = function(partType) {
	this.partType = partType;
	this.currentDrink = null;
	this.isAnimating = false;
	this.bgPosition = 0;

	this.pickDrink = function() {
		this.currentDrink = DRINK_TYPES[Util.getRandomInt(0, 3)];
	};

	this.animateSlot = function() {
		this.isAnimating = true;
		this.animation = setInterval(function() {
			this.bgPosition += 10;
		}, 100)
	};

	this.stopSlot = function() {
		clearInterval(this.animation);
		this.isAnimating = false;
	};
};
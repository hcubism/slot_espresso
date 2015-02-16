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

slotmachineApp.controller('SlotMachineCtrl', ['$interval', '$timeout', function($interval, $timeout) {

	this.slots = {
		'vessel': new Slot('vessel'),
		'filter': new Slot('filter'),
		'ingredient': new Slot('ingredient')
	};

	this.currentDrink = null;

	this.startSlots = function() {
		for (var partType in this.slots) {
			var slot = this.slots[partType];
			slot.animateSlot($interval, $timeout);
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
		var machine = this;
		$timeout(function() {
			machine.setDrinkIfAny();
		}, 5000);
	};

	this.showDrinkForSlot = function(index) {
		var slotDrink = this.slots[index];
		return this.DRINK_TYPES[slotDrink];
	};
}]);


var Slot = function(partType) {
	this.partType = partType;
	this.currentDrink = null;
	this.currentDrinkIndex = null;
	this.isAnimating = false;
	this.bgPosition = 0;

	this.pickDrink = function() {
		var drinkIndex = Util.getRandomInt(0, 3);
		this.currentDrink = DRINK_TYPES[drinkIndex];
		this.currentDrinkIndex = drinkIndex;
	};

	this.animateSlot = function(ngInterval, timeout) {
		this.isAnimating = true;
		var slot = this;
		this.animation = ngInterval(function() {
			slot.bgPosition += 100;
		}, 100);
		timeout(function() {
			slot.pickDrink();
			ngInterval.cancel(slot.animation);
			slot.adjustToDrink();
		}, 1000);
	};

	this.adjustToDrink = function() {
		this.isAnimating = false;
		var quotient = Math.floor(this.bgPosition/258);
		this.bgPosition = 86 * (3 * quotient + this.currentDrinkIndex);
	};
};
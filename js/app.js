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

	this.slots = [new Slot('vessel'), new Slot('filter'), new Slot('ingredient')];

	this.currentDrink = null;
	this.isAnimating = false;

	this.startSlots = function() {
		this.isAnimating = true;
		for (var i = 0; i < this.slots.length; i++) {
			this.slots[i].animateSlot($interval, $timeout);
		};
	};

	this.setDrinkIfAny = function() {
		var temp = [];
		for (var i = 0; i < this.slots.length; i++) {
			temp.push(this.slots[i].currentDrink);
		}
		this.currentDrink = Util.commonElement(temp);
		this.isAnimating = false;
	};

	this.doTheSpin = function() {
		this.startSlots();
		var machine = this;
		$timeout(function() {
			machine.setDrinkIfAny();
		}, 3000);
	};
}]);


var Slot = function(partType) {
	this.partType = partType;
	this.currentDrink = null;
	this.currentDrinkIndex = null;
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
			slot.bgPosition += 300;
		}, 200);
		timeout(function() {
			slot.pickDrink();
			ngInterval.cancel(slot.animation);
			slot.adjustToDrink();
		}, 2000);
	};

	this.adjustToDrink = function() {
		var quotient = Math.floor(this.bgPosition/300);
		this.bgPosition = 150 * (3 * quotient + this.currentDrinkIndex);
	};
};
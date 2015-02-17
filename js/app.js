/** Utility functions */
var Util = {
	/* Finds a random integer between min (inclusive) and max (exclusive) */
	'getRandomInt': function(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	},

	/* Checks if all the elements in the array are the same. If so, return it */
	'commonElement': function(array) {
		for (var i = 0; i < array.length - 1 ; i++) {
			if (array[i] !== array[i + 1]) {
				return null
			}
		}
		return array[0];
	}
};

var slotmachineApp = angular.module('slotmachineApp', []);

/** The controller for the slot machine */
slotmachineApp.controller('SlotMachineCtrl', ['$interval', '$timeout', function($interval, $timeout) {

	this.slots = [new Slot('vessel'), new Slot('filter'), new Slot('ingredient')];

	this.drinkToShow = null;
	this.isAnimating = false;

	this.startSlots = function() {
		this.isAnimating = true;
		for (var i = 0; i < this.slots.length; i++) {
			// Need to pass in $interval and $timeout for data binding to work correctly
			this.slots[i].animateSlot($interval, $timeout);
		};
	};

	this.setDrinkIfAny = function() {
		var temp = [];
		for (var i = 0; i < this.slots.length; i++) {
			temp.push(this.slots[i].currentDrink);
		}
		this.drinkToShow = Util.commonElement(temp);
		this.isAnimating = false;
	};

	/* The function that sets things rolling ;) */
	this.spinItUp = function() {
		this.startSlots();
		var machine = this;
		// Ideally, the machine will listen for some kind of response from the slots,
		// rather than a timeout, before possibly putting out a drink.
		//  Haven't gotten around to figuring that out though.
		$timeout(function() {
			machine.setDrinkIfAny();
		}, 3000);
	};
}]);


/** The Slot object */
var Slot = function(partType) {
	this.drinkTypes = ['coffee', 'tea', 'espresso'];

	this.partType = partType;
	this.currentDrink = null;

	// currentDrinkIndex is for figuring out
	// background position when a drink is picked
	this.currentDrinkIndex = null;
	this.bgPosition = 0;

	this.pickDrink = function() {
		var drinkIndex = Util.getRandomInt(0, 3);
		this.currentDrink = this.drinkTypes[drinkIndex];
		this.currentDrinkIndex = drinkIndex;
	};

	this.animateSlot = function(ngInterval, timeout) {
		var slot = this;
		// Start scrolling that background!
		this.animation = ngInterval(function() {
			slot.bgPosition += 300;
		}, 200);

		// After two seconds, pick a drink, then scroll to the corresponding sprite.
		timeout(function() {
			slot.pickDrink();
			ngInterval.cancel(slot.animation);
			slot.adjustToDrink();
		}, 2000);
	};

	/* Calculates where to stop scrolling */
	this.adjustToDrink = function() {
		var quotient = Math.floor(this.bgPosition/450);
		this.bgPosition = 150 * (3 * quotient + this.currentDrinkIndex);
	};
};
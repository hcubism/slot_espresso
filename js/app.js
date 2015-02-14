

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

var Slot = function() {
	this.currentDrink = null;

	this.pickDrink = function() {
		this.currentDrink = getRandomInt(0, 3);
	}
};

var SlotMachine = function() {
	this.slots = [];
	this.slotResults = [];
	this.button = null;
	this.currentDrink = null;

	this.initializeMachine = function(button) {
		for (var i = 0; i < 3; i++) {
			this.slots.append(new Slot());
		}
		this.button = button;
	};

	this.startSlots = function() {
		$(this.slots).each(function(i) {
			slotResults.push($(this).pickDrink());
		});
	};

	this.checkResults = function() {
		this.currentDrink = commonElement(this.slotResults);
	}
};

var slot = new SlotMachine();
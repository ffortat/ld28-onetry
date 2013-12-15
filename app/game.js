function Game() {
	var self = this;

	this.hud = new Interface(this);
	this.level = new Level(this);

	this.offset = {
		x : 0,
		y : 0
	};

	load.json('level.json', function (data) {self.init(data);});
}

Game.prototype.init = function(data) {
	this.level.load(data);
};

Game.prototype.over = function() {
	game = new Game();
	current = game;
};

Game.prototype.tick = function(length) {
	this.offset.y += length * this.level.speed / 1000;

	if (this.level.index * this.level.screen.height < this.offset.y) {
		this.level.index += 1;
		this.level.nextScreen();
	}

	this.level.tick(length);
	this.hud.tick(length);

	this.draw(this.offset);
};

Game.prototype.draw = function(offset) {
	this.level.draw(offset);
	this.hud.draw(offset);
};
console.log("main is loading");


var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.Auto, "game", {

	init: init,
	preload: preload,
	create: create,
	update: update,
});


function init() {
	console.log("init");
}

function preload() {
	console.log("preload");
	//initialize game physics
	game.physics.startSystem(Phaser.Physics.ARCADE);

	//loads images
	game.load.image("bg", "../assets/img/cool-space-background.jpg");
	game.load.image("player", "../assets/img/ship.png");
	game.load.image("laser", "../assets/img/beam.png");
	game.load.image("missile", "../assets/img/missile.png");
	game.load.image("enemy", "../assets/img/enemy2.png");

	//loads animations
	game.load.spritesheet("smallboom", "../assets/img/explosion.png", 64, 64);

	// loads sounds
	game.load.audio("music", "../assets/audio/Shadelike.mp3");
	game.load.audio("pewpew", ["../assets/audio/laser.ogg", "../assets/audio/laser.mp3"]);
	game.load.audio("launch", "../assets/audio/Missile.mp3");
	game.load.audio("boom", "../assets/audio/explosion.mp3");


}

function create() {
	console.log("create");
	//create and scroll background
	var background = game.add.tileSprite(0, 0, game.width, game.height, "bg");
	//neg number controls scroll speed
	background.autoScroll(-20, 0);

	//start music
	music = game.add.audio("music", .1);
	pewpew = game.add.audio("pewpew", .3 );  //number alters the volume
	launch = game.add.audio("launch", 2);
	boom = game.add.audio("boom", .4);
	music.play();

	//create the player, place it in the world, and give it life
	// x/y coordinates for placement
	player = game.add.sprite(50, 250, "player",);
	game.physics.arcade.enable(player);
	player.body.collideWorldBounds = true;
	player.score = 0;
	player.life = STARTING_LIFE;

	//create laser objects
	lasers = game.add.group();
	lasers.enableBody = true;
	lasers.physicsBodyType = Phaser.Physics.ARCADE;
	lasers.createMultiple(40, "laser");
	lasers.setAll("outOfBoundsKill", true);
	lasers.checkWorldBounds = true;

	//create missile objects
	missiles = game.add.group();
	missiles.enableBody = true;
	missiles.physicsBodyType = Phaser.Physics.ARCADE;
	missiles.createMultiple(10, "missile");
	missiles.setAll("outOfBoundsKill", true);
	missiles.checkWorldBounds = true;

	//create enemies
	enemies = game.add.group();
	enemies.enableBody = true;
	enemies.physicsBodyType = Phaser.Physics.ARCADE;
	enemies.createMultiple(30, "enemy");
	enemies.setAll("outOfBoundsKill", true);
	enemies.checkWorldBounds = true;
	enemies.forEach(function(enemy){
		enemy.life = ENEMY_LIFE;
	})

	//create explosions
	explosions = game.add.group();
	explosions.createMultiple(10, "smallboom");
	explosions.setAll("anchor.x", 0);
	explosions.setAll("anchor.y", 0);
	explosions.forEach(function(explosion){
		explosion.animations.add("smallboom");
	});


	//add keyboard controls
	cursors = game.input.keyboard.createCursorKeys(); //arrow keys
	game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.ENTER])

	// add score and hp text to screen
	hpText = game.add.text(GAME_WIDTH - 140, 20, "Life: " + player.life.toString(), {fill: "#fff"});
	scoreText = game.add.text(GAME_WIDTH - 140, GAME_HEIGHT - 50, "Score: " + player.score.toString(), {fill: "#fff"});

	//call enemies
	game.time.events.loop(Phaser.Timer.SECOND * 2, spawnEnemy);

}

function update() {
	player.body.velocity.set(0);
	if (cursors.left.isDown) {
		player.body.velocity.x = -DEFAULT_SPEED;
	} else if (cursors.right.isDown) {
		player.body.velocity.x = DEFAULT_SPEED;
	}
	if(cursors.up.isDown) {
		player.body.velocity.y = -DEFAULT_SPEED;
	}else if (cursors.down.isDown) {
		player.body.velocity.y = DEFAULT_SPEED;
	}

	if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
		//fire the weapon
		fireWeapon();
	}	
	if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
		switchWeapon();
	}
	game.physics.arcade.overlap(player, enemies, hurtPlayer);
	game.physics.arcade.overlap(lasers, enemies, hitEnemy);
	game.physics.arcade.overlap(missiles, enemies, hitEnemy);
}
	










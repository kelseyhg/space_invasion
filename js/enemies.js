	
function spawnEnemy() {
	var enemy = enemies.getFirstExists(false);
	enemy.reset(GAME_WIDTH-50, game.rnd.integerInRange(50, GAME_HEIGHT-50))
	enemy.body.velocity.x = -150;
}

function hurtPlayer(player, enemy) {
	console.log("OUCH");
	//sound effects/visual effects
	boom.play();
	var explosion = explosions.getFirstExists(false);
	explosion.reset(player.body.x, player.body.y);
	explosion.play("smallboom", 50, false, true);

	//logic
	enemy.kill();
	player.life -= 20;
	hpText.text = "Life " + player.life.toString();

	if (player.life <= 0) {
		player.kill();
		gameOver();
	} else if (player.life <= 40){
		player.tint = "0xff0000";
	}
}

function hitEnemy(weapon, enemy) {
	console.log('hit!');
	boom.play();
	var explosion = explosions.getFirstExists(false);
	explosion.reset(enemy.body.x, enemy.body.y);
	explosion.play("smallboom", 50, false, true);
	weapon.kill();
	enemy.life -= WEAPONS[currentWeapon].damage;
	if (enemy.life <= 0){
		enemy.kill();
		addScore(10);
	}
}
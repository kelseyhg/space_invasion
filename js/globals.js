var DEFAULT_SPEED = 200;
var GAME_WIDTH = 800;
var GAME_HEIGHT = 500;
var STARTING_LIFE = 140;
var ENEMY_LIFE = 100;
var SWITCH_WEAPON_TIMER = 200;
var WEAPONS = [
{name: "laser", velocity: 450, offset: 20, timer: 200, damage: 25},
{name: "missile", velocity: 275, offset: 20, timer: 600, damage: 100}
];


var player, cursors;
var scoreText;
var hpText;
var lasers;
var enemies;
var explosions;
var music, pewpew;
var weaponTimer = 0;
var switchTimer = 0;
var currentWeapon = 0;


var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)

var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score = 0;
var labelScore;
var player;
var gapStart =  game.rnd.integerInRange(1, 5);
var pipes = [];

player.x = 150;
player.y = 200;




function preload() {
    //game.load.image("playerImg", "../assets/Ideal-landscape.jpg");
    game.load.image("click", "../assets/flappy_frog.png");
    game.load.audio("score", "../assets/point.ogg");
    game.load.image("pipe", "../assets/pipe_orange.png");
}


function create() {
    game.stage.setBackgroundColor("#D5D5DB");

    generatePipe()

    game.add.text(180,20,"Flapping around since 2015",
        {font:"30px DejaVu Sans Light", fill: "#E62E00"});

    game.input
        .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(moveUp);

    labelScore = game.add.text( 700, 20, "0");

    player = game.add.sprite(100, 200, "click");

    game.physics.startSystem(Phaser.Physics.ARCADE);

    player = game.add.sprite(80, 200, "click");
    game.physics.arcade.enable(player);
    player.body.velocity.x = 0;
    player.body.velocity.y = -10;
    player.body.gravity.y = 5;

}


function addPipeBlock(x, y){
    var block = game.add.sprite(x,y,"pipe");
    pipes.push(block);
}



function generatePipe() {

    var gap = game.rnd.integerInRange(1, 5);
    for(var count=0; count<8; count++){
        if(count != gap && count != gap + 1) {
           addPipeBlock(180 , count*50);

        }
    }
}

function changeScore () {
    score = score ++;
    labelScore.setText(score.toString());
}

function moveUp(){
        player.y = player.y - 25
}


function clickHandler(event) {
    //alert("Ahoy there ;)");
   // alert("The position is: " + event.x+ "," + event.y);
    //game.add.sprite(event.x, event.y, "click");
}

function spaceHandler() {
    game.sound.play("score");
}


function update() {

}
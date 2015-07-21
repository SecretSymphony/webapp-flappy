// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };
var background;
// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(500, 300, Phaser.AUTO, 'game', stateActions);
var P1;
var P2;
var Obstacles = [];
var players = 2;
var score1 = 0;
var labelScore1;
var score2 = 0;
var labelScore2;

jQuery("#greeting-form").on("submit", function(event_details) {
    alert("Submitted");
});

function preload() {
    game.load.image("BackgroundImg","../assets/Water_texture_1390894_Nevit.jpg");
    game.load.audio("Shark", "../assets/Shark sound.wav");
    game.load.image("Swimmer", "../assets/Swimmer.gif");
    game.load.image("Shark", "../assets/Sharky.gif");
    game.load.image("Buoy", "../assets/Buoy.png");
    game.load.image("Cruise", "../assets/Pir.gif");
}
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    background = game.add.image(0,0, "BackgroundImg");
    game.input
        .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(spaceHandler);
    game.input
        .keyboard.addKey(Phaser.Keyboard.UP)
        .onDown.add(arrowHandler);
    P1 = game.add.sprite(120, 200, "Swimmer");
    P1.height=50;
    P1.width=52;
    game.physics.arcade.enable(P1);
    P1.body.gravity.y = 400
    P2 = game.add.sprite(20, 200, "Shark");
    P2.height=50;
    P2.width=88;
    game.physics.arcade.enable(P2);
    P2.body.gravity.y = 400
    pipeInterval = 1.75;
    game.time.events.loop(pipeInterval*Phaser.Timer.SECOND,pipeGenerator);
    labelScore1 = game.add.text (700, 20, "0");
    labelScore2 = game.add.text (700,80,"0");
    changeScore1()
    changeScore2()
}
function update() {
    game.physics.arcade
        .overlap(P1, Obstacles, killP1);
    game.physics.arcade
        .overlap(P2, Obstacles, killP2);


}
function spaceHandler() {
    game.sound.play("Shark");
    P2.body.velocity.y = -200
}
function arrowHandler(){
    P1.body.velocity.y = -200
}
function pipeGenerator(){
    var select = game.rnd.integerInRange(1, 2);
    if(select == 1){
        buoyGenerator();
    }
    else (
        shipGenerator()
    )
}
function buoyGenerator(){
    var gap = game.rnd.integerInRange(1, 5);
    for(var count=0; count<8; count+=1){
        if(count != gap ){
            O1 = game.add.sprite(800, 50*count, "Buoy");
            O1.height = 50;
            O1.width = 50;
            Obstacles.push(O1);
            game.physics.arcade.enable(O1);
            O1.body.velocity.x = - 200
        }
        else (
            count++
        )
    }
}
function shipGenerator(){
    var gap = game.rnd.integerInRange(1,5);
    for(var count=0; count<8; count+=1) {
        if(count != gap){
            O2 = game.add.sprite(800, 50 * count, "Cruise");
            O2.height = 50;
            O2.width = 56;
            Obstacles.push(O2);
            game.physics.arcade.enable(O2);
            O2.body.velocity.x = - 200
        }
        else (
            count++
        )
    }
}
function killP1(){
    if (players == 2){
        P1.destroy();
        players = 1;
    }
    else {
        P1.destroy();
        game.destroy();
    }
}
function killP2(){
    if (players == 2){
        P2.destroy();
        players = 1;
    }
    else {
        P2.destroy();
        game.destroy();
    }
}
function changeScore1(){
    score1 = score1 + 1;
    labelScore1.setText(score1.toString());
}
function changeScore2(){
    score2 = score2 + 1;
    labelScore2.setText(score2.toString());
}
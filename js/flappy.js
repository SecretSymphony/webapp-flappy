// the Game object used by the phaser.io library
var stateActions = {preload: preload, create: create, update: update};
var background;
// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 300, Phaser.AUTO, 'game', stateActions);
var P1;
var P2;
var Obstacles = [];
var players = 2;
var score1 = -2;
var labelScore1;
var score2 = -2;
var labelScore2;
var gameDeathTruth1 = false;
var gameDeathTruth2 = false;
var splashDisplay1;
var splashDisplay2;
var labelScore3;
var labelScore4;
var labelScore5;
var Title;
var pipeInterval;
var playing = true;

jQuery("#greeting-form").on("submit", function (event_details) {
    alert("Submitted");
});

function preload() {
    game.load.image("BackgroundImg", "../assets/Water.jpg");
    game.load.audio("Shark", "../assets/Shark sound.wav");
    game.load.image("Swimmer", "../assets/Swimmer.gif");
    game.load.image("Shark", "../assets/Sharky.gif");
    game.load.image("Buoy", "../assets/Buoy.png");
    game.load.image("Cruise", "../assets/Pir.gif");
    game.load.image("Blood", "../assets/blood.png");
}

function start() {


    game.input
        .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(spaceHandler);
    game.input
        .keyboard.addKey(Phaser.Keyboard.UP)
        .onDown.add(arrowHandler);

    P1.body.gravity.y = 400;

    P2.body.gravity.y = 400;


    pipeInterval = 1.75;
    game.time.events.loop(pipeInterval * Phaser.Timer.SECOND, pipeGenerator);

    game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.remove(start);

    splashDisplay1.destroy();
    labelScore3.destroy();
    labelScore4.destroy();
    Title.destroy();
}

function refresh() {
    Title.destroy();
    console.log("refresh");

    splashDisplay2.destroy();
    labelScore5.destroy();


    game.state.restart();

}

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    background = game.add.image(0, 0, "BackgroundImg");

    P1 = game.add.sprite(160, 200, "Swimmer");
    P1.height = 25;
    P1.width = 26;
    game.physics.arcade.enable(P1);

    P1.anchor.setTo(0.5, 0.5);

    P2 = game.add.sprite(50, 200, "Shark");
    P2.height = 25;
    P2.width = 44;
    game.physics.arcade.enable(P2);

    P2.anchor.setTo(0.5, 0.5);

    labelScore1 = game.add.text(130, 20, "0");
    labelScore2 = game.add.text(30, 20, "0");

    splashDisplay1 = game.add.text(160, 100, "ENTER at your own peril",
        {font: "30px Rock Salt", fill: "#FF0000"});
    Title = game.add.image(400, 150, "Blood");

    labelScore3 = game.add.text(130, 250, "UP, UP and away",
        {font: "14px Arial", fill: "#FFFFFF"});
    labelScore4 = game.add.text(20, 250, "SPACE out",
        {font: "14px Arial", fill: "#FF0000"});


    game.input
        .keyboard.addKey(Phaser.Keyboard.ENTER)
        .onDown.add(start);



}

function end() {
    if(playing) {
        Title = game.add.sprite(400, 150, "Blood");

        splashDisplay2 = game.add.text(160, 100, "See ya loser",
            {font: "30px Rock Salt", fill: "#FF0000"});



        labelScore5 = game.add.text(20, 250, "R to go again",
            {font: "14px Arial", fill: "#FFFFFF"});



        game.input
            .keyboard.addKey(Phaser.Keyboard.Q)
            .onDown.add(refresh);

        playing = false;
    }
}

function update() {
    game.physics.arcade
        .overlap(P1, Obstacles, killP1);
    game.physics.arcade
        .overlap(P2, Obstacles, killP2);

    if (P1.body.y < 0 || P1.body.y > 300) {
        killP1();
    }

    if (P2.body.y < 0 || P2.body.y > 300) {
        killP2();
    }

    if (gameDeathTruth1 && gameDeathTruth2) {
        end();

    }
    P1.rotation = Math.atan(P1.body.velocity.y / 200);
    P2.rotation = Math.atan(P2.body.velocity.y / 200);


}
function spaceHandler() {
    game.sound.play("Shark");
    P2.body.velocity.y = -200
}
function arrowHandler() {
    P1.body.velocity.y = -200
}
function pipeGenerator() {
    var select = game.rnd.integerInRange(1, 2);
    if (select == 1) {
        buoyGenerator();
    }
    else {
        shipGenerator()
    }

    if (gameDeathTruth1 == false) {
        changeScore1();
    }

    if (gameDeathTruth2 == false) {
        changeScore2();
    }

}
function buoyGenerator() {
    var gap = game.rnd.integerInRange(1, 4);
    for (var count = 0; count < 8; count += 1) {
        if (count != gap) {
            O1 = game.add.sprite(800, 50 * count, "Buoy");
            O1.height = 50;
            O1.width = 50;
            Obstacles.push(O1);
            game.physics.arcade.enable(O1);
            O1.body.velocity.x = -200
        }
        else (
            count++
        )
    }
}
function shipGenerator() {
    var gap = game.rnd.integerInRange(1, 4);
    for (var count = 0; count < 8; count += 1) {
        if (count != gap) {
            O2 = game.add.sprite(800, 50 * count, "Cruise");
            O2.height = 50;
            O2.width = 56;
            Obstacles.push(O2);
            game.physics.arcade.enable(O2);
            O2.body.velocity.x = -200
        }
        else (
            count++
        )
    }
}
function killP1() {

    P1.destroy();


    gameDeathTruth1 = true;

}
function killP2() {

    P2.destroy();

    gameDeathTruth2 = true;

}
function changeScore1() {
    score1 = score1 + 1;
    labelScore1.setText(score1.toString());
}
function changeScore2() {
    score2 = score2 + 1;
    labelScore2.setText(score2.toString());
}

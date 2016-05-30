/*jslint browser: true, devel: true, white: true, plusplus: true, sloppy: true*/
//1. Setup Challenge database

function Challenge() {
    this.digit0 = ["s", "z"];
    this.digit1 = ["t", "d", "th"];
    this.digit2 = ["n"];
    this.digit3 = ["m"];
    this.digit4 = ["r"];
    this.digit5 = ["l"];
    this.digit6 = ["j", "ch", "sh"];
    this.digit7 = ["c", "k", "g", "q", "ck"];
    this.digit8 = ["v", "f", "ph"];
    this.digit9 = ["p", "b"];

}
// 1.1 Make the rules available and create a random number
var rules = new Challenge(),
    //console.log(rules);
    //console.log(typeof rules);
    rulesArray = Object.keys(rules),
    rulesLenght = rulesArray.length;
//console.log(rulesArray.length);


//2. Setup Player
function Player(gameType) {
    // gameType: numbers, letters, words
    this.gameType = gameType;
    this.streak = 0;
    this.highScore = 0;
    this.answer = "";
    this.challenge = Math.floor((Math.random() * 10));
    this.challengex = 10;
    this.challengey = 10;
    this.challengez = 10;
    this.challengeLog = [];
}
//2.1 Create new playe
var player1 = new Player("numbers");
//console.log(player1);

//3. Run Challenge

function runChallenge(playerNum) {
    $("#runChallenge").hide();
    $(".title").addClass("hide");
    $("#challengeLabel").removeClass("hide");
    $(".lead").hide();
    $("body").css("background-color", "#67b2c7");
    $("nav").css("background-color", "#67b2c7");
    $(".navbar").css("background-color", "#67b2c7");
    //    $("#streakLabel").hide();
    var a = playerNum.challenge,
        x = playerNum.challengeLog[0],
        y = playerNum.challengeLog[1],
        z = playerNum.challengeLog[2];
    // Show Challenge
    while (a === x || a === y || a === z) {
        a = Math.floor((Math.random() * 10));
        console.log("not repeating: " + a);
        console.log(playerNum.challengeLog);
        playerNum.challenge = a;
    }

    //playerNum.challenge = Math.floor((Math.random() * rulesArray.length));

    //document.write("<h1>Challenge: " + randomChallenge + "</h1>");
    $("#challengeLabel").html( playerNum.challenge );
    $("#playerInput").show();
    $("#checkChallenge").show();
    $("#checkChallenge").html("Check");
    $("#playerInput").val("");
    $("#playerInput").focus();

}


$("#runChallenge").click(function () {
        runChallenge(player1);
    }

);

//4. Check Challenge
$("#checkChallenge").hide();
$("#playerInput").hide();
$("#streakLabel").show();


function checkChallenge(playerNum) {
    $("#checkChallenge").hide();
    $("#streakLabel").addClass("show");
    var x = 0,
        digitRules = [];
    // Receive Input
    //playerNum.answer = prompt("Challenge: " + randomChallenge);
    playerNum.answer = $("#playerInput").val();
    //document.write("<h2>Challenge: " + player1.answer + "</h2>");
    //3.1 Verify Game Numbers
    if (player1.gameType === "numbers") {
        // List Array of rules for randomChallenge number
        //console.log(rulesArray);
        digitRules = "digit" + playerNum.challenge;
        //console.log("ditiRules: " + digitRules);
        //        console.log("line of rules array: " + rules[digitRules]);
        //        console.log("line of rules length: " + rules[digitRules].length);
        //        console.log("line of rules element: " + rules[digitRules][0]);
        console.log(player1.answer.toLowerCase());
        for (x = 0; x <= rules[digitRules].length; x += 1) {
            if (playerNum.answer.toLowerCase() === rules[digitRules][x]) {
                console.log("Yes, correct!");
                // 3.1.1 Update Results
                playerNum.streak += 1;
                playerNum.challengeLog.unshift(playerNum.challenge);
                playerNum.challengex = playerNum.challengey;
                playerNum.challengey = playerNum.challengez;
                playerNum.challengez = playerNum.challenge;
                //document.write("<h2>Streak: " + playerNum.streak + "</h2>");
                $("#streakLabel").html("Streak: " + playerNum.streak);
                $("#runChallenge").show();
                $("#runChallenge").html("Next");
                $("#runChallenge").focus();
                return;
            }

        }
        console.log("Incorrect!");
        $("#challengeLabel").html("<h2>Game Over! at streak: " + playerNum.streak + "</h2>");
        playerNum.streak = 0;
        $("#runChallenge").show();
        $("#runChallenge").html("Try Again");
        $("body").css("background-color", "#e89291");
        $("nav").css("background-color", "#e89291");
        $(".navbar").css("background-color", "#e89291");
        return;
    }
}

// Check Challenge on input
//$("#playerInput").keypress(function () {
//    $("#runChallenge").focus();
//});

// Submit form
$("#playerForm").submit(function (event) {
    checkChallenge(player1);
});

// Check Challenge On click "Begin or Next"
$("#checkChallenge").click(function () {
        checkChallenge(player1);
    }

);
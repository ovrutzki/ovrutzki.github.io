// General declaration
var container = document.getElementById("container");
var points = document.getElementById("points");
var mainDiv = document.getElementById("main");
var rulesBtn = document.getElementById("rules-btn");
var paper = document.getElementById("paper");
var rock = document.getElementById("rock");
var scissors = document.getElementById("scissors");
var spock = document.getElementById("spock");
var lizard = document.getElementById("lizard");
// duplicate for the three elements
var p_paper = paper.cloneNode(true);
var p_scissors = scissors.cloneNode(true);
var p_rock = rock.cloneNode(true);
var p_lizard = lizard.cloneNode(true);
var p_spock = spock.cloneNode(true);
// declaration for the decision function
var user;
var house;
var winner;
// add and subtract point + add to localStorage
var userPoints = JSON.parse(localStorage.getItem("Points")) || 0;
points.innerHTML = JSON.parse(localStorage.getItem("Points")) || 0;
var addPoints = function () {
    userPoints += 1;
    localStorage.setItem("Points", JSON.stringify(userPoints));
    points.innerHTML = JSON.parse(localStorage.getItem("Points"));
};
var subtractPoints = function () {
    userPoints -= 1;
    localStorage.setItem("Points", JSON.stringify(userPoints));
    points.innerHTML = JSON.parse(localStorage.getItem("Points"));
};
// cerate a popup modal for rendering the rules
rulesBtn === null || rulesBtn === void 0 ? void 0 : rulesBtn.addEventListener("click", function () {
    var modal = document.createElement("div");
    modal.id = "modal";
    var rules = document.createElement("div");
    rules.id = "rules-div";
    var title = document.createElement("h1");
    title.innerHTML = "RULES";
    var close = document.createElement("img");
    close.id = "close";
    close.src = "./images/icon-close.svg";
    close === null || close === void 0 ? void 0 : close.addEventListener("click", function () {
        modal === null || modal === void 0 ? void 0 : modal.remove();
    });
    var theRules = document.createElement("img");
    theRules.id = "the-rules";
    theRules.src = "./images/image-rules-bonus.svg";
    rules === null || rules === void 0 ? void 0 : rules.append(title, theRules, close);
    modal.appendChild(rules);
    document.body.appendChild(modal);
});
//  defined the user choice
// create an event listener for the three option.
var icon = document.getElementsByClassName("icon"); //create an array of all three elements
var chooseOne = function () {
    for (var i = 0; i < icon.length; i++) {
        icon[i].addEventListener("click", function (e) {
            mainDiv.className = "hidden";
            battle(e.target.className); // calling the battle function with the user choice
            user = e.target.className;
            return e.target.className;
        });
    }
};
chooseOne();
// rendering the user choice and create the 'battle' div
var battle = function (choose) {
    var battleDiv = document.createElement("div");
    battleDiv.id = "battle-div";
    var middle = document.createElement("div");
    middle.id = "middle";
    var rightSide = document.createElement("div");
    rightSide.id = "right-side";
    rightSide === null || rightSide === void 0 ? void 0 : rightSide.innerHTML = "<h2>THE HOUSE PICKED</h2>";
    var leftSide = document.createElement("div");
    leftSide === null || leftSide === void 0 ? void 0 : leftSide.id = "left-side";
    leftSide === null || leftSide === void 0 ? void 0 : leftSide.innerHTML = "<h2>YOU PICKED</h2>";
    var empty = document.createElement("div");
    empty.id = "empty";
    switch (choose) {
        case "scissors":
            leftSide === null || leftSide === void 0 ? void 0 : leftSide.append(scissors);
            break;
        case "paper":
            leftSide === null || leftSide === void 0 ? void 0 : leftSide.append(paper);
            break;
        case "rock":
            leftSide === null || leftSide === void 0 ? void 0 : leftSide.append(rock);
            break;
        case "spock":
            leftSide === null || leftSide === void 0 ? void 0 : leftSide.append(spock);
            break;
        case "lizard":
            leftSide === null || leftSide === void 0 ? void 0 : leftSide.append(lizard);
            break;
    }
    rightSide === null || rightSide === void 0 ? void 0 : rightSide.append(empty);
    battleDiv === null || battleDiv === void 0 ? void 0 : battleDiv.append(leftSide, middle, rightSide);
    container.replaceChild(battleDiv, mainDiv);
    // random house choice with the Math.random method.
    var houseChoose = function () {
        var options = [p_paper, p_scissors, p_rock, p_lizard, p_spock];
        var index = Math.floor(Math.random() * 5);
        rightSide.append(options[index]);
        house = options[index].id;
        empty === null || empty === void 0 ? void 0 : empty.className = "hidden";
        return options[index].id;
    };
    setTimeout(houseChoose, 1500); // calling the random choice for the house, with delay
    setTimeout(decision, 2300); // calling the decision function with delay
};
// function that decide how win after the user and the house picked
// running on all the possible options
//  after the decision the declaration function will start
var decision = function () {
    switch (true) {
        case user === house:
            winner = "nobody";
            break;
        case user === "paper" && (house === "scissors" || house === 'lizard'):
            winner = "house";
            break;
        case user === "paper" && (house === "rock" || house === 'spock'):
            winner = "user";
            break;
        case user === "scissors" && (house === "rock" || house === "spock"):
            winner = "house";
            break;
        case user === "scissors" && (house === "paper" || house === 'lizard'):
            winner = "user";
            break;
        case user === "rock" && (house === "paper" || house === 'spock'):
            winner = "house";
            break;
        case user === "rock" && (house === "scissors" || house === 'lizard'):
            winner = "user";
            break;
        case user === "lizard" && (house === "spock" || house === 'paper'):
            winner = "user";
            break;
        case user === "lizard" && (house === "scissors" || house === 'rock'):
            winner = "house";
            break;
        case user === "spock" && (house === "scissors" || house === 'rock'):
            winner = "user";
            break;
        case user === "spock" && (house === "paper" || house === 'lizard'):
            winner = "house";
            break;
    }
    declaration(winner);
};
// function the render the winner and add sum effects
var declaration = function (winner) {
    var middle = document.getElementById("middle");
    var title = document.createElement("h1");
    var leftSide = document.getElementById("left-side");
    var rightSide = document.getElementById("right-side");
    var aura = document.createElement("div");
    aura.id = "aura";
    title.id = "winner";
    var rematchBtn = document.createElement("button");
    rematchBtn === null || rematchBtn === void 0 ? void 0 : rematchBtn.addEventListener("click", function () {
        location.reload();
    });
    rematchBtn === null || rematchBtn === void 0 ? void 0 : rematchBtn.innerHTML = "PLAY AGAIN";
    rematchBtn.id = "rematch";
    if (winner === "user") {
        aura === null || aura === void 0 ? void 0 : aura.className = "user-won";
        leftSide === null || leftSide === void 0 ? void 0 : leftSide.appendChild(aura);
        addPoints();
        title === null || title === void 0 ? void 0 : title.innerHTML = "YOU WIN";
    }
    else if (winner === "house") {
        aura === null || aura === void 0 ? void 0 : aura.className = "house-won";
        rightSide === null || rightSide === void 0 ? void 0 : rightSide.appendChild(aura);
        subtractPoints();
        title === null || title === void 0 ? void 0 : title.innerHTML = "YOU LOSE";
    }
    else {
        title === null || title === void 0 ? void 0 : title.innerHTML = "DRAW";
    }
    middle === null || middle === void 0 ? void 0 : middle.append(title, rematchBtn);
};

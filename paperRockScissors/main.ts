// General declaration
const container = document.getElementById("container") as HTMLDivElement;
const points = document.getElementById("points") as HTMLDivElement;
const mainDiv = document.getElementById("main") as HTMLDivElement;
const rulesBtn = document.getElementById("rules-btn") as HTMLButtonElement;
const paper = document.getElementById("paper") as HTMLDivElement;
const rock = document.getElementById("rock") as HTMLDivElement;
const scissors = document.getElementById("scissors") as HTMLDivElement;
// duplicate for the three elements
let p_paper = paper.cloneNode(true);
let p_scissors = scissors.cloneNode(true);
let p_rock = rock.cloneNode(true);
// declaration for the decision function
const user: string;
const house: string;
const winner: string;

// cerate a popup modal for rendering the rules
rulesBtn?.addEventListener("click", (): void => {
  const modal = document.createElement("div") as HTMLDivElement | null;
  modal.id = "modal";
  const rules = document.createElement("div") as HTMLDivElement | null;
  rules.id = "rules-div";
  const title = document.createElement("h1") as HTMLElement;
  title.innerHTML = "RULES";
  const close = document.createElement("img") as HTMLImageElement;
  close.id = "close";
  close.src = "./images/icon-close.svg";
  close?.addEventListener("click", () => {
    modal?.remove();
  });
  const theRules = document.createElement("img") as HTMLImageElement;
  theRules.id = "the-rules";
  theRules.src = "./images/image-rules.svg";
  rules?.append(title, theRules, close);
  modal.appendChild(rules);
  document.body.appendChild(modal);
});
//  defined the user choice
// create an event listener for the three option.
const icon = document.getElementsByClassName("icon") as HTMLElement | null; //create an array of all three elements
const chooseOne = (): string => {
  for (let i = 0; i < icon.length; i++) {
    icon[i].addEventListener("click", (e) => {
      mainDiv.className = "hidden";
      battle(e.target.className); // calling the battle function with the user choice
      user = e.target.className;
      return e.target.className;
    });
  }
};
chooseOne();
// rendering the user choice and create the 'battle' div
const battle = (choose): string => {
  const battleDiv = document.createElement("div") as HTMLDivElement | null;
  battleDiv.id = "battle-div";
  const middle = document.createElement("div") as HTMLDivElement | null;
  middle.id = "middle";
  const rightSide = document.createElement("div") as HTMLDivElement | null;
  rightSide.id = "right-side";
  rightSide?.innerHTML = `<h2>THE HOUSE PICKED</h2>`;
  const leftSide = document.createElement("div") as HTMLDivElement | null;
  leftSide?.id = "left-side";
  leftSide?.innerHTML = `<h2>YOU PICKED</h2>`;
  const empty = document.createElement("div") as HTMLDivElement | null;
  empty.id = "empty";
  switch (choose) {
    case "scissors":
      leftSide?.append(scissors);
      break;
    case "paper":
      leftSide?.append(paper);
      break;
    case "rock":
      leftSide?.append(rock);
      break;

    default:
      break;
  }
  rightSide?.append(empty);
  battleDiv?.append(leftSide, middle, rightSide);
  container.replaceChild(battleDiv, mainDiv);
  // random house choice with the Math.random method.
  const houseChoose = () => {
    const options: Array = [p_paper, p_scissors, p_rock];
    const index = Math.floor(Math.random() * 3);
    rightSide.append(options[index]);
    house = options[index].id;
    empty?.className = "hidden";
    return options[index].id;
  };
  setTimeout(houseChoose, 1500); // calling the random choice for the house, with delay
  setTimeout(decision, 2300); // calling the decision function with delay
};

// function that decide how win after the user and the house picked
// running on all the possible options
//  after the decision the declaration function will start
const decision = (x, y) => {
  if (user === house) {
    winner = "nobody";
  } else if (user === "paper" && house === "scissors") {
    winner = "house";
  } else if (user === "paper" && house === "rock") {
    winner = "user";
  } else if (user === "scissors" && house === "rock") {
    winner = "house";
  } else if (user === "scissors" && house === "paper") {
    winner = "user";
  } else if (user === "rock" && house === "paper") {
    winner = "house";
  } else if (user === "rock" && house === "scissors") {
    winner = "user";
  }
  declaration(winner);
};
// add and subtract point + add to localStorage
const userPoints: number = JSON.parse(localStorage.getItem("Points")) || 0;
points.innerHTML = JSON.parse(localStorage.getItem("Points")) || 0;
const countPoints = (winner) => {
  if (winner === "user") {
    userPoints += 1;
    localStorage.setItem("Points", JSON.stringify(userPoints));
    points.innerHTML = JSON.parse(localStorage.getItem("Points"));
  } else if (winner === "house") {
    userPoints -= 1;
    localStorage.setItem("Points", JSON.stringify(userPoints));
    points.innerHTML = JSON.parse(localStorage.getItem("Points"));
  }
};

// function the render the winner and add sum effects
const declaration = (winner) => {
  const middle = document.getElementById("middle") as HTMLDivElement | null;
  const title = document.createElement("h1") as HTMLElement | null;
  const leftSide = document.getElementById("left-side");
  const rightSide = document.getElementById("right-side");
  const aura = document.createElement("div") as HTMLDivElement | null;
  aura.id = "aura";
  title.id = "winner";
  const rematchBtn = document.createElement(
    "button"
  ) as HTMLButtonElement | null;
  rematchBtn?.addEventListener("click", function () {
    location.reload();
  });
  rematchBtn?.innerHTML = "PLAY AGAIN";
  rematchBtn.id = "rematch";
  if (winner === "user") {
    aura?.className = "user-won";
    leftSide?.appendChild(aura);
    title?.innerHTML = "YOU WIN";
  } else if (winner === "house") {
    aura?.className = "house-won";
    rightSide?.appendChild(aura);
    title?.innerHTML = "YOU LOSE";
  } else {
    title?.innerHTML = "DRAW";
  }
  middle?.append(title, rematchBtn);
  countPoints();
};

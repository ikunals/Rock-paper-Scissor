// rules button
const rulesBtn = document.querySelector('.rules');
const rulesButton = document.querySelector('.rules-btn');
const nextBtn = document.querySelector('.next-btn');
const won = document.querySelector('.won');
const showRules = document.querySelector('.close-rules');
const closeRules = document.querySelector('.outer-btn-div');



// rules btn logic
rulesBtn.addEventListener('click', () => {
  showRules.classList.toggle('hidden');
});
rulesButton.addEventListener('click', () => {
  showRules.classList.toggle('hidden');
});

closeRules.addEventListener('click', () => {
  showRules.classList.toggle('hidden');
});

// game logic
const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];

const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");
const resultText2 = document.querySelector(".results__text2");

const playAgainBtn = document.querySelector(".play-again");

const scoreNumber = document.querySelector(".computer-points");
const yourPoints = document.querySelector(".your-points");


// Load scores from localStorage on page load
window.addEventListener('load', () => {
  const storedComputerPoints = localStorage.getItem('computerPoints');
  const storedYourPoints = localStorage.getItem('yourPoints');

  if (storedComputerPoints !== null) {
    computerpoint = parseInt(storedComputerPoints);
    scoreNumber.innerText = computerpoint;
  }

  if (storedYourPoints !== null) {
    Yourpoint = parseInt(storedYourPoints);
    yourPoints.innerText = Yourpoint;
  }
});
let computerpoint = 0;
let Yourpoint = 0;

nextBtn.addEventListener('click', () => {
  computerpoint = 0;
  Yourpoint = 0;
  yourPoints.innerText = Yourpoint;
  scoreNumber.innerText = computerpoint;

  // Save scores to localStorage after resetting
  localStorage.setItem('computerPoints', computerpoint.toString());
  localStorage.setItem('yourPoints', Yourpoint.toString());
});

// Game Logic
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const aichoice = aiChoose();
  displayResults([choice, aichoice]);
  displayWinner([choice, aichoice]);

  // Save scores to localStorage
  localStorage.setItem('computerPoints', computerpoint.toString());
  localStorage.setItem('yourPoints', Yourpoint.toString());
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
       
        <button class="${results[idx].name} choice-btn">
         <div class="choice ">
          <img src="./assets/${results[idx].name}.png" alt="${results[idx].name}" />
        </div>
        </button>
        
      `;
    }, idx);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerText = "YOU WIN";
      resultText2.innerText = "AGAINST PC";
      rulesBtn.classList.toggle("hidden");
      won.classList.toggle("hidden");
      resultDivs[0].classList.toggle("winner");
      Yourscore(1);
    } else if (aiWins) {
      resultText.innerText = "YOU LOST";
      resultText2.innerText = "AGAINST PC";
      resultDivs[1].classList.toggle("winner");
      Computerscore(1);
    } else {
      resultText.innerText = "TIE UP";
    }
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  });
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

function Computerscore(point) {
  computerpoint += point;
  scoreNumber.innerText = computerpoint;
}

function Yourscore(point) {
  Yourpoint += point;
  yourPoints.innerText = Yourpoint;
}

// Play Again
playAgainBtn.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultText2.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");

  if (rulesBtn.classList.contains("hidden")) {
    rulesBtn.classList.toggle("hidden");
    won.classList.toggle("hidden");
  }
});

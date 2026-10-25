
let random = Math.floor(Math.random() * 100) + 1;

const userInput = document.querySelector("#guess");
const submit = document.querySelector("#submit");
const pguess = document.querySelector(".guesses");
const left = document.querySelector(".left");
const loworhi = document.querySelector(".loworhi");
const form = document.querySelector(".form");

let prevguess = [];
let playgame = true;
let numguess = 0;

// Form submit handle karo
form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!playgame) return;

    const guess = Number(userInput.value);

    validateGuess(guess);
});

function validateGuess(guess) {
    if (
        userInput.value.trim() === "" ||
        !Number.isInteger(guess) ||
        guess < 1 ||
        guess > 100
    ) {
        displayMessage("Please enter a valid number (1-100)!");
        return;
    }

    prevguess.push(guess);
    numguess++;

    displayGuess(guess);
    checkGuess(guess);
}

function checkGuess(guess) {
    if (guess === random) {
        displayMessage(`Correct! You guessed the number in ${numguess} attempt!`);
        endGame();
    } else if (numguess === 10) {
        displayMessage(`Game over! The number was ${random}.`);
        endGame();
    } else if (guess < random) {
        displayMessage("Too low! Try a higher number.");
    } else {
        displayMessage("Too high! Try a lower number.");
    }
}

function displayGuess(guess) {
    pguess.textContent = prevguess.join(", ");
    left.textContent = 10 - numguess;

    userInput.value = "";
    userInput.focus();
}

function displayMessage(message) {
    loworhi.textContent = message;
}

function endGame() {
    playgame = false;

    userInput.disabled = true;
    submit.disabled = true;

    const newGameButton = document.createElement("button");
    newGameButton.textContent = "Play Again";
    newGameButton.type = "button";
    newGameButton.id = "newGame";

    document.querySelector(".result").appendChild(newGameButton);

    newGameButton.addEventListener("click", newGame);
}

function newGame() {
    random = Math.floor(Math.random() * 100) + 1;

    prevguess = [];
    numguess = 0;
    playgame = true;

    pguess.textContent = "";
    left.textContent = "10";
    loworhi.textContent = "";

    userInput.disabled = false;
    submit.disabled = false;
    userInput.value = "";
    userInput.focus();

    document.querySelector("#newGame").remove();
}

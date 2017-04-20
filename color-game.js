let numOfSquares = 48;
let colors = [];
let pickedColor;
const squares = document.querySelectorAll(".square");
const colorDisplay = document.querySelector("#colorDisplay");
const messageDisplay = document.querySelector("#message");
const header = document.querySelector(".header");
const resetButton = document.querySelector("#reset");
const modeButtons = document.querySelectorAll(".mode");

init();

function init() {
  setupModeButtons();
  setupSquares();
  reset();
}

function setupModeButtons() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      modeButtons[2].classList.remove("selected");
      this.classList.add("selected");
      if (this.textContent === "Easy") {
        numOfSquares = 6;
      } else if (this.textContent === "Hard") {
        numOfSquares = 18;
      } else {
        numOfSquares = 48;
      }
      reset();
    });
  }
}
function setupSquares() {
  for (var i = 0; i < squares.length; i++) {
    // add event listener for squares
    squares[i].addEventListener("click", function() {
      // grab color of square
      const clickedColor = this.style.background;
      // compare clicked color to picked color
      if (clickedColor === pickedColor) {
        this.style.background = pickedColor;
        messageDisplay.innerText = "Yay! You got it!";
        resetButton.innerHTML =
          '<i class="fa fa-refresh" aria-hidden="true"></i> Play again?';
        header.style.background = pickedColor;
        colorChanger(clickedColor);
      } else {
        this.style.background = "transparent";
        messageDisplay.innerText = "Aww... Try Again!";
      }
    });
  }
  reset();
}

function reset() {
  colors = generateRandomColors(numOfSquares);
  pickedColor = pickColor();
  colorDisplay.innerText = pickedColor;
  messageDisplay.innerText = "";
  resetButton.innerText = "New Colors";
  // loop through squares again
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.background = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  header.style.background = "transparent";
}
resetButton.addEventListener("click", reset);

function colorChanger(color) {
  // loop through squares again
  for (var i = 0; i < squares.length; i++) {
    // change each square to correct square color
    squares[i].style.background = color;
  }
}

function pickColor() {
  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  // make an emptry array to store random colors
  const arr = [];
  // repeat num times
  for (var i = 0; i < num; i++) {
    // get random color to push into array
    arr.push(randomColor());
  }
  // return the array
  return arr;
}

function randomColor() {
  // pick "red" from 0 -255
  let red = Math.floor(Math.random() * 256);
  // pick "green" from 0 -255
  let green = Math.floor(Math.random() * 256);
  // pick "blue" from 0 -255
  let blue = Math.floor(Math.random() * 256);

  return "rgb(" + red + ", " + green + ", " + blue + ")";
}

//Player Factory
const createPlayer = (name, marker) => {
  return { name, marker };
};

//Board Module
const Gameboard = (() => {
  const gameboard = ["", "", "", "", "", "", "", "", ""];

  //Creates a new div element for every index in gameboard array
  const render = () => {
    let boardHTML = "";
    gameboard.forEach((cell, index) => {
      boardHTML += `<div class="cell" id="${index}">${cell}</div>`;
    });
    document.querySelector(".gameboard").innerHTML = boardHTML;
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", Game.handleClick);
      if (cell.textContent === "X") {
        cell.style.color = "#450a0a";
      }
    });
  };

  //Updates the gameboard
  const update = (index, value) => {
    gameboard[index] = value;
    render();
  };

  const getGameboard = () => gameboard;

  return { render, update, getGameboard };
})();

//Game Module
const Game = (() => {
  let gameisOver;
  let currentPlayer;
  let players = [];

  //Starts game and declares users inputs as player1 and player2 along with markers
  const start = () => {
    players = [
      createPlayer(document.querySelector("#player1-input").value, "X"),
      createPlayer(document.querySelector("#player2-input").value, "O"),
    ];

    gameisOver = false;
    currentPlayer = 0;

    Gameboard.render();
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", handleClick);
    });

    displayController.displayedNames(players[0].name, players[1].name);
    displayController.displayedMarkers(players[0].marker, players[1].marker);
  };

  const handleClick = (event) => {
    if (gameisOver) return;

    let index = +event.target.id;

    if (Gameboard.getGameboard()[index] !== "") return;

    //Updates the board and html with indexes and player markers
    Gameboard.update(index, players[currentPlayer].marker);

    if (checkWinner(Gameboard.getGameboard(), players[currentPlayer].marker)) {
      gameisOver = true;
      displayController.renderMessage(`${players[currentPlayer].name} won!`);
    } else if (checkDraw(Gameboard.getGameboard())) {
      gameisOver = true;
      displayController.renderMessage("Draw!");
    }

    //Swicthes between player1 and player2 markers
    currentPlayer = currentPlayer === 0 ? 1 : 0;
  };

  //Boolean to determine if the gameboard is true or false
  const checkWinner = (board) => {
    //Establishes possible winning combos (horizontal, vertical, and diagnal)
    const winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winCombos.length; i++) {
      const [a, b, c] = winCombos[i];

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  };

  //If the gameboard isn't called by the checkWinner function, the game is a draw
  //because all cells are filled
  const checkDraw = (board) => {
    return board.every((cell) => cell !== "");
  };

  //Updates the gameboard by emptying the indices
  const reset = () => {
    for (let i = 0; i < 9; i++) {
      Gameboard.update(i, "");
    }
    Gameboard.render();
    gameisOver = false;

    displayController.renderMessage("");
  };

  return { start, handleClick, checkWinner, checkDraw, reset };
})();

//Displays names and markers for users to see after starting game
const displayController = (() => {
  const displayedNames = (player1, player2) => {
    document.querySelector("#player1-name").textContent = player1;
    document.querySelector("#player2-name").textContent = player2;
  };

  const displayedMarkers = (player1, player2) => {
    document.querySelector("#player1-marker").textContent = player1;
    document.querySelector("#player2-marker").textContent = player2;
  };

  const renderMessage = (message) => {
    document.querySelector("#winner").textContent = message;
  };

  return { displayedNames, displayedMarkers, renderMessage };
})();

const personStartButton = document.querySelector("#person-start");
personStartButton.addEventListener("click", () => {
  document.querySelector(".userNames").style.display = "flex";
  document.querySelector("#title").style.display = "none";
  document.querySelector(".start-buttons").style.display = "none";
  document.querySelector("#welcome").style.display = "flex";
  document.querySelector("#start").style.display = "flex";
});

const startButton = document.querySelector("#start");
startButton.addEventListener("click", () => {
  Game.start();

  document.querySelector("#welcome").style.display = "none";
  document.querySelector(".game-status").style.display = "flex";
  document.querySelector(".userNames").style.display = "none";
  startButton.style.display = "none";
  document.querySelector("#reset").style.display = "flex";
});

const resetButton = document.querySelector("#reset");
reset.addEventListener("click", Game.reset);

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
      createPlayer(document.querySelector("#player1").value, "X"),
      createPlayer(document.querySelector("#player2").value, "O"),
    ];

    gameisOver = false;
    currentPlayer = 0;

    Gameboard.render();
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", handleClick);
    });
  };

  const handleClick = (event) => {
    if (gameisOver) {
      return;
    }

    let index = +event.target.id;

    //Updates the board and html with indexes and player markers
    Gameboard.update(index, players[currentPlayer].marker);

    //Swicthes between player1 and player2 markers
    currentPlayer = currentPlayer === 0 ? 1 : 0;
  };

  const checkWinner = (board) => {
    //Establishes possible winning combos (horizontal, vertical, and diagnol)
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
  };

  return { start, handleClick, checkWinner };
})();

const startButton = document.querySelector("#start");
startButton.addEventListener("click", Game.start);

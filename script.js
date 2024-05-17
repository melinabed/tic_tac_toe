//Player Factory

const createPlayer = (name, marker) => {
  return { name, marker };
};

//Board Module

const Gameboard = (() => {
  const gameboard = ["", "", "", "", "", "", "", "", ""];

  const render = () => {
    let boardHTML = "";
    gameboard.forEach((cell, index) => {
      `<div class="${cell}" id="${index}">${cell}</div>`;
    });
    document.querySelector(".gameboard").innerHTML += boardHTML;
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", Game.handleClick);
    });
  };

  return { render };
})();

//Game Module

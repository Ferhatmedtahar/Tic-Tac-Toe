"use strict";

// dark mode and light mode .
const mode = document.querySelector(".mode");

const body = document.querySelector("body");
const temp = mode.getAttribute("src");
console.log(mode, body, temp);
mode.addEventListener("click", function () {
  if (mode.getAttribute("src") == "./img/icons8-dark-mode-50.png") {
    body.classList.remove("dark");
    body.classList.add("light");
    items.forEach((el) => {
      el.classList.remove("item");
      el.classList.add("item-light");
    });
    mode.src = mode.dataset.tab;
  } else {
    body.classList.remove("light");
    body.classList.add("dark");
    items.forEach((el) => {
      el.classList.remove("item-light");
      el.classList.add("item");
    });

    mode.setAttribute("src", temp);
  }
});

const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
let gameOver = false;
let choice = 0;

//////
/////
//implementing the choice which pick for you .
// x element and class
const x = `&times;`;
const classx = `item-x`;
// o element and class
const o = `&#x25CB;`;
const classo = `item-o`;

let plchoise = 0;
let plclass = "";
let pcchoise = 0;
let pcclass = "";
const starter = document.querySelector(".starter");
starter.addEventListener("click", function () {
  items.forEach((el) => {
    el.classList.remove("item-x");
    el.classList.remove("item-o");
    el.classList.add("item");
    el.textContent = "";
    el.textContent = "";
  });

  player1.classList.add("hidden");
  player2.classList.add("hidden");
  const ask = function () {
    choice = prompt(`choose :
    1/ X
    2/ O`);
    gameOver = false;
    if (
      choice !== "1" &&
      choice !== "2" &&
      choice !== "x" &&
      choice !== "o" &&
      choice !== "X" &&
      choice !== "O"
    ) {
      ask();
    }
  };
  ask();
  if (choice == 1 || choice == "x" || choice == "X") {
    pcchoise = o;
    pcclass = classo;
    plchoise = x;
    plclass = classx;
    player1.textContent = "PC";
    player2.textContent = "YOU";
    player1.classList.remove("hidden");
    player2.classList.remove("hidden");
  } else {
    pcchoise = x;
    pcclass = classx;
    plchoise = o;
    plclass = classo;
    player1.textContent = "YOU";
    player2.textContent = "PC";
    player1.classList.remove("hidden");
    player2.classList.remove("hidden");
  }
});

//////
//////
//////
gameOver = false;
const checkWinner = function (cls) {
  let msg;
  const i = [1, 4, 7]; // ---
  const j = [1, 2, 3]; // |||
  const k = [1, 3]; // \/
  i.forEach((el) => {
    if (
      items[el - 1].classList.contains(`${cls}`) &&
      items[el].classList.contains(`${cls}`) &&
      items[el + 1].classList.contains(`${cls}`)
    ) {
      msg = cls == "item-o" ? "O wins" : "X wins";
      gameOver = true;
      alert(msg);
    }
  });
  //
  j.forEach((el) => {
    if (
      items[el - 1].classList.contains(`${cls}`) &&
      items[el + 2].classList.contains(`${cls}`) &&
      items[el + 5].classList.contains(`${cls}`)
    ) {
      msg = cls == "item-o" ? "O wins" : "X wins";
      gameOver = true;
      alert(msg);
    }
  });

  //k items
  if (
    items[k[0] - 1].classList.contains(`${cls}`) &&
    items[k[0] + 3].classList.contains(`${cls}`) &&
    items[k[0] + 7].classList.contains(`${cls}`)
  ) {
    gameOver = true;
    msg = cls == "item-o" ? "O wins" : "X wins";
    alert(msg);
  }
  if (
    items[k[1] - 1].classList.contains(`${cls}`) &&
    items[k[1] + 1].classList.contains(`${cls}`) &&
    items[k[1] + 3].classList.contains(`${cls}`)
  ) {
    gameOver = true;
    msg = cls == "item-o" ? "O wins" : "X wins";
    alert(msg);
  }

  let full = true;

  items.forEach((el) => {
    if (!el.classList.contains("item-x") && !el.classList.contains("item-o")) {
      full = false;
    }
  });
  if (full && !gameOver) alert("  Draw  ");
};

/////
/////
/////
//implemeting the logic game

const items = document.querySelectorAll(".item");

//number pc generator
const generateNum = () => {
  let pc = Math.trunc(Math.random() * 9 + 1);
  let todonow = false;
  items.forEach((el) => {
    if (!el.classList.contains("item-x") && !el.classList.contains("item-o"))
      todonow = true;
  });
  if (todonow) {
    const pcselect = document.querySelector(`#item-${pc}`);
    if (
      !pcselect.classList.contains("item-x") &&
      !pcselect.classList.contains("item-o")
    ) {
      pcselect.innerHTML = pcchoise;
      pcselect.classList.remove("item");
      pcselect.classList.add(`${pcclass}`);
    } else {
      pc = generateNum();
    }
  }
};

const game = document.querySelector(".game");

game.addEventListener("click", function (e) {
  const clicked = e.target;
  if (choice == 0) return;
  if (clicked.classList.contains("game")) return;

  if (
    !clicked.classList.contains("item-x") &&
    !clicked.classList.contains("item-o") &&
    !gameOver
  ) {
    clicked.innerHTML = `${plchoise}`;
    clicked.classList.remove("item");
    clicked.classList.add(`${plclass}`);
  }

  //check winner
  if (!gameOver) checkWinner(plclass);

  if (!gameOver) {
    generateNum();
    checkWinner(pcclass);
  }
});

//implementing the reset the game features
const reset = document.querySelector(".reset");
reset.addEventListener("click", function () {
  items.forEach((el) => {
    el.classList.remove("item-x");
    el.classList.remove("item-o");
    el.classList.add("item");
    el.textContent = "";
    el.textContent = "";
  });
  player1.classList.add("hidden");
  player2.classList.add("hidden");
});
//  about
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const about = document.querySelector(".about");
const btnCloseModal = document.querySelector(".close-modal");
about.addEventListener("click", function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});
btnCloseModal.addEventListener("click", function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});

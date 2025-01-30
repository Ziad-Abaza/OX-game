let title = document.querySelector(".title");
let squares = [];
let turn = "X";
let gameOver = false;

function TheEnd(winner, winningLine) {
  gameOver = true;

  if (winner) {
    winningLine.forEach((index) => {
      let cell = document.getElementById(`item${index + 1}`);
      cell.style.backgroundColor = "#4caf50";
      cell.style.color = "#fff";
    });
    title.innerHTML = `<span>${winner}</span> winner!<span id="dots"></span>`;
  } else {
    title.innerHTML = '<span id="dots"></span>';
  }

  let dots = 0;
  const dotInterval = setInterval(() => {
    dots = (dots + 1) % 4;
    document.getElementById("dots").textContent = ".".repeat(dots);
  }, 1000);

  setTimeout(() => {
    location.reload();
  }, 4000);
}

function winner() {
  for (let i = 0; i < 9; i++) {
    squares[i] = document.getElementById(`item${i + 1}`).textContent;
  }

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

  for (const combo of winCombos) {
    const [a, b, c] = combo;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      TheEnd(squares[a], combo);
      return true;
    }
  }

  if (squares.every((cell) => cell)) {
    TheEnd(null);
    return true;
  }

  return false;
}

function game(cellId) {
  if (gameOver || turn !== "X") return;

  const cell = document.getElementById(cellId);
  if (cell.textContent !== "") return;

  cell.textContent = "X";
  if (winner()) return;

  turn = "O";
  setTimeout(makeRandomMoveForO, 500);
}

function makeRandomMoveForO() {
  if (gameOver) return;

  const strategicCombo = findStrategicCombination();
  if (strategicCombo) {
    playStrategicMove(strategicCombo);
  } else {
    playRandomMove();
  }

  if (winner()) return;
  turn = "X";
}

function findStrategicCombination() {
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

  for (const combo of winCombos) {
    const [a, b, c] = combo;
    const oCount = [squares[a], squares[b], squares[c]].filter(
      (x) => x === "O"
    ).length;
    const empty = combo.filter((i) => !squares[i]).length;
    if (oCount === 2 && empty === 1) return combo;
  }

  for (const combo of winCombos) {
    const [a, b, c] = combo;
    const xCount = [squares[a], squares[b], squares[c]].filter(
      (x) => x === "X"
    ).length;
    const empty = combo.filter((i) => !squares[i]).length;
    if (xCount === 2 && empty === 1) return combo;
  }

  return null;
}

function playStrategicMove(combo) {
  for (const index of combo) {
    const cell = document.getElementById(`item${index + 1}`);
    if (!cell.textContent) {
      cell.textContent = "O";
      break;
    }
  }
}

function playRandomMove() {
  const emptyCells = [];
  for (let i = 0; i < 9; i++) {
    if (!squares[i]) emptyCells.push(i);
  }

  if (emptyCells.length) {
    const randomIndex =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];
    document.getElementById(`item${randomIndex + 1}`).textContent = "O";
  }
}

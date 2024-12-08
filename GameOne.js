const createPlayer = (name, symbol, status) => {
    return { name, symbol, status };
  };
  
  const players = (() => {
    const P1 = createPlayer("player one", "X", true);
    const P2 = createPlayer("player two", "O", false);
  
    function create() {
      let name1 = document.querySelector("#p1").value;
      let name2 = document.querySelector("#p2").value;
      if (name1 != "" && name2 != "") {
        P1.name = name1;
        P2.name = name2;
      } else if (name1 == "" && name2 == "") {
        P1.name = "Player one";
        P2.name = "Player two";
      }
    }
  
    return { P1, P2, create };
  })();
  
  const gameBoard = (() => {
    function print() {
      for (let i = 0; i < 3; i++) {
        const row = document.createElement("div");
        row.className = "row";
        const board = document.querySelector(".board");
        board.appendChild(row);
  
        for (let j = 0; j < 3; j++) {
          const column = document.createElement("button");
          column.className = "column";
          row.appendChild(column);
        }
      }
    }
    print();
  
    return { print };
  })();
  
  const gameController = (() => {
    // Temporary player creations
    // const P1 = createPlayer("Joestar", "X", true);
    // const P2 = createPlayer("Bitch", "O");
  
    function _turn() {
      if (players.P1.status == true) {
        players.P1.status = false;
        players.P2.status = true;
      } else if (players.P2.status == true) {
        players.P2.status = false;
        players.P1.status = true;
      }
    }
  
    const cells = document.querySelectorAll(".column");
    console.log(cells);
  
    const span = document.querySelector(".turn-name");
    console.log(span);
    span.textContent = players.P1.name + "'s";
    span.style.color = "#ff206e";
  
    // Add event listeners to each cell based on player status
    // event listener will add the player's symbol to the target
    // display the current player's name and color it.
    cells.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        if (e.target.textContent == "" && players.P1.status == true) {
          e.target.textContent = players.P1.symbol;
          e.target.style.color = "#ff206e";
          span.textContent = players.P2.name + "'s";
          span.style.color = "#fbff12";
          _turn();
        } else {
          e.target.style.setProperty("pointer-events", "none");
        }
  
        if (e.target.textContent == "" && players.P2.status == true) {
          e.target.textContent = players.P2.symbol;
          e.target.style.color = "#fbff12";
          span.textContent = players.P1.name + "'s";
          span.style.color = "#ff206e";
          _turn();
        } else {
          e.target.style.setProperty("pointer-events", "none");
        }
      });
    });
  })();
  
  // module that will validate the winning patterns of tic tac toe
  // uses dataIndex to match the cells with 2d array
  const validate = (() => {
    const cells = document.querySelectorAll(".column");
  
    // set unique data attributes on each cell button
    // that correspond with the index of a 2d array
    cells[0].setAttribute("data-index1", 0);
    cells[0].setAttribute("data-index2", 0);
  
    cells[1].setAttribute("data-index1", 0);
    cells[1].setAttribute("data-index2", 1);
  
    cells[2].setAttribute("data-index1", 0);
    cells[2].setAttribute("data-index2", 2);
  
    cells[3].setAttribute("data-index1", 1);
    cells[3].setAttribute("data-index2", 0);
  
    cells[4].setAttribute("data-index1", 1);
    cells[4].setAttribute("data-index2", 1);
  
    cells[5].setAttribute("data-index1", 1);
    cells[5].setAttribute("data-index2", 2);
  
    cells[6].setAttribute("data-index1", 2);
    cells[6].setAttribute("data-index2", 0);
  
    cells[7].setAttribute("data-index1", 2);
    cells[7].setAttribute("data-index2", 1);
  
    cells[8].setAttribute("data-index1", 2);
    cells[8].setAttribute("data-index2", 2);
  
    // Create the 2d array
    const board = [];
  
    for (i = 0; i < 3; i++) {
      board[i] = [];
      for (j = 0; j < 3; j++) {
        board[i].push(0);
      }
    }
    console.table(board);
  
    let dataIndex1;
    let dataIndex2;
  
    // object that will be used to store the data attributes
    // and symbol of player that clicked a cell
    const data = {
      index1: null,
      index2: null,
      symbol: null,
    };
  
    for (let cell of cells) {
      cell.addEventListener("click", (e) => {
        dataIndex1 = e.target.getAttribute("data-index1");
        dataIndex2 = e.target.getAttribute("data-index2");
        if (players.P1.status == false) {
          data.index1 = dataIndex1;
          data.index2 = dataIndex2;
          data.symbol = players.P1.symbol;
          console.log({ data });
  
          board[data.index1][data.index2] = data.symbol;
          console.log(board);
        } else if (players.P2.status == false) {
          data.index1 = dataIndex1;
          data.index2 = dataIndex2;
          data.symbol = players.P2.symbol;
          console.log({ data });
  
          board[data.index1][data.index2] = data.symbol;
          console.log(board);
        }
      });
    }
  
    // winning patterns
  
    function _runPatterns() {
      let currPlayer;
      if (players.P1.status == false) {
        currPlayer = players.P1.name;
      } else if (players.P2.status == false) {
        currPlayer = players.P2.name;
      }
  
      const span = document.querySelector("#winner");
      console.log(span);
  
      // variable that will store winners name
      let winner;
  
      const gameOver = document.querySelector("#gameover");
      const overlay = document.querySelector("#overlay");
  
      // patterns for 'X'
      if (board[0][0] == "X" && board[1][0] == "X" && board[2][0] == "X") {
        winner = currPlayer;
        span.textContent = winner;
        console.log(span);
        cells[0].style.color = "#41ead4";
        cells[3].style.color = "#41ead4";
        cells[6].style.color = "#41ead4";
  
        gameOver.classList.add("active");
        overlay.classList.add("active");
      } else if (board[0][1] == "X" && board[1][1] == "X" && board[2][1] == "X") {
        winner = currPlayer;
        span.textContent = winner;
        cells[1].style.color = "#41ead4";
        cells[4].style.color = "#41ead4";
        cells[7].style.color = "#41ead4";
  
        gameOver.classList.add("active");
        overlay.classList.add("active");
      } else if (board[0][2] == "X" && board[1][2] == "X" && board[2][2] == "X") {
        winner = currPlayer;
        span.textContent = winner;
        cells[2].style.color = "#41ead4";
        cells[5].style.color = "#41ead4";
        cells[8].style.color = "#41ead4";
  
        gameOver.classList.add("active");
        overlay.classList.add("active");
      } else if (board[0][0] == "X" && board[0][1] == "X" && board[0][2] == "X") {
        winner = currPlayer;
        span.textContent = winner;
        cells[0].style.color = "#41ead4";
        cells[1].style.color = "#41ead4";
        cells[2].style.color = "#41ead4";
  
        gameOver.classList.add("active");
        overlay.classList.add("active");
      } else if (board[1][0] == "X" && board[1][1] == "X" && board[1][2] == "X") {
        winner = currPlayer;
        span.textContent = winner;
        cells[3].style.color = "#41ead4";
        cells[4].style.color = "#41ead4";
        cells[5].style.color = "#41ead4";
  
        gameOver.classList.add("active");
        overlay.classList.add("active");
      } else if (board[2][0] == "X" && board[2][1] == "X" && board[2][2] == "X") {
        winner = currPlayer;
        span.textContent = winner;
        cells[6].style.color = "#41ead4";
        cells[7].style.color = "#41ead4";
        cells[8].style.color = "#41ead4";
  
        gameOver.classList.add("active");
        overlay.classList.add("active");
      } else if (board[0][0] == "X" && board[1][1] == "X" && board[2][2] == "X") {
        winner = currPlayer;
        span.textContent = winner;
        cells[0].style.color = "#41ead4";
        cells[4].style.color = "#41ead4";
        cells[8].style.color = "#41ead4";
  
        gameOver.classList.add("active");
        overlay.classList.add("active");
      } else if (board[0][2] == "X" && board[1][1] == "X" && board[2][0] == "X") {
        winner = currPlayer;
        span.textContent = winner;
        cells[2].style.color = "#41ead4";
        cells[4].style.color = "#41ead4";
        cells[6].style.color = "#41ead4";
  
        gameOver.classList.add("active");
        overlay.classList.add("active");
      }
  
      // patterns for 'O'
      if (board[0][0] == "O" && board[1][0] == "O" && board[2][0] == "O") {
        winner = currPlayer;
        span.textContent = winner;
        cells[0].style.color = "#41ead4";
        cells[3].style.color = "#41ead4";
        cells[6].style.color = "#41ead4";
  
        gameOver.classList.add("active");
        overlay.classList.add("active");
      } else if (board[0][1] == "O" && board[1][1] == "O" && board[2][1] == "O") {
        winner = currPlayer;
        span.textContent = winner;
        cells[1].style.color = "#41ead4";
        cells[4].style.color = "#41ead4";
        cells[7].style.color = "#41ead4";
  
        gameOver.classList.add("active");
        overlay.classList.add("active");
      } else if (board[0][2] == "O" && board[1][2] == "O" && board[2][2] == "O") {
        winner = currPlayer;
        span.textContent = winner;
        cells[2].style.color = "#41ead4";
        cells[5].style.color = "#41ead4";
        cells[8].style.color = "#41ead4";
  
        gameOver.classList.add("active");
        overlay.classList.add("active");
      } else if (board[0][0] == "O" && board[0][1] == "O" && board[0][2] == "O") {
        winner = currPlayer;
        span.textContent = winner;
        cells[0].style.color = "#41ead4";
        cells[1].style.color = "#41ead4";
        cells[2].style.color = "#41ead4";
  
        gameOver.classList.add("active");
        overlay.classList.add("active");
      } else if (board[1][0] == "O" && board[1][1] == "O" && board[1][2] == "O") {
        winner = currPlayer;
        span.textContent = winner;
        cells[3].style.color = "#41ead4";
        cells[4].style.color = "#41ead4";
        cells[5].style.color = "#41ead4";
  
        gameOver.classList.add("active");
        overlay.classList.add("active");
      } else if (board[2][0] == "O" && board[2][1] == "O" && board[2][2] == "O") {
        winner = currPlayer;
        span.textContent = winner;
        cells[6].style.color = "#41ead4";
        cells[7].style.color = "#41ead4";
        cells[8].style.color = "#41ead4";
  
        gameOver.classList.add("active");
        overlay.classList.add("active");
      } else if (board[0][0] == "O" && board[1][1] == "O" && board[2][2] == "O") {
        winner = currPlayer;
        span.textContent = winner;
        cells[0].style.color = "#41ead4";
        cells[4].style.color = "#41ead4";
        cells[8].style.color = "#41ead4";
  
        gameOver.classList.add("active");
        overlay.classList.add("active");
      } else if (board[0][2] == "O" && board[1][1] == "O" && board[2][0] == "O") {
        winner = currPlayer;
        span.textContent = winner;
        cells[2].style.color = "#41ead4";
        cells[4].style.color = "#41ead4";
        cells[6].style.color = "#41ead4";
  
        gameOver.classList.add("active");
        overlay.classList.add("active");
      }
  
      // variable that will determine draw if it's value is 9
      let count = 0;
  
      // loop with condition that will iterate over 2d array
      // and check if the board array still contains its default value
      // if it doesn't then count++
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i].includes(0) == false) {
            console.log(++count);
          }
        }
      }
  
      // draw condition. 9 represents the total cells on the board
      if (count == 9 && winner == undefined) {
        console.log("draw!");
        for (cell of cells) {
          cell.style.color = "#41ead4";
          const h2 = document.querySelector(".modalh2");
          h2.textContent = "Its a tie!";
          gameOver.classList.add("active");
          overlay.classList.add("active");
        }
      }
    }
  
    cells.forEach((cell) => {
      cell.addEventListener("click", _runPatterns);
    });
  
    const playAgain = document.querySelector(".playAgain");
    playAgain.addEventListener("click", () => {
      for (const cell of cells) {
        cell.textContent = "";
        cell.style.setProperty("pointer-events", "all");
      }
  
      for (i = 0; i < 3; i++) {
        board[i] = [];
        for (j = 0; j < 3; j++) {
          board[i].push(0);
        }
      }
  
      const gameOver = document.querySelector("#gameover");
      const overlay = document.querySelector("#overlay");
  
      gameOver.classList.remove("active");
      overlay.classList.remove("active");
  
      console.log(players.P1.status, players.P2.status);
      players.P1.status = true;
      players.P2.status = false;
  
      const span = document.querySelector(".turn-name");
      console.log(span);
      span.textContent = players.P1.name + "'s";
      span.style.color = "#ff206e";
    });
  })();
  
  const btn = document.querySelector("#play");
  const returnBtn = document.querySelector("#return");
  btn.addEventListener("click", () => {
    const home = document.querySelector(".home");
    home.style.setProperty("display", "none");
  
    players.create();
  });
  returnBtn.addEventListener("click", () => {
    const home = document.querySelector(".home");
    home.style.setProperty("display", "grid");
  });
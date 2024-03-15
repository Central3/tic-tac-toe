/* 
    Handles all the board functionality like filling up each
    single cell with player marker and rendering the board.
*/
function GameBoard() {
    const rows = 3;
    const cols = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i].push("");
        }
    }

    const getBoard = () => board;

    const printBoard = () => {
        board.forEach((cell) => console.log(cell));
    };

    const markCell = (row, col, marker) => {
        if (row >= rows && col >= cols) return -1;

        if (board[row][col] === "") board[row][col] = marker;
        else return -1;
    };

    return { getBoard, markCell, printBoard };
}

/* 
    Handles all the gamplay logic
*/
function GameController() {
    const board = GameBoard();

    const player1 = {
        name: "Player One",
        marker: "X",
    };

    const player2 = {
        name: "Player Two",
        marker: "O",
    };

    let activePlayer = player1;

    const getActivePlayer = () => activePlayer;

    const switchPlayer = () =>
        (activePlayer = activePlayer === player1 ? player2 : player1);

    const play = (row, col) => {
        const winStatus = checkWin(board.getBoard());

        if (winStatus !== 1 && winStatus !== 2 && winStatus !== 0) {
            if (board.markCell(row, col, activePlayer.marker) != -1) {
                switchPlayer();
            }
        }

        if (winStatus === 1) {
            console.log("Player 1 wins");
        } else if (winStatus === 2) {
            console.log("Player 2 wins");
        } else if (winStatus === 0) {
            console.log("draw");
        }
    };

    // Win logic implementation
    const checkWin = (board) => {
        // check rows
        for (let i = 0; i < 3; i++) {
            const a = board[i][0];
            const b = board[i][1];
            const c = board[i][2];

            if (a !== "" && a === b && b === c) {
                if (a === "X") return 1;
                if (a === "O") return 2;
            }
        }

        // check cols
        for (let i = 0; i < 3; i++) {
            const a = board[0][i];
            const b = board[1][i];
            const c = board[2][i];

            if (a !== "" && a === b && b === c) {
                if (a === "X") return 1;
                if (a === "O") return 2;
            }
        }

        // check diagonal
        const a = board[0][0];
        const b = board[1][1];
        const c = board[2][2];

        if (a !== "" && a === b && b === c) {
            if (a === "X") return 1;
            if (a === "O") return 2;
        }

        // check anti diagonal
        const d = board[0][2];
        const e = board[1][1];
        const f = board[2][0];

        if (d !== "" && d === e && e === f) {
            if (d === "X") return 1;
            if (d === "O") return 2;
        }

        // check for draw
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = board[i][j];
                if (cell === "") return;
            }
        }

        return 0;
    };

    return { getActivePlayer, play, getBoard: board.getBoard, checkWin };
}

// Handle everything that happens in the interface
(function UIController() {
    // DOM queries here
    const boardDiv = document.querySelector(".board");
    const dispalyResult = document.querySelector(".display-result");
    const restartBtn = document.querySelector(".restart-btn");

    const game = GameController();

    const updateScreen = () => {
        const board = game.getBoard();
        let winStatus = "";
        boardDiv.textContent = "";

        const activePlayer = game.getActivePlayer();

        if (game.checkWin(board) === 1) winStatus = "Player 1 won";
        else if (game.checkWin(board) === 2) winStatus = "Player 2 won";
        else if (game.checkWin(board) === 0) winStatus = "It's a draw";
        else winStatus = `${activePlayer.name}'s turn`;

        dispalyResult.textContent = winStatus;

        board.forEach((row, rowIndex) => {
            row.forEach((col, colIndex) => {
                const btn = document.createElement("button");
                btn.classList.add("cell-btn");
                btn.dataset.row = rowIndex;
                btn.dataset.col = colIndex;
                btn.textContent = col;
                boardDiv.appendChild(btn);
            });
        });
    };

    function handleBoardClick(event) {
        if (event.target.nodeName === "BUTTON") {
            const cellRow = event.target.dataset.row;
            const cellCol = event.target.dataset.col;

            game.play(cellRow, cellCol);
        }

        updateScreen();
    }

    function handleRestartClick() {
        location.reload();
    }

    boardDiv.addEventListener("click", handleBoardClick);
    restartBtn.addEventListener("click", handleRestartClick);

    updateScreen();
})();

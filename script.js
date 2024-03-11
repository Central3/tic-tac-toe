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
        if (board.markCell(row, col, activePlayer.marker) != -1) {
            switchPlayer();
        }
        board.printBoard();
    };

    return { getActivePlayer, play };
}

let game = GameController();

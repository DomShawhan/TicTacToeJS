const blocks = document.querySelectorAll(".block");
const resetGameBtns = document.querySelectorAll(".play-again");
const winnerCon = document.getElementById("winner");
const currentCon = document.getElementById("current");
const currentPlayerCon = document.getElementById("current-player");
const winnerPlayerCon = document.getElementById("winner-player");
const winnerTextCon = document.getElementById("winner-text");
const noWinnerTextCon = document.getElementById("no-winner-text");
const setupForm = document.getElementById("setup");
const playerInputs = document.querySelectorAll(".input");

let newGame = {
    player1: "X",
    player2: "O",
    currentPlayer: "X",
    board: [{value: "", row: 1, col: 1}, {value: "", row: 1, col: 2}, {value: "", row: 1, col: 3}, 
            {value: "", row: 2, col: 1}, {value: "", row: 2, col: 2}, {value: "", row: 2, col: 3}, 
            {value: "", row: 3, col: 1}, {value: "", row: 3, col: 2}, {value: "", row: 3, col: 3},],
    active: true
}

let game = {
    player1: "X",
    player2: "O",
    currentPlayer: "X",
    board: [{value: "", row: 1, col: 1}, {value: "", row: 1, col: 2}, {value: "", row: 1, col: 3}, 
            {value: "", row: 2, col: 1}, {value: "", row: 2, col: 2}, {value: "", row: 2, col: 3}, 
            {value: "", row: 3, col: 1}, {value: "", row: 3, col: 2}, {value: "", row: 3, col: 3},],
    active: true
}

blocks.forEach((block, i) => {
    block.addEventListener("click", (e) => {
        if(game.active) {
            addResult(e, i);
        }
        e.stopPropagation();
    });
})

resetGameBtns.forEach((btn, i) => {
    btn.addEventListener("click", (e) => {
        resetGame();
    })
})

const addResult = (event, index) => {
    if(game.board[index].value == "" && game.active) {
        event.target.innerHTML = game.currentPlayer;
        event.target.classList.remove("open");
        event.target.classList.add(game.currentPlayer == game.player1 ? "player1": "player2" );

        game.board[index].value = game.currentPlayer;

        checkWin();

        game.currentPlayer = game.currentPlayer == game.player1 ? game.player2 : game.player1;
        currentPlayerCon.innerText = game.currentPlayer;
    } 
}

const checkWin = () => {
    let values = game.board.filter((c) => c.value === game.currentPlayer);

    if(values.length >= 3) {
        let row1 = values.filter((c) => c.row === 1).length;
        let row2 = values.filter((c) => c.row === 2).length;
        let row3 = values.filter((c) => c.row === 3).length;

        let col1 = values.filter((c) => c.col === 1).length;
        let col2 = values.filter((c) => c.col === 2).length;
        let col3 = values.filter((c) => c.col === 3).length;

        let diag1 = values.filter((c) => c.col === c.row).length;
        let diag2 = values.filter((c) => ((c.col === c.row && c.row === 2) || (c.col - 2 === c.row) || (c.col + 2 === c.row))).length;

        if(row1 === 3 || row2 === 3 || row3 === 3 || col1 === 3 || col2 === 3 || col3 === 3 || diag1 === 3 || diag2 === 3) {
            gameOver();
        }
        if(document.getElementsByClassName("open").length === 0) {
            noWinner();
        }
    } 
}

const gameOver = () => {
    game.active = false;
    winnerPlayerCon.innerText = game.currentPlayer;
    winnerCon.style.display = "block";
    currentCon.style.display = "none";
    noWinnerTextCon.style.display = "none";
    winnerTextCon.style.display = "block";
}

const noWinner = () => {
    game.active = false;
    currentCon.style.display = "none";
    winnerCon.style.display = "block";
    winnerTextCon.style.display = "none";
    noWinnerTextCon.style.display = "block";
}

const resetGame = () => {
    winnerCon.style.display = "none";
    game = structuredClone(newGame);
    currentCon.style.display = "block";
    currentPlayerCon.textContent = game.player1;
    blocks.forEach((block) => {
        block.textContent = "";
        block.classList.add("open");
        if(block.classList.contains("player1")){
            block.classList.remove("player1");
        } else if(block.classList.contains("player2")) {
            block.classList.remove("player2");
        }
    })
}

setupForm.addEventListener("submit", (e) => {
    newGame.player1 = e.target[0].value;
    newGame.player2 = e.target[1].value;
    newGame.currentPlayer = newGame.player1;
    game.player1 = e.target[0].value;
    game.player2 = e.target[1].value;
    game.currentPlayer = game.player1;
    setupForm.style.display = "none";
    currentPlayerCon.innerText = game.currentPlayer;
    e.preventDefault();
})

playerInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
        if(input.value.length > 1) {
            input.value = input.value.substring(0, 1);
            e.preventDefault();
        }
    })
})
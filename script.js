// TODO
// integrate playerselection in gamboard to ovveride playername variables 
// !!!!!

// playerfactory
const playerFactory = (name, marker) => {
    return { name, marker }
}
// gameboard module
const gameBoard = (() => {
    // create two players
    let PLAYER_ONE = playerFactory("Player 1", "x")
    let PLAYER_TWO = playerFactory("Player 2", "o")
    // get inputs and start button
    const playerOne = document.querySelector(".playerOne")
    const playerTwo = document.querySelector(".playerTwo")
    const window = document.querySelector(".pickname")
    const startBtn = document.getElementById("start")
    startBtn.addEventListener("click", (e) => {
        e.preventDefault()
        if (playerOne.value === "" || playerTwo.value === "") {
            console.log("click")
            window.classList.remove("start")
            startGame()

        } else {
            console.log("else")
            PLAYER_ONE = playerFactory(playerOne.value, "x")
            PLAYER_TWO = playerFactory(playerTwo.value, "o")
            window.classList.remove("start")
            startGame()
        }
    })

    // get player turn div
    const playerTurn = document.querySelector(".playerturn")
    // player turn function
    function playerTurnTxt() {
        playerTurn.textContent = turnX ? `${PLAYER_ONE.name}'s turn !` : `${PLAYER_TWO.name}'s turn !`
    }
    // handle the turn with booleans
    let turnX
    // define the winning board
    const WINNING_BOARD = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    // check the winner 
    function checkWin(currentClass) {
        return WINNING_BOARD.some(combos => {
            return combos.every(index => {
                return Board[index].classList.contains(currentClass)
            })
        })
    }
    // pull the wrapper and append turn based hover class
    const wrapper = document.querySelector(".wrapper")
    // query all cells
    const Board = document.querySelectorAll(".cell")
    // place mark function
    function placeMark(cell, currentClass) {
        cell.classList.add(currentClass)
    }
    // function to switch the turn 
    function switchTurn() {
        turnX = !turnX
    }
    // set board hover class
    function setBoardHoverClass() {
        wrapper.classList.remove(PLAYER_TWO.marker)
        wrapper.classList.remove(PLAYER_ONE.marker)
        turnX ? wrapper.classList.add(PLAYER_ONE.marker) : wrapper.classList.add(PLAYER_TWO.marker)
    }
    // game function
    function game(e) {
        const cell = e.target
        const currentClass = turnX ? PLAYER_ONE.marker : PLAYER_TWO.marker
        placeMark(cell, currentClass)
        switchTurn()
        if (checkWin(currentClass)) {
            endGame(false)
        } else if (isDraw()) {
            endGame(true)
        } else {
            playerTurnTxt()
            setBoardHoverClass()
        }
    }
    // get the winning text div and container
    const winningText = document.querySelector(".winningtext")
    const winnigWindow = document.querySelector(".info")
    // end game
    function endGame(draw) {
        if (draw) {
            winningText.textContent = "It's a Draw"
            winnigWindow.classList.add("end")
        } else {
            winningText.textContent = turnX ? `The winner is ${PLAYER_TWO.name}` : `The winner is ${PLAYER_ONE.name}`
            winnigWindow.classList.add("end")
        }
    }
    function isDraw() {
        return [...Board].every(cell => {
            return cell.classList.contains(PLAYER_ONE.marker) ||
                cell.classList.contains(PLAYER_TWO.marker)
        })
    }

    // restart the game with button
    const restartButton = document.querySelector(".restart")
    restartButton.addEventListener("click", restart)
    // restart function
    function restart() {
        winnigWindow.classList.remove("end")
        Board.forEach(cell => {
            cell.classList.remove("o")
            cell.classList.remove("x")
        })
        startGame()
    }
    // start game
    function startGame() {
        turnX = true
        Board.forEach(cell => {
            cell.addEventListener("click", game, { once: true })
        });
        setBoardHoverClass()
        playerTurnTxt()


    }
})();
const gameCells = document.querySelectorAll('.cell');

const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const restartBtn = document.querySelector('.restartBtn');
const alertBox = document.querySelector('.alertBox');

let currentPlayer = 'X';
let nextPlayer = 'O';
let playerTurn = currentPlayer;

player1.textContent = `Player 1: ${currentPlayer}`;
player2.textContent = `Player 2: ${nextPlayer}`;
const startGame = () =>{
    restartBtn.textContent = "Restart"
    currentPlayer = 'X';
    nextPlayer = 'O';
    playerTurn = currentPlayer;
    
    showAlert(`Turn for player:${playerTurn}`); 
    gameCells.forEach(cell => {
        cell.addEventListener('click', handleClick)
    })
}

const handleClick = (e) => {
    if(e.target.textContent === '')
    {
        // showAlert(`Turn for player:${playerTurn}`)
        e.target.textContent = playerTurn;
        if(checkWin())
        {
            //console.log(playerTurn);
            showAlert(`${playerTurn} is a winner!`)
            disableCells();
        }
        else if(checkTie())
        {
            // console.log("tie");
            showAlert(`It's a Tie!`);
            disableCells();
        }
        else
        {
            changePlayerTurn();
            showAlert(`Turn for player:${playerTurn}`);
        }
    }
}

const changePlayerTurn = () => {
    if(playerTurn === currentPlayer)
    {
        playerTurn = nextPlayer;
    }
    else
    {
        playerTurn = currentPlayer;
    }

}


const checkWin = () => {
    const winningConditions = 
    [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for(let i = 0; i < winningConditions.length; i++)
    {
        const [pos1, pos2, pos3] = winningConditions[i];

        if(gameCells[pos1].textContent !== '' &&
           gameCells[pos1].textContent === gameCells[pos2].textContent && 
           gameCells[pos2].textContent === gameCells[pos3].textContent)
        {
            return true;
        }    
        // console.log(`${pos1} ${pos2} ${pos3}`);
    }

    return false;
}

const checkTie = () => {
    let emptyCellCount = 0;
    gameCells.forEach(cell => {
        if(cell.textContent === '')
            emptyCellCount++;
    });

    return emptyCellCount === 0 && !checkWin()
}

const disableCells = () => {
    gameCells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
        cell.classList.add('disabled');
        restartBtn.textContent = "Restart"
    })
}

const restartGame = () => {
    gameCells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled');
    });
    startGame();
}

const showAlert = (msg) => {
    alertBox.style.display = "block";
    alertBox.textContent = msg;
}

restartBtn.addEventListener('click', restartGame);

restartBtn.addEventListener('click', startGame);
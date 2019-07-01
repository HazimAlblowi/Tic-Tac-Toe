
const cells = document.querySelectorAll('.cell');
const messageLog = document.querySelector('.messageLog');
const playersInfo = document.querySelectorAll('.players');
const gameBoard = document.querySelector('.gameBoard');
const restartButton = document.createElement('div');
const showWinner = document.createElement('div');
const players = [{
    name: 'Player 1',
    token: 'X',
    wins: 0
}, {
    name: 'Player 2',
    token: 'O',
    wins: 0
}]
let cellsArray = [[0, 1, 2],
[3, 4, 5],
[6, 7, 8]];

let turn = true;
let noOfTurns = 0;




////



const showResult = function (tie) {
    if (tie) {
        messageLog.innerText = `TIE!`;
    } else {
        turn ? players[1].wins += 1 : players[0].wins += 1;
        printInfo();
        messageLog.innerText = `${turn ? players[1].name : players[0].name} won!`;

    }
}



const checkGameOver = function () {
    for (let i = 0; i < cellsArray.length; i++) {

        if ((cellsArray[i][0] === cellsArray[i][1] && cellsArray[i][1] === cellsArray[i][2]) ||
            (cellsArray[0][i] === cellsArray[1][i] && cellsArray[1][i] === cellsArray[2][i])) {
            showResult();
            return true;
        }
    }

    if ((cellsArray[0][0] == cellsArray[1][1] && cellsArray[1][1] == cellsArray[2][2]) ||
        (cellsArray[0][2] == cellsArray[1][1] && cellsArray[1][1] == cellsArray[2][0])) {
        showResult();
        return true;
    }

    if (noOfTurns === 9) {
        showResult(true);
        return true;
    }
    return false;
}

const gameOver = function () {

    cells.forEach(cell => {
        cell.removeEventListener('click', play);
    });
    gameBoard.className = 'gameBoard blur';
    showWinner.innerText = `${turn ? players[1].name: players[0].name} WON!`
    gameBoard.parentElement.appendChild(showWinner);
    gameBoard.parentElement.appendChild(restartButton);

}
const printInfo = function () {
    for (let i = 0; i < playersInfo.length; i++) {

        playersInfo[i].querySelector('.name').innerText = players[i].name;
        playersInfo[i].querySelector(".score").innerText = `Wins: ${players[i].wins}`
        playersInfo[i].querySelector('.token').innerText = players[i].token;
    }
    if (players[0].wins > players[1].wins) {
        playersInfo[0].querySelector('.score').className = 'score winning';
        playersInfo[1].querySelector('.score').className = 'score losing';
    } else if (players[0].wins < players[1].wins) {
        playersInfo[1].querySelector('.score').className = 'score winning';
        playersInfo[0].querySelector('.score').className = 'score losing';
    } else {
        playersInfo[0].querySelector('.score').className = 'score';
        playersInfo[1].querySelector('.score').className = 'score';
    }
    messageLog.innerText = ` ${turn ? players[0].name : players[1].name} turn!`
}
const restart = function () {

    noOfTurns = 0;
    cells.forEach(cell => {
        cell.addEventListener('click', play);
    });

    messageLog.innerText = `${turn ? players[0].name : players[1].name} turn!`

    cellsArray = [[0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]];

    cells.forEach(cell => {
        cell.innerText = '';
    })
    showWinner.remove();
    restartButton.remove();
    gameBoard.className = 'gameBoard';

    printInfo();
}

const nameChangeEvent = function () {
    const name = this;
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('maxlength', '12');
    input.style.marginBottom = '10px';
    input.className = 'name';
    input.value = this.innerText;
    this.replaceWith(input);
    input.focus();

    const save = function () {
        if (input.value) {
            input.removeEventListener('blur', save)
            name.innerText = input.value;
            players[name.getAttribute('data-player')].name = input.value;
            input.replaceWith(name);
            printInfo();
        }


    }
    input.addEventListener('blur', save);
}

const play = function () {
    const col = this.getAttribute('data-c');
    const row = this.getAttribute('data-r');

    noOfTurns++;

    if (turn) {
        this.innerText = players[0].token;
        cellsArray[row][col] = 'X';
        turn = false;

    } else {
        this.innerText = players[1].token;
        cellsArray[row][col] = 'O';
        turn = true;
    }
    this.removeEventListener('click', play);

    if (checkGameOver()) {
        gameOver();
    } else {
        printInfo();
    }


}
// ------------------------

const game = function () {
    playersInfo.forEach(info => {
        info.querySelector('.name').addEventListener('click', nameChangeEvent);
    })
    cells.forEach(cell => {
        cell.addEventListener('click', play);
    });

    restartButton.className = 'restartButton';
    restartButton.innerText = 'Play again!'
    restartButton.addEventListener('click', restart);
    showWinner.className = 'winner';
    restart();
}


game();

const cells = document.querySelectorAll('.cell');
const messageLog = document.querySelector('.messageLog');
const playersInfo = document.querySelectorAll('.players');
const gameBoard = document.querySelector('.gameBoard');
const resetButton = document.querySelector('.resetButton');
const restartButton = document.createElement('div');
const showWinner = document.createElement('div');
const winLine = document.createElement('svg');
winLine.className = 'float';
winLine.setAttribute('height', '100%');
winLine.setAttribute('width', '100%');


const players = [{
    name: 'Player 1',
    token: 'X',
    tokenImg: `
        <svg height="100" width="100">
            <line  class='cross' x1="25" y1="75" x2="75" y2="25"/>
            <line  class='cross ' x1="25" y1="25" x2="75" y2="75"/>
        </svg>`,
    wins: 0
}, {
    name: 'Player 2',
    token: 'O',
    tokenImg: `
        <svg width="100" height="100">
            <circle class="circle" cx="50" cy="50" r="30"/>
        </svg>`,
    wins: 0
}]
let cellsArray = [[0, 1, 2],
[3, 4, 5],
[6, 7, 8]];

let turn = true;
let noOfTurns = 0;
let linePosition = [0, 0, 0, 0];

const lineline = `  <svg class='float' height="100%" width="100%">
<line  class='line' x1="25" y1="75" x2="75" y2="25"/>
</svg>`


const showResult = function (tie) {
    if (tie) {
        messageLog.innerText = `TIE!`;
        showWinner.innerText = `tie!`

    } else {
        turn ? players[1].wins += 1 : players[0].wins += 1;
        printInfo();
        messageLog.innerText = `${turn ? players[1].name : players[0].name} won!`;
        showWinner.innerText = `${turn ? players[1].name : players[0].name} WON!`
    }
}

const checkGameOver = function () {
    for (let i = 0; i < cellsArray.length; i++) {

        if (cellsArray[i][0] === cellsArray[i][1] && cellsArray[i][1] === cellsArray[i][2]) {
            showResult(false);
            return true;
        }
        if (cellsArray[0][i] === cellsArray[1][i] && cellsArray[1][i] === cellsArray[2][i]) {
            showResult(false);
            return true;
        }
    }

    if ((cellsArray[0][0] == cellsArray[1][1] && cellsArray[1][1] == cellsArray[2][2]) ||
        (cellsArray[0][2] == cellsArray[1][1] && cellsArray[1][1] == cellsArray[2][0])) {
        showResult(false);
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
        cell.className = 'cell';
    });

    gameBoard.prepend(winLine);
    gameBoard.className = 'gameBoard blur';

    gameBoard.parentElement.appendChild(showWinner);
    gameBoard.parentElement.appendChild(restartButton);

}
const printInfo = function () {
    for (let i = 0; i < playersInfo.length; i++) {

        playersInfo[i].querySelector('.name').innerText = players[i].name;
        playersInfo[i].querySelector(".score").innerText = `Wins: ${players[i].wins}`
        playersInfo[i].querySelector('.token').innerText = players[i].token;
        playersInfo[i].querySelector('.token').style.background =
            players[i].token == 'X' ? `rgb(117, 11, 11)` : `rgb(26, 77, 33)`;
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
    cells.forEach(cell => {
        cell.className = 'cell hover';
        cell.addEventListener('click', play);
    });
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
    this.className = 'cell';
    if (turn) {
        this.innerHTML = players[0].tokenImg;
        cellsArray[row][col] = 'X';
        turn = false;

    } else {
        this.innerHTML = players[1].tokenImg;
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
        cell.className = 'cell hover';
        cell.addEventListener('click', play);
    });
    players.forEach(player => {
        player.wins = 0;
    })
    resetButton.addEventListener('click', game);
    restartButton.className = 'restartButton';
    restartButton.innerText = 'Play again!'
    restartButton.addEventListener('click', restart);
    showWinner.className = 'winner';
    restart();
}

game();
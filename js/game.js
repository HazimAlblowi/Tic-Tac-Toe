
const cells = document.querySelectorAll('.cell');
const messageLog = document.querySelector('.messageLog');
const restartButton = document.querySelector('.restartButton');

let cellsArray = [[0, 1, 2],
[3, 4, 5],
[6, 7, 8]];

let turn = true;
let noOfTurns = 0;

const checkGameOver = function () {
    for (let i = 0; i < cellsArray.length; i++) {

        if ((cellsArray[i][0] == cellsArray[i][1] && cellsArray[i][1] == cellsArray[i][2]) ||
            (cellsArray[0][i] == cellsArray[1][i] && cellsArray[1][i] == cellsArray[2][i])) {
            messageLog.innerText = `Player ${turn ? 'X' : 'O'} won!`;
            return true;
        }
    }

    if ((cellsArray[0][0] == cellsArray[1][1] && cellsArray[1][1] == cellsArray[2][2]) ||
        (cellsArray[0][2] == cellsArray[1][1] && cellsArray[1][1] == cellsArray[2][0])) {
        messageLog.innerText = `Player ${turn ? 'X' : 'O'} won!`;
        return true;
    }

    if (noOfTurns === 9) {
        messageLog.innerText = `TIE!`;

        return true;
    }
    return false;
}

const gameOver = function () {

    cells.forEach(cell => {
        cell.removeEventListener('click', play);
    });
}

const restart = function () {

    noOfTurns = 0;
    cells.forEach(cell => {
        cell.addEventListener('click', play);
    });

    messageLog.innerText = `Player ${turn ? 'O' : 'X'} trun!`

    cellsArray = [[0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]];

    cells.forEach ( cell => {
        cell.innerText = '';
    })
}

const play = function () {
    const col = this.getAttribute('data-c');
    const row = this.getAttribute('data-r');

    noOfTurns++;

    if (turn) {
        this.innerText = 'O';
        cellsArray[row][col] = 'O';
        turn = false;

    } else {
        this.innerText = 'X';
        cellsArray[row][col] = 'X';
        turn = true;
    }
    this.removeEventListener('click', play);



    if (checkGameOver()) {
        gameOver();
    } else {
        messageLog.innerText = `Player ${turn ? 'O' : 'X'} trun!`
    }


}

cells.forEach(cell => {
    cell.addEventListener('click', play);
});

restartButton.addEventListener('click', restart);
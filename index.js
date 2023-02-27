const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

let arr = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]
]

let turn = 0;

function cellClickHandler (row, col) {
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);
    if(checkWinner() != EMPTY){
        alert(`Победил  ${checkWinner()}`);
        return;
    }
    if(arr[row][col] != EMPTY){
        return;
    }
    if(turn === 9){
        return;
    }
    if(turn===8){
        alert("Победила дружба");
    }
    if(turn%2){
        renderSymbolInCell(ZERO, row, col);
    }
    else{
        renderSymbolInCell(CROSS, row, col);
    }
    turn++;

    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function checkWinner(){
    for(let a of arr){
        let t = true;
        for(let i = 0; i < 2; i++){
            t = t && a[i] == a[i+1]; 
        }
        if(t){
            return a[0];
        }
    }

    for(let j = 0; j < 3; j++){
        let t = true;
        for(let i = 0; i < 2; i++){
            t = t && arr[i][j] == arr[i+1][j]; 
        }
        if(t){
            return arr[0][j];
        }
    }

    let t = true;
    for(let i = 0; i < 2; i++){
        t = t && arr[i][i] == arr[i+1][i+1];
    }
    if(t){
        return arr[0][0];
    }

    t = true;
    for(let i = 0; i < 2; i++){
        t = t && arr[i][2 - i] == arr[i+1][1 - i];
    }
    if(t){
        return arr[0][2];
    }
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);
    arr[row][col] = symbol;

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    console.log('reset!');
}


/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
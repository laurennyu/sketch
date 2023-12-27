const board = document.querySelector('#board');
function makeBoard(rows) {
    // clear board
    while(board.firstChild){
        board.removeChild(board.firstChild);
    }
    // make board
    for (let rowNum = 0; rowNum < rows; rowNum++) {
        // make row
        const row = document.createElement('div');
        row.classList.add('row');
        for (let colNum = 0; colNum < rows; colNum++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            row.appendChild(tile);
        }
        board.appendChild(row);
    }
}

// make default 16x16 board
makeBoard(2);
makeBoard(16);
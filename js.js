const board = document.querySelector('#board');
let color = 'black';

function makePalette(colors) {
    const palette = document.querySelector('#palette');

    for (i in colors) {
        const swatch = document.createElement('div');
        swatch.classList.add('swatch');
        swatch.style.backgroundColor = colors[i];
        palette.appendChild(swatch);
    }
}
makePalette(['red', 'yellow', 'blue']);

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
            // hover
            /*tile.addEventListener('mouseenter', () =>
                tile.style.backgroundColor = color
            )
            tile.addEventListener('mouseleave', () =>
                tile.style.backgroundColor = 'white'
            )*/
            // color
            tile.addEventListener('mousedown', () =>
                tile.style.backgroundColor = color
            )
            row.appendChild(tile);
        }
        board.appendChild(row);
    }
}

// make default 16x16 board
makeBoard(16);

// allow user to change size of board
const btn = document.querySelector('#size');
btn.addEventListener('click', () =>
    makeBoard(window.prompt('Enter new sketchbook dimension'))
)
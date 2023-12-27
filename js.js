const board = document.querySelector('#board');
let color = 'black';
let dim = 16;

function makePalette(colors) {
    const palette = document.querySelector('#palette');

    let swatch = document.createElement('div');
    swatch.classList.add('swatch');
    swatch.style.backgroundColor = 'red';
    swatch.addEventListener('click', () =>
        color = 'red'
    )
    palette.appendChild(swatch);

    swatch = document.createElement('div');
    swatch.classList.add('swatch');
    swatch.style.backgroundColor = 'orange';
    swatch.addEventListener('click', () =>
        color = 'orange'
    )
    palette.appendChild(swatch);

    swatch = document.createElement('div');
    swatch.classList.add('swatch');
    swatch.style.backgroundColor = 'yellow';
    swatch.addEventListener('click', () =>
        color = 'yellow'
    )
    palette.appendChild(swatch);

    swatch = document.createElement('div');
    swatch.classList.add('swatch');
    swatch.style.backgroundColor = 'green';
    swatch.addEventListener('click', () =>
        color = 'green'
    )
    palette.appendChild(swatch);

    swatch = document.createElement('div');
    swatch.classList.add('swatch');
    swatch.style.backgroundColor = 'blue';
    swatch.addEventListener('click', () =>
        color = 'blue'
    )
    palette.appendChild(swatch);

    swatch = document.createElement('div');
    swatch.classList.add('swatch');
    swatch.style.backgroundColor = 'black';
    swatch.addEventListener('click', () =>
        color = 'black'
    )
    palette.appendChild(swatch);

    /*for (i in colors) {
        let swatch = document.createElement('div');
        swatch.classList.add('swatch');
        swatch.style.backgroundColor = colors[i];
        swatch.addEventListener('click', () =>
            console.log(colors[i])
        )
        palette.appendChild(swatch);
    }*/
}
//makePalette(['red', 'yellow', 'blue']);

function makeBoard(rows) {
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

// make palette and default 16x16 board
makePalette();
makeBoard(16);

// allow user to change size of board
const btn = document.querySelector('#size');
btn.addEventListener('click', () =>
    makeBoard(window.prompt('Enter new sketchbook dimension'))
)

// allow user to clear board
const clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', () =>
    makeBoard(dim)
)
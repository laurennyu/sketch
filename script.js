const board = document.querySelector('#board');
let color = 'black';
let dim = 20;

function makePalette(colors) {
    const palette = document.querySelector('#palette');

    for (i in colors) {
        const swatch = document.createElement('div');
        swatch.classList.add('swatch');
        swatch.style.backgroundColor = colors[i];
        palette.appendChild(swatch);
    }

    palette.addEventListener('click', (e) => {
        console.log(e.target.style.backgroundColor);
        color = e.target.style.backgroundColor;
    })
}

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

/*
function pixelateImage2(originalImage, pixelationFactor) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const originalWidth = originalImage.width;
    const originalHeight = originalImage.height;
    const canvasWidth = originalWidth;
    const canvasHeight = originalHeight;

    console.log(originalWidth, originalHeight, canvasWidth, canvasHeight);

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    context.drawImage(originalImage, 0, 0, originalWidth, originalHeight);
    const originalImageData = context.getImageData(
      0,
      0,
      originalWidth,
      originalHeight
    ).data;
    if (pixelationFactor !== 0) {
      for (let y = 0; y < originalHeight; y += pixelationFactor) {
        for (let x = 0; x < originalWidth; x += pixelationFactor) {
          // extracting the position of the sample pixel
          const pixelIndexPosition = (x + y * originalWidth) * 4;
          // drawing a square replacing the current pixels
          context.fillStyle = `rgba(
            ${originalImageData[pixelIndexPosition]},
            ${originalImageData[pixelIndexPosition + 1]},
            ${originalImageData[pixelIndexPosition + 2]},
            ${originalImageData[pixelIndexPosition + 3]}
          )`;
          context.fillRect(x, y, pixelationFactor, pixelationFactor);
        }
      }
    }
    originalImage.src = canvas.toDataURL();
  }

function pixelateImage(img) {
    var canvas = document.getElementById('canvas'); 
    var ctx = canvas.getContext('2d');
    const originalWidth = img.width;
    const originalHeight = img.height;
    const canvasWidth = originalWidth;
    const canvasHeight = originalHeight;
    console.log(originalWidth, originalHeight, canvasWidth, canvasHeight);
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    ctx.drawImage(img, 0, 0, dim, dim);
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(canvas, 0, 0, dim, dim, 0, 0, canvas.width, canvas.height);  
}*/

// make palette and default board
makePalette(['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'black']);
makeBoard(20);

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

// allow user to change image
window.addEventListener('load', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            var img = document.querySelector('#preview');
            //const img = new Image();
            img.onload = () => {
                URL.revokeObjectURL(img.src);  // no longer needed, free memory
            }
            img.src = URL.createObjectURL(this.files[0]); // set src to blob url*/
            //const canvas = document.createElement('canvas');
            //canvas.getContext('2d').drawImage(img, 500, 500);
            console.log(img.width);
            console.log(img.height);
            console.log(img);
            pixelateImage(img);
        }
    })
})

var canvas = document.getElementById('canvas'); 
var ctx = canvas.getContext('2d');
var img = new Image();
img.setAttribute('width', 500);
img.setAttribute('height', 500);
var size = 0.04;

function firstDraw() {
    var initialImageURL = document.querySelector('img').src;
    draw(initialImageURL); 
}

function draw (imgURL) { 
    //img.crossOrigin="anonymous"; 
    img.src = imgURL; 
    img.onload = function() { 
      console.log(img.height);
      console.log(img.width);
      canvas.height = img.height/4; 
      canvas.width = img.width/4; 
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height); 
      pixelate(); 
    }; 
}  

function pixelate() { 
    canvas.height = img.height; 
    canvas.width = img.width;
    var w = canvas.width * size;
    var h = canvas.height * size;

    /// draw original image to the scaled size
    ctx.drawImage(img, 0, 0, w, h);
    
    /// then draw that scaled image thumb back to fill canvas
    /// As smoothing is off the result will be pixelated
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
}

function submitImageURL() {
    var imgURL = document.getElementById("ImageURL").value;

    //veriy the form isn't black or null
    if (imgURL == null || imgURL == "") {
        alert("Image URL must be filled out");
        return false;
    }
    //verify that the address is secure
    if ( imgURL.search("/https:/") != -1 ) {
        alert("Image URL from https site (security reasons)");
        return false;  
    }

    //draw the submitted image onto the canvas
    draw(imgURL);
}

window.onload = firstDraw();

// when image is uploaded
/*let imgInput = document.getElementById('image-input');
imgInput.addEventListener('change', (e) => {
    if (e.target.files) {
        var img = document.querySelector('img');
        img.onload = () => {
            URL.revokeObjectURL(img.src);  // no longer needed, free memory
        }
  
        img.src = URL.createObjectURL(this.files[0]); // set src to blob url
        
        
        let imageFile = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            var img = document.createElement("img");
            img.onload = function (event) {
                // Dynamically create a canvas element
                var canvas = document.createElement("canvas");

                // var canvas = document.getElementById("canvas");
                var ctx = canvas.getContext("2d");

                // Actual resizing
                ctx.drawImage(img, 0, 0, 500, 500);

                // Show resized image in preview element
                var dataurl = canvas.toDataURL(imageFile.type);
                document.getElementById("preview").src = dataurl;
            }
            img.src = e.target.result;
        }
        reader.readAsDataURL(imageFile);
    }
})


function compressImage(originalImage, pixelationFactor) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    //const originalWidth = originalImage.width;
    //const originalHeight = originalImage.height;
    const canvasWidth = originalWidth;
    const canvasHeight = originalHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    context.drawImage(originalImage, 0, 0, originalWidth, originalHeight);
    const originalImageData = context.getImageData(
      0,
      0,
      originalWidth,
      originalHeight
    ).data;
    if (pixelationFactor !== 0) {
      for (let y = 0; y < originalHeight; y += pixelationFactor) {
        for (let x = 0; x < originalWidth; x += pixelationFactor) {
          // extracting the position of the sample pixel
          const pixelIndexPosition = (x + y * originalWidth) * 4;
          // drawing a square replacing the current pixels
          context.fillStyle = `rgba(
            ${originalImageData[pixelIndexPosition]},
            ${originalImageData[pixelIndexPosition + 1]},
            ${originalImageData[pixelIndexPosition + 2]},
            ${originalImageData[pixelIndexPosition + 3]}
          )`;
          context.fillRect(x, y, pixelationFactor, pixelationFactor);
        }
      }
    }
    originalImage.src = canvas.toDataURL();
}*/
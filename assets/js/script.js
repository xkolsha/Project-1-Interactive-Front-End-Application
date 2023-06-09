
// ----------------------------------------------------------------------------------------
// Start of Aviad Code:

// Unsplash API key
var UNSPLASH_ACCESS_KEY = "tZgxG3ifL1I1t2iKVY7Pm9kjOxi7M06Ix8c29PJOxfM";

// ColorAPI API example for referance
var COLORAPI_API_KEY =
  "https://www.thecolorapi.com/scheme?hex=002e63&format=json&mode=analogic&count=5";

// Unsplash API base URL
var unsplashUrl = "https://api.unsplash.com/photos/random/?client_id=";

// ColorAPI base URL
var colorapiUrl = "https://www.thecolorapi.com/scheme?hex=";
var alphanumeric = "0123456789ABCDEF";

// Function to generate a random hex color
// For example: #002e63 = dark blue. we will get this by randomly selects the index 0,0,2,14,6,3 from the alphanumeric string
function getRandomHexColor() {
  var color = "";
  for (var i = 0; i < 6; i++) {
    color += alphanumeric[Math.floor(Math.random() * 16)];
  }

  // Append the random color to the colorapiUrl
  var urlWithColor = colorapiUrl + color;

  console.log(urlWithColor); // This line logs the URL with the color to the console

  return color;
}

// Function to set the background color of all elements with the class 'randomFill'
function setColorForRandomFill() {
  // Query all elements with the class 'randomFill'
  var tiles = document.querySelectorAll(".randomFill");

  // For each tile, set its background color to a random color
  tiles.forEach(function (tile) {
    var randomColor = getRandomHexColor();
    tile.style.backgroundColor = "#" + randomColor;
    tile.textContent = randomColor;

    // Calculate the brightness of the background color to determine if it's light or dark
    // https://en.wikipedia.org/wiki/Relative_luminance this is for the README file
    // https://www.w3schools.com/jsref/jsref_slice_string.asp this is for the README file
    // https://www.colorhexa.com/002e63 this is for the README file
    // #RRGGBB (e.g. #002e63) represents RGB color; each 2-digit hex like 00,2e or 63 converts to decimal via (16*1st digit + 1*2nd digit), the maximum is 255 (FF)
    var r = parseInt(randomColor.slice(0, 2), 16);
    var g = parseInt(randomColor.slice(2, 4), 16);
    var b = parseInt(randomColor.slice(4, 6), 16);
    var brightness = Math.round((r * 212.6 + g * 715.2 + b * 72.2) / 1000);

    // If the background color is light, make the text color dark, and vice versa
    if (brightness > 125) {
      tile.style.color = "black";
    } else {
      tile.style.color = "white";
    }
  });
}

setColorForRandomFill();

// End of Aviad Code


// Start of Chris Code:
// https://www.javascripttutorial.net/web-apis/javascript-canvas/ This is for ReadMe File
// https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image This is for the ReadMe file
// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas This is for the ReadMe


document.getElementById('getPColor').addEventListener('click', function() {
    // get url from the image input
    var imageUrl = document.getElementById('imageInput').value;
  
    // Create a new Image object and set properties
    var image = new Image();
        image.crossOrigin = 'Anonymous'; // allows us to load images from different domains
        image.src = imageUrl; // set the source of the image
  
    // Event handler that runs when the image has finished loading
    image.onload = function() {
    //creates a canvas element with the same dimensions as the loaded image
        var canvas = document.createElement('canvas');
        canvas.width = image.width; 
        canvas.height = image.height;

        // gets the 2d rendering context for the canvas
        var context = canvas.getContext('2d');
        context.drawImage(image, 0, 0); // draw the loaded image onto the canvs

        // gets the pixel data of the canvas image
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;

        //create an object to keep track of the amount of colors
        var colorData = {};

        // goes over generated pixel data to get the Rbg values
        for (var i = 0; i < imageData.length; i += 4) {
        var r = imageData[i]; // red
        var g = imageData[i + 1]; // green
        var b = imageData[i + 2]; // blue

        var rbg = r + ',' + g + ',' + b;

        if (colorData[rbg]) {
          colorData[rbg]++;
        } else {
          colorData[rbg] = 1;
          }
        }
        
        // LEFT TO DO
        // need to make a rgb string / add the color count to var colorCounts / find the primary color (highest pixel count)
        // add information to Div
        // Console.Log to test
        // Styling
        }
    });
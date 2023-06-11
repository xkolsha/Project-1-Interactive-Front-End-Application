// ----------------------------------------------------------------------------------------
// Start of Aviad Code:

// Unsplash API key
var UNSPLASH_ACCESS_KEY = "tZgxG3ifL1I1t2iKVY7Pm9kjOxi7M06Ix8c29PJOxfM";

// Unsplash API base URL
var unsplashUrl = "https://api.unsplash.com/photos/random/?client_id=";

// ColorAPI base URL
var colorapiUrl = "https://www.thecolorapi.com/id?hex=";

// ColorAPI base scheme URL
var ColorSchemeAPI =
  "https://www.thecolorapi.com/scheme?hex=534C8A&mode=monochrome&count=5";
var alphanumeric = "0123456789ABCDEF";

// Function to generate a random hex color
// For example: #534C8A = Victoria. we will get this by randomly selects the index 5,3,4,12,8,9 from the alphanumeric string
function getRandomHexColor() {
  var color = "";
  for (var i = 0; i < 6; i++) {
    color += alphanumeric[Math.floor(Math.random() * 16)];
  }

  // Append the random color to the colorapiUrl
  var urlWithColor = colorapiUrl + color;

  return color;
}

// Function to fetch color data from ColorAPI and update the cards
function updateColorData() {
  fetch("https://www.thecolorapi.com/id?hex=534C8A&format=json")
    .then((response) => response.json())
    .then((data) => {
      // Extract the required values
      var rgb = data.rgb.value;
      var hex = data.hex.value;
      var hsv = data.hsv.value;
      var cmyk = data.cmyk.value;
      var hsl = data.hsl.value;
      var imageNamed = data.name.value;

      // Update the cards with the extracted values
      document.getElementById("rgb-value").textContent = rgb;
      document.getElementById("hex-value").textContent = hex;
      document.getElementById("hsv-value").textContent = hsv;
      document.getElementById("cmyk-value").textContent = cmyk;
      document.getElementById("hsl-value").textContent = hsl;
      document.getElementById("color-name").textContent = imageNamed;
      document.getElementById("mainColor").style.backgroundColor = hex;
    });
}
updateColorData();

function setTextBrightness(card, hexColor) {
  var brightness = calculateBrightness(hexColor);

  if (brightness > 125) {
    card.style.color = "black";
  } else {
    card.style.color = "white";
  }
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

document.getElementById("getPColor").addEventListener("click", function () {
  // get url from the image input
  var imageUrl = document.getElementById("imageInput").value;

  // Create a new Image object and set properties
  var image = new Image();
  image.crossOrigin = "Anonymous"; // allows us to load images from different domains
  image.src = imageUrl; // set the source of the image

  // Event handler that runs when the image has finished loading
  image.onload = function () {
    //creates a canvas element with the same dimensions as the loaded image
    var canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;

    // gets the 2d rendering context for the canvas
    var context = canvas.getContext("2d");
    context.drawImage(image, 0, 0); // draw the loaded image onto the canvs

    // gets the pixel data of the canvas image
    var imageData = context.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    ).data;

    //create an object to keep track of the amount of colors
    var colorData = {};

    // goes over generated pixel data to get the Rbg values
    for (var i = 0; i < imageData.length; i += 4) {
      var r = imageData[i]; // red
      var g = imageData[i + 1]; // green
      var b = imageData[i + 2]; // blue

      var rbg = r + "," + g + "," + b;

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
  };
});

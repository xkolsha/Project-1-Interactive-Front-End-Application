unSplashKey = "tZgxG3ifL1I1t2iKVY7Pm9kjOxi7M06Ix8c29PJOxfM";
unsplashUrl = "https://api.unsplash.com/photos/random?client_id=";

// // call the unSplash API to fetch an image from a URL
// fetch(unsplashUrl + unSplashKey)
//     .then(response => response.json())
//     .then(data => {
//         //fetch image url
//         var imageLink = data.urls.regular;

//         //create an image element
//         var image = new Image();
//         image.crossOrigin = '';

//         //set the image source url
//         image.src = imageLink;

//         // Generate the color palette when the image is loaded
//         image.onload = function() {
//             var colorPalette = generatePallet(image);

//             // Display the color palette
//             displayPallet(colorPalette);

//         };
//     });

//     //This function will generate the color pallet from the image
//     function generatePallet(image) {

//     }

var imageUrl = [];

fetch(imageUrl + "?client_id" + unSplashKey);

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
    var brightness = Math.round((r * 299 + g * 587 + b * 114) / 1000);

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

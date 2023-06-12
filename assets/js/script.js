// ----------------------------------------------------------------------------------------
// Start of Aviad Code:

// Unsplash API key
const UNSPLASH_ACCESS_KEY = "tZgxG3ifL1I1t2iKVY7Pm9kjOxi7M06Ix8c29PJOxfM";

// ColorAPI base URL
const colorApiUrl = "https://www.thecolorapi.com/id?hex=";

const alphanumeric = "0123456789ABCDEF";

// Function to generate a random hex color
// For example: #534C8A = Victoria. We randomly select the index 5, 3, 4, 12, 8, 9 from the alphanumeric string
function getRandomHexColor() {
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += alphanumeric[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Calculate the brightness of the background color to determine if it's light or dark
// #RRGGBB (e.g., #534C8A) represents RGB color; each 2-digit hex like 53, 4c, or 8a converts to decimal via (16 * 1st digit + 1 * 2nd digit), with a maximum value of 255 (FF)
// Reference: https://en.wikipedia.org/wiki/Relative_luminance
// Reference: https://www.w3schools.com/jsref/jsref_slice_string.asp
// Reference: https://www.colorhexa.com/534C8A
function calculateBrightness(hexColor) {
  const r = parseInt(hexColor.slice(0, 2), 16);
  const g = parseInt(hexColor.slice(2, 4), 16);
  const b = parseInt(hexColor.slice(4, 6), 16);
  const brightness = Math.round((r * 212.6 + g * 715.2 + b * 72.2) / 1000);
  return brightness;
}

// Function to fetch color data from ColorAPI and update the cards
async function updateColorData(hexColor) {
  try {
    // Fetch color data from ColorAPI
    const response = await fetch(colorApiUrl + hexColor + "&format=json");
    const data = await response.json();

    // Extract color values from the response
    const rgb = data.rgb.value;
    const hex = data.hex.value;
    const hsv = data.hsv.value;
    const cmyk = data.cmyk.value;
    const hsl = data.hsl.value;
    const imageNamed = data.name.value;

    // Update corresponding elements with the fetched values
    document.getElementById("rgb-value").textContent = rgb;
    document.getElementById("hex-value").textContent = hex;
    document.getElementById("hsv-value").textContent = hsv;
    document.getElementById("cmyk-value").textContent = cmyk;
    document.getElementById("hsl-value").textContent = hsl;
    document.getElementById("color-name").textContent = imageNamed;
    document.getElementById("mainColor").style.backgroundColor = hex;
  } catch (error) {
    console.error("Error updating color data:", error);
  }
}

// If the background color is light, make the text color black; otherwise, make it white
function setTextBrightness(card, hexColor) {
  const brightness = calculateBrightness(hexColor);
  if (brightness > 125) {
    card.style.color = "black";
  } else {
    card.style.color = "white";
  }
}

// For each card, set its background color to a random color and update the textquote("color and update the text color", "card, randomColor);\n  });\n}\n\n// Call the functions to update the color data, generate random colors, and update the scheme data\nupdateColorData();\nsetColorForRandomFill();\nupdateSchemeData();")
function setColorForRandomFill() {
  const cards = document.querySelectorAll(".randomFill");
  cards.forEach(function (card) {
    const randomColor = getRandomHexColor();
    card.style.backgroundColor = "#" + randomColor;
    card.textContent = randomColor;
    setTextBrightness(card, randomColor);
  });
}

// Function to fetch scheme data from ColorAPI and update the cards
async function updateSchemeData(hexColor) {
  try {
    const schemeModes = [
      "monochrome",
      "monochrome-dark",
      "monochrome-light",
      "analogic",
      "complement",
      "analogic-complement",
      "triad",
      "quad",
    ];

    // Iterate over each scheme mode
    for (const mode of schemeModes) {
      const response = await fetch(
        `https://www.thecolorapi.com/scheme?hex=${hexColor}&mode=${mode}&count=5`
      );
      const data = await response.json();
      const colors = data.colors.map((color) => color.hex.value);

      // Update the cards with the extracted values
      for (let i = 1; i <= 5; i++) {
        const card = document.getElementById(`${mode}-color-${i}`);
        card.style.backgroundColor = colors[i - 1];
        card.textContent = colors[i - 1];
        setTextBrightness(card, colors[i - 1]);
      }
    }
  } catch (error) {
    console.error("Error updating scheme data:", error);
  }
}
// Call the functions to update the color data, generate random colors, and update the scheme data
// Get the color from the URL
const urlParams = new URLSearchParams(window.location.search);
const color = urlParams.get("color");

if (color) {
  // If a color was specified, use it
  updateColorData(color);
  updateSchemeData(color);
} else {
  // Otherwise, generate a random color
  const randomColor = getRandomHexColor();
  updateColorData(randomColor);
  updateSchemeData(randomColor);
}

setColorForRandomFill();

document.getElementById("generate-btn").addEventListener("click", function () {
  const inputColor = document.getElementById("color-input").value;
  if (inputColor) {
    window.location.href = "color.html?color=" + inputColor;
  } else {
    window.location.href = "color.html";
  }
});

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

      // update the color count in (colorData)
      if (colorData[rbg]) {
        colorData[rbg]++;
      } else {
        colorData[rbg] = 1;
      }
    }

    // find the primary color based on the highest colorData count
    var primaryColor = Object.keys(colorData).reduce(function (a, b) {
      return colorData[a] > colorData[b] ? a : b;
    });

    // This will be the output for the generated color from the image to work with the color api
    document.getElementById("colorOutput").style.backgroundColor =
      "rbg(" + primaryColor + ")"; // is not needed if we generate a palette through colorapi
    document.getElementById("colorOutput").textContent =
      "Primary Color: " + primaryColor;
  };

  //on error message incase the image can not load. (from line 176)
  image.onerror = function () {
    document.getElementById("colorOutput").textContent = "Error loading image.";
  };
});

// function to add the navbar to the page and make it responsive
fetch("navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar").innerHTML = data;

    const burger = document.querySelector(".navbar-burger");
    const menu = document.querySelector("#" + burger.dataset.target);

    burger.addEventListener("click", () => {
      burger.classList.toggle("is-active");
      menu.classList.toggle("is-active");
    });
  });

// function to add the footer to the page
fetch("footer.html")
  .then((response) => response.text())
  .then((data) => (document.getElementById("footer").innerHTML = data));

// function to add the font selector to the page (Roboto is the default font)
fetch(
  "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBSHB0WYooQ8SY0ZCk7njB-0JnIhX5JZrI"
)
  .then((response) => response.json())
  .then((data) => {
    const selectFont = document.getElementById("font-select");
    data.items.forEach((font) => {
      const option = document.createElement("option");
      option.value = font.family;
      option.textContent = font.family;
      selectFont.appendChild(option);

      if (font.family === "Roboto") {
        option.selected = true;
      }
    });
  });

// function to update the font on the page
function updateFont() {
  const selectFont = document.getElementById("font-select");
  const selectedFont = selectFont.value || "Roboto";
  const inputText = document.getElementById("text-input");
  const inputSize = document.getElementById("size-input");
  const selectedStyle = document.querySelector('input[name="style"]:checked').value;
  const textSize = inputSize.value;
  const outputText = document.getElementById("output-text");
  const outputUrl = document.getElementById("output-url");

  // if the user has not entered any text or size, set the default values
  if (!inputText.value) {
    inputText.value = "This is a great choice!";
  }

  // if the user has not entered any text or size, set the default values
  if (!inputSize.value) {
    inputSize.value = "35";
  }

  outputText.style.fontFamily = selectedFont;
  outputText.style.fontSize = `${textSize}px`;
  outputText.textContent = inputText.value;

  // if the user has not selected any style, set the default values
  if (selectedStyle === "italic" || selectedStyle === "bold italic") {
    outputText.style.fontStyle = "italic";
  } else {
    outputText.style.fontStyle = "normal";
  }

  // if the user has not selected any style, set the default values
  if (selectedStyle === "bold" || selectedStyle === "bold italic") {
    outputText.style.fontWeight = "bold";
  } else {
    outputText.style.fontWeight = "normal";
  }

  const styleSheetEl = document.createElement("link");
  const headList = document.getElementById("head-0");

  styleSheetEl.rel = "stylesheet";
  styleSheetEl.href = `https://fonts.googleapis.com/css?family=${selectedFont.replace(" ", "+")}`;

  const existingFontLink = outputUrl.querySelector("a");
  if (existingFontLink) {
    outputUrl.removeChild(existingFontLink);
  }

  document.head.appendChild(styleSheetEl);

  const fontLink = document.createElement("a");
  fontLink.href = styleSheetEl.href;
  fontLink.textContent = styleSheetEl.href;
  outputUrl.appendChild(fontLink);

  
}

// event listeners for the font selector
document.getElementById("size-input").addEventListener("input", function () {
  document.getElementById("size-display").textContent = this.value;
  updateFont();
});
document.getElementById("text-input").addEventListener("input", updateFont);
document.getElementById("font-select").addEventListener("change", updateFont);
document.querySelectorAll('input[name="style"]').forEach((element) => {
  element.addEventListener("change", updateFont);
});

// event listener for the page load
window.onload = updateFont;
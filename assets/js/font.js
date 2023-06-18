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

// Font Generator

// fetch available fonts from google api
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
      });
    });
  
  // Function to update the font
  function updateFont() {
    const inputText = document.getElementById("text-input").value;
    const selectFont = document.getElementById("font-select");
    const selectStyle = document.getElementById("style-select");
    const inputSize = document.getElementById("size-input");
    const selectedFont = selectFont.value;
    const selectedStyle = selectStyle.value;
    const textSize = inputSize.value;
    const outputText = document.getElementById("output-text");
  
    outputText.style.fontFamily = selectedFont;
    outputText.style.fontStyle = selectedStyle;
    outputText.style.fontSize = `${textSize}px`;
    outputText.textContent = inputText;
  }
  
  //Event Listeneres
  document.getElementById("size-input").addEventListener("input", updateFont);
  document.getElementById("text-input").addEventListener("input", updateFont);
  document.getElementById("font-select").addEventListener("change", updateFont);
  document.getElementById("style-select").addEventListener("change", updateFont);
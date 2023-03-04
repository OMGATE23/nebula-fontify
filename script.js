const body = document.body;
const elements = document.body.querySelectorAll("*");
const optionsDiv = document.querySelector(".options");

let selectedElement;

// checks if the element has text, highlight and set attribute data-is-text
elements.forEach((el) => {
  if (
    el.textContent &&
    el.childNodes[0].nodeValue &&
    el.childNodes[0].nodeValue.trim() !== "" &&
    !el.attributes.unselect
  ) {
    el.style.outline = "2px solid black";
    el.setAttribute("data-is-text", "true");
  }
});

// set the clicked element to selectedElement and display options to change text style to bold and italic
body.addEventListener("click", (e) => {
  //check if the element has data-is-text as well as it does not have the unselect attribute given to option buttons
  if (e.target.getAttribute("data-is-text")) {
    if (!e.target.attributes.unselect) {
      selectedElement = e.target;

      e.target.style.color = "red";
      optionsDiv.style.top = `${e.clientY}px`;
      optionsDiv.style.left = `${e.clientX}px`;
      optionsDiv.style.display = "inline-flex";
    }
  } else {
    if (!e.target.attributes.unselect && !e.target.getAttribute("data-options")) {
      optionsDiv.style.display = "none";
    }
  }
  if(!e.target.getAttribute("data-options") && !e.target.getAttribute("data-is-text")) {
    optionsDiv.style.display = "none";
  }
});

optionsDiv.children[0].addEventListener("click", () => {
  if (
    selectedElement.style.fontWeight > 400 ||
    selectedElement.style.fontWeight === "bold"
  ) {
    selectedElement.style.fontWeight = 400;
    optionsDiv.children[0].style.fontWeight = 400;
  } else {
    selectedElement.style.fontWeight = 700;
    optionsDiv.children[0].style.fontWeight = 700;
  }
});

optionsDiv.children[1].addEventListener("click", () => {
  if (selectedElement.style.fontStyle === "italic") {
    selectedElement.style.fontStyle = "normal";
    optionsDiv.children[1].style.fontStyle = "italic";
    optionsDiv.children[1].style.fontWeight = "400";
  } else {
    selectedElement.style.fontStyle = "italic";
    optionsDiv.children[1].style.fontWeight = "bold";
  }
});

optionsDiv.children[2].addEventListener("blur", () => {
  console.log(optionsDiv.children[2].value);
  selectedElement.style.fontSize = `${optionsDiv.children[2].value}px`;
});

optionsDiv.children[3].addEventListener("input", () => {
  console.log(optionsDiv.children[3].value);
  selectedElement.style.color = optionsDiv.children[3].value;
});

// Google fonts

const API_KEY = "AIzaSyDkxf_L1L2bOOVmztw_NcfY6eLmXNiZqAk";
const apiUrl = `https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}&sort=popularity`;

let allFonts = [];

async function getGoogleFonts() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data.items;
}

function applyFont(fontName, element) {
  console.log(element)
  element.style.fontFamily = fontName;
}

getGoogleFonts().then(async (fonts) => {
  allFonts = fonts;
  setFontOptions(fonts);
});

async function setFont(fontName) {
  const selectedFont = allFonts.filter((font) => font?.family === fontName)[0];

  if (selectedFont && selectedFont.files && selectedFont.files.regular) {
    const fontContent = await fetch(selectedFont?.files.regular).then((r) =>
      r.arrayBuffer()
    );

    const font = new FontFace(selectedFont.family, fontContent);
    await font.load();
    document.fonts.add(font);
  }
}

const selectEl = document.querySelector("#select");

function setFontOptions(fonts) {
  fonts.forEach(async (font, index) => {
    if (index > 200) {
      return;
    }

    if (font.family && font.files && font.files.regular) {
      const optionEl = document.createElement("option");
      optionEl.setAttribute("value", font.family);
      optionEl.textContent = font.family;
      setFont(font?.family)
      optionEl.style.fontFamily = font.family;
      selectEl.append(optionEl);
    }
  });
}

selectEl.addEventListener("change", (e) => {
    applyFont(e.target.value, selectedElement)
});
  
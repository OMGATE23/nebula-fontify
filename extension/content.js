editTypography = () => {
  const elements = document.body.querySelectorAll("*");
  let selectedElement;
  document.querySelector("body").style.cursor =
    "url(https://res.cloudinary.com/dqkl3iifo/image/upload/v1677993621/logos/ufo_j1dnoz.png) , auto";
  elements.forEach((el) => {
    if (
      el.textContent &&
      el.childNodes[0].nodeValue &&
      el.childNodes[0].nodeValue.trim() !== "" &&
      !el.attributes.unselect
    ) {
      el.style.outline = "2px solid limegreen";
      el.setAttribute("data-is-text", "true");
    }
  });

  generateOptionsContainer();

  document.querySelector("body").addEventListener("click", (e) => {
    const optionsDiv = document.querySelector(".stylo-options");
    //check if the element has data-is-text as well as it does not have the unselect attribute given to option buttons
    if (e.target.getAttribute("data-is-text")) {
      if (!e.target.attributes.unselect) {
        selectedElement = e.target;
        optionsDiv.style.top = `${e.clientY + window.scrollY}px`;
        optionsDiv.style.left = `${e.clientX + window.scrollX}px`;
        optionsDiv.style.display = "inline-flex";
        
      }
    }
    // else {
    //   if (!e.target.attributes.unselect && !e.target.getAttribute("data-options")) {
    //     optionsDiv.style.display = "none";
    //   }
    // }
    else if (!e.target.getAttribute("data-options")) {
      optionsDiv.style.display = "none";
    }
  });

  const optionsDiv = document.querySelector(".stylo-options");

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

  optionsDiv.children[2].addEventListener("blur", (e) => {
    selectedElement.style.fontSize = `${e.target.value}px`;
  });

  optionsDiv.children[3].addEventListener("input", (e) => {
    selectedElement.style.color = e.target.value;
  });

  document.querySelector(".style-close-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    optionsDiv.style.display = "none";
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
    element.style.fontFamily = fontName;
  }

  getGoogleFonts().then(async (fonts) => {
    allFonts = fonts;
    setFontOptions(fonts);
  });

  async function setFont(fontName) {
    const selectedFont = allFonts.filter(
      (font) => font?.family === fontName
    )[0];

    if (selectedFont && selectedFont.files && selectedFont.files.regular) {
      const fontContent = await fetch(selectedFont?.files.regular).then((r) =>
        r.arrayBuffer()
      );

      const font = new FontFace(selectedFont.family, fontContent);
      await font.load();
      document.fonts.add(font);
    }
  }

  const selectEl = document.querySelector(".stylo-select");

  function setFontOptions(fonts) {
    fonts.forEach(async (font, index) => {
      if (index > 200) {
        return;
      }

      if (font.family && font.files && font.files.regular) {
        const optionEl = document.createElement("option");
        optionEl.setAttribute("value", font.family);
        optionEl.textContent = font.family;
        optionEl.style.fontFamily = font.family;
        optionEl.style.color = "white"
        optionEl.setAttribute("data-options", true);
        selectEl.append(optionEl);
      }
    });
  }

  selectEl.addEventListener("change", (e) => {
    setFont(e.target.value);
    applyFont(e.target.value, selectedElement);
  });
};

function generateOptionsContainer() {
  const optionsDiv = document.createElement("div");
  optionsDiv.classList.add("stylo-options");
  setOptionsStyle(optionsDiv);
  optionsDiv.setAttribute("data-options", true);

  const boldBtn = document.createElement("button");
  boldBtn.setAttribute("unselect", true);
  boldBtn.textContent = "B";
  setOptionButtonStyle(boldBtn);
  boldBtn.setAttribute("data-options", true);

  const italicBtn = document.createElement("button");
  italicBtn.setAttribute("unselect", true);
  italicBtn.textContent = "I";
  italicBtn.style.fontStyle = "italic";
  setOptionButtonStyle(italicBtn);
  italicBtn.setAttribute("data-options", true);

  const fontSizeInput = document.createElement("input");
  fontSizeInput.setAttribute("unselect", true);
  fontSizeInput.setAttribute("placeholder", 16);
  fontSizeInput.setAttribute("type", "number");
  fontSizeInput.defaultValue = "16";
  setOptionsFontSizeStyle(fontSizeInput);
  fontSizeInput.setAttribute("data-options", true);

  const colorInput = document.createElement("input");
  colorInput.setAttribute("unselect", true);
  colorInput.setAttribute("type", "color");
  setOptionColorInptStyle(colorInput);
  colorInput.setAttribute("data-options", true);

  const select = document.createElement("select");
  select.setAttribute("data-options", true);
  select.classList.add("stylo-select");
  select.style.backgroundColor = "#111827";
  select.style.color = "white";
  select.setAttribute("data-options", true);

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "x";
  closeBtn.classList.add("style-close-btn");
  setOptionButtonStyle(closeBtn);
  closeBtn.style.color = "red";
  closeBtn.setAttribute("unselect", true);
  closeBtn.setAttribute("data-options", true);

  optionsDiv.appendChild(boldBtn);
  optionsDiv.appendChild(italicBtn);
  optionsDiv.appendChild(fontSizeInput);
  optionsDiv.appendChild(colorInput);
  optionsDiv.appendChild(select);
  optionsDiv.appendChild(closeBtn);
  document.querySelector("body").append(optionsDiv);
}

function setOptionsStyle(optionsDiv) {
  optionsDiv.style.display = "none";
  optionsDiv.style.position = "absolute";
  optionsDiv.style.top = 0;
  optionsDiv.style.left = 0;
  optionsDiv.style.padding = "0.5rem";
  optionsDiv.style.alignItems = "stretch";
  optionsDiv.style.background =
    "url('https://res.cloudinary.com/dqkl3iifo/image/upload/v1677994377/logos/spacebg_fgoghi.jpg')";
  optionsDiv.style.color = "white";
  optionsDiv.style.overflow = "hidden";
  optionsDiv.style.lineHeight = "1.2";
  optionsDiv.style.borderRadius = "5px";
  optionsDiv.style.boxShadow =
    "rgb(15 15 15 / 5%) 0px 0px 0px 1px,rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px";
}

function setOptionButtonStyle(buttonEl) {
  buttonEl.style.fontSize = "1.1rem";
  buttonEl.style.padding = "0.5rem";
  buttonEl.style.minWidth = "30px";
  buttonEl.style.border = "none";
  buttonEl.style.background = "white";
  buttonEl.style.marginRight = "0.5rem";
  buttonEl.style.cursor = "pointer";
  buttonEl.style.background = "none";
  buttonEl.style.color = "white";
}

function setOptionsFontSizeStyle(inputEl) {
  inputEl.style.marginRight = "0.5rem";
  inputEl.style.fontSize = "1.1rem";
  inputEl.style.width = "50px";
  inputEl.style.border = "none";
  inputEl.style.paddingLeft = "0.5rem";
  inputEl.style.borderLeft = "2px solid rgba(0,0,0,0.1)";
  inputEl.style.background = "none";
  inputEl.style.color = "white";
}

function setOptionColorInptStyle(inputEl) {
  inputEl.style.padding = "0";
  inputEl.style.border = "none";
  inputEl.style.width = "30px";
  inputEl.style.height = "30px";
  inputEl.style.marginTop = "0.25rem";
  inputEl.style.borderRadius = "50%";
  inputEl.style.cursor = "pointer";
  inputEl.style.background = "none";
  inputEl.style.color = "white";
}

editTypography();

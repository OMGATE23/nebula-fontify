editTypography = () => {
  const elements = document.body.querySelectorAll("*");
  let selectedEl;

  elements.forEach((el) => {
    if (
      el.textContent &&
      el.childNodes[0].nodeValue &&
      el.childNodes[0].nodeValue.trim() !== "" &&
      !el.attributes.unselect
    ) {
      el.style.outline = "2px solid green";
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
    // if(!e.target.getAttribute("data-options") && !e.target.getAttribute("data-is-text")) {
    //   optionsDiv.style.display = "none";
    // }
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
  
  
};

function generateOptionsContainer() {
  const optionsDiv = document.createElement("div");
  optionsDiv.classList.add("stylo-options");
  setOptionsStyle(optionsDiv);

  const boldBtn = document.createElement("button");
  boldBtn.setAttribute("unselect", true);
  boldBtn.textContent = "B";
  setOptionButtonStyle(boldBtn);

  const italicBtn = document.createElement("button");
  italicBtn.setAttribute("unselect", true);
  italicBtn.textContent = "I";
  italicBtn.style.fontStyle = "italic";
  setOptionButtonStyle(italicBtn);

  const fontSizeInput = document.createElement("input");
  fontSizeInput.setAttribute("unselect", true);
  fontSizeInput.setAttribute("placeholder", 16);
  fontSizeInput.setAttribute("type", "number");
  setOptionsFontSizeStyle(fontSizeInput);
  
  const colorInput = document.createElement("input");
  colorInput.setAttribute("unselect", true);
  colorInput.setAttribute("type", "color");
  setOptionColorInptStyle(colorInput);
  
  const select = document.createElement("select");
  select.setAttribute("data-options", true);

  const style = document.createElement("style");

  optionsDiv.appendChild(boldBtn);
  optionsDiv.appendChild(italicBtn);
  optionsDiv.appendChild(fontSizeInput);
  optionsDiv.appendChild(colorInput);
  optionsDiv.appendChild(select);
  document.querySelector("body").append(optionsDiv);
}

function setOptionsStyle(optionsDiv) {
  optionsDiv.style.display = "none";
  optionsDiv.style.position = "absolute";
  optionsDiv.style.top = 0;
  optionsDiv.style.left = 0;
  optionsDiv.style.padding = "0.5rem";
  optionsDiv.style.alignItems = "stretch";
  optionsDiv.style.background = "white";
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
}

function setOptionsFontSizeStyle(inputEl) {
  inputEl.style.marginRight = "0.5rem";
  inputEl.style.fontSize = "1.1rem";
  inputEl.style.width = "50px";
  inputEl.style.border = "none";
  inputEl.style.paddingLeft = "0.5rem";
  inputEl.style.borderLeft = "2px solid rgba(0,0,0,0.1)";
}

function setOptionColorInptStyle(inputEl) {
  inputEl.style.padding = "0";
  inputEl.style.border = "none";
  inputEl.style.width = "30px";
  inputEl.style.height = "30px";
  inputEl.style.marginTop = "0.25rem";
  inputEl.style.borderRadius = "50%";
  inputEl.style.cursor = "pointer";
}

editTypography();

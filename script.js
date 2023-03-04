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
      optionsDiv.style.display = "block";
    }
  } else {
    if(!e.target.attributes.unselect){
        optionsDiv.style.display = 'none'
    }
    
  }
});

optionsDiv.children[0].addEventListener("click", () => {
  if (
    selectedElement.style.fontWeight > 400 ||
    selectedElement.style.fontWeight === "bold"
  ) {
    selectedElement.style.fontWeight = 400;
    optionsDiv.children[0].style.fontWeight = 700;
  } else {
    selectedElement.style.fontWeight = 700;
    optionsDiv.children[0].style.fontWeight = 400;
  }
});

optionsDiv.children[1].addEventListener("click", () => {
  if (selectedElement.style.fontStyle === "italic") {
    selectedElement.style.fontStyle = "normal";
    optionsDiv.children[1].style.fontStyle = "italic";
  } else {
    selectedElement.style.fontStyle = "italic";
    optionsDiv.children[1].style.fontStyle = "normal";
  }
});

optionsDiv.children[2].addEventListener('blur' , () => {
    console.log(optionsDiv.children[2].value)
    selectedElement.style.fontSize = `${(optionsDiv.children[2].value)}px`
})

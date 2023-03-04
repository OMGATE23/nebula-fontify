const body = document.body;
const elements = document.body.querySelectorAll("*");
const optionsDiv = document.querySelector(".options");

let selectedElement;

// checks if the element has text, highlight and set attribute data-is-text
elements.forEach((el) => {
  if (
    el.textContent &&
    el.childNodes[0].nodeValue &&
    el.childNodes[0].nodeValue.trim() !== ""
  ) {
    el.style.outline = "2px solid black";
    el.setAttribute("data-is-text", "true");
  }
});

// set the clicked element to selectedElement and display options to change text style to bold and italic
body.addEventListener("click", (e) => {
  //check if the element has data-is-text as well as it does not have the unselect attribute given to option buttons
  if (e.target.getAttribute("data-is-text") && !e.target.attributes.unselect) {
    selectedElement = e.target;

    e.target.style.color = "red";
    optionsDiv.style.top = `${e.clientY}px`;
    optionsDiv.style.left = `${e.clientX}px`;
    optionsDiv.style.display = "block";
  }
});

optionsDiv.children[0].addEventListener("click", () => {
  if (selectedElement.style.fontWeight > 400) {
    selectedElement.style.fontWeight = 400;
  } else {
    selectedElement.style.fontWeight = 700;
  }
});

optionsDiv.children[1].addEventListener("click", () => {
  if (selectedElement.style.fontStyle === "normal") {
    selectedElement.style.fontStyle = "italic";
  } else {
    selectedElement.style.fontStyle = "normal";
  }
});

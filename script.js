const searchButton = document.querySelector('button[type="submit"]');
const searchInput = document.getElementById('query');

const image = document.getElementById('exa-icon');
let clickCount = 0; 


var isInitialLoad = true; 
window.onload = function() {
  adjustComboBoxSize();
  isInitialLoad = false;
};

function adjustComboBoxSize() {
  var select = document.getElementById("search-select");
  var selectedOption = select.options[select.selectedIndex];

  var textWidth = getTextWidth(selectedOption.text, window.getComputedStyle(select).font) + 35;

  if (!isInitialLoad) {
    select.style.transition = "width 0.3s";
  } else {
    select.style.transition = "none";
  }

  select.style.width = textWidth + "px";
}


function getTextWidth(text, font) {
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  context.font = font;
  var metrics = context.measureText(text);
  return metrics.width;
}
  

image.addEventListener('click', () => {
    clickCount++; 
    
    if (clickCount >= 10) {
        image.style.opacity = 0; 
        image.style.pointerEvents = 'none'; 
        setTimeout(() => {
            image.style.display = 'none';
        }, 2000);
    }
});

const performSearch = async () => {
    const selectedOption = document.getElementById('search-select').value;
    const searchTerm = searchInput.value;

    switch (selectedOption) {
        case 'option-all':
            break;
        default:
            console.log(`error.`);
    }
};

searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keyup', event => {
    if (event.key === 'Enter') performSearch();
});



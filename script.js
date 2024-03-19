const searchButton = document.querySelector('button[type="submit"]');
const searchInput = document.getElementById('query');
const select = document.getElementById("search-select");
const image = document.getElementById('exa-icon');
let clickCount = 0; 
var isInitialLoad = true; 

document.addEventListener('DOMContentLoaded', function() {
  adjustComboBoxSize();
  isInitialLoad = false;
  initializeModal();
});

function adjustComboBoxSize() {
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
        image.style.transition = 'opacity 0.3s, visibility 0.3s';
        image.addEventListener('transitionend', () => {
            image.style.display = 'none';
            image.removeEventListener('click', () => {}); 
        }, { once: true });
    }
});

const performSearch = async () => {
  const searchTerm = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const title = card.querySelector('.title').textContent.toLowerCase();
    const dataLabel = card.getAttribute('data-label').textContent.toLowerCase();
    const titleMatch = title.includes(searchTerm);
    const dataLabelMatch = dataLabel.includes(searchTerm);

    if (titleMatch || dataLabelMatch) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
};

searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('input', performSearch);
searchInput.addEventListener('keyup', event => {
    if (event.key === 'Enter') performSearch();
});

function initializeModal(modalId) {
  var modal = document.getElementById('modal-' + modalId); 

  if (modal) {
    modal.style.display = "block"; 
    document.body.style.overflow = "hidden";

    modal.addEventListener("click", function(e) {
      if (e.target.classList.contains("modal-area")) {
        modal.style.display = "none"; 
        document.body.style.overflow = "auto"; 
      }
    });

    var closeButtons = modal.querySelectorAll(".bt-close-modal, .close-modal");
    closeButtons.forEach(function(button) {
      button.addEventListener("click", function() {
        modal.style.display = 'none';
        document.body.style.overflow = "auto"; 
      });
    });
  }
}


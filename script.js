const searchButton = document.querySelector('button[type="submit"]');
const searchInput = document.getElementById('query');
const searchSelect = document.getElementById('search-select');
const image = document.getElementById('exa-icon');
let clickCount = 0; 

const cards = document.querySelectorAll('.card');

document.addEventListener('DOMContentLoaded', function() {
  document.body.classList.add('loaded');
  initPortfolio();
});

function initPortfolio() {
  adjustComboBoxSize();
    setTimeout(() => {
    animateCards();
  }, 300);
  
  setupListeners();
  createNeonParticles();
}

function createNeonParticles() {
  const content = document.querySelector('.content');
  const particleCount = 15;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'neon-particle';
    const size = Math.random() * 4 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * 10 + 10;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    
    if (Math.random() > 0.5) {
      particle.classList.add('primary');
    } else {
      particle.classList.add('secondary');
    }
    
    content.appendChild(particle);
  }
}

function animateCards() {
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100 * index);
  });
}

function adjustComboBoxSize() {
  var select = document.getElementById("search-select");
  var selectedOption = select.options[select.selectedIndex];

  var textWidth = getTextWidth(selectedOption.text, window.getComputedStyle(select).font) + 35;
  select.style.transition = "width 0.3s";
  select.style.width = textWidth + "px";
}

function getTextWidth(text, font) {
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  context.font = font;
  var metrics = context.measureText(text);
  return metrics.width;
}

function setupListeners() {
  searchButton.addEventListener('click', performSearch);
  searchInput.addEventListener('input', performSearch);
  searchInput.addEventListener('keyup', event => {
    if (event.key === 'Enter') performSearch();
  });
  
  searchInput.addEventListener('focus', () => {
    document.querySelector('.search-section').classList.add('focused');
  });
  
  searchInput.addEventListener('blur', () => {
    if (searchInput.value === '') {
      document.querySelector('.search-section').classList.remove('focused');
    }
  });
  
  searchSelect.addEventListener('change', () => {
    adjustComboBoxSize();
    performSearch();
  });
  
  setupImageEasterEgg();
}

function setupImageEasterEgg() {
  image.addEventListener('click', () => {
    clickCount++; 
    
    if (clickCount >= 10) {
      image.classList.add('rotating');
      setTimeout(() => {
        image.style.boxShadow = '0 0 30px var(--accent-secondary), 0 0 60px var(--accent-primary)';
        image.style.transform = 'scale(1.2)';
        
        setTimeout(() => {
          image.style.opacity = 0; 
          image.style.pointerEvents = 'none'; 
          
          setTimeout(() => {
            image.style.display = 'none';
          }, 1000);
        }, 800);
      }, 500);
    } else if (clickCount >= 5) {
      image.classList.add('wiggle');
      
      setTimeout(() => {
        image.classList.remove('wiggle');
      }, 500);
    } else {
      image.style.boxShadow = '0 0 20px var(--accent-primary)';
      
      setTimeout(() => {
        image.style.boxShadow = '';
      }, 300);
    }
  });
}

const performSearch = () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedCategory = searchSelect.value;
  
  cards.forEach(card => {
    const title = card.querySelector('.title')?.innerText.toLowerCase() || '';
    const dataLabel = card.getAttribute('data-label')?.toLowerCase() || '';
    const modalId = card.getAttribute('onclick')?.match(/initializeModal\('(.+?)'\)/)?.[1] || '';
    
    let shouldShow = true;
    
    if (searchTerm && !title.includes(searchTerm) && !dataLabel.includes(searchTerm)) {
      shouldShow = false;
    }
    
    if (selectedCategory !== 'option-all') {
      const categoryMap = {
        'option-presentation': ['presentation'],
        'option-school': ['formation'],
        'option-internship': ['experience'],
        'option-skills': ['skills', 'language'],
        'option-projects': ['projects'],
        'option-contact': ['contacts']
      };
      
      const allowedCategories = categoryMap[selectedCategory] || [];
      if (!allowedCategories.includes(modalId)) {
        shouldShow = false;
      }
    }
    
    if (shouldShow) {
      card.style.display = 'block';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 50);
    } else {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.display = 'none';
      }, 300);
    }
  });
};
function initializeModal(modalId) {
  var modal = document.getElementById('modal-' + modalId); 

  if (modal) {
    modal.style.display = "block"; 
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      modal.classList.add('modal-visible');
      
      if (modalId === 'skills') {
        animateSkills();
      }
    }, 50);

    modal.addEventListener("click", function(e) {
      if (e.target === this) {
        closeModal(modal);
      }
    });

    var modalSandboxes = modal.querySelectorAll(".modal-area");
    modalSandboxes.forEach(function(sandbox) {
      sandbox.addEventListener("click", function(e) {
        if (e.target === this) {
          closeModal(modal);
        }
      });
    });

    var closeButtons = modal.querySelectorAll(".bt-close-modal, .close-modal");
    closeButtons.forEach(function(button) {
      button.addEventListener("click", function() {
        closeModal(modal);
      });
    });
  }
}

function closeModal(modal) {
  modal.classList.remove('modal-visible');
  setTimeout(() => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }, 300);
}

function animateSkills() {
  const skillItems = document.querySelectorAll('.skill');
  
  if (skillItems.length > 0) {
    skillItems.forEach((skill, index) => {
      setTimeout(() => {
        skill.style.opacity = '1';
        skill.style.transform = 'translateX(0)';
      }, 150 * index);
    });
  }
}


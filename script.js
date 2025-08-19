document.addEventListener('DOMContentLoaded', () => {
  const noobsContainer = document.getElementById('noobs-container');
  const searchInput = document.getElementById('search');

  // --- Modale Noob ---
  const modalOverlay = document.getElementById('modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalName = document.getElementById('modal-name');
  const modalImage = document.getElementById('modal-image');
  const modalRarity = document.getElementById('modal-rarity');
  const modalPrice = document.getElementById('modal-price');
  const modalPps = document.getElementById('modal-pps'); // <--- ajouté
  const modalDescription = document.getElementById('modal-description');

  // --- Pop-up (message d’info global) ---
  const popupOverlay = document.getElementById('popup-overlay');
  const popupClose = document.getElementById('popup-close');

  let noobs = [];

  // Ouvrir la modale avec les infos d’un noob
function openModal(noob) {
  if (!modalOverlay) return;

  if (modalName) modalName.textContent = noob.name ?? '';
  if (modalImage) {
    modalImage.src = noob.image ?? '';
    modalImage.alt = noob.name ?? '';
  }
  if (modalDescription) {
    modalDescription.textContent = noob.description ?? 'Pas de description disponible.';
  }

  if (modalRarity) {
    modalRarity.className = '';
    if (noob.rarity) modalRarity.classList.add('rarete-' + noob.rarity);
    modalRarity.textContent = noob.rarity ?? '';
  }

  // Prix avec couleur
  if (modalPrice) {
    modalPrice.querySelector("span").innerHTML = noob.price
      ? `<span style="color:limegreen; font-weight:bold;">${noob.price}$</span>`
      : `<span style="color:gray;">Non disponible</span>`;
  }

  // Prix par seconde en dessous avec couleur
  const modalPps = document.getElementById("modal-pps");
  if (modalPps) {
    modalPps.querySelector("span").innerHTML = noob.perSecond
      ? `<span style="color:gold; font-weight:bold;">+${noob.perSecond}$/s</span>`
      : `<span style="color:gray;">0$/s</span>`;
  }

  modalOverlay.classList.remove('hidden');
}

  function closeModal() {
    if (modalOverlay) modalOverlay.classList.add('hidden');
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', e => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Affiche la liste des noobs filtrée
  function displayNoobs(filter = '') {
    if (!noobsContainer) return;

    noobsContainer.innerHTML = '';
    const filteredNoobs = noobs.filter(noob =>
      (noob.name || '').toLowerCase().includes(filter.toLowerCase())
    );

    if (filteredNoobs.length === 0) {
      noobsContainer.innerHTML = `<p style="color:#aaa; font-size:1.1rem; text-align:center; width:100%;">Aucun noob trouvé 😢</p>`;
      return;
    }

    filteredNoobs.forEach(noob => {
      const card = document.createElement('div');
      card.className = 'noob-card';
      card.innerHTML = `
        <img src="${noob.image}" alt="${noob.name}" />
        <div class="noob-name">${noob.name}</div>
        <div><strong>Rareté :</strong> <span class="rarete-${noob.rarity}">${noob.rarity}</span></div>
        <div><strong>Prix :</strong> <span class="price">${noob.price}</span></div>
      `;
      card.addEventListener('click', () => openModal(noob));
      noobsContainer.appendChild(card);
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', e => {
      displayNoobs(e.target.value);
    });
  }

  if (popupClose && popupOverlay) {
    popupClose.addEventListener('click', () => {
      popupOverlay.classList.add('hidden');
    });
  }

  // Charger le JSON des noobs
  fetch('noobs.json')
    .then(response => response.json())
    .then(data => {
      noobs = data || [];
      // Montre le popup d’info au chargement si présent
      if (popupOverlay) popupOverlay.classList.remove('hidden');
      displayNoobs();
    })
    .catch(err => {
      if (noobsContainer) {
        noobsContainer.innerHTML = `<p style="color:red; text-align:center; width:100%;">Erreur lors du chargement des données.</p>`;
      }
      console.error('Erreur chargement noobs.json:', err);
    });
});

// --- Modal "Info" (bouton du header) ---
const infoBtn = document.getElementById("info-btn");
const infoModal = document.getElementById("infoModalWindow");
const infoClose = document.querySelector(".info-close");

if (infoBtn && infoModal && infoClose) {
  infoBtn.addEventListener("click", () => {
    infoModal.style.display = "block";
  });

  infoClose.addEventListener("click", () => {
    infoModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === infoModal) {
      infoModal.style.display = "none";
    }
  });
}

// --- Canvas background ---
const canvas = document.getElementById('animated-bg');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 100;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.5 + 0.3
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > width) p.dx *= -1;
      if (p.y < 0 || p.y > height) p.dy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(66,165,245,${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

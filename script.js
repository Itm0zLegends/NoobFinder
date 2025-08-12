document.addEventListener('DOMContentLoaded', () => {
  const noobsContainer = document.getElementById('noobs-container');
  const searchInput = document.getElementById('search');

  // Modale éléments
  const modalOverlay = document.getElementById('modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalName = document.getElementById('modal-name');
  const modalImage = document.getElementById('modal-image');
  const modalDescription = document.getElementById('modal-description');
  const modalRarity = document.getElementById('modal-rarity');
  const modalPrice = document.getElementById('modal-price');

  // Pop-up éléments
  const popupOverlay = document.getElementById('popup-overlay');
  const popupClose = document.getElementById('popup-close');

  let noobs = [];

  // Ouvrir la modale avec les infos d’un noob
function openModal(noob) {
  modalName.textContent = noob.name;
  modalImage.src = noob.image;
  modalImage.alt = noob.name;
  modalDescription.textContent = noob.description;

  // Nettoyer d'abord toutes les classes de rareté pour éviter les conflits
  modalRarity.className = '';
  // Ajouter la classe de base + la classe de rareté dynamique
  modalRarity.classList.add('rarete-' + noob.rarity);

  modalRarity.textContent = noob.rarity;
  modalPrice.innerHTML = `Prix : <span class="price">${noob.price ?? "Non disponible"}</span>`;
  modalOverlay.classList.remove('hidden');
}


  function closeModal() {
    modalOverlay.classList.add('hidden');
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) closeModal();
  });

  // Affiche la liste des noobs filtrée
  function displayNoobs(filter = '') {
    noobsContainer.innerHTML = '';
    const filteredNoobs = noobs.filter(noob =>
      noob.name.toLowerCase().includes(filter.toLowerCase())
    );
    if (filteredNoobs.length === 0) {
      noobsContainer.innerHTML = `<p style="color:#aaa; font-size:1.1rem; text-align:center; width:100%;">Aucun noob trouvé 😢</p>`;
      return;
    }

    filteredNoobs.forEach(noob => {
      const card = document.createElement('div');
      card.className = 'noob-card'; // PLUS de coloration globale ici

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

  searchInput.addEventListener('input', e => {
    displayNoobs(e.target.value);
  });

  popupClose.addEventListener('click', () => {
    popupOverlay.classList.add('hidden');
  });

  // Charger le JSON des noobs
  fetch('noobs.json')
    .then(response => response.json())
    .then(data => {
      noobs = data;
      popupOverlay.classList.remove('hidden');
      displayNoobs();
    })
    .catch(err => {
      noobsContainer.innerHTML = `<p style="color:red; text-align:center; width:100%;">Erreur lors du chargement des données.</p>`;
      console.error('Erreur chargement noobs.json:', err);
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".status-card");
  const modal = document.getElementById("status-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalStatus = document.getElementById("modal-status");
  const modalDesc = document.getElementById("modal-desc");
  const modalIssues = document.getElementById("modal-issues");
  const modalClose = document.querySelector(".modal-close");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      modalTitle.textContent = card.dataset.name;

      // Gestion du statut + couleur
      modalStatus.textContent = card.dataset.status;
      modalStatus.className = "modal-status";
      if (card.dataset.status.toLowerCase().includes("en ligne")) {
        modalStatus.classList.add("status-online");
      } else if (card.dataset.status.toLowerCase().includes("maintenance")) {
        modalStatus.classList.add("status-maintenance");
      } else {
        modalStatus.classList.add("status-offline");
      }

      modalDesc.textContent = card.dataset.desc;
      modalIssues.textContent = card.dataset.issues;
      modal.classList.remove("hidden");
    });
  });

  modalClose.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".status-card");
  const banner = document.getElementById("status-banner");

  let onlineCount = 0;
  let maintenanceCount = 0;
  let offlineCount = 0;

  // Comptage des statuts
  cards.forEach(card => {
    const status = card.dataset.status.toLowerCase();
    if (status.includes("en ligne")) onlineCount++;
    else if (status.includes("maintenance")) maintenanceCount++;
    else offlineCount++;
  });

  // Mise à jour du message global
  if (maintenanceCount === 0 && offlineCount === 0) {
    banner.textContent = "✅ Tous les services sont opérationnels";
    banner.className = "status-banner status-online";
  } 
  else if (maintenanceCount > 0 && offlineCount === 0) {
    banner.textContent = `⚠️ ${maintenanceCount} service(s) en maintenance`;
    banner.className = "status-banner status-maintenance";
  } 
  else if (offlineCount > 0 && maintenanceCount === 0) {
    banner.textContent = `❌ ${offlineCount} service(s) hors ligne`;
    banner.className = "status-banner status-offline";
  } 
  else {
    banner.textContent = "⚠️ Certains services rencontrent des problèmes";
    banner.className = "status-banner status-maintenance";
  }
});

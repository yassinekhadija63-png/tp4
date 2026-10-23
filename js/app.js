// app.js
// Rôle : initialiser et orchestrer l'application.

import { state } from "./state.js";
import { loadAllData } from "./dataService.js";
import {
  getFilteredOrders,
  getIndicators,
  getCategories,
  getSelectedOrder
} from "./selectors.js";
import {
  renderIndicators,
  renderOrders,
  renderCategoryOptions,
  renderOrderDetail,
  showError
} from "./view.js";

// Fonction de rendu : redessine l'interface à partir du state
function render() {
  renderIndicators(getIndicators());
  renderOrders(getFilteredOrders());
}

// Événements : action utilisateur -> modification du state -> render()
function setupEvents() {
  // Recherche par nom de client
  document.getElementById("search-input").addEventListener("input", event => {
    state.searchText = event.target.value;
    render();
  });

  // Filtre par statut
  document.getElementById("status-filter").addEventListener("change", event => {
    state.statusFilter = event.target.value;
    render();
  });

  // Filtre par catégorie de produit
  document.getElementById("category-filter").addEventListener("change", event => {
    state.categoryFilter = event.target.value;
    render();
  });

  // Clic sur un bouton "Détail" du tableau
  document.getElementById("orders-body").addEventListener("click", event => {
    const button = event.target.closest("button[data-order-id]");
    if (!button) {
      return;
    }
    state.selectedOrderId = Number(button.dataset.orderId);
    renderOrderDetail(getSelectedOrder());
  });
}

// Fonction d'initialisation : charge les données, remplit le state, fait le premier rendu
async function init() {
  try {
    const data = await loadAllData();

    state.customers = data.customers;
    state.products = data.products;
    state.orders = data.orders;

    renderCategoryOptions(getCategories());
    setupEvents();
    render();
  } catch (error) {
    console.error("Échec de l'initialisation :", error);
    showError("Erreur : " + error.message + ". Vérifiez les fichiers JSON du dossier data.");
  }
}

init();
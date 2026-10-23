// app.js
// Rôle : initialiser et orchestrer l'application.

import { state } from "./state.js";
import { loadAllData } from "./dataService.js";
import { getFilteredOrders, getIndicators, getCategories } from "./selectors.js";
import { renderIndicators, renderOrders, renderCategoryOptions, showError } from "./view.js";

// Fonction de rendu : redessine l'interface à partir du state
function render() {
  renderIndicators(getIndicators());
  renderOrders(getFilteredOrders());
}

// Fonction d'initialisation : charge les données, remplit le state, fait le premier rendu
async function init() {
  try {
    const data = await loadAllData();

    state.customers = data.customers;
    state.products = data.products;
    state.orders = data.orders;

    renderCategoryOptions(getCategories());
    render();
  } catch (error) {
    console.error("Échec de l'initialisation :", error);
    showError("Erreur : " + error.message + ". Vérifiez les fichiers JSON du dossier data.");
  }
}

init();
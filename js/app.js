// app.js
// Rôle : initialiser et orchestrer l'application.

import { state } from "./state.js";
import { loadAllData } from "./dataService.js";
import { getOrderDetails, getIndicators } from "./selectors.js";

// Fonction d'initialisation : charge les données puis les range dans le state
async function init() {
  try {
    const data = await loadAllData();

    state.customers = data.customers;
    state.products = data.products;
    state.orders = data.orders;

    // TEST TEMPORAIRE (sera supprimé à la phase 5)
    console.log("Commande 101 complète :", getOrderDetails(state.orders[0]));
    console.log("Indicateurs :", getIndicators());
  } catch (error) {
    console.error("Échec de l'initialisation :", error.message);
  }
}

init();
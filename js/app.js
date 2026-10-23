// app.js
// Rôle : initialiser et orchestrer l'application.

import { state } from "./state.js";
import { loadAllData } from "./dataService.js";

// Fonction d'initialisation : charge les données puis les range dans le state
async function init() {
  try {
    const data = await loadAllData();

    state.customers = data.customers;
    state.products = data.products;
    state.orders = data.orders;

    console.log("State après chargement :", state);
  } catch (error) {
    console.error("Échec de l'initialisation :", error.message);
  }
}

init();
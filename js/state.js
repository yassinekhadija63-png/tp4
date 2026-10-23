// state.js
// Rôle : conserver l'état actuel de l'application.
// Au démarrage, les 3 tableaux de données sont vides.

export const state = {
  // Les 3 sources de données (remplies après le chargement des JSON)
  customers: [],
  products: [],
  orders: [],

  // Les choix de l'utilisateur
  searchText: "",
  statusFilter: "all",
  categoryFilter: "all",
  selectedOrderId: null
};
// selectors.js
// Rôle : rechercher, relier, filtrer et calculer les données.

import { state } from "./state.js";

// find() : retrouver UN client à partir de son identifiant
export function getCustomerById(customerId) {
  return state.customers.find(customer => customer.id === customerId);
}

// find() : retrouver UN produit à partir de son identifiant
export function getProductById(productId) {
  return state.products.find(product => product.id === productId);
}

// Montant d'une ligne = prix du produit x quantité
export function getLineAmount(item) {
  const product = getProductById(item.productId);
  if (!product) {
    return 0;
  }
  return product.price * item.quantity;
}

// forEach() : montant total d'une commande = somme de toutes ses lignes
export function getOrderTotal(order) {
  let total = 0;
  order.items.forEach(item => {
    total += getLineAmount(item);
  });
  return total;
}

// map() : transformer une commande en version complète,
// en reliant les trois sources de données
export function getOrderDetails(order) {
  const customer = getCustomerById(order.customerId);

  const lines = order.items.map(item => {
    const product = getProductById(item.productId);
    return {
      productName: product ? product.name : "Produit inconnu",
      price: product ? product.price : 0,
      quantity: item.quantity,
      amount: getLineAmount(item)
    };
  });

  return {
    id: order.id,
    date: order.date,
    status: order.status,
    customerName: customer ? customer.name : "Client inconnu",
    city: customer ? customer.city : "-",
    lines: lines,
    total: getOrderTotal(order)
  };
}

// Liste des catégories sans doublons (pour le menu déroulant)
export function getCategories() {
  const categories = state.products.map(product => product.category);
  return categories.filter((category, index) => categories.indexOf(category) === index);
}

// filter() : garder les commandes qui respectent la recherche et les deux filtres
export function getFilteredOrders() {
  const search = state.searchText.trim().toLowerCase();

  return state.orders
    .filter(order => {
      const customer = getCustomerById(order.customerId);
      const customerName = customer ? customer.name.toLowerCase() : "";

      const matchSearch = customerName.includes(search);
      const matchStatus =
        state.statusFilter === "all" || order.status === state.statusFilter;
      const matchCategory =
        state.categoryFilter === "all" ||
        order.items.some(item => {
          const product = getProductById(item.productId);
          return product && product.category === state.categoryFilter;
        });

      return matchSearch && matchStatus && matchCategory;
    })
    .map(order => getOrderDetails(order));
}

// find() : la commande dont l'utilisateur veut voir le détail
export function getSelectedOrder() {
  const order = state.orders.find(order => order.id === state.selectedOrderId);
  if (!order) {
    return null;
  }
  return getOrderDetails(order);
}

// forEach() : les indicateurs affichés en haut de la page
export function getIndicators() {
  let totalAmount = 0;
  let amountWithoutCancelled = 0;

  state.orders.forEach(order => {
    const total = getOrderTotal(order);
    totalAmount += total;
    if (order.status !== "Annulee") {
      amountWithoutCancelled += total;
    }
  });

  return {
    customersCount: state.customers.length,
    productsCount: state.products.length,
    ordersCount: state.orders.length,
    totalAmount: totalAmount,
    amountWithoutCancelled: amountWithoutCancelled
  };
}
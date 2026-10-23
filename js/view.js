// view.js
// Rôle : produire et mettre à jour l'affichage dans le DOM.
// Ce fichier ne charge pas de données et ne fait aucun calcul métier.

// Écrit un montant avec la devise
function formatAmount(amount) {
  return amount + " MAD";
}

// Couleur Bootstrap associée à chaque statut
const STATUS_COLORS = {
  "Livree": "success",
  "En attente": "warning",
  "Annulee": "danger"
};

// Petit badge coloré pour afficher un statut
function getStatusBadge(status) {
  const color = STATUS_COLORS[status] || "secondary";
  return `<span class="badge text-bg-${color}">${status}</span>`;
}

// Affiche un message d'erreur dans la page
export function showError(message) {
  const box = document.getElementById("error-message");
  box.textContent = message;
  box.classList.remove("d-none");
}

// Affiche les indicateurs
export function renderIndicators(indicators) {
  const cards = [
    { label: "Clients", value: indicators.customersCount },
    { label: "Produits", value: indicators.productsCount },
    { label: "Commandes", value: indicators.ordersCount },
    { label: "Montant cumulé", value: formatAmount(indicators.totalAmount) },
    { label: "Montant hors annulées", value: formatAmount(indicators.amountWithoutCancelled) }
  ];

  document.getElementById("indicators").innerHTML = cards
    .map(card => `
      <div class="col-6 col-lg">
        <div class="card text-center h-100">
          <div class="card-body">
            <div class="indicator-value">${card.value}</div>
            <div class="text-muted">${card.label}</div>
          </div>
        </div>
      </div>`)
    .join("");
}

// Remplit le menu déroulant des catégories
export function renderCategoryOptions(categories) {
  const select = document.getElementById("category-filter");

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    select.appendChild(option);
  });
}

// Affiche le tableau des commandes
export function renderOrders(orders) {
  const tbody = document.getElementById("orders-body");
  const noResult = document.getElementById("no-result");

  tbody.innerHTML = orders
    .map(order => `
      <tr>
        <td>${order.id}</td>
        <td>${order.customerName}</td>
        <td>${order.date}</td>
        <td>${getStatusBadge(order.status)}</td>
        <td>${formatAmount(order.total)}</td>
        <td>
          <button class="btn btn-sm btn-primary" data-order-id="${order.id}">Détail</button>
        </td>
      </tr>`)
    .join("");

  // Message affiché si aucune commande ne correspond
  if (orders.length === 0) {
    noResult.classList.remove("d-none");
  } else {
    noResult.classList.add("d-none");
  }
}
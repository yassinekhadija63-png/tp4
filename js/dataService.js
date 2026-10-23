// dataService.js
// Rôle : charger les trois fichiers JSON.
// Ce fichier ne touche jamais au DOM (à la page).

// Charge UN fichier JSON et renvoie son contenu.
async function loadJSON(path) {
  try {
    const response = await fetch(path);

    // Si le serveur répond avec une erreur (404, ...), on lance une erreur
    if (!response.ok) {
      throw new Error("code HTTP " + response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // On garde une trace dans la console...
    console.error("Erreur de chargement de " + path + " :", error);
    // ...et on transmet l'erreur à celui qui a appelé la fonction
    throw new Error("Impossible de charger " + path + " (" + error.message + ")");
  }
}

// Charge les trois fichiers et renvoie les trois tableaux.
export async function loadAllData() {
  const [customers, products, orders] = await Promise.all([
    loadJSON("data/customers.json"),
    loadJSON("data/products.json"),
    loadJSON("data/orders.json")
  ]);

  return { customers, products, orders };
}
// --- Importe les dépendances externes ---
import "jquery";

// --- Importe les dépendances locales ---

//Gère le routing (Fichiers de base)
import Router from "./util/Router";
import common from "./routes/common";
import home from "./routes/home";
import aboutUs from "./routes/about";

//Importe tout les fichiers nécessaire au javascript de l'application

//Gère l'intégration 3D Three.js
require("./components/3DComponent");

// Gère le slider d'image
require("./components/Carousel");

// Gère l'animation page Principale -> page Produit
require("./components/AnimClick");

// Gère l'animation page Produit -> page Principale
require("./components/AnimHomePage");

// Gère l'animation de la page Produit
require("./components/AnimProductPage");

// Gère le menu au scroll
require("./components/Menu");

// Gère l'apparition de la vidéo d'animation au hover
require("./components/VideoPlay");

/** Créé le router avec les pages existantes (fichiers créés automatiquement)  */
const routes = new Router({
  // Toutes les pages de base
  common,
  // Page Principale
  home,
  // Page A propos (car template de page différent).
  aboutUs,
});

// Charge l'application
jQuery(document).ready(() => routes.loadEvents());

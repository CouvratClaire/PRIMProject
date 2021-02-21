/* -------------------------
    COMPOSANT JS POUR LE SLIDER IMAGE
------------------------- */

var Flickity = require("flickity");

$(window).on("load", function () {
  // Créé un Carousel par ".carousel"
  $(".carousel").each(function (i, el) {
    new Carousel(el);
  });
});

function Carousel(el) {
  // Initialise les variables puis initialise
  var self = this;
  self.el = el;
  self.$el = $(el);
  setTimeout(function () {
    self.init();
  }, 400);
}

// --- FONCTION D'INITIALISATION---
Carousel.prototype.init = function () {
  var self = this;

  // Créé un flickity avec les bonne propriétés
  self.flickity = new Flickity(self.el, {
    pageDots: false,
    groupCells: 1,
    cellAlign: "left",
    contain: true,
    wrapAround: true,
    prevNextButtons: false,
    autoPlay: 60000,
    pauseAutoPlayOnHover: false,
    selectedAttraction: 0.015,
  });

  // A chaque changement de slide : Va chercher la couleur du menu liéé et modifie la couleur du header.
  self.$el.on("change.flickity", function () {
    const $selectedCell = $(".is-selected");
    const $color = $selectedCell.data("color");
    $(".header-container").css("color", $color);
  });
};

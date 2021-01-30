var Flickity = require("flickity");

/* -------------------------
    INIT
------------------------- */

$(window).on("load", function () {
  $(".carousel").each(function (i, el) {
    console.log("carousel", el);
    new Carousel(el);
  });
});

function Carousel(el) {
  var self = this;
  self.el = el;
  self.$el = $(el);
  // Moche mais nécessaire après un coup d'ajax
  setTimeout(function () {
    self.init();
  }, 400);
}

Carousel.prototype.getMenuColor = function () {
  var self = this;
  self.$el;
};

Carousel.prototype.init = function () {
  var self = this;
  // var $gallery = $('.gallery')
  console.log("flickity", self.flickity, "el", self.el);
  self.getMenuColor();

  self.flickity = new Flickity(self.el, {
    // imagesLoaded: true,
    pageDots: false,
    groupCells: 1,
    cellAlign: "left",
    contain: true,
    wrapAround: true,
    prevNextButtons: false,
    autoPlay: 60000,
    pauseAutoPlayOnHover: false,
    selectedAttraction: 0.015,
    //   setGallerySize: false,
  });

  self.$el.on("change.flickity", function (event, index) {
    console.log("Slide changed to " + index);
    const $selectedCell = $(".is-selected");
    const $color = $selectedCell.data("color");
    $(".header-container").css("color", $color);

    console.log($color);
  });
};

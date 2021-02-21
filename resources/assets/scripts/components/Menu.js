/* -------------------------
    COMPOSANT JS POUR LE MENU
------------------------- */

$(window).on("load", function () {
  $(".js-menu").each(function (i, el) {
    new Menu(el);
  });
});

function Menu(el) {
  var self = this;
  self.el = el;
  self.$el = $(el);

  // Au scroll
  $(window).on("scroll", function () {
    var scroll = $(window).scrollTop();

    // Si scroll > 40, passe le menu en mode scrolling
    if (scroll > 40 && !self.$el.hasClass("is-scrolling")) {
      self.$el.addClass("is-scrolling");
    }

    // Sinon, mode par défault
    if (scroll < 40 && self.$el.hasClass("is-scrolling")) {
      self.$el.removeClass("is-scrolling");
    }
  });
}

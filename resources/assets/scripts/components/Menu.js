/* -------------------------
    INIT
------------------------- */

$(window).on("load", function () {
  $(".js-menu").each(function (i, el) {
    console.log("menu", el);
    new Menu(el);
  });
});

function Menu(el) {
  var self = this;
  self.el = el;
  self.$el = $(el);
  $(window).on("scroll", function () {
    var scroll = $(window).scrollTop();
    if (scroll > 40 && !self.$el.hasClass("is-scrolling")) {
      self.$el.addClass("is-scrolling");
    }
    if (scroll < 40 && self.$el.hasClass("is-scrolling")) {
      self.$el.removeClass("is-scrolling");
    }
    // Do something
  });
}

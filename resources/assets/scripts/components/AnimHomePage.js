/* -------------------------
    COMPOSANT JS POUR L'ANIMATION PAGE PRODUIT -> PAGE PRINCIPALE
------------------------- */

var url = window.location.href;
//Si on est sur la page principale et que l'ancienne page était une page produit
if (!url.includes("page")) {
  var previousUrl = document.referrer;
  console.log(previousUrl);
  if (previousUrl.length > 0 && $(window).innerWidth() > 780) {
    $("body").css("opacity", 0);
  }

  window.onload = function () {
    // Va chercher l'image correspondante au produit de la page précédente et créé la classe AnimHomePage
    var productId =
      previousUrl.split("/?").length > 1 ? previousUrl.split("/?")[1] : "";
    var image = $("a[href*='" + productId + "']");
    $(image).each(function (i, el) {
      new AnimHomePage(el);
    });
  };
}

function AnimHomePage(el) {
  //Initialise les variables
  var self = this;
  self.el = el;
  self.parent = $(el).parent();
  self.$parent = $(self.parent);
  self.width = self.$parent.outerWidth();
  self.position = self.$parent.position();

  // Seulement si la fenêtre est assez grande -> Déclenche l'overlay et l'animation
  if ($(window).innerWidth() > 780) {
    $(".overlay").addClass("on");
    self.anim();
  }
}

// --- FONCTION D'ANIMATION---
AnimHomePage.prototype.anim = function () {
  //Créé à nouveau le faker et passe l'image en position absolue
  var self = this;
  $("body").animate({ opacity: 1 }, { duration: 300 });
  var className = self.parent.attr("class").split(/\s+/)[0];
  self.parent.before('<div class="faker"></div>');
  self.faker = $(".faker");
  $(".faker").addClass(className);
  $(".faker").width(self.$parent.width()).height(self.$parent.height());
  var newWidth = (($(window).width() - 100) * 60) / 100;

  // Place l'image à la place qu'elle occupait en page produit
  self.$parent.css({
    position: "absolute",
    top: "30px",
    left: 0,
    width: newWidth,
    paddingRight: "10px",
    paddingLeft: "150px",
    zIndex: 2,
  });

  // Timeout nécéssaire pour chercher la position finale
  setTimeout(function () {
    const top = self.faker.position().top;
    var paddingLeft = $(".faker").css("paddingLeft");
    var paddingRight = $(".faker").css("paddingRight");

    // Place l'image dans sa place dans la gallerie
    self.$parent.animate(
      {
        width: self.faker.outerWidth(),
        paddingRight: paddingRight,
        paddingLeft: paddingLeft,
        left: $(".faker").position().left,
        top: top - 101,
      },
      { duration: 1000, queue: false }
    );

    // Retire l'overlay
    $(".overlay").animate(
      {
        opacity: 0,
      },
      { duration: 1000, queue: false }
    );

    // Scroll en même temps que l'image
    $("html, body").animate(
      { scrollTop: top - 200 },
      { duration: 1000, queue: false }
    );

    // Après l'animation, retire le faker, replace l'image dans la gallerie et retire l'overlay
    setTimeout(function () {
      self.$parent.removeAttr("style");
      self.faker.remove();
      $(".overlay").removeClass("on");
    }, 1500);
  }, 500);
};

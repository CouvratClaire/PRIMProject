/* -------------------------
    COMPOSANT JS POUR L'ANIMATION PAGE PRINCIPALE -> PAGE PRODUIT
------------------------- */

$(window).on("load", function () {
  // Créé une classe AnimClick par classe ".anim-on-click" (ie par image avec lien de la gallerie principale)
  $(".anim-on-click").each(function (i, el) {
    new AnimClick(el);
  });
});

function AnimClick(el) {
  // Initialisation des variables
  var self = this;
  self.el = el;
  self.$el = $(el);
  self.link = $(el).find("a");

  self.overlay = $(".overlay")[0];
  self.url = self.link.attr("href");
  self.init();
}

// --- FONCTION DE CRÉATION ---
AnimClick.prototype.init = function () {
  var self = this;

  //Vérifie la présence du lien
  if (self.link.length > 0) {
    var link = self.link[0];
    var $link = $(link);
    self.url = $link.attr("href");

    // Au click sur le lien, si grande fenêtre : Cache la vidéo d'animation et démarre l'animation de changement de page
    $link.on("click", function (e) {
      if ($(window).innerWidth() > 780) {
        e.preventDefault();
        self.hideVideo();
        self.startAnimation($link);
        e.stopPropagation();
      }
    });
  }
};

// --- FONCTION CACHE VIDÉO D'ANIMATION ---
AnimClick.prototype.hideVideo = function () {
  var self = this;

  // Va chercher les variables
  var thevideo = self.$el.find(".thevideo").get(0);
  var theimage = self.$el.find(".image").get(0);

  // Si elles existent : Cache vidéo / Montre image / Pause vidéo
  if (thevideo) {
    $(thevideo).animate(
      {
        opacity: 0,
      },
      { duration: 100, queue: false }
    );
    setTimeout(function () {
      $(theimage).animate(
        {
          opacity: 1,
        },
        { duration: 100, queue: false }
      );
      $(thevideo).css("display", "none");
      $(theimage).css("display", "block");
    }, 100);

    thevideo.pause();
  }
};

// --- FONCTION ANIMATION CHANGEMENT DE PAGE ---
AnimClick.prototype.startAnimation = function () {
  var self = this;

  // Va chercher les variables
  var position = self.$el.position();
  var className = self.$el.attr("class").split(/\s+/)[0];

  // Créé un élement auxilaire de la même taille DOM que l'image
  self.$el.before('<div class="faker"></div>');
  var width = self.$el.width();
  $(".faker").addClass(className);
  $(".faker").width(width).height(self.$el.height());

  // Passe l'image en position absolue pour pouvoir la déplacer
  self.$el.css({ position: "absolute", top: position.top, zIndex: 2 });
  self.$el.width($(".faker").width());
  var newWidth = (($(window).width() - 100) * 60) / 100;

  // Place l'image à la place exacte dans sa Page Produit
  self.$el.animate(
    {
      width: newWidth,
      paddingRight: "10px",
      paddingLeft: "150px",
      left: 0,
      top: "30px",
    },
    { duration: 500, queue: false }
  );

  // Déclence l'overlay pour faire disparaitre les autres éléments de la page
  $(self.overlay).css("z-index", 1);
  $(self.overlay).animate(
    {
      opacity: 1,
    },
    { duration: 500, queue: false }
  );

  // Scroll la fenêtre vers le haut
  $("html, body").animate({ scrollTop: "0" }, { duration: 500, queue: false });

  // Passe le body en opacity 0 (Évite le saut au changement de page)
  setTimeout(function () {
    $("body").animate({ opacity: 0 }, { duration: 300 });
  }, 500);

  // Change de page
  setTimeout(function () {
    window.location = "/?" + self.url.split("/?")[1];
  }, 1000);
};

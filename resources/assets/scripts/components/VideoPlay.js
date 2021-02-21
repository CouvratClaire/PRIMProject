/* -------------------------
    COMPOSANT JS POUR LA VIDÉO D'ANIMATION
------------------------- */

$(window).on("load", function () {
  // Pour chaque item qui possède une vidéo
  $(".video").each(function (i, el) {
    new VideoPlay(el);
  });
});

function VideoPlay(el) {
  // Initialise les variables et déclenche les fonctions nécessaire au hover
  var self = this;
  self.el = el;
  self.$el = $(el);
  self.$el.find(".thevideo").get(0).pause();
  self.$el.hover(self.hoverVideo, self.hideVideo);
}

// Quand la souris passe sur l'image
// --- FONCTION OUVRE LA VIDÉO---
VideoPlay.prototype.hoverVideo = function () {
  var thevideo = $(this).find(".thevideo").get(0);
  var theimage = $(this).find(".image").get(0);

  //Cache l'image
  $(theimage).animate(
    {
      opacity: 0,
    },
    { duration: 100, queue: false }
  );

  //Montre la vidéo
  setTimeout(function () {
    $(theimage).css("display", "none");
    $(thevideo).css("display", "block");
    $(thevideo).animate(
      {
        opacity: 1,
      },
      { duration: 100, queue: false }
    );
  }, 100);

  // Joue la vidéo
  thevideo.play();
};

// Quand la souris sort de l'image
// --- FONCTION FERME LA VIDÉO---
VideoPlay.prototype.hideVideo = function () {
  var thevideo = $(this).find(".thevideo").get(0);
  var theimage = $(this).find(".image").get(0);

  // Cache la vidéo
  $(thevideo).animate(
    {
      opacity: 0,
    },
    { duration: 100, queue: false }
  );

  // Montre l'image
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

  // Stop la vidéo
  thevideo.pause();
};

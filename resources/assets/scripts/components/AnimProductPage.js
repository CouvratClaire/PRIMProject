/* -------------------------
    COMPOSANT JS POUR L'ANIMATION PAGE PRODUIT
------------------------- */

// Si on est dans une page produit :
var url = window.location.href;
if (url.includes("page")) {
  $("body").css("opacity", 0);
  window.onload = function () {
    // Fais apparaitre le body -> Seul l'item avec la classe ".visible" est visible.
    $("body").animate({ opacity: 1 }, { duration: 300 });
    setTimeout(function () {
      // Retire la classe visible après l'animation
      $(".visible").removeClass("visible");
    }, 1000);
  };

  // Au click sur l'icone de retour à l'accueil -> Déclenche l'animation.
  $($(".home")[0]).on("click", function (e) {
    if ($(window).innerWidth() > 780) {
      e.preventDefault();
      startHomeAnimation();
      e.stopPropagation();
    }
  });
}

//Animation avant de retourner à l'accueil
function startHomeAnimation() {
  // Cache le body entier
  $("body").animate({ opacity: 0 }, { duration: 500 });

  // Change de page
  setTimeout(function () {
    window.location = "/";
  }, 500);
}

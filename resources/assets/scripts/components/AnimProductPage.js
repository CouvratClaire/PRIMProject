// Anim Product page on load
var url = window.location.href;
if (url.includes("page")) {
  $("body").css("opacity", 0);
  window.onload = function () {
    $("body").animate({ opacity: 1 }, { duration: 300 });
    setTimeout(function () {
      //   $(".overlay").removeClass("on");
      $(".visible").removeClass("visible");
    }, 1000);
  };

  $($(".home")[0]).on("click", function (e) {
    e.preventDefault();
    startHomeAnimation();
    e.stopPropagation();
  });
}

//Anim product page on click Home
function startHomeAnimation() {
  $("body").animate({ opacity: 0 }, { duration: 500 });

  setTimeout(function () {
    window.location = "/";
  }, 500);
}

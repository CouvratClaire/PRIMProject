var url = window.location.href;
console.log(url);
if (url.includes("page")) {
  console.log("prepares");
  document.documentElement.classList.add("preparation");
  window.onload = function () {
    // $("body").show();
    console.log("is prepared");
    $(".overlay").addClass("on");
    $(".overlay").animate(
      {
        opacity: 0,
      },
      { duration: 1000, queue: false }
    );
    setTimeout(function () {
      $(".overlay").removeClass("on");
      $(".visible").removeClass("visible");
    }, 1000);
  };
}

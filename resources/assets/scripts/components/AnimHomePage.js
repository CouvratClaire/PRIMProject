// Anim Product page on load
var url = window.location.href;
//if on main page
if (!url.includes("page")) {
  var previousUrl = document.referrer;
  if (previousUrl.length > 0) {
    $("body").css("opacity", 0);
  }

  window.onload = function () {
    var productId =
      previousUrl.split("/?").length > 1 ? previousUrl.split("/?")[1] : "";
    var image = $("a[href*='" + productId + "']");
    $(image).each(function (i, el) {
      new AnimHomePage(el);
    });
  };
}

function AnimHomePage(el) {
  var self = this;
  self.el = el;
  self.parent = $(el).parent();
  self.$parent = $(self.parent);
  self.width = self.$parent.outerWidth();
  self.position = self.$parent.position();

  $(".overlay").addClass("on");

  self.anim();
}

AnimHomePage.prototype.anim = function () {
  var self = this;
  $("body").animate({ opacity: 1 }, { duration: 300 });
  var className = self.parent.attr("class").split(/\s+/)[0];
  self.parent.before('<div class="faker"></div>');
  self.faker = $(".faker");
  $(".faker").addClass(className);
  $(".faker").width(self.$parent.width()).height(self.$parent.height());
  var newWidth = (($(window).width() - 100) * 60) / 100;
  self.$parent.css({
    position: "absolute",
    top: "30px",
    left: 0,
    width: newWidth,
    paddingRight: "10px",
    paddingLeft: "150px",
    zIndex: 2,
  });
  setTimeout(function () {
    const top = self.faker.position().top;
    var paddingLeft = $(".faker").css("paddingLeft");
    var paddingRight = $(".faker").css("paddingRight");
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
    $(".overlay").animate(
      {
        opacity: 0,
      },
      { duration: 1000, queue: false }
    );
    $("html, body").animate(
      { scrollTop: top - 200 },
      { duration: 1000, queue: false }
    );

    //after animation, remove faker and reput item and overlay
    setTimeout(function () {
      self.$parent.removeAttr("style");
      self.faker.remove();
      $(".overlay").removeClass("on");
    }, 1500);
  }, 500);
};

/* -------------------------
    INIT
------------------------- */

$(window).on("load", function () {
  $(".anim-on-click").each(function (i, el) {
    // console.log("click", el);
    new AnimClick(el);
  });
});

function AnimClick(el) {
  var self = this;
  self.el = el;
  self.$el = $(el);
  self.link = $(el).find("a");

  self.overlay = $(".overlay")[0];
  self.url = self.link.attr("href");
  self.init();
}

AnimClick.prototype.init = function () {
  var self = this;
  if (self.link.length > 0) {
    var link = self.link[0];
    var $link = $(link);
    self.url = $link.attr("href");
    $link.on("click", function (e) {
      e.preventDefault();
      self.startAnimation($link);
      e.stopPropagation();
    });
  }
};

AnimClick.prototype.startAnimation = function () {
  var self = this;
  var position = self.$el.position();
  var className = self.$el.attr("class").split(/\s+/)[0];
  self.$el.before('<div class="faker"></div>');
  var width = self.$el.width();
  $(".faker").addClass(className);
  $(".faker").width(width).height(self.$el.height());
  self.$el.css({ position: "absolute", top: position.top, zIndex: 2 });
  self.$el.width($(".faker").width());
  var newWidth = (($(window).width() - 100) * 60) / 100;

  self.$el.animate(
    {
      width: newWidth,
      paddingRight: "10px",
      paddingLeft: "150px",
      left: 0,
      top: "30px",
    },
    { duration: 1000, queue: false }
  );
  console.log("OVERLAY", $(self.overlay));
  // window.scroll(0, 0);

  // window.scrollTo(0, 0);
  $(self.overlay).css("z-index", 1);
  $(self.overlay).animate(
    {
      opacity: 1,
    },
    { duration: 500, queue: false }
  );
  $("html, body").animate({ scrollTop: "0" }, { duration: 1000, queue: false });

  setTimeout(function () {
    $("html").animate({ backgroundColor: "black" }, { duration: 500 });
    $("body").animate({ opacity: 0 }, { duration: 500 });
  }, 1000);

  setTimeout(function () {
    console.log("coucou");
    console.log("/?" + self.url.split("/?")[1]);
    // window.location.href = "/?" + self.url.split("/?")[1];
    // window.location.replace(self.url);
    window.location = "/?" + self.url.split("/?")[1];
  }, 1500);
};

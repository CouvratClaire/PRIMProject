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
  console.log(self.link);
  self.init();
}

AnimClick.prototype.init = function () {
  var self = this;
  if (self.link.length > 0) {
    var link = self.link[0];
    var $link = $(link);
    console.log("link", $link);
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
  self.$el.css({ position: "absolute", top: position.top });
  self.$el.width($(".faker").width());
};

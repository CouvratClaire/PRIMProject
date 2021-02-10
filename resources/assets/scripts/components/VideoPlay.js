$(window).on("load", function () {
  $(".video").each(function (i, el) {
    console.log("click", el);
    new VideoPlay(el);
  });
});

function VideoPlay(el) {
  var self = this;
  self.el = el;
  self.$el = $(el);
  self.$el.find(".thevideo").get(0).pause();
  self.$el.hover(self.hoverVideo, self.hideVideo);
}

VideoPlay.prototype.hoverVideo = function () {
  //   console.log("hover");
  var thevideo = $(this).find(".thevideo").get(0);
  var theimage = $(this).find(".image").get(0);

  $(theimage).animate(
    {
      opacity: 0,
    },
    { duration: 100, queue: false }
  );
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

  thevideo.play();
};

VideoPlay.prototype.hideVideo = function () {
  //   console.log("hide hover");
  var thevideo = $(this).find(".thevideo").get(0);
  var theimage = $(this).find(".image").get(0);
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
};

$(window).on("load", () => {
   $(".header__basket").attr("data-count", 0);
   $(".order").remove();
   cartStorage.clear();
});

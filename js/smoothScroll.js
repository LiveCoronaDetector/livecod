document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    var href_name = this.getAttribute("href");

    // 한국 확진자수 증가추이의 탭 클릭시, 스크롤이 움직이지 않도록
    if (
      href_name == "#korea_line_chart" ||
      href_name == "#korea_semi_log_chart"
    ) {
      return;
    }

    $(this).parent().siblings().children("a").removeClass("active");
    $(this).addClass("active");
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

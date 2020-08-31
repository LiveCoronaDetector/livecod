// 배너를 업데이트하면 bannerCount++ 해주세요. 기존 숫자보다 커야만 표시됩니다.
var bannerCount = 5;

function getCookie(name) {
  name = name + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(name, value, expiryHours) {
  var d = new Date();
  d.setTime(d.getTime() + expiryHours * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function showBanner() {
  var cookieItem = getCookie("alertBannerClosed");
  if (
    parseInt(cookieItem) < bannerCount ||
    parseInt(cookieItem) === NaN ||
    cookieItem === "" ||
    !cookieItem
  ) {
    $("#alertBanner").removeClass("d-none");
  }
}

$("#btnAlertBannerClose").click(function () {
  // 맨 마지막 옵션인 "시간"만 변경하세요. 단위가 day -> hour로 변경되었습니다.
  setCookie("alertBannerClosed", bannerCount, 12);
});

$(document).ready(function () {
  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on("click", function (e) {
    $(".content").toggleClass("expended");
    $(this).children("i").toggleClass("fa-chevron-circle-left fa-bars");
  });

  if ($(window).width() < 760) {
    $("#sidebarToggleTop").trigger("click");
  }

  $('[data-toggle="tooltip"]').tooltip();
});

// 배너를 숨기고 싶으면 아래 코드를 주석처리하세요
//showBanner();

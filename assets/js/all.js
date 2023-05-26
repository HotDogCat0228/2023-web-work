"use strict";

axios.get('https://2023-engineer-camp.zeabur.app/api/v1/works').then(function (response) {
  console.log(response);
}); //jQuery back to top

$(function () {
  $('#scrollToTop').on("click", function () {
    $('html, body').animate({
      scrollTop: 0
    }, 500);
  });
}); // content-4 FAQ accordion

var faqs = document.querySelectorAll('.faq');
faqs.forEach(function (faq) {
  faq.addEventListener("click", function () {
    faq.classList.toggle("active");
  });
});
//# sourceMappingURL=all.js.map

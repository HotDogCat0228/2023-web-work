"use strict";

// Swiper in RWD
var swiper = new Swiper("#mySwiper", {
  pagination: {
    el: ".swiper-pagination"
  }
}); //get

var currentURL = window.location.href;
var pageName = currentURL.substring(currentURL.lastIndexOf("/") + 1);

if (true) {
  var el = document.querySelector('.footer-bottom');
  el.innerHTML = '<p class="mr-100 order-1">AI工具王 © 2023</p>' + '<div class="d-flex order-2 link-rwd">' + '<a class="mr-20 href-hover" href="https://www.facebook.com/">Facebook</a>' + '<a class="mr-20 href-hover" href="https://twitter.com/?lang=zh-Hant">Twitter</a>' + '<a class="href-hover" href="https://www.instagram.com/">Instagram</a>' + '</div>' + '<a href="#" class="d-flex order-3 href-hover" id="scrollToTop">Back to top <span class="material-symbols-outlined">' + 'arrow_upward' + '</span></p>';
}

console.log(pageName); //btn

$('.btn').on('click', function (e) {
  e.preventDefault();
});
var filterData = [{
  className: "filter-all",
  text: "所有類型"
}, {
  className: "filter-1",
  text: "篩選項目 1"
}, {
  className: "filter-2",
  text: "篩選項目 2"
}, {
  className: "filter-3",
  text: "篩選項目 3"
}, {
  className: "filter-4",
  text: "篩選項目 4"
}, {
  className: "filter-5",
  text: "篩選項目 5"
}, {
  className: "filter-6",
  text: "篩選項目 6"
}];
var moduleData = [{
  className: "module-all",
  text: "所有模型"
}, {
  className: "module-1",
  text: "卡卡"
}, {
  className: "module-2",
  text: "杰杰"
}, {
  className: "module-3",
  text: "琪琪"
}, {
  className: "module-4",
  text: "昊昊"
}]; //menu

var getMenuBtn = document.querySelector('.menu-icon');
var btnCount = 1;
$('.menu-btn').on('click', function (e) {
  e.preventDefault();
  btnCount++;

  if (btnCount % 2 == 0) {
    getMenuBtn.textContent = "close";
  } else {
    getMenuBtn.textContent = "menu";
  }

  $('.menu').slideToggle();
}); //jQuery dropdown
// 開起選單

$('#filter-btn').on('click', function (e) {
  $('#filter-menu').toggleClass('show');
});
$('#arrangement-btn').on('click', function (e) {
  $('#arrangement-menu').toggleClass('show');
});

for (var i = 0; i < filterData.length; i++) {
  $(".".concat(filterData[i].className)).on('click', function (e) {
    e.preventDefault();
    $('#filter-btnText').text($(this).text());
    $('#filter-menu').removeClass('show');
  });
}

for (var _i = 0; _i < moduleData.length; _i++) {
  $(".".concat(moduleData[_i].className)).on('click', function (e) {
    e.preventDefault();
    $('#filter-btnText').text($(this).text());
    $('#filter-menu').addClass('show');
  });
}

$('.old-to-new').on('click', function (e) {
  e.preventDefault();
  $('#arrangement-btnText').text($(this).text());
  $('#arrangement-menu').removeClass('show');
});
$('.new-to-old').on('click', function (e) {
  e.preventDefault();
  $('#arrangement-btnText').text($(this).text());
  $('#arrangement-menu').removeClass('show');
}); //jQuery back to top

$(function () {
  $('#scrollToTop').on("click", function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 500);
  });
}); // FAQ accordion

var faqs = document.querySelectorAll('.faq');
faqs.forEach(function (faq) {
  faq.addEventListener("click", function () {
    faq.classList.toggle("active");
  });
}); // API串接 
// 1.宣告變數

var apiPath = 'https://2023-engineer-camp.zeabur.app';
var list = document.querySelector('#list'); //抓取DOM

var pagination = document.querySelector('#pagination');
var data = {
  type: '',
  sort: 0,
  page: 1,
  search: ''
};
var worksData = [];
var pagesData = {};
var dataLength = 0; // 2.定義工具函式

function getData(_ref) {
  var type = _ref.type,
      sort = _ref.sort,
      page = _ref.page,
      search = _ref.search;
  var apiUrl = "".concat(apiPath, "/api/v1/works?sort=").concat(sort, "&page=").concat(page, "&").concat(type ? "type=".concat(type, "&") : '').concat(search ? "search=".concat(search) : '');
  axios.get(apiUrl).then(function (res) {
    worksData = res.data.ai_works.data;
    pagesData = res.data.ai_works.page; // console.log(worksData.length);資料數量

    renderWorks();
    renderPages();
  });
}

getData(data); //3.將作品渲染至業面

function renderWorks() {
  var works = '';

  if (worksData.length > 0) {
    list.classList.remove('justify-content-center');
    worksData.forEach(function (item) {
      works +=
      /*html*/
      "<li class=\"AI-card\">\n    <div class=\"img-list\">\n      <img src=\"".concat(item.imageUrl, "\" alt=\"ai image\">\n    </div>            \n      <div class=\"card-padding flex-grow-1\">\n      <h3 class=\"fw-900 fz-20 mb-12\">").concat(item.title, "</h3>\n      <p class=\"fz-14 font-second\">").concat(item.description, "</p>\n      </div>          \n      <div class=\"d-flex justify-content-between card-padding border-top\">\n          <h3 class=\"fw-700\">AI \u6A21\u578B</h3>\n          <p class=\"font-primary\">").concat(item.model, "</p>\n      </div>\n      <div class=\"d-flex justify-content-between card-padding border-top\">\n          <p class=\"font-primary\">#").concat(item.type, "</p>\n          <p><a href=\"").concat(item.link, "\"><span class=\"material-symbols-outlined\">\n            share\n            </span></a></p>\n      </div>            \n  </li>");
    });
    list.innerHTML = works + '<i></i><i></i><i></i><i></i><i></i>';
  } else {
    list.classList.add('justify-content-center');
    works = "<div class=\"flex-colum justift-content-center align-items-center\"><img src=\"./assets/images/embarrassed.png\" alt=\"\"><p class=\"font-primary text-align-center\">\u76EE\u524D\u7121\u8CC7\u6599</p></div>";
    list.innerHTML = works;
  }
} // 切換分頁


function changePage(pagesData) {
  var pageLinks = document.querySelectorAll('#page-link');
  var pageId = '';
  pageLinks.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      pageId = e.target.dataset.page;
      data.page = Number(pageId);

      if (!pageId) {
        data.page = Number(pagesData.current_page) + 1;
      }

      getData(data);
    });
  });
} // 分頁選染至畫面


function renderPages() {
  var pageStr = '';

  for (var _i2 = 1; _i2 <= pagesData.total_pages; _i2 += 1) {
    pageStr +=
    /*html*/
    "<li>\n      <a class=\"".concat(pagesData.current_page == _i2 ? 'disabled' : '', " btn btn-black ").concat(pagesData.current_page == _i2 ? 'active' : '', "\" href=\"#\" id=\"page-link\" data-page=\"").concat(_i2, "\">").concat(_i2, "</a>\n    </li>");
  }

  ;

  if (pagesData.has_next) {
    pageStr +=
    /*html*/
    "<li>\n      <a class=\"\" href=\"#\" id=\"page-link\">\n        <span class=\"material-symbols-outlined\">s\n          arrow_forward_ios\n        </span>\n      </a>\n    </li>";
  }

  ;
  pagination.innerHTML = pageStr;
  changePage(pagesData);
} // 切換作品排序


var desc = document.querySelector('#desc');
var asc = document.querySelector('#asc'); //  由新到舊 -> sort = 0

desc.addEventListener('click', function (e) {
  e.preventDefault();
  data.sort = 0;
  getData(data);
}); //  由舊到新 -> sort = 1

asc.addEventListener('click', function (e) {
  e.preventDefault();
  data.sort = 1;
  getData(data);
}); // 切換作品類型

var filterBtns = document.querySelectorAll('#class-btn');
var typeBtns = document.querySelectorAll('#type-btn');
var checkBtns = document.querySelectorAll('#type-item-check');
filterBtns.forEach(function (item, i) {
  item.addEventListener('click', function () {
    filterBtns.forEach(function (btn) {
      return btn.classList.remove("btn-gray-start");
    });
    item.classList.add("btn-gray-start");

    if (item.textContent === '全部') {
      data.type = '';
    } else {
      data.type = item.textContent;
    }

    getData(data);
  });
});
typeBtns.forEach(function (item, i) {
  item.addEventListener('click', function () {
    if (item.textContent === '全部') {
      data.type = '';
    } else {
      data.type = item.textContent;
    }

    getData(data);
  });
}); // 搜尋

var search = document.querySelector('#search');
search.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    data.search = search.value;
    data.page = 1;
    getData(data);
  }
});
//# sourceMappingURL=all.js.map

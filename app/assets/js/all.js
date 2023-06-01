// Swiper in RWD

var swiper = new Swiper("#mySwiper", {
  pagination: {
    el: ".swiper-pagination",
  },
});

//get
var currentURL = window.location.href;
var pageName = currentURL.substring(currentURL.lastIndexOf("/") + 1);
if(pageName  == "index.html" || pageName  == "index.html#" || pageName  == "#" || pageName == ""){
  let el = document.querySelector('.footer-bottom');
  el.innerHTML = '<p class="mr-100 order-1">AI工具王 © 2023</p>'+
  '<div class="d-flex order-2">'+
  '<a class="mr-20 href-hover" href="https://www.facebook.com/">Facebook</a>'+
  '<a class="mr-20 href-hover" href="https://twitter.com/?lang=zh-Hant">Twitter</a>'+
  '<a class="href-hover" href="https://www.instagram.com/">Instagram</a>'+
  '</div>'+
  '<p class="d-flex order-3 href-hover" id="scrollToTop">Back to top <span class="material-symbols-outlined">'+
  'arrow_upward'+
  '</span></p>';
}
console.log(pageName);


var filterData = [
  { className: "filter-all", text: "所有類型" },
  { className: "filter-1", text: "篩選項目 1" },
  { className: "filter-2", text: "篩選項目 2" },
  { className: "filter-3", text: "篩選項目 3" },
  { className: "filter-4", text: "篩選項目 4" },
  { className: "filter-5", text: "篩選項目 5" },
  { className: "filter-6", text: "篩選項目 6" }
];
var moduleData = [
  { className: "module-all", text: "所有模型" },
  { className: "module-1", text: "卡卡" },
  { className: "module-2", text: "杰杰" },
  { className: "module-3", text: "琪琪" },
  { className: "module-4", text: "昊昊" }
];

//menu
let getMenuBtn = document.querySelector('.menu-icon')
let btnCount = 1;
$('.menu-btn').on('click',function(){
  btnCount++;
  if (btnCount%2==0){
    getMenuBtn.textContent = "close";
  }else{
    getMenuBtn.textContent = "menu";
  }
  // $('.menu').toggleClass('active');
  $('.menu').slideToggle();
})
//jQuery dropdown
// 開起選單
$('#filter-btn').on('click',function(e) {
  $('#filter-menu').toggleClass('show');
});
$('#arrangement-btn').on('click',function(e) {
  $('#arrangement-menu').toggleClass('show');
});

for(let i=0;i<filterData.length;i++){
  $(`.${filterData[i].className}`).on('click',function(e) {
  e.preventDefault();
  $('#filter-btnText').text($(this).text());
  $('#filter-menu').classList.remove('show');
});
}

for(let i=0;i<moduleData.length;i++){
  $(`.${moduleData[i].className}`).on('click',function(e) {
  e.preventDefault();
  $('#filter-btnText').text($(this).text());
  $('#filter-menu').classList.remove('show');
});
}

$('.old-to-new').on('click',function(e) {
  e.preventDefault();
  $('#arrangement-btnText').text($(this).text());
  $('#arrangement-menu').classList.remove('show');
});

$('.new-to-old').on('click',function(e) {
  e.preventDefault();
  $('#arrangement-btnText').text($(this).text());
  $('#arrangement-menu').classList.remove('show');
});



// var cards = document.querySelectorAll('.partner-card');


// // 找到最大的卡片高度(Swiper使用時高度會跑掉)
// var maxHeight = 0;
// cards.forEach(function(card) {
//   var height = card.offsetHeight;
//   if (height > maxHeight) {
//     maxHeight = height;
//   }
// });

// // 所有卡片元素的高度最大高度
// cards.forEach(function(card) {
//   card.style.height = maxHeight + 'px';
// });




//jQuery back to top
$(function(){
  $('#scrollToTop').on("click",function() {
    $('html, body').animate(
        {
            scrollTop: 0
        },
        500
    );
  });
})


// FAQ accordion
let faqs = document.querySelectorAll('.faq');

faqs.forEach((faq)=>{
  faq.addEventListener("click",() => {
    faq.classList.toggle("active");
  })
})




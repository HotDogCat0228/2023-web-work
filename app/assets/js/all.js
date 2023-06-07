// Swiper in RWD

var swiper = new Swiper("#mySwiper", {
  pagination: {
    el: ".swiper-pagination",
  },
});

//get
var currentURL = window.location.href;
var pageName = currentURL.substring(currentURL.lastIndexOf("/") + 1);
if(true){
  let el = document.querySelector('.footer-bottom');
  el.innerHTML = '<p class="mr-100 order-1">AI工具王 © 2023</p>'+
  '<div class="d-flex order-2 link-rwd">'+
  '<a class="mr-20 href-hover" href="https://www.facebook.com/">Facebook</a>'+
  '<a class="mr-20 href-hover" href="https://twitter.com/?lang=zh-Hant">Twitter</a>'+
  '<a class="href-hover" href="https://www.instagram.com/">Instagram</a>'+
  '</div>'+
  '<a href="#" class="d-flex order-3 href-hover" id="scrollToTop">Back to top <span class="material-symbols-outlined">'+
  'arrow_upward'+
  '</span></p>';
}
console.log(pageName);

//btn

$('.btn').on('click',function(e){
  e.preventDefault();
})

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
$('.menu-btn').on('click',function(e){
  e.preventDefault();
  btnCount++;
  if (btnCount%2==0){
    getMenuBtn.textContent = "close";
  }else{
    getMenuBtn.textContent = "menu";
  }
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
  $('#filter-menu').removeClass('show');
});
}

for(let i=0;i<moduleData.length;i++){
  $(`.${moduleData[i].className}`).on('click',function(e) {
  e.preventDefault();
  $('#filter-btnText').text($(this).text());
  $('#filter-menu').addClass('show');
});
}

$('.old-to-new').on('click',function(e) {
  e.preventDefault();
  $('#arrangement-btnText').text($(this).text());
  $('#arrangement-menu').removeClass('show');
});

$('.new-to-old').on('click',function(e) {
  e.preventDefault();
  $('#arrangement-btnText').text($(this).text());
  $('#arrangement-menu').removeClass('show');
});




//jQuery back to top
$(function(){
  $('#scrollToTop').on("click",function(e) {
    e.preventDefault();
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



// API串接 

// 1.宣告變數
const apiPath = 'https://2023-engineer-camp.zeabur.app';
const list = document.querySelector('#list'); //抓取DOM
const pagination = document.querySelector('#pagination');

const data = {
  type: '',
  sort: 0,
  page: 1,
  search: '',
}

let worksData = []
let pagesData = {}
let dataLength = 0;
// 2.定義工具函式
function getData({ type, sort, page, search }) {
  const apiUrl = `${apiPath}/api/v1/works?sort=${sort}&page=${page}&${type ? `type=${type}&` : ''}${search ? `search=${search}` : ''}`
  axios.get(apiUrl)
    .then((res) => {
      worksData = res.data.ai_works.data;
      pagesData = res.data.ai_works.page;
      // console.log(worksData.length);資料數量
      renderWorks();
      renderPages();
    })
}

getData(data);

//3.將作品渲染至業面
function renderWorks() {
  let works = '';
  if(worksData.length>0){
  list.classList.remove('justify-content-center');
  worksData.forEach((item) => {
    works += /*html*/`<li class="AI-card">
    <div class="img-list">
      <img src="${item.imageUrl}" alt="ai image">
    </div>            
      <div class="card-padding flex-grow-1">
      <h3 class="fw-900 fz-20 mb-12">${item.title}</h3>
      <p class="fz-14 font-second">${item.description}</p>
      </div>          
      <div class="d-flex justify-content-between card-padding border-top">
          <h3 class="fw-700">AI 模型</h3>
          <p class="font-primary">${item.model}</p>
      </div>
      <div class="d-flex justify-content-between card-padding border-top">
          <p class="font-primary">#${item.type}</p>
          <p><a href="${item.link}"><span class="material-symbols-outlined">
            share
            </span></a></p>
      </div>            
  </li>`
  });
    list.innerHTML = works + '<i></i><i></i><i></i><i></i><i></i>';
  }else{
    list.classList.add('justify-content-center');
    works = `<div class="flex-colum justift-content-center align-items-center"><img src="./assets/images/embarrassed.png" alt=""><p class="font-primary text-align-center">目前無資料</p></div>`;
    list.innerHTML = works ; 
  }
  
}

// 切換分頁
function changePage(pagesData) {
  const pageLinks = document.querySelectorAll('#page-link')
  let pageId = '';

  pageLinks.forEach((item) => {

    item.addEventListener('click', (e) => {
      e.preventDefault();
      pageId = e.target.dataset.page;
      data.page = Number(pageId);

      if (!pageId) {
        data.page = Number(pagesData.current_page) + 1
      }

      getData(data);
    });
  });
}
// 分頁選染至畫面
function renderPages() {
  let pageStr = '';

  for (let i = 1; i <= pagesData.total_pages; i += 1) {
    pageStr += /*html*/`<li>
      <a class="${pagesData.current_page == i ? 'disabled' : ''} btn btn-black ${pagesData.current_page == i ? 'active' : ''}" href="#" id="page-link" data-page="${i}">${i}</a>
    </li>`
  };

  if (pagesData.has_next) {
    pageStr +=  /*html*/`<li>
      <a class="" href="#" id="page-link">
        <span class="material-symbols-outlined">s
          arrow_forward_ios
        </span>
      </a>
    </li>`
  };
  pagination.innerHTML = pageStr

  changePage(pagesData);
}

// 切換作品排序
const desc = document.querySelector('#desc');
const asc = document.querySelector('#asc');
//  由新到舊 -> sort = 0
desc.addEventListener('click', (e) => {
  e.preventDefault();
  data.sort = 0;
  getData(data);
})
//  由舊到新 -> sort = 1
asc.addEventListener('click', (e) => {
  e.preventDefault();
  data.sort = 1
  getData(data);
})




// 切換作品類型
const filterBtns = document.querySelectorAll('#class-btn');
const typeBtns = document.querySelectorAll('#type-btn');
const checkBtns = document.querySelectorAll('#type-item-check');
filterBtns.forEach((item, i) => {
  item.addEventListener('click', () => {
    filterBtns.forEach(btn => btn.classList.remove("btn-gray-start"));
    item.classList.add("btn-gray-start");
    if (item.textContent === '全部') {
      data.type = '';
    } else {
      data.type = item.textContent;
    }
    getData(data)
  })
})
typeBtns.forEach((item,i) => {
  item.addEventListener('click', () => {
    if (item.textContent === '全部') {
      data.type = '';
    } else {
      data.type = item.textContent;
    }
    getData(data)
  })
})

// 搜尋
const search = document.querySelector('#search');
search.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    data.search = search.value
    data.page = 1
    getData(data);
  }
})

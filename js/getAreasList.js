import { config } from "../api.js";

let currentPage = 1;
const urlParams = new URLSearchParams(window.location.search);
let contentTypeId = urlParams.get('contentTypeId');

let curUrl = window.location.href;
console.log(curUrl.includes("touristAreas")?1:0);

if(curUrl.includes("touristAreas")){
  contentTypeId = 12;
} else if(curUrl.includes("festivalAreas")){
  contentTypeId = 15;
} else if(curUrl.includes("reportsAreas")){
  contentTypeId = 28;
}  else if(curUrl.includes("roomAreas")){
  contentTypeId = 32;
} 

const getTouristAreas = (currentPage) => {
  $.ajax({
    method: "GET",
    url:`https://apis.data.go.kr/B551011/KorWithService1/areaBasedList1?ServiceKey=${config.apikey}&numOfRows=12&pageNo=${currentPage}&MobileOS=ETC&MobileApp=TestApp&contentTypeId=${contentTypeId}&_type=json`
  })
  .done((data)=>{
    const tourlistareas = data.response.body.items;
    $("#tourAreas").empty();
    if(tourlistareas !== undefined){
      $.map(tourlistareas.item, function(item){
        if(item.firstimage !==""){
          return $("#tourAreas").append(
          `<li id=${item.contentid} class="area" title="${item.title}" data-image="${item.firstimage}" data-addr1="${item.addr1}">
            <img src=${item.firstimage} alt="${item.title}">
            <p id="tourAreaTitle">${item.title}</p>
            <p id="tourAreaAddress">${item.addr1}</p>
          </li>`)
        } else {
          return $("#tourAreas").append(
            `<li id=${item.contentid} class="area" title="${item.title}" data-image="${item.firstimage}" data-addr1="${item.addr1}">
              <img src="../img/tuorareadefault.png" alt="${item.title}">
              <p id="tourAreaTitle">${item.title}</p>
              <p id="tourAreaAddress">${item.addr1}</p>
            </li>`)
        }
      })
    }
    $("#currentPage").text(currentPage);
  })
}

$("#prevPage").click(function() {
  if(currentPage > 1) {
    currentPage -= 1;
    getTouristAreas(currentPage);
    window.scrollTo(0,0);
  }
});

$("#nextPage").click(function() {
  currentPage += 1;
  getTouristAreas(currentPage);
  window.scrollTo(0,0);
});

getTouristAreas(currentPage);


const label = document.querySelectorAll('.label');
label.forEach(function(lb){
  lb.addEventListener('click', e => {
    let optionList = lb.nextElementSibling;
    let optionItems = optionList.querySelectorAll('.optionItem');
    clickLabel(lb, optionItems);
  })
});
const clickLabel = (lb, optionItems) => {
  if(lb.parentNode.classList.contains('active')) {
    lb.parentNode.classList.remove('active');
    optionItems.forEach((opt) => {
        opt.removeEventListener('click', () => {
            handleSelect(lb, opt)
        })
    })
  } else {
    lb.parentNode.classList.add('active');
    optionItems.forEach((opt) => {
        opt.addEventListener('click', () => {
            handleSelect(lb, opt)
        })
    })
  }
}
const handleSelect = (label, item) => {
  label.innerHTML = item.textContent;
  label.parentNode.classList.remove('active');
}
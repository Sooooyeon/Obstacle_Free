import { config } from "../api.js";

let currentPage = 1;
const urlParams = new URLSearchParams(window.location.search);
let contentTypeId = urlParams.get('contentTypeId');
let areaCode = ""
let curUrl = window.location.href;

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
    url:`https://apis.data.go.kr/B551011/KorWithService1/areaBasedList1?ServiceKey=${config.apikey}&areaCode=${areaCode}&numOfRows=12&pageNo=${currentPage}&MobileOS=ETC&MobileApp=TestApp&contentTypeId=${contentTypeId}&_type=json`
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

$("#searchBtn").click(function() {
  console.log('클릭')
  let areaName = document.querySelector('.label').textContent;
  console.log(areaName);
  switch(areaName){
    case "서울":
      areaCode = "1"
      break;
    case "인천":
      areaCode = "2"
      break;
    case "대전":
      areaCode = "3"
      break;
    case "대구":
      areaCode = "4"
      break;
    case "광주":
      areaCode = "5"
      break;
    case "부산":
      areaCode = "6"
      break;
    case "울산":
      areaCode = "7"
      break;
    case "세종":
      areaCode = "8"
      break;
    case "경기":
      areaCode = "31"
      break;
    case "강원":
      areaCode = "32"
      break;
    case "충청북도":
      areaCode = "33"
      break;
    case "충청남도":
      areaCode = "34"
      break;
    case "경상북도":
      areaCode = "35"
      break;
    case "경상남도":
      areaCode = "36"
      break;
    case "전라북도":
      areaCode = "37"
      break;
    case "전라남도":
      areaCode = "38"
      break;
    case "제주":
      areaCode = "39"
      break;
    default:
      areaCode = "";
  }
  currentPage = 1;
  getTouristAreas(currentPage);
})
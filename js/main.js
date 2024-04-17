import { config } from "../api.js";
import { recommendPlace } from "./recommendPlace.js";

// 추천 장소 화면 출력
$.map(recommendPlace, function(item){
  if(item.image !==""){
    return $("#tourAreas").append(
    `<li tabindex="0" id=${item.contentid} class="area" title="${item.title}" data-image="${item.image}" data-addr1="${item.addr}" tabindex="0" role="button">
      <img src=${item.image} alt="${item.title}">
      <p class="tourAreaTitle">${item.title}</p>
      <p class="tourAreaAddress">${item.addr}</p>
    </li>`)
  } else {
    return $("#tourAreas").append(
      `<li tabindex="0" id=${item.contentid} class="area" title="${item.title}" data-image="${item.image}" data-addr1="${item.addr}" tabindex="0" role="button">
        <img src="../img/tuorareadefault.png" alt="${item.title}">
        <p class="tourAreaTitle">${item.title}</p>
        <p class="tourAreaAddress">${item.addr}</p>
      </li>`)
  }
})


// 상세페이지 이동
const moveDetail = (url, title, id, image, addr1) => {
  window.location.href = `${url}?title=${title}&contentid=${id}&image=${encodeURIComponent(image)}&addr1=${encodeURIComponent(addr1)}`;
}

$("#tourAreas").on("click", ".area", function(){
  const image = $(this).data("image"); 
  const addr1 = $(this).data("addr1"); 
  moveDetail('./pages/areaDetail.html', this.title, this.id, image, addr1);
});

$("#nearbyAreas").on("click", ".area", function(){
  const image = $(this).data("image"); 
  const addr1 = $(this).data("addr1"); 
  moveDetail('./pages/areaDetail.html', this.title, this.id, image, addr1);
});

const moveCategory = (url, contentTypeId) => {
  window.location.href = `${url}?contentTypeId=${encodeURIComponent(contentTypeId)}`;
}


// 카테고리 이동
$("#menu").on("click", ".category", function(){
  const contentTypeId = $(this).data("code"); 
  let url = "";
  
  switch(contentTypeId){
    case 12:
      url = "./pages/touristAreas.html"
      break;

    case 15:
      url = "./pages/festivalAreas.html"
      break;

    case 25:
      url = "./pages/tourCourse.html"
      break;

    case 28:
      url = "./pages/reportsAreas.html"
      break;

    case 32:
      url = "./pages/roomAreas.html"
      break;

    default :
  }

  if(url !== "") moveCategory(url, contentTypeId);
});


// enter키로 이동 로직
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('.category').forEach(item => {
    item.addEventListener('keyup', function(e) {
      if (e.keyCode === 13) {
        const contentTypeId = $(this).data("code"); 
        let url = "";
        
        switch(contentTypeId){
          case 12:
            url = "./pages/touristAreas.html"
            break;

          case 15:
            url = "./pages/festivalAreas.html"
            break;

          case 25:
            url = "./pages/tourCourse.html"
            break;

          case 28:
            url = "./pages/reportsAreas.html"
            break;

          case 32:
            url = "./pages/roomAreas.html"
            break;

          default :
        }

        if(url !== "") moveCategory(url, contentTypeId);
      }
    });
  });
});


// 위치 기반 주변 장소 출력
navigator.geolocation.getCurrentPosition(geoSuccess, getError);

function geoSuccess(position) {
    
  const lat = position.coords.latitude; // 위도
  const lng = position.coords.longitude; // 경도
    if(lat && lng){
      $.ajax({
        method: "GET",
        url:`https://apis.data.go.kr/B551011/KorWithService1/locationBasedList1?ServiceKey=${config.apikey}&numOfRows=12&pageNo=1&MobileOS=ETC&MobileApp=TestApp&mapX=${lng}&mapY=${lat}&radius=1000&_type=json`
      })
      .done((data)=>{
        const nearbyAreas = data.response.body.items;
        $("#nearbyAreas").empty();
        if(nearbyAreas !== undefined){
          $.map(nearbyAreas.item, function(item){
            if(item.firstimage !==""){
              return $("#nearbyAreas").append(
              `<li id=${item.contentid} class="area" title="${item.title}" data-image="${item.firstimage}" data-addr1="${item.addr1}" tabindex="0" role="button">
                <img src=${item.firstimage} alt="${item.title}">
                <p class="tourAreaTitle">${item.title}</p>
                <p class="tourAreaAddress">${item.addr1}</p>
              </li>`)
            } else {
              return $("#nearbyAreas").append(
                `<li id=${item.contentid} class="area" title="${item.title}" data-image="${item.firstimage}" data-addr1="${item.addr1}" tabindex="0" role="button">
                  <img src="../img/tuorareadefault.png" alt="${item.title}">
                  <p class="tourAreaTitle">${item.title}</p>
                  <p class="tourAreaAddress">${item.addr1}</p>
                </li>`)
            }
          })
        }
      })
    } 
}

function getError() {
  console.log('Geolocation Error');
  return $("#nearbyAreas").append(`<p id="mapError">위치 정보를 불러오지 못했어요🥲</p>`)
}


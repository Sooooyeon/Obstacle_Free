import { config } from "../api.js";
import { recommendPlace } from "./recommendPlace.js";

$.map(recommendPlace, function(item){
  if(item.image !==""){
    return $("#tourAreas").append(
    `<li id=${item.contentid} class="area" title="${item.title}" data-image="${item.image}" data-addr1="${item.addr}">
      <img src=${item.image} alt="${item.title}">
      <p id="tourAreaTitle">${item.title}</p>
      <p id="tourAreaAddress">${item.addr}</p>
    </li>`)
  } else {
    return $("#tourAreas").append(
      `<li id=${item.contentid} class="area" title="${item.title}" data-image="${item.image}" data-addr1="${item.addr}">
        <img src="../img/tuorareadefault.png" alt="${item.title}">
        <p id="tourAreaTitle">${item.title}</p>
        <p id="tourAreaAddress">${item.addr}</p>
      </li>`)
  }
})

const moveDetail = (url, title, id, image, addr1) => {
  window.location.href = `${url}?title=${title}&contentid=${id}&image=${encodeURIComponent(image)}&addr1=${encodeURIComponent(addr1)}`;
}

$("#tourAreas").on("click", ".area", function(){
  const image = $(this).data("image"); 
  const addr1 = $(this).data("addr1"); 
  moveDetail('./pages/areaDetail.html', this.title, this.id, image, addr1);
});

const moveCategory = (url, contentTypeId) => {
  console.log(contentTypeId);
  window.location.href = `${url}?contentTypeId=${encodeURIComponent(contentTypeId)}`;
}

$("#menu").on("click", ".category", function(){
  const contentTypeId = $(this).data("code"); 
  let url = "";
  console.log(url);
  console.log(contentTypeId);
  
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

  console.log(url);
  if(url !== "") moveCategory(url, contentTypeId);
});


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
        console.log(nearbyAreas);
        $("#nearbyAreas").empty();
        if(nearbyAreas !== undefined){
          $.map(nearbyAreas.item, function(item){
            if(item.firstimage !==""){
              return $("#nearbyAreas").append(
              `<li id=${item.contentid} class="area" title="${item.title}" data-image="${item.firstimage}" data-addr1="${item.addr1}">
                <img src=${item.firstimage} alt="${item.title}">
                <p id="tourAreaTitle">${item.title}</p>
                <p id="tourAreaAddress">${item.addr1}</p>
              </li>`)
            } else {
              return $("#nearbyAreas").append(
                `<li id=${item.contentid} class="area" title="${item.title}" data-image="${item.firstimage}" data-addr1="${item.addr1}">
                  <img src="../img/tuorareadefault.png" alt="${item.title}">
                  <p id="tourAreaTitle">${item.title}</p>
                  <p id="tourAreaAddress">${item.addr1}</p>
                </li>`)
            }
          })
        }
      })
    }
}


function getError() {
  alert('Geolocation Error');
}


import { config } from "../api.js";

const urlParams = new URLSearchParams(window.location.search);
const contentTypeId = urlParams.get('contentTypeId');

const getTouristAreas = () => {
  $.ajax({
    method: "GET",
    url:`https://apis.data.go.kr/B551011/KorWithService1/areaBasedList1?ServiceKey=${config.apikey}&numOfRows=12&pageNo=1&MobileOS=ETC&MobileApp=TestApp&contentTypeId=${contentTypeId}&_type=json`
  })
  .done((data)=>{
    const tourlistareas = data.response.body.items;
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
  })
}

getTouristAreas();

import { config } from "../api.js";

const getTouristAreas = () => {
  console.log('config');
  $.ajax({
    method: "GET",
    url:`https://apis.data.go.kr/B551011/KorWithService1/areaBasedList1?ServiceKey=${config.apikey}&numOfRows=6&pageNo=2&MobileOS=ETC&MobileApp=TestApp&contentTypeId=12&_type=json`
  })
  .done((data)=>{
    const tourlistareas = data.response.body.items;
    console.log(tourlistareas);
    console.log(tourlistareas.item[0]);
    console.log(tourlistareas.item[0].title);
    console.log(tourlistareas.item[0].addr1);
    if(tourlistareas !== undefined){
      console.log(typeof(tourlistareas));
      $.map(tourlistareas.item, function(item){
        console.log(item);
        if(item.firstimage !==""){
          return $("#tourAreas").append(
          `<li id=${item.contentid} title="${item.title}" class="area">
            <img src=${item.firstimage} alt="${item.title}">
            <p id="tourAreaTitle">${item.title}</p>
            <p id="tourAreaAddress">주소 : ${item.addr1}</p>
          </li>`)
        } else {
          return $("#tourAreas").append(
            `<li id=${item.contentid} title="${item.title}" class="area">
              <img src="./img/tuorareadefault.png" alt="${item.title}">
              <p id="tourAreaTitle">${item.title}</p>
              <p id="tourAreaAddress">주소 : ${item.addr1}</p>
            </li>`)
        }
      })
    }
  })
}

getTouristAreas();

const moveDetail = (url, title, id) => {
  window.location.href = url + '?title=' + title + '&contentid=' + id;
}

$("#tourAreas").on("click", ".area", function(){
  console.log(this.id);
  console.log(this.title);
  console.log(this);
  moveDetail('./pages/areaDetail.html', this.title,this.id);
});
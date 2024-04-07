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
      $.map(tourlistareas.item, function(item){
        if(item.firstimage !==""){
          return $("#tourAreas").append(
          `<li id=${item.contentid} class="area" title="${item.title}" data-image="${item.firstimage}">
            <img src=${item.firstimage} alt="${item.title}">
            <p id="tourAreaTitle">${item.title}</p>
            <p id="tourAreaAddress">주소 : ${item.addr1}</p>
          </li>`)
        } else {
          return $("#tourAreas").append(
            `<li id=${item.contentid} class="area" title="${item.title}" data-image="${item.firstimage}">
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


const moveDetail = (url, title, id , image) => {
  window.location.href = `${url}?title=${title}&contentid=${id}&image=${image}`;
}

$("#tourAreas").on("click", ".area", function(){
  const image = $(this).data("image"); 
  console.log(this.id);
  console.log(this.title);
  console.log(image);
  moveDetail('./pages/areaDetail.html', this.title,this.id, image);
});
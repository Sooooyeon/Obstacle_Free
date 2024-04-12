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
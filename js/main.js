import { recommendPlace } from "./recommendPlace.js";

$.map(recommendPlace, function(item){
  if(item.image !==""){
    return $("#tourAreas").append(
    `<li id=${item.contentid} class="area" title="${item.title}" data-image="${item.image}" data-addr1="${item.addr}">
      <img src=${item.image} alt="${item.title}">
      <p id="tourAreaTitle">${item.title}</p>
      <p id="tourAreaAddress">주소 : ${item.addr}</p>
    </li>`)
  } else {
    return $("#tourAreas").append(
      `<li id=${item.contentid} class="area" title="${item.title}" data-image="${item.image}" data-addr1="${item.addr}">
        <img src="../img/tuorareadefault.png" alt="${item.title}">
        <p id="tourAreaTitle">${item.title}</p>
        <p id="tourAreaAddress">주소 : ${item.addr}</p>
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
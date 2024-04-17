import { config } from "../api.js";

const searchForm = document.getElementById("search");
const searchText = searchForm.querySelector("input");
const searchButton = searchForm.querySelector("button");
const searchList = document.getElementById("searchList");
let keyWord = ""

const getKeyword = (e)=>{
  e.preventDefault();
  keyWord = searchText.value;
  while(searchList.hasChildNodes()){
    searchList.removeChild(searchList.firstChild);
  }
  search(keyWord)
}

searchButton.addEventListener("click",getKeyword);

const search = (keyWord) => {
  $.ajax({
    method: "GET",
    url:`https://apis.data.go.kr/B551011/KorWithService1/searchKeyword1?serviceKey=${config.apikey}&MobileOS=ETC&MobileApp=AppTest&listYN=Y&arrange=A&keyword=${keyWord}&_type=json`
  })
  .done((data)=>{
    const searchList = data.response.body.items;
    if(typeof(searchList) === "string"){
      return $("#searchList").append(
        `<li> 검색 결과가 없습니다.</li>`)
    }
    if(searchList !== undefined && typeof(searchList) !== "string"){
      $.map(searchList.item, function(item){
        if(item.firstimage !==""){
          return $("#searchList").append(
          `<li id=${item.contentid} class="area" title="${item.title}" data-image="${item.firstimage}" data-addr1="${item.addr1} ${item.addr2}" tabindex="0" role="button">
            <img src=${item.firstimage} alt="${item.title}">
            <p class="tourAreaTitle">${item.title}</p>
            <p class="tourAreaAddress">주소 : ${item.addr1} ${item.addr2}</p>
          </li>`)
        } else {
          return $("#searchList").append(
            `<li id=${item.contentid} class="area" title="${item.title}" data-image="${item.firstimage}" data-addr1="${item.addr1}" tabindex="0" role="button">
              <img src="../img/tuorareadefault.png" alt="${item.title}">
              <p class="tourAreaTitle">${item.title}</p>
              <p class="tourAreaAddress">주소 : ${item.addr1} ${item.addr2}</p>
            </li>`)
        }
      })
    }
    

  })
}


// 상세페이지로 이동
const moveDetail = (url, title, id, image, addr1) => {
  window.location.href = `${url}?title=${title}&contentid=${id}&image=${encodeURIComponent(image)}&addr1=${encodeURIComponent(addr1)}`;
}

$("#searchList").on("click", ".area", function(){
  const image = $(this).data("image"); 
  const addr1 = $(this).data("addr1"); 
  moveDetail('./areaDetail.html', this.title, this.id, image, addr1);
});
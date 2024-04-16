import { config } from "../api.js";

// URL에서 데이터 추출
const urlParams = new URLSearchParams(window.location.search);
const contentid = urlParams.get('contentid');
const title = urlParams.get('title');
const image = urlParams.get('image');
const addr = urlParams.get('addr1');

// 데이터를 화면에 출력
if(image !== ""){
  document.getElementById('areaInfo').innerHTML = 
  `<h3>${title}</h3>
    <img src="${image}" alt="${title}">`;
} else {
  document.getElementById('areaInfo').innerHTML = 
  `<h3>${title}</h3>
    <img src="../img/tuorareadefault.png" alt="${title}">`;
}

const getAreaInfo = () => {
  $.ajax({
    method: "GET",
    url:`https://apis.data.go.kr/B551011/KorWithService1/detailWithTour1?ServiceKey=${config.apikey}&MobileOS=ETC&MobileApp=TestApp&contentId=${contentid}&_type=json`,
    success: (data) => {
      const areaInfo = data.response.body.items.item[0];
      $("#areaInfo").append(`<h4>편의정보 안내</h4>`);
      for(const item in areaInfo){
        if(areaInfo[item] !== "" && item !== "contentid"){
          $("#areaInfo").append(`<li>${item} : ${areaInfo[item]}</li>`);
        }
      }
      $("#areaInfo").append(`<h4>오시는 길</h4><p>${addr}</p>`);
    },
    error: (textStatus, errorThrown) => {
      console.error('에러 발생:', textStatus, errorThrown);
    }
  });
}

getAreaInfo();


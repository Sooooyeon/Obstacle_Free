import { config } from "../api.js";

// URL에서 데이터 추출
const urlParams = new URLSearchParams(window.location.search);
const contentid = urlParams.get('contentid');
const title = urlParams.get('title');
const image = urlParams.get('image');

// 데이터를 화면에 출력
document.getElementById('dataDisplay').innerText = 'Received contentid: ' + contentid + title + image;

const getAreaInfo = () => {
  console.log('config');
  $.ajax({
    method: "GET",
    url:`https://apis.data.go.kr/B551011/KorWithService1/detailWithTour1?ServiceKey=${config.apikey}&MobileOS=ETC&MobileApp=TestApp&contentId=${contentid}&_type=json`
  })
  .done((data)=>{
    const areaInfo = data.response.body.items.item[0];
    console.log(areaInfo);
    // console.log(tourlistareas.item);

  })
}

getAreaInfo();


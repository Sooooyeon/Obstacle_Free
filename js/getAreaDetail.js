import { config } from "../api.js";

// URL에서 데이터 추출
const urlParams = new URLSearchParams(window.location.search);
const contentid = urlParams.get('contentid');
const title = urlParams.get('title');

// 데이터를 화면에 출력
document.getElementById('dataDisplay').innerText = 'Received contentid: ' + contentid + title;

// const getTouristAreas = () => {
//   console.log('config');
//   $.ajax({
//     method: "GET",
//     url:`https://apis.data.go.kr/B551011/KorWithService1/detailWithTour1?ServiceKey=${config.apikey}&MobileOS=ETC&MobileApp=TestApp&contentId=${contentid}&_type=json`
//   })
//   .done((data)=>{
//     const tourlistareas = data.response.body.items;
//     console.log(tourlistareas);
//     console.log(tourlistareas.item[0]);
//     console.log(tourlistareas.item[0].title);
//     console.log(tourlistareas.item[0].addr1);
//     if(tourlistareas !== undefined){
//       console.log(typeof(tourlistareas));
//       $.map(tourlistareas.item, function(item){
//         console.log(item);
//         if(item.firstimage !==""){
//           return $("#tourAreas").append(
//           `<li id=${item.contentid} class="area">
//             <img src=${item.firstimage} alt=${item.title}>
//             <p id="tourAreaTitle">${item.title}</p>
//             <p id="tourAreaAddress">주소 : ${item.addr1}</p>
//           </li>`)
//         } else {
//           return $("#tourAreas").append(
//             `<li id=${item.contentid} class="area">
//               <img src="./img/tuorareadefault.png" alt=${item.title}>
//               <p id="tourAreaTitle">${item.title}</p>
//               <p id="tourAreaAddress">주소 : ${item.addr1}</p>
//             </li>`)
//         }
//       })
//     }
//   })
// }

// getTouristAreas();


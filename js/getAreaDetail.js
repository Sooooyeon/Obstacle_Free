// URL에서 데이터 추출
const urlParams = new URLSearchParams(window.location.search);
const contentid = urlParams.get('contentid');

// 데이터를 화면에 출력
document.getElementById('dataDisplay').innerText = 'Received contentid: ' + contentid;
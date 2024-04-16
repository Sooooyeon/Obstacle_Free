const moveDetail = (url, title, id, image, addr1) => {
  window.location.href = `${url}?title=${title}&contentid=${id}&image=${encodeURIComponent(image)}&addr1=${encodeURIComponent(addr1)}`;
}

$("#tourAreas").on("click", ".area", function(){
  const image = $(this).data("image"); 
  const addr1 = $(this).data("addr1");
  moveDetail('./areaDetail.html', this.title, this.id, image, addr1);
});

const moveCategory = (url, contentTypeId) => {
  window.location.href = `${url}?contentTypeId=${encodeURIComponent(contentTypeId)}`;
}

$("#menu").on("click", ".category", function(){
  const contentTypeId = $(this).data("code"); 
  let url = "";
  
  switch(contentTypeId){
    case 12:
      url = "./touristAreas.html"
      break;

    case 15:
      url = "./festivalAreas.html"
      break;

    case 25:
      url = "./tourCourse.html"
      break;

    case 28:
      url = "./reportsAreas.html"
      break;

    case 32:
      url = "./roomAreas.html"
      break;

    default :
  }

  if(url !== "") moveCategory(url, contentTypeId);
});


document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('.category').forEach(item => {
    item.addEventListener('keypress', function(e) {
      if (e.keyCode === 13) {
        const contentTypeId = $(this).data("code"); 
        let url = "";
        
        switch(contentTypeId){
          case 12:
            url = "./touristAreas.html"
            break;
      
          case 15:
            url = "./festivalAreas.html"
            break;
      
          case 25:
            url = "./tourCourse.html"
            break;
      
          case 28:
            url = "./reportsAreas.html"
            break;
      
          case 32:
            url = "./roomAreas.html"
            break;
      
          default :
        }

        if(url !== "") moveCategory(url, contentTypeId);
      }
    });
  });
});
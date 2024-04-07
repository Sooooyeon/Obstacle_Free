const moveDetail = () => {
  const moveDetail = (url, title, id) => {
    window.location.href = url + '?title=' + title + '&contentid=' + id;
  }

  $("#tourAreas").on("click", ".area", function(){
    console.log(this.id);
    console.log(this.title);
    console.log(this);
    moveDetail('./pages/areaDetail.html', this.title,this.id);
  });
}

moveDetail()
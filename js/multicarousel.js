let items = document.querySelectorAll('#MultiC .carousel .carousel-item');
items.forEach((el) => {
  const minPerSlide = 8
  let next = el.nextElementSibling
  for (var i=1; i<minPerSlide; i++) {
    if (!next) {
      // wrap carousel by using first child
      next = items[0]
    }
    let cloneChild = next.cloneNode(true)
    el.appendChild(cloneChild.children[0])
    next = next.nextElementSibling
  }
})
$(document).ready(function(){
  $('#featureCarousel').carousel({interval: true});
  $('#featureCarousel').carousel('pause');
});

let itemsb = document.querySelectorAll('#MultiCb .carousel .carousel-item');
itemsb.forEach((el) => {
  const minPerSlide = 8
  let next = el.nextElementSibling
  for (var i=1; i<minPerSlide; i++) {
    if (!next) {
      // wrap carousel by using first child
      next = itemsb[0]
    }
    let cloneChild = next.cloneNode(true)
    el.appendChild(cloneChild.children[0])
    next = next.nextElementSibling
  }
})
$(document).ready(function(){
  $('#featureCarousel').carousel({interval: true});
  $('#featureCarousel').carousel('pause');
});
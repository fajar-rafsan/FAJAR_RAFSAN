let item = document.querySelectorAll(".content-slide");
let dots = document.querySelectorAll(".dots li");
let slide = document.querySelector(".slide");
let next = document.getElementById("next");
let prev = document.getElementById("prev");


let active = 0;
let lenghtItems = item.length - 1;
next.addEventListener("click", function () {
  if (active + 1 > lenghtItems) {
    active = 0;
  } else {
    active += 1;
  }
  // slider();
});

prev.addEventListener("click", function () {
  if (active - 1 < 0) {
    active = lenghtItems;
  } else {
    active -= 1;
  }
  // slider();
});

let refreshSlider = setInterval(() => {
  next.click();
}, 10000);

function slider() {
  let cekLeft = item[active].offsetLeft;
  slide.style.left = -cekLeft + "px";

  dots.forEach((dot) => {
    dot.classList.remove("active");
  });
  dots[active].classList.add("active");

    clearInterval(refreshSlider);
      refreshSlider = setInterval(() => {
      next.click();
    }, 10000);
}

// import { tampilKeranjang } from "./keranjang";

// tampilKeranjang();

// slider();

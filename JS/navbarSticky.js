window.addEventListener("scroll", () => {
  let header = document.querySelector("header");
  let logo2 = document.querySelector("aside");
  let burger = document.querySelector(".burger-menu");
  if (window.scrollY > 80) {
    header.classList.add("sticky");
    logo2.classList.add("sticky");
    burger.classList.add("sticky");
  } else {
    // document.html.classList.add('no-scroll-x');
    header.classList.remove("sticky");
    logo2.classList.remove("sticky");
    burger.classList.remove("sticky");
  }
});


function hal() {
  if (document.body.id === "halaman1") {
    let nav = document.querySelector(".link:nth-child(1)");
    nav.classList.add("active");
  } else if (document.body.id === "halaman2") {
    let nav = document.querySelector(".link:nth-child(3)");
    nav.classList.add("active");
  }
}

function burger() {
  const box = document.querySelector(".box");
  const a = document.querySelector(".menuNya");
  box.addEventListener("click", () => {
    a.classList.toggle("active");
  });
}
hal();
burger();

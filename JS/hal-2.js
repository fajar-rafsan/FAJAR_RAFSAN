

const contentProduk = document.querySelector(".content-Produk");
const next = document.getElementById("next");
const prev = document.getElementById("prev");




next.addEventListener("click", () => {
  contentProduk.scrollLeft += 450;
});

prev.addEventListener("click", () => {
    contentProduk.scrollLeft += -450;
  });
  


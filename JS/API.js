async function GetProduct() {
  try {
    const response = await fetch("https://fake-coffee-api.vercel.app/api", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(
        "response get produk terdapat eror " + response.statusText
      );
    }

    const data = await response.json();
    localStorage.setItem("dataAPI1", JSON.stringify(data));
  } catch (error) {
    console.error("Ada masalah dengan operasi pengambilan", error);
  }
}

function tampilin() {
  const tampilProduk = document.querySelectorAll(
    ".main-Produk .content-Produk .produk"
  );
  const data = localStorage.getItem("dataAPI1");
  if (data) {
    const ubah = JSON.parse(data);
    tampilProduk.forEach((produk, index) => {
      produk.classList.add(`produk${index}`);
      const img = document.querySelector(`.produk${index} img`);
      const deskripsi = document.querySelector(`.produk${index} .deskripsi`);

      const des = document.createElement("h1");
      const teks = document.createElement("p");
      const teks2 = document.createElement("p");
      const button = document.createElement("button");

      teks.classList.add("detail");
      teks2.classList.add("price");

      des.textContent = ubah[index].name;
      teks.textContent = ubah[index].description;
      teks2.textContent = `$ ${ubah[index].price}`;
      button.textContent = "Detail";

      img.classList.add("img-Produk");
      img.src = ubah[index].image_url;

      produk.appendChild(img);
      produk.appendChild(deskripsi);

      deskripsi.appendChild(des);
      deskripsi.appendChild(teks);
      deskripsi.appendChild(teks2);
      deskripsi.appendChild(button);

      button.addEventListener("click", () => {
        localStorage.setItem("id", JSON.stringify(ubah[index - 1].id));
        window.location.href = "/HTML/detail-Produk.html";
      });

      index++;
    });
  } else {
    console.error("Tidak ada data di LocalStorage");
  }
}

async function GetProduct2() {
  try {
    const response = await fetch("https://api.sampleapis.com/coffee/hot", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(
        "response get produk terdapat eror " + response.statusText
      );
    }

    const data = await response.json();
    localStorage.setItem("dataAPI2", JSON.stringify(data));
  } catch (error) {
    console.error("Ada masalah dengan operasi pengambilan", error);
  }
}

function tampilin2() {
  const imgView = document.querySelector(".view .imgView img");
  const data = localStorage.getItem("dataAPI2");
  const ubah = JSON.parse(data);
  imgView.src = ubah[0].image;
}

function tampilin3() {
  const imgView = document.querySelector(".view2 .imgView img");
  const data = localStorage.getItem("dataAPI2");
  const ubah = JSON.parse(data);
  imgView.src = ubah[1].image;
}

GetProduct2().then(() => tampilin2());
GetProduct2().then(() => tampilin3());
GetProduct().then(() => tampilin());

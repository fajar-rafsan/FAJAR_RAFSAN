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

function detProduk() {
  const h1 = document.querySelector(".bar-page h1");
  const img = document.querySelector(".detail-produk .fotoProduk");
  const namaProduk = document.querySelector(
    ".detail-produk .aside-produk .nama-produk"
  );
  const hargaProduk = document.querySelector(
    ".detail-produk .aside-produk .price-produk"
  );
  const desProduk = document.querySelector(
    ".detail-produk .aside-produk .des-produk"
  );
  const weightProduk = document.querySelector(
    ".detail-produk .aside-produk .reg .weight-produk"
  );
  const regionProduk = document.querySelector(
    ".detail-produk .aside-produk .reg .region-produk"
  );
  //   const asideProduk = document.querySelector(
  //     ".main-produkNya .detail-produk .aside-produk"
  //   );
  //   const regProduk = document.querySelector(
  //     ".main-produkNya .detail-produk .aside-produk .reg"
  //   );

  //   const button = document.querySelector(
  //     ".main-produkNya .detail-produk .aside-produk button"
  //   );
  let containerOption = document.querySelector(".con-option");

  const get = localStorage.getItem("dataAPI1");
  const id = localStorage.getItem("id");
  const ubah = JSON.parse(get);

  ubah.forEach((element) => {
    if (element.id == id) {
      h1.textContent = element.name;
      img.src = element.image_url;

      namaProduk.textContent = element.name;

      hargaProduk.textContent = `$.${element.price}`;
      desProduk.textContent = element.description;

      weightProduk.textContent = `WEIGHT : ${element.weight}`;
      regionProduk.textContent = `REGION : ${element.region}`;

      const p = document.createElement("p");
      p.classList.add("duh");
      const reg = document.querySelector(" .detail-produk .aside-produk .reg");
      p.textContent = "Flavor option";
      reg.insertAdjacentElement("afterend", p);

      element.flavor_profile.forEach((elemen) => {
        const option = document.createElement("div");
        option.classList.add("parag");
        option.textContent = elemen;
        containerOption.appendChild(option);
      });

      const duh = document.querySelectorAll(".con-option .parag");
      optionNya(duh);
    }
  });
}

function optionNya(element1) {
  let tamp = null;
  element1[0].id = "active";
  element1.forEach((element) => {
    element.addEventListener("click", () => {
      element1[0].removeAttribute("id");
      if (tamp) {
        tamp.removeAttribute("id");
      }
      element.id = "active";
      tamp = element;
    });
  });
}

function sku() {
  const sum = document.querySelector(".tambah"),
    angka = document.querySelector(".angka"),
    kurang = document.querySelector(".minus");
  console.log(angka.textContent);

  let a = 1;

  sum.addEventListener("click", () => {
    if (a < 10) {
      a++;
      a = a < 10 ? "0" + a : a;
      console.log(angka);
      angka.textContent = a;
    }
  });

  kurang.addEventListener("click", () => {
    if (a > 1) {
      a--;
      a = a < 10 ? "0" + a : a;
      console.log(angka);
      angka.textContent = a;
    }
  });
}

GetProduct().then(() => {
  detProduk();
});

sku();

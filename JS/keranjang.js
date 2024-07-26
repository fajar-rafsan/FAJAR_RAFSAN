//function untuk subtotal

function divTotallansung(harga) {
  const baru = document.querySelector(".aside .total-send .harga");
  baru.textContent = harga;
  // console.log(angka);
}

function divTotal(hargaNya) {
  const aside = document.querySelector(".aside");

  // Buat elemen baru
  const baru = document.createElement("div");
  const subTotal = document.createElement("p");
  // const harga = document.querySelector(".aside .total-send .harga");
  const button = document.createElement("button");
  const harga = document.createElement("p");
  harga.classList.add("harga");

  // Tambahkan kelas CSS

  baru.classList.add("total-send");
  subTotal.classList.add("subtotal");
  button.classList.add("checkout");

  // Setel teks konten untuk elemen
  subTotal.textContent = "SUBTOTAL";
  button.textContent = "CHECKOUT";
  harga.textContent = hargaNya; // Gantilah simbol mata uang jika diperlukan
  // console.log(harga);

  // Tambahkan elemen ke dalam div baru
  baru.appendChild(subTotal);
  baru.appendChild(harga);

  // Tambahkan div baru dan tombol ke dalam elemen .aside
  aside.appendChild(baru);
  aside.appendChild(button);

  button.addEventListener("click",()=>{
    window.location.href = "/HTML/checkout.html"
  })

  // console.log(`Harga Total: Rp${hargaNya}`);

  // Simpan harga ke localStorage jika diperlukan
  // localStorage.setItem("subtotal", hargaNya);
}

function sidebarCart() {
  const tekan = document.querySelector("header .logo2"); //untuk mengambil elemen logo cart
  const asidebar = document.querySelector(".aside"); //untuk ambil elemen asidenya
  const tekanKembali = document.querySelector(".aside .bungkus button");
  // console.log(tekan);
  //setelah kita tekan logo cart akan masuk kondisi
  tekan.addEventListener("click", () => {
    asidebar.classList.add("active"); //maka kita tambahkan class pada asidebarnya
    document.body.style.overflow = "hidden";
  });

  tekanKembali.addEventListener("click", () => {
    asidebar.classList.remove("active"); //maka kita hapus class pada asidebarnya
    document.body.style.overflow = ""; // untuk ke body yang semula
  });
}

function setKeranjang() {
  const getProduk = localStorage.getItem("dataAPI1");
  const produk = JSON.parse(getProduk);
  const idProduk = localStorage.getItem("id");
  const button = document.getElementById("entah-button");
  button.addEventListener("click", () => {
    let jumlah = document.getElementById("jumlah").innerText;
    let hasil = parseInt(jumlah, 10);
    produk.forEach((element) => {
      if (idProduk == element.id) {
        masukkan(element.name, idProduk, hasil, element.price);
      }
    });
  });
}

function masukkan(namaProduk, idProduk, jumlahProduk, hargaProduk) {
  const produk = localStorage.getItem("keranjangNya");

  let harga = hargaProduk * jumlahProduk;

  console.log(harga);
  if (!produk) {
    const baru = [
      {
        id: idProduk,
        jumlah: jumlahProduk,
      },
    ];

    localStorage.setItem("keranjangNya", JSON.stringify(baru));
    localStorage.setItem("subtotal", harga);

    tampilLansung(idProduk, jumlahProduk);
  } else {
    let hargaLokal = localStorage.getItem("subtotal");
    const ubah = JSON.parse(produk);

    let ditemukan = false;
    let tampLokal = Number(hargaLokal);
    let tampHarga = Number(hargaProduk);
    let tampJumlah = Number(jumlahProduk);
    ubah.forEach((elemen) => {
      if (elemen.id == idProduk) {
        elemen.jumlah += jumlahProduk;
        ditemukan = true;

        tampilLansungQuan(namaProduk, jumlahProduk);
      }
    });
    if (!ditemukan) {
      ubah.push({
        id: idProduk,
        jumlah: jumlahProduk,
      });
      tampilLansung(idProduk, jumlahProduk);
    }
    tampLokal += tampHarga * tampJumlah;
    localStorage.setItem("keranjangNya", JSON.stringify(ubah));
    localStorage.setItem("subtotal", tampLokal);
    divTotallansung(tampLokal);
  }
}

function tampilKeranjang() {
  const apiProduk = localStorage.getItem("dataAPI1");
  const produk = localStorage.getItem("keranjangNya");
  const tamp = document.querySelector(".aside .con-keran-produk");

  let harga = 0;
  let tampHarga;
  let tampJumlah;

  if (apiProduk && produk) {
    const APIparse = JSON.parse(apiProduk);
    const parse = JSON.parse(produk);

    parse.forEach((keranjangItem) => {
      const produkItem = APIparse.find(
        (elemen) => elemen.id == keranjangItem.id
      );
      if (produkItem) {
        // console.log(produkItem);
        const keranProduk = document.createElement("div");
        keranProduk.classList.add("keran-produk");

        const desProduk = document.createElement("div");
        desProduk.classList.add("des-produk");

        const namaProduk = document.createElement("p");
        namaProduk.classList.add("nama-produk");
        namaProduk.textContent = produkItem.name;

        const buttonProduk = document.createElement("button");
        buttonProduk.classList.add("button-produk");
        buttonProduk.textContent = "x";

        const quantity = document.createElement("p");
        quantity.classList.add("quantity");
        quantity.textContent = `Quantity: ${keranjangItem.jumlah}`;

        const hargaProduk = document.createElement("p");
        hargaProduk.classList.add("harga-produk");
        hargaProduk.textContent = `$${produkItem.price}`;

        tampHarga = Number(produkItem.price);
        tampJumlah = Number(keranjangItem.jumlah);
        harga += tampHarga * tampJumlah;
        // console.log(harga);
        // hargaProduk.textContent = `$${harga}`;

        desProduk.appendChild(namaProduk);
        desProduk.appendChild(quantity);
        desProduk.appendChild(hargaProduk);
        desProduk.appendChild(buttonProduk);

        const img = document.createElement("img");
        img.src = produkItem.image_url;

        keranProduk.appendChild(img);
        keranProduk.appendChild(desProduk);
        desProduk.insertAdjacentElement("beforebegin", img);

        tamp.appendChild(keranProduk);
      }
    });
  }
  // console.log(harga);
  divTotal(harga);
  hapusKeranjang();
}

function tampilLansungQuan(name, tambah) {
  // const apiProduk = localStorage.getItem("dataAPI1");
  const tamp = document.querySelectorAll(".keran-produk");
  tamp.forEach((elemen) => {
    const tamp2 = elemen
      .querySelector(".des-produk .nama-produk")
      .textContent.trim();
    if (tamp2 == name) {
      console.log(tamp2);
      console.log(name);
      const tamp3 = elemen.querySelector(".des-produk .quantity");
      const number = Number(tamp3.textContent.replace(/[^0-9.-]+/g, ""));
      const number2 = Number(tambah, 10);

      const produkQuan = number + number2;

      tamp3.textContent = `Quantity: ${produkQuan}`;
    }
  });
}

function tampilLansung(id, jmlh) {
  const apiProduk = localStorage.getItem("dataAPI1");
  // const produk = localStorage.getItem("keranjangNya");
  const tamp = document.querySelector(".aside .con-keran-produk");
  if (apiProduk) {
    const APIparse = JSON.parse(apiProduk);
    const produkItem = APIparse.find((elemen) => elemen.id == id);
    if (produkItem) {
      // console.log(produkItem);
      const keranProduk = document.createElement("div");
      keranProduk.classList.add("keran-produk");

      const desProduk = document.createElement("div");
      desProduk.classList.add("des-produk");

      const namaProduk = document.createElement("p");
      namaProduk.classList.add("nama-produk");
      namaProduk.textContent = produkItem.name;

      const buttonProduk = document.createElement("button");
      buttonProduk.classList.add("button-produk");
      buttonProduk.textContent = "x";

      let angka = Number(jmlh, 10);
      const quantity = document.createElement("p");
      quantity.classList.add("quantity");

      if (angka == 0) {
        quantity.textContent = `Quantity: ${id.jumlah}`;
      } else {
        quantity.textContent = `Quantity: ${angka}`;
      }

      const hargaProduk = document.createElement("p");
      hargaProduk.classList.add("harga-produk");
      hargaProduk.textContent = `$${produkItem.price}`;

      desProduk.appendChild(namaProduk);
      desProduk.appendChild(quantity);
      desProduk.appendChild(hargaProduk);
      desProduk.appendChild(buttonProduk);

      const img = document.createElement("img");
      img.src = produkItem.image_url;

      keranProduk.appendChild(img);
      keranProduk.appendChild(desProduk);
      desProduk.insertAdjacentElement("beforebegin", img);

      tamp.appendChild(keranProduk);
      console.log(keranProduk);
    }
  }
  hapusKeranjang();
}

function hapusKeranjang() {
  const buttonHapus = document.querySelectorAll(".keran-produk .button-produk"); //untuk mengambil elemen button yang berada dalam item keranjang produk
  const elemenSub = document.querySelector(".aside .total-send .harga"); // untuk mengambil elemen harga
  const buttonCheckout = document.querySelector(".checkout");

  buttonHapus.forEach((elemen) => {
    // bentuk nodelist jadi kita perulangkan
    elemen.addEventListener("click", () => {
      // apabila node button itu salah satu kita tekan akan masuk kondisi

      const keranjang = localStorage.getItem("keranjangNya"); //untuk mengambil data di localstorage dengan value 'keranjangNya'
      const parseKer = JSON.parse(keranjang); // mengubah manjadi JSON object
      const subtotal = localStorage.getItem("subtotal"); // untuk mengambil data subtotal untuk di kurangkan
      const idProduk = localStorage.getItem("dataAPI1"); //untuk mengambil data di localstorage dengan value 'dataAPI1'
      const parse = JSON.parse(idProduk); //setelah itu kita ubah menjadi JSON

      const des = elemen.parentElement; // untuk mengambil paren elemen button
      const keran = des.parentElement; // untuk mengambil paren elemen si class = 'des-produk'

      const harga = des.querySelector(".harga-produk");
      const tampharga = harga.textContent.trim();
      console.log(tampharga);
      let parseAngka = tampharga.replace("$", "");
      // console.log(asli);
      let parseInt = Number(parseAngka);
      let subTotalInt = Number(subtotal);
      let asli = 0;

      if (subTotalInt > parseInt) {
        asli = subTotalInt - parseInt;
      } else {
        asli = parseInt - subTotalInt;
      }
      let result = parseFloat(asli.toFixed(2));

      elemenSub.textContent = result;

      const quantity = des.querySelector(".nama-produk"); //untuk mengambil elemen nama-produk//
      const tampnama = quantity.textContent.trim(); //setelah itu diambil isi nya saja//
      //   const pisah = tampQuan.split(" "); // setelah itu kita pecah untuk mengambil 'angkanya saya'
      //   const ambil = pisah[1]; //untuk masukan angka ke variabel baru
      const tamp = parse.filter((elemen) => {
        return elemen.name == tampnama; //untuk mencari quantity yang sama apabila sam akan masuk ke variabel tamp. untuk penghapusan id di localstorage
        //    console.log(elemen.jumlah);
      });
      let index = 0;
      const tamp2 = parseKer.filter((elemen) => {
        index++;
        return elemen.id != tamp[0].id; //untuk mencari ID yang sama apabila sam akan masuk ke variabel tamp. untuk penghapusan id di localstorage
      });

      // if(tamp2.length==0){
      //   buttonCheckout.remove();
      // }

      console.log(tamp2);
      localStorage.setItem("keranjangNya", JSON.stringify(tamp2)); //memasukkan kembali data ke localStorage yang setelah dihapus
      localStorage.setItem("subtotal", result);
      keran.remove(); // menghapus elemen keranjang untuk menghapus item produk keranjang
    });
  });
}

setKeranjang();
tampilKeranjang();
sidebarCart();

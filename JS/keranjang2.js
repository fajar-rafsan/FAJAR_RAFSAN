//untuk menampilkan keranjang
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

function tampilanKeranjang() {
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
  divTotal(harga);
  hapusKeranjang(); // function hapus item produk di dalam keranjang
}

function hapusKeranjang() {
  const buttonHapus = document.querySelectorAll(".keran-produk .button-produk"); //untuk mengambil elemen button yang berada dalam item keranjang produk
  const elemenSub = document.querySelector(".aside .total-send .harga"); // untuk mengambil elemen harga

  const idProduk = localStorage.getItem("dataAPI1"); //untuk mengambil data di localstorage dengan value 'dataAPI1'

  const parse = JSON.parse(idProduk); //setelah itu kita ubah menjadi JSON
  // mengubah manjadi JSON object

  buttonHapus.forEach((elemen) => {
    // bentuk nodelist jadi kita perulangkan
    elemen.addEventListener("click", () => {
      const keranjang = localStorage.getItem("keranjangNya"); //untuk mengambil data di localstorage dengan value 'keranjangNya'
      const parseKer = JSON.parse(keranjang);
      const subtotal = localStorage.getItem("subtotal"); // untuk mengambil data subtotal untuk di kurangkan

      // apabila node button itu salah satu kita tekan akan masuk kondisi
      // console.log(elemen);
      const des = elemen.parentElement; // untuk mengambil paren elemen button
      const keran = des.parentElement; // untuk mengambil paren elemen si class = 'des-produk'
      // console.log(keran);

      const harga = des.querySelector(".harga-produk");
      const tampharga = harga.textContent.trim();
      let parseAngka = tampharga.replace("$", "");
      let parseInt = Number(parseAngka);
      let subTotalInt = Number(subtotal);
      let asli = subTotalInt - parseInt;
      let result = parseFloat(asli.toFixed(2));
      if (asli < 0) {
        asli = 0;
      }
      console.log(subTotalInt);
      console.log(asli);

      elemenSub.textContent = result;

      const namaProduk = des.querySelector(".nama-produk"); //untuk mengambil elemen nama-produk//
      const tampnama = namaProduk.textContent.trim(); //setelah itu diambil isi nya saja//
      //   const pisah = tampQuan.split(" "); // setelah itu kita pecah untuk mengambil 'angkanya saya'
      //   const ambil = pisah[1]; //untuk masukan angka ke variabel baru
      const tamp = parse.filter((elemen) => {
        return elemen.name == tampnama; //untuk mencari nama yang sama apabila sama akan masuk ke variabel tamp. untuk penghapusan id di localstorage
      });
      console.log(tamp);
      const tamp2 = parseKer.filter((elemen) => {
        return elemen.id != tamp[0].id; //untuk mencari ID yang sama apabila sam akan masuk ke variabel tamp. untuk penghapusan id di localstorage
      });
      // console.log(tamp[0].id);
      console.log(tamp2);
      localStorage.setItem("keranjangNya", JSON.stringify(tamp2)); //memasukkan kembali data ke localStorage yang setelah dihapus
      localStorage.setItem("subtotal", result);
      keran.remove(); // menghapus elemen keranjang untuk menghapus item produk keranjang
    });
  });
}

tampilKeranjang();
tampilanKeranjang();

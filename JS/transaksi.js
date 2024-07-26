function selesai() {
  const bungkus = document.querySelector(".complet");
  const end = document.querySelector(".end");
  const overlay = document.querySelector("#overlay");
  const kota = document.getElementById("kota");
  const prov = document.getElementById("provinsi");
  const alamat = document.getElementById("alamat");
  const tamp = kota.options[kota.selectedIndex].text;
  const tamp2 = prov.options[prov.selectedIndex].text;
  const tamp3 = alamat.value;
  console.log(tamp);
  end.addEventListener("click", () => {
    const valueKota = document.createElement("p");
    const valueProv = document.createElement("p");
    const valueAlamat = document.createElement("p");
    const button = document.createElement("button");
    button.classList.add("buttonNya");
    valueKota.textContent = tamp;
    valueProv.textContent = tamp2;
    valueAlamat.textContent = tamp3;
    button.textContent = "TERIMA KASIH"
    // button.type ="submit"
    bungkus.appendChild(valueKota);
    bungkus.appendChild(valueProv);
    bungkus.appendChild(valueAlamat);
    bungkus.appendChild(button);
    overlay.classList.add("active");
    bungkus.classList.add("active");
    // Memeriksa apakah tombol ditemukan
        // Menambahkan event listener untuk event klik
        button.addEventListener('click', function(event) {
            // Mengarahkan ke halaman checkout
            window.location.href = "/HTML/index.html";
        });    
  });
}

function tampilTransaksi() {
  const apiProduk = localStorage.getItem("dataAPI1");
  const produk = localStorage.getItem("keranjangNya");
  const subtotal = localStorage.getItem("subtotal");
  const asideKiri = document.querySelector("#kiri .barang-barang");
  const Kiri = document.getElementById("kiri");

  const tagBungkus = document.createElement("div");
  const tagTotal = document.createElement("p");
  const tagSubTotal = document.createElement("p");

  tagBungkus.classList.add("bungkus-total");
  tagTotal.classList.add("teks");
  tagSubTotal.classList.add("sub-total");

  tagTotal.textContent = "TOTAL";
  tagSubTotal.textContent = `$${subtotal}`;
  tagBungkus.appendChild(tagTotal);
  tagBungkus.appendChild(tagSubTotal);

  if (apiProduk && produk) {
    const APIparse = JSON.parse(apiProduk);
    const parse = JSON.parse(produk);
    parse.forEach((keranjangItem) => {
      const produkItem = APIparse.find(
        (elemen) => elemen.id == keranjangItem.id
      );
      if (produkItem) {
        console.log("Fdf");
        const bungkus = document.createElement("div");
        const bungkus2 = document.createElement("div");
        const nama = document.createElement("p");
        const harga = document.createElement("p");
        const img = document.createElement("img");

        bungkus.classList.add("bungkus");
        bungkus2.classList.add("bungkus2");
        nama.classList.add("nama");
        harga.classList.add("harga");
        img.classList.add("img");

        img.src = produkItem.image_url;
        nama.textContent = produkItem.name;
        let tamp = Number(produkItem.price * keranjangItem.jumlah);
        harga.textContent = `$${tamp}`;

        console.log(harga.textContent);

        bungkus.appendChild(img);
        bungkus2.appendChild(nama);
        bungkus2.appendChild(harga);
        asideKiri.appendChild(bungkus);
        bungkus.appendChild(bungkus2);
      }
    });
  }
  Kiri.appendChild(tagBungkus);
}

tampilTransaksi();
selesai();
// console.log("fdf")

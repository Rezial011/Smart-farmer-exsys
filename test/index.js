const data = {
  padi: {
    desc: "Tanaman padi (Oryza sativa L.) merupakan tanaman semusim dengan morfologi berbatang bulat dan berongga yang disebut jerami. Daunnya memanjang dengan ruas searah batang daun. Pada batang utama dan anakan membentuk rumpun pada fase vegetatif dan membentuk malai pada fase generatif. produk yang dihasilkan berupa beras, makanan pokok di Indonesia",
    air: {
      kebutuhan: "butuh banyak air (genangan kontinu)",
      literBase: 50 / 20,
      satuan: "liter per m²",
      alasan:
        "Padi memerlukan genangan air untuk mencegah gulma dan mendukung pembentukan anakan.",
    },
    pupuk: {
      jenis: "Urea, SP-36, KCl",
      alasan:
        "Ketiga pupuk ini memberikan nitrogen, fosfor, dan kalium yang krusial pada berbagai fase pertumbuhan padi.",
    },
    penyakitMap: {
      stres: {
        penyakit: "Stres pasca tanam",
        vitamin: "Vitamin B1 (Thiamine)",
        alasan:
          "Thiamine membantu pemulihan akar dan pertumbuhan setelah transplantasi atau cuaca ekstrem.",
      },
      "layu dan kuning": {
        penyakit: "Kekurangan Hara (Zn, Fe)",
        vitamin: "Pupuk mikro seperti Zn dan Fe",
        alasan:
          "Kekurangan mikronutrien menyebabkan klorosis, layu, dan pertumbuhan tidak optimal.",
      },
      "bercak daun": {
        penyakit: "Blast (Pyricularia oryzae)",
        vitamin: "Fungisida spesifik",
        alasan:
          "Blast ditandai dengan bercak lonjong coklat keabu-abuan yang bisa merusak produktivitas.",
      },
    },
  },
  "lidah buaya": {
    desc: "Lidah buaya, atau Aloe vera, adalah tanaman berdaun berdaging yang terkenal karena manfaatnya dalam perawatan kulit dan kesehatan. Tanaman ini memiliki daun panjang, berdaging, dan berlekuk yang mengandung gel bening yang kaya akan nutrisi.",
    air: {
      kebutuhan: "butuh sedikit air",
      literBase: 50 / 0.1,
      satuan: "liter per tanaman",
      alasan:
        "Sebagai tanaman sukulen, lidah buaya menyimpan air dalam daunnya dan sensitif terhadap kelembaban berlebih.",
    },
    pupuk: {
      jenis: "Kompos / pupuk majemuk dosis rendah",
      alasan:
        "Nutrisi berlebih bisa membuat lidah buaya busuk. Pupuk cukup 1-2 kali per tahun.",
    },
    penyakitMap: {
      "akar busuk": {
        penyakit: "Busuk Akar",
        vitamin: "Kurangi air dan pastikan drainase",
        alasan:
          "Busuk akar disebabkan oleh kelembaban berlebih dan aerasi tanah yang buruk.",
      },
      stres: {
        penyakit: "Stres lingkungan",
        vitamin: "Stabilkan suhu dan pencahayaan",
        alasan:
          "Fluktuasi suhu atau pencahayaan ekstrem menyebabkan stres dan pertumbuhan lambat.",
      },
    },
  },
  kopi: {
    desc: "Kopi termasuk kelompok tanaman semak belukar dengan genius Coffea. Kopi termasuk ke dalam family Rubiaceae, subfamily lxoroideae, dan suku Coffeae. Seorang bernama Linnaeus merupakan orang yang pertama mendeskripsikan spesies kopi (Coffea arabica) pada tahun 1753. Produk yang dihasilkan berupa biji kopi yang dapat diolah menjadi minuman",
    air: {
      kebutuhan:
        "kebutuhan air normal (tidak terlalu banyak tidak terlalu sedikit)",
      literBase: 50 / 4,
      satuan: "liter per pohon",
      alasan:
        "Kopi memerlukan pasokan air stabil, terutama saat pembentukan bunga dan buah.",
    },
    pupuk: {
      jenis: "NPK Seimbang + pupuk mikro",
      alasan:
        "Keseimbangan NPK penting untuk daun, akar, dan buah, ditambah mikronutrien untuk hasil optimal.",
    },
    penyakitMap: {
      stres: {
        penyakit: "Stres karena kekeringan atau shock",
        vitamin: "ZPT atau mikronutrien",
        alasan:
          "ZPT membantu tanaman pulih dari stres fisiologis atau adaptasi lingkungan baru.",
      },
      "bercak daun": {
        penyakit: "Karat Daun (Hemileia vastatrix)",
        vitamin: "Fungisida dan varietas tahan",
        alasan:
          "Karat daun menyebabkan kehilangan daun dan hasil, dan harus dikendalikan sejak dini.",
      },
    },
  },
};

// deskripsi & name
const plants = document.querySelectorAll('input[name="tanaman"]');
plants.forEach((plant) => {
  plant.addEventListener("change", () => {
    const plantName = plant.value
    console.log("nama tanaman " + plant.value);

    document.querySelector("#name").innerText = plantName.charAt(0).toUpperCase() + plantName.slice(1);
    document.querySelector("#desc").innerText = data[plantName].desc;
    document.querySelector("#air").innerText = data[plantName].air.kebutuhan;

  // document.querySelector('#pemberianAir').innerHTML = `Menyiram ${document.querySelector('#cuaca').value / data[plantName].air.literBase} ${data[plantName].air.satuan}`
    air(plantName)
    fisik(data[plantName].penyakitMap);

    pemberianPupuk(plantName)

    reset()
  });
});

// radio penyakit
const fisik = (arr) => {
  // arr ngambil objek nama penyakit

  document.querySelector("#fisik").innerHTML = "";
  document.querySelector("#fisik").innerHTML = "<b>Fisik tanaman</b>";
  document.querySelector("#fisik").append(document.createElement('br'));

  for (const key in arr) {
    const input = document.createElement("input");

    input.setAttribute("name", "kondisi");
    input.setAttribute("type", "radio");
    input.setAttribute("value", key);

    const label = document.createElement("label");
    label.append(input);
    label.append(key);
    
    document.querySelector("#fisik").append(label);
    document.querySelector("#fisik").append(document.createElement('br'));

    console.log("kondisi " + key) // dari nama penyakit (dilooping satu satu)

    input.addEventListener("change", () => {
    if (input.checked) {
      kondisi()
    }
  });
  }
};

// deskripsi penyakit
const kondisi = () => {
  const plantName = document.querySelector('input[name="tanaman"]:checked').value;
  const penyakitName = document.querySelector('input[name="kondisi"]:checked').value;
  console.log("nama + penyakit " + plantName + penyakitName) // ngambil nama tanaman + penyakit dari radio yang dicentang
  
  pemberianVit(plantName, penyakitName)
}

// cuaca
const range = document.querySelector('#cuaca')
let cuaca = range.value
range.addEventListener('input', () => {
  cuaca = parseInt(range.value)
  tanah(cuaca)

  const plantName = document.querySelector('input[name="tanaman"]:checked').value;
  air(plantName)
})

// output 
const air = (plantName) => {
  cuaca = parseInt(range.value) / data[plantName].air.literBase
  console.log(cuaca)

  if (parseInt(range.value) > 25) {
    document.querySelector('#pemberianAir').innerHTML = `Menyiram ${cuaca} ${data[plantName].air.satuan}`
  } else {
    document.querySelector('#pemberianAir').innerHTML = `Tidak perlu penyiraman`
  }
}

const pemberianVit = (plantName, penyakitName) => {
  const pemberianVit = document.querySelector('#pemberianVit')
  pemberianVit.innerText = `Memberikan ${data[plantName].penyakitMap[penyakitName].vitamin}`

  document.getElementById("penyakitName").innerHTML = `<b>Penyakit :  ${data[plantName].penyakitMap[penyakitName].penyakit}</b>`;
  document.getElementById("vitamin").innerHTML = `<b>Obat / Vit </b> : ${data[plantName].penyakitMap[penyakitName].vitamin}`;
  document.getElementById("penyakitDesc").innerText = data[plantName].penyakitMap[penyakitName].alasan;
}

const pemberianPupuk = (plantName) => {
  console.log('pupuk')
  const pemberianPupuk = document.querySelector('#pemberianPupuk')
  pemberianPupuk.innerText = `Memberi pupuk ${data[plantName].pupuk.jenis}`
  
  document.getElementById("pupukName").innerHTML = `<b>Pupuk :  ${data[plantName].pupuk.jenis}</b>`;
  document.getElementById("penjelasanPupuk").innerText = data[plantName].pupuk.alasan; 
}

const tanah = (range) => {
  let kondisiTanah = ''
  
  if (range <= 15) {
    kondisiTanah = 'Basah'
  } else if (range < 30) {
    kondisiTanah = 'Lembab'
  } else if (range < 70) {
    kondisiTanah = 'Normal'
  } else if (range < 85) {
    kondisiTanah = 'Kering'
  } else if (range <= 100) {
    kondisiTanah = 'Sangat kering'
  } 
  console.log(range)
  document.querySelector("#tanah").innerHTML = kondisiTanah
}

// reset
document.querySelector('#delete').addEventListener('click', () => {
  document.querySelectorAll('input[name="kondisi"]').forEach(radio => {
    radio.checked = false;
  });

})

const reset = () => {
  document.getElementById("penyakitName").innerHTML = ``;
  document.getElementById("vitamin").innerHTML = ``;
  document.getElementById("penyakitDesc").innerHTML = ``;
  document.querySelector('#pemberianVit').innerHTML = ``
}
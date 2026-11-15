// Bandlik darajasini aniqlash
function bandlikDarajasi(foiz) {
  if (foiz < 40) return { matn: "Kam", klass: "kam", belgi: "🟢" };
  if (foiz < 70) return { matn: "O'rtacha", klass: "ortacha", belgi: "🟡" };
  return { matn: "Ko'p", klass: "kop", belgi: "🔴" };
}

function kategoriyaBelgisi(id) {
  const k = KATEGORIYALAR.find(k => k.id === id);
  return k ? k.belgi : "📍";
}

let tanlanganKategoriya = null;

// Kategoriyalarni chizish
function kategoriyalarniChiz() {
  const joy = document.getElementById("kategoriyalar");
  joy.innerHTML = KATEGORIYALAR.map(k => `
    <div class="kategoriya ${tanlanganKategoriya === k.id ? "faol" : ""}" data-id="${k.id}">
      <div class="belgi">${k.belgi}</div>
      ${k.nomi}
    </div>`).join("");

  joy.querySelectorAll(".kategoriya").forEach(el => {
    el.onclick = () => {
      const id = el.dataset.id;
      tanlanganKategoriya = tanlanganKategoriya === id ? null : id;
      kategoriyalarniChiz();
      joylarniChiz();
    };
  });
}

// Joylar ro'yxatini chizish
function joylarniChiz() {
  const soz = document.getElementById("qidiruv").value.toLowerCase();

  const natija = JOYLAR
    .filter(j => !tanlanganKategoriya || j.kategoriya === tanlanganKategoriya)
    .filter(j => j.nomi.toLowerCase().includes(soz))
    .sort((a, b) => a.band - b.band); // eng kam band joy tepada ("aqlli tavsiya")

  const joy = document.getElementById("joylar");
  if (natija.length === 0) {
    joy.innerHTML = `<p class="izoh">Hech narsa topilmadi 😕</p>`;
    return;
  }

  joy.innerHTML = natija.map(j => {
    const d = bandlikDarajasi(j.band);
    return `
      <a class="karta" href="place.html?id=${j.id}">
        <div class="karta-rasm">${kategoriyaBelgisi(j.kategoriya)}</div>
        <div>
          <h3>${j.nomi}</h3>
          <div class="bosh ${d.klass}">🕒 ${j.bosh} ta ${j.birlik}</div>
          <div class="izoh">Hozir bandlik: <b class="${d.klass}">${d.matn}</b> (${j.band}%)</div>
        </div>
      </a>`;
  }).join("");
}

document.getElementById("qidiruv").addEventListener("input", joylarniChiz);
kategoriyalarniChiz();
joylarniChiz();

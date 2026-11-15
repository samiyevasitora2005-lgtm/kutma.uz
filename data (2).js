// KUTMA — joylar ma'lumotlari (keyinchalik Firebase'ga ko'chiriladi)
// band: 0-100 (foiz). bandlik: soatlar bo'yicha (10:00 dan 22:00 gacha)
const KATEGORIYALAR = [
  { id: "restoran", nomi: "Restoranlar", belgi: "🍔" },
  { id: "sartarosh", nomi: "Sartaroshxona", belgi: "✂️" },
  { id: "salon", nomi: "Go'zallik salonlari", belgi: "💅" },
  { id: "qahva", nomi: "Qahvaxona", belgi: "☕" }
];

const JOYLAR = [
  {
    id: 1, nomi: "Registon Kafesi", kategoriya: "restoran",
    ishVaqti: "12:30 - 22:00", manzil: "Samarqand, Registon maydoni yaqinida",
    lat: 39.6548, lng: 66.9757,
    jami: 25, bosh: 4, birlik: "bo'sh stol", band: 30,
    bandlik: [10, 20, 45, 60, 40, 30, 35, 55, 75, 80, 60, 40, 20],
    menyu: [
      { nomi: "Osh", narx: 35000, bor: true },
      { nomi: "Manti", narx: 25000, bor: true },
      { nomi: "Samarqand oshi", narx: 40000, bor: false },
      { nomi: "Somsa", narx: 8000, bor: true }
    ]
  },
  {
    id: 2, nomi: "Afrosiyob Coffee", kategoriya: "qahva",
    ishVaqti: "08:00 - 23:00", manzil: "Samarqand, Universitet xiyoboni",
    lat: 39.6546, lng: 66.9600,
    jami: 15, bosh: 3, birlik: "bo'sh o'rin", band: 55,
    bandlik: [30, 50, 60, 55, 45, 40, 50, 65, 70, 60, 50, 35, 20],
    menyu: [
      { nomi: "Latte", narx: 22000, bor: true },
      { nomi: "Kapuchino", narx: 20000, bor: true },
      { nomi: "Sendvich", narx: 30000, bor: false },
      { nomi: "Shokoladli keks", narx: 18000, bor: true }
    ]
  },
  {
    id: 3, nomi: "Bibixonim Go'zallik Saloni", kategoriya: "salon",
    ishVaqti: "09:00 - 20:00", manzil: "Samarqand, Toshkent ko'chasi (Bibixonim yonida)",
    lat: 39.6603, lng: 66.9794,
    jami: 6, bosh: 1, birlik: "bo'sh usta", band: 85,
    bandlik: [20, 40, 70, 85, 90, 80, 70, 85, 90, 60, 30, 0, 0],
    menyu: [
      { nomi: "Manikyur", narx: 80000, bor: true },
      { nomi: "Soch turmaklash", narx: 120000, bor: false },
      { nomi: "Pardoz", narx: 150000, bor: true }
    ]
  },
  {
    id: 4, nomi: "Samarqand Barber", kategoriya: "sartarosh",
    ishVaqti: "10:00 - 21:00", manzil: "Samarqand, Dagbitskiy ko'chasi",
    lat: 39.6590, lng: 66.9480,
    jami: 4, bosh: 2, birlik: "bo'sh usta", band: 50,
    bandlik: [10, 30, 50, 60, 50, 40, 55, 70, 80, 60, 40, 20, 0],
    menyu: [
      { nomi: "Soch olish", narx: 60000, bor: true },
      { nomi: "Soqol olish", narx: 40000, bor: true },
      { nomi: "Kompleks", narx: 90000, bor: true }
    ]
  },
  {
    id: 5, nomi: "Siyob Choyxonasi", kategoriya: "restoran",
    ishVaqti: "11:00 - 23:00", manzil: "Samarqand, Siyob bozori yonida",
    lat: 39.6614, lng: 66.9870,
    jami: 40, bosh: 18, birlik: "bo'sh stol", band: 20,
    bandlik: [5, 15, 40, 55, 35, 20, 25, 50, 70, 75, 55, 35, 15],
    menyu: [
      { nomi: "Shashlik", narx: 25000, bor: true },
      { nomi: "Qozon kabob", narx: 70000, bor: true },
      { nomi: "Samarqand noni", narx: 7000, bor: false }
    ]
  }
];

// ===== Admin panelda qilingan o'zgarishlarni qo'llash =====
// (hozircha brauzer xotirasida — keyingi bosqichda Firebase orqali hamma qurilmaga)
try {
  const saqlangan = JSON.parse(localStorage.getItem("kutma_ozgarishlar") || "{}");
  JOYLAR.forEach(j => { if (saqlangan[j.id]) Object.assign(j, saqlangan[j.id]); });
} catch (e) {}

// Boshqa tabda admin o'zgartirsa — sahifa o'zi yangilanadi (jonli effekt)
window.addEventListener("storage", e => {
  if (e.key === "kutma_ozgarishlar") location.reload();
});

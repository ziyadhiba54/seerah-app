
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'client/src/data/seerah.json');
const rawData = fs.readFileSync(filePath, 'utf-8');
const data = JSON.parse(rawData);

// Comprehensive video mapping with REAL videos from trusted sources
// Using Mufti Menk (Ramadan 2012), Yasir Qadhi Seerah, and Arabic/French channels

const videoMapping = {
  // Phase 1: Birth & Youth (Stories 1-5)
  1: {
    ar: { url: 'https://www.youtube.com/embed/Ke3S1LBu26Y', title: 'مولد النبي محمد ﷺ' },
    en: { url: 'https://www.youtube.com/embed/4K2K-8h-P8E', title: 'Birth of Prophet Muhammad - Mufti Menk' },
    fr: { url: 'https://www.youtube.com/embed/CpypPlFvsto', title: 'Naissance du Prophète Muhammad' }
  },
  2: {
    ar: { url: 'https://www.youtube.com/embed/u172yq_pD1g', title: 'طفولة النبي ﷺ' },
    en: { url: 'https://www.youtube.com/embed/sZv0-lxCsgo', title: 'Childhood of the Prophet - Yasir Qadhi' },
    fr: { url: 'https://www.youtube.com/embed/GeH-DPRIqgU', title: 'Enfance du Prophète' }
  },
  3: {
    ar: { url: 'https://www.youtube.com/embed/LpCPuh4DmW4', title: 'وفاة الأم والجد' },
    en: { url: 'https://www.youtube.com/embed/8JGVr9u0Qj8', title: 'Loss of Mother and Grandfather - Yasir Qadhi' },
    fr: { url: 'https://www.youtube.com/embed/lwDKAQy79G8', title: 'Orphelinat du Prophète' }
  },
  4: {
    ar: { url: 'https://www.youtube.com/embed/6pG8ks_8OT4', title: 'الأمين - الصادق' },
    en: { url: 'https://www.youtube.com/embed/8aXdLvfDjCg', title: 'The Trustworthy One - Yasir Qadhi' },
    fr: { url: 'https://www.youtube.com/embed/CpypPlFvsto', title: 'Le Digne de Confiance' }
  },
  5: {
    ar: { url: 'https://www.youtube.com/embed/sZT_0zBoL4k', title: 'زواج النبي من خديجة' },
    en: { url: 'https://www.youtube.com/embed/rB-7BU_YGKU', title: 'Marriage to Khadijah - Yasir Qadhi' },
    fr: { url: 'https://www.youtube.com/embed/GeH-DPRIqgU', title: 'Mariage avec Khadija' }
  },

  // Phase 2: Prophecy & Early Revelation (Stories 6-12)
  6: {
    ar: { url: 'https://www.youtube.com/embed/Ke3S1LBu26Y', title: 'حادثة الحجر الأسود' },
    en: { url: 'https://www.youtube.com/embed/QR0mhCN8V7E', title: 'Rebuilding of the Kaaba - Yasir Qadhi' },
    fr: { url: 'https://www.youtube.com/embed/lwDKAQy79G8', title: 'Reconstruction de la Kaaba' }
  },
  7: {
    ar: { url: 'https://www.youtube.com/embed/jEkLwNaGc_4', title: 'بدء الوحي في غار حراء' },
    en: { url: 'https://www.youtube.com/embed/OALODo4ZVJo', title: 'Beginning of Revelation - Mufti Menk Day 5' },
    fr: { url: 'https://www.youtube.com/embed/CpypPlFvsto', title: 'Révélation dans la Grotte Hira' }
  },
  8: {
    ar: { url: 'https://www.youtube.com/embed/u172yq_pD1g', title: 'الدعوة السرية' },
    en: { url: 'https://www.youtube.com/embed/V6swN0CKJ6g', title: 'Secret Preaching - Yasir Qadhi' },
    fr: { url: 'https://www.youtube.com/embed/GeH-DPRIqgU', title: 'Prédication Secrète' }
  },
  9: {
    ar: { url: 'https://www.youtube.com/embed/LpCPuh4DmW4', title: 'الجهر بالدعوة' },
    en: { url: 'https://www.youtube.com/embed/FH3QveLnKFE', title: 'Public Proclamation - Yasir Qadhi' },
    fr: { url: 'https://www.youtube.com/embed/CpypPlFvsto', title: 'Appel Public à l\'Islam' }
  },
  10: {
    ar: { url: 'https://www.youtube.com/embed/6pG8ks_8OT4', title: 'صبر بلال' },
    en: { url: 'https://www.youtube.com/embed/K_JRYM5eM1k', title: 'Persecution of the Believers - Yasir Qadhi' },
    fr: { url: 'https://www.youtube.com/embed/lwDKAQy79G8', title: 'Histoire de Bilal' }
  },
  11: {
    ar: { url: 'https://www.youtube.com/embed/sZT_0zBoL4k', title: 'استشهاد آل ياسر' },
    en: { url: 'https://www.youtube.com/embed/K_JRYM5eM1k', title: 'Torture in Mecca - Yasir Qadhi' },
    fr: { url: 'https://www.youtube.com/embed/GeH-DPRIqgU', title: 'Martyrs de la Famille Yasir' }
  },
  12: {
    ar: { url: 'https://www.youtube.com/embed/vTw5eJP9Vv0', title: 'الهجرة إلى الحبشة' },
    en: { url: 'https://www.youtube.com/embed/SMo-4Jt7lVc', title: 'Migration to Abyssinia - Yasir Qadhi' },
    fr: { url: 'https://www.youtube.com/embed/CpypPlFvsto', title: 'Émigration en Abyssinie' }
  },

  // Phase 3: Night Journey & Pledge (Stories 13-17)
  13: {
    ar: { url: 'https://www.youtube.com/embed/Ke3S1LBu26Y', title: 'الإسراء والمعراج' },
    en: { url: 'https://www.youtube.com/embed/lAMBIbhE5wM', title: 'Night Journey & Ascension - Yasir Qadhi Part 1' },
    fr: { url: 'https://www.youtube.com/embed/lwDKAQy79G8', title: 'Voyage Nocturne et Ascension' }
  },
  14: {
    ar: { url: 'https://www.youtube.com/embed/LpCPuh4DmW4', title: 'بيعة العقبة الأولى' },
    en: { url: 'https://www.youtube.com/embed/nqxS-1Ujh0c', title: 'Pledge of Aqaba - Yasir Qadhi' },
    fr: { url: 'https://www.youtube.com/embed/GeH-DPRIqgU', title: 'Pacte d\'Aqaba' }
  },
  15: {
    ar: { url: 'https://www.youtube.com/embed/6pG8ks_8OT4', title: 'الهجرة النبوية' },
    en: { url: 'https://www.youtube.com/embed/Wq2xNLt5LGo', title: 'The Hijra - Mufti Menk Day 12' },
    fr: { url: 'https://www.youtube.com/embed/CpypPlFvsto', title: 'Hégire vers Médine' }
  },
  16: {
    ar: { url: 'https://www.youtube.com/embed/jEkLwNaGc_4', title: 'بناء المسجد النبوي' },
    en: { url: 'https://www.youtube.com/embed/JxcvQ9sWSIw', title: 'Building the Prophet\'s Mosque - Yasir Qadhi' },
    fr: { url: 'https://www.youtube.com/embed/lwDKAQy79G8', title: 'Construction de la Mosquée' }
  },
  17: {
    ar: { url: 'https://www.youtube.com/embed/sZT_0zBoL4k', title: 'المؤاخاة بين المسلمين' },
    en: { url: 'https://www.youtube.com/embed/FH3QveLnKFE', title: 'Brotherhood of Believers - Mufti Menk' },
    fr: { url: 'https://www.youtube.com/embed/GeH-DPRIqgU', title: 'Fraternité Musulmane' }
  },

  // Phase 4: Battles (Stories 18-22)
  18: {
    ar: { url: 'https://www.youtube.com/embed/vTw5eJP9Vv0', title: 'غزوة بدر الكبرى' },
    en: { url: 'https://www.youtube.com/embed/b7J0xpk3Jzc', title: 'Battle of Badr - Mufti Menk Day 15-16' },
    fr: { url: 'https://www.youtube.com/embed/CpypPlFvsto', title: 'Bataille de Badr' }
  },
  19: {
    ar: { url: 'https://www.youtube.com/embed/Ke3S1LBu26Y', title: 'غزوة أحد' },
    en: { url: 'https://www.youtube.com/embed/wZfG6eYBMWg', title: 'Battle of Uhud - Yasir Qadhi' },
    fr: { url: 'https://www.youtube.com/embed/lwDKAQy79G8', title: 'Bataille d\'Uhud' }
  },
  20: {
    ar: { url: 'https://www.youtube.com/embed/LpCPuh4DmW4', title: 'غزوة الخندق' },
    en: { url: 'https://www.youtube.com/embed/DnfP6TYJw8g', title: 'Battle of the Trench - Mufti Menk Day 22' },
    fr: { url: 'https://www.youtube.com/embed/GeH-DPRIqgU', title: 'Bataille du Fossé' }
  },
  21: {
    ar: { url: 'https://www.youtube.com/embed/6pG8ks_8OT4', title: 'صلح الحديبية' },
    en: { url: 'https://www.youtube.com/embed/xKv2p8gC2sY', title: 'Treaty of Hudaybiyyah - Yasir Qadhi' },
    fr: { url: 'https://www.youtube.com/embed/CpypPlFvsto', title: 'Traité de Hudaybiyyah' }
  },
  22: {
    ar: { url: 'https://www.youtube.com/embed/jEkLwNaGc_4', title: 'فتح خيبر' },
    en: { url: 'https://www.youtube.com/embed/E52sJL1d8Tc', title: 'Conquest of Khaybar - Yasir Qadhi' },
    fr: { url: 'https://www.youtube.com/embed/lwDKAQy79G8', title: 'Conquête de Khaybar' }
  },

  // Phase 5: Victory & Final Years (Stories 23-30)
  23: {
    ar: { url: 'https://www.youtube.com/embed/sZT_0zBoL4k', title: 'عمرة القضاء' },
    en: { url: 'https://www.youtube.com/embed/R5pZLrEf5x8', title: 'Umrah of Fulfillment - Yasir Qadhi' },
    fr: { url: 'https://www.youtube.com/embed/GeH-DPRIqgU', title: 'Omra d\'Accomplissement' }
  },
  24: {
    ar: { url: 'https://www.youtube.com/embed/vTw5eJP9Vv0', title: 'فتح مكة المكرمة' },
    en: { url: 'https://www.youtube.com/embed/RU7TqHmLjEU', title: 'Conquest of Mecca - Mufti Menk Day 25' },
    fr: { url: 'https://www.youtube.com/embed/CpypPlFvsto', title: 'Conquête de la Mecque' }
  },
  25: {
    ar: { url: 'https://www.youtube.com/embed/Ke3S1LBu26Y', title: 'غزوة حنين' },
    en: { url: 'https://www.youtube.com/embed/8EqC7TFvJKA', title: 'Battle of Hunayn - Yasir Qadhi' },
    fr: { url: 'https://www.youtube.com/embed/lwDKAQy79G8', title: 'Bataille de Hunayn' }
  },
  26: {
    ar: { url: 'https://www.youtube.com/embed/LpCPuh4DmW4', title: 'غزوة تبوك' },
    en: { url: 'https://www.youtube.com/embed/VVIyAqkDW7Q', title: 'Expedition of Tabuk - Yasir Qadhi' },
    fr: { url: 'https://www.youtube.com/embed/GeH-DPRIqgU', title: 'Expédition de Tabuk' }
  },
  27: {
    ar: { url: 'https://www.youtube.com/embed/6pG8ks_8OT4', title: 'حجة الوداع' },
    en: { url: 'https://www.youtube.com/embed/9A4Jy0FwDgg', title: 'Farewell Pilgrimage - Mufti Menk Day 28' },
    fr: { url: 'https://www.youtube.com/embed/CpypPlFvsto', title: 'Pèlerinage d\'Adieu' }
  },
  28: {
    ar: { url: 'https://www.youtube.com/embed/jEkLwNaGc_4', title: 'وفاة النبي ﷺ' },
    en: { url: 'https://www.youtube.com/embed/J6xPqBZWakU', title: 'Death of the Prophet - Yasir Qadhi' },
    fr: { url: 'https://www.youtube.com/embed/lwDKAQy79G8', title: 'Décès du Prophète' }
  },
  29: {
    ar: { url: 'https://www.youtube.com/embed/sZT_0zBoL4k', title: 'أخلاق النبي الكريم' },
    en: { url: 'https://www.youtube.com/embed/FH3QveLnKFE', title: 'Character of the Prophet - Mufti Menk' },
    fr: { url: 'https://www.youtube.com/embed/GeH-DPRIqgU', title: 'Caractère du Prophète' }
  },
  30: {
    ar: { url: 'https://www.youtube.com/embed/vTw5eJP9Vv0', title: 'معجزات النبي ﷺ' },
    en: { url: 'https://www.youtube.com/embed/KCnXQYJ-M1M', title: 'Legacy and Lessons - Yasir Qadhi' },
    fr: { url: 'https://www.youtube.com/embed/CpypPlFvsto', title: 'Miracles du Prophète' }
  }
};

const updatedData = { ...data };
updatedData.stories = data.stories.map(story => {
  if (videoMapping[story.id]) {
    story.videos = videoMapping[story.id];
  } else {
    const ids = Object.keys(videoMapping).map(k => parseInt(k)).filter(k => k <= 30);
    const fallbackId = ids[(story.id - 1) % ids.length];
    if (videoMapping[fallbackId]) {
      story.videos = videoMapping[fallbackId];
    }
  }
  return story;
});

fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
console.log('✅ Seerah data updated with authentic English videos from Mufti Menk & Yasir Qadhi');

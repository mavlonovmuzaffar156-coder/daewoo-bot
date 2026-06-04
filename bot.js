const TelegramBot = require('node-telegram-bot-api');

// ========================================
// BOT TOKEN - BotFather dan olingan token
// ========================================
const TOKEN = '8909690818:AAFIO6hW2R6GJE1sppqyujhoLxGLCuCMXB4';

const bot = new TelegramBot(TOKEN, { polling: true });
const ADMIN_ID = 6637146490;
// ========================================
// DO'KON MA'LUMOTLARI
// ========================================
const DOKON = {
  nomi: 'DAEWOO ZAPCHAST OPTOM',
  manzil: 'Toshkent, Sergeli mashina bozor 9/2/1 do\'kon',
  tel: '+998 97 445 11 54',
  ish_vaqti: 'Seshanba — Yakshanba: 07:00 — 17:00\n🔴 Dushanba: Dam olish kuni',
  instagram: 'https://www.instagram.com/avtozapchast_daewoo',
};

// ========================================
// MAHSULOTLAR KATALOGI
// Narxlarni shu yerdan yangilaysiz!
// ========================================
const KATALOG = {
  nexia: {
    nomi: '🚗 Nexia',
    qismlar: [
      { id: 'nex_1', nomi: 'Amortizator (oldingi)', narx: '95 000', birlik: 'so\'m', kafolat: '3 oy' },
      { id: 'nex_2', nomi: 'Tormoz kolodkasi', narx: '45 000', birlik: 'so\'m', kafolat: '6 oy' },
      { id: 'nex_3', nomi: 'Sham (Spark plug)', narx: '12 000', birlik: 'so\'m/dona', kafolat: '3 oy' },
      { id: 'nex_4', nomi: 'Havo filtri', narx: '18 000', birlik: 'so\'m', kafolat: '3 oy' },
      { id: 'nex_5', nomi: 'Moy filtri', narx: '15 000', birlik: 'so\'m', kafolat: '3 oy' },
      { id: 'nex_6', nomi: 'Ksilota (akkumulyator)', narx: '320 000', birlik: 'so\'m', kafolat: '12 oy' },
    ]
  },
  matiz: {
    nomi: '🚙 Matiz',
    qismlar: [
      { id: 'mat_1', nomi: 'Amortizator (oldingi)', narx: '85 000', birlik: 'so\'m', kafolat: '3 oy' },
      { id: 'mat_2', nomi: 'Tormoz kolodkasi', narx: '38 000', birlik: 'so\'m', kafolat: '6 oy' },
      { id: 'mat_3', nomi: 'Sham (Spark plug)', narx: '10 000', birlik: 'so\'m/dona', kafolat: '3 oy' },
      { id: 'mat_4', nomi: 'Havo filtri', narx: '15 000', birlik: 'so\'m', kafolat: '3 oy' },
      { id: 'mat_5', nomi: 'Moy filtri', narx: '13 000', birlik: 'so\'m', kafolat: '3 oy' },
      { id: 'mat_6', nomi: 'Gaz trosigi', narx: '22 000', birlik: 'so\'m', kafolat: '6 oy' },
    ]
  },
  cobalt: {
    nomi: '🚕 Cobalt',
    qismlar: [
      { id: 'cob_1', nomi: 'Amortizator (oldingi)', narx: '120 000', birlik: 'so\'m', kafolat: '3 oy' },
      { id: 'cob_2', nomi: 'Tormoz kolodkasi', narx: '55 000', birlik: 'so\'m', kafolat: '6 oy' },
      { id: 'cob_3', nomi: 'Sham (Spark plug)', narx: '15 000', birlik: 'so\'m/dona', kafolat: '3 oy' },
      { id: 'cob_4', nomi: 'Havo filtri', narx: '22 000', birlik: 'so\'m', kafolat: '3 oy' },
      { id: 'cob_5', nomi: 'Moy filtri', narx: '18 000', birlik: 'so\'m', kafolat: '3 oy' },
      { id: 'cob_6', nomi: 'Salon filtri', narx: '25 000', birlik: 'so\'m', kafolat: '3 oy' },
    ]
  },
  damas: {
    nomi: '🚐 Damas / Labo',
    qismlar: [
      { id: 'dam_1', nomi: 'Amortizator', narx: '90 000', birlik: 'so\'m', kafolat: '3 oy' },
      { id: 'dam_2', nomi: 'Tormoz kolodkasi', narx: '40 000', birlik: 'so\'m', kafolat: '6 oy' },
      { id: 'dam_3', nomi: 'Sham (Spark plug)', narx: '11 000', birlik: 'so\'m/dona', kafolat: '3 oy' },
      { id: 'dam_4', nomi: 'Havo filtri', narx: '16 000', birlik: 'so\'m', kafolat: '3 oy' },
      { id: 'dam_5', nomi: 'Gaz trosigi', narx: '20 000', birlik: 'so\'m', kafolat: '6 oy' },
    ]
  },
  spark: {
    nomi: '⚡ Spark',
    qismlar: [
      { id: 'spa_1', nomi: 'Amortizator (oldingi)', narx: '80 000', birlik: 'so\'m', kafolat: '3 oy' },
      { id: 'spa_2', nomi: 'Tormoz kolodkasi', narx: '36 000', birlik: 'so\'m', kafolat: '6 oy' },
      { id: 'spa_3', nomi: 'Sham (Spark plug)', narx: '10 000', birlik: 'so\'m/dona', kafolat: '3 oy' },
      { id: 'spa_4', nomi: 'Havo filtri', narx: '14 000', birlik: 'so\'m', kafolat: '3 oy' },
      { id: 'spa_5', nomi: 'Moy filtri', narx: '12 000', birlik: 'so\'m', kafolat: '3 oy' },
    ]
  },
};

// ========================================
// SESSION
// ========================================
const sessions = {};
function getSession(chatId) {
  if (!sessions[chatId]) sessions[chatId] = {};
  return sessions[chatId];
}

// ========================================
// KLAVIATURALAR
// ========================================
function boshMenyuKlaviatura() {
  return {
    reply_markup: {
      keyboard: [
        ['🚗 Nexia', '🚙 Matiz'],
        ['🚕 Cobalt', '🚐 Damas / Labo'],
        ['⚡ Spark'],
        ['🚚 Yetkazib berish xizmati'],
        ['📞 Operator bilan bog\'lanish', '📍 Manzil va ish vaqti'],
        ['ℹ️ Do\'kon haqida'],
      ],
      resize_keyboard: true,
    }
  };
}

function qismlarKlaviatura(mashina) {
  const qismlar = KATALOG[mashina].qismlar;
  const rows = [];
  for (let i = 0; i < qismlar.length; i += 2) {
    const row = [qismlar[i].nomi];
    if (qismlar[i + 1]) row.push(qismlar[i + 1].nomi);
    rows.push(row);
  }
  rows.push(['🔙 Bosh menyu']);
  return { reply_markup: { keyboard: rows, resize_keyboard: true } };
}

function buyurtmaKlaviatura() {
  return {
    reply_markup: {
      keyboard: [
        [{ text: '📱 Telefon raqamni yuborish', request_contact: true }],
        ['🔙 Bosh menyu'],
      ],
      resize_keyboard: true,
    }
  };
}

function yetkazibBerishKlaviatura() {
  return {
    reply_markup: {
      keyboard: [
        ['📦 Yetkazib berish buyurtmasi'],
        ['❓ Yetkazib berish narxi'],
        ['🔙 Bosh menyu'],
      ],
      resize_keyboard: true,
    }
  };
}

// ========================================
// YORDAMCHI FUNKSIYALAR
// ========================================
function mashinaKeyTopish(matn) {
  if (matn.includes('Nexia')) return 'nexia';
  if (matn.includes('Matiz')) return 'matiz';
  if (matn.includes('Cobalt')) return 'cobalt';
  if (matn.includes('Damas')) return 'damas';
  if (matn.includes('Spark')) return 'spark';
  return null;
}

function qismTopish(mashinaKey, qismNomi) {
  if (!mashinaKey || !KATALOG[mashinaKey]) return null;
  return KATALOG[mashinaKey].qismlar.find(q => q.nomi === qismNomi) || null;
}

function boshMenyuXabari(ism) {
  return `👋 Salom${ism ? ', ' + ism : ''}!\n\n🏪 <b>${DOKON.nomi}</b> botiga xush kelibsiz!\n\n✅ Zapchast narxlarini ko'ring\n🚚 Yetkazib berish xizmati mavjud\n\n👇 Pastdan tanlang:`;
}

// ========================================
// START
// ========================================
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  sessions[chatId] = {};
  bot.sendMessage(chatId, boshMenyuXabari(msg.from.first_name), {
    parse_mode: 'HTML',
    ...boshMenyuKlaviatura()
  });
});

// ========================================
// ASOSIY HANDLER
// ========================================
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const matn = msg.text || '';
  const session = getSession(chatId);

  // --- Kontakt yuborildi (buyurtma uchun) ---
  if (msg.contact) {
    const tel = msg.contact.phone_number;
    const mahsulot = session.buyurtma_mahsulot || 'Noaniq';
    const mashina = session.buyurtma_mashina || 'Noaniq';
    const yetkazib = session.yetkazib_berish || false;
bot.sendMessage(
  ADMIN_ID,
  `🛒 YANGI BUYURTMA

📦 Mahsulot: ${mahsulot}
🚗 Mashina: ${mashina}
📞 Telefon: ${tel}

👤 Ism: ${msg.from.first_name || '-'}
🔗 Username: @${msg.from.username || 'yoq'}
🆔 Chat ID: ${chatId}

🚚 Yetkazib berish: ${yetkazib ? 'HA' : 'YO‘Q'}`
);
    if (yetkazib) {
      bot.sendMessage(chatId,
        `✅ <b>Yetkazib berish buyurtmasi qabul qilindi!</b>\n\n📦 Mahsulot: ${mahsulot}\n🚗 Mashina: ${mashina}\n📞 Raqam: ${tel}\n\n🚚 Operatorimiz manzilni aniqlashtirish uchun siz bilan bog'lanadi!\n\n⏰ Ish vaqti:\n${DOKON.ish_vaqti}`,
        { parse_mode: 'HTML', ...boshMenyuKlaviatura() }
      );
    } else {
      bot.sendMessage(chatId,
        `✅ <b>Buyurtmangiz qabul qilindi!</b>\n\n📦 Mahsulot: ${mahsulot}\n🚗 Mashina: ${mashina}\n📞 Raqam: ${tel}\n\nOperatorimiz yaqin orada siz bilan bog'lanadi!\n\n⏰ Ish vaqti:\n${DOKON.ish_vaqti}`,
        { parse_mode: 'HTML', ...boshMenyuKlaviatura() }
      );
    }
    sessions[chatId] = {};
    return;
  }

  if (!matn) return;

  // --- Bosh menyu ---
  if (matn === '/start' || matn === '🔙 Bosh menyu') {
    sessions[chatId] = {};
    bot.sendMessage(chatId, boshMenyuXabari(msg.from.first_name), {
      parse_mode: 'HTML', ...boshMenyuKlaviatura()
    });
    return;
  }

  // --- Do'kon haqida ---
  if (matn === 'ℹ️ Do\'kon haqida') {
    bot.sendMessage(chatId,
      `🏪 <b>${DOKON.nomi}</b>\n\n📍 Manzil: ${DOKON.manzil}\n📞 Tel: ${DOKON.tel}\n⏰ Ish vaqti:\n${DOKON.ish_vaqti}\n📸 Instagram: ${DOKON.instagram}`,
      { parse_mode: 'HTML', ...boshMenyuKlaviatura() }
    );
    return;
  }

  // --- Manzil ---
  if (matn === '📍 Manzil va ish vaqti') {
    bot.sendMessage(chatId,
      `📍 <b>Manzil:</b> ${DOKON.manzil}\n\n⏰ <b>Ish vaqti:</b>\n${DOKON.ish_vaqti}\n\n🗺 Google Maps orqali toping: https://maps.google.com/?q=Sergeli+mashina+bozor+Toshkent`,
      { parse_mode: 'HTML', ...boshMenyuKlaviatura() }
    );
    return;
  }

  // --- Operator ---
  if (matn === '📞 Operator bilan bog\'lanish') {
    bot.sendMessage(chatId,
      `📞 <b>Operator:</b> ${DOKON.tel}\n\n⏰ Ish vaqti:\n${DOKON.ish_vaqti}`,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [[{ text: '📞 Qo\'ng\'iroq qilish', url: `tel:${DOKON.tel.replace(/\s/g, '')}` }]]
        }
      }
    );
    return;
  }

  // --- Yetkazib berish xizmati ---
  if (matn === '🚚 Yetkazib berish xizmati') {
    bot.sendMessage(chatId,
      `🚚 <b>Yetkazib berish xizmati</b>\n\n✅ Toshkent bo'ylab yetkazib beramiz\n📦 Buyurtma berish — operatorimiz manzilni aniqlashtiradi\n💰 Yetkazib berish narxi — kelishib olinadi\n⏰ Yetkazib berish vaqti: 2-4 soat ichida\n\n📞 Bog'lanish: ${DOKON.tel}`,
      { parse_mode: 'HTML', ...yetkazibBerishKlaviatura() }
    );
    return;
  }

  // --- Yetkazib berish narxi ---
  if (matn === '❓ Yetkazib berish narxi') {
    bot.sendMessage(chatId,
      `💰 <b>Yetkazib berish narxi:</b>\n\n📍 Sergeli tumani: <b>Bepul</b>\n🏙 Toshkent ichida: <b>Kelishiladi</b>\n\nAniq narx uchun operatorimiz bilan bog'laning:\n📞 ${DOKON.tel}`,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [[{ text: '📞 Qo\'ng\'iroq qilish', url: `tel:${DOKON.tel.replace(/\s/g, '')}` }]]
        }
      }
    );
    return;
  }

  // --- Yetkazib berish buyurtmasi ---
  if (matn === '📦 Yetkazib berish buyurtmasi') {
    session.yetkazib_berish = true;
    if (session.tanlangan_qism && session.mashina) {
      const mashina = KATALOG[session.mashina];
      session.buyurtma_mahsulot = session.tanlangan_qism.nomi;
      session.buyurtma_mashina = mashina.nomi;
      bot.sendMessage(chatId,
        `🚚 <b>Yetkazib berish buyurtmasi</b>\n\n📦 Mahsulot: ${session.tanlangan_qism.nomi}\n💰 Narx: ${session.tanlangan_qism.narx} ${session.tanlangan_qism.birlik}\n\n📱 Telefon raqamingizni yuboring — operatorimiz manzilni aniqlashtiradi:`,
        { parse_mode: 'HTML', ...buyurtmaKlaviatura() }
      );
    } else {
      bot.sendMessage(chatId,
        `🚚 <b>Yetkazib berish buyurtmasi</b>\n\nQaysi qismni yetkazib berishimiz kerak?\nAvval mashina va qismni tanlang, so'ng yetkazib berish buyurtmasini bering.\n\nYoki to'g'ridan-to'g'ri operatorga qo'ng'iroq qiling:\n📞 ${DOKON.tel}`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [[{ text: '📞 Qo\'ng\'iroq qilish', url: `tel:${DOKON.tel.replace(/\s/g, '')}` }]]
          }
        }
      );
    }
    return;
  }

  // --- Mashina tanlash ---
  const mashinaKey = mashinaKeyTopish(matn);
  if (mashinaKey) {
    session.mashina = mashinaKey;
    const mashina = KATALOG[mashinaKey];
    bot.sendMessage(chatId,
      `${mashina.nomi} uchun qismlar:\n\n👇 Kerakli qismni tanlang:`,
      { parse_mode: 'HTML', ...qismlarKlaviatura(mashinaKey) }
    );
    return;
  }

  // --- Qism tanlash ---
  if (session.mashina) {
    const qism = qismTopish(session.mashina, matn);
    if (qism) {
      session.tanlangan_qism = qism;
      const mashina = KATALOG[session.mashina];
      bot.sendMessage(chatId,
        `${mashina.nomi} — <b>${qism.nomi}</b>\n\n💰 Narx: <b>${qism.narx} ${qism.birlik}</b>\n✅ Mavjud: Bor\n🏷 Kafolat: ${qism.kafolat}\n\nNima qilmoqchisiz?`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            keyboard: [
              ['📦 Buyurtma berish', '🚚 Yetkazib berish buyurtmasi'],
              ['🔙 Qismlar ro\'yxatiga qaytish', '🔙 Bosh menyu'],
            ],
            resize_keyboard: true,
          }
        }
      );
      return;
    }
  }

  // --- Buyurtma berish ---
  if (matn === '📦 Buyurtma berish') {
    if (!session.tanlangan_qism) {
      bot.sendMessage(chatId, 'Avval qism tanlang!', boshMenyuKlaviatura());
      return;
    }
    session.yetkazib_berish = false;
    session.buyurtma_mahsulot = session.tanlangan_qism.nomi;
    session.buyurtma_mashina = KATALOG[session.mashina].nomi;
    bot.sendMessage(chatId,
      `📦 <b>Buyurtma:</b> ${KATALOG[session.mashina].nomi} — ${session.tanlangan_qism.nomi}\n💰 Narx: ${session.tanlangan_qism.narx} ${session.tanlangan_qism.birlik}\n\n📱 Telefon raqamingizni yuboring:`,
      { parse_mode: 'HTML', ...buyurtmaKlaviatura() }
    );
    return;
  }

  // --- Qismlar ro'yxatiga qaytish ---
  if (matn === '🔙 Qismlar ro\'yxatiga qaytish' && session.mashina) {
    bot.sendMessage(chatId,
      `${KATALOG[session.mashina].nomi} qismlari:`,
      qismlarKlaviatura(session.mashina)
    );
    return;
  }

  // --- Tushunmadi ---
  bot.sendMessage(chatId, '🤔 Tushunmadim. Pastdagi menyudan tanlang:', boshMenyuKlaviatura());
});

console.log('✅ DAEWOO ZAPCHAST OPTOM bot ishga tushdi!');

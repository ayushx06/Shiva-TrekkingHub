// =============================
// PAGE LOAD
// =============================
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
  revealOnScroll();
});

// =============================
// ACTIVE NAVBAR + SHADOW
// =============================
const nav = document.querySelector("nav");
const sections = document.querySelectorAll("section[id], header[id]");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 200;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });

  if (nav) {
    if (window.scrollY > 50) {
      nav.classList.add("nav-scrolled");
    } else {
      nav.classList.remove("nav-scrolled");
    }
  }
});

// =============================
// REVEAL ANIMATION ON SCROLL
// =============================
function getRevealItems() {
  return document.querySelectorAll(
    ".section, .stats, .cta, .trek-card, .why-grid div, .activity-grid div, .gallery img, .gallery-grid img, .tool-card, .review-card, .highlight-card"
  );
}

function revealOnScroll() {
  const items = getRevealItems();

  items.forEach(item => {
    const itemTop = item.getBoundingClientRect().top;

    if (itemTop < window.innerHeight - 90) {
      item.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

// =============================
// BOOKING FORM MESSAGE
// =============================
const form = document.querySelector(".booking-form");

if (form) {
  form.addEventListener("submit", () => {
    alert("Thank you! Your trekking request has been sent. Shiva will contact you soon.");
  });
}

// =============================
// FULLSCREEN GALLERY LIGHTBOX
// =============================
const galleryImages = document.querySelectorAll(".gallery img");

if (galleryImages.length > 0) {
  const lightbox = document.createElement("div");
  lightbox.classList.add("lightbox");
  lightbox.innerHTML = `
    <span class="lightbox-close">&times;</span>
    <img src="" alt="Full trekking photo">
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector("img");
  const closeBtn = lightbox.querySelector(".lightbox-close");

  galleryImages.forEach(img => {
    img.addEventListener("click", () => {
      lightbox.classList.add("active");
      lightboxImg.src = img.src;
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });

  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
      lightbox.classList.remove("active");
    }
  });
}

// =============================
// SMART GALLERY LOADER (if present)
// =============================
function loadTrekGallery(images) {
  images.forEach(image => {
    image.addEventListener("load", () => {
      revealOnScroll();
    });
  });
}

// =============================
// FLOATING WHATSAPP BUTTON
// =============================
const floatingWhatsApp = document.createElement("a");
floatingWhatsApp.href =
  "https://wa.me/9779848248353?text=Hello%20Shiva%20Subedi%2C%20I%20want%20to%20plan%20a%20trek%20in%20Nepal.";
floatingWhatsApp.target = "_blank";
floatingWhatsApp.className = "floating-whatsapp";
floatingWhatsApp.innerHTML = "💬";
document.body.appendChild(floatingWhatsApp);

// =============================
// TREK ITINERARY MODAL SYSTEM
// =============================
const itineraryData = {
  everest: `
    <h2>Everest Base Camp Trek</h2>
    <p><strong>Duration:</strong> 12–14 Days | <strong>Difficulty:</strong> Hard | <strong>Best Season:</strong> Spring & Autumn</p>
    <p>Day 1: Fly to Lukla and trek to Phakding through beautiful Sherpa settlements.</p>
    <p>Day 2: Trek to Namche Bazaar, the main trading town of the Everest region.</p>
    <p>Day 3: Acclimatization day in Namche with optional viewpoint walk.</p>
    <p>Day 4: Trek to Tengboche with views of Everest, Ama Dablam and surrounding peaks.</p>
    <p>Day 5: Trek to Dingboche, entering higher alpine landscapes.</p>
    <p>Day 6: Acclimatization day to prepare safely for higher altitude.</p>
    <p>Day 7: Trek to Lobuche through dramatic mountain scenery.</p>
    <p>Day 8: Reach Everest Base Camp and overnight around Gorakshep.</p>
    <p>Day 9: Early Kala Patthar viewpoint, then descend toward Pheriche.</p>
    <p>Day 10–12: Return through Namche and Lukla for the flight back.</p>
  `,

  annapurna: `
    <h2>Annapurna Base Camp Trek</h2>
    <p><strong>Duration:</strong> 7 Days | <strong>Difficulty:</strong> Medium | <strong>Start:</strong> Pokhara</p>
    <p>Day 1: Drive from Pokhara to Nayapul and trek to Ghandruk.</p>
    <p>Day 2: Trek from Ghandruk to Chhomrong through scenic village trails.</p>
    <p>Day 3: Descend to the river, cross suspension bridges and continue to Dovan.</p>
    <p>Day 4: Trek from Dovan toward Machhapuchhre Base Camp through forest and alpine landscapes.</p>
    <p>Day 5: Short but beautiful trek to Annapurna Base Camp with time for photos and mountain views.</p>
    <p>Day 6: Descend from ABC to Bamboo through the same valley route.</p>
    <p>Day 7: Trek to Jhinu Danda and drive back to Pokhara.</p>
  `,

  poonhill: `
    <h2>Ghorepani Poon Hill Trek</h2>
    <p><strong>Duration:</strong> 4 Days | <strong>Difficulty:</strong> Easy | <strong>Highlight:</strong> Sunrise View</p>
    <p>Day 1: Drive from Pokhara to Nayapul and trek to Tikhedhunga or Ulleri.</p>
    <p>Day 2: Trek through stone steps and rhododendron forest to Ghorepani.</p>
    <p>Day 3: Early sunrise hike to Poon Hill, then trek toward Tadapani.</p>
    <p>Day 4: Trek to Ghandruk and return to Pokhara by road.</p>
  `,

  mardi: `
    <h2>Mardi Himal Trek</h2>
    <p><strong>Duration:</strong> 5 Days | <strong>Difficulty:</strong> Medium | <strong>Style:</strong> Peaceful Ridge Trek</p>
    <p>Day 1: Drive from Pokhara to Kande and trek to Forest Camp.</p>
    <p>Day 2: Walk through forest trails to Low Camp.</p>
    <p>Day 3: Trek to High Camp with close views of Machhapuchhre.</p>
    <p>Day 4: Early hike to viewpoint or base camp area, then descend to Badal Danda.</p>
    <p>Day 5: Trek to Siding and drive back to Pokhara.</p>
  `,

  langtang: `
    <h2>Langtang Valley Trek</h2>
    <p><strong>Duration:</strong> 7 Days | <strong>Difficulty:</strong> Medium | <strong>Highlight:</strong> Valley Culture</p>
    <p>Day 1: Drive from Kathmandu to Syabrubesi.</p>
    <p>Day 2: Trek from Syabrubesi to Lama Hotel.</p>
    <p>Day 3: Trek to Langtang Village through forest and open valley views.</p>
    <p>Day 4: Trek to Kyanjin Gompa and explore the village area.</p>
    <p>Day 5: Optional viewpoint walk, then climb to KYANGJIN RI.</p>
    <p>Day 6: Descend toward Lama Hotel exploring fantastic views.</p>
    <p>Day 7: Return to Syabrubesi and drive back.</p>
  `,

  roundannapurna: `
    <h2>Round Annapurna Trek</h2>
    <p><strong>Duration:</strong> 14 Days | <strong>Difficulty:</strong> Hard | <strong>Highlight:</strong> Thorong La Pass</p>
    <p>Day 1: Drive from Kathmandu or Pokhara toward the Annapurna trailhead and continue to Dharapani / Chame depending on road and trek plan.</p>
    <p>Day 2: Trek to Chame through pine forest, river valleys and classic mountain village scenery.</p>
    <p>Day 3: Trek to Pisang with dramatic valley views and changing Himalayan landscapes.</p>
    <p>Day 4: Trek to Manang through traditional settlements, open mountain terrain and beautiful Annapurna panoramas.</p>
    <p>Day 5: Acclimatization day in Manang with a short hike to viewpoint areas or Gangapurna side trip.</p>
    <p>Day 6: Trek to Yak Kharka, gaining altitude gradually for safe acclimatization.</p>
    <p>Day 7: Trek to Thorong Phedi / High Camp and prepare for the high pass crossing.</p>
    <p>Day 8: Cross Thorong La Pass and descend to Muktinath, one of the biggest highlights of the circuit.</p>
    <p>Day 9: Continue through the Mustang side toward Jomsom, following dramatic dry valley landscapes.</p>
    <p>Day 10: Trek or drive through lower Mustang villages with wide views of the Kali Gandaki valley.</p>
    <p>Day 11: Continue descending through classic Annapurna route settlements and apple-growing villages.</p>
    <p>Day 12: Reach the lower trail region and enjoy a more relaxed final walking day.</p>
    <p>Day 13: Drive back toward Pokhara after completing the main circuit experience.</p>
    <p>Day 14: Rest / departure day or optional extension from Pokhara.</p>
  `,

  pokhara: `
    <h2>Pokhara Day Hike</h2>
    <p><strong>Duration:</strong> 1 Day | <strong>Difficulty:</strong> Easy | <strong>Best For:</strong> Short Stay Travellers</p>
    <p>Morning: Start from Lakeside Pokhara and choose a scenic day-hike route based on time, weather and interest.</p>
    <p>Option 1: Drive or boat transfer toward the World Peace Pagoda trail and hike uphill for panoramic views of Phewa Lake, Pokhara Valley and the Annapurna range.</p>
    <p>Option 2: Sunrise-oriented hike around Sarangkot or nearby ridges for mountain views and easy village walking.</p>
    <p>Midday: Enjoy viewpoint stops, local scenery, photos and a relaxed lunch break.</p>
    <p>Afternoon: Descend comfortably and return to Pokhara with time for coffee, lakeside rest or sunset views.</p>
  `,

  manaslu: `
    <h2>Manaslu Circuit Trek</h2>
    <p><strong>Duration:</strong> 13–15 Days | <strong>Difficulty:</strong> Hard | <strong>Style:</strong> Remote Himalayan Circuit</p>
    <p>Day 1: Drive from Kathmandu to the lower Manaslu region and reach Machha Khola area.</p>
    <p>Day 2: Trek to Jagat through river gorges, suspension bridges and classic lower-hill villages.</p>
    <p>Day 3: Trek to Deng / Namrung side, gradually entering a more remote mountain setting.</p>
    <p>Day 4: Continue to Namrung with stronger mountain views and Tibetan-influenced culture.</p>
    <p>Day 5: Trek to Lho or Sama Gaun through alpine scenery and spectacular Manaslu views.</p>
    <p>Day 6: Acclimatization day in Sama Gaun with optional side hike toward Manaslu Base Camp or Birendra Lake area.</p>
    <p>Day 7: Trek to Samdo, keeping the pace controlled for altitude safety.</p>
    <p>Day 8: Acclimatization / preparation day with a short hike above Samdo.</p>
    <p>Day 9: Trek to Dharamsala / Larkya Phedi, the final base before the pass.</p>
    <p>Day 10: Cross Larkya La Pass and descend to Bhimthang through one of Nepal’s great high-pass days.</p>
    <p>Day 11: Trek down through forest and valley scenery toward Tilije / Dharapani.</p>
    <p>Day 12: Exit the trail and drive back toward Besisahar / Kathmandu or continue onward based on the final plan.</p>
    <p>Extra days can be added for slower acclimatization, village exploration or a more comfortable pace.</p>
  `,

  gosaikunda: `
    <h2>Gosaikunda Trek</h2>
    <p><strong>Duration:</strong> 6–7 Days | <strong>Difficulty:</strong> Medium | <strong>Highlight:</strong> Sacred Alpine Lakes</p>
    <p>Day 1: Drive from Kathmandu to Dhunche and begin the Langtang-side mountain journey.</p>
    <p>Day 2: Trek to Chandanbari / Sing Gompa through forest trails, village lodges and peaceful uphill walking.</p>
    <p>Day 3: Trek to Lauribina with expanding views and stronger alpine atmosphere.</p>
    <p>Day 4: Trek to Gosaikunda Lake, one of Nepal’s most sacred and beautiful high-altitude lake destinations.</p>
    <p>Day 5: Optional sunrise hike or continue across the higher trail section depending on route choice and conditions.</p>
    <p>Day 6: Descend through Cholangpati / Lauribina side back toward the lower trail.</p>
    <p>Day 7: Return to Dhunche and drive back to Kathmandu.</p>
  `,

  khopra: `
  <h2>Khopra Ridge Trek</h2>
  <p><strong>Duration:</strong> 7 Days | <strong>Difficulty:</strong> Medium | <strong>Highlight:</strong> Khopra Ridge & Optional Khayer Lake</p>
  <p>Day 1: Drive from Pokhara to Ghandruk and begin trekking through traditional village trails toward Tadapani.</p>
  <p>Day 2: Trek from Tadapani through forest and ridge sections toward Bayeli / Dobato area with beautiful Annapurna views.</p>
  <p>Day 3: Continue toward Chistibung and climb to Khopra Ridge, one of the quietest and most rewarding viewpoints in the region.</p>
  <p>Day 4: Sunrise and mountain-view day at Khopra Ridge with optional extended hike toward sacred Khayer Lake depending on pace, weather and final trek plan.</p>
  <p>Day 5: Descend through alpine and village trails to Swanta, enjoying a more local and less crowded Annapurna experience.</p>
  <p>Day 6: Trek toward Ghorepani or connect through classic village routes depending on the chosen return trail.</p>
  <p>Day 7: Final descent and drive back to Pokhara after completing the Khopra route.</p>
`,

  mustang: `
    <h2>Upper Mustang Trek</h2>
    <p><strong>Duration:</strong> 14 Days | <strong>Difficulty:</strong> Medium | <strong>Style:</strong> Restricted Cultural Trek</p>
    <p>Day 1: Travel from Kathmandu to Pokhara and prepare for entry into the Mustang region.</p>
    <p>Day 2: Scenic flight or transfer to Jomsom and begin the trek toward Kagbeni, the gateway to Upper Mustang.</p>
    <p>Day 3: Trek to Chele through dramatic dry landscapes and wind-shaped cliffs.</p>
    <p>Day 4: Trek to Syangboche / Samar area through red rock formations and high desert trails.</p>
    <p>Day 5: Continue toward Ghami or nearby villages with stronger Tibetan cultural atmosphere.</p>
    <p>Day 6: Trek to Charang, known for monastery heritage and Mustang architecture.</p>
    <p>Day 7: Trek to Lo Manthang, the walled city and major highlight of the Upper Mustang journey.</p>
    <p>Day 8: Explore Lo Manthang with visits to monasteries, viewpoints and nearby cultural sites.</p>
    <p>Day 9: Optional excursion toward Chhoser cave area or surrounding Mustang villages.</p>
    <p>Day 10: Begin return trek through the desert-like trans-Himalayan landscape.</p>
    <p>Day 11: Continue descending through classic Upper Mustang villages and open valleys.</p>
    <p>Day 12: Return to Kagbeni / Jomsom side.</p>
    <p>Day 13: Fly or drive back to Pokhara.</p>
    <p>Day 14: Departure or onward Nepal travel extension.</p>
  `
};

const modal = document.getElementById("trek-modal");
const modalContent = modal?.querySelector(".modal-content");
const modalBody = document.getElementById("modal-body");
const openButtons = document.querySelectorAll(".open-itinerary");
const trekCards = document.querySelectorAll(".trek-card");

const trekCardImages = {
  "everest-card": [
    "images/gallery/everest-base-camp/everest1.jpg",
    "images/gallery/everest-base-camp/everest3.jpg",
    "images/gallery/everest-base-camp/everest7.jpg"
  ],
  "roundannapurna-card": [
    "images/gallery/round-annapurna/anna1.jpg",
    "images/gallery/round-annapurna/anna4.jpg",
    "images/gallery/round-annapurna/anna8.jpg"
  ],
  "annapurna-card": [
    "images/gallery/annapurna-base-camp/abc1.jpg",
    "images/gallery/annapurna-base-camp/abc5.jpg",
    "images/gallery/annapurna-base-camp/abc10.jpg"
  ],
  "poonhill-card": [
    "images/gallery/poon-hill/poon1.jpg",
    "images/gallery/poon-hill/poon4.jpg",
    "images/gallery/poon-hill/poon10.jpg"
  ],
  "mardi-card": [
    "images/gallery/mardi-himal/mardi1.jpg",
    "images/gallery/mardi-himal/mardi7.jpg",
    "images/gallery/mardi-himal/mardi13.jpg"
  ],
  "khopra-card": [
    "images/gallery/khopra/khopra1.jpg",
    "images/gallery/khopra/khopra3.jpg",
    "images/gallery/khopra/khopra6.jpg"
  ],
  "langtang-card": [
    "images/gallery/langtang/langtang1.jpg",
    "images/gallery/langtang/langtang4.jpg",
    "images/gallery/langtang/langtang10.jpg"
  ],
  "pokhara-card": [
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80&auto=format&fit=crop"
  ],
  "manaslu-card": [
    "images/gallery/manaslu/manaslu1.jpg",
    "images/gallery/manaslu/manaslu8.jpg",
    "images/gallery/manaslu/manaslu18.jpg"
  ],
  "gosaikunda-card": [
    "images/gallery/gosaikunda/gosaikunda1.jpg",
    "images/gallery/gosaikunda/gosaikunda5.jpg",
    "images/gallery/gosaikunda/gosaikunda10.jpg"
  ],
  "uppermustang-card": [
    "images/gallery/uppermustang/mustang1.jpg",
    "images/gallery/uppermustang/mustang6.jpg",
    "images/gallery/uppermustang/mustang15.jpg"
  ]
};

function initTrekCardSlideshows() {
  Object.entries(trekCardImages).forEach(([cardClass, images], cardIndex) => {
    const card = document.querySelector(`.${cardClass}`);

    if (!card || images.length === 0) return;

    images.forEach(src => {
      const preload = new Image();
      preload.src = src;
    });

    const layers = [document.createElement("span"), document.createElement("span")];
    let activeLayer = 0;
    let imageIndex = 0;

    layers.forEach((layer, index) => {
      layer.className = "trek-card-bg";
      layer.style.backgroundImage = `url("${images[index % images.length]}")`;
      card.prepend(layer);
    });

    card.style.backgroundImage = `url("${images[0]}")`;
    layers[0].classList.add("active");

    setTimeout(() => {
      setInterval(() => {
        imageIndex = (imageIndex + 1) % images.length;
        activeLayer = activeLayer === 0 ? 1 : 0;

        const nextLayer = layers[activeLayer];
        const previousLayer = layers[activeLayer === 0 ? 1 : 0];
        const nextImage = images[imageIndex];

        nextLayer.style.backgroundImage = `url("${nextImage}")`;
        card.style.backgroundImage = `url("${nextImage}")`;
        nextLayer.classList.add("active");
        previousLayer.classList.remove("active");
      }, 4000);
    }, cardIndex * 280);
  });
}

initTrekCardSlideshows();

function openTrekModal(trek) {
  if (!modal || !modalBody) return;

  const content = itineraryData[trek];
  if (!content) return;

  modalBody.innerHTML = content;
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeTrekModal() {
  if (!modal) return;

  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "auto";
}

if (modal && modalContent && modalBody) {
  openButtons.forEach(btn => {
    btn.addEventListener("click", event => {
      event.stopPropagation();
      openTrekModal(btn.getAttribute("data-trek"));
    });
  });

  trekCards.forEach(card => {
    card.addEventListener("click", event => {
      if (event.target.closest(".open-itinerary")) return;
      openTrekModal(card.getAttribute("data-trek"));
    });
  });

  modal.addEventListener("click", event => {
    if (event.target === modal || event.target.classList.contains("close")) {
      closeTrekModal();
    }
  });
}

// 🔥 ESC key close (premium UX)
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeTrekModal();
  }
});

// =============================
// TREK FILTER SYSTEM
// =============================
const filterButtons = document.querySelectorAll(".filter-btn");

if (filterButtons.length > 0 && trekCards.length > 0) {
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");

      trekCards.forEach(card => {
        const difficulty = card.getAttribute("data-difficulty");

        if (filter === "all" || filter === difficulty) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
          }, 10);
        } else {
          card.style.opacity = "0";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// =============================
// ELITE CUSTOMER-PULLING PRICE ESTIMATOR
// =============================
function estimatePrice() {
  const days = Number(document.getElementById("days")?.value);
  const group = Number(document.getElementById("group")?.value);
  const trek = document.querySelector("#trek")?.value || "medium";
  const result = document.getElementById("price-result");

  if (!result) return;

  if (!days || !group) {
    result.innerHTML = "⚠️ Please enter number of days and group size.";
    return;
  }

  let baseRate = 110;
  let offerRate = 85;

  if (trek === "easy") {
    baseRate = 90;
    offerRate = 65;
  }

  if (trek === "medium") {
    baseRate = 110;
    offerRate = 85;
  }

  if (trek === "hard") {
    baseRate = 150;
    offerRate = 120;
  }

  let total = days * offerRate * group;
  const original = days * baseRate * group;
  let discountText = "";

  if (group >= 3 && group < 6) {
    total *= 0.92;
    discountText = "🎉 Small Group Discount Applied";
  }

  if (group >= 6) {
    total *= 0.82;
    discountText = "🔥 Large Group Best Offer Unlocked";
  }

  const perPerson = Math.round(total / group);
  const originalPerPerson = Math.round(original / group);

  result.innerHTML = `
    <div style="text-align:center">
      <div style="font-size:14px; color:#888;">Starting from</div>
      <div style="font-size:18px; color:#aaa; text-decoration:line-through;">$${originalPerPerson}</div>
      <div style="font-size:34px; font-weight:bold; color:#f5a623;">$${perPerson}/person</div>
      <div style="font-size:13px; color:#666;">(${days} days • ${group} trekkers)</div>
      <br>
      ${discountText ? `<div style="color:green; font-weight:bold;">${discountText}</div>` : ""}
      <div style="margin-top:12px; font-size:14px;">
        ✔ Private local guide<br>
        ✔ Flexible itinerary<br>
        ✔ Safe trekking support<br>
        ✔ Friendly Nepali hospitality
      </div>
      <br>
      <div style="margin-top:8px; font-size:13px; color:#666;">
        ✔ Trusted private guide • 25+ years Himalayan experience
      </div>
      <br>
      <a 
        href="https://wa.me/9779848248353?text=Hi%20Shiva%2C%20I%20saw%20price%20%24${perPerson}%2Fperson%20for%20${days}-day%20${trek}%20trek%20for%20${group}%20people.%20Can%20you%20confirm%20best%20offer%3F"
        target="_blank"
        style="display:inline-block; background:#25D366; color:white; padding:14px 22px; border-radius:30px; text-decoration:none; font-weight:bold; font-size:15px;"
      >
        💬 Get Best Price on WhatsApp
      </a>
      <br><br>
      <small style="color:#777;">Final price varies based on permits, transport, accommodation and season.</small>
    </div>
  `;
}

// =============================
// FAQ ACCORDION
// =============================
const faqItems = document.querySelectorAll(".faq-item");

if (faqItems.length > 0) {
  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");

    if (!question) return;

    question.addEventListener("click", () => {
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });

      item.classList.toggle("active");
    });
  });
}

// =============================
// PREMIUM FAQ BOT
// =============================
const faqBot = document.getElementById("faqBot");
const botToggle = document.getElementById("botToggle");
const botClose = document.getElementById("botClose");
const botInput = document.getElementById("botInput");
const botBody = document.getElementById("botBody");
const botSend = document.getElementById("botSend");
const botSuggestCards = document.querySelectorAll(".bot-suggest-card");
let faqBotDragControls = null;

if (faqBot && botToggle) {
  botToggle.addEventListener("click", () => {
    if (faqBotDragControls && window.matchMedia("(max-width: 900px)").matches) {
      faqBotDragControls.clearPosition();
    }

    faqBot.classList.add("open");
    botToggle.classList.add("opened-once");
    if (botInput) {
      setTimeout(() => botInput.focus(), 200);
    }
    const unread = botToggle.querySelector(".bot-toggle-unread");
    if (unread) unread.style.display = "none";
  });
}

if (faqBot && botClose) {
  botClose.addEventListener("click", () => {
    faqBot.classList.remove("open");
    if (faqBotDragControls) {
      faqBotDragControls.restorePosition();
    }
  });
}

function getBotAnswer(question) {
  const q = question.toLowerCase();

  if (q.includes("hello") || q.includes("hi") || q.includes("namaste")) {
    return "Namaste! I can help you choose the right trek, compare routes, explain prices, suggest the best season and guide you to book directly with Shiva.";
  }

  if (q.includes("beginner") || q.includes("easy") || q.includes("first time")) {
    return "For beginners, Poon Hill is the easiest choice. Pokhara day hikes are great for short stays, and Mardi Himal is a very good next step if you want something more scenic but still manageable.";
  }

  if (q.includes("everest") && q.includes("annapurna")) {
    return "Everest Base Camp is more iconic and more demanding because of altitude. Annapurna Base Camp is shorter, easier to access from Pokhara and better for many travellers wanting a balanced Himalayan trek.";
  }

  if (q.includes("price") || q.includes("cost") || q.includes("budget")) {
    return "Price depends on route, number of days, group size, transport, permits and accommodation style. You can use the site calculator for a rough idea, then contact Shiva for an exact best offer.";
  }

  if (q.includes("season") || q.includes("best time") || q.includes("weather") || q.includes("month")) {
    return "The best trekking seasons in Nepal are usually spring from March to May and autumn from September to November because mountain views and trail conditions are generally better.";
  }

  if (q.includes("permit") || q.includes("guide") || q.includes("solo")) {
    return "Permit and guide requirements depend on the trekking region. Shiva can help explain exactly what is needed for your chosen route and travel dates.";
  }

  if (q.includes("book") || q.includes("booking") || q.includes("whatsapp") || q.includes("contact")) {
    return "To book, send your travel dates, trek choice, group size and fitness level through WhatsApp or the contact form. Shiva can then suggest the best route and confirm next steps.";
  }

  return "I can help with trek selection, route comparison, price guidance, season advice, permits and booking support. Ask me something like: Everest or Annapurna? Which trek is best for beginners? How do I book?";
}

function addBotMessage(message, type) {
  if (!botBody) return;

  const paragraph = document.createElement("p");

  if (type === "user") {
    paragraph.classList.add("user-message");
    paragraph.innerHTML = `<strong>You:</strong> ${message}`;
  } else {
    paragraph.classList.add("bot-message");
    paragraph.innerHTML = `<strong>Shiva Assistant:</strong> ${message}`;
  }

  botBody.appendChild(paragraph);
  botBody.scrollTop = botBody.scrollHeight;
}

function sendBotMessage(customQuestion = "") {
  if (!botInput || !botBody) return;

  const question = (customQuestion || botInput.value).trim();
  if (!question) return;

  addBotMessage(question, "user");
  botInput.value = "";
  botInput.focus();

  setTimeout(() => {
    const answer = getBotAnswer(question);
    addBotMessage(answer, "bot");
  }, 300);
}

if (botInput && botBody) {
  botInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendBotMessage();
    }
  });
}

if (botSend) {
  botSend.addEventListener("click", () => sendBotMessage());
}

if (botSuggestCards.length > 0) {
  botSuggestCards.forEach(card => {
    card.addEventListener("click", () => {
      const question = card.dataset.question || "";
      sendBotMessage(question);
    });
  });
}

// =============================
// MOBILE FLOATING BUTTON DRAG
// =============================
function setupMobileFloatingDrag(element, storageKey, handle = element) {
  if (!element || !handle) return;

  const mobileQuery = window.matchMedia("(max-width: 900px)");
  let dragState = null;
  let suppressNextClick = false;

  function getSavedPosition() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      if (typeof saved?.left === "number" && typeof saved?.top === "number") {
        return saved;
      }
    } catch (error) {
      return null;
    }

    return null;
  }

  function savePosition(left, top) {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ left, top }));
    } catch (error) {
      return;
    }
  }

  function getBoundedPosition(left, top) {
    const rect = element.getBoundingClientRect();
    const maxLeft = Math.max(0, window.innerWidth - rect.width);
    const maxTop = Math.max(0, window.innerHeight - rect.height);

    return {
      left: Math.min(Math.max(left, 0), maxLeft),
      top: Math.min(Math.max(top, 0), maxTop)
    };
  }

  function applyPosition(left, top) {
    const bounded = getBoundedPosition(left, top);

    element.style.left = `${bounded.left}px`;
    element.style.top = `${bounded.top}px`;
    element.style.right = "auto";
    element.style.bottom = "auto";

    return bounded;
  }

  function clearPosition() {
    element.style.left = "";
    element.style.top = "";
    element.style.right = "";
    element.style.bottom = "";
  }

  function restorePosition() {
    if (!mobileQuery.matches) {
      clearPosition();
      return;
    }

    const saved = getSavedPosition();
    if (saved) {
      const bounded = applyPosition(saved.left, saved.top);
      savePosition(bounded.left, bounded.top);
    }
  }

  function startDrag(event) {
    if (!mobileQuery.matches || event.button > 0) return;

    const rect = element.getBoundingClientRect();
    dragState = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      left: rect.left,
      top: rect.top,
      moved: false
    };

    applyPosition(rect.left, rect.top);
    element.classList.add("dragging");

    if (handle.setPointerCapture) {
      handle.setPointerCapture(event.pointerId);
    }
  }

  function moveDrag(event) {
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - dragState.startX;
    const deltaY = event.clientY - dragState.startY;

    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
      dragState.moved = true;
    }

    if (dragState.moved) {
      applyPosition(dragState.left + deltaX, dragState.top + deltaY);
    }
  }

  function endDrag(event) {
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    if (handle.releasePointerCapture) {
      handle.releasePointerCapture(event.pointerId);
    }

    element.classList.remove("dragging");

    if (dragState.moved) {
      const rect = element.getBoundingClientRect();
      const bounded = applyPosition(rect.left, rect.top);
      savePosition(bounded.left, bounded.top);
      suppressNextClick = true;
      setTimeout(() => {
        suppressNextClick = false;
      }, 350);
    }

    dragState = null;
  }

  element.addEventListener(
    "click",
    event => {
      if (!suppressNextClick) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      suppressNextClick = false;
    },
    true
  );

  handle.addEventListener("pointerdown", startDrag);
  handle.addEventListener("pointermove", moveDrag);
  handle.addEventListener("pointerup", endDrag);
  handle.addEventListener("pointercancel", endDrag);
  window.addEventListener("resize", restorePosition);

  restorePosition();

  return {
    clearPosition,
    restorePosition
  };
}

faqBotDragControls = setupMobileFloatingDrag(faqBot, "shivaFaqBotPosition", botToggle);
setupMobileFloatingDrag(floatingWhatsApp, "shivaWhatsAppPosition");

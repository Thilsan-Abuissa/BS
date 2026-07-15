/* ============================================================
   BLUE SALON — PRODUCT DETAIL PAGE (PDP)
   A minimal, editorial detail view: large gallery on the left,
   a quiet product panel on the right (brand · name · price,
   colour swatches, size grid, add-to-bag) and expandable
   details. Reuses the shared header/footer wired by app.js;
   design tokens come from styles.css. Self-contained — the
   product catalogue below mirrors the listing page and is
   enriched with copy, so a card can deep-link via ?id=.
   ============================================================ */
(function () {
  "use strict";

  /* ── Catalogue (mirrors listing.js, enriched with PDP copy) ── */
  var PRODUCTS = [
    {
      id: "miriam-ostrich", vendor: "ZUHAIR MURAD", sku: "ZM-10234",
      name: "Patchwork Leather Chain‑Handle Tote Bag",
      cat: "bags", price: 9700, tag: "New",
      sizes: ["36","37","38","39","40","41"], soldOutSizes: ["36"],
      variants: [
        { color: "Ice Blue",  hex: "#bcc9cd", image: "images/0_1.webp" },
        { color: "Chocolate", hex: "#4a3626", image: "images/0_4.webp" },
        { color: "Black",     hex: "#191919" },
        { color: "Bone",      hex: "#d9cdb8" }
      ],
      desc: "A sculptural tote in patchworked calf leather, finished by hand with a polished chain handle. Structured enough to stand on its own, softened by a suede-lined interior.",
      details: [
        "Patchwork calfskin with polished gold-tone chain handle",
        "Magnetic top closure; suede-lined interior with slip pocket",
        "Protective metal base feet",
        "Made in Italy"
      ],
      composition: "Outer: 100% Calf Leather. Lining: 100% Suede."
    },
    {
      id: "miriam-leather", vendor: "ZUHAIR MURAD", sku: "ZM-10235",
      name: "Patchwork Leather Chain‑Handle Tote Bag",
      cat: "bags", price: 4500, tag: "New",
      sizes: ["36","37","38","39","40","41"],
      variants: [
        { color: "Chocolate", hex: "#4a3626", image: "images/product2.png" },
        { color: "Black",     hex: "#191919" },
        { color: "Ice Blue",  hex: "#bcc9cd", image: "images/product1.png" },
        { color: "Sand",      hex: "#cbb997" }
      ],
      desc: "The everyday edit of our chain-handle tote — supple leather, a lighter frame and a roomier opening for the days that carry more.",
      details: [
        "Smooth calfskin with chain-and-leather handle",
        "Open top with interior zip pocket",
        "Made in Italy"
      ],
      composition: "Outer: 100% Calf Leather. Lining: 100% Cotton."
    },
    {
      id: "marlene-natural", vendor: "ZUHAIR MURAD", sku: "ZM-20561",
      name: "Marlene 50 Python-Print Pump",
      cat: "shoes", price: 4100, compareAt: 5900,
      sizes: ["36","37","38","39","40","41"], soldOutSizes: ["41"],
      variants: [
        { color: "Python Natural", hex: "#8a7350", image: "images/product4.png" },
        { color: "Python Taupe",   hex: "#b8a582", image: "images/MARLENE-PUMP-50_TAUPE_F2055-803-461_A.webp" },
        { color: "Black",          hex: "#191919" }
      ],
      desc: "A pointed pump raised on a slender 50mm heel, cut from python-print leather. The quiet proportion that finishes tailoring and evening alike.",
      details: [
        "Python-print leather upper",
        "50mm covered heel; pointed toe",
        "Leather sole and lining",
        "Made in Italy"
      ],
      composition: "Upper, lining & sole: 100% Leather."
    },
    {
      id: "marlene-taupe", vendor: "ZUHAIR MURAD", sku: "ZM-20562",
      name: "Marlene 50 Python-Print Pump",
      cat: "shoes", price: 4300,
      sizes: ["36","37","38","39","40","41"],
      variants: [
        { color: "Python Taupe",   hex: "#b8a582", image: "images/MARLENE-PUMP-50_TAUPE_F2055-803-461_A.webp" },
        { color: "Python Natural", hex: "#8a7350", image: "images/product4.png" },
        { color: "Black",          hex: "#191919" }
      ],
      desc: "The Marlene pump in a warm taupe python print — a softer neutral that reads as barely-there with bare legs.",
      details: [
        "Python-print leather upper",
        "50mm covered heel; pointed toe",
        "Leather sole and lining",
        "Made in Italy"
      ],
      composition: "Upper, lining & sole: 100% Leather."
    },
    {
      id: "emma-tote", vendor: "ZUHAIR MURAD", sku: "ZM-11890",
      name: "Emma Mini Ruby-Multi Tote",
      cat: "bags", price: 6900, compareAt: 8600,
      variants: [
        { color: "Ruby Multi", hex: "#7e2233", image: "images/EMMA-TOTE-MINI_RUBY-MULTI_H1041-878-695_A.webp" },
        { color: "Navy",       hex: "#22304f" },
        { color: "Olive",      hex: "#4b4a2f" }
      ],
      desc: "A jewel-toned mini in colour-blocked leather. Small in scale, generous in presence — sized for a phone, a card holder and a lipstick.",
      details: [
        "Colour-blocked calf leather",
        "Twin rolled handles with optional shoulder strap",
        "Snap closure; single interior pocket",
        "Made in Italy"
      ],
      composition: "Outer: 100% Calf Leather. Lining: 100% Cotton."
    },
    {
      id: "inara-top", vendor: "ZUHAIR MURAD", sku: "ZM-30047",
      name: "Inara Ice-Green Draped Top",
      cat: "clothing", price: 1850, tag: "New",
      sizes: ["XS","S","M","L","XL"], soldOutSizes: ["XL"],
      variants: [
        { color: "Ice Green", hex: "#d6e4dc", image: "images/INARA-TOP_ICE-GREEN_24814232-499_GHOST.webp" },
        { color: "Ivory",     hex: "#efece3" },
        { color: "Black",     hex: "#191919" }
      ],
      desc: "A fluid top in matte crêpe, gathered at one shoulder for a soft asymmetric drape. Weightless under tailoring, complete on its own.",
      details: [
        "Matte stretch crêpe",
        "Single-shoulder gathered drape",
        "Concealed side zip",
        "Dry clean only"
      ],
      composition: "Main: 96% Triacetate, 4% Polyurethane."
    },
    {
      id: "auggie-short", vendor: "ZUHAIR MURAD", sku: "ZM-30048",
      name: "Tailored Wool-Blend Bermuda Shorts",
      cat: "clothing", price: 2200,
      sizes: ["34","36","38","40","42"],
      variants: [
        { color: "Dark Olive", hex: "#4b4a2f", image: "images/AUGGIE-SHORT_DARK-OLIVE_3205582-429_GHOST_dd4bd26c-edae-43f5-932d-4e9e8f907fc1.webp" },
        { color: "Black",      hex: "#191919" },
        { color: "Sand",       hex: "#cbb997" }
      ],
      desc: "A pressed Bermuda short in a fine wool blend, cut to a clean knee length with a flat front. Tailoring proportions, warm-weather ease.",
      details: [
        "Fine wool-blend suiting",
        "Flat front with pressed crease; hook-and-bar closure",
        "Slant hip pockets; single welt back pocket",
        "Dry clean only"
      ],
      composition: "Main: 78% Virgin Wool, 20% Polyamide, 2% Elastane."
    }
  ];

  var CAT_LABELS = { shoes: "Shoes", bags: "Bags", clothing: "Ready-to-Wear" };

  /* ── Helpers ──────────────────────────────────────────────── */
  function money(qar) { return "QAR " + Number(qar).toLocaleString("en-US"); }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  /* Country of origin — read off the last "Made in X" detail bullet;
     every product in this catalogue is finished in Italy even when
     that line is omitted from the copy, so default to it. */
  function originOf(p) {
    var line = (p.details || []).find(function (d) { return /^Made in /i.test(d); });
    return line ? line.replace(/^Made in /i, "") : "Italy";
  }

  /* Short colour code for the SKU suffix, e.g. "Ice Blue" → "ICE". */
  function skuColorCode(color) {
    return color ? color.replace(/\s+/g, "").toUpperCase().slice(0, 3) : "";
  }

  /* Full SKU for whichever colour/size is currently selected. */
  function computeSku() {
    var variant = product.variants[state.variant];
    var bits = [product.sku, skuColorCode(variant && variant.color)];
    if (state.size) bits.push(state.size);
    return bits.filter(Boolean).join("-");
  }

  function getParam(name) {
    var m = new RegExp("[?&]" + name + "=([^&]+)").exec(window.location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : null;
  }

  /* Distinct photos for a product — its variants' images, in order. */
  function galleryOf(p) {
    if (p.gallery && p.gallery.length) return p.gallery;
    var seen = {}, imgs = [];
    p.variants.forEach(function (v) {
      if (v.image && !seen[v.image]) { seen[v.image] = 1; imgs.push(v.image); }
    });
    return imgs;
  }

  /* First variant index that actually carries a photo. */
  function firstImageVariant(p) {
    for (var i = 0; i < p.variants.length; i++) if (p.variants[i].image) return i;
    return 0;
  }

  /* The image to show for the selected variant (falls back to the
     first variant that owns a photo when the pick is colour-only). */
  function imageForVariant(p, idx) {
    var v = p.variants[idx];
    if (v && v.image) return v.image;
    return p.variants[firstImageVariant(p)].image;
  }

  /* First in-stock size — pre-selected by default, same as the colour swatch. */
  function firstAvailableSize(p) {
    if (!p.sizes || !p.sizes.length) return null;
    for (var i = 0; i < p.sizes.length; i++) {
      if (!p.soldOutSizes || p.soldOutSizes.indexOf(p.sizes[i]) === -1) return p.sizes[i];
    }
    return p.sizes[0];
  }

  /* ── Resolve the product from ?id= ────────────────────────── */
  var product = PRODUCTS.find(function (p) { return p.id === getParam("id"); }) || PRODUCTS[0];
  var gallery = galleryOf(product);

  var state = {
    variant: firstImageVariant(product),
    size: firstAvailableSize(product),
    wished: false,
    photo: imageForVariant(product, firstImageVariant(product)),
    reviews: [],          // populated just below (after state_reviews exists)
    lbIndex: 0,           // lightbox image index
    formRating: 0         // stars picked in the review form
  };

  /* ── SVG glyphs (match the header/listing set) ────────────── */
  var HEART = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>';
  var BAG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 7h12l1 13H5z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>';

  /* Selected colour swatch per related-card, keyed by product id
     (mirrors listing.js's state.selected for the same card style). */
  var relSelected = {};
  var CHEV = '<svg class="pdp-acc-chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';
  function svcIcon(d) {
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' + d + "</svg>";
  }
  var SVC = [
    { icon: '<path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>', label: "Complimentary delivery on orders over QAR 499" },
    { icon: '<path d="M3 12a9 9 0 1 0 9-9 9 9 0 0 0-7 3.3M3 4v3.5h3.5"/>', label: "Free 14-day returns & exchanges" },
    { icon: '<path d="M12 3l7 3v5c0 4.4-3 8-7 10-4-2-7-5.6-7-10V6z"/><path d="m9.5 12 2 2 3.5-4"/>', label: "Guaranteed authentic · Blue Salon since 1981" }
  ];

  /* ── Share icons (match the footer's social glyph set) ────── */
  var SHARE_WHATSAPP = '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5-1.3c1.4.8 3.1 1.3 4.9 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2zm5.9 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.6-1.2-3.1s.8-2.2 1.1-2.5c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5.2.5.7 1.7.8 1.9.1.2.1.3 0 .5-.1.2-.2.3-.3.5l-.5.5c-.2.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.4.1.6-.1l.7-.8c.2-.3.4-.2.6-.1l1.7.8c.2.1.3.1.4.3.1.2.1.9-.1 1.6z"/></svg>';
  var SHARE_FACEBOOK = '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"/></svg>';
  var SHARE_INSTAGRAM = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>';
  var SHARE_EMAIL = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>';

  /* "Share" row — WhatsApp/Facebook open a real share dialog; Instagram
     has no web share URL scheme, so it copies the link instead. */
  function shareHTML() {
    var url = window.location.href;
    var text = product.name + " — " + product.vendor + " · Blue Salon";
    var wa = "https://wa.me/?text=" + encodeURIComponent(text + " " + url);
    var fb = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);
    var mail = "mailto:?subject=" + encodeURIComponent(text) + "&body=" + encodeURIComponent(text + "\n\n" + url);
    return (
      '<div class="pdp-share">' +
        '<span class="pdp-share-label">Share</span>' +
        '<a class="pdp-share-btn pdp-share-whatsapp" href="' + wa + '" target="_blank" rel="noopener" aria-label="Share on WhatsApp">' + SHARE_WHATSAPP + "</a>" +
        '<a class="pdp-share-btn pdp-share-facebook" href="' + fb + '" target="_blank" rel="noopener" aria-label="Share on Facebook">' + SHARE_FACEBOOK + "</a>" +
        '<button type="button" class="pdp-share-btn pdp-share-instagram" data-share-instagram aria-label="Copy link to share on Instagram">' + SHARE_INSTAGRAM + "</button>" +
        '<a class="pdp-share-btn pdp-share-email" href="' + mail + '" aria-label="Share via email">' + SHARE_EMAIL + "</a>" +
      "</div>"
    );
  }
  var ICON_CLOSE = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  var ICON_PREV = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="m15 6-6 6 6 6"/></svg>';
  var ICON_NEXT = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>';
  var ICON_RULER = '<svg width="18" height="14" viewBox="0 0 24 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="22" height="10" rx="1"/><path d="M5 3v3M9 3v5M13 3v3M17 3v5M21 3v3"/></svg>';

  /* Mozoon tier-card watermarks — pick up the card's text colour via currentColor. */
  var ICON_MZ_DROPLET = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c3.5 4 6 7.4 6 10.5a6 6 0 1 1-12 0C6 10.4 8.5 7 12 3z"/></svg>';
  var ICON_MZ_WAVE = '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0"/><path d="M2 15c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0"/></svg>';
  var ICON_MZ_GEM = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9 8 4h8l4 5-8 11z"/><path d="M4 9h16M9 9 12 4l3 5M9 9l3 11 3-11"/></svg>';

  /* One star glyph; `on` fills it, otherwise it reads as an outline. */
  function starSVG(on) {
    return '<svg class="pdp-star' + (on ? " is-on" : "") + '" width="16" height="16" viewBox="0 0 24 24" ' +
      'stroke="currentColor" stroke-width="1.4" stroke-linejoin="round">' +
      '<path d="M12 2.8l2.85 5.77 6.37.93-4.61 4.49 1.09 6.34L12 17.85 6.31 20.33l1.09-6.34L2.79 9.5l6.37-.93z"/></svg>';
  }
  function starsHTML(rating, cls) {
    var full = Math.round(rating), s = "";
    for (var i = 1; i <= 5; i++) s += starSVG(i <= full);
    return '<span class="pdp-stars' + (cls ? " " + cls : "") + '" role="img" aria-label="' +
      rating + ' out of 5 stars">' + s + "</span>";
  }

  /* Seed reviews — a small, believable set so the block reads complete.
     New submissions are prepended to this list at runtime. */
  var state_reviews = [
    { name: "Layla A.", rating: 5, title: "Beautifully made", verified: true, date: "2 weeks ago",
      body: "Even more refined in person — the finish is impeccable and it feels like a true investment piece. Packaging was beautiful too." },
    { name: "Noor H.", rating: 4, title: "Elegant, a touch snug", verified: true, date: "1 month ago",
      body: "Gorgeous quiet-luxury look and the colour is exactly as pictured. I'd suggest sizing up if you're between sizes." },
    { name: "Sara M.", rating: 5, title: "Worth every riyal", verified: false, date: "2 months ago",
      body: "Compliments every time I wear it. Blue Salon's service was excellent as always." }
  ];
  state.reviews = state_reviews.slice();

  /* ── Markup builders ──────────────────────────────────────── */
  function galleryHTML() {
    var single = gallery.length < 2;
    var thumbs = gallery.map(function (src, i) {
      return '<button type="button" class="pdp-thumb' + (src === state.photo ? " is-active" : "") +
        '" data-thumb="' + i + '" aria-label="View image ' + (i + 1) + '">' +
        '<img src="' + src + '" alt="" loading="lazy"></button>';
    }).join("");

    return '<div class="pdp-gallery' + (single ? " is-single" : "") + '">' +
        (single ? "" : '<div class="pdp-thumbs">' + thumbs + "</div>") +
        '<figure class="pdp-main" data-zoom tabindex="0" role="button" aria-label="Zoom image">' +
          '<img id="pdpMainImg" src="' + state.photo + '" alt="' + esc(product.name) + '">' +
          (product.tag ? '<span class="pdp-tag' + (product.tag === "New" ? " dark" : "") + '">' + esc(product.tag) + "</span>" : "") +
          '<button type="button" class="pdp-wish" id="pdpWish" aria-label="Add to wishlist" aria-pressed="false">' + HEART + "</button>" +
          (completeTheLookItems().length
            ? '<button type="button" class="pdp-ctl-jump" id="pdpCtlJump">Complete the Look' +
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>' +
              "</button>"
            : "") +
        "</figure>" +
      "</div>";
  }

  function swatchesHTML() {
    return product.variants.map(function (v, i) {
      return '<button type="button" class="pdp-swatch' + (i === state.variant ? " is-active" : "") +
        '" data-swatch="' + i + '" style="background:' + v.hex + '" ' +
        'aria-label="' + esc(v.color) + '" aria-pressed="' + (i === state.variant) + '" title="' + esc(v.color) + '"></button>';
    }).join("");
  }

  function sizesHTML() {
    if (!product.sizes || !product.sizes.length) return "";
    var chips = product.sizes.map(function (s) {
      var soldOut = product.soldOutSizes && product.soldOutSizes.indexOf(s) !== -1;
      return '<button type="button" class="pdp-size' +
        (soldOut ? " is-soldout" : "") + (s === state.size ? " is-active" : "") + '" ' +
        (soldOut ? 'disabled aria-disabled="true" ' : "") +
        'data-size="' + s + '">' + s + "</button>";
    }).join("");
    return (
      '<div class="pdp-block">' +
        '<div class="pdp-block-head">' +
          '<span class="pdp-colour-label" id="pdpSizeLabel">' +
            (state.size ? 'Size: <span class="pdp-colour-name">' + esc(state.size) + "</span>" : "Size") +
          "</span>" +
        "</div>" +
        '<div class="pdp-sizes">' + chips + "</div>" +
        '<p class="pdp-size-hint" id="pdpSizeHint" hidden>Please select a size.</p>' +
        '<button type="button" class="pdp-link pdp-guide-link" data-guide>' + ICON_RULER + "Size guide</button>" +
      "</div>"
    );
  }

  /* Specifications — SKU/colour/size stay live via their ids, updated
     in place whenever the swatch or size chip selection changes. */
  function specsHTML() {
    var variant = product.variants[state.variant];
    var rows = [
      ["SKU", '<span id="pdpSpecSku">' + esc(computeSku()) + "</span>"],
      ["Colour", '<span id="pdpSpecColour">' + esc(variant ? variant.color : "—") + "</span>"]
    ];
    if (product.sizes && product.sizes.length) {
      rows.push(["Size", '<span id="pdpSpecSize">' + esc(state.size || "—") + "</span>"]);
    }
    rows.push(["Brand", esc(product.vendor)]);
    rows.push(["Category", esc(CAT_LABELS[product.cat] || product.cat)]);
    rows.push(["Material", esc(product.composition)]);
    rows.push(["Made in", esc(originOf(product))]);
    return '<ul class="pdp-spec-list">' + rows.map(function (r) {
      return "<li><span class='pdp-spec-key'>" + r[0] + "</span><span class='pdp-spec-val'>" + r[1] + "</span></li>";
    }).join("") + "</ul>";
  }

  function accordionHTML() {
    var items = [
      { title: "Details", open: true, body: "<ul class='pdp-detail-list'>" +
          product.details.map(function (d) { return "<li>" + esc(d) + "</li>"; }).join("") + "</ul>" },
      { title: "Specifications", open: false, body: specsHTML() },
      { title: "Composition & Care", open: false, body: "<p>" + esc(product.composition) +
          "</p><p>Store dust-bag protected, away from direct light and heat.</p>" },
      { title: "Shipping & Returns", open: false, body:
          "<p>Complimentary delivery across Qatar on orders over QAR 499, dispatched within 1–2 business days. " +
          "Returns and exchanges are free within 14 days, in original condition with tags attached.</p>" }
    ];
    return '<div class="pdp-accordion">' + items.map(function (it) {
      return '<div class="pdp-acc' + (it.open ? " is-open" : "") + '">' +
        '<button type="button" class="pdp-acc-head" aria-expanded="' + it.open + '">' +
          "<span>" + it.title + "</span>" + CHEV +
        "</button>" +
        '<div class="pdp-acc-body"><div class="pdp-acc-inner">' + it.body + "</div></div>" +
      "</div>";
    }).join("") + "</div>";
  }

  /* Buy-now-pay-later line — splits the current selling price into 4. */
  function payLaterHTML() {
    var amt = (product.price / 4).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return '<p class="pdp-paylater">or 4 interest-free payments of <b>QAR ' + amt + '</b> with <b>PayLater</b></p>';
  }

  /* Loyalty earn banner — MOZOON points (1 point per QAR spent). */
  function loyaltyHTML() {
    var pts = Math.round(product.price);
    return '<div class="pdp-loyalty">' +
        '<span class="pdp-loyalty-badge" aria-hidden="true">' +
          '<span class="pdp-loyalty-ar">مزون</span>' +
          '<span class="pdp-loyalty-en">MOZOON</span>' +
        "</span>" +
        '<span class="pdp-loyalty-text">Earn <strong>' + pts.toLocaleString("en-US") + "</strong> Mozoon Points</span>" +
        '<button type="button" class="pdp-loyalty-help" data-mozoon-open aria-label="About Mozoon points">?</button>' +
      "</div>";
  }

  function panelHTML() {
    var onSale = product.compareAt && product.compareAt > product.price;
    var price = onSale
      ? '<span class="pdp-was">' + money(product.compareAt) + '</span>' +
        '<span class="pdp-now">' + money(product.price) + "</span>"
      : '<span class="pdp-price-val">' + money(product.price) + "</span>";

    return (
      '<div class="pdp-panel">' +
        '<a class="pdp-brand" href="listing.html">' + esc(product.vendor) + "</a>" +
        '<h1 class="pdp-name">' + esc(product.name) + "</h1>" +
        '<div class="pdp-price' + (onSale ? " is-sale" : "") + '">' + price +
          (onSale ? '<span class="pdp-price-tag">Sale</span>' : "") + "</div>" +
        payLaterHTML() +
        loyaltyHTML() +
        '<hr class="bs-rule-gold pdp-rule">' +

        '<div class="pdp-block">' +
          '<div class="pdp-block-head">' +
            '<span class="pdp-colour-label">Colour: <span class="pdp-colour-name" id="pdpColourName">' + esc(product.variants[state.variant].color) + "</span></span>" +
          "</div>" +
          '<div class="pdp-swatches">' + swatchesHTML() + "</div>" +
        "</div>" +

        sizesHTML() +

        '<div class="pdp-buy">' +
          '<button type="button" class="pdp-addbag" id="pdpAddBag">Add to cart</button>' +
          '<button type="button" class="pdp-buynow" id="pdpBuyNow">Buy now</button>' +
        "</div>" +

        shareHTML() +

        accordionHTML() +

        '<ul class="pdp-service">' + SVC.map(function (s) {
          return '<li tabindex="0" aria-label="' + s.label + '">' + svcIcon(s.icon) +
            '<span class="pdp-service-tip" role="tooltip">' + s.label + "</span></li>";
        }).join("") + "</ul>" +

        completeTheLookHTML() +
      "</div>"
    );
  }

  function crumbHTML() {
    return '<nav class="pdp-crumbs" aria-label="Breadcrumb">' +
        '<a href="index.html">Home</a><span class="sep">/</span>' +
        '<a href="women.html">Women</a><span class="sep">/</span>' +
        '<a href="listing.html">' + esc(CAT_LABELS[product.cat] || "New In") + "</a><span class='sep'>/</span>" +
        '<span class="current">' + esc(product.name) + "</span>" +
      "</nav>";
  }

  /* ── Reviews ──────────────────────────────────────────────── */
  /* Empty state — the "What do you think?" prompt card. */
  function reviewsEmptyHTML() {
    var doc = '<svg class="pdp-review-icon" width="42" height="42" viewBox="0 0 24 24" fill="none" ' +
      'stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M7 2.6h6.5L18 7v12.2a1.2 1.2 0 0 1-1.2 1.2H8.6"/>' +
      '<path d="M13.4 2.6V7H18"/>' +
      '<path d="M9.5 11h5M9.5 13.8h3.4"/>' +
      '<path d="M8.6 20.4 6 21.4l.4-2.9V5a2.4 2.4 0 0 1 2.4-2.4"/></svg>';
    return '<div class="pdp-review-card">' +
        '<div class="pdp-review-prompt">' + doc +
          '<span>What do you think about<br>this product ?</span>' +
        "</div>" +
        '<button type="button" class="pdp-review-btn" data-review-open>Write a review</button>' +
      "</div>";
  }

  function reviewCardHTML(r) {
    return '<li class="pdp-rev-item">' +
        '<div class="pdp-rev-item-top">' + starsHTML(r.rating) +
          (r.title ? '<span class="pdp-rev-title">' + esc(r.title) + "</span>" : "") + "</div>" +
        '<p class="pdp-rev-body">' + esc(r.body) + "</p>" +
        '<div class="pdp-rev-meta">' +
          '<span class="pdp-rev-author">' + esc(r.name) + "</span>" +
          (r.verified ? '<span class="pdp-rev-verified">Verified purchase</span>' : "") +
          '<span class="pdp-rev-date">' + esc(r.date) + "</span>" +
        "</div>" +
      "</li>";
  }

  /* Populated state — score, distribution and the list of reviews. */
  function reviewsBodyHTML() {
    var rs = state.reviews;
    if (!rs.length) return reviewsEmptyHTML();

    var sum = rs.reduce(function (a, r) { return a + r.rating; }, 0);
    var avg = sum / rs.length;
    var dist = [0, 0, 0, 0, 0];
    rs.forEach(function (r) { dist[r.rating - 1]++; });

    var bars = "";
    for (var star = 5; star >= 1; star--) {
      var count = dist[star - 1];
      var pct = Math.round((count / rs.length) * 100);
      bars += '<div class="pdp-dist-row">' +
        '<span class="pdp-dist-label">' + star + " " + starSVG(true) + "</span>" +
        '<span class="pdp-dist-track"><span class="pdp-dist-fill" style="width:' + pct + '%"></span></span>' +
        '<span class="pdp-dist-count">' + count + "</span>" +
      "</div>";
    }

    return '<div class="pdp-rev-summary">' +
        '<div class="pdp-rev-score">' +
          '<span class="pdp-rev-avg">' + avg.toFixed(1) + "</span>" +
          starsHTML(avg, "lg") +
          '<span class="pdp-rev-count">Based on ' + rs.length + " review" + (rs.length === 1 ? "" : "s") + "</span>" +
          '<button type="button" class="pdp-review-btn sm" data-review-open>Write a review</button>' +
        "</div>" +
        '<div class="pdp-rev-dist">' + bars + "</div>" +
      "</div>" +
      '<ul class="pdp-rev-list">' + rs.map(reviewCardHTML).join("") + "</ul>";
  }

  function reviewsHTML() {
    return '<section class="pdp-reviews">' +
        '<h2 class="pdp-reviews-title">Reviews</h2>' +
        '<div id="pdpReviewsBody">' + reviewsBodyHTML() + "</div>" +
      "</section>";
  }

  /* Full-screen image viewer. */
  function lightboxHTML() {
    var multi = gallery.length > 1;
    var thumbs = gallery.map(function (src, i) {
      return '<button type="button" class="pdp-lb-thumb" data-lbthumb="' + i + '" aria-label="Image ' + (i + 1) + '">' +
        '<img src="' + src + '" alt=""></button>';
    }).join("");
    return '<div class="pdp-lightbox" id="pdpLightbox" hidden aria-hidden="true" role="dialog" aria-modal="true" aria-label="Image viewer">' +
        '<button type="button" class="pdp-lb-close" data-lbclose aria-label="Close viewer">' + ICON_CLOSE + "</button>" +
        (multi ? '<button type="button" class="pdp-lb-nav pdp-lb-prev" data-lbprev aria-label="Previous image">' + ICON_PREV + "</button>" : "") +
        '<figure class="pdp-lb-stage"><img class="pdp-lb-img" id="pdpLbImg" src="" alt="' + esc(product.name) + '"></figure>' +
        (multi ? '<button type="button" class="pdp-lb-nav pdp-lb-next" data-lbnext aria-label="Next image">' + ICON_NEXT + "</button>" : "") +
        (multi ? '<div class="pdp-lb-thumbs">' + thumbs + "</div>" : "") +
      "</div>";
  }

  /* Slim add-to-bag bar that appears once the buy panel scrolls away. */
  function stickyBarHTML() {
    var onSale = product.compareAt && product.compareAt > product.price;
    var price = onSale
      ? '<span class="was">' + money(product.compareAt) + '</span> <span class="now">' + money(product.price) + "</span>"
      : money(product.price);
    return '<div class="pdp-stickybar" id="pdpStickyBar" aria-hidden="true">' +
        '<div class="pdp-sb-inner">' +
          '<img class="pdp-sb-thumb" id="pdpSbThumb" src="' + state.photo + '" alt="">' +
          '<div class="pdp-sb-info">' +
            '<span class="pdp-sb-brand">' + esc(product.vendor) + "</span>" +
            '<span class="pdp-sb-name">' + esc(product.name) + "</span>" +
          "</div>" +
          '<span class="pdp-sb-price">' + price + "</span>" +
          '<button type="button" class="pdp-sb-add" id="pdpSbAdd">Add to cart</button>' +
        "</div>" +
      "</div>";
  }

  /* Review composer modal. */
  function reviewModalHTML() {
    var starBtns = "";
    for (var i = 1; i <= 5; i++) {
      starBtns += '<button type="button" class="pdp-star-btn" data-star="' + i + '" aria-label="' + i + ' star' + (i === 1 ? "" : "s") + '">' + starSVG(false) + "</button>";
    }
    return '<div class="pdp-modal" id="pdpReviewModal" hidden aria-hidden="true" role="dialog" aria-modal="true" aria-label="Write a review">' +
        '<div class="pdp-modal-panel">' +
          '<button type="button" class="pdp-modal-close" data-review-close aria-label="Close">' + ICON_CLOSE + "</button>" +
          '<p class="bs-eyebrow">' + esc(product.vendor) + "</p>" +
          '<h3 class="pdp-modal-title">Write a review</h3>' +
          '<p class="pdp-modal-sub">' + esc(product.name) + "</p>" +

          '<label class="pdp-field-label">Your rating</label>' +
          '<div class="pdp-star-input" id="pdpStarInput">' + starBtns + "</div>" +

          '<label class="pdp-field-label" for="pdpRvName">Name</label>' +
          '<input class="pdp-input" id="pdpRvName" type="text" placeholder="e.g. Fatima K." maxlength="40">' +

          '<label class="pdp-field-label" for="pdpRvTitle">Title <span>(optional)</span></label>' +
          '<input class="pdp-input" id="pdpRvTitle" type="text" placeholder="Summarise your experience" maxlength="60">' +

          '<label class="pdp-field-label" for="pdpRvBody">Your review</label>' +
          '<textarea class="pdp-input pdp-textarea" id="pdpRvBody" rows="4" placeholder="What did you love? How does it fit?" maxlength="600"></textarea>' +

          '<p class="pdp-modal-error" id="pdpRvError" hidden>Please add a rating and a few words.</p>' +
          '<div class="pdp-modal-actions">' +
            '<button type="button" class="pdp-btn-ghost" data-review-close>Cancel</button>' +
            '<button type="button" class="pdp-btn-solid" id="pdpRvSubmit">Submit review</button>' +
          "</div>" +
        "</div>" +
      "</div>";
  }

  /* Mozoon loyalty side panel — a rewards-card summary plus the real
     three-tier programme (Aqua/Azure/Sapphire). All account figures
     (balance, card number, spend-to-next-tier) are illustrative — the
     site has no real login/account state to read them from. */
  var MZ_TIERS = [
    { key: "aqua", label: "Aqua", icon: ICON_MZ_DROPLET,
      desc: "Aqua is the entry level in the unique Mozoon programme. It's an open invitation to all customers to join Mozoon." },
    { key: "azure", label: "Azure", icon: ICON_MZ_WAVE,
      desc: "Azure is the next level, specially designed for our frequent shoppers who spend more than QAR 25,000 in 12 months." },
    { key: "sapphire", label: "Sapphire", icon: ICON_MZ_GEM,
      desc: "Sapphire is the highest level, awarded to our most loyal members who spend more than QAR 50,000 in 12 months." }
  ];

  function mzTierCardsHTML() {
    return MZ_TIERS.map(function (t) {
      return '<div class="pdp-mz-tiercard-row">' +
          '<div class="pdp-mz-tiercard pdp-mz-tiercard-' + t.key + '">' +
            '<span class="pdp-mz-tiercard-icon" aria-hidden="true">' + t.icon + "</span>" +
            '<span class="pdp-mz-tiercard-name">' + esc(t.label) + "</span>" +
          "</div>" +
          '<h4 class="pdp-mz-tier-title">' + esc(t.label) + "</h4>" +
          '<p class="pdp-mz-tier-desc">' + esc(t.desc) + "</p>" +
        "</div>";
    }).join("");
  }

  /* Demo account state — the member's current tier, driving the card
     colour, the tier-row label and the progress dots together. */
  var MZ_CURRENT_TIER = "aqua";

  /* Last 5 online purchases — amounts sum to the QAR 6,400 already
     shown against the tier progress bar above. */
  var MZ_ACTIVITY = [
    { desc: "Online purchase — Zuhair Murad", date: "5 Jul 2026", amount: 1800 },
    { desc: "Online purchase — Zuhair Murad", date: "20 Jun 2026", amount: 1600 },
    { desc: "Online purchase — Zuhair Murad", date: "2 Jun 2026", amount: 1400 },
    { desc: "Online purchase — Zuhair Murad", date: "14 May 2026", amount: 900 },
    { desc: "Online purchase — Zuhair Murad", date: "28 Apr 2026", amount: 700 }
  ];

  function mzActivityHTML() {
    return MZ_ACTIVITY.map(function (a) {
      return '<li>' +
          '<div><p class="pdp-mz-activity-desc">' + esc(a.desc) + '</p><p class="pdp-mz-activity-date">' + esc(a.date) + "</p></div>" +
          '<span class="pdp-mz-activity-amt">' + money(a.amount) + "</span>" +
        "</li>";
    }).join("");
  }

  function mozoonDrawerHTML() {
    return (
      '<div class="pdp-mz-scrim" id="pdpMzScrim" hidden></div>' +
      '<aside class="pdp-mz-drawer" id="pdpMzDrawer" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Mozoon loyalty programme" hidden>' +
        '<button type="button" class="pdp-mz-close" data-mozoon-close aria-label="Close">' + ICON_CLOSE + "</button>" +
        '<div class="pdp-mz-body">' +

          '<div class="pdp-mz-card pdp-mz-card-' + MZ_CURRENT_TIER + '">' +
            '<div class="pdp-mz-card-top">' +
              '<span class="pdp-mz-card-label">Mozoon</span>' +
              '<span class="pdp-mz-coin" aria-hidden="true">M</span>' +
            "</div>" +
            '<p class="pdp-mz-balance">420 <span>= QAR 21.00</span></p>' +
            '<p class="pdp-mz-cardnum">5217&nbsp;&nbsp;0043&nbsp;&nbsp;8821&nbsp;&nbsp;9034</p>' +
            '<div class="pdp-mz-barcode" aria-hidden="true"></div>' +
          "</div>" +

          '<div class="pdp-mz-tier-row">' +
            '<span class="pdp-mz-tier-name">Aqua</span>' +
            '<span class="pdp-mz-tier-next">QAR 18,600 to <strong>Azure</strong><br><span class="pdp-mz-tier-date">QAR 6,400 spent in the last 12 months</span></span>' +
          "</div>" +
          '<div class="pdp-mz-progress"><span class="pdp-mz-progress-fill" style="width:26%"></span><span class="pdp-mz-progress-thumb pdp-mz-dot-' + MZ_CURRENT_TIER + '" style="left:26%"></span><span class="pdp-mz-progress-end pdp-mz-dot-azure"></span></div>' +

          '<h3 class="pdp-mz-heading">Last 5 Purchases</h3>' +
          '<p class="pdp-mz-activity-note">For more information, visit Mozoon — <button type="button" class="pdp-link" data-mz-info>click here</button></p>' +
          '<ul class="pdp-mz-activity-list">' + mzActivityHTML() + "</ul>" +

          '<h3 class="pdp-mz-heading">Programme Tiers</h3>' +
          '<div class="pdp-mz-tiercards">' + mzTierCardsHTML() + "</div>" +

          '<p class="pdp-mz-fine">Applicable on purchases from Blue Salon, with spend measured over a rolling 12-month period.</p>' +
        "</div>" +
      "</aside>"
    );
  }

  /* ── Related ("You may also like") — same card style as the
     listing grid: tag badge, hover wishlist/bag actions, brand+price
     row, name, colour swatches. ─────────────────────────────── */
  var MAX_REL_SWATCHES = 3;

  function relatedCardHTML(p) {
    var variants = p.variants || [];
    var selIdx = relSelected[p.id] || 0;
    var img = imageForVariant(p, selIdx);
    var onSale = p.compareAt && p.compareAt > p.price;
    var price = onSale
      ? '<span class="was">' + money(p.compareAt) + '</span><span class="now">' + money(p.price) + "</span>"
      : money(p.price);

    var tag = "";
    if (onSale) tag = '<span class="pdp-rel-tag sale">Sale</span>';
    else if (p.tag) tag = '<span class="pdp-rel-tag' + (p.tag === "New" ? " dark" : "") + '">' + esc(p.tag) + "</span>";

    var shown = variants.slice(0, MAX_REL_SWATCHES);
    var extra = variants.length - shown.length;
    var swatches = shown.map(function (v, i) {
      var style = v.image ? "background-image:url(" + v.image + ")" : "background:" + v.hex;
      return '<button type="button" class="pdp-rel-swatch' + (v.image ? " has-img" : "") + (i === selIdx ? " is-active" : "") +
        '" data-rel-swatch="' + i + '" data-rel-id="' + p.id + '" style="' + style + '" ' +
        'aria-label="' + esc(v.color) + '" title="' + esc(v.color) + '"></button>';
    }).join("");
    if (extra > 0) swatches += '<span class="pdp-rel-swatch-more">+' + extra + "</span>";

    var href = "product.html?id=" + p.id;
    return (
      '<div class="pdp-rel-card" data-rel-id="' + p.id + '">' +
        '<a class="pdp-rel-media" href="' + href + '" aria-label="' + esc(p.name) + '">' +
          '<img class="pdp-rel-img" src="' + img + '" alt="' + esc(p.name) + '" loading="lazy">' +
          tag +
          '<div class="pdp-rel-actions">' +
            '<button type="button" class="pdp-rel-action" data-rel-wish="' + p.id + '" aria-label="Add to wishlist">' + HEART + "</button>" +
            '<button type="button" class="pdp-rel-action" data-rel-add="' + p.id + '" aria-label="Add to cart">' + BAG + "</button>" +
          "</div>" +
        "</a>" +
        '<div class="pdp-rel-info">' +
          '<div class="pdp-rel-row">' +
            '<a class="pdp-rel-brand" href="' + href + '">' + esc(p.vendor) + "</a>" +
            '<span class="pdp-rel-price">' + price + "</span>" +
          "</div>" +
          '<a class="pdp-rel-name" href="' + href + '">' + esc(p.name) + "</a>" +
          (variants.length ? '<div class="pdp-rel-swatches">' + swatches + "</div>" : "") +
        "</div>" +
      "</div>"
    );
  }

  function relatedHTML() {
    var others = PRODUCTS.filter(function (p) { return p.id !== product.id; });
    others.sort(function (a, b) {
      var as = a.cat === product.cat ? 0 : 1, bs = b.cat === product.cat ? 0 : 1;
      return as - bs;
    });
    var cards = others.slice(0, 4).map(relatedCardHTML).join("");
    return '<section class="pdp-related">' +
        '<div class="pdp-related-head"><h2>You may also like</h2><hr class="bs-rule-gold"></div>' +
        '<div class="pdp-rel-grid">' + cards + "</div>" +
      "</section>";
  }

  /* ── Complete the Look — a vertical list in the info panel
     (image · name/price · Quick Shop), pulling complementary pieces
     from other categories so it reads as an outfit, not a duplicate
     of "You may also like" below. Quick Shop reuses the same
     [data-rel-add] add-to-bag wiring as the related cards. ────── */
  function completeTheLookItems() {
    var others = PRODUCTS.filter(function (p) { return p.id !== product.id; });
    others.sort(function (a, b) {
      var as = a.cat === product.cat ? 1 : 0, bs = b.cat === product.cat ? 1 : 0;
      return as - bs;
    });
    return others.slice(0, 3);
  }

  function completeTheLookHTML() {
    var items = completeTheLookItems();
    if (!items.length) return "";

    var rows = items.map(function (p) {
      var img = imageForVariant(p, firstImageVariant(p));
      var href = "product.html?id=" + p.id;
      return (
        '<div class="pdp-ctl-item">' +
          '<a class="pdp-ctl-media" href="' + href + '" aria-label="' + esc(p.name) + '">' +
            '<img src="' + img + '" alt="' + esc(p.name) + '" loading="lazy">' +
          "</a>" +
          '<div class="pdp-ctl-info">' +
            '<a class="pdp-ctl-name" href="' + href + '">' + esc(p.name) + "</a>" +
            '<span class="pdp-ctl-price">' + money(p.price) + "</span>" +
            '<button type="button" class="pdp-ctl-quickshop" data-rel-add="' + p.id + '">' + BAG + " Quick Shop</button>" +
          "</div>" +
        "</div>"
      );
    }).join("");

    return (
      '<div class="pdp-complete">' +
        '<h2 class="pdp-complete-title">Complete the Look</h2>' +
        '<div class="pdp-complete-list">' + rows + "</div>" +
      "</div>"
    );
  }

  /* ── Mount ────────────────────────────────────────────────── */
  var root = document.getElementById("pdp");
  if (!root) return;
  document.title = product.vendor + " — " + product.name + " · Blue Salon";

  root.innerHTML =
    crumbHTML() +
    '<div class="pdp-layout">' + galleryHTML() + panelHTML() + "</div>" +
    reviewsHTML() +
    relatedHTML() +
    lightboxHTML() +
    stickyBarHTML() +
    reviewModalHTML() +
    mozoonDrawerHTML();

  /* ── Shared helpers ───────────────────────────────────────── */
  var mainImg = document.getElementById("pdpMainImg");
  var hoverZoomCapable = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function setPhoto(src) {
    if (!src) return;
    state.photo = src;
    if (mainImg) mainImg.src = src;
    var sb = document.getElementById("pdpSbThumb");
    if (sb) sb.src = src;
    root.querySelectorAll(".pdp-thumb").forEach(function (t) {
      t.classList.toggle("is-active", gallery[Number(t.dataset.thumb)] === src);
    });
  }

  /* Keep the Specifications accordion's SKU/Colour/Size in step with
     whatever's currently selected, without re-rendering the whole
     accordion (which would also collapse it back closed). */
  function refreshSpecs() {
    var skuEl = document.getElementById("pdpSpecSku");
    if (skuEl) skuEl.textContent = computeSku();
    var colourEl = document.getElementById("pdpSpecColour");
    if (colourEl) colourEl.textContent = product.variants[state.variant].color;
    var sizeEl = document.getElementById("pdpSpecSize");
    if (sizeEl) sizeEl.textContent = state.size || "—";
  }

  function needsSize() { return product.sizes && product.sizes.length && !state.size; }

  function flagSize() {
    var hint = document.getElementById("pdpSizeHint");
    if (hint) hint.hidden = false;
    var sizesWrap = root.querySelector(".pdp-sizes");
    if (sizesWrap) {
      sizesWrap.classList.remove("shake");
      void sizesWrap.offsetWidth;                 // restart the animation
      sizesWrap.classList.add("shake");
      sizesWrap.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function bumpCart() {
    if (!window.BS_CART) return;
    var variant = product.variants[state.variant];
    window.BS_CART.add({
      id: product.id,
      vendor: product.vendor,
      name: product.name,
      image: state.photo,
      price: product.price,
      compareAt: product.compareAt,
      color: variant ? variant.color : null,
      colorHex: variant ? variant.hex : null,
      colorImage: variant ? variant.image : null,
      size: state.size,
      qty: 1
    });
  }

  function addToBag(btn, resetLabel) {
    if (needsSize()) { flagSize(); return; }
    bumpCart();
    if (btn) {
      btn.classList.add("is-added");
      btn.textContent = "Added to cart ✓";
      setTimeout(function () {
        btn.classList.remove("is-added");
        btn.textContent = resetLabel;
      }, 1600);
    }
  }

  /* ── Lightbox ─────────────────────────────────────────────── */
  var lightbox = document.getElementById("pdpLightbox");
  var lbImg = document.getElementById("pdpLbImg");

  function lbSet(i) {
    state.lbIndex = (i + gallery.length) % gallery.length;
    var src = gallery[state.lbIndex];
    if (lbImg) lbImg.src = src;
    lightbox.querySelectorAll(".pdp-lb-thumb").forEach(function (t, j) {
      t.classList.toggle("is-active", j === state.lbIndex);
    });
  }
  function openLightbox() {
    var idx = gallery.indexOf(state.photo);
    lbSet(idx === -1 ? 0 : idx);
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  /* ── Review modal ─────────────────────────────────────────── */
  var modal = document.getElementById("pdpReviewModal");

  function paintFormStars() {
    modal.querySelectorAll(".pdp-star-btn .pdp-star").forEach(function (star, i) {
      star.classList.toggle("is-on", i < state.formRating);
    });
  }
  function openReview() {
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeReview() {
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  /* ── Mozoon loyalty side panel ────────────────────────────── */
  var mzDrawer = document.getElementById("pdpMzDrawer");
  var mzScrim = document.getElementById("pdpMzScrim");
  function openMozoon() {
    mzDrawer.hidden = false;
    mzScrim.hidden = false;
    void mzDrawer.offsetWidth;  // commit the off-canvas state so the slide animates
    mzDrawer.classList.add("is-open");
    mzScrim.classList.add("is-open");
    mzDrawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeMozoon() {
    mzDrawer.classList.remove("is-open");
    mzScrim.classList.remove("is-open");
    mzDrawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    var onEnd = function () {
      mzDrawer.hidden = true;
      mzScrim.hidden = true;
      mzDrawer.removeEventListener("transitionend", onEnd);
    };
    mzDrawer.addEventListener("transitionend", onEnd);
  }
  function submitReview() {
    var rating = state.formRating;
    var name = (document.getElementById("pdpRvName").value || "").trim();
    var title = (document.getElementById("pdpRvTitle").value || "").trim();
    var body = (document.getElementById("pdpRvBody").value || "").trim();
    var err = document.getElementById("pdpRvError");
    if (!rating || body.length < 3) { if (err) err.hidden = false; return; }
    if (err) err.hidden = true;
    state.reviews.unshift({
      name: name || "Anonymous", rating: rating, title: title, body: body,
      verified: true, date: "Just now"
    });
    // reset the form
    state.formRating = 0;
    paintFormStars();
    document.getElementById("pdpRvName").value = "";
    document.getElementById("pdpRvTitle").value = "";
    document.getElementById("pdpRvBody").value = "";
    document.getElementById("pdpReviewsBody").innerHTML = reviewsBodyHTML();
    closeReview();
    document.getElementById("pdpReviewsBody").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ── Delegated clicks ─────────────────────────────────────── */
  root.addEventListener("click", function (e) {
    /* "Complete the Look" pill on the main image — jumps down to the
       list in the info panel. Checked early for the same reason as
       the wishlist button below (it also sits inside [data-zoom]). */
    if (e.target.closest("#pdpCtlJump")) {
      var ctlSection = document.querySelector(".pdp-complete");
      if (ctlSection) ctlSection.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    /* Wishlist toggle — checked before the zoom handler below since the
       button now sits inside the zoomable [data-zoom] figure. */
    var wish = e.target.closest("#pdpWish");
    if (wish) {
      state.wished = !state.wished;
      wish.classList.toggle("is-active", state.wished);
      wish.setAttribute("aria-pressed", state.wished);
      wish.setAttribute("aria-label", state.wished ? "Remove from wishlist" : "Add to wishlist");
      var wEl = document.getElementById("wishCount");
      if (wEl) {
        var wn = Math.max(0, (parseInt(wEl.textContent, 10) || 0) + (state.wished ? 1 : -1));
        wEl.textContent = wn;
        wEl.hidden = wn === 0;
      }
      if (window.bsToast) window.bsToast(state.wished ? "Added to wishlist" : "Removed from wishlist");
      return;
    }

    /* Zoom → open the lightbox. Skipped on mouse/hover-capable devices,
       where hovering the image already zooms it in place; touch devices
       (no hover) still tap to open it. */
    if (e.target.closest("[data-zoom]")) { if (!hoverZoomCapable) openLightbox(); return; }

    /* Lightbox controls */
    if (e.target.closest("[data-lbclose]")) { closeLightbox(); return; }
    if (e.target.closest("[data-lbprev]")) { lbSet(state.lbIndex - 1); return; }
    if (e.target.closest("[data-lbnext]")) { lbSet(state.lbIndex + 1); return; }
    var lbThumb = e.target.closest("[data-lbthumb]");
    if (lbThumb) { lbSet(Number(lbThumb.dataset.lbthumb)); return; }
    if (e.target === lightbox) { closeLightbox(); return; }  // backdrop

    /* Review modal open / close / stars / submit */
    if (e.target.closest("[data-review-open]")) { openReview(); return; }
    if (e.target.closest("[data-review-close]")) { closeReview(); return; }
    if (e.target === modal) { closeReview(); return; }        // backdrop

    /* Mozoon loyalty side panel */
    if (e.target.closest("[data-mozoon-open]")) { openMozoon(); return; }
    if (e.target.closest("[data-mozoon-close]")) { closeMozoon(); return; }
    if (e.target === mzScrim) { closeMozoon(); return; }  // backdrop

    var starBtn = e.target.closest("[data-star]");
    if (starBtn) { state.formRating = Number(starBtn.dataset.star); paintFormStars(); return; }
    if (e.target.closest("#pdpRvSubmit")) { submitReview(); return; }

    /* Thumbnail → swap main image */
    var thumb = e.target.closest(".pdp-thumbs [data-thumb]");
    if (thumb) { setPhoto(gallery[Number(thumb.dataset.thumb)]); return; }

    /* Colour swatch → select variant, swap image + label */
    var sw = e.target.closest("[data-swatch]");
    if (sw) {
      var idx = Number(sw.dataset.swatch);
      state.variant = idx;
      root.querySelectorAll(".pdp-swatch").forEach(function (el, i) {
        el.classList.toggle("is-active", i === idx);
        el.setAttribute("aria-pressed", i === idx);
      });
      var nameEl = document.getElementById("pdpColourName");
      if (nameEl) nameEl.textContent = product.variants[idx].color;
      setPhoto(imageForVariant(product, idx));
      refreshSpecs();
      return;
    }

    /* Size chip → single select */
    var sizeBtn = e.target.closest("[data-size]");
    if (sizeBtn && !sizeBtn.disabled) {
      state.size = sizeBtn.dataset.size;
      root.querySelectorAll(".pdp-size").forEach(function (el) {
        el.classList.toggle("is-active", el === sizeBtn);
      });
      var sizeLabel = document.getElementById("pdpSizeLabel");
      if (sizeLabel) sizeLabel.innerHTML = 'Size: <span class="pdp-colour-name">' + esc(state.size) + "</span>";
      var hint = document.getElementById("pdpSizeHint");
      if (hint) hint.hidden = true;
      refreshSpecs();
      return;
    }

    /* Accordion header → expand/collapse */
    var accHead = e.target.closest(".pdp-acc-head");
    if (accHead) {
      var acc = accHead.parentNode;
      var open = acc.classList.toggle("is-open");
      accHead.setAttribute("aria-expanded", open);
      return;
    }

    /* Size-guide link (placeholder) */
    if (e.target.closest("[data-guide]")) { e.preventDefault(); return; }

    /* Mozoon "visit for more information" link (placeholder) */
    if (e.target.closest("[data-mz-info]")) { e.preventDefault(); return; }

    /* Share on Instagram — no web share URL scheme exists, so copy
       the link instead and let the shopper paste it in. */
    if (e.target.closest("[data-share-instagram]")) {
      e.preventDefault();
      var shareUrl = window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareUrl).then(function () {
          if (window.bsToast) window.bsToast("Link copied — paste it into Instagram");
        }).catch(function () {
          if (window.bsToast) window.bsToast("Couldn’t copy the link — copy it from the address bar");
        });
      } else if (window.bsToast) {
        window.bsToast("Copy the link from the address bar to share on Instagram");
      }
      return;
    }

    /* Add to bag (main + sticky bar) */
    if (e.target.closest("#pdpAddBag")) { addToBag(document.getElementById("pdpAddBag"), "Add to cart"); return; }
    if (e.target.closest("#pdpSbAdd")) { addToBag(document.getElementById("pdpSbAdd"), "Add to cart"); return; }

    /* Buy now — skip the bag, go straight to checkout */
    if (e.target.closest("#pdpBuyNow")) {
      if (needsSize()) { flagSize(); return; }
      bumpCart();
      window.location.href = "cart.html";
      return;
    }

    /* Related card: colour swatch → swap that card's photo only */
    var relSw = e.target.closest("[data-rel-swatch]");
    if (relSw) {
      e.preventDefault();
      var relId = relSw.dataset.relId;
      var relProduct = PRODUCTS.find(function (p) { return p.id === relId; });
      var relIdx = Number(relSw.dataset.relSwatch);
      relSelected[relId] = relIdx;
      var relCard = relSw.closest(".pdp-rel-card");
      if (relCard && relProduct) {
        relCard.querySelectorAll(".pdp-rel-swatch").forEach(function (el, i) {
          el.classList.toggle("is-active", i === relIdx);
        });
        var relImg = relCard.querySelector(".pdp-rel-img");
        if (relImg) relImg.src = imageForVariant(relProduct, relIdx);
      }
      return;
    }

    /* Related card: wishlist (visual + header count only, same as elsewhere) */
    var relWish = e.target.closest("[data-rel-wish]");
    if (relWish) {
      e.preventDefault();
      var relWished = relWish.classList.toggle("is-active");
      relWish.setAttribute("aria-label", relWished ? "Remove from wishlist" : "Add to wishlist");
      var relWEl = document.getElementById("wishCount");
      if (relWEl) {
        var relWn = Math.max(0, (parseInt(relWEl.textContent, 10) || 0) + (relWished ? 1 : -1));
        relWEl.textContent = relWn;
        relWEl.hidden = relWn === 0;
      }
      if (window.bsToast) window.bsToast(relWished ? "Added to wishlist" : "Removed from wishlist");
      return;
    }

    /* Related card: add to bag (uses whichever colour is selected on the card) */
    var relAdd = e.target.closest("[data-rel-add]");
    if (relAdd) {
      e.preventDefault();
      var addId = relAdd.dataset.relAdd;
      var addProduct = PRODUCTS.find(function (p) { return p.id === addId; });
      if (addProduct && window.BS_CART) {
        var addVariant = addProduct.variants[relSelected[addId] || 0];
        window.BS_CART.add({
          id: addProduct.id,
          vendor: addProduct.vendor,
          name: addProduct.name,
          image: imageForVariant(addProduct, relSelected[addId] || 0),
          price: addProduct.price,
          compareAt: addProduct.compareAt,
          color: addVariant ? addVariant.color : null,
          colorHex: addVariant ? addVariant.hex : null,
          colorImage: addVariant ? addVariant.image : null,
          size: null,
          qty: 1
        });
      }
      if (window.bsToast) window.bsToast("Added to cart");
      return;
    }
  });

  /* Keyboard: Esc closes overlays; arrows page the lightbox; Enter/Space zooms. */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (!lightbox.hidden) closeLightbox();
      if (!modal.hidden) closeReview();
      if (!mzDrawer.hidden) closeMozoon();
      return;
    }
    if (!lightbox.hidden && gallery.length > 1) {
      if (e.key === "ArrowLeft") { lbSet(state.lbIndex - 1); }
      else if (e.key === "ArrowRight") { lbSet(state.lbIndex + 1); }
    }
  });
  var mainFig = root.querySelector("[data-zoom]");
  if (mainFig) mainFig.addEventListener("keydown", function (e) {
    // let these buttons handle their own Enter/Space instead of also zooming
    if (e.target.closest("#pdpWish") || e.target.closest("#pdpCtlJump")) return;
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(); }
  });

  /* Hover-to-zoom (mouse/trackpad only): the image scales up and pans to
     track the cursor, so the click-to-open-lightbox flow above is skipped
     on these devices — hovering already reveals the detail. */
  if (mainFig && hoverZoomCapable) {
    mainFig.addEventListener("mousemove", function (e) {
      var rect = mainFig.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 100;
      var y = ((e.clientY - rect.top) / rect.height) * 100;
      mainImg.style.transformOrigin = x + "% " + y + "%";
    });
    mainFig.addEventListener("mouseenter", function () { mainImg.classList.add("is-zoomed"); });
    mainFig.addEventListener("mouseleave", function () {
      mainImg.classList.remove("is-zoomed");
      mainImg.style.transformOrigin = "";
    });
  }

  /* ── Sticky bar: reveal once the buy panel scrolls out of view ── */
  var stickyBar = document.getElementById("pdpStickyBar");
  var buyRow = root.querySelector(".pdp-buy");
  if (stickyBar && buyRow && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      var en = entries[0];
      // Show only when the buy row has scrolled ABOVE the viewport.
      var show = !en.isIntersecting && en.boundingClientRect.top < 0;
      stickyBar.classList.toggle("is-visible", show);
      stickyBar.setAttribute("aria-hidden", show ? "false" : "true");
    }, { threshold: 0 });
    io.observe(buyRow);
  }
})();

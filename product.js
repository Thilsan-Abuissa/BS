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
      id: "miriam-ostrich", vendor: "ZUHAIR MURAD",
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
      id: "miriam-leather", vendor: "ZUHAIR MURAD",
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
      id: "marlene-natural", vendor: "ZUHAIR MURAD",
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
      id: "marlene-taupe", vendor: "ZUHAIR MURAD",
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
      id: "emma-tote", vendor: "ZUHAIR MURAD",
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
      id: "inara-top", vendor: "ZUHAIR MURAD",
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
      id: "auggie-short", vendor: "ZUHAIR MURAD",
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

  /* ── Resolve the product from ?id= ────────────────────────── */
  var product = PRODUCTS.find(function (p) { return p.id === getParam("id"); }) || PRODUCTS[0];
  var gallery = galleryOf(product);

  var state = {
    variant: firstImageVariant(product),
    size: null,
    wished: false,
    photo: imageForVariant(product, firstImageVariant(product)),
    reviews: [],          // populated just below (after state_reviews exists)
    lbIndex: 0,           // lightbox image index
    formRating: 0         // stars picked in the review form
  };

  /* ── SVG glyphs (match the header/listing set) ────────────── */
  var HEART = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>';
  var CHEV = '<svg class="pdp-acc-chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';
  function svcIcon(d) {
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' + d + "</svg>";
  }
  var SVC = [
    { icon: '<path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>', label: "Complimentary delivery on orders over QAR 499" },
    { icon: '<path d="M3 12a9 9 0 1 0 9-9 9 9 0 0 0-7 3.3M3 4v3.5h3.5"/>', label: "Free 14-day returns & exchanges" },
    { icon: '<path d="M12 3l7 3v5c0 4.4-3 8-7 10-4-2-7-5.6-7-10V6z"/><path d="m9.5 12 2 2 3.5-4"/>', label: "Guaranteed authentic · Blue Salon since 1981" }
  ];
  var ICON_CLOSE = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  var ICON_PREV = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="m15 6-6 6 6 6"/></svg>';
  var ICON_NEXT = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>';
  var ICON_TRUCK = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>';

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

  /* Estimated delivery window (2–4 business-ish days from today). */
  function deliveryWindow() {
    function add(days) { var d = new Date(); d.setDate(d.getDate() + days); return d; }
    function fmt(d) { return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }); }
    return fmt(add(2)) + " – " + fmt(add(4));
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
          '<span class="pdp-zoom-hint" aria-hidden="true">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3M11 8v6M8 11h6"/></svg>' +
          "</span>" +
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
          '<span class="pdp-label">Size</span>' +
          '<button type="button" class="pdp-link" data-guide>Size guide</button>' +
        "</div>" +
        '<div class="pdp-sizes">' + chips + "</div>" +
        '<p class="pdp-size-hint" id="pdpSizeHint" hidden>Please select a size.</p>' +
      "</div>"
    );
  }

  function accordionHTML() {
    var items = [
      { title: "Details", open: true, body: "<ul class='pdp-detail-list'>" +
          product.details.map(function (d) { return "<li>" + esc(d) + "</li>"; }).join("") + "</ul>" },
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

  /* Loyalty earn banner — MOZOON points (1 point per QAR spent). */
  function loyaltyHTML() {
    var pts = Math.round(product.price);
    return '<div class="pdp-loyalty">' +
        '<span class="pdp-loyalty-badge" aria-hidden="true">' +
          '<span class="pdp-loyalty-ar">مزون</span>' +
          '<span class="pdp-loyalty-en">MOZOON</span>' +
        "</span>" +
        '<span class="pdp-loyalty-text">Earn <strong>' + pts.toLocaleString("en-US") + "</strong> Mozoon Points</span>" +
        '<button type="button" class="pdp-loyalty-help" aria-label="About Mozoon points" ' +
          'title="Mozoon is Blue Salon’s loyalty programme — earn points on every purchase and redeem them in-store and online.">?</button>' +
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
        loyaltyHTML() +
        '<hr class="bs-rule-gold pdp-rule">' +
        '<p class="pdp-desc">' + esc(product.desc) + "</p>" +

        '<div class="pdp-block">' +
          '<div class="pdp-block-head">' +
            '<span class="pdp-label">Colour</span>' +
            '<span class="pdp-colour-name" id="pdpColourName">' + esc(product.variants[state.variant].color) + "</span>" +
          "</div>" +
          '<div class="pdp-swatches">' + swatchesHTML() + "</div>" +
        "</div>" +

        sizesHTML() +

        '<div class="pdp-buy">' +
          '<button type="button" class="pdp-addbag" id="pdpAddBag">Add to bag</button>' +
          '<button type="button" class="pdp-wish" id="pdpWish" aria-label="Add to wishlist" aria-pressed="false">' + HEART + "</button>" +
        "</div>" +

        '<p class="pdp-delivery">' + ICON_TRUCK +
          '<span>Order now for estimated delivery to Qatar <strong>' + deliveryWindow() + "</strong></span></p>" +

        '<ul class="pdp-service">' + SVC.map(function (s) {
          return "<li>" + svcIcon(s.icon) + "<span>" + s.label + "</span></li>";
        }).join("") + "</ul>" +

        accordionHTML() +
      "</div>"
    );
  }

  function crumbHTML() {
    return '<nav class="pdp-crumbs" aria-label="Breadcrumb">' +
        '<a href="index.html">Home</a><span class="sep">/</span>' +
        '<a href="listing.html">Women</a><span class="sep">/</span>' +
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
          '<button type="button" class="pdp-sb-add" id="pdpSbAdd">Add to bag</button>' +
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

  /* ── Related ("You may also like") ────────────────────────── */
  function relatedHTML() {
    var others = PRODUCTS.filter(function (p) { return p.id !== product.id; });
    others.sort(function (a, b) {
      var as = a.cat === product.cat ? 0 : 1, bs = b.cat === product.cat ? 0 : 1;
      return as - bs;
    });
    var cards = others.slice(0, 4).map(function (p) {
      var g = galleryOf(p);
      var img = g[0] || "";
      var onSale = p.compareAt && p.compareAt > p.price;
      var price = onSale
        ? '<span class="was">' + money(p.compareAt) + '</span><span class="now">' + money(p.price) + "</span>"
        : money(p.price);
      return '<a class="pdp-rel-card" href="product.html?id=' + p.id + '">' +
          '<span class="pdp-rel-media"><img src="' + img + '" alt="' + esc(p.name) + '" loading="lazy"></span>' +
          '<span class="pdp-rel-brand">' + esc(p.vendor) + "</span>" +
          '<span class="pdp-rel-name">' + esc(p.name) + "</span>" +
          '<span class="pdp-rel-price">' + price + "</span>" +
        "</a>";
    }).join("");
    return '<section class="pdp-related">' +
        '<div class="pdp-related-head"><h2>You may also like</h2><hr class="bs-rule-gold"></div>' +
        '<div class="pdp-rel-grid">' + cards + "</div>" +
      "</section>";
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
    reviewModalHTML();

  /* ── Shared helpers ───────────────────────────────────────── */
  var mainImg = document.getElementById("pdpMainImg");

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
    var cEl = document.getElementById("cartCount");
    if (!cEl) return;
    var cn = (parseInt(cEl.textContent, 10) || 0) + 1;
    cEl.textContent = cn;
    cEl.hidden = false;
  }

  function addToBag(btn, resetLabel) {
    if (needsSize()) { flagSize(); return; }
    bumpCart();
    if (btn) {
      btn.classList.add("is-added");
      btn.textContent = "Added to bag ✓";
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
    /* Zoom → open the lightbox */
    if (e.target.closest("[data-zoom]")) { openLightbox(); return; }

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
      return;
    }

    /* Size chip → single select */
    var sizeBtn = e.target.closest("[data-size]");
    if (sizeBtn && !sizeBtn.disabled) {
      state.size = sizeBtn.dataset.size;
      root.querySelectorAll(".pdp-size").forEach(function (el) {
        el.classList.toggle("is-active", el === sizeBtn);
      });
      var hint = document.getElementById("pdpSizeHint");
      if (hint) hint.hidden = true;
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

    /* Wishlist toggle */
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
      return;
    }

    /* Add to bag (main + sticky bar) */
    if (e.target.closest("#pdpAddBag")) { addToBag(document.getElementById("pdpAddBag"), "Add to bag"); return; }
    if (e.target.closest("#pdpSbAdd")) { addToBag(document.getElementById("pdpSbAdd"), "Add to bag"); return; }
  });

  /* Keyboard: Esc closes overlays; arrows page the lightbox; Enter/Space zooms. */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (!lightbox.hidden) closeLightbox();
      if (!modal.hidden) closeReview();
      return;
    }
    if (!lightbox.hidden && gallery.length > 1) {
      if (e.key === "ArrowLeft") { lbSet(state.lbIndex - 1); }
      else if (e.key === "ArrowRight") { lbSet(state.lbIndex + 1); }
    }
  });
  var mainFig = root.querySelector("[data-zoom]");
  if (mainFig) mainFig.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(); }
  });

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

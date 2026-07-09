/* ============================================================
   BLUE SALON — SHOPPING BAG (CART) PAGE
   Line items with qty/remove, free-delivery progress, promo code
   and an order summary, plus a small cross-sell strip. Reuses the
   shared header/footer wired by app.js; design tokens come from
   styles.css. Self-contained — the demo catalogue below mirrors
   the listing/product pages so a line item can deep-link back to
   its PDP via product.html?id=.
   ============================================================ */
(function () {
  "use strict";

  /* ── Demo catalogue (mirrors listing.js / product.js) ─────── */
  var CATALOG = {
    "miriam-ostrich": { vendor: "ZUHAIR MURAD", name: "Patchwork Leather Chain‑Handle Tote Bag", image: "images/0_1.webp", price: 9700 },
    "marlene-natural": { vendor: "ZUHAIR MURAD", name: "Marlene 50 Python-Print Pump", image: "images/product4.png", price: 4100, compareAt: 5900 },
    "inara-top": { vendor: "ZUHAIR MURAD", name: "Inara Ice-Green Draped Top", image: "images/INARA-TOP_ICE-GREEN_24814232-499_GHOST.webp", price: 1850 },
    "emma-tote": { vendor: "ZUHAIR MURAD", name: "Emma Mini Ruby-Multi Tote", image: "images/EMMA-TOTE-MINI_RUBY-MULTI_H1041-878-695_A.webp", price: 6900, compareAt: 8600 },
    "auggie-short": { vendor: "ZUHAIR MURAD", name: "Tailored Wool-Blend Bermuda Shorts", image: "images/AUGGIE-SHORT_DARK-OLIVE_3205582-429_GHOST_dd4bd26c-edae-43f5-932d-4e9e8f907fc1.webp", price: 2200 },
    "marlene-taupe": { vendor: "ZUHAIR MURAD", name: "Marlene 50 Python-Print Pump", image: "images/MARLENE-PUMP-50_TAUPE_F2055-803-461_A.webp", price: 4300 },
    "miriam-leather": { vendor: "ZUHAIR MURAD", name: "Patchwork Leather Chain‑Handle Tote Bag", image: "images/product2.png", price: 4500 }
  };

  var FREE_SHIP_THRESHOLD = 499; // QAR — matches the announcement bar / PDP delivery note
  var DELIVERY_FEE = 35;
  var PROMO_CODES = { "BLUE10": 0.10 };
  var REL_IDS = ["emma-tote", "auggie-short", "marlene-taupe", "miriam-leather"];

  var nextLine = 1;
  function lineItem(id, opts) {
    var p = CATALOG[id];
    return Object.assign({ id: id, line: nextLine++, vendor: p.vendor, name: p.name, image: p.image, price: p.price, compareAt: p.compareAt }, opts);
  }

  /* Read the shared cart store (app.js). On a genuine first-ever visit
     (the key was never written) seed it with a few demo items so the
     page isn't blank before anyone has added anything for real; after
     that, this page always reflects exactly what BS_CART holds. */
  function loadItems() {
    if (!window.BS_CART) return [];
    var stored = window.BS_CART.load();
    if (stored !== null) return stored;
    var seed = [
      lineItem("miriam-ostrich", { color: "Ice Blue", colorHex: "#bcc9cd", colorImage: "images/0_1.webp", size: "38", qty: 1 }),
      lineItem("marlene-natural", { color: "Python Natural", colorHex: "#8a7350", colorImage: "images/product4.png", size: "39", qty: 1 }),
      lineItem("inara-top", { color: "Ice Green", colorHex: "#d6e4dc", colorImage: "images/INARA-TOP_ICE-GREEN_24814232-499_GHOST.webp", size: "M", qty: 2 })
    ];
    return window.BS_CART.save(seed);
  }

  var state = {
    items: loadItems(),
    promoCode: null,
    promoInput: "",
    promoMsg: null,
    promoOk: false,
    checkoutNote: false
  };

  /* ── Helpers ──────────────────────────────────────────────── */
  function money(qar) { return "QAR " + Number(qar).toLocaleString("en-US"); }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  function lineTotal(item) { return item.price * item.qty; }
  function subtotal() { return state.items.reduce(function (sum, i) { return sum + lineTotal(i); }, 0); }
  function discount() { return state.promoCode ? Math.round(subtotal() * PROMO_CODES[state.promoCode]) : 0; }
  function freeDelivery() { return subtotal() - discount() >= FREE_SHIP_THRESHOLD; }
  function deliveryFee() { return freeDelivery() ? 0 : DELIVERY_FEE; }
  function grandTotal() { return subtotal() - discount() + deliveryFee(); }
  function totalQty() { return state.items.reduce(function (sum, i) { return sum + i.qty; }, 0); }

  /* ── Icons ────────────────────────────────────────────────── */
  var ICON_TRASH = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m3 0-1 13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 7"/></svg>';
  var ICON_TRUCK = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>';
  var ICON_RETURN = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9 9 0 0 0-7 3.3M3 4v3.5h3.5"/></svg>';
  var ICON_SHIELD = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.4-3 8-7 10-4-2-7-5.6-7-10V6z"/><path d="m9.5 12 2 2 3.5-4"/></svg>';
  var ICON_BAG_LG = '<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 7h12l1 13H5z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>';
  var ICON_CHECK = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';

  /* ── Markup builders ──────────────────────────────────────── */
  function crumbHTML() {
    return '<nav class="cart-crumbs" aria-label="Breadcrumb">' +
        '<a href="index.html">Home</a><span class="sep">/</span>' +
        '<span class="current">Shopping Bag</span>' +
      "</nav>";
  }

  function shippingBarHTML() {
    var sub = subtotal() - discount();
    var pct = Math.min(100, Math.round((sub / FREE_SHIP_THRESHOLD) * 100));
    var qualifies = freeDelivery();
    return '<div class="cart-shipbar' + (qualifies ? " is-done" : "") + '">' +
        '<span class="cart-shipbar-icon">' + (qualifies ? ICON_CHECK : ICON_TRUCK) + "</span>" +
        '<div class="cart-shipbar-body">' +
          '<p class="cart-shipbar-text">' +
            (qualifies
              ? "Your bag qualifies for <b>complimentary delivery</b>."
              : "Add <b>" + money(FREE_SHIP_THRESHOLD - sub) + "</b> more to unlock complimentary delivery.") +
          "</p>" +
          '<span class="cart-shipbar-track"><span class="cart-shipbar-fill" style="width:' + pct + '%"></span></span>' +
        "</div>" +
      "</div>";
  }

  function variantLine(item) {
    var parts = [];
    if (item.color) parts.push("Colour: <b>" + esc(item.color) + "</b>");
    if (item.size) parts.push("Size: <b>" + esc(item.size) + "</b>");
    return parts.length ? '<span class="cart-item-variant">' + parts.join(" &nbsp;·&nbsp; ") + "</span>" : "";
  }

  function itemPriceHTML(item) {
    var onSale = item.compareAt && item.compareAt > item.price;
    return '<span class="cart-item-price' + (onSale ? " on-sale" : "") + '">' +
        (onSale ? '<span class="was">' + money(item.compareAt * item.qty) + "</span>" : "") +
        '<span class="now">' + money(lineTotal(item)) + "</span>" +
      "</span>";
  }

  function itemRowHTML(item) {
    var href = "product.html?id=" + encodeURIComponent(item.id);
    return '<li class="cart-item" data-line="' + item.line + '">' +
        '<a class="cart-item-media" href="' + href + '" aria-label="' + esc(item.name) + '">' +
          '<img src="' + item.image + '" alt="' + esc(item.name) + '" loading="lazy">' +
        "</a>" +
        '<div class="cart-item-info">' +
          '<div class="cart-item-row">' +
            '<div class="cart-item-text">' +
              '<a class="cart-item-brand" href="' + href + '">' + esc(item.vendor) + "</a>" +
              '<a class="cart-item-name" href="' + href + '">' + esc(item.name) + "</a>" +
              variantLine(item) +
            "</div>" +
            '<button type="button" class="cart-item-remove" data-remove aria-label="Remove ' + esc(item.name) + '">' + ICON_TRASH + "</button>" +
          "</div>" +
          '<div class="cart-item-foot">' +
            '<div class="cart-qty" role="group" aria-label="Quantity">' +
              '<button type="button" data-qty="dec" aria-label="Decrease quantity"' + (item.qty <= 1 ? " disabled" : "") + ">−</button>" +
              '<span class="cart-qty-val">' + item.qty + "</span>" +
              '<button type="button" data-qty="inc" aria-label="Increase quantity">+</button>' +
            "</div>" +
            itemPriceHTML(item) +
          "</div>" +
        "</div>" +
      "</li>";
  }

  function summaryHTML() {
    var d = discount();
    return '<aside class="cart-summary">' +
        '<h2 class="cart-summary-title">Order Summary</h2>' +
        '<div class="cart-summary-row"><span>Subtotal (' + totalQty() + " item" + (totalQty() === 1 ? "" : "s") + ')</span><span>' + money(subtotal()) + "</span></div>" +
        (d > 0
          ? '<div class="cart-summary-row is-discount"><span>Promo &middot; ' + esc(state.promoCode) + "</span><span>&minus;" + money(d) + "</span></div>"
          : "") +
        '<div class="cart-summary-row"><span>Delivery</span><span>' + (freeDelivery() ? "Complimentary" : money(deliveryFee())) + "</span></div>" +
        '<hr class="cart-summary-div">' +
        '<div class="cart-summary-row cart-summary-total"><span>Estimated total</span><span>' + money(grandTotal()) + "</span></div>" +

        '<form class="cart-promo" id="cartPromoForm">' +
          '<input type="text" id="cartPromoInput" placeholder="Promo code" value="' + esc(state.promoInput) + '" aria-label="Promo code">' +
          '<button type="submit">Apply</button>' +
        "</form>" +
        (state.promoMsg ? '<p class="cart-promo-msg ' + (state.promoOk ? "is-ok" : "is-error") + '">' + esc(state.promoMsg) + "</p>" : "") +

        '<button type="button" class="cart-checkout" id="cartCheckout">Proceed to Checkout</button>' +
        (state.checkoutNote ? '<p class="cart-checkout-note">This is a design preview — checkout isn’t wired up yet.</p>' : "") +
        '<a class="cart-continue" href="listing.html">Continue shopping</a>' +

        '<ul class="cart-trust">' +
          "<li>" + ICON_TRUCK + "<span>Complimentary delivery on orders over " + money(FREE_SHIP_THRESHOLD) + "</span></li>" +
          "<li>" + ICON_RETURN + "<span>Free 14-day returns &amp; exchanges</span></li>" +
          "<li>" + ICON_SHIELD + "<span>Guaranteed authentic &middot; secure checkout</span></li>" +
        "</ul>" +

        '<ul class="cart-pay">' +
          '<li><img src="https://www.bluesalon.com/cdn/shop/files/Visa_Inverted_x32_5700ab8c-cb49-4355-83c3-4d1146a8076c_x32.png?v=1644226717" alt="Visa" loading="lazy"></li>' +
          '<li><img src="https://www.bluesalon.com/cdn/shop/files/mastercard-logo-design-history-1979_x32.jpg?v=1644232735" alt="Mastercard" loading="lazy"></li>' +
          '<li><img src="https://www.bluesalon.com/cdn/shop/files/Group_1_x32.jpg?v=1660140162" alt="Apple Pay" loading="lazy"></li>' +
          '<li><img src="https://www.bluesalon.com/cdn/shop/files/21Google_Pay9bc22ee1-7e10-4d6f-b0ec-57672824e23d_x32_1_x32.png?v=1709793011" alt="Google Pay" loading="lazy"></li>' +
        "</ul>" +
      "</aside>";
  }

  function relatedHTML() {
    var inBag = {};
    state.items.forEach(function (i) { inBag[i.id] = true; });
    var ids = REL_IDS.filter(function (id) { return !inBag[id]; }).slice(0, 4);
    if (!ids.length) return "";
    var cards = ids.map(function (id) {
      var p = CATALOG[id];
      var onSale = p.compareAt && p.compareAt > p.price;
      var price = onSale
        ? '<span class="was">' + money(p.compareAt) + '</span><span class="now">' + money(p.price) + "</span>"
        : money(p.price);
      return '<a class="cart-rel-card" href="product.html?id=' + id + '">' +
          '<span class="cart-rel-media"><img src="' + p.image + '" alt="' + esc(p.name) + '" loading="lazy"></span>' +
          '<span class="cart-rel-brand">' + esc(p.vendor) + "</span>" +
          '<span class="cart-rel-name">' + esc(p.name) + "</span>" +
          '<span class="cart-rel-price">' + price + "</span>" +
        "</a>";
    }).join("");
    return '<section class="cart-related">' +
        '<div class="cart-related-head"><h2>You may also like</h2><hr class="bs-rule-gold"></div>' +
        '<div class="cart-rel-grid">' + cards + "</div>" +
      "</section>";
  }

  function emptyHTML() {
    return '<div class="cart-empty">' +
        '<span class="cart-empty-icon">' + ICON_BAG_LG + "</span>" +
        "<h2>Your bag is empty</h2>" +
        "<p>Looks like you haven’t added anything yet. Explore new arrivals and find something you’ll love.</p>" +
        '<a class="bs-btn bs-btn-primary" href="listing.html">Continue Shopping</a>' +
      "</div>" +
      relatedHTML();
  }

  function render() {
    var root = document.getElementById("cartPage");
    if (!root) return;

    var n = totalQty();
    var head = '<div class="cart-head">' +
        '<h1 class="cart-title">Shopping Bag' + (n ? ' <span class="cart-count">' + n + " item" + (n === 1 ? "" : "s") + "</span>" : "") + "</h1>" +
        '<hr class="bs-rule-gold cart-rule">' +
      "</div>";

    root.innerHTML = crumbHTML() + head + (state.items.length
      ? '<div class="cart-shell">' +
          '<div class="cart-main">' +
            shippingBarHTML() +
            '<ul class="cart-items">' + state.items.map(itemRowHTML).join("") + "</ul>" +
          "</div>" +
          summaryHTML() +
        "</div>" +
        relatedHTML()
      : emptyHTML());

    syncHeaderCartCount();
  }

  function syncHeaderCartCount() {
    var el = document.getElementById("cartCount");
    if (!el) return;
    var n = totalQty();
    el.textContent = n;
    el.hidden = n === 0;
  }

  /* ── Interactions (event delegation) ──────────────────────── */
  var root = document.getElementById("cartPage");
  if (root) {
    root.addEventListener("click", function (e) {
      var line = e.target.closest("[data-line]");

      var qtyBtn = e.target.closest("[data-qty]");
      if (qtyBtn && line) {
        e.preventDefault();
        var lineNo = Number(line.dataset.line);
        var item = state.items.find(function (i) { return i.line === lineNo; });
        if (!item) return;
        var nextQty = qtyBtn.dataset.qty === "inc" ? item.qty + 1 : Math.max(1, item.qty - 1);
        if (window.BS_CART) {
          state.items = window.BS_CART.setQty(lineNo, nextQty);
        } else {
          item.qty = nextQty;
        }
        render();
        return;
      }

      if (e.target.closest("[data-remove]") && line) {
        e.preventDefault();
        var removeLine = Number(line.dataset.line);
        state.items = window.BS_CART
          ? window.BS_CART.remove(removeLine)
          : state.items.filter(function (i) { return i.line !== removeLine; });
        render();
        return;
      }

      if (e.target.closest("#cartCheckout")) {
        state.checkoutNote = true;
        render();
        var note = document.querySelector(".cart-checkout-note");
        if (note) note.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });

    root.addEventListener("submit", function (e) {
      if (!e.target.closest("#cartPromoForm")) return;
      e.preventDefault();
      var input = document.getElementById("cartPromoInput");
      var code = (input.value || "").trim().toUpperCase();
      state.promoInput = code;
      if (!code) { state.promoMsg = null; render(); return; }
      if (PROMO_CODES[code]) {
        state.promoCode = code;
        state.promoOk = true;
        state.promoMsg = "Code applied — " + Math.round(PROMO_CODES[code] * 100) + "% off your order.";
      } else {
        state.promoCode = null;
        state.promoOk = false;
        state.promoMsg = "That code isn’t valid. Please try again.";
      }
      render();
    });
  }

  render();
})();

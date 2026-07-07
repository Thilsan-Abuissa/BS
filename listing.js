/* ============================================================
   BLUE SALON — PRODUCT LISTING PAGE (PLP)
   Renders the collection grid with the minimal editorial card
   (name · price on one baseline, colour swatches with "+N").
   Self-contained: does not depend on app.js internals — only on
   the shared header/footer markup that app.js wires up.
   ============================================================ */
(function () {
  "use strict";

  /* ── Collection data ──────────────────────────────────────
     Colourways reference the local product photography in
     /images. Where a colourway has its own shot, the swatch
     swaps the card image; swatches without a shot just select. */
  var PRODUCTS = [
    {
      id: "miriam-ostrich", vendor: "ZUHAIR MURAD", name: "Zuhair Murad Women's Patchwork Leather Chain‑Handle Tote Bag", cat: "shoes",
      price: 9700, tag: "New", tagTone: "dark", order: 1, imageSwatches: true,
      sizes: ["36","37","38","39","40","41"],
      soldOutSizes: ["36"],
      variants: [
        { color: "Ice Blue",  hex: "#bcc9cd", image: "images/0_1.webp" },
        { color: "Chocolate", hex: "#4a3626", image: "images/0_4.webp" },
        { color: "Black",     hex: "#191919" },
        { color: "Bone",      hex: "#d9cdb8" }
      ]
    },
    {
      id: "miriam-leather", vendor: "ZUHAIR MURAD", name: "Zuhair Murad Women's Patchwork Leather Chain‑Handle Tote Bag", cat: "shoes",
      price: 4500, tag: "New", legacyActions: true, order: 2,
      sizes: ["36","37","38","39","40","41"],
      variants: [
        { color: "Chocolate", hex: "#4a3626", image: "images/product2.png" },
        { color: "Black",     hex: "#191919" },
        { color: "Ice Blue",  hex: "#bcc9cd", image: "images/product1.png" },
        { color: "Sand",      hex: "#cbb997" }
      ]
    },
    {
      id: "marlene-natural", vendor: "ZUHAIR MURAD", name: "Marlene Pump", cat: "shoes",
      price: 4100, compareAt: 5900, order: 3,
      sizes: ["36","37","38","39","40","41"],
      soldOutSizes: ["41"],
      variants: [
        { color: "Python Natural", hex: "#8a7350", image: "images/product4.png" },
        { color: "Python Taupe",   hex: "#b8a582", image: "images/MARLENE-PUMP-50_TAUPE_F2055-803-461_A.webp" },
        { color: "Black",          hex: "#191919" }
      ]
    },
    {
      id: "marlene-taupe", vendor: "ZUHAIR MURAD", name: "Marlene Pump", cat: "shoes",
      price: 4300, order: 4,
      sizes: ["36","37","38","39","40","41"],
      variants: [
        { color: "Python Taupe",   hex: "#b8a582", image: "images/MARLENE-PUMP-50_TAUPE_F2055-803-461_A.webp" },
        { color: "Python Natural", hex: "#8a7350", image: "images/product4.png" },
        { color: "Black",          hex: "#191919" }
      ]
    },
    {
      id: "emma-tote", vendor: "ZUHAIR MURAD", name: "Marlene Pump", cat: "bags",
      price: 6900, compareAt: 8600, order: 5,
      variants: [
        { color: "Ruby Multi", hex: "#7e2233", image: "images/EMMA-TOTE-MINI_RUBY-MULTI_H1041-878-695_A.webp" },
        { color: "Navy",       hex: "#22304f" },
        { color: "Olive",      hex: "#4b4a2f" }
      ]
    },
    {
      id: "inara-top", vendor: "ZUHAIR MURAD", name: "Marlene Pump", cat: "clothing",
      price: 1850, tag: "New", order: 6,
      sizes: ["XS","S","M","L","XL"],
      soldOutSizes: ["XL"],
      variants: [
        { color: "Ice Green", hex: "#d6e4dc", image: "images/INARA-TOP_ICE-GREEN_24814232-499_GHOST.webp" },
        { color: "Ivory",     hex: "#efece3" },
        { color: "Black",     hex: "#191919" }
      ]
    },
    {
      id: "auggie-short", vendor: "ZUHAIR MURAD", name: "Zuhair Murad Women's Tailored Wool-Blend Bermuda Shorts", cat: "clothing",
      price: 2200, order: 7,
      sizes: ["34","36","38","40","42"],
      variants: [
        { color: "Dark Olive", hex: "#4b4a2f", image: "images/AUGGIE-SHORT_DARK-OLIVE_3205582-429_GHOST_dd4bd26c-edae-43f5-932d-4e9e8f907fc1.webp" },
        { color: "Black",      hex: "#191919" },
        { color: "Sand",       hex: "#cbb997" }
      ]
    },
    // Sample-only additions — broaden the sub-category tabs for demonstration.
    {
      id: "quilted-backpack", vendor: "ZUHAIR MURAD", name: "Zuhair Murad Women's Quilted Leather Backpack", cat: "accessories",
      price: 3400, order: 8,
      variants: [
        { color: "Nude", hex: "#e8cdb0", image: "images/bags.png" },
        { color: "Black", hex: "#191919" },
        { color: "Taupe", hex: "#b8a582" }
      ]
    },
    {
      id: "oversized-shirt", vendor: "ZUHAIR MURAD", name: "Zuhair Murad Women's Oversized Cotton Shirt", cat: "readytowear",
      price: 2600, tag: "New", order: 9,
      sizes: ["XS","S","M","L","XL"],
      variants: [
        { color: "White", hex: "#f5f4f0", image: "images/women.png" },
        { color: "Black", hex: "#191919" },
        { color: "Ivory", hex: "#efece3" }
      ]
    },
    {
      id: "crystal-drop-earrings", vendor: "ZUHAIR MURAD", name: "Zuhair Murad Women's Crystal Drop Earrings", cat: "jewelry",
      price: 1650, order: 10,
      variants: [
        { color: "Silver", hex: "#c9cdd1", image: "images/Artboard3-1_P26_R2_ShopTheLook_Desktop_6.9.26.webp" },
        { color: "Gold", hex: "#c2a25e" }
      ]
    },
    {
      id: "leopard-print-vest", vendor: "ZUHAIR MURAD", name: "Zuhair Murad Women's Leopard-Print Satin Vest", cat: "beauty",
      price: 1980, order: 11,
      sizes: ["XS","S","M","L","XL"],
      variants: [
        { color: "Leopard", hex: "#a9873f", image: "images/setsi.png" },
        { color: "Black", hex: "#191919" }
      ]
    }
  ];

  // This is the Women collection — default every item's gender accordingly.
  PRODUCTS.forEach(function (p) { if (!p.gender) p.gender = "Women"; });

  // Material per product (drawn from each style's construction). A product
  // may already carry its own `material`; this only fills the gaps.
  var MATERIALS = {
    "miriam-ostrich": "Leather",
    "miriam-leather": "Leather",
    "marlene-natural": "Python",
    "marlene-taupe": "Python",
    "emma-tote": "Leather",
    "inara-top": "Silk",
    "auggie-short": "Wool-blend"
  };
  PRODUCTS.forEach(function (p) { if (!p.material && MATERIALS[p.id]) p.material = MATERIALS[p.id]; });

  var MAX_SWATCHES = 3; // show up to 3 inline, rest as "+N"
  var PAGE_SIZE = 9;    // products per infinite-scroll batch

  /* ── State ────────────────────────────────────────────────── */
  var state = {
    sort: "featured",
    page: 1,             // infinite-scroll: how many PAGE_SIZE batches are shown
    wishlist: {},        // id -> true
    selected: {},        // id -> selected variant index
    size: {},            // id -> selected size (on-card size chip)
    facets: {            // active sidebar filters
      sale: false,       // "On sale only" toggle
      category: {},      // { shoes:true, ... }
      brand: {},         // { "ZUHAIR MURAD":true, ... }
      gender: {},        // { "Women":true, ... }
      material: {},      // { "Leather":true, ... }
      size: {},          // { "38":true, ... }
      colour: {},        // { "Black":true, ... }
      price: null        // "0-2000" | "2000-5000" | "5000-" | null
    }
  };

  /* ── Helpers ──────────────────────────────────────────────── */
  function money(qar) {
    return "QAR " + Number(qar).toLocaleString("en-US");
  }

  var HEART =
    '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>';

  var BAG =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M6 7h12l1 13H5z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>';

  function displayImage(p) {
    var idx = state.selected[p.id] || 0;
    var v = p.variants[idx] || p.variants[0];
    // fall back to the first variant that actually has a photo
    if (!v.image) {
      for (var i = 0; i < p.variants.length; i++) {
        if (p.variants[i].image) return p.variants[i].image;
      }
    }
    return v.image;
  }

  /* All distinct photos for a product (its explicit gallery, else the
     variant images). Used for the in-card image browser (dots). */
  function galleryOf(p) {
    if (p.gallery && p.gallery.length) return p.gallery;
    var seen = {}, imgs = [];
    p.variants.forEach(function (v) {
      if (v.image && !seen[v.image]) { seen[v.image] = 1; imgs.push(v.image); }
    });
    return imgs;
  }

  /* Keep the hover-swap photo as the first gallery image that differs
     from what's currently shown, so hover always reveals a second view. */
  function setHoverImg(card, p, current) {
    var hoverEl = card.querySelector(".plp-card-hoverimg");
    if (!hoverEl) return;
    var g = galleryOf(p);
    var next = g.find(function (src) { return src !== current; });
    if (next) hoverEl.src = next;
  }

  /* Mark the gallery dot matching the shown photo as active. */
  function syncDots(card, src) {
    var product = PRODUCTS.find(function (p) { return p.id === card.dataset.id; });
    if (!product) return;
    var g = galleryOf(product);
    card.querySelectorAll(".plp-dot").forEach(function (dot, i) {
      dot.classList.toggle("is-active", g[i] === src);
    });
  }

  function cardHTML(p) {
    // No swatch is marked selected until the shopper picks one —
    // all chips read with identical weight on first paint.
    var selIdx = (p.id in state.selected) ? state.selected[p.id] : -1;
    var wished = !!state.wishlist[p.id];
    var onSale = p.compareAt && p.compareAt > p.price;

    var href = "product.html?id=" + encodeURIComponent(p.id);

    var shown = p.variants.slice(0, MAX_SWATCHES);
    var extra = p.variants.length - shown.length;

    var swatches = shown.map(function (v, i) {
      // Variant-image swatches (opt-in per product): show a thumbnail of
      // that colourway's actual photo instead of a flat colour chip;
      // variants without their own shot fall back to the colour swatch.
      var style = p.imageSwatches && v.image
        ? "background-image:url(" + v.image + ")"
        : "background:" + v.hex;
      return '<button type="button" class="plp-swatch' + (p.imageSwatches ? " plp-swatch-img" : "") +
        (i === selIdx ? " is-active" : "") + '" data-swatch="' + i + '" style="' + style + '" ' +
        'aria-label="' + v.color + '" title="' + v.color + '"></button>';
    }).join("");
    if (extra > 0) swatches += '<span class="plp-swatch-more">+' + extra + "</span>";

    var tag = "";
    if (onSale) tag = '<span class="plp-tag sale">Sale</span>';
    else if (p.tag) tag = '<span class="plp-tag' + (p.tagTone ? " " + p.tagTone : "") + '">' + p.tag + "</span>";

    var price = onSale
      ? '<span class="was">' + money(p.compareAt) + '</span><span class="now">' + money(p.price) + "</span>"
      : money(p.price);

    var wishLabel = wished ? "Remove from wishlist" : "Add to wishlist";

    // Image gallery dots — only when a product has more than one photo.
    var gallery = galleryOf(p);
    var current = displayImage(p);
    // Second photo, revealed on hover (classic e-commerce image swap).
    var hoverSrc = gallery.find(function (src) { return src !== current; });
    var hoverImg = hoverSrc
      ? '<img class="plp-card-hoverimg" src="' + hoverSrc + '" alt="" aria-hidden="true" loading="lazy">'
      : "";
    var dots = "";
    if (gallery.length > 1) {
      dots = '<div class="plp-dots">' + gallery.map(function (src, i) {
        return '<button type="button" class="plp-dot' + (src === current ? " is-active" : "") +
          '" data-dot="' + i + '" aria-label="View image ' + (i + 1) + '"></button>';
      }).join("") + "</div>";
    }

    // Size chips — shown under the colour swatches. The container is
    // always rendered (empty for one-size items) so every card keeps
    // the same height and the rows line up.
    var sizeSel = state.size[p.id];
    var sizeChips = "";
    if (p.sizes && p.sizes.length) {
      sizeChips = p.sizes.map(function (s) {
        var soldOut = p.soldOutSizes && p.soldOutSizes.indexOf(s) !== -1;
        return '<button type="button" class="plp-size' +
          (soldOut ? " is-soldout" : "") + (s === sizeSel ? " is-active" : "") + '" ' +
          (soldOut ? 'disabled aria-disabled="true" ' : "") +
          'data-size="' + s + '">' + s + "</button>";
      }).join("");
    }
    var sizes = '<div class="plp-sizes">' + sizeChips + "</div>";

    // Hover actions. Default: stacked white square buttons (wishlist + bag).
    // legacyActions keeps the old circular heart + "Add to bag" bar.
    var actions;
    if (p.legacyActions) {
      actions =
        '<button type="button" class="plp-wish' + (wished ? " is-active" : "") + '" ' +
          'data-wish aria-label="' + wishLabel + '">' + HEART + "</button>" +
        '<span class="plp-quickadd"><button type="button" data-quickadd>Add to bag</button></span>';
    } else {
      actions =
        '<div class="plp-actions">' +
          '<button type="button" class="plp-action' + (wished ? " is-active" : "") + '" ' +
            'data-wish aria-label="' + wishLabel + '">' + HEART + "</button>" +
          '<button type="button" class="plp-action" data-quickadd aria-label="Add to bag">' + BAG + "</button>" +
        "</div>";
    }

    return (
      '<article class="plp-card' + (p.legacyActions ? " plp-card--legacy" : "") + '" data-id="' + p.id + '">' +
        '<a class="plp-card-media" href="' + href + '" aria-label="' + p.name + '">' +
          '<img class="plp-card-mainimg" src="' + current + '" alt="' + p.name + '" loading="lazy">' +
          hoverImg +
          tag +
          actions +
          dots +
        "</a>" +
        '<div class="plp-card-info">' +
          '<div class="plp-card-row">' +
            '<a class="plp-card-brand" href="' + href + '">' + p.vendor + "</a>" +
            '<span class="plp-card-price">' + price + "</span>" +
          "</div>" +
          '<a class="plp-card-name" href="' + href + '">' + p.name + "</a>" +
          '<div class="plp-swatches">' + swatches + "</div>" +
          sizes +
        "</div>" +
      "</article>"
    );
  }

  /* ── Render ───────────────────────────────────────────────── */
  var grid = document.getElementById("plpGrid");
  var countEl = document.getElementById("plpCount");

  function matchesFacets(p) {
    var f = state.facets;
    if (f.sale && !(p.compareAt && p.compareAt > p.price)) return false;

    var cats = Object.keys(f.category);
    if (cats.length && cats.indexOf(p.cat) === -1) return false;

    var brands = Object.keys(f.brand);
    if (brands.length && brands.indexOf(p.vendor) === -1) return false;

    var genders = Object.keys(f.gender);
    if (genders.length && genders.indexOf(p.gender) === -1) return false;

    var mats = Object.keys(f.material);
    if (mats.length && mats.indexOf(p.material) === -1) return false;

    var szs = Object.keys(f.size);
    if (szs.length && !(p.sizes || []).some(function (s) { return f.size[s]; })) return false;

    var cols = Object.keys(f.colour);
    if (cols.length && !p.variants.some(function (v) { return f.colour[v.color]; })) return false;

    if (f.price) {
      var parts = f.price.split("-");
      var lo = Number(parts[0]) || 0;
      var hi = parts[1] ? Number(parts[1]) : Infinity;
      if (!(p.price >= lo && p.price < hi)) return false;
    }
    return true;
  }

  function visibleProducts() {
    var list = PRODUCTS.filter(matchesFacets);
    var by = state.sort;
    list.sort(function (a, b) {
      if (by === "price-asc") return a.price - b.price;
      if (by === "price-desc") return b.price - a.price;
      if (by === "name") return a.name.localeCompare(b.name) || a.price - b.price;
      return a.order - b.order; // featured
    });
    return list;
  }

  /* Reserve title space per VISUAL ROW: a row that contains a two-line
     title makes its single-line titles reserve two lines (so swatches
     align); a row that is all single-line titles stays tight — no gap. */
  function equalizeTitles() {
    if (!grid) return;
    var names = Array.prototype.slice.call(grid.querySelectorAll(".plp-card-name"));
    names.forEach(function (n) { n.style.minHeight = ""; });
    if (!names.length) return;
    var rows = {};
    names.forEach(function (n) {
      var card = n.closest(".plp-card");
      var top = card.offsetTop;                 // same for every card in a visual row
      (rows[top] = rows[top] || []).push(n);
    });
    Object.keys(rows).forEach(function (top) {
      var group = rows[top], max = 0;
      group.forEach(function (n) { if (n.offsetHeight > max) max = n.offsetHeight; });
      group.forEach(function (n) { n.style.minHeight = max + "px"; });
    });
  }

  /* Reconcile every filter control (sidebar + toolbar dropdowns) from
     state so both stay in sync no matter which one the shopper used. */
  function syncFacetUI() {
    document.querySelectorAll(".plp-facet-size").forEach(function (el) {
      el.classList.toggle("is-active", !!state.facets.size[el.dataset.size]);
    });
    document.querySelectorAll("input[data-colour]").forEach(function (el) { el.checked = !!state.facets.colour[el.dataset.colour]; });
    document.querySelectorAll("input[data-category]").forEach(function (el) { el.checked = !!state.facets.category[el.dataset.category]; });
    document.querySelectorAll("input[data-brand]").forEach(function (el) { el.checked = !!state.facets.brand[el.dataset.brand]; });
    document.querySelectorAll("input[data-gender]").forEach(function (el) { el.checked = !!state.facets.gender[el.dataset.gender]; });
    document.querySelectorAll("input[data-material]").forEach(function (el) { el.checked = !!state.facets.material[el.dataset.material]; });
    document.querySelectorAll("input[data-price]").forEach(function (el) { el.checked = state.facets.price === el.dataset.price; });
    document.querySelectorAll("input[data-sale]").forEach(function (el) { el.checked = !!state.facets.sale; });
    syncSubcats();
  }

  var loadMoreEl = document.getElementById("plpLoadMore");

  function render() {
    if (!grid) return;
    var list = visibleProducts();
    var shown = list.slice(0, state.page * PAGE_SIZE);
    grid.innerHTML = shown.length
      ? shown.map(cardHTML).join("")
      : '<p class="plp-empty">No pieces match these filters — try clearing some.</p>';
    if (countEl) {
      countEl.textContent = list.length + (list.length === 1 ? " item" : " items");
    }
    if (loadMoreEl) loadMoreEl.hidden = shown.length >= list.length;
    equalizeTitles();
    syncFacetUI();
  }

  /* Any filter/sort change starts back at page 1 — infinite scroll then
     re-accumulates pages as the shopper scrolls through the new result set. */
  function resetPageAndRender() {
    state.page = 1;
    render();
  }

  /* ── Infinite scroll: grow the page count once the sentinel nears the
     viewport. Driven by the scroll event (+ rAF throttling) rather than
     IntersectionObserver — simpler to reason about and just as reliable. ── */
  function maybeLoadMore() {
    if (!loadMoreEl || loadMoreEl.hidden) return;
    var rect = loadMoreEl.getBoundingClientRect();
    if (rect.top > window.innerHeight + 200) return; // still well below the fold
    var total = visibleProducts().length;
    if (state.page * PAGE_SIZE < total) {
      state.page++;
      render();
    }
  }
  var scrollTicking = false;
  function onScrollOrResize() {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(function () {
      maybeLoadMore();
      scrollTicking = false;
    });
  }
  if (loadMoreEl) {
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
  }

  var resizeTimer = null;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(equalizeTitles, 120);
  });

  /* ── Interactions (event delegation) ──────────────────────── */
  if (grid) {
    grid.addEventListener("click", function (e) {
      var card = e.target.closest(".plp-card");
      if (!card) return;
      var id = card.dataset.id;
      var product = PRODUCTS.find(function (p) { return p.id === id; });

      // Colour swatch → swap image + active ring (no full re-render, keeps hover)
      var sw = e.target.closest("[data-swatch]");
      if (sw) {
        e.preventDefault();
        var idx = Number(sw.dataset.swatch);
        state.selected[id] = idx;
        card.querySelectorAll(".plp-swatch").forEach(function (el, i) {
          el.classList.toggle("is-active", i === idx);
        });
        var img = card.querySelector(".plp-card-mainimg");
        if (img && product) {
          var picked = displayImage(product);
          img.src = picked;
          syncDots(card, picked);
          setHoverImg(card, product, picked);
        }
        return;
      }

      // Gallery dot → view another photo of the product
      var dotBtn = e.target.closest("[data-dot]");
      if (dotBtn && product) {
        e.preventDefault();
        var g = galleryOf(product);
        var src = g[Number(dotBtn.dataset.dot)];
        if (!src) return;
        var dimg = card.querySelector(".plp-card-mainimg");
        if (dimg) dimg.src = src;
        syncDots(card, src);
        setHoverImg(card, product, src);
        // keep the colour swatch in sync when the photo maps to a variant
        var vIdx = product.variants.findIndex(function (v) { return v.image === src; });
        if (vIdx !== -1) {
          state.selected[id] = vIdx;
          card.querySelectorAll(".plp-swatch").forEach(function (el, i) {
            el.classList.toggle("is-active", i === vIdx);
          });
        }
        return;
      }

      // Size chip → select (single per card)
      var sizeBtn = e.target.closest("[data-size]");
      if (sizeBtn && !sizeBtn.disabled) {
        e.preventDefault();
        state.size[id] = sizeBtn.dataset.size;
        card.querySelectorAll(".plp-size").forEach(function (el) {
          el.classList.toggle("is-active", el === sizeBtn);
        });
        return;
      }

      // Wishlist toggle
      var wishBtn = e.target.closest("[data-wish]");
      if (wishBtn) {
        e.preventDefault();
        if (state.wishlist[id]) delete state.wishlist[id];
        else state.wishlist[id] = true;
        var active = !!state.wishlist[id];
        wishBtn.classList.toggle("is-active", active);
        wishBtn.setAttribute("aria-label", active ? "Remove from wishlist" : "Add to wishlist");
        syncHeaderWishCount();
        return;
      }

      // Quick add → header bag count + confirmation modal
      if (e.target.closest("[data-quickadd]")) {
        e.preventDefault();
        bumpBag();
        if (product) openCartModal(product);
        return;
      }

      // Real product links (media / brand / name) navigate to the PDP;
      // only bare "#" placeholders are swallowed.
      var link = e.target.closest("a");
      if (link && (link.getAttribute("href") || "#") === "#") e.preventDefault();
    });

    // Hovering a variant-image swatch previews that colourway on the main
    // photo; leaving it (without clicking) restores the actual selection.
    // mouseover/mouseout are used (not mouseenter/mouseleave) since they
    // bubble, so one delegated listener covers every card.
    grid.addEventListener("mouseover", function (e) {
      var sw = e.target.closest(".plp-swatch-img");
      if (!sw || sw.classList.contains("is-hover-active")) return;
      var card = sw.closest(".plp-card");
      if (!card) return;
      var idx = Number(sw.dataset.swatch);
      var product = PRODUCTS.find(function (p) { return p.id === card.dataset.id; });
      var variant = product && product.variants[idx];
      if (!variant || !variant.image) return;
      sw.classList.add("is-hover-active");
      var img = card.querySelector(".plp-card-mainimg");
      if (img) img.src = variant.image;
    });

    grid.addEventListener("mouseout", function (e) {
      var sw = e.target.closest(".plp-swatch-img");
      if (!sw || !sw.classList.contains("is-hover-active")) return;
      if (sw.contains(e.relatedTarget)) return; // still inside the same swatch
      sw.classList.remove("is-hover-active");
      var card = sw.closest(".plp-card");
      var product = card && PRODUCTS.find(function (p) { return p.id === card.dataset.id; });
      var img = card && card.querySelector(".plp-card-mainimg");
      if (img && product) img.src = displayImage(product); // back to the real selection
    });
  }

  /* ── Filter sidebar (accordion facets) ────────────────────── */
  var filtersEl = document.getElementById("plpFilters");

  var CAT_LABELS = { shoes: "Shoes", bags: "Bags", clothing: "Clothing", accessories: "Accessories", readytowear: "Ready-to-Wear", jewelry: "Jewelry", beauty: "Beauty" };
  var SUBCAT_VISIBLE_COUNT = 5; // categories shown before the "Show more" link kicks in
  var GENDER_OPTIONS = ["Women", "Men", "Kids"];   // fixed list — not derived from products
  var PRICE_BUCKETS = [
    { v: "0-2000", label: "Under QAR 2,000" },
    { v: "2000-5000", label: "QAR 2,000 – 5,000" },
    { v: "5000-", label: "QAR 5,000 +" }
  ];

  // Collect facet options from the product data.
  function collectFacets() {
    var cats = [], brands = [], brandSeen = {}, materials = [], matSeen = {}, colours = [], colourSeen = {}, numeric = {}, letters = {};
    var LETTER_ORDER = ["XS", "S", "M", "L", "XL"];
    PRODUCTS.forEach(function (p) {
      if (cats.indexOf(p.cat) === -1) cats.push(p.cat);
      if (p.vendor && !brandSeen[p.vendor]) { brandSeen[p.vendor] = 1; brands.push(p.vendor); }
      if (p.material && !matSeen[p.material]) { matSeen[p.material] = 1; materials.push(p.material); }
      p.variants.forEach(function (v) {
        if (!colourSeen[v.color]) { colourSeen[v.color] = 1; colours.push({ name: v.color, hex: v.hex }); }
      });
      (p.sizes || []).forEach(function (s) {
        if (/^\d/.test(s)) numeric[s] = 1; else letters[s] = 1;
      });
    });
    var numSizes = Object.keys(numeric).sort(function (a, b) { return Number(a) - Number(b); });
    var letSizes = LETTER_ORDER.filter(function (s) { return letters[s]; });
    brands.sort();
    materials.sort();
    return { cats: cats, brands: brands, materials: materials, colours: colours, numSizes: numSizes, letSizes: letSizes };
  }

  var CHEV = '<svg class="plp-facet-chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';

  function facet(key, title, bodyHTML, open) {
    return '<div class="plp-facet' + (open ? " is-open" : "") + '" data-facet="' + key + '">' +
      '<button type="button" class="plp-facet-head" aria-expanded="' + (open ? "true" : "false") + '">' +
        "<span>" + title + "</span>" + CHEV +
      "</button>" +
      '<div class="plp-facet-body">' + bodyHTML + "</div>" +
    "</div>";
  }

  function sizeChips(sizes) {
    return '<div class="plp-facet-sizes">' + sizes.map(function (s) {
      return '<button type="button" class="plp-facet-size' + (state.facets.size[s] ? " is-active" : "") +
        '" data-size="' + s + '">' + s + "</button>";
    }).join("") + "</div>";
  }

  function buildFilters() {
    if (!filtersEl) return;
    var f = collectFacets();

    var brandBody = '<ul class="plp-facet-list">' + f.brands.map(function (b) {
      return '<li><label class="plp-facet-opt"><input type="checkbox" data-brand="' + b + '"' +
        (state.facets.brand[b] ? " checked" : "") + "><span>" + b + "</span></label></li>";
    }).join("") + "</ul>";

    var genderBody = '<ul class="plp-facet-list">' + GENDER_OPTIONS.map(function (g) {
      return '<li><label class="plp-facet-opt"><input type="checkbox" data-gender="' + g + '"' +
        (state.facets.gender[g] ? " checked" : "") + "><span>" + g + "</span></label></li>";
    }).join("") + "</ul>";

    var sizeBody = "";
    if (f.numSizes.length) sizeBody += '<div class="plp-facet-sub">Shoe &amp; numeric</div>' + sizeChips(f.numSizes);
    if (f.letSizes.length) sizeBody += '<div class="plp-facet-sub">Clothing</div>' + sizeChips(f.letSizes);

    var colourBody = '<ul class="plp-facet-list">' + f.colours.map(function (c) {
      return '<li><label class="plp-facet-opt"><input type="checkbox" data-colour="' + c.name + '"' +
        (state.facets.colour[c.name] ? " checked" : "") + ">" +
        '<span class="plp-facet-swatch" style="background:' + c.hex + '"></span>' +
        "<span>" + c.name + "</span></label></li>";
    }).join("") + "</ul>";

    var materialBody = '<ul class="plp-facet-list">' + f.materials.map(function (m) {
      return '<li><label class="plp-facet-opt"><input type="checkbox" data-material="' + m + '"' +
        (state.facets.material[m] ? " checked" : "") + "><span>" + m + "</span></label></li>";
    }).join("") + "</ul>";

    var offersBody = '<ul class="plp-facet-list">' +
      '<li><label class="plp-facet-opt"><input type="checkbox" data-sale' +
      (state.facets.sale ? " checked" : "") + "><span>On sale only</span></label></li></ul>";

    var priceBody = '<ul class="plp-facet-list">' + PRICE_BUCKETS.map(function (b) {
      return '<li><label class="plp-facet-opt"><input type="radio" name="plp-price" data-price="' + b.v + '"' +
        (state.facets.price === b.v ? " checked" : "") + "><span>" + b.label + "</span></label></li>";
    }).join("") + "</ul>";

    filtersEl.innerHTML =
      // Desktop: "Hide filters" bar (aligns with the toolbar line)
      '<div class="plp-filters-bar">' +
        '<button type="button" class="plp-filter-hide" id="plpHideFilters" aria-controls="plpFilters">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h16M4 18h16"/><circle cx="9" cy="6" r="2" fill="#fff"/><circle cx="15" cy="12" r="2" fill="#fff"/><circle cx="9" cy="18" r="2" fill="#fff"/></svg>' +
          "<span>Hide filters</span>" +
        "</button>" +
      "</div>" +
      // Mobile drawer header: title + close
      '<div class="plp-filters-head">' +
        "<span>Filters</span>" +
        '<button type="button" class="plp-filters-close" id="plpFiltersClose" aria-label="Close filters">' +
          '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
        "</button>" +
      "</div>" +
      facet("size", "Size", sizeBody, true) +
      facet("colour", "Colour", colourBody, false) +
      facet("material", "Material", materialBody, false) +
      facet("price", "Price", priceBody, false) +
      facet("brand", "Brand", brandBody, false) +
      facet("gender", "Gender", genderBody, false) +
      facet("offers", "Offers", offersBody, false);
  }

  function anyFacetActive() {
    var f = state.facets;
    return f.sale || Object.keys(f.category).length || Object.keys(f.brand).length ||
           Object.keys(f.gender).length || Object.keys(f.material).length ||
           Object.keys(f.size).length || Object.keys(f.colour).length || f.price;
  }

  if (filtersEl) {
    buildFilters();

    filtersEl.addEventListener("click", function (e) {
      // Hide filters (collapse sidebar → grid full width)
      if (e.target.closest("#plpHideFilters")) { setFiltersHidden(true); return; }
      // Accordion toggle
      var head = e.target.closest(".plp-facet-head");
      if (head) {
        var facetEl = head.parentNode;
        var open = facetEl.classList.toggle("is-open");
        head.setAttribute("aria-expanded", open ? "true" : "false");
        return;
      }
      // Size chip (multi-select)
      var sz = e.target.closest("[data-size]");
      if (sz) {
        var s = sz.dataset.size;
        if (state.facets.size[s]) delete state.facets.size[s];
        else state.facets.size[s] = true;
        sz.classList.toggle("is-active");
        resetPageAndRender();
        return;
      }
    });

    filtersEl.addEventListener("change", function (e) {
      var t = e.target;
      if (t.dataset.sale != null) {
        state.facets.sale = t.checked;
        resetPageAndRender();
      } else if (t.dataset.brand != null) {
        if (t.checked) state.facets.brand[t.dataset.brand] = true;
        else delete state.facets.brand[t.dataset.brand];
        resetPageAndRender();
      } else if (t.dataset.gender != null) {
        if (t.checked) state.facets.gender[t.dataset.gender] = true;
        else delete state.facets.gender[t.dataset.gender];
        resetPageAndRender();
      } else if (t.dataset.material != null) {
        if (t.checked) state.facets.material[t.dataset.material] = true;
        else delete state.facets.material[t.dataset.material];
        resetPageAndRender();
      } else if (t.dataset.colour != null) {
        if (t.checked) state.facets.colour[t.dataset.colour] = true;
        else delete state.facets.colour[t.dataset.colour];
        resetPageAndRender();
      } else if (t.dataset.price != null) {
        state.facets.price = t.checked ? t.dataset.price : null;
        resetPageAndRender();
      }
    });
  }

  /* ── Collapse / expand the filter sidebar ─────────────────────
     "Hide filters" sits atop the sidebar; "Show filters" appears in
     the toolbar only while the sidebar is collapsed. */
  function setFiltersHidden(hidden) {
    var shell = document.querySelector(".plp-shell");
    if (shell) shell.classList.toggle("filters-hidden", hidden);
    equalizeTitles();  // grid width changed → recompute per-row title reservations
  }
  (function () {
    var showBtn = document.getElementById("plpFilterCollapse"); // toolbar "Show filters"
    if (showBtn) showBtn.addEventListener("click", function () { setFiltersHidden(false); });
  })();

  /* ── Sub-category links (toolbar, only while the sidebar is collapsed).
     The collection's sub-categories — for this Women collection: Shoes,
     Bags, Clothing. Clicking one narrows the grid to that sub-category. ── */
  var quickEl = document.getElementById("plpQuickFilters");

  // "New In" represents the current collection (no category narrowed) —
  // it's the default selected tab, matching the page title/breadcrumb.
  function noCategoryActive() { return Object.keys(state.facets.category).length === 0; }

  function subcatTab(c, label) {
    var active = c === "" ? noCategoryActive() : !!state.facets.category[c];
    return '<button type="button" class="plp-subcat' + (active ? " is-active" : "") +
      '" data-subcat="' + c + '">' + label + "</button>";
  }

  var subcatsExpanded = false;

  function buildQuickFilters() {
    if (!quickEl) return;
    var f = collectFacets();
    var visible = f.cats.slice(0, SUBCAT_VISIBLE_COUNT);
    var extra = f.cats.slice(SUBCAT_VISIBLE_COUNT);

    var html = subcatTab("", "New In") +
      visible.map(function (c) { return subcatTab(c, CAT_LABELS[c] || c); }).join("");

    if (extra.length) {
      html += '<span class="plp-subcat-more' + (subcatsExpanded ? " is-expanded" : "") + '" id="plpSubcatMore">' +
        extra.map(function (c) { return subcatTab(c, CAT_LABELS[c] || c); }).join("") +
      "</span>" +
      '<button type="button" class="plp-subcat-toggle" id="plpSubcatToggle">' +
        (subcatsExpanded ? "Show less" : "Show more") +
      "</button>";
    }
    quickEl.innerHTML = html;
  }

  function syncSubcats() {
    if (!quickEl) return;
    quickEl.querySelectorAll("[data-subcat]").forEach(function (el) {
      var c = el.dataset.subcat;
      el.classList.toggle("is-active", c === "" ? noCategoryActive() : !!state.facets.category[c]);
    });
  }

  if (quickEl) {
    buildQuickFilters();
    quickEl.addEventListener("click", function (e) {
      var toggle = e.target.closest("#plpSubcatToggle");
      if (toggle) {
        subcatsExpanded = !subcatsExpanded;
        buildQuickFilters();
        // The expanded tab list can crowd the sort/density controls —
        // hide them while expanded; "Show less" brings them back.
        var toolbar = document.querySelector(".plp-toolbar");
        if (toolbar) toolbar.classList.toggle("subcats-expanded", subcatsExpanded);
        return;
      }
      var b = e.target.closest("[data-subcat]");
      if (!b) return;
      var c = b.dataset.subcat;
      if (c === "") {
        state.facets.category = {};        // "New In" → clear to the full collection
      } else {
        var wasActive = !!state.facets.category[c];
        state.facets.category = {};        // single-select sub-category
        if (!wasActive) state.facets.category[c] = true;
      }
      resetPageAndRender();
      syncSubcats();
    });
  }

  /* ── Mobile filter drawer ─────────────────────────────────── */
  (function () {
    var toggle = document.getElementById("plpFilterToggle");
    var scrim = document.getElementById("plpFiltersScrim");
    if (!toggle || !filtersEl || !scrim) return;
    function open() {
      filtersEl.classList.add("is-drawer-open");
      scrim.hidden = false;
      document.body.style.overflow = "hidden";
    }
    function close() {
      filtersEl.classList.remove("is-drawer-open");
      scrim.hidden = true;
      document.body.style.overflow = "";
    }
    toggle.addEventListener("click", open);
    scrim.addEventListener("click", close);
    filtersEl.addEventListener("click", function (e) {
      if (e.target.closest("#plpFiltersClose")) close();
    });
  })();

  /* ── Sort (custom dropdown) ───────────────────────────────── */
  (function () {
    var root = document.getElementById("plpSort");
    if (!root) return;
    var btn = document.getElementById("plpSortBtn");
    var menu = document.getElementById("plpSortMenu");
    var valueEl = document.getElementById("plpSortValue");
    var opts = Array.prototype.slice.call(menu.querySelectorAll(".plp-sort-opt"));

    function open() {
      root.classList.add("is-open");
      menu.hidden = false;
      btn.setAttribute("aria-expanded", "true");
      document.addEventListener("click", onOutside, true);
      document.addEventListener("keydown", onKey);
    }
    function close() {
      root.classList.remove("is-open");
      menu.hidden = true;
      btn.setAttribute("aria-expanded", "false");
      document.removeEventListener("click", onOutside, true);
      document.removeEventListener("keydown", onKey);
    }
    function onOutside(e) { if (!root.contains(e.target)) close(); }
    function onKey(e) { if (e.key === "Escape") { close(); btn.focus(); } }

    function select(opt) {
      opts.forEach(function (o) {
        var on = o === opt;
        o.classList.toggle("is-active", on);
        o.setAttribute("aria-selected", on ? "true" : "false");
      });
      valueEl.textContent = opt.textContent;
      state.sort = opt.dataset.value;
      resetPageAndRender();
    }

    btn.addEventListener("click", function () {
      if (root.classList.contains("is-open")) close(); else open();
    });
    opts.forEach(function (opt) {
      opt.addEventListener("click", function () { select(opt); close(); btn.focus(); });
    });
  })();

  /* ── Grid density (3 / 4 columns) ─────────────────────────── */
  var densityBtns = document.querySelectorAll(".plp-density button");
  densityBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      densityBtns.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      if (grid) grid.style.setProperty("--plp-cols", btn.dataset.cols);
      equalizeTitles();   // column count changed → recompute per-row reservations
    });
  });

  /* ── Header count sync (uses the shared header markup) ────── */
  function syncHeaderWishCount() {
    var el = document.getElementById("wishCount");
    if (!el) return;
    var n = Object.keys(state.wishlist).length;
    el.textContent = n;
    el.hidden = n === 0;
  }
  function bumpBag() {
    var el = document.getElementById("cartCount");
    if (!el) return;
    var n = (parseInt(el.textContent, 10) || 0) + 1;
    el.textContent = n;
    el.hidden = false;
  }

  /* ── Add-to-bag confirmation modal ─────────────────────────── */
  var cartScrim = document.getElementById("plpCartScrim");
  var cartModal = document.getElementById("plpCartModal");
  var cartModalBody = document.getElementById("plpCartModalBody");

  function closeCartModal() {
    if (!cartModal) return;
    cartModal.classList.remove("is-open");
    if (cartScrim) cartScrim.classList.remove("is-open");
    setTimeout(function () {
      cartModal.hidden = true;
      if (cartScrim) cartScrim.hidden = true;
    }, 200); // let the close transition finish
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onCartModalKey);
  }
  function onCartModalKey(e) { if (e.key === "Escape") closeCartModal(); }

  var cartModalProduct = null; // product currently shown in the modal

  /* Modal body — same swatch chips and size text-chips as the listing
     cards (shared .plp-swatch / .plp-size styles), selectable in-place. */
  function cartModalBodyHTML(product) {
    var img = displayImage(product);
    var onSale = product.compareAt && product.compareAt > product.price;
    var price = onSale
      ? '<span class="was">' + money(product.compareAt) + '</span><span class="now">' + money(product.price) + "</span>"
      : money(product.price);

    var selIdx = state.selected[product.id] || 0;
    var variant = product.variants[selIdx] || product.variants[0];

    var swatches = product.variants.map(function (v, i) {
      var style = product.imageSwatches && v.image
        ? "background-image:url(" + v.image + ")"
        : "background:" + v.hex;
      return '<button type="button" class="plp-swatch' + (product.imageSwatches ? " plp-swatch-img" : "") +
        (i === selIdx ? " is-active" : "") + '" data-modal-swatch="' + i + '" style="' + style + '" ' +
        'aria-label="' + v.color + '" title="' + v.color + '"></button>';
    }).join("");

    var colourRow =
      '<span class="plp-cart-modal-variant">Colour: <b>' + (variant ? variant.color : "") + "</b></span>" +
      '<div class="plp-swatches plp-cart-modal-swatches">' + swatches + "</div>";

    var sizeSel = state.size[product.id];
    var sizeRow;
    if (product.sizes && product.sizes.length) {
      var chips = product.sizes.map(function (s) {
        var soldOut = product.soldOutSizes && product.soldOutSizes.indexOf(s) !== -1;
        return '<button type="button" class="plp-size' +
          (soldOut ? " is-soldout" : "") + (s === sizeSel ? " is-active" : "") + '" ' +
          (soldOut ? 'disabled aria-disabled="true" ' : "") +
          'data-modal-size="' + s + '">' + s + "</button>";
      }).join("");
      sizeRow =
        '<span class="plp-cart-modal-variant">Size:' + (sizeSel ? " <b>" + sizeSel + "</b>" : "") + "</span>" +
        '<div class="plp-sizes plp-cart-modal-sizes">' + chips + "</div>";
    } else {
      sizeRow = '<span class="plp-cart-modal-variant">Size: <b>One Size</b></span>';
    }

    return (
      '<img class="plp-cart-modal-img" src="' + img + '" alt="' + product.name + '">' +
      '<div class="plp-cart-modal-info">' +
        '<span class="plp-cart-modal-brand">' + product.vendor + "</span>" +
        '<span class="plp-cart-modal-name">' + product.name + "</span>" +
        colourRow +
        sizeRow +
        '<span class="plp-cart-modal-price">' + price + "</span>" +
      "</div>"
    );
  }

  /* Keep the grid card behind the modal in step with modal selections. */
  function syncCardFromState(product) {
    var card = grid && grid.querySelector('.plp-card[data-id="' + product.id + '"]');
    if (!card) return;
    var selIdx = state.selected[product.id] || 0;
    card.querySelectorAll(".plp-swatch").forEach(function (el, i) {
      el.classList.toggle("is-active", i === selIdx);
    });
    var img = card.querySelector(".plp-card-mainimg");
    if (img) img.src = displayImage(product);
    var sizeSel = state.size[product.id];
    card.querySelectorAll(".plp-size").forEach(function (el) {
      el.classList.toggle("is-active", el.dataset.size === sizeSel);
    });
  }

  function openCartModal(product) {
    if (!cartScrim || !cartModal || !cartModalBody) return;
    cartModalProduct = product;
    cartModalBody.innerHTML = cartModalBodyHTML(product);

    cartModal.hidden = false;
    cartScrim.hidden = false;
    void cartModal.offsetWidth; // force layout so the open transition actually runs
    cartModal.classList.add("is-open");
    cartScrim.classList.add("is-open");
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onCartModalKey);
  }

  if (cartModal) {
    var cartCloseBtn = document.getElementById("plpCartModalClose");
    var cartContinueBtn = document.getElementById("plpCartModalContinue");
    var cartViewBagBtn = document.getElementById("plpCartModalViewBag");
    if (cartCloseBtn) cartCloseBtn.addEventListener("click", closeCartModal);
    if (cartContinueBtn) cartContinueBtn.addEventListener("click", closeCartModal);
    if (cartScrim) cartScrim.addEventListener("click", closeCartModal);
    // No real bag page in this demo — "View bag" just closes for now.
    if (cartViewBagBtn) cartViewBagBtn.addEventListener("click", closeCartModal);

    // Colour / size selection inside the modal — updates the shared state,
    // refreshes the modal body and keeps the grid card behind it in sync.
    cartModalBody.addEventListener("click", function (e) {
      if (!cartModalProduct) return;
      var sw = e.target.closest("[data-modal-swatch]");
      if (sw) {
        state.selected[cartModalProduct.id] = Number(sw.dataset.modalSwatch);
        cartModalBody.innerHTML = cartModalBodyHTML(cartModalProduct);
        syncCardFromState(cartModalProduct);
        return;
      }
      var sz = e.target.closest("[data-modal-size]");
      if (sz && !sz.disabled) {
        state.size[cartModalProduct.id] = sz.dataset.modalSize;
        cartModalBody.innerHTML = cartModalBodyHTML(cartModalProduct);
        syncCardFromState(cartModalProduct);
      }
    });
  }

  render();
  if (loadMoreEl) maybeLoadMore(); // covers the case where the sentinel is already in view on load
})();

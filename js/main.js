/* =====================================================================
   THE DAILY FINDS — main.js
   Reads the `products` array from js/products.js and builds the page.
   You normally never need to edit this file.
   To add a NEW CATEGORY: add a line to CATEGORIES below, then use the
   same "name" in products.js.
   ===================================================================== */
(function () {
  "use strict";

  /* ---------- Settings ---------- */
  const PAGE_SIZE = 8;               // products shown before "Load more"
  const TRENDING_COUNT = 6;
  const LATEST_COUNT = 4;
  const FALLBACK_IMG = "assets/products/placeholder.svg";

  // key = short filter label / URL value, name = exact category in products.js
  // image = optional path to a category photo, e.g. "assets/images/tech.jpg"
  const CATEGORIES = [
    { key: "Fashion",     name: "Fashion & Outfits",      tone: "#F1ECE4", image: "" },
    { key: "Tech",        name: "Tech & Gadgets",         tone: "#E9ECEE", image: "" },
    { key: "Home Decor",  name: "Home Decor",             tone: "#EFE9DF", image: "" },
    { key: "Beauty",      name: "Beauty & Personal Care", tone: "#F3E8E4", image: "" },
    { key: "Lifestyle",   name: "Lifestyle Essentials",   tone: "#E8EDE6", image: "" },
    { key: "Accessories", name: "Accessories",            tone: "#EEEAE2", image: "" },
    { key: "Student",     name: "Student Essentials",     tone: "#EAEAF0", image: "" }
  ];

  /* ---------- Helpers ---------- */
  const $ = (id) => document.getElementById(id);
  const list = typeof products !== "undefined" ? products : [];
  const state = { cat: "All", q: "", sort: "newest", shown: PAGE_SIZE };

  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const catByName = (name) => CATEGORIES.find((c) => c.name === name);
  const catByKey = (key) => CATEGORIES.find((c) => c.key.toLowerCase() === String(key).toLowerCase());
  const countFor = (c) => list.filter((p) => p.category === c.name).length;
  const byNewest = (a, b) => (b.dateAdded || "").localeCompare(a.dateAdded || "") || b.id - a.id;

  /* ---------- Product card ---------- */
  function cardHTML(p) {
    const hasLink = /^https?:\/\//i.test(p.affiliateLink || "");
    const cta = hasLink
      ? `<a class="btn btn-dark" href="${esc(p.affiliateLink)}" target="_blank" rel="sponsored noopener noreferrer">View Product</a>`
      : `<span class="btn" aria-disabled="true">Link coming soon</span>`;
    return `
      <article class="card">
        <div class="card-img">
          <img src="${esc(p.image || FALLBACK_IMG)}" alt="${esc(p.name)}" width="400" height="400" loading="lazy">
        </div>
        <div class="card-body">
          <div class="tags">
            <span class="tag">${esc(p.category)}</span>
            ${p.badge ? `<span class="tag tag-badge">${esc(p.badge)}</span>` : ""}
          </div>
          <h3>${esc(p.name)}</h3>
          <p class="card-desc">${esc(p.description)}</p>
          ${p.price ? `<p class="card-price">${esc(p.price)}</p>` : ""}
          ${cta}
        </div>
      </article>`;
  }

  // If any image fails to load, swap in the local placeholder (once).
  document.addEventListener("error", (e) => {
    const img = e.target;
    if (img.tagName === "IMG" && img.dataset.fallback !== "1") {
      img.dataset.fallback = "1";
      img.src = FALLBACK_IMG;
    }
  }, true);

  /* ---------- Filtering, searching, sorting ---------- */
  function getResults() {
    const words = state.q.toLowerCase().split(/\s+/).filter(Boolean);
    const cat = state.cat === "All" ? null : catByKey(state.cat);
    const out = list.filter((p) => {
      if (cat && p.category !== cat.name) return false;
      const hay = `${p.name} ${p.category} ${p.description}`.toLowerCase();
      return words.every((w) => hay.includes(w));
    });
    if (state.sort === "oldest") out.sort((a, b) => -byNewest(a, b));
    else if (state.sort === "az") out.sort((a, b) => a.name.localeCompare(b.name));
    else out.sort(byNewest);
    return out;
  }

  function renderProducts() {
    const grid = $("productGrid");
    if (!grid) return;
    const results = getResults();
    const visible = results.slice(0, state.shown);
    grid.innerHTML = visible.map(cardHTML).join("");
    $("emptyState").hidden = results.length > 0;
    $("loadMore").hidden = state.shown >= results.length;
    $("resultCount").textContent = results.length
      ? `Showing ${visible.length} of ${results.length} products`
      : "";
    document.querySelectorAll("#filterBar .pill").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.cat === state.cat)));
  }

  function renderFilters() {
    const bar = $("filterBar");
    if (!bar) return;
    const pills = [{ key: "All", n: list.length }].concat(
      CATEGORIES.map((c) => ({ key: c.key, n: countFor(c) })));
    bar.innerHTML = pills.map((p) =>
      `<button type="button" class="pill" data-cat="${esc(p.key)}" aria-pressed="false">${esc(p.key)} (${p.n})</button>`).join("");
  }

  function renderCategories() {
    const grid = $("categoryGrid");
    if (!grid) return;
    grid.innerHTML = CATEGORIES.map((c) => `
      <button type="button" class="cat-card" data-cat="${esc(c.key)}" style="--tone:${c.tone}">
        ${c.image ? `<img src="${esc(c.image)}" alt="" loading="lazy">` : ""}
        <span class="cat-name">${esc(c.name)}</span>
        <span class="cat-count">${countFor(c)} products</span>
        <span class="cat-go">Explore</span>
      </button>`).join("");
  }

  function renderShowcases() {
    const sorted = list.slice().sort(byNewest);
    const trending = $("trendingGrid");
    if (trending) trending.innerHTML = sorted.filter((p) => p.featured).slice(0, TRENDING_COUNT).map(cardHTML).join("");
    const latest = $("latestGrid");
    if (latest) latest.innerHTML = sorted.slice(0, LATEST_COUNT).map(cardHTML).join("");
    const hero = $("heroLatest");
    if (hero) {
      hero.innerHTML = sorted.slice(0, 3).map((p) => {
        const c = catByName(p.category);
        const d = new Date(p.dateAdded + "T00:00:00");
        const date = isNaN(d) ? "" : d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
        return `<li><b>${esc(p.name)}</b><span>${esc(c ? c.key : p.category)}, ${esc(date)}</span></li>`;
      }).join("");
    }
    const foot = $("footerCategories");
    if (foot) foot.innerHTML = CATEGORIES.map((c) =>
      `<li><a href="index.html?cat=${encodeURIComponent(c.key)}#products">${esc(c.name)}</a></li>`).join("");
  }

  /* ---------- Actions ---------- */
  function setCategory(key) {
    state.cat = key; state.shown = PAGE_SIZE; renderProducts();
  }
  function scrollToProducts() {
    const el = $("products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  /* ---------- Events ---------- */
  function bindEvents() {
    const navToggle = $("navToggle"), navLinks = $("navLinks");
    if (navToggle) navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });

    const searchToggle = $("searchToggle"), panel = $("searchPanel"), input = $("searchInput");
    if (searchToggle) searchToggle.addEventListener("click", () => {
      panel.hidden = !panel.hidden;
      searchToggle.setAttribute("aria-expanded", String(!panel.hidden));
      if (!panel.hidden) input.focus();
    });
    if (input) {
      input.addEventListener("input", () => {
        if (!$("productGrid")) return;
        state.q = input.value.trim(); state.shown = PAGE_SIZE; renderProducts();
      });
      input.addEventListener("keydown", (e) => {
        if (e.key !== "Enter") return;
        e.preventDefault();
        if ($("productGrid")) scrollToProducts();
        else window.location.href = `index.html?q=${encodeURIComponent(input.value.trim())}#products`;
      });
    }

    const bar = $("filterBar");
    if (bar) bar.addEventListener("click", (e) => {
      const b = e.target.closest(".pill"); if (b) setCategory(b.dataset.cat);
    });
    const cats = $("categoryGrid");
    if (cats) cats.addEventListener("click", (e) => {
      const b = e.target.closest(".cat-card");
      if (b) { setCategory(b.dataset.cat); scrollToProducts(); }
    });
    const sort = $("sortSelect");
    if (sort) sort.addEventListener("change", () => { state.sort = sort.value; state.shown = PAGE_SIZE; renderProducts(); });
    const more = $("loadMore");
    if (more) more.addEventListener("click", () => { state.shown += PAGE_SIZE; renderProducts(); });
    const clear = $("clearFilters");
    if (clear) clear.addEventListener("click", () => {
      state.q = ""; state.cat = "All"; state.shown = PAGE_SIZE;
      if (input) input.value = "";
      renderProducts();
    });

    // Newsletter: front-end demo only. Nothing is sent or stored.
    const form = $("newsletterForm");
    if (form) form.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = $("newsletterMsg"), email = $("newsletterEmail").value.trim();
      msg.textContent = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? "Thanks for your interest. This is a demo form, so nothing was saved. Subscriptions will work once an email service is connected."
        : "Please enter a valid email address.";
    });
  }

  /* ---------- Start ---------- */
  function init() {
    renderShowcases();
    renderFilters();
    renderCategories();
    bindEvents();

    // Support links like index.html?cat=Tech#products and ?q=mouse
    const params = new URLSearchParams(window.location.search);
    const c = params.get("cat") && catByKey(params.get("cat"));
    if (c) state.cat = c.key;
    const q = params.get("q");
    if (q && $("searchInput")) {
      state.q = q.trim();
      $("searchInput").value = q;
      $("searchPanel").hidden = false;
      $("searchToggle").setAttribute("aria-expanded", "true");
    }
    renderProducts();
    if (window.location.hash === "#products") requestAnimationFrame(scrollToProducts);
  }

  init();
})();
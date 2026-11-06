// Shared photo viewer (v3). Use: Lightbox.open([{src, alt, title, sub}], startIndex)
(function () {
  "use strict";
  var root, img, title, sub, prev, next, closeBtn, items = [], idx = 0, lastFocus = null;

  // The viewer carries its own styles (with !important), so it looks the same on every page
  function addStyle() {
    if (document.getElementById("lb-style")) return;
    var st = document.createElement("style");
    st.id = "lb-style";
    st.textContent = [
      ".lb{position:fixed;top:0;right:0;bottom:0;left:0;z-index:2147483000;background:rgba(20,15,35,.94);display:flex;justify-content:center;align-items:center;padding:30px;margin:0;box-sizing:border-box;}",
      ".lb[hidden]{display:none;}",
      ".lb .lb-fig{margin:0;padding:0;text-align:center;color:#fff;max-width:100%;background:none;border:0;}",
      ".lb .lb-fig img{display:block;max-width:95vw;max-height:80vh;width:auto;height:auto;aspect-ratio:auto;object-fit:contain;border-radius:12px;box-shadow:0 10px 40px rgba(0,0,0,.3);margin:0 auto;}",
      ".lb .lb-fig figcaption{display:flex;flex-direction:column;gap:2px;margin-top:10px;padding:0;color:#fff;font-size:1rem;}",
      ".lb .lb-fig figcaption span{opacity:.85;font-size:.9rem;}",
      ".lb button{appearance:none;-webkit-appearance:none;background:transparent;border:0;border-radius:0;box-shadow:none;color:#fff;cursor:pointer;font:inherit;margin:0;min-width:0;width:auto;height:auto;}",
      ".lb .lb-close{position:absolute;top:14px;right:24px;font-size:42px;line-height:1;padding:4px 8px;}",
      ".lb .lb-nav{position:absolute;top:50%;transform:translateY(-50%);font-size:34px;line-height:1;padding:12px;}",
      ".lb .lb-prev{left:12px;}",
      ".lb .lb-next{right:12px;}",
      ".lb button:hover{opacity:.8;}",
      ".lb button:focus-visible{outline:3px solid #fff;outline-offset:2px;}"
    ].join("").replace(/;/g, " !important;") +
      "@media (max-width:600px){.lb{padding:12px !important;}.lb .lb-fig img{max-width:96vw !important;max-height:75vh !important;}.lb .lb-close{right:10px !important;}}";
    document.head.appendChild(st);
  }

  function build() {
    addStyle();
    root = document.createElement("div");
    root.className = "lb";
    root.hidden = true;
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-modal", "true");
    root.setAttribute("aria-label", "Photo viewer");
    root.innerHTML =
      '<button class="lb-close" type="button" aria-label="Close">&times;</button>' +
      '<button class="lb-nav lb-prev" type="button" aria-label="Previous photo">&#10094;</button>' +
      '<figure class="lb-fig"><img alt=""><figcaption><strong></strong><span></span></figcaption></figure>' +
      '<button class="lb-nav lb-next" type="button" aria-label="Next photo">&#10095;</button>';
    document.body.appendChild(root);
    img = root.querySelector("img");
    title = root.querySelector("strong");
    sub = root.querySelector("span");
    prev = root.querySelector(".lb-prev");
    next = root.querySelector(".lb-next");
    closeBtn = root.querySelector(".lb-close");
    closeBtn.addEventListener("click", close);
    prev.addEventListener("click", function () { show(idx - 1); });
    next.addEventListener("click", function () { show(idx + 1); });
    root.addEventListener("click", function (e) { if (e.target === root) close(); });
    document.addEventListener("keydown", onKey);
  }

  function show(i) {
    idx = (i + items.length) % items.length;
    var it = items[idx];
    img.src = it.src;
    img.alt = it.alt || it.title || "";
    title.textContent = it.title || "";
    sub.textContent = it.sub || "";
  }

  function onKey(e) {
    if (root.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight" && items.length > 1) show(idx + 1);
    else if (e.key === "ArrowLeft" && items.length > 1) show(idx - 1);
    else if (e.key === "Tab") {
      var f = [closeBtn].concat(items.length > 1 ? [prev, next] : []);
      var i = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  }

  function open(list, start) {
    if (!list || !list.length) return;
    if (!root) build();
    items = list;
    lastFocus = document.activeElement;
    prev.hidden = next.hidden = items.length < 2;
    show(start || 0);
    root.hidden = false;
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function close() {
    if (!root || root.hidden) return;
    root.hidden = true;
    img.removeAttribute("src");
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  window.Lightbox = { open: open, close: close };
})();
// Makes photo buttons look like plain photos (no extra frame)
(function () {
  var st = document.createElement("style");
  st.textContent = ".pic-btn{display:block !important;width:100% !important;margin:0 !important;padding:0 !important;border:0 !important;border-radius:0 !important;background:none !important;box-shadow:none !important;cursor:zoom-in;font:inherit;color:inherit;line-height:0;}";
  document.head.appendChild(st);
})();

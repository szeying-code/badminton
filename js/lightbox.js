// Shared photo viewer. Use: Lightbox.open([{src, alt, title, sub}], startIndex)
(function () {
  "use strict";
  var root, img, title, sub, prev, next, closeBtn, items = [], idx = 0, lastFocus = null;

  function build() {
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

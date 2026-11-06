// ============================================
// AVACADO BC - SHARED UK + KL SCRIPT
// ============================================
(function () {
  "use strict";

  // ---------- Helpers ----------
  function $(id) { return document.getElementById(id); }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Makes file names with spaces safe, without double-encoding
  function enc(p) {
    try { return encodeURI(decodeURI(p)); } catch (e) { return encodeURI(p); }
  }

  function hasData(name) { return typeof window[name] !== "undefined"; }

  function empty(msg) { return '<p class="empty">' + msg + '</p>'; }

  // Reads "2026-03-14", "14 March 2026" or "March 14, 2026" (text in brackets is ignored)
  function parseDate(text) {
    var t = String(text || "").replace(/\s*\([^)]*\)/g, "").trim(), m;
    if ((m = t.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/))) {
      return new Date(+m[1], m[2] - 1, +m[3]).getTime();
    }
    var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    var y = t.match(/\b(\d{4})\b/);
    var mo = t.toLowerCase().match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/);
    var d = t.match(/\b(\d{1,2})(?:st|nd|rd|th)?\b/);
    if (y && mo) return new Date(+y[1], months.indexOf(mo[1]), d ? +d[1] : 1).getTime();
    var n = Date.parse(t);
    return isNaN(n) ? 0 : n;
  }

  // ---------- Club information ----------
  if (hasData("CLUB")) {
    document.title = CLUB.name + " 🏸";
    if ($("club-name")) $("club-name").textContent = CLUB.name;
    if ($("club-tagline")) $("club-tagline").textContent = CLUB.tagline;
    if ($("club-footer")) $("club-footer").textContent = CLUB.footer;
  }

  // ---------- Team record + match log ----------
  var wins = 0, losses = 0, draws = 0, games = 0, rows = "";
  var isKlPage = !!$("friendly-all");

  if (hasData("MATCHES")) {
    // The id is the match's own id, or its position in matches.js (counting from 1)
    MATCHES.map(function (m, i) {
      return { m: m, id: m.id != null ? m.id : i + 1, t: parseDate(m.date) };
    }).sort(function (a, b) {
      return b.t - a.t;
    }).forEach(function (o) {
      var m = o.m;

      if (m.result) { // Competition (UK)
        rows +=
          '<div class="m"><div><span>' + esc(m.date) + " · " + esc(m.opponent) +
          '</span><br><span class="tag">Competition</span></div>' +
          '<div class="sc">' + esc(m.result) + '</div></div>';
        return;
      }

      games++;
      var result;
      if (Number(m.us) > Number(m.them)) { wins++; result = "win"; }
      else if (Number(m.us) < Number(m.them)) { losses++; result = "lose"; }
      else { draws++; result = "draw"; }

      var label = result === "win" ? "We won 🎉" : result === "draw" ? "Draw 🤝" : "We lost 💪";

      var content =
        '<div><strong>' + esc(m.opponent) + '</strong>' +
        '<br><small class="match-details">' + esc(m.date) + ' · ' + esc(m.venue || "") + ' · ' + esc(m.time || "") + '</small>' +
        '<br><span class="tag ' + result + '">' + label + '</span></div>' +
        '<div class="sc">Us ' + esc(m.us) + " – " + esc(m.them) + ' Them</div>';

      rows += isKlPage
        ? '<a href="match.html?id=' + esc(o.id) + '" class="m ' + result + ' match-link">' + content + '</a>'
        : '<div class="m ' + result + '">' + content + '</div>';
    });
  }

  if ($("stat-games")) $("stat-games").textContent = games;
  if ($("stat-wins")) $("stat-wins").textContent = wins;
  if ($("stat-draws")) $("stat-draws").textContent = draws;
  if ($("stat-losses")) $("stat-losses").textContent = losses;
  if ($("match-log")) $("match-log").innerHTML = rows || empty("No games yet. Add one in matches.js 🏸");

  // ---------- Photo gallery ----------
  function renderPhotos(items) {
    return items.map(function (x) {
      if (x.img) {
        var src = esc("images/" + enc(x.img));
        return '<figure class="pic"><button class="pic-btn" type="button" data-src="' + src +
          '" data-alt="' + esc(x.caption) + '"><img src="' + src + '" alt="' + esc(x.caption) +
          '" loading="lazy"></button><figcaption>' + esc(x.caption) + '</figcaption></figure>';
      }
      return '<div class="ph"><i>' + esc(x.emoji || "📸") + '</i>' + esc(x.caption) + '</div>';
    }).join("");
  }

  function fill(id, items, render, msg) {
    var el = $(id);
    if (el) el.innerHTML = items && items.length ? render(items) : empty(msg);
  }

  fill("moments", hasData("MOMENTS") ? MOMENTS : [], renderPhotos, "Photos coming soon 📸");
  fill("friendly-moments", hasData("FRIENDLY_MATCHES") ? FRIENDLY_MATCHES : [], renderPhotos, "Photos coming soon 📸");
  fill("design-gallery", hasData("DESIGNS") ? DESIGNS : [], renderPhotos, "Designs coming soon 🎨");

  // Click a photo: open the shared viewer (arrows move through the same gallery)
  document.addEventListener("click", function (e) {
    var b = e.target.closest(".pic-btn");
    if (!b || !window.Lightbox) return;
    var group = b.closest(".grid,#friendly-all,#friendly-moments,#design-gallery") || document;
    var btns = [].slice.call(group.querySelectorAll(".pic-btn"));
    Lightbox.open(btns.map(function (x) {
      return { src: x.dataset.src, alt: x.dataset.alt, title: x.dataset.alt };
    }), btns.indexOf(b));
  });

  // ---------- Videos ----------
  function renderVideo(v) {
    var note = v.date ? '<br><small>📅 ' + esc(v.date) + '</small>' : "";
    var caption = '<figcaption>' + esc(v.title) + note + '</figcaption>';

    if (v.youtube) {
      return '<figure class="vc"><iframe src="https://www.youtube.com/embed/' + esc(v.youtube) +
        '" title="' + esc(v.title) + '" loading="lazy" allowfullscreen></iframe>' + caption + '</figure>';
    }
    if (v.file) {
      return '<figure class="vc"><video controls preload="metadata" playsinline><source src="videos/' +
        esc(enc(v.file)) + '">Your browser does not support this video.</video>' + caption + '</figure>';
    }
    return '<div class="vd">▶ ' + esc(v.title) + '</div>';
  }

  var allVlogs = hasData("VLOGS") ? VLOGS : [];

  fill("vlogs", allVlogs.filter(function (v) {
    return v.category !== "trip" && v.category !== "friendly";
  }), function (a) { return a.map(renderVideo).join(""); }, "Videos coming soon 🎬");

  fill("trip-vlogs", allVlogs.filter(function (v) {
    return v.category === "trip";
  }), function (a) { return a.map(renderVideo).join(""); }, "Trip videos coming soon ✈️");

  // ---------- KL friendly matches (photos + video popup) ----------
  var friendlyAll = $("friendly-all");

  if (friendlyAll) {
    var photosHtml = hasData("FRIENDLY_MATCHES") ? renderPhotos(FRIENDLY_MATCHES) : "";
    var videosHtml = allVlogs.filter(function (v) {
      return v.category === "friendly" && v.file;
    }).map(function (v) {
      return '<figure class="pic friendly-video-card"><video muted loop playsinline preload="metadata">' +
        '<source src="videos/' + esc(enc(v.file)) + '"></video>' +
        '<button class="friendly-play" type="button" aria-label="Play video: ' + esc(v.title) + '">▶</button>' +
        '<figcaption>' + esc(v.title) + '</figcaption></figure>';
    }).join("");

    friendlyAll.innerHTML = photosHtml + videosHtml || empty("Friendly match clips coming soon 🏸");

    var modal = document.createElement("div");
    modal.className = "friendly-video-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Video player");
    modal.innerHTML = '<button class="friendly-video-close" type="button" aria-label="Close">&times;</button><video controls playsinline></video>';
    document.body.appendChild(modal);

    var popup = modal.querySelector("video"), opener = null;

    friendlyAll.addEventListener("click", function (e) {
      var btn = e.target.closest(".friendly-play");
      if (!btn) return;
      var cardVideo = btn.parentElement.querySelector("video");
      if (!cardVideo) return;
      opener = btn;
      popup.src = cardVideo.currentSrc || cardVideo.querySelector("source").src;
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
      modal.querySelector(".friendly-video-close").focus();
      popup.play().catch(function () {});
    });

    function closeVideo() {
      if (!modal.classList.contains("active")) return;
      popup.pause();
      popup.removeAttribute("src");
      popup.load();
      modal.classList.remove("active");
      document.body.style.overflow = "";
      if (opener) opener.focus();
    }

    modal.addEventListener("click", function (e) {
      if (e.target === modal || e.target.classList.contains("friendly-video-close")) closeVideo();
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeVideo(); });
  }
})();

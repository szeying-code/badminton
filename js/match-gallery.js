// Match page: result, line-ups and photos. Data comes from data/matches.js and data/lineups.js
(function () {
  "use strict";

  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function enc(p) { try { return encodeURI(decodeURI(p)); } catch (e) { return encodeURI(p); } }

  var title = $("match-title"), opponent = $("match-opponent"), score = $("match-score");
  var photos = $("match-photos"), heading = $("photos-heading"), lineups = $("match-lineups");
  var club = typeof CLUB !== "undefined" ? CLUB.name : "Avacado BC";

  var id = Number(new URLSearchParams(window.location.search).get("id"));
  var all = typeof MATCHES !== "undefined" ? MATCHES : [];
  // Same id rule as script.js: the match's own id, or its position in matches.js
  var match = all.filter(function (m, i) { return Number(m.id != null ? m.id : i + 1) === id; })[0];

  if (!match) {
    title.textContent = "Match not found 🏸";
    photos.textContent = "Please return to the KL homepage.";
    return;
  }

  document.title = match.date + " | " + club;
  title.textContent = match.date + " 🏸";
  opponent.textContent = "vs " + match.opponent;
  score.textContent = "Us " + match.us + " – " + match.them + " Them";

  // ---------- Line-ups ----------
  // A game row is [label, players, "win"|"lose", opponents]. The opponents part is optional;
  // older data can still list them in an "opponent" group instead.
  var lineup = (window.MATCH_LINEUPS || {})[id];
  var cats = [["md", "🏸 Men's Doubles"], ["wd", "🌸 Women's Doubles"], ["xd", "💙 Mixed Doubles"]];

  if (lineups && lineup) {
    lineups.innerHTML = cats.map(function (c) {
      var games = lineup[c[0]] || [];
      var opp = (lineup.opponent && lineup.opponent[c[0]]) || [];
      if (!games.length) return "";
      return '<section class="lineup-category"><h3>' + c[1] + '</h3><div class="lineup-list">' +
        games.map(function (g, i) {
          var against = g[3] || opp[i];
          return '<div class="lineup-row"><span>' + esc(g[0]) + ' · ' + esc(g[1]) +
            (against ? '<br><small>vs ' + esc(against) + '</small>' : "") +
            '</span><span class="lineup-result ' + esc(g[2]) + '">' + esc(g[2]).toUpperCase() + '</span></div>';
        }).join("") + '</div></section>';
    }).join("");
  }

  // ---------- Photos ----------
  var list = (window.MATCH_PHOTOS || {})[id] || []; // each: [file, label, players]

  if (!list.length) {
    photos.innerHTML = "";
    if (heading) heading.style.display = "none";
    if (lineups) setTimeout(function () { lineups.scrollIntoView({ behavior: "smooth", block: "start" }); }, 100);
    return;
  }

  if (heading) heading.style.display = "";
  photos.innerHTML = list.map(function (p, i) {
    return '<figure class="pic"><button class="pic-btn" type="button" data-index="' + i + '">' +
      '<img src="' + esc(enc(p[0])) + '" alt="' + esc(p[1] + " - " + p[2]) + '" loading="lazy"></button>' +
      '<figcaption class="photo-caption"><strong>' + esc(p[1]) + '</strong><span>' + esc(p[2]) + '</span></figcaption></figure>';
  }).join("");

  photos.addEventListener("click", function (e) {
    var b = e.target.closest(".pic-btn");
    if (!b || !window.Lightbox) return;
    Lightbox.open(list.map(function (p) {
      return { src: enc(p[0]), alt: p[1] + " - " + p[2], title: p[1], sub: p[2] };
    }), Number(b.dataset.index));
  });
})();

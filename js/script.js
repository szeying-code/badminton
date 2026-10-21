// This file builds the page from your data files. You don't need to edit it.
(function () {
  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Club text
  document.title = CLUB.name + " 🏸";
  $("club-name").textContent = CLUB.name;
  $("club-tagline").textContent = CLUB.tagline;
  $("club-footer").textContent = CLUB.footer;

  // Team record + match log
  var wins = 0, losses = 0, rows = "";
  MATCHES.forEach(function (m) {
    var won = m.us > m.them;
    if (won) wins++; else losses++;
    rows += '<div class="m"><div><span>' + esc(m.date) + " · " + esc(m.opponent) +
      '</span><br><span class="tag' + (won ? "" : " s") + '">' +
      (won ? "We won 🎉" : "We lost 💪") + '</span></div>' +
      '<div class="sc">Us ' + esc(m.us) + " – " + esc(m.them) + " Them</div></div>";
  });
  $("stat-games").textContent = MATCHES.length;
  $("stat-wins").textContent = wins;
  $("stat-losses").textContent = losses;
  $("match-log").innerHTML = rows || "<span>No games yet. Add one in data/matches.js 🏸</span>";

  // Photos
  $("moments").innerHTML = MOMENTS.map(function (x) {
    if (x.img) {
      return '<figure class="pic"><img src="images/' + esc(x.img) + '" alt="' + esc(x.caption) +
        '" loading="lazy"><figcaption>' + esc(x.caption) + "</figcaption></figure>";
    }
    return '<div class="ph"><i>' + esc(x.emoji || "📸") + "</i>" + esc(x.caption) + "</div>";
  }).join("");

  // Videos
  $("vlogs").innerHTML = VLOGS.map(function (v) {
    var note = v.date ? "<br><small style=\"opacity:.75\">📅 " + esc(v.date) + "</small>" : "";
    var cap = "<figcaption>" + esc(v.title) + note + "</figcaption>";
    if (v.youtube) {
      return '<figure class="vc"><iframe src="https://www.youtube.com/embed/' + esc(v.youtube) +
        '" title="' + esc(v.title) + '" loading="lazy" allowfullscreen></iframe>' + cap + "</figure>";
    }
    if (v.file) {
      return '<figure class="vc"><video src="videos/' + esc(encodeURI(v.file)) +
        '" controls preload="metadata" playsinline' +
        (v.cover ? ' poster="images/' + esc(encodeURI(v.cover)) + '"' : "") +
        "></video>" + cap + "</figure>";
    }
    return '<div class="vd"><i>▶</i>' + esc(v.title) + "</div>";
  }).join("");
})();

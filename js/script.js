
// ============================================
// AVACADO BC - SHARED UK + KL SCRIPT
// ============================================

(function () {
  "use strict";

  // Helpers
  function $(id) {
    return document.getElementById(id);
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[c];
    });
  }

  function hasData(name) {
    return typeof window[name] !== "undefined";
  }

  // ============================================
  // CLUB INFORMATION
  // ============================================

  if (hasData("CLUB")) {
    document.title = CLUB.name + " 🏸";

    if ($("club-name")) $("club-name").textContent = CLUB.name;
    if ($("club-tagline")) $("club-tagline").textContent = CLUB.tagline;
    if ($("club-footer")) $("club-footer").textContent = CLUB.footer;
  }

  // ============================================
  // TEAM RECORD + MATCH LOG
  // ============================================

  var wins = 0;
  var losses = 0;
  var draws = 0;
  var games = 0;
  var rows = "";

  var isKlPage = !!$("friendly-all");

  if (hasData("MATCHES")) {
    MATCHES.slice().sort(function (a, b) {
      function getDate(date) {
        return new Date(date.replace(/\s*\([^)]*\)/, ""));
      }
    
      return getDate(b.date) - getDate(a.date);
    }).forEach(function (m, matchIndex) {

      // Competition matches (UK)
      if (m.result) {
        rows +=
          '<div class="m">' +
            '<div><span>' + esc(m.date) + " · " + esc(m.opponent) +
            '</span><br><span class="tag">Competition</span></div>' +
            '<div class="sc">' + esc(m.result) + '</div>' +
          '</div>';
        return;
      }

      games++;

      var result;

      if (Number(m.us) > Number(m.them)) {
        wins++;
        result = "win";
      } else if (Number(m.us) < Number(m.them)) {
        losses++;
        result = "lose";
      } else {
        draws++;
        result = "draw";
      }

      var label =
        result === "win" ? "We won 🎉" :
        result === "draw" ? "Draw 🤝" :
        "We lost 💪";

      var matchContent =
        '<div>' +
          '<strong>' + esc(m.opponent) + '</strong>' +
          '<br><small class="match-details">' +
            esc(m.date) + ' · ' +
            esc(m.venue || '') + ' · ' +
            esc(m.time || '') +
          '</small>' +
          '<br><span class="tag ' + result + '">' +
          label + '</span>' +
        '</div>' +
        '<div class="sc">Us ' + esc(m.us) +
        " – " + esc(m.them) + ' Them</div>';

      if (isKlPage) {
        rows +=
          '<a href="match.html?id=' + (m.id || matchIndex + 1) +
          '" class="m ' + result + ' match-link">' +
          matchContent +
          '</a>';
      } else {
        rows +=
          '<div class="m ' + result + '">' +
          matchContent +
          '</div>';
      }
    });
  }

  if ($("stat-games")) $("stat-games").textContent = games;
  if ($("stat-wins")) $("stat-wins").textContent = wins;
  if ($("stat-draws")) $("stat-draws").textContent = draws;
  if ($("stat-losses")) $("stat-losses").textContent = losses;

  if ($("match-log")) {
    $("match-log").innerHTML = rows ||
      "<span>No games yet. Add one in your matches.js 🏸</span>";
  }

  // ============================================
  // PHOTO GALLERY
  // ============================================

  function renderPhotos(items) {
    return items.map(function (x) {
      if (x.img) {
        return (
          '<figure class="pic">' +
            '<img class="clickable-photo" src="images/' +
            esc(x.img) + '" alt="' + esc(x.caption) +
            '" loading="lazy">' +
            '<figcaption>' + esc(x.caption) + '</figcaption>' +
          '</figure>'
        );
      }

      return (
        '<div class="ph">' +
          '<i>' + esc(x.emoji || "📸") + '</i>' +
          esc(x.caption) +
        '</div>'
      );
    }).join("");
  }

  if ($("moments") && hasData("MOMENTS")) {
    $("moments").innerHTML = renderPhotos(MOMENTS);
  }

  if ($("friendly-moments") && hasData("FRIENDLY_MATCHES")) {
    $("friendly-moments").innerHTML = renderPhotos(FRIENDLY_MATCHES);
  }

  if ($("design-gallery") && hasData("DESIGNS")) {
    $("design-gallery").innerHTML = renderPhotos(DESIGNS);
  }

  // ============================================
  // PHOTO LIGHTBOX
  // ============================================

  var lightbox = document.createElement("div");
  lightbox.className = "photo-lightbox";

  lightbox.innerHTML =
    '<button class="photo-close" aria-label="Close">&times;</button>' +
    '<img src="" alt="Enlarged photo">';

  document.body.appendChild(lightbox);

  var lightboxImg = lightbox.querySelector("img");

  document.addEventListener("click", function (event) {
    var photo = event.target.closest(".clickable-photo");

    if (!photo) return;

    lightboxImg.src = photo.src;
    lightboxImg.alt = photo.alt;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  function closePhotoLightbox() {
    lightbox.classList.remove("active");
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  lightbox.addEventListener("click", function (event) {
    if (
      event.target === lightbox ||
      event.target.classList.contains("photo-close")
    ) {
      closePhotoLightbox();
    }
  });

  // ============================================
  // VIDEO RENDERING
  // ============================================

  function renderVideo(v) {
    var note = v.date
      ? '<br><small>📅 ' + esc(v.date) + '</small>'
      : "";

    var caption =
      '<figcaption>' + esc(v.title) + note + '</figcaption>';

    if (v.youtube) {
      return (
        '<figure class="vc">' +
          '<iframe src="https://www.youtube.com/embed/' +
          esc(v.youtube) + '" title="' + esc(v.title) +
          '" loading="lazy" allowfullscreen></iframe>' +
          caption +
        '</figure>'
      );
    }

    if (v.file) {
      return (
        '<figure class="vc">' +
          '<video controls preload="metadata" playsinline>' +
            '<source src="videos/' + esc(encodeURI(v.file)) + '">' +
            'Your browser does not support this video.' +
          '</video>' +
          caption +
        '</figure>'
      );
    }

    return '<div class="vd">▶ ' + esc(v.title) + '</div>';
  }

  // ============================================
  // UK + KL BADMINTON VLOGS
  // ============================================

  var badmintonGallery = $("vlogs");
  var tripGallery = $("trip-vlogs");

  var allVlogs = hasData("VLOGS") ? VLOGS : [];

  if (badmintonGallery) {
    badmintonGallery.innerHTML = allVlogs
      .filter(function (v) {
        return v.category !== "trip" &&
               v.category !== "friendly";
      })
      .map(renderVideo)
      .join("");
  }

  if (tripGallery) {
    tripGallery.innerHTML = allVlogs
      .filter(function (v) {
        return v.category === "trip";
      })
      .map(renderVideo)
      .join("");
  }

  // ============================================
  // KL FRIENDLY MATCH VIDEOS
  // ============================================

  var friendlyAll = $("friendly-all");

  // Friendly videos are only displayed on a page
  // that has the friendly-all container.
  if (friendlyAll) {
    var friendlyPhotos = hasData("FRIENDLY_MATCHES")
      ? FRIENDLY_MATCHES.map(function (x) {
          return (
            '<figure class="pic">' +
              '<img class="clickable-photo" src="images/' +
              esc(x.img) + '" alt="' + esc(x.caption) +
              '" loading="lazy">' +
              '<figcaption>' + esc(x.caption) + '</figcaption>' +
            '</figure>'
          );
        })
      : [];

    var friendlyVideos = allVlogs
      .filter(function (v) {
        return v.category === "friendly" && v.file;
      })
      .map(function (v) {
        return (
          '<figure class="pic friendly-video-card">' +
            '<video muted loop playsinline preload="metadata">' +
              '<source src="videos/' + esc(encodeURI(v.file)) + '">' +
            '</video>' +
            '<button class="friendly-play" type="button" aria-label="Play video">▶</button>' +
            '<figcaption>' + esc(v.title) + '</figcaption>' +
          '</figure>'
        );
      });

    friendlyAll.innerHTML =
      friendlyPhotos.concat(friendlyVideos).join("");

    // Large video popup
    var friendlyModal = document.createElement("div");
    friendlyModal.className = "friendly-video-modal";

    friendlyModal.innerHTML =
      '<button class="friendly-video-close" aria-label="Close">&times;</button>' +
      '<video controls playsinline></video>';

    document.body.appendChild(friendlyModal);

    var popupVideo = friendlyModal.querySelector("video");

    friendlyAll.addEventListener("click", function (event) {
      var playButton = event.target.closest(".friendly-play");

      if (!playButton) return;

      var cardVideo =
        playButton.parentElement.querySelector("video");

      if (!cardVideo) return;

      popupVideo.src = cardVideo.currentSrc || cardVideo.querySelector("source").src;

      friendlyModal.classList.add("active");
      document.body.style.overflow = "hidden";

      popupVideo.play().catch(function () {});
    });

    function closeFriendlyVideo() {
      popupVideo.pause();
      popupVideo.removeAttribute("src");
      popupVideo.load();

      friendlyModal.classList.remove("active");
      document.body.style.overflow = "";
    }

    friendlyModal.addEventListener("click", function (event) {
      if (
        event.target === friendlyModal ||
        event.target.classList.contains("friendly-video-close")
      ) {
        closeFriendlyVideo();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeFriendlyVideo();
        closePhotoLightbox();
      }
    });
  } else {
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closePhotoLightbox();
      }
    });
  }

})();

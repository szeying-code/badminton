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
  var wins = 0, losses = 0, games = 0, rows = "";
  MATCHES.forEach(function (m) {
    if (m.result) {
      rows += '<div class="m"><div><span>' + esc(m.date) + " · " + esc(m.opponent) +
        '</span><br><span class="tag">Competition</span></div>' +
        '<div class="sc">' + esc(m.result) + "</div></div>";
      return;
    }
    var won = m.us > m.them;
    games++;
    if (won) wins++; else losses++;
    rows += '<div class="m"><div><span>' + esc(m.date) + " · " + esc(m.opponent) +
      '</span><br><span class="tag' + (won ? "" : " s") + '">' +
      (won ? "We won 🎉" : "We lost 💪") + '</span></div>' +
      '<div class="sc">Us ' + esc(m.us) + " – " + esc(m.them) + " Them</div></div>";
  });
  $("stat-games").textContent = games;
  $("stat-wins").textContent = wins;
  $("stat-losses").textContent = losses;
  $("match-log").innerHTML = rows || "<span>No games yet. Add one in data/matches.js 🏸</span>";
  
  // Photos
  $("moments").innerHTML = MOMENTS.map(function (x) {
      if (x.img) {
        return '<figure class="pic"><img class="clickable-photo" src="images/' + esc(x.img) + '" alt="' + esc(x.caption) +
          '" loading="lazy"><figcaption>' + esc(x.caption) + "</figcaption></figure>";
      }
      return '<div class="ph"><i>' + esc(x.emoji || "📸") + "</i>" + esc(x.caption) + "</div>";
  }).join("");
  
  // Photo lightbox
  var lightbox = document.createElement("div");
  lightbox.className = "photo-lightbox";
  lightbox.innerHTML =
      '<button class="photo-close" aria-label="Close">&times;</button>' +
      '<img src="" alt="Enlarged photo">';
  
  document.body.appendChild(lightbox);
  
  var lightboxImg = lightbox.querySelector("img");
  
  // Allow both galleries to enlarge photos
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
      if (event.target === lightbox ||
          event.target.classList.contains("photo-close")) {
          closePhotoLightbox();
      }
  });
  
  document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
          closePhotoLightbox();
      }
  });
  
  // Designs - only render on pages that have a design gallery
  var designGallery = $("design-gallery");
  
  if (designGallery && typeof DESIGNS !== "undefined") {
    designGallery.innerHTML = DESIGNS.map(function (x) {
      return '<figure class="pic"><img class="clickable-photo" src="images/' +
        esc(x.img) + '" alt="' + esc(x.caption) +
        '" loading="lazy"><figcaption>' + esc(x.caption) +
        '</figcaption></figure>';
    }).join("");
  }

  // Friendly Match Photos
  var friendlyMoments = $("friendly-moments");
  
  if (friendlyMoments && typeof FRIENDLY_MATCHES !== "undefined") {
    friendlyMoments.innerHTML = FRIENDLY_MATCHES.map(function (x) {
      return '<figure class="pic"><img class="clickable-photo" src="images/' +
        esc(x.img) + '" alt="' + esc(x.caption) +
        '" loading="lazy"><figcaption>' + esc(x.caption) +
        '</figcaption></figure>';
    }).join("");
  }
  
  // Videos

  // Videos: render each video using the existing card design
  function renderVideo(v) {
    var note = v.date
      ? "<br><small style=\"opacity:.75\">📅 " + esc(v.date) + "</small>"
      : "";

    var cap = "<figcaption>" + esc(v.title) + note + "</figcaption>";

    if (v.youtube) {
      return '<figure class="vc"><iframe src="https://www.youtube.com/embed/' +
        esc(v.youtube) + '" title="' + esc(v.title) +
        '" loading="lazy" allowfullscreen></iframe>' + cap + "</figure>";
    }

    if (v.file) {
      return '<figure class="vc"><video src="videos/' +
        esc(encodeURI(v.file)) +
        '" controls preload="metadata" playsinline' +
        (v.cover
          ? ' poster="images/' + esc(encodeURI(v.cover)) + '"'
          : "") +
        "></video>" + cap + "</figure>";
    }

    return '<div class="vd"><i>▶</i>' + esc(v.title) + "</div>";
  }

  // Friendly match videos (KL page only)
  var friendlyGallery = $("friendly-vlogs");
  
  if (friendlyGallery) {
    friendlyGallery.innerHTML = VLOGS
      .filter(function (v) {
        return v.category === "friendly";
      })
      .map(function (v) {
        return '<figure class="pic friendly-video-card">' +
          '<video src="videos/' + esc(encodeURI(v.file)) +
          '" muted autoplay loop playsinline preload="metadata"></video>' +
          '<button class="friendly-play" type="button" aria-label="Play ' +
          esc(v.title) + '">▶</button>' +
          '<figcaption>' + esc(v.title) + '</figcaption>' +
          '</figure>';
      })
      .join("");
  }
  
  // Large friendly video popup
  var friendlyModal = document.createElement("div");
  friendlyModal.className = "friendly-video-modal";
  friendlyModal.innerHTML =
    '<button class="friendly-video-close">&times;</button>' +
    '<video controls playsinline></video>';
  
  document.body.appendChild(friendlyModal);
  
  var popupVideo = friendlyModal.querySelector("video");
  
  friendlyGallery && friendlyGallery.addEventListener("click", function (event) {
    var playButton = event.target.closest(".friendly-play");
    if (!playButton) return;
  
    var cardVideo = playButton.parentElement.querySelector("video");
  
    popupVideo.src = cardVideo.src;
    friendlyModal.classList.add("active");
    document.body.style.overflow = "hidden";
    popupVideo.play();
  });
  
  function closeFriendlyVideo() {
    popupVideo.pause();
    popupVideo.removeAttribute("src");
    popupVideo.load();
    friendlyModal.classList.remove("active");
    document.body.style.overflow = "";
  }
  
  friendlyModal.addEventListener("click", function (event) {
    if (event.target === friendlyModal ||
        event.target.classList.contains("friendly-video-close")) {
      closeFriendlyVideo();
    }
  });
  
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeFriendlyVideo();
  });
  // Badminton videos: newest first, oldest last
  $("vlogs").innerHTML = VLOGS
    .filter(function (v) {
      return v.category !== "trip";
    })
    .sort(function (a, b) {
      function toDate(date) {
        var parts = date.split(" ");
        var months = {
          Jan: 0, Feb: 1, Mar: 2, Apr: 3,
          May: 4, Jun: 5, Jul: 6, Aug: 7,
          Sep: 8, Oct: 9, Nov: 10, Dec: 11
        };
        return new Date(
          Number(parts[2]),
          months[parts[1]],
          Number(parts[0])
        );
      }

      return toDate(b.date) - toDate(a.date);
    })
    .map(renderVideo)
    .join("");

  
  // Trip videos: newest first, oldest last
  $("trip-vlogs").innerHTML = VLOGS
    .filter(function (v) {
      return v.category === "trip";
    })
    .sort(function (a, b) {
      function toDate(date) {
        var parts = date.split(" ");
        var months = {
          Jan: 0, Feb: 1, Mar: 2, Apr: 3,
          May: 4, Jun: 5, Jul: 6, Aug: 7,
          Sep: 8, Oct: 9, Nov: 10, Dec: 11
        };
        return new Date(
          Number(parts[2]),
          months[parts[1]],
          Number(parts[0])
        );
      }

      return toDate(b.date) - toDate(a.date);
    })
    .map(renderVideo)
    .join("");

})();

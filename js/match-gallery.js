
(function () {
  "use strict";

  // Photos and captions for each match
  var matchPhotos = {
  2: [
    // Men's Doubles
    ["images/kl_photo/match2_newspirit/shiloong_shiuan_md1.jpg", "Men's Doubles 1", "Shiloong & Shiuan"],
    ["images/kl_photo/match2_newspirit/alvin_calwin_md2.jpg", "Men's Doubles 2", "Alvin & Calwin"],
    ["images/kl_photo/match2_newspirit/qiang_kenhooi_md3.jpg", "Men's Doubles 3", "Qiang & Kenhooi"],
    ["images/kl_photo/match2_newspirit/dabin_ivern_md4.jpg", "Men's Doubles 4", "Dabin & Ivern"],
    ["images/kl_photo/match2_newspirit/mc_huasheng_md5.jpg", "Men's Doubles 5", "MC & Huasheng"],
    ["images/kl_photo/match2_newspirit/wayne_yoonghang_md6.jpg", "Men's Doubles 6", "Wayne & Yoonghang"],
  
    // Women's Doubles
    ["images/kl_photo/match2_newspirit/jieyun_huixin_wd2.jpg", "Women's Doubles 2", "Jieyun & Huixin"],
  
    // Mixed Doubles
    ["images/kl_photo/match2_newspirit/cw_zy_xd1.jpg", "Mixed Doubles 1", "CW & ZY"],
    ["images/kl_photo/match2_newspirit/yc_yishen_xd2.jpg", "Mixed Doubles 2", "YC & Yishen"],
    ["images/kl_photo/match2_newspirit/sy_parry_xd3.jpg", "Mixed Doubles 3", "SY & Parry"]
  ],

  4: [
    // Men's Doubles
    ["images/kl_photo/match4_adhoc/gary_dt_md1.jpg", "Men's Doubles 1", "Gary & DT"],
    ["images/kl_photo/match4_adhoc/cheeweng_hongyee_md2.jpg", "Men's Doubles 2", "Chee Weng & Hong Yee"],
    ["images/kl_photo/match4_adhoc/kenhooi_qicheng_md3.jpg", "Men's Doubles 3", "Kenhooi & Qi Cheng"],
    ["images/kl_photo/match4_adhoc/yishen_dabin_md4.jpg", "Men's Doubles 4", "Yishen & Dabin"],
    ["images/kl_photo/match4_adhoc/wayne_kelvin_md5.jpg", "Men's Doubles 5", "Wayne & Kelvin"],
    ["images/kl_photo/match4_adhoc/alvin_yongyiu_md6.jpg", "Men's Doubles 6", "Alvin & Yong Yiu"],
    ["images/kl_photo/match4_adhoc/huasheng_seantan_md7.jpg", "Men's Doubles 7", "Huasheng & Sean Tan"],
  
    // Women's Doubles
    ["images/kl_photo/match4_adhoc/zy_yc_wd1.jpg", "Women's Doubles 1", "ZY & YC"],
    ["images/kl_photo/match4_adhoc/jieyun_apple_wd2.jpg", "Women's Doubles 2", "Jieyun & Apple"],
    ["images/kl_photo/match4_adhoc/huixin_tiffany_wd3.jpg", "Women's Doubles 3", "Huixin & Tiffany"]
  ]
  var params = new URLSearchParams(window.location.search);
  var matchId = Number(params.get("id"));

  var match = MATCHES.find(function (m) {
    return Number(m.id) === matchId;
  });

  var title = document.getElementById("match-title");
  var opponent = document.getElementById("match-opponent");
  var score = document.getElementById("match-score");
  var photos = document.getElementById("match-photos");

  if (!match) {
    title.textContent = "Match not found 🏸";
    photos.textContent = "Please return to the KL homepage.";
    return;
  }

  document.title = match.date + " | Avacado BC";
  title.textContent = match.date + " 🏸";
  opponent.textContent = "vs " + match.opponent;
  score.textContent = "Us " + match.us + " – " + match.them + " Them";

  var currentPhotos = matchPhotos[matchId] || [];

  if (currentPhotos.length === 0) {
    photos.innerHTML =
      '<div class="match-empty">' +
        '<div>📸</div>' +
        '<h3>Photos coming soon!</h3>' +
        '<p>We are preparing our match memories. Stay tuned! 💙</p>' +
      '</div>';
    return;
  }

  // Display photos with captions
  photos.innerHTML = currentPhotos.map(function (photo, index) {
    return (
      '<figure class="pic">' +
        '<img src="' + photo[0] +
        '" alt="' + photo[1] + ' - ' + photo[2] +
        '" loading="lazy" data-index="' + index + '">' +
        '<figcaption class="photo-caption">' +
          '<strong>' + photo[1] + '</strong>' +
          '<span>' + photo[2] + '</span>' +
        '</figcaption>' +
      '</figure>'
    );
  }).join("");

  // Create photo enlargement lightbox
  var lightbox = document.createElement("div");
  lightbox.className = "photo-lightbox";
  lightbox.innerHTML =
    '<button class="lightbox-close" aria-label="Close">&times;</button>' +
    '<button class="lightbox-prev" aria-label="Previous photo">&#10094;</button>' +
    '<div class="lightbox-content">' +
      '<img class="lightbox-image" src="" alt="">' +
      '<div class="lightbox-caption"></div>' +
    '</div>' +
    '<button class="lightbox-next" aria-label="Next photo">&#10095;</button>';

  document.body.appendChild(lightbox);

  var lightboxImage = lightbox.querySelector(".lightbox-image");
  var lightboxCaption = lightbox.querySelector(".lightbox-caption");
  var currentIndex = 0;

  function showPhoto(index) {
    currentIndex = (index + currentPhotos.length) % currentPhotos.length;

    var photo = currentPhotos[currentIndex];
    lightboxImage.src = photo[0];
    lightboxImage.alt = photo[1] + " - " + photo[2];

    lightboxCaption.innerHTML =
      '<strong>' + photo[1] + '</strong>' +
      '<span>' + photo[2] + '</span>';
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  photos.addEventListener("click", function (event) {
    var img = event.target.closest("img[data-index]");
    if (!img) return;

    showPhoto(Number(img.dataset.index));
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  lightbox.querySelector(".lightbox-close")
    .addEventListener("click", closeLightbox);

  lightbox.querySelector(".lightbox-prev")
    .addEventListener("click", function () {
      showPhoto(currentIndex - 1);
    });

  lightbox.querySelector(".lightbox-next")
    .addEventListener("click", function () {
      showPhoto(currentIndex + 1);
    });

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", function (event) {
    if (!lightbox.classList.contains("active")) return;

    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowRight") showPhoto(currentIndex + 1);
    if (event.key === "ArrowLeft") showPhoto(currentIndex - 1);
  });

})();



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
    ["images/kl_photo/match2_newspirit/cw_zy_xd1.jpg", "Mixed Doubles 1", "CheeWeng & ZY"],
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
  };

  // Match line-ups and results
  var matchLineups = {
    1: {
      md: [
        ["Men's Doubles 1", "Huasheng & MC", "win"]
      ],
      wd: [
        ["Women's Doubles 1", "SY & Joey", "lose"]
      ],
      xd: [
        ["Mixed Doubles 1", "CheeWeng & ZY", "win"],
        ["Mixed Doubles 2", "YC & Yishen", "win"],
        ["Mixed Doubles 3", "Alvin & Jieyun", "lose"],
        ["Mixed Doubles 4", "Jason & Huixin", "win"],
        ["Mixed Doubles 5", "Jacklim & Chloe", "win"]
      ]
    },

    2: {
      md: [
        ["Men's Doubles 1", "Shiloong & Shiuan", "lose"],
        ["Men's Doubles 2", "Alvin & Jason", "lose"],
        ["Men's Doubles 3", "Dabin & Ivern", "lose"],
        ["Men's Doubles 4", "Qiang & Kenhooi", "lose"],
        ["Men's Doubles 5", "MC & HS", "lose"],
        ["Men's Doubles 6", "Wayne & Yoonghang", "win"]
      ],
      wd: [
        ["Women's Doubles 1", "Jieyun & Huixin", "win"]
      ],
      xd: [
        ["Mixed Doubles 1", "CheeWeng & ZY", "win"],
        ["Mixed Doubles 2", "Yishen & YC", "win"],
        ["Mixed Doubles 3", "Parry & SY", "win"]
      ]
    },

    3: {
      md: [
        ["Men's Doubles 1", "Yishen & Sean Tan", "lose"],
        ["Men's Doubles 2", "CW & Dabin", "lose"],
        ["Men's Doubles 3", "Qiang & Kenhooi", "win"],
        ["Men's Doubles 4", "Aikyuan & 一勇", "lose"],
        ["Men's Doubles 5", "Alvin & Jason", "lose"],
        ["Men's Doubles 6", "MC & HS", "lose"],
        ["Men's Doubles 7", "Wayne & Kelvin", "win"],
        ["Men's Doubles 8", "Brandon & Karming", "lose"]
      ],
      wd: [
        ["Women's Doubles 1", "ZY & YC", "lose"],
        ["Women's Doubles 2", "Jieyun & Huixin", "lose"]
      ],
      xd: [
        ["Mixed Doubles 1", "SY & Yishen", "win"],
        ["Mixed Doubles 2", "YC & CheeWeng", "win"]
      ]
    },

    4: {
      md: [
        ["Men's Doubles 1", "Gary & DT", "lose"],
        ["Men's Doubles 2", "Chee Weng & Hong Yee", "lose"],
        ["Men's Doubles 3", "Kenhooi & Qi Cheng", "win"],
        ["Men's Doubles 4", "Yishen & Dabin", "lose"],
        ["Men's Doubles 5", "Wayne & Kelvin", "lose"],
        ["Men's Doubles 6", "Alvin & Yong Yiu", "lose"],
        ["Men's Doubles 7", "Huasheng & Sean Tan", "lose"]
      ],
      wd: [
        ["Women's Doubles 1", "ZY & YC", "lose"],
        ["Women's Doubles 2", "Jieyun & Apple", "lose"],
        ["Women's Doubles 3", "Huixin & Tiffany", "lose"]
      ],
      xd: []
    },

    5: {
      md: [
        ["Men's Doubles 1", "CheeWeng & Dabin", "lose"],
        ["Men's Doubles 2", "Wayne & Kenhooi", "win"],
        ["Men's Doubles 3", "Yishen & Aikyuan", "win"],
        ["Men's Doubles 4", "Qiang & Alvin", "win"],
        ["Men's Doubles 5", "Ivern & Sean Tan", "win"],
        ["Men's Doubles 6", "MC & HS", "win"]
      ],
      wd: [
        ["Women's Doubles 1", "ZY & YC", "win"],
        ["Women's Doubles 2", "Jieyun & Huixin", "win"]
      ],
      xd: [
        ["Mixed Doubles 1", "YC & Yishen", "win"],
        ["Mixed Doubles 2", "ZY & CheeWeng", "win"],
        ["Mixed Doubles 3", "SY & Shiuan", "lose"]
      ],
      opponent: {
        md: [
          "Qk / SS",
          "Soon / Sam",
          "Yue Shen / Louis",
          "Lee / Darren",
          "JH / Darren Chua",
          "Lionel / Adward"
        ],
        xd: [
          "Ivan / Penny",
          "Alvin / Irene",
          "CX / SH"
        ],
        wd: [
          "Elly / Penny",
          "YT / SX"
        ]
      }
    }
  };    
  
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

  // Display compact match line-ups below photos
  var lineupContainer = document.getElementById("match-lineups");
  var currentLineup = matchLineups[matchId];

  if (lineupContainer && currentLineup) {
    var categories = [
      ["md", "🏸 Men's Doubles"],
      ["wd", "🌸 Women's Doubles"],
      ["xd", "💙 Mixed Doubles"]
    ];

    lineupContainer.innerHTML = categories.map(function (category) {
      var games = currentLineup[category[0]] || [];
      var opponentGames = currentLineup.opponent
        ? currentLineup.opponent[category[0]] || []
        : [];

      if (games.length === 0) return "";

      return (
        '<section class="lineup-category">' +
          '<h3>' + category[1] + '</h3>' +
          '<div class="lineup-list">' +
            games.map(function (game, index) {
              var opponentName = opponentGames[index];

              return (
                '<div class="lineup-row">' +
                  '<span>' +
                    game[0] + ' · ' + game[1] +
                    (opponentName
                      ? '<br><small>vs ' + opponentName + '</small>'
                      : '') +
                  '</span>' +
                  '<span class="lineup-result ' + game[2] + '">' +
                    game[2].toUpperCase() +
                  '</span>' +
                '</div>'
              );
            }).join("") +
          '</div>' +
        '</section>'
      );
    }).join("");
  }

  if (currentPhotos.length === 0) {
    photos.innerHTML = "";
  
    var photosHeading = document.getElementById("photos-heading");
    if (photosHeading) {
      photosHeading.style.display = "none";
    }
  
    var lineupSection = document.getElementById("match-lineups");
  
    if (lineupSection) {
      setTimeout(function () {
        lineupSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 100);
    }
  } else {
    var photosHeading = document.getElementById("photos-heading");
    if (photosHeading) {
      photosHeading.style.display = "";
    }
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



(function () {
  "use strict";

  // Photos for each match
  var matchPhotos = {
    2: [
      "images/kl_photo/match2_newspirit/alvin_calwin_md2.jpg",
      "images/kl_photo/match2_newspirit/cw_zy_xd1.jpg",
      "images/kl_photo/match2_newspirit/dabin_ivern_md4.jpg",
      "images/kl_photo/match2_newspirit/jieyun_huixin_wd2.jpg",
      "images/kl_photo/match2_newspirit/mc_huasheng_md5.jpg",
      "images/kl_photo/match2_newspirit/qiang_kenhooi_md3.jpg",
      "images/kl_photo/match2_newspirit/shiloong_shiuan_md1.jpg",
      "images/kl_photo/match2_newspirit/sy_parry_xd3.jpg",
      "images/kl_photo/match2_newspirit/wayne_yoonghang_md6.jpg",
      "images/kl_photo/match2_newspirit/yc_yishen_xd2.jpg"
    ],

    4: [
      "images/kl_photo/match4_adhoc/alvin_yongyiu_md6.jpg",
      "images/kl_photo/match4_adhoc/cheeweng_hongyee_md2.jpg",
      "images/kl_photo/match4_adhoc/gary_dt_md1.jpg",
      "images/kl_photo/match4_adhoc/huasheng_seantan_md7.jpg",
      "images/kl_photo/match4_adhoc/huixin_tiffany_wd3.jpg",
      "images/kl_photo/match4_adhoc/jieyun_apple_wd2.jpg",
      "images/kl_photo/match4_adhoc/kenhooi_qicheng_md3.jpg",
      "images/kl_photo/match4_adhoc/wayne_kelvin_md5.jpg",
      "images/kl_photo/match4_adhoc/yishen_dabin_md4.jpg",
      "images/kl_photo/match4_adhoc/zy_yc_wd1.jpg"
    ]
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

  score.textContent =
    "Us " + match.us + " – " + match.them + " Them";

  // Use the photos for this match
  var currentPhotos = matchPhotos[matchId] || match.photos || [];

  if (currentPhotos.length === 0) {
    photos.innerHTML =
      '<div class="match-empty">' +
        '<div>📸</div>' +
        '<h3>Photos coming soon!</h3>' +
        '<p>We are preparing our match memories. Stay tuned! 💙</p>' +
      '</div>';

    return;
  }

  photos.innerHTML = currentPhotos.map(function (photo) {
    return (
      '<figure class="pic">' +
        '<img src="' + photo +
        '" alt="Badminton match memory" loading="lazy">' +
      '</figure>'
    );
  }).join("");

})();

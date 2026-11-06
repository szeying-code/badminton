// Match photos and line-ups for the KL match pages (match.html?id=N).
// Photo row:  ["file path", "label", "players"]
// Game row:   ["label", "our players", "win" or "lose", "opponents (optional)"]
// Keep a comma after every row except the last one in each list.
var MATCH_PHOTOS = {
  2: [
    ["images/kl_photo/match2_newspirit/shiloong_shiuan_md1.jpg", "Men's Doubles 1", "Shiloong & Shiuan"],
    ["images/kl_photo/match2_newspirit/alvin_calwin_md2.jpg", "Men's Doubles 2", "Alvin & Calwin"],
    ["images/kl_photo/match2_newspirit/qiang_kenhooi_md3.jpg", "Men's Doubles 3", "Qiang & Kenhooi"],
    ["images/kl_photo/match2_newspirit/dabin_ivern_md4.jpg", "Men's Doubles 4", "Dabin & Ivern"],
    ["images/kl_photo/match2_newspirit/mc_huasheng_md5.jpg", "Men's Doubles 5", "MC & Huasheng"],
    ["images/kl_photo/match2_newspirit/wayne_yoonghang_md6.jpg", "Men's Doubles 6", "Wayne & Yoonghang"],
    ["images/kl_photo/match2_newspirit/jieyun_huixin_wd2.jpg", "Women's Doubles 2", "Jieyun & Huixin"],
    ["images/kl_photo/match2_newspirit/cw_zy_xd1.jpg", "Mixed Doubles 1", "CheeWeng & ZY"],
    ["images/kl_photo/match2_newspirit/yc_yishen_xd2.jpg", "Mixed Doubles 2", "YC & Yishen"],
    ["images/kl_photo/match2_newspirit/sy_parry_xd3.jpg", "Mixed Doubles 3", "SY & Parry"]
  ],
  4: [
    ["images/kl_photo/match4_adhoc/gary_dt_md1.jpg", "Men's Doubles 1", "Gary & DT"],
    ["images/kl_photo/match4_adhoc/cheeweng_hongyee_md2.jpg", "Men's Doubles 2", "Chee Weng & Hong Yee"],
    ["images/kl_photo/match4_adhoc/kenhooi_qicheng_md3.jpg", "Men's Doubles 3", "Kenhooi & Qi Cheng"],
    ["images/kl_photo/match4_adhoc/yishen_dabin_md4.jpg", "Men's Doubles 4", "Yishen & Dabin"],
    ["images/kl_photo/match4_adhoc/wayne_kelvin_md5.jpg", "Men's Doubles 5", "Wayne & Kelvin"],
    ["images/kl_photo/match4_adhoc/alvin_yongyiu_md6.jpg", "Men's Doubles 6", "Alvin & Yong Yiu"],
    ["images/kl_photo/match4_adhoc/huasheng_seantan_md7.jpg", "Men's Doubles 7", "Huasheng & Sean Tan"],
    ["images/kl_photo/match4_adhoc/zy_yc_wd1.jpg", "Women's Doubles 1", "ZY & YC"],
    ["images/kl_photo/match4_adhoc/jieyun_apple_wd2.jpg", "Women's Doubles 2", "Jieyun & Apple"],
    ["images/kl_photo/match4_adhoc/huixin_tiffany_wd3.jpg", "Women's Doubles 3", "Huixin & Tiffany"]
  ]
};

var MATCH_LINEUPS = {
  1: {
    md: [["Men's Doubles 1", "Hua Sheng & Min Chen", "win", "Soon Hao & Kai Liang"],
         ["Men's Doubles 2", "Alex & Chee Weng", "win", "JX & Yan Ler"]],
    wd: [["Women's Doubles 1", "Sze Ying & Joey", "lose", "CY & Audrey"]],
    xd: [["Mixed Doubles 1", "Zhi Ying & Chee Weng", "win", "Darren & Alice"],
         ["Mixed Doubles 2", "Yin Chien & Yi Shen", "win", "Hansen & QH"],
         ["Mixed Doubles 3", "Jie Yun & Alvin", "lose", "Jay Lun & Maruko"],
         ["Mixed Doubles 4", "Chloe & Jack", "win", "Andrew & QH"],
         ["Mixed Doubles 5", "Hui Xin & Jason", "win", "JK & Alice"]]
  },
  2: {
    md: [["Men's Doubles 1", "Shiloong & Shiuan", "lose"],
         ["Men's Doubles 2", "Alvin & Jason", "lose"],
         ["Men's Doubles 3", "Dabin & Ivern", "lose"],
         ["Men's Doubles 4", "Qiang & Kenhooi", "lose"],
         ["Men's Doubles 5", "MC & HS", "lose"],
         ["Men's Doubles 6", "Wayne & Yoonghang", "win"]],
    wd: [["Women's Doubles 1", "Jieyun & Huixin", "win"]],
    xd: [["Mixed Doubles 1", "CheeWeng & ZY", "win"],
         ["Mixed Doubles 2", "Yishen & YC", "win"],
         ["Mixed Doubles 3", "Parry & SY", "win"]]
  },
  3: {
    md: [["Men's Doubles 1", "Yishen & Sean Tan", "lose", "Xiang & Kuen"],
         ["Men's Doubles 2", "CW & Dabin", "lose", "Pey Harng & CC"],
         ["Men's Doubles 3", "Qiang & Kenhooi", "win", "RZ & Davven"],
         ["Men's Doubles 4", "Aikyuan & 一勇", "lose", "CK & Geap"],
         ["Men's Doubles 5", "Alvin & Jason", "lose", "CJ & Simon"],
         ["Men's Doubles 6", "MC & HS", "lose", "Jayden & Jeng Tung"],
         ["Men's Doubles 7", "Wayne & Kelvin", "win", "Ivan & Wybert"],
         ["Men's Doubles 8", "Brandon & Karming", "lose"]],
    wd: [["Women's Doubles 1", "ZY & YC", "lose", "Sany & Samantha"],
         ["Women's Doubles 2", "Jieyun & Huixin", "lose", "Sharon & Edna"]],
    xd: [["Mixed Doubles 1", "SY & Yishen", "win", "Kuen & Sany"],
         ["Mixed Doubles 2", "YC & CheeWeng", "win", "Thye & Janice"]]
  },
  4: {
    md: [["Men's Doubles 1", "Gary & DT", "lose", "Edmund Teh / Tan Fu Tzen"],
         ["Men's Doubles 2", "Chee Weng & Hong Yee", "lose", "Tan Kian An / Lok Hong Wei"],
         ["Men's Doubles 3", "Kenhooi & Qi Cheng", "win", "Horlick / Lee Wei Luen"],
         ["Men's Doubles 4", "Yishen & Dabin", "lose", "Tee Siang Lun / Simon"],
         ["Men's Doubles 5", "Wayne & Kelvin", "lose", "Ivan Wong / Ng Jie Wenn"],
         ["Men's Doubles 6", "Alvin & Yong Yiu", "lose", "Ng Eng Kian / Yam Sik Hao"],
         ["Men's Doubles 7", "Huasheng & Sean Tan", "lose", "Ron Hong / YongV"]],
    wd: [["Women's Doubles 1", "ZY & YC", "lose", "Anna / Sam"],
         ["Women's Doubles 2", "Jieyun & Apple", "lose", "Angeline / Janice"],
         ["Women's Doubles 3", "Huixin & Tiffany", "lose", "Sharon / Vincy"]],
    xd: []
  },
  5: {
    md: [["Men's Doubles 1", "CheeWeng & Dabin", "lose", "Qk / SS"],
         ["Men's Doubles 2", "Wayne & Kenhooi", "win", "Soon / Sam"],
         ["Men's Doubles 3", "Yishen & Aikyuan", "win", "Yue Shen / Louis"],
         ["Men's Doubles 4", "Qiang & Alvin", "win", "Lee / Darren"],
         ["Men's Doubles 5", "Ivern & Sean Tan", "win", "JH / Darren Chua"],
         ["Men's Doubles 6", "MC & HS", "win", "Lionel / Adward"]],
    wd: [["Women's Doubles 1", "ZY & YC", "win", "Elly / Penny"],
         ["Women's Doubles 2", "Jieyun & Huixin", "win", "YT / SX"]],
    xd: [["Mixed Doubles 1", "YC & Yishen", "win", "Ivan / Penny"],
         ["Mixed Doubles 2", "ZY & CheeWeng", "win", "Alvin / Irene"],
         ["Mixed Doubles 3", "SY & Shiuan", "lose", "CX / SH"]]
  }
};

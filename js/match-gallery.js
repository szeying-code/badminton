
(function () {
  "use strict";

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

  if (!match.photos || match.photos.length === 0) {
    photos.innerHTML =
      '<div class="match-empty">' +
        '<div>📸</div>' +
        '<h3>Photos coming soon!</h3>' +
        '<p>We are preparing our match memories. Stay tuned! 💙</p>' +
      '</div>';

    return;
  }

  photos.innerHTML = match.photos.map(function (photo) {
    return (
      '<figure class="pic">' +
        '<img src="images/' + photo +
        '" alt="Badminton match memory" loading="lazy">' +
      '</figure>'
    );
  }).join("");

})();

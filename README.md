# Avacado BC 🏸

Our badminton page: team record, match log, photos and vlog videos.

## What's in the folder

| File / folder | What it is | Edit it? |
|---|---|---|
| `data/matches.js` | Our games and scores (team record updates by itself) | Yes, most often |
| `data/moments.js` | Photo list and captions | Yes |
| `data/vlogs.js` | Vlog videos (file or YouTube) | Yes |
| `data/club.js` | Club name, tagline, footer text | Sometimes |
| `images/` | Put photos here | Yes |
| `videos/` | Put short video clips here | Yes |
| `css/style.css` | Colours and look | Only to change colours |
| `js/script.js` + `index.html` | Builds the page | No need |

## Put it online (GitHub Pages)
1. On GitHub, click **New repository**. Name it `avacado-bc` and set it to **Public**.
2. Click **uploading an existing file**, then drag in everything from this folder (keep the folders) and click **Commit changes**.
3. Go to **Settings > Pages**. Under "Build and deployment" choose **Deploy from a branch**, pick `main` and `/ (root)`, then **Save**.
4. After a minute your link is `https://YOUR-USERNAME.github.io/avacado-bc/`. Put it in your Instagram bio.

## Update it later
- **New game:** open `data/matches.js` on GitHub, click the pencil icon, copy a line, change the date and scores, then **Commit changes**.
- **New photo:** open `images/`, click **Add file > Upload files**, then add a line in `data/moments.js`.
- **New video:** upload it to `videos/` (or copy a YouTube ID), then add a line in `data/vlogs.js`.
- Changes show on the page after about a minute. Refresh to see them.

## Tips
- Each line in a list needs a comma at the end, except the last one.
- If the page goes blank after an edit, check for a missing comma, quote or bracket in the file you changed.

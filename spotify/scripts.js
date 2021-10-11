const fn = () => {
  let playing = false;

  const requestUpdate = (apiKey, user = "DiMaNacho") => {
    const url = `https://ws.audioscrobbler.com/2.0/?api_key=${apiKey}&method=user.getRecentTracks&user=${user}&extended=1&limit=1&format=json`;
    const options = {
      method: "GET",
    };

    const request = new Request(url, options);

    return fetch(request);
  };

  const slideOut = () => {
    const $container = document.querySelector(".spotify");
    $container.classList.add("slideOut");
    $container.classList.remove("slideIn");
  };

  const slideIn = () => {
    const $container = document.querySelector(".spotify");
    $container.classList.add("slideIn");
    $container.classList.remove("slideOut");
  };

  const flip = (cb) => {
    const $cover = document.querySelector(".spotify .cover");
    const $label = document.querySelector(".spotify .label");
    $cover.classList.add("flip");
    $label.classList.add("slap");

    setTimeout(cb, 800);
    setTimeout(() => {
      $cover.classList.remove("flip");
      $label.classList.remove("slap");
    }, 1000);
  };

  const setImage = (track) => {
    const noImage = "https://i.imgur.com/W9YjDD9.png";
    const defaultLastFmImage =
      "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png";
    let newImage;

    for (let imgdata of track.image) newImage = imgdata["#text"];

    if (newImage === "")
      for (let imgdata of track.artist.image) newImage = imgdata["#text"];

    // if (newImage === "" || newImage === defaultLastFmImage) {
    //   const myImage = new Image();
    //   myImage.src = noImage;
    //   newImage = myImage.src;
    // }

    return newImage;
  };

  const loadImage = async (url, elem) =>
    new Promise((resolve, reject) => {
      elem.onload = () => resolve(elem);
      elem.onerror = reject;
      elem.src = url;
    });

  const successHandler = async (response) => {
    const data = await response.json();
    const track = data.recenttracks.track[0];
    const img = setImage(track);

    const $blurry = document.querySelector(".spotify .blurry");
    const $cover = document.querySelector(".spotify .cover");
    const $artista = document.querySelector(".spotify .artista");
    const $titulo = document.querySelector(".spotify .titulo");

    if (!track["@attr"]) {
      if (playing) {
        // Stop Playing
        console.log("Stopped playing track.");
        playing = false;
        slideOut();
      }
    } else if (playing === false) {
      // Start Playing
      console.log("Started playing track.");
      playing = true;
      $cover.src = img;
      $blurry.style.backgroundImage = `url(${img})`;
      $artista.innerText = track.artist.name;
      $titulo.innerText = track.name;
      slideIn();
    } else {
      // Track Change
      let oldArtista = $artista.innerText;
      let oldTitulo = $titulo.innerText;
      if (oldArtista != track.artist.name || oldTitulo != track.name) {
        console.log("Changed track.");

        const cb = async () => {
          await loadImage(img, $cover);
          $blurry.style.backgroundImage = `url(${img})`;
          $artista.innerText = track.artist.name;
          $titulo.innerText = track.name;
        };

        flip(cb);
      }
    }
    setTimeout(tick, 3000);
  };

  const failureHandler = (reason) => {
    console.log("Last.FM Query failed:", reason);
    slideOut();
    setTimeout(tick, 60000);
  };

  const tick = async () => {
    try {
      const apiKey = "883710f63e4383bc2fd1e058e89ea0ba";
      const params = new URLSearchParams(window.location.search);
      const user =
        params.get("usuario") !== null ? params.get("usuario") : "DiMaNacho";
      const request = await requestUpdate(apiKey, user);
      successHandler(request);
    } catch (error) {
      failureHandler(error);
    }
  };

  tick();
};

fn();

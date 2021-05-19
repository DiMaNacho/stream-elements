const fn = () => {
  const start = async () => {
    const $iframe = document.querySelector(".video");

    $iframe.src = stream.yo.camara;
  };

  start();
};

fn();

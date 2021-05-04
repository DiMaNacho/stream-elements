const fn = () => {
  const start = async () => {
    const $iframe = document.querySelector(".video");

    $iframe.src = stream.invitado.camara;
  };

  start();
};

fn();

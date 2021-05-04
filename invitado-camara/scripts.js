const fn = () => {
  const start = async () => {
    const $iframe = document.querySelector(".iframe");

    $iframe.src = stream.invitado.camara;
  };

  start();
};

fn();

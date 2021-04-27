const fn = () => {
  const icono = (nombre) =>
    ({
      ig: "instagram-square",
    }[nombre]);
  const iconTemplate = `<i class="fab fa-{icono} icono"></i>`;

  const $titulo = document.querySelector(".titulo");

  const iconoFinal = iconTemplate.replace("{icono}", icono(stream.icon));
  $titulo.innerHTML = `${iconoFinal} ${stream.yo}`;

  console.log("stream", stream);
};

fn();

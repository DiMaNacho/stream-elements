const fn = () => {
  const icono = (nombre) =>
    ({
      ig: "instagram-square",
    }[nombre]);
  const iconTemplate = `<i class="fab fa-{icono} icono"></i>`;

  const $titulo = document.querySelector(".titulo");

  const iconoFinal = iconTemplate.replace("{icono}", icono(stream.columna.red));
  $titulo.innerHTML = `${iconoFinal} ${stream.columna.nombre}`;
};

fn();

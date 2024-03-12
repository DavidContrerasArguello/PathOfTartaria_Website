function verificarEdad() {
    var edad = parseInt(prompt("Por favor, ingresa tu edad:"));

    if (isNaN(edad)) {
      alert("Por favor, ingresa una edad válida.");
      return;
    }

    if (edad >= 18) {
      alert("¡Bienvenido a nuestra web!");
    } else if (edad >= 13 && edad <= 17) {
      window.location.href = "https://www.lego.com/es-es";
    } else if (edad >= 7 && edad <= 12) {
      window.location.href = "https://www.wizardingworld.com/collections/harry-potter";
    } else if (edad >= 4 && edad <= 6) {
      window.location.href = "https://www.pocoyo.com/es";
    } else {
      window.location.href = "https://www.dodot.es";
    }
  }

  verificarEdad();
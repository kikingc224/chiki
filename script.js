// ELEMENTOS PRINCIPALES
const overlayInicio = document.getElementById("overlayInicio");
const musica = document.getElementById("musica");
const nuevaCancion = document.getElementById("nuevaCancion");
const zonaPicnic = document.getElementById("zonaPicnic");
const plano1 = document.getElementById("plano1");
const plano3 = document.getElementById("plano3");
const cartaOverlay = document.getElementById("cartaOverlay");
const cerrarCartaBtn = document.querySelector(".cerrar-carta");

// ESTADO INICIAL
plano1.style.display = "none";
plano3.style.display = "none";
cartaOverlay.style.display = "none";

// ========== ESCENA 1: INICIO ==========
overlayInicio.addEventListener("click", function() {
  console.log("🎬 Iniciando...");
  
  // Reproducir música principal
  musica.play().catch(e => {
    console.log("Audio bloqueado, haz clic de nuevo");
  });
  
  // Desvanecer pantalla inicial
  overlayInicio.style.opacity = "0";
  overlayInicio.style.transition = "opacity 0.8s ease";
  
  setTimeout(() => {
    overlayInicio.style.display = "none";
    
    // Mostrar escena 1 (playa lejos)
    plano1.style.display = "block";
    setTimeout(() => {
      plano1.style.opacity = "1";
    }, 50);
    
  }, 800);
});

// ========== ESCENA 1 → ESCENA 3 ==========
zonaPicnic.addEventListener("click", function() {
  console.log("🌅 Cambiando a escena 3...");
  
  // Ocultar escena 1
  plano1.style.opacity = "0";
  
  setTimeout(() => {
    plano1.style.display = "none";
    
    // Mostrar escena 3 (playa cerca)
    plano3.style.display = "block";
    setTimeout(() => {
      plano3.style.opacity = "1";
      
      // CONFIGURAR CLICK EN TORTA (después de mostrar escena 3)
      setTimeout(configurarClickTorta, 100);
      
    }, 50);
    
  }, 800);
});

// ========== FUNCIÓN PARA CONFIGURAR CLICK EN TORTA ==========
function configurarClickTorta() {
  console.log("🎂 Configurando click en torta...");
  
  const pastelEscena3 = document.querySelector("#zonaArena .pastel");
  
  if (pastelEscena3) {
    console.log("✅ Torta encontrada!");
    
    // Hacer la torta clickeable
    pastelEscena3.style.cursor = "pointer";
    
    // AGREGAR EVENTO DE CLICK A LA TORTA
    pastelEscena3.addEventListener("click", function(event) {
      event.stopPropagation();
      console.log("🎂🎂🎂 ¡CLICK EN TORTA DETECTADO! 🎂🎂🎂");
      
      // 1. PARAR música actual
      musica.pause();
      musica.currentTime = 0;
      
      // 2. REPRODUCIR nueva canción
      if (nuevaCancion) {
        nuevaCancion.currentTime = 0;
        nuevaCancion.play().catch(e => {
          console.log("Error reproduciendo nueva canción:", e);
        });
      }
      
      // 3. Mostrar CARTA
      if (cartaOverlay) {
        cartaOverlay.style.display = "flex";
        setTimeout(() => {
          cartaOverlay.classList.add("mostrar");
        }, 50);
      }
      
      // 4. Efecto visual en la torta
      this.style.transform = "scale(1.3) rotate(-10deg)";
      this.style.transition = "transform 0.3s";
      
      setTimeout(() => {
        this.style.transform = "translateX(-10%) rotate(-3deg) scale(1)";
      }, 300);
    });
    
  } else {
    console.log("❌ Torta no encontrada, reintentando...");
    setTimeout(configurarClickTorta, 500);
  }
}

// ========== CERRAR CARTA ==========
if (cerrarCartaBtn) {
  cerrarCartaBtn.addEventListener("click", function() {
    cartaOverlay.classList.remove("mostrar");
    
    setTimeout(() => {
      cartaOverlay.style.display = "none";
    }, 800);
  });
}

// Cerrar carta al hacer clic fuera
cartaOverlay.addEventListener("click", function(event) {
  if (event.target === cartaOverlay) {
    cartaOverlay.classList.remove("mostrar");
    
    setTimeout(() => {
      cartaOverlay.style.display = "none";
    }, 800);
  }
});

// ========== GUARDAR TEXTO DE LA CARTA ==========
const cartaCuerpo = document.querySelector('.carta-cuerpo');
if (cartaCuerpo) {
  cartaCuerpo.addEventListener('blur', function() {
    localStorage.setItem('textoCarta', this.innerHTML);
  });
  
  // Cargar texto guardado
  window.addEventListener('load', function() {
    const textoGuardado = localStorage.getItem('textoCarta');
    if (textoGuardado) {
      cartaCuerpo.innerHTML = textoGuardado;
    }
  });
}

console.log("✅ Script cargado correctamente");


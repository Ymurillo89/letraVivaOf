<script>
  let showWelcome = false;
  let showForm = false;
  let currentStep = 0;

  // Datos del formulario
  let formData = {
    nombre: "",
    paraQuien: "",
    ocasion: "",
    historia: "",
    whatsapp: "",
    genero: "",
    paquete: "",
  };

  // Errores de validación
  let errors = {
    nombre: false,
    paraQuien: false,
    ocasion: false,
    historia: false,
    whatsapp: false,
    genero: false,
    paquete: false,
  };

  const steps = [
    {
      title: "Información Básica",
      subtitle: "Cuéntanos un poco sobre ti y tu regalo especial",
    },
    {
      title: "Cuéntanos Tu Historia",
      subtitle: "Comparte los detalles especiales que quieres en tu canción",
    },
    {
      title: "Información de Contacto",
      subtitle: "Para enviarte tu canción personalizada",
    },
    {
      title: "Elige Tu Estilo Musical",
      subtitle: "Selecciona el género que más te guste",
    },
    {
      title: "Selecciona Tu Paquete",
      subtitle: "Elige el paquete perfecto para ti",
    },
    {
      title: "Resumen de Tu Pedido",
      subtitle: "Revisa tu información antes de finalizar",
    },
  ];

  const generos = [
    { id: "romantica", label: "Romántica" },
    { id: "pop", label: "Pop" },
    { id: "reggaeton", label: "Reggaeton" },
    { id: "balada", label: "Balada" },
    { id: "rock", label: "Rock" },
    { id: "vallenato", label: "Vallenato" },
  ];

  const paquetes = [
    {
      id: "estandar",
      nombre: "Paquete Estándar - El Más Elegido",
      duracion: "(2:30 - 3:00 min)",
      descripcion: "Canción Completa MP3 Formato Estudio + Tarjeta Digital",
      precio: "$79.900",
      highlighted: true,
    },
    {
      id: "mas",
      nombre: "Paquete Más - El Detalle Inolvidable",
      duracion: "(1:30 a 2:30 min)",
      descripcion: "Canción Personalizada en MP3",
      precio: "$79.900",
      highlighted: false,
    },
    {
      id: "premium",
      nombre: "Paquete Premium - La Experiencia Completa",
      duracion: "(3:00 - 3:30 min)",
      descripcion:
        "Canción Extendida + MP3 Formato Estudio + Tarjeta Digital + Video Lyric Con Fotos y Letra Animadas",
      precio: "$179.900",
      highlighted: false,
    },
  ];

  function openWelcome() {
    showWelcome = true;
    // Ocultar el navbar cuando se abre el modal
    if (typeof document !== "undefined") {
      const nav = document.querySelector("nav");
      if (nav) nav.style.display = "none";
    }
  }

  function closeWelcome() {
    showWelcome = false;
    // Mostrar el navbar cuando se cierra el modal
    if (typeof document !== "undefined") {
      const nav = document.querySelector("nav");
      if (nav) nav.style.display = "block";
    }
  }

  function startForm() {
    showWelcome = false;
    showForm = true;
    currentStep = 0;
  }

  function closeForm() {
    showForm = false;
    // Mostrar el navbar cuando se cierra el formulario
    if (typeof document !== "undefined") {
      const nav = document.querySelector("nav");
      if (nav) nav.style.display = "block";
    }
  }

  function nextStep() {
    if (validateCurrentStep()) {
      if (currentStep < steps.length - 1) {
        currentStep++;
      }
    }
  }

  function prevStep() {
    if (currentStep > 0) {
      currentStep--;
    }
  }

  function validateCurrentStep() {
    let isValid = true;

    switch (currentStep) {
      case 0:
        errors.nombre = !formData.nombre.trim();
        errors.paraQuien = !formData.paraQuien;
        errors.ocasion = !formData.ocasion;
        isValid = !errors.nombre && !errors.paraQuien && !errors.ocasion;
        break;
      case 1:
        errors.historia = formData.historia.trim().length < 20;
        isValid = !errors.historia;
        break;
      case 2:
        errors.whatsapp = formData.whatsapp.trim().length < 10;
        isValid = !errors.whatsapp;
        break;
      case 3:
        errors.genero = !formData.genero;
        isValid = !errors.genero;
        break;
      case 4:
        errors.paquete = !formData.paquete;
        isValid = !errors.paquete;
        break;
      case 5:
        isValid = true;
        break;
    }

    return isValid;
  }

  function selectGenero(generoId) {
    formData.genero = generoId;
    errors.genero = false;
  }

  function selectPaquete(paqueteId) {
    formData.paquete = paqueteId;
    errors.paquete = false;
  }

  function handleSubmit() {
    console.log("Pedido enviado:", formData);
    alert(
      "¡Pedido enviado exitosamente! Te contactaremos pronto por WhatsApp."
    );
    closeForm();
  }

  $: progressWidth = ((currentStep + 1) / steps.length) * 100;
</script>

<!-- Botón principal para abrir -->
<button
  on:click={openWelcome}
  class="group cursor-pointer relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#f89a3f] via-[#ff6b35] to-[#f89a3f] hover:from-[#ff6b35] hover:via-[#f89a3f] hover:to-[#ff6b35] text-white px-6 py-4 rounded-full text-lg font-bold transition-all duration-500 hover:scale-[1.02] w-full max-w-lg mx-auto md:w-auto md:max-w-none overflow-hidden border-2 border-[#ff6b35]/30"
>
  <span class="relative z-10 flex items-center gap-3">
    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path
        d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"
      ></path>
    </svg>
    <span>¡Toca aquí para crear tu canción personalizada!</span>
    <svg
      class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="3"
        d="M13 7l5 5m0 0l-5 5m5-5H6"
      ></path>
    </svg>
  </span>
  <div
    class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
  ></div>
</button>

<!-- Modal de Bienvenida -->
{#if showWelcome}
  <div class="modal-overlay" on:click={closeWelcome}>
    <div class="modal-welcome" on:click|stopPropagation>
      <button class="close-btn" on:click={closeWelcome} aria-label="Cerrar">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div class="welcome-content">
        <div class="text-5xl md:text-6xl mb-4 animate-bounce">🎵</div>

        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Bienvenido a...
        </h1>
        <h2 class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#11676a] to-[#2d8c89] ">
          ¡Letra Viva!
        </h2>
        <p class="text-lg text-gray-600 ">
          Donde tus emociones se convierten en música
        </p>

        <div class="how-it-works">
          <h3 class="text-xl font-bold text-gray-900 mb-3">¿Cómo funciona?</h3>
          <p class="text-gray-700 mb-6 font-semibold">Solo 4 pasos simples:</p>

          <div class="steps-list">
            <div class="step-item">
              <div class="step-number">1</div>
              <p>Cuéntanos tu historia de amor especial</p>
            </div>

            <div class="step-item">
              <div class="step-number">2</div>
              <p>Danos tu WhatsApp para la entrega</p>
            </div>

            <div class="step-item">
              <div class="step-number">3</div>
              <p>Elige el género y estilo musical</p>
            </div>

            <div class="step-item">
              <div class="step-number">4</div>
              <p>Selecciona tu paquete y método de pago</p>
            </div>
          </div>
        </div>

        <!-- <div class="testimonial">
          <p class="text-sm text-gray-600 italic mb-3">
            Miles de parejas ya han creado su canción perfecta con nosotros.
          </p>
          <p class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#11676a] to-[#f89a3f]">
            Tu historia merece una melodía única.
          </p>
        </div> -->

        <button class="btn-start" on:click={startForm}> Comenzar Ahora </button>
      </div>
    </div>
  </div>
{/if}

<!-- Modal del Formulario -->
{#if showForm}
  <div class="modal-overlay" on:click={closeForm}>
    <div class="modal-form" on:click|stopPropagation>
      <button class="close-btn" on:click={closeForm} aria-label="Cerrar">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <!-- Progress Bar -->
      <div class="progress-container">
        <div class="step-circle">{currentStep + 1}</div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: {progressWidth}%"></div>
        </div>
      </div>

      <!-- Contenido del paso actual -->
      <div class="form-content">
        <h2 class="form-title">{steps[currentStep].title}</h2>
        <p class="form-subtitle">{steps[currentStep].subtitle}</p>

        <!-- Paso 0: Información Básica -->
        {#if currentStep === 0}
          <div class="form-fields">
            <div class="form-group">
              <label>Tu nombre <span class="required">*</span></label>
              <input
                type="text"
                bind:value={formData.nombre}
                placeholder="Escribe tu nombre"
                class:error={errors.nombre}
              />
              {#if errors.nombre}
                <span class="error-msg">Este campo es requerido</span>
              {/if}
            </div>

            <div class="form-group">
              <label
                >¿Para quién es esta canción? <span class="required">*</span
                ></label
              >
              <select
                bind:value={formData.paraQuien}
                class:error={errors.paraQuien}
              >
                <option value="">Selecciona una opción</option>
                <option value="esposo">Mi Esposa/o</option>
                <option value="novio">Novio/a</option>
                <option value="amiga">Mejor amiga</option>
                <option value="mama">Mamá</option>
                <option value="papa">Papá</option>
                <option value="abuelo">Abuelo/a</option>
                <option value="hermano">Hermano/a</option>
                <option value="hijo">Hijo/a</option>
                <option value="importante">Alguien importante en mi vida</option
                >
                <option value="otro">Otro</option>
              </select>
              {#if errors.paraQuien}
                <span class="error-msg">Este campo es requerido</span>
              {/if}
            </div>

            <div class="form-group">
              <label>¿Cuál es la ocasión? <span class="required">*</span></label
              >
              <select
                bind:value={formData.ocasion}
                class:error={errors.ocasion}
              >
                <option value="">Selecciona una opción</option>
                <option value="detalle">Detalle especial</option>
                <option value="aniversario">Aniversario</option>
                <option value="cumpleanos">Cumpleaños</option>
                <option value="boda">Boda</option>
                <option value="propuesta">Propuesta de matrimonio</option>
                <option value="grado">Grado</option>
                <option value="dia-madre-padre">Día Madre/Padre</option>
                <option value="amor-amistad">Amor y amistad</option>
                <option value="nacimiento">Nacimiento</option>
                <option value="memorial">Memorial</option>
                <option value="otro">Otro</option>
              </select>
              {#if errors.ocasion}
                <span class="error-msg">Este campo es requerido</span>
              {/if}
            </div>
          </div>
        {/if}

        <!-- Paso 1: Cuéntanos Tu Historia -->
        {#if currentStep === 1}
          <div class="form-fields">
            <div class="form-group">
              <label>Tu Historia de Amor:</label>
              <textarea
                bind:value={formData.historia}
                placeholder="Cuéntanos sobre esa persona especial, momentos inolvidables, lo que sientes..."
                rows="8"
                class:error={errors.historia}
              ></textarea>
              {#if errors.historia}
                <span class="error-msg">Escribe al menos 20 caracteres</span>
              {:else}
                <span class="help-text">Mínimo 20 caracteres</span>
              {/if}
            </div>
          </div>
        {/if}

        <!-- Paso 2: Información de Contacto -->
        {#if currentStep === 2}
          <div class="form-fields">
            <div class="form-group">
              <label>Número de WhatsApp:</label>
              <div class="whatsapp-input" class:error={errors.whatsapp}>
                <svg
                  class="w-6 h-6 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                  />
                </svg>
                <input
                  type="tel"
                  bind:value={formData.whatsapp}
                  placeholder="+57 300 123 4567"
                />
              </div>
              {#if errors.whatsapp}
                <span class="error-msg"
                  >Por favor ingresa un número válido (mínimo 10 dígitos)</span
                >
              {:else}
                <span class="help-text"
                  >Te contactaremos por WhatsApp para coordinar la entrega</span
                >
              {/if}
            </div>
          </div>
        {/if}

        <!-- Paso 3: Elige Tu Estilo Musical -->
        {#if currentStep === 3}
          <div class="generos-grid">
            {#each generos as genero}
              <button
                class="genero-btn"
                class:selected={formData.genero === genero.id}
                on:click={() => selectGenero(genero.id)}
              >
                {genero.label}
              </button>
            {/each}
          </div>
          {#if errors.genero}
            <span class="error-msg">Por favor selecciona un género</span>
          {/if}
        {/if}

        <!-- Paso 4: Selecciona Tu Paquete -->
        {#if currentStep === 4}
          <div class="paquetes-list">
            {#each paquetes as paquete}
              <button
                class="paquete-card"
                class:selected={formData.paquete === paquete.id}
                class:highlighted={paquete.highlighted}
                on:click={() => selectPaquete(paquete.id)}
              >
                <div class="paquete-info">
                  <h3>{paquete.nombre}</h3>
                  <p class="duracion">{paquete.duracion}</p>
                  <p class="descripcion">{paquete.descripcion}</p>
                </div>
                <div class="paquete-precio">
                  <span class="precio">{paquete.precio}</span>
                  <span class="moneda">COP</span>
                </div>
              </button>
            {/each}
          </div>
          {#if errors.paquete}
            <span class="error-msg">Por favor selecciona un paquete</span>
          {/if}
        {/if}

        <!-- Paso 5: Resumen -->
        {#if currentStep === 5}
          <div class="resumen">
            <div class="resumen-section">
              <h3>Detalles del Pedido</h3>
              <div class="detalle-row">
                <span>Nombre:</span>
                <strong>{formData.nombre}</strong>
              </div>
              <div class="detalle-row">
                <span>Para:</span>
                <strong>{formData.paraQuien}</strong>
              </div>
              <div class="detalle-row">
                <span>Ocasión:</span>
                <strong>{formData.ocasion}</strong>
              </div>
              <div class="detalle-row">
                <span>Género:</span>
                <strong
                  >{generos.find((g) => g.id === formData.genero)?.label ||
                    ""}</strong
                >
              </div>
              <div class="detalle-row">
                <span>WhatsApp:</span>
                <strong>{formData.whatsapp}</strong>
              </div>
            </div>

            <div class="resumen-section paquete-seleccionado">
              <h3>Paquete Seleccionado:</h3>
              {#if formData.paquete}
                {@const paq = paquetes.find((p) => p.id === formData.paquete)}
                <div class="paquete-detalle">
                  <div>
                    <h4>{paq.nombre}</h4>
                    <p>{paq.descripcion}</p>
                  </div>
                  <div class="precio-final">
                    <span class="precio">{paq.precio}</span>
                    <span class="moneda">COP</span>
                  </div>
                </div>
              {/if}
            </div>

            <div class="metodos-pago">
              <div class="pago-header">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"
                  />
                </svg>
                <h3>Métodos de Pago Disponibles</h3>
              </div>
              <div class="pago-opcion">
                <div class="pago-icon">💵</div>
                <div class="pago-text">
                  <strong>Pago Contra Entrega</strong>
                  <p>Escucha primero, paga después si te encanta</p>
                </div>
                <div class="check">✓</div>
              </div>
            </div>
          </div>
        {/if}
      </div>

      <!-- Botones de navegación -->
      <div class="form-footer">
        {#if currentStep > 0}
          <button class="btn-secondary" on:click={prevStep}>Atrás</button>
        {:else}
          <div></div>
        {/if}

        {#if currentStep < steps.length - 1}
          <button class="btn-primary" on:click={nextStep}>Siguiente</button>
        {:else}
          <button class="btn-primary" on:click={handleSubmit}
            >Finalizar Pedido</button
          >
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  /* Variables */
  :global(body) {
    --color-primary: #11676a;
    --color-primary-dark: #2d8c89;
    --color-accent: #f89a3f;
    --color-error: #e74c3c;
  }

  /* Modal Overlay */

  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999999 !important;
    padding: 20px;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Botón cerrar */
  .close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    z-index: 10;
  }

  .close-btn:hover {
    background: white;
    transform: rotate(90deg);
  }

  /* Modal de Bienvenida */
  .modal-welcome {
    background: white;
    border-radius: 24px;
    width: 100%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    animation: slideUp 0.4s ease;
  }

  @keyframes slideUp {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .welcome-content {
    padding: 60px 32px 32px;
    text-align: center;
  }

  .how-it-works {
    background: linear-gradient(135deg, #e8f5f5 0%, #ffffff 100%);
    border-radius: 16px;
    padding: 24px;
    margin: 8px 0;
    text-align: left;
  }

  .steps-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .step-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  .step-number {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    background: linear-gradient(
      135deg,
      var(--color-primary),
      var(--color-primary-dark)
    );
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 16px;
  }

  .step-item p {
    flex: 1;
    padding-top: 6px;
    font-size: 14px;
    color: #374151;
    font-weight: 500;
  }

  .btn-start {
    width: 100%;
    background: linear-gradient(
      135deg,
      var(--color-primary),
      var(--color-primary-dark)
    );
    color: white;
    border: none;
    padding: 16px 32px;
    border-radius: 12px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
  }

  .btn-start:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 24px rgba(17, 103, 106, 0.3);
  }

  /* Modal del Formulario */
  .modal-form {
    background: white;
    border-radius: 24px;
    width: 100%;
    max-width: 700px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    animation: slideUp 0.4s ease;
  }

  .progress-container {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 32px 32px 16px;
  }

  .step-circle {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    background: linear-gradient(
      135deg,
      var(--color-primary),
      var(--color-primary-dark)
    );
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 18px;
  }

  .progress-bar {
    flex: 1;
    height: 8px;
    background: #e5e7eb;
    border-radius: 4px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(
      90deg,
      var(--color-primary),
      var(--color-primary-dark)
    );
    transition: width 0.3s ease;
  }

  .form-content {
    padding: 0 32px 24px;
  }

  .form-title {
    font-size: 28px;
    font-weight: 700;
    text-align: left;
    color: #111827;
    margin: 0 0 8px 0;
  }

  .form-subtitle {
    color: #6b7280;
    margin: 0 0 32px 0;
    font-size: 15px;
    text-align: left;
  }

  .form-fields {
    display: flex;
    text-align: left;
    flex-direction: column;
    gap: 24px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .form-group label {
    font-weight: 600;
    color: #374151;
    font-size: 15px;
  }

  .required {
    color: var(--color-error);
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    font-size: 15px;
    font-family: inherit;
    transition: all 0.3s;
    background: white;
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(17, 103, 106, 0.1);
  }

  .form-group input.error,
  .form-group select.error,
  .form-group textarea.error {
    border-color: var(--color-error);
  }

  .error-msg {
    color: var(--color-error);
    font-size: 13px;
    margin-top: -4px;
  }

  .help-text {
    color: #6b7280;
    font-size: 13px;
    margin-top: -4px;
  }

  .whatsapp-input {
    display: flex;
    align-items: center;
    gap: 12px;
   /*  padding: 12px 16px;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    transition: all 0.3s; */
    background: white;
  }

  /* .whatsapp-input:focus-within {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(17, 103, 106, 0.1);
  } */

  .whatsapp-input.error {
    border-color: var(--color-error);
  }

  /* .whatsapp-input input {
    flex: 1;
    border: none;
    padding: 0;
    font-size: 15px;
  } */

  .whatsapp-input input:focus {
    outline: none;
  }

  /* Géneros */
  .generos-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-bottom: 16px;
  }

  .genero-btn {
    padding: 18px;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    background: white;
    font-size: 16px;
    font-weight: 600;
    color: #374151;
    cursor: pointer;
    transition: all 0.3s;
  }

  .genero-btn:hover {
    border-color: var(--color-primary);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  .genero-btn.selected {
    background: linear-gradient(
      135deg,
      var(--color-primary),
      var(--color-primary-dark)
    );
    color: white;
    border-color: var(--color-primary);
  }

  /* Paquetes */
  .paquetes-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 16px;
  }

  .paquete-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    border: 2px solid #e5e7eb;
    border-radius: 16px;
    background: white;
    cursor: pointer;
    text-align: left;
    transition: all 0.3s;
  }

  .paquete-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  .paquete-card.highlighted {
    background: linear-gradient(
      135deg,
      var(--color-primary),
      var(--color-primary-dark)
    );
    color: white;
    border-color: var(--color-primary);
  }

  .paquete-card.selected:not(.highlighted) {
    border-color: var(--color-primary);
    background: #e8f5f5;
  }

  .paquete-info {
    flex: 1;
    padding-right: 16px;
  }

  .paquete-info h3 {
    margin: 0 0 6px 0;
    font-size: 17px;
    font-weight: 700;
  }

  .duracion {
    margin: 0 0 12px 0;
    font-size: 13px;
    opacity: 0.9;
  }

  .descripcion {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
  }

  .paquete-precio {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .precio {
    font-size: 28px;
    font-weight: 700;
    line-height: 1;
  }

  .moneda {
    font-size: 13px;
    opacity: 0.8;
    margin-top: 2px;
  }

  /* Resumen */
  .resumen {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .resumen-section {
    background: #f9fafb;
    padding: 24px;
    border-radius: 16px;
    border: 2px solid #e5e7eb;
  }

  .resumen-section h3 {
    margin: 0 0 20px 0;
    font-size: 18px;
    font-weight: 700;
    color: #111827;
  }

  .detalle-row {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #e5e7eb;
    font-size: 15px;
  }

  .detalle-row:last-child {
    border-bottom: none;
  }

  .detalle-row span {
    color: #6b7280;
  }

  .detalle-row strong {
    color: #111827;
  }

  .paquete-seleccionado {
    background: linear-gradient(135deg, #e8f5f5, #f0f9f9);
    border-color: var(--color-primary);
  }

  .paquete-detalle {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
  }

  .paquete-detalle h4 {
    margin: 0 0 8px 0;
    color: var(--color-primary);
    font-size: 16px;
  }

  .paquete-detalle p {
    margin: 0;
    font-size: 14px;
    color: #6b7280;
    line-height: 1.5;
  }

  .precio-final {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .precio-final .precio {
    font-size: 32px;
    font-weight: 700;
    color: var(--color-primary);
  }

  .metodos-pago {
    background: linear-gradient(135deg, #fff8e6, #fffbf0);
    padding: 20px;
    border-radius: 16px;
    border: 2px solid #fbbf24;
  }

  .pago-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
  }

  .pago-header svg {
    color: #f59e0b;
  }

  .pago-header h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    color: #92400e;
  }

  .pago-opcion {
    display: flex;
    align-items: center;
    gap: 12px;
    background: white;
    padding: 16px;
    border-radius: 12px;
  }

  .pago-icon {
    font-size: 28px;
  }

  .pago-text {
    flex: 1;
  }

  .pago-text strong {
    display: block;
    margin-bottom: 4px;
    font-size: 15px;
    color: #111827;
  }

  .pago-text p {
    margin: 0;
    font-size: 13px;
    color: #6b7280;
  }

  .check {
    color: #10b981;
    font-size: 28px;
    font-weight: bold;
  }

  /* Footer */
  .form-footer {
    display: flex;
    justify-content: space-between;
    padding: 20px 32px 32px;
    gap: 16px;
    border-top: 1px solid #e5e7eb;
  }

  .btn-primary,
  .btn-secondary {
    flex: 1;
    padding: 14px 24px;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
  }

  .btn-primary {
    background: linear-gradient(
      135deg,
      var(--color-primary),
      var(--color-primary-dark)
    );
    color: white;
  }

  .btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(17, 103, 106, 0.3);
  }

  .btn-primary:disabled {
    background: #d1d5db;
    cursor: not-allowed;
    transform: none;
  }

  .btn-secondary {
    background: #f3f4f6;
    color: #374151;
  }

  .btn-secondary:hover {
    background: #e5e7eb;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .modal-welcome,
    .modal-form {
      max-width: 100%;
      max-height: 100vh;

    }

    .welcome-content {
      padding: 60px 24px 24px;
    }

    .progress-container {
      padding: 24px 24px 16px;
    }

    .form-content {
      padding: 0 24px 20px;
    }

    .form-footer {
      padding: 16px 24px 24px;
    }

    .form-title {
      font-size: 24px;
    }

    .generos-grid {
      grid-template-columns: 1fr;
    }

    .paquete-card {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }

    .paquete-info {
      padding-right: 0;
    }

    .paquete-precio {
      align-items: flex-start;
      width: 100%;
    }

    .paquete-detalle {
      flex-direction: column;
    }

    .precio-final {
      align-items: flex-start;
    }
  }

  @media (max-width: 480px) {
    .step-item p {
      font-size: 13px;
    }

    .step-number {
      width: 32px;
      height: 32px;
      font-size: 14px;
    }

    .paquete-info h3 {
      font-size: 15px;
    }

    .descripcion {
      font-size: 13px;
    }
  }

  .modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2147483647 !important; /* Máximo z-index posible */
  padding: 20px;
  animation: fadeIn 0.3s ease;
  isolation: isolate; /* Crea un nuevo contexto de apilamiento */
}

/* Asegurar que los modales estén por encima de todo */
.modal-welcome,
.modal-form {
  position: relative;
  z-index: 2147483647 !important;
  isolation: isolate;
}
</style>

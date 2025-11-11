<script>
  let isOpen = false;
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

  const ocasiones = [
    "Cumpleaños",
    "Aniversario",
    "San Valentín",
    "Día de la Madre",
    "Día del Padre",
    "Boda",
    "Graduación",
    "Otra",
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
      selected: true,
    },
    {
      id: "mas",
      nombre: "Paquete Más - El Detalle Inolvidable",
      duracion: "(1:30 a 2:30 min)",
      descripcion: "Canción Personalizada en MP3",
      precio: "$79.900",
      selected: false,
    },
    {
      id: "premium",
      nombre: "Paquete Premium - La Experiencia Completa",
      duracion: "(3:00 - 3:30 min)",
      descripcion:
        "Canción Extendida + MP3 Formato Estudio + Tarjeta Digital + Video Lyric Con Fotos y Letra Animadas",
      precio: "$179.900",
      selected: false,
    },
  ];

  function openModal() {
    isOpen = true;
    currentStep = 0;
  }

  function closeModal() {
    isOpen = false;
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
        errors.historia = !formData.historia.trim();
        isValid = !errors.historia;
        break;
      case 2:
        errors.whatsapp =
          !formData.whatsapp.trim() || formData.whatsapp.length < 10;
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
    alert("¡Pedido enviado exitosamente!");
    closeModal();
  }

  $: progressWidth = ((currentStep + 1) / steps.length) * 100;
</script>

<button
  on:click={openModal}
  class="group cursor-pointer mt-3 relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#f89a3f] via-[#ff6b35] to-[#f89a3f] hover:from-[#ff6b35] hover:via-[#f89a3f] hover:to-[#ff6b35] text-white px-4 py-3 rounded-full text-lg font-bold mb-4 transition-all duration-500 hover:scale-[1.02] w-full max-w-lg mx-auto md:w-auto md:max-w-none overflow-hidden border-2 border-[#ff6b35]/30"
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

<div class="p-8 md:p-12">
  <div class="mb-8">
    <div class="flex items-center justify-center gap-2 mb-6">
      <div
        class="w-10 h-10 rounded-full bg-gradient-to-br from-[#11676a] to-[#2d8c89] text-white font-bold flex items-center justify-center"
      >
        1
      </div>
      <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          class="h-full bg-gradient-to-r from-[#11676a] to-[#2d8c89] w-[16.66%]"
        ></div>
      </div>
    </div>
    <h3 class="text-3xl font-bold text-gray-900 mb-2">Información Básica</h3>
    <p class="text-gray-600">Cuéntanos un poco sobre ti y tu regalo especial</p>
  </div>
  <div class="space-y-6 mb-8">
    <div>
      <label class="block text-gray-700 font-semibold mb-3"
        >Tu nombre <span class="text-red-500">*</span></label
      ><input
        placeholder="Escribe tu nombre"
        class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#11676a] focus:ring-2 focus:ring-[#11676a]/20 outline-none transition-all"
        type="text"
        value="e"
      />
    </div>
    <div>
      <label class="block text-gray-700 font-semibold mb-3"
        >¿Para quién es esta canción? <span class="text-red-500">*</span></label
      ><select
        class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#11676a] focus:ring-2 focus:ring-[#11676a]/20 outline-none transition-all bg-white"
        ><option value="">Selecciona una opción</option><option value="esposo"
          >Mi Esposa/o</option
        ><option value="novio">Novio/a</option><option value="amiga"
          >Mejor amiga</option
        ><option value="mama">Mamá</option><option value="papa">Papá</option
        ><option value="abuelo">Abuelo</option><option value="hermano"
          >Hermano/a</option
        ><option value="hijo">Hijo/a</option><option value="importante"
          >Alguien importante en mi vida</option
        ><option value="otro">Otro</option></select
      >
    </div>
    <div>
      <label class="block text-gray-700 font-semibold mb-3"
        >¿Cuál es la ocasión? <span class="text-red-500">*</span></label
      ><select
        class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#11676a] focus:ring-2 focus:ring-[#11676a]/20 outline-none transition-all bg-white"
        ><option value="">Selecciona una opción</option><option value="detalle"
          >Detalle especial</option
        ><option value="aniversario">Aniversario</option><option
          value="cumpleanos">Cumpleaños</option
        ><option value="boda">Boda</option><option value="propuesta"
          >Propuesta de matrimonio</option
        ><option value="grado">Grado</option><option value="dia-madre-padre"
          >Día Madre/Padre</option
        ><option value="amor-amistad">Amor y amistad</option><option
          value="nacimiento">Nacimiento</option
        ><option value="memorial">Memorial</option><option value="otro"
          >Otro</option
        ></select
      >
    </div>
  </div>
  <div class="flex gap-4">
    <button
      class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-bold transition-all"
      >Atrás</button
    ><button
      class="flex-1 bg-gradient-to-r from-[#11676a] to-[#2d8c89] hover:from-[#2d8c89] hover:to-[#11676a] text-white px-6 py-3 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >Siguiente</button
    >
  </div>
</div>
{#if isOpen}
  <div class="modal-overlay" on:click={closeModal}>
    <div class="modal-container" on:click|stopPropagation>
      <button class="close-btn" on:click={closeModal}>×</button>

      <!-- Progress Bar -->
      <div class="progress-container">
        <div class="step-number">{currentStep + 1}</div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: {progressWidth}%"></div>
        </div>
      </div>

      <!-- Step Content -->
      <div class="step-content">
        <h2>{steps[currentStep].title}</h2>
        <p class="subtitle">{steps[currentStep].subtitle}</p>

        {#if currentStep === 0}
          <div class="form-group">
            <label>
              Tu nombre <span class="required">*</span>
            </label>
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
            <label>
              ¿Para quién es esta canción? <span class="required">*</span>
            </label>
            <select
              bind:value={formData.paraQuien}
              class:error={errors.paraQuien}
            >
              <option value="">Selecciona una opción</option>
              <option value="pareja">Mi pareja</option>
              <option value="madre">Mi madre</option>
              <option value="padre">Mi padre</option>
              <option value="hijo">Mi hijo/a</option>
              <option value="amigo">Un amigo/a</option>
              <option value="otro">Otro</option>
            </select>
            {#if errors.paraQuien}
              <span class="error-msg">Este campo es requerido</span>
            {/if}
          </div>

          <div class="form-group">
            <label>
              ¿Cuál es la ocasión? <span class="required">*</span>
            </label>
            <select bind:value={formData.ocasion} class:error={errors.ocasion}>
              <option value="">Selecciona una opción</option>
              {#each ocasiones as ocasion}
                <option value={ocasion}>{ocasion}</option>
              {/each}
            </select>
            {#if errors.ocasion}
              <span class="error-msg">Este campo es requerido</span>
            {/if}
          </div>
        {/if}

        {#if currentStep === 1}
          <div class="form-group">
            <label>Tu Historia de Amor:</label>
            <textarea
              bind:value={formData.historia}
              placeholder="Cuéntanos sobre esa persona especial, momentos inolvidables, lo que sientes..."
              rows="8"
              class:error={errors.historia}
            ></textarea>
            {#if errors.historia}
              <span class="error-msg">Este campo es requerido</span>
            {/if}
          </div>
        {/if}

        {#if currentStep === 2}
          <div class="form-group">
            <label>Número de WhatsApp:</label>
            <div class="whatsapp-input">
              <span class="whatsapp-icon">📱</span>
              <input
                type="tel"
                bind:value={formData.whatsapp}
                placeholder="+57 300 123 4567"
                class:error={errors.whatsapp}
              />
            </div>
            {#if errors.whatsapp}
              <span class="error-msg">Por favor ingresa un número válido</span>
            {:else}
              <p class="help-text">
                Te contactaremos por WhatsApp para coordinar la entrega
              </p>
            {/if}
          </div>
        {/if}

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

        {#if currentStep === 4}
          <div class="paquetes-list">
            {#each paquetes as paquete}
              <button
                class="paquete-card"
                class:selected={formData.paquete === paquete.id}
                class:highlighted={paquete.selected}
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
              <h3>💳 Métodos de Pago Disponibles</h3>
              <div class="pago-opcion">
                <span class="pago-icon">💵</span>
                <div>
                  <strong>Pago Contra Entrega</strong>
                  <p>Escucha primero, paga después si te encanta</p>
                </div>
                <span class="check">✓</span>
              </div>
            </div>
          </div>
        {/if}
      </div>

      <!-- Navigation Buttons -->
      <div class="modal-footer">
        {#if currentStep > 0}
          <button class="btn-secondary" on:click={prevStep}> Atrás </button>
        {:else}
          <button class="btn-secondary" disabled style="visibility: hidden;">
            Atrás
          </button>
        {/if}

        {#if currentStep < steps.length - 1}
          <button class="btn-primary" on:click={nextStep}> Siguiente </button>
        {:else}
          <button class="btn-primary" on:click={handleSubmit}>
            Finalizar Pedido
          </button>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .btn-primary {
    background: #2d7a7b;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s;
  }

  .btn-primary:hover:not(:disabled) {
    background: #236161;
  }

  .btn-primary:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  .btn-secondary {
    background: #e8f1f1;
    color: #2d7a7b;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s;
  }

  .btn-secondary:hover:not(:disabled) {
    background: #d0e5e5;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
  }

  .modal-container {
    background: white;
    border-radius: 16px;
    width: 100%;
    max-width: 640px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }

  .close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    font-size: 32px;
    color: #666;
    cursor: pointer;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background 0.3s;
  }

  .close-btn:hover {
    background: #f0f0f0;
  }

  .progress-container {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 24px 32px 16px;
  }

  .step-number {
    background: #2d7a7b;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 18px;
    flex-shrink: 0;
  }

  .progress-bar {
    flex: 1;
    height: 8px;
    background: #e8f1f1;
    border-radius: 4px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: #2d7a7b;
    transition: width 0.3s ease;
  }

  .step-content {
    padding: 0 32px 24px;
  }

  .step-content h2 {
    font-size: 24px;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 8px 0;
  }

  .subtitle {
    color: #666;
    margin: 0 0 24px 0;
    font-size: 14px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    display: block;
    font-weight: 600;
    margin-bottom: 8px;
    color: #1a1a1a;
  }

  .required {
    color: #e74c3c;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    padding: 12px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 14px;
    font-family: inherit;
    transition: border-color 0.3s;
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #2d7a7b;
  }

  .form-group input.error,
  .form-group select.error,
  .form-group textarea.error {
    border-color: #e74c3c;
  }

  .error-msg {
    color: #e74c3c;
    font-size: 12px;
    margin-top: 4px;
    display: block;
  }

  .whatsapp-input {
    display: flex;
    align-items: center;
    gap: 8px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    padding: 4px 4px 4px 12px;
    transition: border-color 0.3s;
  }

  .whatsapp-input:focus-within {
    border-color: #2d7a7b;
  }

  .whatsapp-input.error {
    border-color: #e74c3c;
  }

  .whatsapp-icon {
    font-size: 20px;
  }

  .whatsapp-input input {
    border: none;
    padding: 8px;
    flex: 1;
  }

  .whatsapp-input input:focus {
    outline: none;
  }

  .help-text {
    color: #666;
    font-size: 12px;
    margin-top: 4px;
  }

  .generos-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .genero-btn {
    padding: 16px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    background: white;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
  }

  .genero-btn:hover {
    border-color: #2d7a7b;
  }

  .genero-btn.selected {
    background: #2d7a7b;
    color: white;
    border-color: #2d7a7b;
  }

  .paquetes-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .paquete-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    background: white;
    cursor: pointer;
    text-align: left;
    transition: all 0.3s;
  }

  .paquete-card.highlighted {
    background: #2d7a7b;
    color: white;
    border-color: #2d7a7b;
  }

  .paquete-card.selected:not(.highlighted) {
    border-color: #2d7a7b;
    background: #e8f1f1;
  }

  .paquete-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .paquete-info h3 {
    margin: 0 0 4px 0;
    font-size: 16px;
    font-weight: 700;
  }

  .duracion {
    margin: 0 0 8px 0;
    font-size: 12px;
    opacity: 0.8;
  }

  .descripcion {
    margin: 0;
    font-size: 14px;
  }

  .paquete-precio {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .precio {
    font-size: 24px;
    font-weight: 700;
  }

  .moneda {
    font-size: 12px;
    opacity: 0.8;
  }

  .resumen {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .resumen-section {
    background: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
  }

  .resumen-section h3 {
    margin: 0 0 16px 0;
    font-size: 18px;
    font-weight: 700;
  }

  .detalle-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #e0e0e0;
  }

  .detalle-row:last-child {
    border-bottom: none;
  }

  .paquete-seleccionado {
    background: #e8f1f1;
  }

  .paquete-detalle {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .paquete-detalle h4 {
    margin: 0 0 8px 0;
    color: #2d7a7b;
  }

  .paquete-detalle p {
    margin: 0;
    font-size: 14px;
    color: #666;
  }

  .precio-final {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .precio-final .precio {
    font-size: 28px;
    font-weight: 700;
    color: #2d7a7b;
  }

  .metodos-pago h3 {
    margin: 0 0 12px 0;
    font-size: 16px;
  }

  .pago-opcion {
    display: flex;
    align-items: center;
    gap: 12px;
    background: #fff8e6;
    padding: 16px;
    border-radius: 8px;
  }

  .pago-icon {
    font-size: 24px;
  }

  .pago-opcion strong {
    display: block;
    margin-bottom: 4px;
  }

  .pago-opcion p {
    margin: 0;
    font-size: 12px;
    color: #666;
  }

  .check {
    margin-left: auto;
    color: #2d7a7b;
    font-size: 24px;
    font-weight: bold;
  }

  .modal-footer {
    display: flex;
    justify-content: space-between;
    padding: 20px 32px;
    border-top: 1px solid #e0e0e0;
  }

  @media (max-width: 640px) {
    .modal-container {
      max-width: 100%;
      border-radius: 16px 16px 0 0;
    }

    .step-content {
      padding: 0 20px 20px;
    }

    .progress-container {
      padding: 20px 20px 12px;
    }

    .generos-grid {
      grid-template-columns: 1fr;
    }

    .modal-footer {
      padding: 16px 20px;
    }

    .paquete-card {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }

    .paquete-precio {
      align-items: flex-start;
    }
  }
</style>

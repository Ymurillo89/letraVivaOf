import React, { useState, useEffect } from 'react';
import { EventBus } from '../utils/eventBus';

interface ShopifyVariant {
  id: number;
  product_id: number;
  title: string;
  price: string;
  position: number;
  compare_at_price: string | null;
}

interface ModalCancionPersonalizadaProps {
  variants: ShopifyVariant[];
}

const ModalCancionPersonalizada: React.FC<ModalCancionPersonalizadaProps> = ({ variants }) => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<{
    orderNumber: string;
    nombre: string;
    paquete: string;
    precio: string;
    whatsapp: string;
  } | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false); // NUEVO ESTADO para el modal de error

  const [formData, setFormData] = useState({
    nombre: "",
    paraQuien: "",
    ocasion: "",
    tonoEmocional: "",
    historia: "",
    whatsapp: "",
    email: "",
    genero: "",
    paquete: "",
    metodoPago: "",
  });

  const [errors, setErrors] = useState({
    nombre: false,
    paraQuien: false,
    ocasion: false,
    tonoEmocional: false,
    historia: false,
    whatsapp: false,
    email: false,
    genero: false,
    paquete: false,
    metodoPago: false,
  });

  // Leer variant ID del query param cuando se abre el formulario
  useEffect(() => {
    if (showForm) {
      const urlParams = new URLSearchParams(window.location.search);
      const variantId = urlParams.get('variant');

      if (variantId && variants.some(v => v.id.toString() === variantId)) {
        setFormData(prev => ({ ...prev, paquete: variantId }));
      }
    }
  }, [showForm, variants]);

  useEffect(() => {
    const handleOpenModal = () => {
      openWelcome();
    };

    EventBus.on('openSongModal', handleOpenModal);

    return () => {
      EventBus.remove('openSongModal', handleOpenModal);
    };
  }, []);

  const steps = [
    { title: "Información Básica", subtitle: "Cuéntanos sobre ti y tu regalo especial" },
    { title: "Tu Historia", subtitle: "Comparte los detalles especiales" },
    { title: "Contacto", subtitle: "Para enviarte tu canción" },
    { title: "Género Musical", subtitle: "Selecciona tu estilo favorito" },
    { title: "Tu Paquete", subtitle: "Elige el perfecto para ti" },
    { title: "Resumen", subtitle: "Revisa tu pedido antes de finalizar" },
  ];

  const tonosEmocionales = [
    { id: "Romántico", label: "Romántico", emoji: "💘", color: "bg-pink-500" },
    { id: "Alegre Festivo", label: "Alegre", emoji: "🎉", color: "bg-orange-500" },
    { id: "Nostálgico", label: "Nostálgico", emoji: "🌠", color: "bg-blue-500" },
    { id: "Emotivo", label: "Emotivo", emoji: "❤️", color: "bg-teal-500" },
    { id: "Bailable", label: "Bailable", emoji: "💃", color: "bg-teal-500" },
    { id: "Inspirador", label: "Inspirador", emoji: "💡", color: "bg-teal-500" },
    { id: "Melancólico", label: "Melancólico", emoji: "😔", color: "bg-teal-500" },
    { id: "Espiritual", label: "Espiritual", emoji: "🔮", color: "bg-teal-500" },
    { id: "Personal Intimo", label: "Personal Intimo", emoji: "💌", color: "bg-teal-500" },
  ];

  const paraQuienOptions = [
    { id: "esposa/o", label: "Esposo/a", emoji: "💏" },
    { id: "novio/a", label: "Novio/a", emoji: "💕" },
    { id: "mejor amiga", label: "Mejor Amiga", emoji: "🤝" },
    { id: "mamá", label: "Mamá", emoji: "👩" },
    { id: "papá", label: "Papá", emoji: "👨" },
    { id: "abuelo/a", label: "Abuelo/a", emoji: "🧔" },
    { id: "hermano/a", label: "Hermano/a", emoji: "👦" },
    { id: "hijo/a", label: "Hijo/a", emoji: "🧒" },
    { id: "alguien importante", label: "Alguien Importante", emoji: "👱" },

  ];

  const ocasiones = [
    { id: "detalle especial", label: "Detalle Especial", emoji: "🎁" },
    { id: "aniversario", label: "Aniversario", emoji: "🎂" },
    { id: "cumpleanos", label: "Cumpleaños", emoji: "🎉" },
    { id: "boda", label: "Boda", emoji: "💒" },
    { id: "propuesta matrimonio", label: "Propuesta Matrimonio", emoji: "💍" },
    { id: "Grados", label: "Grados", emoji: "📚" },
    { id: "dia-madre/padres", label: "Día Madre/ Padre", emoji: "👩‍👩‍👧‍👦" },
    { id: "amor amistad", label: "Amor y Amistad", emoji: "💕" },
    { id: "nacimiento", label: "Nacimiento", emoji: "🎀" },
    { id: "memorial", label: "Memorial", emoji: "🎈" }
  ];

  const generos = [
    { id: "pop", label: "Pop", icon: "🎧", color: "bg-purple-500" },
    { id: "reggaeton", label: "Reggaeton", icon: "🎶", color: "bg-red-500" },
    { id: "balada", label: "Balada", icon: "🎻", color: "bg-yellow-500" },
    { id: "rock", label: "Rock", icon: "🎸", color: "bg-gray-800" },
    { id: "vallenato", label: "Vallenato", icon: "🎵", color: "bg-pink-500" },
    { id: "salsa", label: "Salsa", icon: "🌮", color: "bg-red-600" },
    { id: "cumbia", label: "Cumbia", icon: "🎸", color: "bg-orange-500" },
    { id: "merengue", label: "Merengue", icon: "🎶", color: "bg-purple-600" },
    { id: "bolero", label: "Bolero", icon: "🎻", color: "bg-red-700" },
    { id: "ranchera", label: "Ranchera", icon: "🌽", color: "bg-orange-600" },
    { id: "rb", label: "R&B", icon: "🎤", color: "bg-blue-600" },
    { id: "jazz", label: "Jazz", icon: "🎺", color: "bg-blue-800" },
  ];

  // NUEVA FUNCIÓN para abrir y cerrar el modal de error
  const openErrorModal = () => {
    setShowForm(false); // Cerrar formulario si está abierto
    setShowWelcome(false); // Cerrar bienvenida
    setShowSuccess(false); // Cerrar éxito
    setShowErrorModal(true);
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
    setIsSubmitting(false);
  };

  const handleRetry = () => {
    // Cierra el modal de error y reabre el formulario en el último paso (Resumen)
    closeErrorModal();
    setShowForm(true);
    setCurrentStep(steps.length - 1); // Vuelve al paso de Resumen para reintentar
  };

  // Procesar variants de Shopify
  const parseVariantInfo = (title: string) => {
    const nameMatch = title.match(/^(.*?)\s*–/);
    const nombre = nameMatch ? nameMatch[1].trim() : title;

    const subtitleMatch = title.match(/–\s*(.*?)\s*\|/);
    const subtitle = subtitleMatch ? subtitleMatch[1].trim() : '';

    const durationMatch = title.match(/\(([^)]+min[^)]*)\)/i);
    const duracion = durationMatch ? durationMatch[1].trim() : '';

    return { nombre, subtitle, duracion };
  };

  const getFeatures = (title: string) => {
    const features = [];
    const afterDuration = title.split(/\)/)[1] || '';

    if (afterDuration.includes('MP3')) {
      const formatMatch = afterDuration.match(/MP3\s+([^+\-]+)/);
      const format = formatMatch ? formatMatch[1].trim() : '';
      features.push({
        text: format ? `MP3 ${format}` : 'Canción en MP3',
        icon: '🎧'
      });
    }

    if (afterDuration.includes('Tarjeta Digital')) {
      features.push({
        text: 'Tarjeta Digital Personalizada',
        icon: '💳'
      });
    }

    if (afterDuration.includes('Video')) {
      features.push({
        text: 'Video Lyric Animado',
        icon: '🎥'
      });
    }

    if (afterDuration.match(/\d+\s*Foto/i)) {
      const photoMatch = afterDuration.match(/(\d+)\s*Foto/i);
      const count = photoMatch ? photoMatch[1] : '1';
      features.push({
        text: `${count} Foto${count !== '1' ? 's' : ''} Para La Portada`,
        icon: '📷'
      });
    }

    return features;
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('es-CO').format(parseFloat(price));
  };

  // Convertir variants a formato paquetes
  const paquetes = variants.map(variant => {
    const info = parseVariantInfo(variant.title);
    const features = getFeatures(variant.title);
    const isStandard = variant.position === 1;

    return {
      id: variant.id.toString(),
      position: variant.position,
      variantId: variant.id,
      nombre: info.nombre.replace(/🎼|🎤|🎬|👑|🎵/g, '').trim(),
      subtitle: info.subtitle.replace(/⭐/g, '').trim(),
      duracion: info.duracion,
      features: features,
      precio: `$${formatPrice(variant.price)}`,
      precioNumerico: variant.price,
      highlighted: isStandard,
      icon: variant.position === 1 ? '🎸' : variant.position === 2 ? '🎹' : '🎺'
    };
  });

  const openWelcome = () => {
    setShowWelcome(true);
  };

  const closeWelcome = () => {
    setShowWelcome(false);
  };

  const startForm = () => {
    setShowWelcome(false);
    setShowForm(true);
    setCurrentStep(0);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const closeSuccess = () => {
    setShowSuccess(false);
    setOrderSuccess(null);
  };

  const validateCurrentStep = () => {
    let isValid = true;
    const newErrors = { ...errors };

    switch (currentStep) {
      case 0:
        newErrors.nombre = !formData.nombre.trim();
        newErrors.paraQuien = !formData.paraQuien;
        newErrors.ocasion = !formData.ocasion;
        newErrors.tonoEmocional = !formData.tonoEmocional;
        isValid = !newErrors.nombre && !newErrors.paraQuien && !newErrors.ocasion && !newErrors.tonoEmocional;
        break;
      case 1:
        newErrors.historia = formData.historia.trim().length < 20;
        isValid = !newErrors.historia;
        break;
      case 2:
        newErrors.whatsapp = formData.whatsapp.trim().length < 10;
        isValid = !newErrors.whatsapp;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        newErrors.email = !formData.email.trim() || !emailRegex.test(formData.email);

        isValid = !newErrors.whatsapp && !newErrors.email;
        break;
      case 3:
        newErrors.genero = !formData.genero;
        isValid = !newErrors.genero;
        break;
      case 4:
        newErrors.paquete = !formData.paquete;
        isValid = !newErrors.paquete;
        break;
      case 5:
        newErrors.metodoPago = !formData.metodoPago;
        isValid = !newErrors.metodoPago;
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const selectGenero = (generoId: string) => {
    setFormData({ ...formData, genero: generoId });
    setErrors({ ...errors, genero: false });
  };

  const selectPaquete = (paqueteId: string) => {
    setFormData({ ...formData, paquete: paqueteId });
    setErrors({ ...errors, paquete: false });
  };

  const selectMetodoPago = (metodo: string) => {
    setFormData({ ...formData, metodoPago: metodo });
    setErrors({ ...errors, metodoPago: false });
  };

  // Agrega estos useEffect en tu componente ModalCancionPersonalizada

  // Ocultar navbar cuando se abra cualquier modal
  useEffect(() => {
    const nav = document.querySelector('nav');
    if (showWelcome || showForm || showSuccess) {
      nav?.classList.add('hidden');
      // Prevenir scroll en el body
      document.body.style.overflow = 'hidden';
    } else {
      nav?.classList.remove('hidden');
      document.body.style.overflow = '';
    }

    // Cleanup al desmontar el componente
    return () => {
      nav?.classList.remove('hidden');
      document.body.style.overflow = '';
    };
  }, [showWelcome, showForm, showSuccess]);

  // Agregar también en las funciones de cierre para asegurar:



  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);

    try {
      const selectedPaquete = paquetes.find(p => p.id === formData.paquete);
      const selectedGenero = generos.find(g => g.id === formData.genero);

      // Extraer nombre y apellido
      const nombreCompleto = formData.nombre.trim().split(' ');
      const firstName = nombreCompleto[0] || 'Cliente';
      const lastName = nombreCompleto.slice(1).join(' ') || 'Letra Viva';

      // Limpiar el número de WhatsApp
      const phoneClean = formData.whatsapp.replace(/[^\d+]/g, '');

      // Preparar datos del pedido - ESTRUCTURA CORREGIDA
      const orderData = {
        line_items: [
          {
            variant_id: selectedPaquete?.variantId || 0,
            quantity: 1
          }
        ],
        customer: {
          first_name: firstName,
          last_name: lastName,
          phone: phoneClean,
          email: formData.email, // Email temporal basado en teléfono
        },
        // BILLING ADDRESS - estructura correcta como objeto plano
        billing_address: {
          first_name: firstName,
          last_name: lastName,
          address1: 'Dirección no especificada', // DEBE ser string
          address2: '',
          city: 'Medellín',
          province: 'Antioquia',
          country: 'Colombia',
          zip: '050001',
          phone: phoneClean
        },
        // SHIPPING ADDRESS - estructura correcta como objeto plano
        shipping_address: {
          first_name: firstName,
          last_name: lastName,
          address1: 'Dirección no especificada', // DEBE ser string
          address2: '',
          city: 'Medellín',
          province: 'Antioquia',
          country: 'Colombia',
          zip: '050001',
          phone: phoneClean
        },
        note_attributes: [
          { name: "Nombre", value: formData.nombre },
          { name: "Para quien", value: formData.paraQuien },
          { name: "Ocasion", value: formData.ocasion },
          { name: "Tono Emocional", value: formData.tonoEmocional },
          { name: "Historia", value: formData.historia },
          { name: "Genero musical", value: selectedGenero?.label || "" },
          { name: "WhatsApp", value: formData.whatsapp },
          { name: "Email", value: formData.email },
          { name: "Metodo de Pago", value: formData.metodoPago === "online" ? "Pago en Linea" : "Contra Entrega" }
        ],
        note: `Historia: ${formData.historia}\n\nPara: ${formData.paraQuien}\nOcasion: ${formData.ocasion}\nTono: ${formData.tonoEmocional}\nGenero: ${selectedGenero?.label || ""}`
      };

      // Usar endpoint diferente según método de pago
      const endpoint = formData.metodoPago === "online"
        ? '/api/shopify/create-checkout'  // Storefront API
        : '/api/shopify/create-order';     // Admin API

      console.log('Enviando pedido:', JSON.stringify(orderData, null, 2));

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const responseText = await response.text();
      console.log('Respuesta del servidor:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Error parseando JSON:', e);
        throw new Error(`Respuesta inválida del servidor: ${responseText}`);
      }

      if (!data.success) {
        throw new Error(data.message || 'Error al procesar el pedido');
      }

      closeForm();

      if (formData.metodoPago === "online") {
        // Redirigir al checkout de Shopify
        window.location.href = data.checkoutUrl;
      } else {
        // Mostrar modal de éxito
        setOrderSuccess({
          orderNumber: data.orderNumber,
          nombre: formData.nombre,
          paquete: selectedPaquete?.nombre || '',
          precio: selectedPaquete?.precio || '',
          whatsapp: formData.whatsapp
        });
        setShowSuccess(true);

        // Resetear formulario
        setFormData({
          nombre: "",
          paraQuien: "",
          ocasion: "",
          tonoEmocional: "",
          historia: "",
          whatsapp: "",
          email: "",
          genero: "",
          paquete: "",
          metodoPago: "",
        });
        setCurrentStep(0);
      }

    } catch (error) {
      console.error('Error al crear pedido:', error);
      openErrorModal();
      /* alert(error instanceof Error ? error.message : 'Hubo un error al procesar tu pedido. Por favor intenta nuevamente.'); */
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressWidth = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="w-full">

      {/* Botón Principal */}
      <button
        onClick={openWelcome}
        className="group cursor-pointer relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#f89a3f] via-[#ff6b35] to-[#f89a3f] hover:from-[#ff6b35] hover:via-[#f89a3f] hover:to-[#ff6b35] text-white px-6 py-4 rounded-full text-lg font-bold transition-all duration-500 hover:scale-[1.02] w-full max-w-lg mx-auto md:w-auto md:max-w-none overflow-hidden border-2 border-[#ff6b35]/30 shadow-xl"
      >
        <span className="relative z-10 flex items-center gap-3">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"></path>
          </svg>
          <span>¡Toca aquí para crear tu canción personalizada!</span>
          <svg
            className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </span>
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
      </button>

      {/* Modal de Bienvenida */}
      {showWelcome && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button
              onClick={() => setShowWelcome(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-all hover:rotate-90 z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-teal-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-xl">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-2">Letra Viva</h1>
              <p className="text-gray-600 mb-8">Donde tus emociones se convierten en música</p>

              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 mb-8 border-2 border-teal-200">
                <h3 className="text-teal-800 font-bold text-lg mb-4">• ¿CÓMO FUNCIONA? •</h3>

                <div className="space-y-4">
                  {[
                    { num: 1, text: "Cuéntanos tu historia especial" },
                    { num: 2, text: "Danos tu contacto para la entrega" },
                    { num: 3, text: "Elige el género musical" },
                    { num: 4, text: "Selecciona tu paquete y método de pago" }
                  ].map(step => (
                    <div key={step.num} className="flex items-center gap-3 text-left">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#f89a3f] via-[#ff6b35] to-[#f89a3f] hover:from-[#ff6b35] hover:via-[#f89a3f] hover:to-[#ff6b35] rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0 shadow-md">
                        {step.num}
                      </div>
                      <p className="text-teal-800 font-medium">{step.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setShowWelcome(false);
                  setShowForm(true);
                }}
                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                Comenzar Ahora
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal del Formulario */}
      {showForm && (
        <div className="modal-overlay" onClick={closeForm}>
          <div className="modal-content modal-form-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeForm} aria-label="Cerrar">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Progress Bar */}
            <div className="bg-gradient-to-br from-teal-50 to-white p-6 border-b-2 border-teal-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-xs font-bold text-teal-700 bg-teal-100 px-3 py-1 rounded-full">
                  PASO {currentStep + 1} DE {steps.length}
                </div>
                <div className="text-xs text-gray-500">{Math.round(progressWidth)}% completado</div>
              </div>

              <div className="h-2 bg-teal-100 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-500 rounded-full"
                  style={{ width: `${progressWidth}%` }}
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                  {currentStep === 0 && <span className="text-2xl">✨</span>}
                  {currentStep === 1 && <span className="text-2xl">💬</span>}
                  {currentStep === 2 && <span className="text-2xl">📞</span>}
                  {currentStep === 3 && <span className="text-2xl">🎵</span>}
                  {currentStep === 4 && <span className="text-2xl">📦</span>}
                  {currentStep === 5 && <span className="text-2xl">✅</span>}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <h2 className="text-2xl font-bold text-gray-900 truncate ">{steps[currentStep].title}</h2>
                  <p className="text-sm text-gray-600">{steps[currentStep].subtitle}</p>
                </div>
              </div>
            </div>

            {/* Contenido del paso actual */}
            <div className="flex-1 overflow-y-auto p-6 h-96 md:h-auto">
              {/* Paso 0: Información Básica */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <span className="text-teal-600">👤</span> Tu nombre
                    </label>
                    <input
                      type="text"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      placeholder="Escribe tu nombre"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-100 transition-all ${errors.nombre ? 'border-red-400' : 'border-gray-200 focus:border-teal-500'
                        }`}
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                      <span className="text-teal-600">💝</span> Tono emocional
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
                      {tonosEmocionales.map((tono) => (
                        <button
                          key={tono.id}
                          onClick={() => setFormData({ ...formData, tonoEmocional: tono.id })}
                          className={`p-2 rounded-xl border-2 transition-all flex items-center gap-3 cursor-pointer ${formData.tonoEmocional === tono.id
                            ? 'border-teal-500 bg-teal-50 shadow-md scale-105'
                            : 'border-gray-200 hover:border-teal-300 hover:shadow-sm'
                            }`}
                        >
                          <div className={` h-10  flex items-center justify-center text-white `}>
                            {tono.emoji}
                          </div>
                          <div className="absolute top-2 right-2 w-5 h-5 bg-teal-600 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd">
                              </path>
                            </svg>
                          </div>
                          <span className="font-semibold text-gray-800">{tono.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                      <span className="text-teal-600">🎁</span> ¿Para quién es?
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {paraQuienOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setFormData({ ...formData, paraQuien: option.id })}
                          className={`p-1 rounded-xl border-2 transition-all text-center ${formData.paraQuien === option.id
                            ? 'border-teal-500 bg-teal-50 shadow-md scale-105'
                            : 'border-gray-200 hover:border-teal-300 hover:shadow-sm'
                            }`}
                        >
                          <div className="text-3xl mb-1">{option.emoji}</div>

                          <div className="text-xs font-semibold text-gray-800">{option.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                      <span className="text-teal-600">📅</span> ¿Cuál es la ocasión?
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {ocasiones.map((ocasion) => (
                        <button
                          key={ocasion.id}
                          onClick={() => setFormData({ ...formData, ocasion: ocasion.id })}
                          className={`p-1 rounded-xl border-2 transition-all text-center ${formData.ocasion === ocasion.id
                            ? 'border-teal-500 bg-teal-50 shadow-md scale-105'
                            : 'border-gray-200 hover:border-teal-300 hover:shadow-sm'
                            }`}
                        >
                          <div className="text-3xl mb-1">{ocasion.emoji}</div>
                          <div className="text-xs font-semibold text-gray-800">{ocasion.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Paso 1: Cuéntanos Tu Historia */}
              {currentStep === 1 && (
                <div>
                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl px-2 py-2 mb-3 border-2 border-pink-200">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">✨</span>
                      </div>
                      <p className="text-sm text-pink-900 leading-relaxed text-left">
                        Cuéntanos sobre esa persona especial, momentos inolvidables, lo que sientes... Todo esto nos ayuda a crear la canción perfecta.
                      </p>
                    </div>
                  </div>

                  <textarea
                    value={formData.historia}
                    onChange={(e) => setFormData({ ...formData, historia: e.target.value })}
                    placeholder="Escribe tu historia aquí..."
                    rows={10}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-100 transition-all resize-none ${errors.historia ? 'border-red-400' : 'border-gray-200 focus:border-teal-500'
                      }`}
                  />
                  <div className="flex flex-col items-center justify-between  mt-2 text-sm">
                    <span className={formData.historia.length >= 20 ? 'text-teal-600 font-semibold flex items-center gap-1' : 'text-gray-500'}>
                      {formData.historia.length >= 20 && <span>✓</span>}
                      Mínimo 20 caracteres · {formData.historia.length} escritos
                    </span>
                    {formData.historia.length >= 20 && (
                      <span className="text-teal-600 font-semibold">¡Perfecto!</span>
                    )}
                  </div>
                </div>
              )}

              {/* Paso 2: Información de Contacto */}
              {currentStep === 2 && (
                <div className="space-y-2">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="+57 300 123 4567"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-100 transition-all ${errors.whatsapp ? 'border-red-400' : 'border-gray-200 focus:border-teal-500'
                        }`}
                    />
                    <p className="text-xs text-gray-500 mt-1 text-left">• Te contactaremos para coordinar la entrega</p>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tucorreo@ejemplo.com"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-100 transition-all ${errors.email ? 'border-red-400' : 'border-gray-200 focus:border-teal-500'
                        }`}
                    />
                    <p className="text-xs text-gray-500 mt-1 text-left">• Recibirás la confirmación aquí</p>
                  </div>
                </div>
              )}

              {/* Paso 3: Elige Tu Estilo Musical */}
              {currentStep === 3 && (
                <div>
                  <div className="max-h-96 pr-2">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {generos.map((genero) => (
                        <button
                          key={genero.id}
                          onClick={() => setFormData({ ...formData, genero: genero.id })}
                          className={`relative p-2 mx-1 rounded-xl border-2 transition-all text-center overflow-hidden ${formData.genero === genero.id
                            ? 'border-teal-500 shadow-lg scale-105'
                            : 'border-gray-200 hover:border-teal-300 hover:shadow-sm'
                            }`}
                        >
                          <div className={`absolute inset-0 ${genero.color} opacity-${formData.genero === genero.id ? '21' : '10'} transition-opacity`}></div>
                          <div className="relative z-10">
                            <div className={`text-2xl mb-2 ${formData.genero === genero.id ? 'text-white' : 'text-gray-800'}`}>
                              {genero.icon}
                            </div>
                            <div className={`text-sm font-bold ${formData.genero === genero.id ? 'text-white' : 'text-gray-800'}`}>
                              {genero.label}
                            </div>
                          </div>
                          {formData.genero === genero.id && (
                            <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}


              {/* Paso 4: Selecciona Tu Paquete */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  {paquetes.sort((a, b) => a.position - b.position).map((paquete) => (
                    <button
                      key={paquete.id}
                      onClick={() => setFormData({ ...formData, paquete: paquete.id })}
                      className={`relative w-full p-5 rounded-2xl border-2 transition-all text-left ${formData.paquete === paquete.id
                        ? 'border-teal-500 bg-gradient-to-br from-teal-50 to-teal-100 shadow-xl scale-105'
                        : paquete.highlighted
                          ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50'
                          : 'border-gray-200 bg-white hover:border-teal-300 hover:shadow-md'
                        }`}
                    >
                      {paquete.highlighted && formData.paquete !== paquete.id && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md">
                          ⭐ POPULAR
                        </div>
                      )}

                      {formData.paquete === paquete.id && (
                        <div className="absolute top-4 right-4 w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}

                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-2xl">{paquete.icon}</span>
                            <h3 className="text-lg font-bold text-gray-900">{paquete.nombre}</h3>
                          </div>
                          {paquete.subtitle && (
                            <p className="text-sm font-semibold text-teal-700">{paquete.subtitle}</p>
                          )}
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-2xl font-black text-teal-600">{paquete.precio}</div>
                          <div className="text-xs text-gray-500 font-semibold">COP</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {paquete.duracion && (
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="text-teal-600">⏱</span>
                            <span className="font-medium">{paquete.duracion}</span>
                          </div>
                        )}
                        {paquete.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="text-teal-600">✓</span>
                            <span className="font-medium">{feature.text}</span>
                          </div>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Paso 5: Resumen */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border-2 border-teal-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">•</span> DETALLES
                    </h3>
                    <div className="space-y-3">
                      {[
                        { icon: "👤", label: "Nombre", value: formData.nombre },
                        { icon: "🎁", label: "Para", value: paraQuienOptions.find(p => p.id === formData.paraQuien)?.label },
                        { icon: "💝", label: "Tono", value: tonosEmocionales.find(t => t.id === formData.tonoEmocional)?.label },
                        { icon: "📅", label: "Ocasión", value: ocasiones.find(o => o.id === formData.ocasion)?.label },
                        { icon: "🎵", label: "Género", value: generos.find(g => g.id === formData.genero)?.label },
                        { icon: "📱", label: "WhatsApp", value: formData.whatsapp },
                        { icon: "📧", label: "Email", value: formData.email }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between py-2 border-b border-teal-200 last:border-0">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{item.icon}</span>
                            <span className="text-sm text-gray-600">{item.label}</span>
                          </div>
                          <span className="text-sm font-bold text-gray-900">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {formData.paquete && (() => {
                    const paq = paquetes.find((p) => p.id === formData.paquete);
                    return paq ? (
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <span className="text-2xl">📦</span> PAQUETE SELECCIONADO
                        </h3>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="text-xl font-bold text-teal-700 mb-1">{paq.nombre}</h4>
                            <p className="text-sm text-gray-600 mb-2">{paq.subtitle}</p>
                            <div className="space-y-1">
                              <div className="text-sm text-gray-700">⏱ {paq.duracion}</div>

                              {paq.features.map((f, i) => (
                                <div key={i} className="text-sm text-gray-700">✓ {f.text}</div>
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-black text-teal-600">{paq.precio}</div>
                            <div className="text-xs text-gray-500 font-semibold">COP</div>
                          </div>
                        </div>
                      </div>
                    ) : null
                  })()}

                  <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-5 border-2 border-yellow-300">
                    <div className="flex items-center gap-2 mb-4">
                      <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                      </svg>
                      <h3 className="text-base font-bold text-amber-900">Métodos de Pago</h3>
                    </div>
                    <div className="space-y-3">
                      <button
                        onClick={() => setFormData({ ...formData, metodoPago: 'online' })}
                        className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${formData.metodoPago === 'online'
                          ? 'border-teal-500 bg-teal-50 shadow-md'
                          : 'border-gray-200 bg-white hover:border-teal-300'
                          }`}
                      >
                        <div className="text-2xl">💳</div>
                        <div className="flex-1 text-left">
                          <div className="font-bold text-gray-900 text-sm">Pago en Línea</div>
                          <div className="text-xs text-gray-600">Salta la fila y recibe tu canción en solo 24 Horas</div>
                        </div>
                      </button>
                      <button
                        onClick={() => setFormData({ ...formData, metodoPago: 'contraentrega' })}
                        className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${formData.metodoPago === 'contraentrega'
                          ? 'border-teal-500 bg-teal-50 shadow-md'
                          : 'border-gray-200 bg-white hover:border-teal-300'
                          }`}
                      >
                        <div className="text-2xl">💵</div>
                        <div className="flex-1 text-left">
                          <div className="font-bold text-gray-900 text-sm">Desbloqueo al final</div>
                          <div className="text-xs text-gray-600">Escucha primero, paga después</div>
                        </div>
                      </button>
                    </div>
                    {errors.metodoPago && (
                      <p className="text-red-500 text-sm mt-2">Selecciona un método de pago</p>
                    )}
                  </div>

                </div>

              )}
            </div>

            {/* Botones de navegación */}
            <div className="border-t-2 border-gray-100 p-6 bg-white flex items-center gap-4">
              {currentStep > 0 && (
                <button
                  onClick={prevStep}
                  className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-all flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Atrás
                </button>
              )}

              {currentStep < steps.length - 1 ? (
                <button
                  onClick={nextStep}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Siguiente
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white font-bold hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Procesando...' : 'Confirmar '}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Éxito */}
      {showSuccess && orderSuccess && (
        <div className="modal-overlay" onClick={closeSuccess}>
          <div className="modal-content success-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeSuccess} aria-label="Cerrar">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="welcome-content">
              {/* Icono de éxito animado */}
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-xl animate-bounce-in">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-check w-10 h-10 text-white stroke-[3]">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                </div>
              </div>

              <h2 className="success-title">¡Pedido Creado!</h2>
              <p className="success-subtitle">Tu canción personalizada está en camino</p>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-6 space-y-4">
                <div className="text-center pb-3 border-b border-blue-200">
                  <p className="text-sm text-gray-600 mb-1">Número de Pedido</p>
                  <p className="text-3xl font-bold text-blue-600">{orderSuccess.orderNumber}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-user w-5 h-5 text-purple-600">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 text-left">Cliente</p>
                      <p className="font-semibold text-gray-900 text-left">{orderSuccess.nombre}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-music w-5 h-5 text-purple-600">
                        <path d="M9 18V5l12-2v13"></path>
                        <circle cx="6" cy="18" r="3"></circle>
                        <circle cx="18" cy="16" r="3"></circle>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 text-left">Paquete Seleccionado</p>
                      <p className="font-semibold text-gray-900 text-left">{orderSuccess.paquete}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-flame w-5 h-5 text-orange-500">
                        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 text-left">Total a Pagar</p>
                      <p className="font-semibold text-gray-900 text-left">{orderSuccess.precio}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-phone w-5 h-5 text-purple-600">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
                        </path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 text-left">WhatsApp</p>
                      <p className="font-semibold text-gray-900 text-left">{orderSuccess.whatsapp}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Próximos pasos */}
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl p-6 space-y-4 mt-2">
                <div className="flex items-center gap-2 text-amber-800">
                  <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg">¿Qué sigue ahora?</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-7 h-7 bg-amber-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">1</div>
                    <div>
                      <p className="font-semibold text-gray-700 text-left">Contacto en 24 horas:</p>
                      <p className="text-sm text-gray-700 text-left">Nuestro equipo se comunicará contigo por WhatsApp para confirmar todos los detalles de tu canción.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-7 h-7 bg-amber-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">2</div>
                    <div>
                      <p className="font-semibold text-gray-700 text-left">Creación:</p>
                      <p className="text-sm text-gray-700 text-left">Comenzaremos a trabajar en tu canción personalizada con todo el amor y dedicación que mereces.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-7 h-7 bg-amber-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">3</div>
                    <div>
                      <p className="font-semibold text-gray-700 text-left">Entrega:</p>
                      <p className="text-sm text-gray-700 text-left">Te enviaremos un adelanto para que escuches tu canción antes de pagar.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recordatorio de pago */}
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 border-2 border-teal-200 rounded-2xl p-5 text-center my-2">
                <p className="text-teal-900 font-semibold flex items-center justify-center gap-2">
                  <span className="text-2xl">💵</span>
                  <span>Pagarás cuando recibas y escuches tu canción personalizada</span>
                </p>
              </div>

              {/* Botón de cierre */}
              <button className="btn-success" onClick={closeSuccess}>
                ¡Perfecto! Entendido
              </button>

              <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: '#6b7280' }}>
                ¡Gracias por confiar en Letra Viva! 💚🎶
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Error (¡Ups! Algo salió mal) */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          {/* 💡 CAMBIOS AQUÍ: max-w-md, max-h-[90vh], overflow-y-auto */}
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative shadow-2xl">
            {/* Icono de Cerrar Rojo */}
            <button
              onClick={closeErrorModal}
              className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-all hover:rotate-90 z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Contenido del Modal (Scroll interno gracias a las clases de arriba) */}
            <div className="p-8 text-center">
              {/* Círculo de Error Grande */}
              <div className="w-24 h-24 bg-red-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>

              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">¡Ups! Algo salió mal</h1>
              <p className="text-gray-600 mb-8">No pudimos procesar tu pedido en este momento</p>

              {/* Sección: ¿Qué pasó? */}
              <div className="bg-red-50 rounded-2xl p-4 mb-8 border-l-4 border-red-400 text-left">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-6 bg-red-400 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-red-800">¿Qué pasó?</h3>
                </div>
                <p className="text-red-700 text-sm pl-9">
                  Hubo un problema al procesar tu pedido. Esto puede deberse a un error temporal en nuestro sistema o a un problema de conexión.
                </p>
              </div>

              {/* Sección: ¿Qué puedes hacer? */}
              <div className="bg-blue-50 rounded-2xl p-6 mb-8 border-l-4 border-blue-400 text-left space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414L8 8.586 7.293 7.879a1 1 0 00-1.414 1.414l1.5 1.5a1 1 0 001.414 0l3.5-3.5z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-blue-800">¿Qué puedes hacer?</h3>
                </div>

                {/* Opción 1 */}
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 text-sm mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Intenta nuevamente:</p>
                    <p className="text-sm text-gray-700">En la mayoría de los casos, intentarlo de nuevo soluciona el problema.</p>
                  </div>
                </div>

                {/* Opción 2 */}
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 text-sm mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Verifica tu conexión:</p>
                    <p className="text-sm text-gray-700">Asegúrate de tener una conexión estable a internet y vuelve a intentar.</p>
                  </div>
                </div>

                {/* Opción 3 */}
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 text-sm mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Contáctanos directamente:</p>
                    <p className="text-sm text-gray-700">Si el problema persiste, escríbenos por WhatsApp o correo electrónico.</p>
                  </div>
                </div>
              </div>

              {/* Sección de Contacto Directo */}
              <div className="bg-yellow-50 rounded-2xl p-4 mb-6 border-l-4 border-yellow-400 text-left">
                <h3 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  Contáctanos directamente
                </h3>
                <p className="text-sm text-gray-700 font-semibold flex items-center gap-2 mb-1">
                  📞 WhatsApp: <span className="text-blue-600">+57 324 379 83 34</span>
                </p>
                <p className="text-sm text-gray-700 font-semibold flex items-center gap-2">
                  📧 Email: <span className="text-blue-600">soporte@letraviva.com</span>
                </p>
              </div>

              {/* Botón de Reintentar */}
              <div className="flex justify-end">
                <button
                  onClick={closeErrorModal}
                  className="bg-gray-200 text-gray-600 py-3 px-4 rounded-2xl font-bold text-md hover:shadow-xl transition-all hover:bg-gray-300 flex items-center justify-center gap-2"
                >               
                  Cerrar
                </button>
                <button
                  onClick={handleRetry}
                  className="ml-2 w-full bg-teal-600 text-white py-3 rounded-2xl font-bold text-lg hover:shadow-xl transition-all hover:bg-teal-700 flex items-center justify-center gap-2"
                >               
                  Intenta Nuevamente
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        :root {
          --color-primary: #11676a;
          --color-primary-dark: #2d8c89;
          --color-accent: #f89a3f;
          --color-error: #e74c3c;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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

        @keyframes checkmark {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }

        .modal-content {
          background: white;
          border-radius: 24px;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: slideUp 0.4s ease;
        }

        .modal-form-content {
          max-width: 700px;
        }

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
          background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
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
          margin: 0;
        }

        .btn-start {
          width: 100%;
          background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
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
          background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
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
          background: linear-gradient(90deg, var(--color-primary), var(--color-primary-dark));
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
          margin: 0 0 8px 0;
          font-size: 15px;
          text-align: left;
        }

        .form-fields {
          display: flex;
          text-align: left;
          flex-direction: column;
          gap: 10px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 1px;
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
          border: 0.5px solid #e5e7eb;
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
          background: white;
        }

        .whatsapp-input.error input {
          border-color: var(--color-error);
        }

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
          background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
          color: white;
          border-color: var(--color-primary);
        }

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
          border: 1px solid #e5e7eb;
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
          background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
          color: white;
          border-color: var(--color-primary);
        }

        .paquete-card.selected {
          background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark)) !important;
          color: white !important;
          border-color: var(--color-primary) !important;
        }

        .paquete-card.selected .paquete-info h3,
        .paquete-card.selected .duracion,
        .paquete-card.selected .descripcion {
          color: white !important;
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
          cursor: pointer;
          transition: all 0.3s;
          border: 2px solid transparent;
        }

        .pago-opcion:hover {
          border-color: var(--color-primary);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .pago-opcion.selected {
          background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
          border-color: var(--color-primary);
        }

        .pago-opcion.selected .pago-text strong,
        .pago-opcion.selected .pago-text p {
          color: white;
        }

        .pago-opcion.selected .check {
          color: white;
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
          background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(17, 103, 106, 0.3);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-secondary {
          background: #f3f4f6;
          color: #374151;
        }

        .btn-secondary:hover {
          background: #e5e7eb;
        }

        .success-modal {
          max-width: 550px;
        }

        .success-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #10b981, #059669);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          animation: checkmark 0.6s ease;
        }

        .success-icon svg {
          width: 48px;
          height: 48px;
          color: white;
          stroke-width: 3;
        }

        .success-title {
          font-size: 32px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 8px 0;
          text-align: center;
        }

        .success-subtitle {
          font-size: 16px;
          color: #6b7280;
          margin: 0 0 32px 0;
          text-align: center;
        }

        .order-details {
          background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
          border: 2px solid #3b82f6;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
        }

        .order-number {
          text-align: center;
          margin-bottom: 20px;
        }

        .order-number-label {
          font-size: 13px;
          color: #6b7280;
          margin: 0 0 4px 0;
        }

        .order-number-value {
          font-size: 36px;
          font-weight: 700;
          color: #3b82f6;
          margin: 0;
          animation: bounce 1s ease infinite;
        }

        .detail-grid {
          display: grid;
          text-align: start;
          gap: 12px;
        }

        .detail-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .detail-icon {
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          background: white;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }

        .detail-content {
          flex: 1;
        }

        .detail-label {
          font-size: 13px;
          color: #6b7280;
          margin: 0 0 2px 0;
        }

        .detail-value {
          font-size: 15px;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }

        .next-steps {
          background: #fffbeb;
          border: 2px solid #fbbf24;
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 24px;
        }

        .next-steps-title {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 16px 0;
        }

        .next-steps-title h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 700;
          color: #92400e;
        }

        .steps-timeline {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .timeline-step {
          display: flex;
          text-align: start;
          align-items: flex-start;
          gap: 12px;
        }

        .timeline-dot {
          flex-shrink: 0;
          width: 24px;
          height: 24px;
          background: #fbbf24;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 12px;
          font-weight: 700;
          margin-top: 2px;
        }

        .timeline-content {
          flex: 1;
          text-align: start;
          font-size: 14px;
          color: #78350f;
          line-height: 1.5;
        }

        .payment-reminder {
          background: linear-gradient(135deg, #d1fae5, #a7f3d0);
          border: 2px solid #10b981;
          border-radius: 12px;
          padding: 16px;
          text-align: center;
          margin-bottom: 24px;
        }

        .payment-reminder p {
          margin: 0;
          font-size: 15px;
          font-weight: 600;
          color: #065f46;
        }

        .btn-success {
          width: 100%;
          background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
          color: white;
          border: none;
          padding: 16px 32px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-success:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(17, 103, 106, 0.3);
        }

        @media (max-width: 768px) {
          .modal-content {
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

          .generos-scroll-container {
    max-height: 400px; /* Altura fija */
    overflow-y: auto;
    overflow-x: hidden;
    padding-right: 8px;
    margin-bottom: 16px;
    
    /* Scrollbar personalizado para webkit (Chrome, Safari, Edge) */
    scrollbar-width: thin;
    scrollbar-color: var(--color-primary) #e5e7eb;
  }

  /* Scrollbar webkit */
  .generos-scroll-container::-webkit-scrollbar {
    width: 8px;
  }

  .generos-scroll-container::-webkit-scrollbar-track {
    background: #e5e7eb;
    border-radius: 4px;
  }

  .generos-scroll-container::-webkit-scrollbar-thumb {
    background: var(--color-primary);
    border-radius: 4px;
    transition: background 0.3s;
  }

  .generos-scroll-container::-webkit-scrollbar-thumb:hover {
    background: var(--color-primary-dark);
  }

  /* Firefox scrollbar */
  .generos-scroll-container {
    scrollbar-width: thin;
    scrollbar-color: var(--color-primary) #e5e7eb;
  }

  .generos-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    /* Removido margin-bottom ya que está en el contenedor */
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
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
    color: white;
    border-color: var(--color-primary);
  }

  /* Responsive para móviles */
  @media (max-width: 768px) {
    .generos-scroll-container {
      max-height: 350px; /* Altura menor en móvil */
    }

    .generos-grid {
      grid-template-columns: 1fr; /* Una columna en móvil */
    }
  }

  @media (max-width: 480px) {
    .generos-scroll-container {
      max-height: 300px;
      padding-right: 4px;
    }

    .genero-btn {
      padding: 16px;
      font-size: 15px;
    }
  }
        }

      `}</style>
    </div>

  );
};

export default ModalCancionPersonalizada;

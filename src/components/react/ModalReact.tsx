import React, { useState, useEffect, useRef } from 'react';
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
  hideButton?: boolean;
}

// ─── Country code data ───────────────────────────────────────────────────────
const COUNTRIES = [
  { code: '+57', flag: 'https://flagcdn.com/w20/co.png', name: 'Colombia', iso: 'CO' },
  { code: '+52', flag: 'https://flagcdn.com/w20/mx.png', name: 'México', iso: 'MX' },
  { code: '+56', flag: 'https://flagcdn.com/w20/cl.png', name: 'Chile', iso: 'CL' },
  { code: '+34', flag: 'https://flagcdn.com/w20/es.png', name: 'España', iso: 'ES' },
  { code: '+51', flag: 'https://flagcdn.com/w20/pe.png', name: 'Perú', iso: 'PE' },
  { code: '+502', flag: 'https://flagcdn.com/w20/gt.png', name: 'Guatemala', iso: 'GT' },
  { code: '+1', flag: 'https://flagcdn.com/w20/us.png', name: 'USA', iso: 'US' },
  { code: '+598', flag: 'https://flagcdn.com/w20/uy.png', name: 'Uruguay', iso: 'UY' },
  { code: '+593', flag: 'https://flagcdn.com/w20/ec.png', name: 'Ecuador', iso: 'EC' },
  { code: '+595', flag: 'https://flagcdn.com/w20/py.png', name: 'Paraguay', iso: 'PY' },
];

const ModalCancionPersonalizada: React.FC<ModalCancionPersonalizadaProps> = ({ variants, hideButton = false }) => {
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
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  // ─── Country selector state ────────────────────────────────────────────────
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]); // Colombia default
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCountryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [formData, setFormData] = useState({
    nombre: "",
    personaSorprender: "",
    menciona: "",
    paraQuien: "",
    ocasion: "",
    tonoEmocional: "",
    historia: "",
    whatsapp: "",
    email: "",
    genero: "",
    paquete: "",
    metodoPago: "",
    otroGenero: "",
    voz: ""
  });

  const [errors, setErrors] = useState({
    nombre: false,
    personaSorprender: false,
    menciona: false,
    paraQuien: false,
    ocasion: false,
    tonoEmocional: false,
    historia: false,
    whatsapp: false,
    email: false,
    genero: false,
    paquete: false,
    metodoPago: false,
    otroGenero: false,
    voz: false
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
    const urlParams = new URLSearchParams(window.location.search);
    const ventaExitosa = urlParams.get('venta');
    if (ventaExitosa === 'true') {
      setShowPaymentSuccess(true);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  useEffect(() => {
    const handleOpenModal = () => { openWelcome(); };
    EventBus.on('openSongModal', handleOpenModal);
    window.addEventListener("openSongModal", handleOpenModal);

    return () => {
      EventBus.remove('openSongModal', handleOpenModal);
      window.removeEventListener("openSongModal", handleOpenModal);
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
    { id: "Espiritual", label: "Espiritual", emoji: "🙏", color: "bg-teal-500" },
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

  const voz = [
    { id: "masculina", label: "Masculina", emoji: "👨" },
    { id: "femenina", label: "Femenina", emoji: "👩" },
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
    { id: "bachata", label: "Bachata", icon: "🎶", color: "bg-blue-800" },
    { id: "afrobeat", label: "Afrobeat", icon: "🎸", color: "bg-blue-800" },
    { id: "otro", label: "Otro", icon: "🎭", color: "bg-blue-800" },
  ];

  const openErrorModal = () => {
    setShowForm(false);
    setShowWelcome(false);
    setShowSuccess(false);
    setShowErrorModal(true);
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
    setIsSubmitting(false);
  };

  const handleRetry = () => {
    closeErrorModal();
    setShowForm(true);
    setCurrentStep(steps.length - 1);
  };

  const parseVariantInfo = (title: string) => {
    const fixed = fixEncoding(title);
    const nameMatch = fixed.match(/^(.*?)\s*–/);
    const nombre = nameMatch ? nameMatch[1].trim() : title;
    const subtitleMatch = title.match(/–\s*(.*?)\s*\|/);
    const subtitle = subtitleMatch ? subtitleMatch[1].trim() : '';
    const durationMatch = title.match(/\(([^)]+min[^)]*)\)/i);
    const duracion = durationMatch ? durationMatch[1].trim() : '';
    return { nombre, subtitle, duracion };
  };

  const fixEncoding = (str: string): string => {
  try {
    return decodeURIComponent(escape(str));
  } catch {
    return str;
  }
};

  const getFeatures = (title: string) => {
    const features = [];
    const afterDuration = title.split(/\)/)[1] || '';
    if (afterDuration.includes('MP3')) {
      const formatMatch = afterDuration.match(/MP3\s+([^+\-]+)/);
      const format = formatMatch ? formatMatch[1].trim() : '';
      features.push({ text: format ? `MP3 ${format}` : 'Canción en MP3', icon: '🎧' });
    }
    if (afterDuration.includes('Tarjeta Digital')) {
      features.push({ text: 'Tarjeta Digital Personalizada', icon: '💳' });
    }
    if (afterDuration.includes('Video')) {
      features.push({ text: 'Video Lyric Animado', icon: '🎥' });
    }
    if (afterDuration.match(/\d+\s*Foto/i)) {
      const photoMatch = afterDuration.match(/(\d+)\s*Foto/i);
      const count = photoMatch ? photoMatch[1] : '1';
      features.push({ text: `${count} Foto${count !== '1' ? 's' : ''} Para La Portada`, icon: '📷' });
    }
    return features;
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('es-CO').format(parseFloat(price));
  };

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
    const eventId = crypto.randomUUID();
    fetch("/api/meta-conversion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: "Lead",
        event_id: eventId,
        event_source_url: window.location.href,
        user_agent: navigator.userAgent,
        custom_data: { content_name: "Modal canción personalizada R", variant_id: 0 },
      }),
    });
  };

  const closeForm = () => { setShowForm(false); };
  const closeSuccess = () => { setShowSuccess(false); setOrderSuccess(null); };
  const closePaymentSuccess = () => { setShowPaymentSuccess(false); };

  const validateCurrentStep = () => {
    let isValid = true;
    const newErrors = { ...errors };
    switch (currentStep) {
      case 0:
        newErrors.nombre = !formData.nombre.trim();
        newErrors.paraQuien = !formData.paraQuien;
        newErrors.personaSorprender = !formData.personaSorprender;
        newErrors.menciona = !formData.menciona;
        newErrors.ocasion = !formData.ocasion;
        newErrors.tonoEmocional = !formData.tonoEmocional;
        isValid = !newErrors.nombre && !newErrors.paraQuien && !newErrors.ocasion && !newErrors.tonoEmocional && !newErrors.personaSorprender && !newErrors.menciona;
        break;
      case 1:
        newErrors.historia = formData.historia.trim().length < 20;
        isValid = !newErrors.historia;
        break;
      case 2:
        newErrors.whatsapp = formData.whatsapp.trim().length < 6;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        newErrors.email = !formData.email.trim() || !emailRegex.test(formData.email);
        isValid = !newErrors.whatsapp && !newErrors.email;
        break;
      case 3:
        newErrors.genero = !formData.genero;
        newErrors.voz = !formData.voz;
        newErrors.otroGenero = (formData.genero === "otro" && !formData.otroGenero);
        isValid = !newErrors.genero && !newErrors.voz && !newErrors.otroGenero;
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
      if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  useEffect(() => {
    const nav = document.querySelector('nav');
    if (showWelcome || showForm || showSuccess || showErrorModal || showPaymentSuccess) {
      nav?.classList.add('hidden');
      document.body.style.overflow = 'hidden';
    } else {
      nav?.classList.remove('hidden');
      document.body.style.overflow = '';
    }
    return () => {
      nav?.classList.remove('hidden');
      document.body.style.overflow = '';
    };
  }, [showWelcome, showForm, showSuccess, showErrorModal, showPaymentSuccess]);

  const sendMetaInitiateCheckout = async ({ value, packageName }: { value: number; packageName: string }) => {
    try {
      await fetch("/api/meta-conversion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_name: "InitiateCheckout",
          event_source_url: window.location.href,
          event_id: crypto.randomUUID(),
          user_agent: navigator.userAgent,
          custom_data: { currency: "USD", value, payment_method: "online", package_name: packageName },
        }),
      });
    } catch { }
  };

  // Build the full WhatsApp number with country prefix
  const getFullWhatsapp = () => `${selectedCountry.code}${formData.whatsapp.replace(/^0+/, '')}`;

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;
    setIsSubmitting(true);
    try {
      const selectedPaquete = paquetes.find(p => p.id === formData.paquete);
      const selectedGenero = generos.find(g => g.id === formData.genero);
      const nombreCompleto = formData.nombre.trim().split(' ');
      const firstName = nombreCompleto[0] || 'Cliente';
      const lastName = nombreCompleto.slice(1).join(' ') || 'Letra Viva';
      const fullPhone = getFullWhatsapp();
      const phoneClean = fullPhone.replace(/[^\d+]/g, '');

      const orderData = {
        line_items: [{ variant_id: selectedPaquete?.variantId || 0, quantity: 1 }],
        customer: { first_name: firstName, last_name: lastName, phone: phoneClean, email: formData.email },
        billing_address: {
          first_name: firstName, last_name: lastName,
          address1: 'Dirección no especificada', address2: '',
          city: 'Medellín', province: 'Antioquia', country: 'Colombia', zip: '050001', phone: phoneClean
        },
        shipping_address: {
          first_name: firstName, last_name: lastName,
          address1: 'Dirección no especificada', address2: '',
          city: 'Medellín', province: 'Antioquia', country: 'Colombia', zip: '050001', phone: phoneClean
        },
        note_attributes: [
          { name: "Nombre", value: formData.nombre },
          { name: "Persona a sorprender", value: formData.personaSorprender },
          { name: "Menciona cancion", value: formData.menciona },
          { name: "Para quien", value: formData.paraQuien },
          { name: "Ocasion", value: formData.ocasion },
          { name: "Tono Emocional", value: formData.tonoEmocional },
          { name: "Historia", value: formData.historia },
          { name: "Genero musical", value: selectedGenero?.label || "" },
          { name: "WhatsApp", value: fullPhone },
          { name: "Email", value: formData.email },
          { name: "Otro Genero", value: formData.otroGenero },
          { name: "Voz", value: formData.voz },
          { name: "Prefijo", value: selectedCountry.code },
          { name: "Metodo de Pago", value: formData.metodoPago === "online" ? "Pago en Linea" : "Contra Entrega" }
        ],
        note: `Historia: ${formData.historia}\n\nPara: ${formData.paraQuien}\nOcasion: ${formData.ocasion}\nTono: ${formData.tonoEmocional}\nGenero: ${selectedGenero?.label || ""}`
      };

      const endpoint = formData.metodoPago === "online"
        ? '/api/shopify/create-checkout'
        : '/api/shopify/create-order';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const responseText = await response.text();
      let data;
      try { data = JSON.parse(responseText); } catch (e) {
        throw new Error(`Respuesta inválida del servidor: ${responseText}`);
      }

      if (!data.success) throw new Error(data.message || 'Error al procesar el pedido');

      closeForm();

      if (formData.metodoPago === "online") {
        await sendMetaInitiateCheckout({
          value: Number(selectedPaquete?.precio || 0),
          packageName: selectedPaquete?.nombre || "",
        });
        window.location.href = data.checkoutUrl;
      } else {
        setOrderSuccess({
          orderNumber: data.orderNumber,
          nombre: formData.nombre,
          paquete: selectedPaquete?.nombre || '',
          precio: selectedPaquete?.precio || '',
          whatsapp: fullPhone
        });
        setShowSuccess(true);
        setFormData({
          nombre: "", personaSorprender: "", menciona: "", paraQuien: "",
          ocasion: "", tonoEmocional: "", historia: "", whatsapp: "",
          email: "", genero: "", paquete: "", metodoPago: "", otroGenero: "", voz: ""
        });
        setCurrentStep(0);
      }
    } catch (error) {
      console.error('Error al crear pedido:', error);
      openErrorModal();
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressWidth = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="w-full">

      {/* Botón Principal */}
      {!hideButton && (
        <button
          onClick={openWelcome}
          className="group cursor-pointer relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#f89a3f] via-[#ff6b35] to-[#f89a3f] hover:from-[#ff6b35] hover:via-[#f89a3f] hover:to-[#ff6b35] text-white px-6 py-4 rounded-full text-lg font-bold transition-all duration-500 hover:scale-[1.02] w-full max-w-lg mx-auto md:w-auto md:max-w-none overflow-hidden border-2 border-[#ff6b35]/30 shadow-xl"
        >
          <span className="relative z-10 flex items-center gap-3">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"></path>
          </svg>
          <span>¡Toca aquí para crear tu canción personalizada!</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </span>
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
      </button>
      )}
      {/* Modal de Pago Exitoso */}
      {showPaymentSuccess && (
        <div className="modal-overlay" onClick={closePaymentSuccess}>
          <div className="modal-content success-modal md:px-6 md:py-1" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closePaymentSuccess} aria-label="Cerrar">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="welcome-content">
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-xl animate-bounce-in">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-white stroke-[3]">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-semibold">¡Pago Exitoso!</h2>
              <p className="my-1">Tu pedido ha sido procesado correctamente</p>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-6 space-y-4 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-600 font-semibold">Confirmación enviada</p>
                    <p className="text-xs text-gray-500">Revisa tu correo electrónico</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 text-left">Hemos enviado toda la información de tu pedido a tu correo electrónico. Si no lo encuentras, revisa tu carpeta de spam.</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl p-6 space-y-4 mb-2">
                <div className="flex items-center gap-2 text-amber-800">
                  <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg">¿Qué sigue ahora?</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { n: 1, title: "Contacto en 24 horas:", desc: "Nuestro equipo se comunicará contigo por WhatsApp para confirmar todos los detalles de tu canción." },
                    { n: 2, title: "Creación prioritaria:", desc: "Tu pago nos permite iniciar inmediatamente con la creación de tu canción personalizada." },
                    { n: 3, title: "Entrega rápida:", desc: "Recibirás tu canción lista en aproximadamente 24 horas." },
                  ].map(s => (
                    <div key={s.n} className="flex gap-3">
                      <div className="w-7 h-7 bg-amber-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">{s.n}</div>
                      <div>
                        <p className="font-semibold text-gray-700 text-left">{s.title}</p>
                        <p className="text-sm text-gray-700 text-left">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 border-2 border-teal-200 rounded-2xl p-5 text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <p className="font-semibold text-teal-900">¿Necesitas ayuda?</p>
                </div>
                <p className="text-sm text-teal-800">Contáctanos por WhatsApp: <span className="font-bold">+57 324 379 83 34</span></p>
              </div>
              <button className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2" onClick={closePaymentSuccess}>
                ¡Entendido!
              </button>
              <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: '#6b7280' }}>¡Gracias por confiar en Letra Viva! 💚🎶</p>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Bienvenida */}
      {showWelcome && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button onClick={() => setShowWelcome(false)} className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-all hover:rotate-90 z-10">
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
                      <div className="w-10 h-10 bg-gradient-to-r from-[#f89a3f] via-[#ff6b35] to-[#f89a3f] rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0 shadow-md">{step.num}</div>
                      <p className="text-teal-800 font-medium">{step.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => { setShowWelcome(false); setShowForm(true); }} className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2">
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
                <div className="text-xs font-bold text-teal-700 bg-teal-100 px-3 py-1 rounded-full">PASO {currentStep + 1} DE {steps.length}</div>
                <div className="text-xs text-gray-500">{Math.round(progressWidth)}% completado</div>
              </div>
              <div className="h-2 bg-teal-100 rounded-full overflow-hidden mb-4">
                <div className="h-full bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-500 rounded-full" style={{ width: `${progressWidth}%` }} />
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
                  <h2 className="text-2xl font-bold text-gray-900 truncate">{steps[currentStep].title}</h2>
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
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-100 transition-all ${errors.nombre ? 'border-red-400' : 'border-gray-200 focus:border-teal-500'}`}
                    />
                  </div>
                  <div className='flex flex-col md:flex-row gap-4'>
                    <div className='flex-1'>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <span className="text-teal-600">😲</span> Persona a sorprender
                      </label>
                      <input
                        type="text"
                        value={formData.personaSorprender}
                        onChange={(e) => setFormData({ ...formData, personaSorprender: e.target.value })}
                        placeholder="Persona a sorprender"
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-100 transition-all ${errors.personaSorprender ? 'border-red-400' : 'border-gray-200 focus:border-teal-500'}`}
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <span className="text-teal-600">🔔</span> Se menciona en la canción
                      </label>
                      <input
                        type="text"
                        value={formData.menciona}
                        onChange={(e) => setFormData({ ...formData, menciona: e.target.value })}
                        placeholder="Si/No"
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-100 transition-all ${errors.menciona ? 'border-red-400' : 'border-gray-200 focus:border-teal-500'}`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                      <span className="text-teal-600">💝</span> Tono emocional
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
                      {tonosEmocionales.map((tono) => (
                        <button key={tono.id} onClick={() => setFormData({ ...formData, tonoEmocional: tono.id })} className={`p-2 rounded-xl border-2 transition-all flex items-center gap-3 cursor-pointer ${formData.tonoEmocional === tono.id ? 'border-teal-500 bg-teal-50 shadow-md scale-105' : 'border-gray-200 hover:border-teal-300 hover:shadow-sm'}`}>
                          <div className="h-10 flex items-center justify-center text-white">{tono.emoji}</div>
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
                        <button key={option.id} onClick={() => setFormData({ ...formData, paraQuien: option.id })} className={`p-1 rounded-xl border-2 transition-all text-center cursor-pointer ${formData.paraQuien === option.id ? 'border-teal-500 bg-teal-50 shadow-md scale-105' : 'border-gray-200 hover:border-teal-300 hover:shadow-sm'}`}>
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
                        <button key={ocasion.id} onClick={() => setFormData({ ...formData, ocasion: ocasion.id })} className={`p-1 rounded-xl border-2 transition-all text-center cursor-pointer ${formData.ocasion === ocasion.id ? 'border-teal-500 bg-teal-50 shadow-md scale-105' : 'border-gray-200 hover:border-teal-300 hover:shadow-sm'}`}>
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
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-100 transition-all resize-none ${errors.historia ? 'border-red-400' : 'border-gray-200 focus:border-teal-500'}`}
                  />
                  <div className="flex flex-col items-center justify-between mt-2 text-sm">
                    <span className={formData.historia.length >= 20 ? 'text-teal-600 font-semibold flex items-center gap-1' : 'text-gray-500'}>
                      {formData.historia.length >= 20 && <span>✓</span>}
                      Mínimo 20 caracteres · {formData.historia.length} escritos
                    </span>
                    {formData.historia.length >= 20 && <span className="text-teal-600 font-semibold">¡Perfecto!</span>}
                  </div>
                </div>
              )}

              {/* ─── Paso 2: Información de Contacto ──────────────────────────────────── */}
              {currentStep === 2 && (
                <div className="space-y-4">

                  {/* WhatsApp con selector de país */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp
                    </label>

                    {/* Phone input row */}
                    <div className={`flex items-stretch border-2 rounded-xl overflow-visible transition-all focus-within:ring-4 focus-within:ring-teal-100 ${errors.whatsapp ? 'border-red-400' : 'border-gray-200 focus-within:border-teal-500'}`}>

                      {/* ── Country selector ── */}
                      <div className="relative flex-shrink-0" ref={dropdownRef}>
                        <button
                          type="button"
                          onClick={() => setCountryDropdownOpen(prev => !prev)}
                          className="flex items-center gap-1.5 px-3 py-3 bg-gray-50 hover:bg-gray-100 transition-colors h-full border-r border-gray-200 rounded-l-xl"
                          style={{ minWidth: '90px' }}
                        >
                          <img src={selectedCountry.flag} alt={selectedCountry.name} className="w-5 h-auto rounded-sm" />
                          <span className="text-sm font-semibold text-gray-700">{selectedCountry.code}</span>
                          <svg
                            className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${countryDropdownOpen ? 'rotate-180' : ''}`}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {/* Dropdown list */}
                        {countryDropdownOpen && (
                          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden"
                            style={{ minWidth: '160px', zIndex: 9999 }}>
                            <div className="max-h-64 overflow-y-auto">
                              {COUNTRIES.map((country) => (
                                <button
                                  key={country.iso}
                                  type="button"
                                  onClick={() => {
                                    setSelectedCountry(country);
                                    setCountryDropdownOpen(false);
                                  }}
                                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-teal-50 transition-colors ${selectedCountry.iso === country.iso ? 'bg-teal-50' : ''}`}
                                >
                                  <img src={country.flag} alt={country.name} className="w-5 h-4 rounded-sm" />
                                  <span className="text-sm font-semibold text-gray-700 font-mono">{country.code}</span>
                                  {selectedCountry.iso === country.iso && (
                                    <svg className="w-3.5 h-3.5 text-teal-600 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* ── Phone number input ── */}
                      <input
                        type="tel"
                        value={formData.whatsapp}
                        onChange={(e) => {
                          // Only allow digits, spaces, dashes, parentheses
                          const val = e.target.value.replace(/[^\d\s\-()]/g, '');
                          setFormData({ ...formData, whatsapp: val });
                          if (errors.whatsapp) setErrors({ ...errors, whatsapp: false });
                        }}
                        placeholder="300 123 4567"
                        className="flex-1 px-4 py-3 bg-white focus:outline-none rounded-r-xl text-gray-800 placeholder-gray-400"
                      />
                    </div>

                    {/* Preview of full number */}
                    {formData.whatsapp.trim().length > 0 && (
                      <p className="text-xs text-teal-600 mt-1.5 font-medium flex items-center gap-1">
                        <span>📲</span>
                        Número completo: <span className="font-bold">{selectedCountry.code} {formData.whatsapp}</span>
                      </p>
                    )}

                  </div>

                  {/* Email */}
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
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-100 transition-all ${errors.email ? 'border-red-400' : 'border-gray-200 focus:border-teal-500'}`}
                    />
                    <p className="text-xs text-gray-500 mt-1 text-left">• Recibirás la confirmación aquí</p>
                  </div>
                </div>
              )}

              {/* Paso 3: Elige Tu Estilo Musical */}
              {currentStep === 3 && (
                <div>
                  <div className="max-h-96 pr-2">
                    <div className='mb-3'>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <span className="text-teal-600">🔊</span> Tipo de voz para la canción
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {voz.map((v) => (
                          <button key={v.id} onClick={() => setFormData({ ...formData, voz: v.id })} className={`p-1 rounded-xl border-2 transition-all text-center cursor-pointer ${formData.voz === v.id ? 'border-teal-500 bg-teal-50 shadow-md scale-105' : errors.voz ? 'border-red-400' : 'border-gray-200 focus:border-teal-500'}`}>
                            <div className="text-3xl mb-1">{v.emoji}</div>
                            <div className="text-xs font-semibold text-gray-800">{v.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {generos.map((genero) => (
                        <button key={genero.id} onClick={() => setFormData({ ...formData, genero: genero.id })} className={`relative p-2 mx-1 rounded-xl border-2 transition-all text-center overflow-hidden cursor-pointer ${formData.genero === genero.id ? 'border-teal-500 shadow-lg scale-105' : 'border-gray-200 hover:border-teal-300 hover:shadow-sm'}`}>
                          <div className={`absolute inset-0 ${genero.color} opacity-${formData.genero === genero.id ? '21' : '10'} transition-opacity`}></div>
                          <div className="relative z-10">
                            <div className={`text-2xl mb-2 ${formData.genero === genero.id ? 'text-white' : 'text-gray-800'}`}>{genero.icon}</div>
                            <div className={`text-sm font-bold ${formData.genero === genero.id ? 'text-white' : 'text-gray-800'}`}>{genero.label}</div>
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
                    {formData.genero === "otro" && (
                      <div className='my-3'>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <span className="text-teal-600">🎭</span> Escribe el género musical
                        </label>
                        <input
                          type="text"
                          value={formData.otroGenero}
                          onChange={(e) => setFormData({ ...formData, otroGenero: e.target.value })}
                          autoFocus
                          placeholder=""
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-100 transition-all ${errors.otroGenero ? 'border-red-400' : 'border-gray-200 focus:border-teal-500'}`}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Paso 4: Selecciona Tu Paquete */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  {paquetes.sort((a, b) => a.position - b.position).map((paquete) => (
                    <button key={paquete.id} onClick={() => setFormData({ ...formData, paquete: paquete.id })} className={`relative w-full p-5 rounded-2xl border-2 transition-all text-left cursor-pointer ${formData.paquete === paquete.id ? 'border-teal-500 bg-gradient-to-br from-teal-50 to-teal-100 shadow-xl scale-105' : paquete.highlighted ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50' : 'border-gray-200 bg-white hover:border-teal-300 hover:shadow-md'}`}>
                      {paquete.highlighted && formData.paquete !== paquete.id && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md">⭐ POPULAR</div>
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
                          {paquete.subtitle && <p className="text-sm font-semibold text-teal-700">{paquete.subtitle}</p>}
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-2xl font-black text-teal-600">{paquete.precio}</div>
                          <div className="text-xs text-gray-500 font-semibold">USD</div>
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
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">DETALLES</h3>
                    <div className="space-y-3">
                      {[
                        { icon: "👤", label: "Nombre", value: formData.nombre },
                        { icon: "👥", label: "Persona a Soprender", value: formData.personaSorprender },
                        { icon: "🎁", label: "Para", value: paraQuienOptions.find(p => p.id === formData.paraQuien)?.label },
                        { icon: "💝", label: "Tono", value: tonosEmocionales.find(t => t.id === formData.tonoEmocional)?.label },
                        { icon: "📅", label: "Ocasión", value: ocasiones.find(o => o.id === formData.ocasion)?.label },
                        { icon: "🎵", label: "Género", value: generos.find(g => g.id === formData.genero)?.label === "Otro" ? formData.otroGenero : generos.find(g => g.id === formData.genero)?.label },
                        { icon: "📱", label: "WhatsApp", value: getFullWhatsapp() },
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
                            <div className="text-xs text-gray-500 font-semibold">USD</div>
                          </div>
                        </div>
                      </div>
                    ) : null;
                  })()}

                  <div>
                    <div className="flex items-start gap-3 p-4 bg-teal-50 rounded-lg border border-teal-200">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-amber-600 shrink-0 mt-0.5">
                        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                      </svg>
                      <p className="text-sm text-gray-700"><span className="font-semibold">Más de 10.000 clientes felices</span> ya han confiado en Letra Viva</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mt-3 md:flex md:items-start md:justify-start">
                      <div className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-green-600 shrink-0 mt-0.5">
                          <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <p className="text-sm font-semibold text-gray-700">Paga seguro con</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-1 md:gap-3 ml-8 mt-2 md:mt-0">
                        <img src="https://cdn.shopify.com/shopifycloud/admin-ui-foundations/payment-icons/c8dd7.svg" alt="Mercado Pago" className="payment-icon border-base size-base" />
                        <img src="https://cdn.shopify.com/shopifycloud/admin-ui-foundations/payment-icons/4e117.svg" alt="PayPal" className="payment-icon border-base size-base" />
                        <img src="https://cdn.shopify.com/shopifycloud/admin-ui-foundations/payment-icons/1626b.svg" alt="Nequi" className="payment-icon border-base size-base" />
                        <img src="https://cdn.shopify.com/shopifycloud/admin-ui-foundations/payment-icons/15a9f.svg" alt="DaviPlata" className="payment-icon border-base size-base" />
                        <img src="https://cdn.shopify.com/shopifycloud/admin-ui-foundations/payment-icons/0c7fe.svg" alt="Bancolombia" className="payment-icon border-base size-base" />
                        <img src="https://cdn.shopify.com/shopifycloud/admin-ui-foundations/payment-icons/d3e3d.svg" alt="PSE" className="payment-icon border-base size-base" />

                        <span className="text-xs text-gray-500 font-medium">+ Más</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200 mt-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-amber-600 shrink-0 mt-0.5">
                        <path d="m11 17 2 2a1 1 0 1 0 3-3"></path>
                        <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"></path>
                        <path d="m21 3 1 11h-2"></path>
                        <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"></path>
                        <path d="M3 4h8"></path>
                      </svg>
                      <p className="text-sm text-gray-700"><span className="font-semibold text-amber-600">Recuerda</span> que puedes hacer hasta <span className="font-semibold">3 modificaciones a la canción</span> si algo no te gusta👌🏼</p>
                    </div>
                  <div className="flex items-start gap-3 p-4 bg-teal-50 rounded-lg border border-teal-200 mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-teal-600 shrink-0 mt-0.5">
                      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"></path>
                      <path d="M9 18h6"></path>
                      <path d="M10 22h4"></path>
                    </svg>
                    <p className="text-sm text-gray-700">Los precios están en USD Tu banco o pasarela de pago convierte el valor automáticamente a tu moneda, sin que tengas que hacer nada.</p>
                  </div>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-5 border-2 border-yellow-300">
                    <div className="flex items-center gap-2 mb-4">
                      <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                      </svg>
                      <h3 className="text-base font-bold text-amber-900">Selecciona el Método de Pago</h3>
                    </div>
                    <div className="space-y-3">
                      <button onClick={() => setFormData({ ...formData, metodoPago: 'online' })} className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 cursor-pointer ${formData.metodoPago === 'online' ? 'border-teal-500 bg-teal-50 shadow-md' : 'border-gray-200 bg-white hover:border-teal-300'}`}>
                        <div className="text-2xl">💳</div>
                        <div className="flex-1 text-left">
                          <div className="font-bold text-gray-900 text-sm">Pago en Línea</div>
                          <div className="text-xs text-gray-600">Salta la fila y recibe tu canción en solo 24 Horas</div>
                        </div>
                      </button>
                    </div>
                    {errors.metodoPago && <p className="text-red-500 text-sm mt-2">Selecciona un método de pago</p>}
                  </div>
                </div>
              )}
            </div>

            {/* Botones de navegación */}
            <div className="border-t-2 border-gray-100 p-6 bg-white flex items-center gap-4">
              {currentStep > 0 && (
                <button onClick={prevStep} className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-all flex items-center gap-2 cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Atrás
                </button>
              )}
              {currentStep < steps.length - 1 ? (
                <button onClick={nextStep} className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer">
                  Siguiente
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button onClick={handleSubmit} disabled={isSubmitting} className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white font-bold hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer">
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
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-xl animate-bounce-in">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-white stroke-[3]">
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
                  {[
                    { icon: "👤", label: "Cliente", value: orderSuccess.nombre },
                    { icon: "🎵", label: "Paquete Seleccionado", value: orderSuccess.paquete },
                    { icon: "🔥", label: "Total a Pagar", value: orderSuccess.precio },
                    { icon: "📱", label: "WhatsApp", value: orderSuccess.whatsapp },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                        <span className="text-xl">{item.icon}</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 text-left">{item.label}</p>
                        <p className="font-semibold text-gray-900 text-left">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl p-6 space-y-4 mt-2">
                <div className="flex items-center gap-2 text-amber-800">
                  <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg">¿Qué sigue ahora?</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { n: 1, title: "Contacto en 24 horas:", desc: "Nuestro equipo se comunicará contigo por WhatsApp para confirmar todos los detalles de tu canción." },
                    { n: 2, title: "Creación:", desc: "Comenzaremos a trabajar en tu canción personalizada con todo el amor y dedicación que mereces." },
                    { n: 3, title: "Entrega:", desc: "Te enviaremos un adelanto para que escuches tu canción antes de pagar." },
                  ].map(s => (
                    <div key={s.n} className="flex gap-3">
                      <div className="w-7 h-7 bg-amber-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">{s.n}</div>
                      <div>
                        <p className="font-semibold text-gray-700 text-left">{s.title}</p>
                        <p className="text-sm text-gray-700 text-left">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 border-2 border-teal-200 rounded-2xl p-5 text-center my-2">
                <p className="text-teal-900 font-semibold flex items-center justify-center gap-2">
                  <span className="text-2xl">💵</span>
                  <span>Pagarás cuando recibas y escuches tu canción personalizada</span>
                </p>
              </div>
              <button className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2" onClick={closeSuccess}>
                ¡Perfecto! Entendido
              </button>
              <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: '#6b7280' }}>¡Gracias por confiar en Letra Viva! 💚🎶</p>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Error */}
      {showErrorModal && (
        <div className="modal-overlay">
          <div className="modal-content modal-form-content">
            <button onClick={closeErrorModal} className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-all hover:rotate-90 z-10">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-8 text-center">
              <div className="w-24 h-24 bg-red-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">¡Ups! Algo salió mal</h1>
              <p className="text-gray-600 mb-8">No pudimos procesar tu pedido en este momento</p>
              <div className="bg-red-50 rounded-2xl p-4 mb-8 border-l-4 border-red-400 text-left">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-6 bg-red-400 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-red-800">¿Qué pasó?</h3>
                </div>
                <p className="text-red-700 text-sm pl-9">Hubo un problema al procesar tu pedido. Esto puede deberse a un error temporal en nuestro sistema o a un problema de conexión.</p>
              </div>
              <div className="bg-blue-50 rounded-2xl p-6 mb-8 border-l-4 border-blue-400 text-left space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414L8 8.586 7.293 7.879a1 1 0 00-1.414 1.414l1.5 1.5a1 1 0 001.414 0l3.5-3.5z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-blue-800">¿Qué puedes hacer?</h3>
                </div>
                {[
                  { n: 1, title: "Intenta nuevamente:", desc: "En la mayoría de los casos, intentarlo de nuevo soluciona el problema." },
                  { n: 2, title: "Verifica tu conexión:", desc: "Asegúrate de tener una conexión estable a internet y vuelve a intentar." },
                  { n: 3, title: "Contáctanos directamente:", desc: "Si el problema persiste, escríbenos por WhatsApp o correo electrónico." },
                ].map(s => (
                  <div key={s.n} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 text-sm mt-0.5">{s.n}</div>
                    <div>
                      <p className="font-semibold text-gray-800 mb-1">{s.title}</p>
                      <p className="text-sm text-gray-700">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-yellow-50 rounded-2xl p-4 mb-6 border-l-4 border-yellow-400 text-left">
                <h3 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  Contáctanos directamente
                </h3>
                <p className="text-sm text-gray-700 font-semibold flex items-center gap-2 mb-1">📞 WhatsApp: <span className="text-blue-600">+57 324 379 83 34</span></p>
                <p className="text-sm text-gray-700 font-semibold flex items-center gap-2">📧 Email: <span className="text-blue-600">contactoletraviva@gmail.com</span></p>
              </div>
              <div className="flex justify-end">
                <button onClick={closeErrorModal} className="bg-gray-200 text-gray-600 py-3 px-4 rounded-2xl font-bold text-md hover:shadow-xl transition-all hover:bg-gray-300 flex items-center justify-center gap-2">Cerrar</button>
                <button onClick={handleRetry} className="ml-2 w-full bg-teal-600 text-white py-3 rounded-2xl font-bold text-lg hover:shadow-xl transition-all hover:bg-teal-700 flex items-center justify-center gap-2">Intenta Nuevamente</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes checkmark {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.6);
          display: flex; align-items: center; justify-content: center;
          z-index: 10; padding: 20px; animation: fadeIn 0.3s ease;
        }
        .modal-content {
          background: white; border-radius: 24px; width: 100%;
          max-width: 600px; max-height: 90vh; overflow-y: auto;
          position: relative; animation: slideUp 0.4s ease;
        }
        .modal-form-content { max-width: 700px; }
        .close-btn {
          position: absolute; top: 16px; right: 16px;
          background: rgba(255,255,255,0.9); border: none;
          width: 40px; height: 40px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.3s; z-index: 10;
        }
        .close-btn:hover { background: white; transform: rotate(90deg); }
        @media (max-width: 768px) {
          .modal-content { max-width: 100%; max-height: 100vh; }
          .welcome-content { padding: 60px 24px 24px; }
        }
      `}</style>
    </div>
  );
};

export default ModalCancionPersonalizada;

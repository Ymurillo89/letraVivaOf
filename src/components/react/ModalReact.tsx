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
      title: "Elige Tu Género Musical",
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
    { id: "pop", label: "Pop" },
    { id: "reggaeton", label: "Reggaeton" },
    { id: "balada", label: "Balada" },
    { id: "rock", label: "Rock" },
    { id: "vallenato", label: "Vallenato" },
    { id: "salsa", label: "Salsa" },
    { id: "Cumbia", label: "Cumbia" },
    { id: "Merengue", label: "Merengue" },
    { id: "Afro Beat", label: "Afro Beat" },
    { id: "Bolero", label: "Bolero" },
    { id: "Ranchera", label: "Ranchera" },
    { id: "Tango", label: "Tango" },
    { id: "Música Popular", label: "Música Popular" },
    { id: "Trap Latino", label: "Trap Latino" },
    { id: "R&B", label: "R&B" },
    { id: "Jazz", label: "Jazz" },
    { id: "Hip hop", label: "Hip hop" },
    { id: "Indie/Alternativo", label: "Indie/Alternativo" },
    { id: "Sorprende", label: "Sorprende" },
  ];

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
      alert(error instanceof Error ? error.message : 'Hubo un error al procesar tu pedido. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressWidth = ((currentStep + 1) / steps.length) * 100;



  return (
    <div className="w-full">
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
        <div className="modal-overlay" onClick={closeWelcome}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeWelcome} aria-label="Cerrar">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="welcome-content">
              <div className="text-5xl md:text-6xl mb-4 animate-bounce">🎵</div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">

              </h1>
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#11676a] to-[#2d8c89]">
                ¡Letra Viva!
              </h2>
              <p className="text-lg text-gray-600">
                Donde tus emociones se convierten en música
              </p>

              <div className="how-it-works">
                <h3 className="text-xl font-bold text-gray-900 mb-3">¿Cómo funciona?</h3>
                <p className="text-gray-700 mb-6 font-semibold">Solo 4 pasos simples:</p>

                <div className="steps-list">
                  <div className="step-item">
                    <div className="step-number">1</div>
                    <p>Cuéntanos tu historia especial</p>
                  </div>

                  <div className="step-item">
                    <div className="step-number">2</div>
                    <p>Danos tu WhatsApp para la entrega</p>
                  </div>

                  <div className="step-item">
                    <div className="step-number">3</div>
                    <p>Elige el género y estilo musical</p>
                  </div>

                  <div className="step-item">
                    <div className="step-number">4</div>
                    <p>Selecciona tu paquete y método de pago</p>
                  </div>
                </div>
              </div>

              <button className="btn-start" onClick={startForm}>
                Comenzar Ahora
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
            <div className="progress-container">
              <div className="step-circle">{currentStep + 1}</div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progressWidth}%` }}></div>
              </div>
            </div>

            {/* Contenido del paso actual */}
            <div className="form-content">
              <h2 className="form-title">{steps[currentStep].title}</h2>
              <p className="form-subtitle">{steps[currentStep].subtitle}</p>

              {/* Paso 0: Información Básica */}
              {currentStep === 0 && (
                <div className="form-fields">
                  <div className="form-group">
                    <label>Tu nombre <span className="required">*</span></label>
                    <input
                      type="text"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      placeholder="Escribe tu nombre"
                      className={errors.nombre ? 'error' : ''}
                    />
                    {errors.nombre && <span className="error-msg">Este campo es requerido</span>}
                  </div>
                  <div className="form-group">
                    <label>Tono emocional <span className="required">*</span></label>
                    <select
                      value={formData.tonoEmocional}
                      onChange={(e) => setFormData({ ...formData, tonoEmocional: e.target.value })}
                      className={errors.tonoEmocional ? 'error' : ''}
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="Romántico ">Romántico</option>
                      <option value="Alegre Festivo">Alegre y Festivo</option>
                      <option value="Nostálgico">Nostálgico</option>
                      <option value="Bailable">Bailable</option>
                      <option value="Inspirador">Inspirador</option>
                      <option value="Melancólico">Melancólico</option>
                      <option value="Espiritual">Espiritual</option>
                      <option value="Personal Intimo">Personal e Intimo</option>
                    </select>
                    {errors.tonoEmocional && <span className="error-msg">Este campo es requerido</span>}
                  </div>

                  <div className="form-group">
                    <label>¿Para quién es esta canción? <span className="required">*</span></label>
                    <select
                      value={formData.paraQuien}
                      onChange={(e) => setFormData({ ...formData, paraQuien: e.target.value })}
                      className={errors.paraQuien ? 'error' : ''}
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="esposa/o">Mi Esposa/o</option>
                      <option value="novio/a">Novio/a</option>
                      <option value="amiga">Mejor amiga</option>
                      <option value="mama">Mamá</option>
                      <option value="papa">Papá</option>
                      <option value="abuelo/a">Abuelo/a</option>
                      <option value="hermano/a">Hermano/a</option>
                      <option value="hijo/a">Hijo/a</option>
                      <option value="importante">Alguien importante en mi vida</option>
                      {/*  <option value="otro">Otro</option> */}
                    </select>
                    {errors.paraQuien && <span className="error-msg">Este campo es requerido</span>}
                  </div>

                  <div className="form-group">
                    <label>¿Cuál es la ocasión? <span className="required">*</span></label>
                    <select
                      value={formData.ocasion}
                      onChange={(e) => setFormData({ ...formData, ocasion: e.target.value })}
                      className={errors.ocasion ? 'error' : ''}
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
                      {/*   <option value="otro">Otro</option> */}
                    </select>
                    {errors.ocasion && <span className="error-msg">Este campo es requerido</span>}
                  </div>
                </div>
              )}

              {/* Paso 1: Cuéntanos Tu Historia */}
              {currentStep === 1 && (
                <div className="form-fields">
                  <div className="form-group">
                    <label>Tu Historia de Amor:</label>
                    <textarea
                      value={formData.historia}
                      onChange={(e) => setFormData({ ...formData, historia: e.target.value })}
                      placeholder="Cuéntanos sobre esa persona especial, momentos inolvidables, lo que sientes..."
                      rows={8}
                      className={errors.historia ? 'error' : ''}
                    ></textarea>
                    {errors.historia ? (
                      <span className="error-msg">Escribe al menos 20 caracteres</span>
                    ) : (
                      <span className="help-text">Mínimo 20 caracteres</span>
                    )}
                  </div>
                </div>
              )}

              {/* Paso 2: Información de Contacto */}
              {currentStep === 2 && (
                <div className="form-fields">
                  <div className="form-group">
                    <label>Número de WhatsApp: <span className="required">*</span></label>
                    <div className={`whatsapp-input ${errors.whatsapp ? 'error' : ''}`}>
                      <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      <input
                        type="tel"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        placeholder="+57 300 123 4567"
                      />
                    </div>
                    {errors.whatsapp ? (
                      <span className="error-msg">Por favor ingresa un número válido (mínimo 10 dígitos)</span>
                    ) : (
                      <span className="help-text">Te contactaremos por WhatsApp para coordinar la entrega</span>
                    )}
                  </div>

                  {/* ← NUEVO CAMPO DE EMAIL */}
                  <div className="form-group">
                    <label>Correo Electrónico: <span className="required">*</span></label>
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="tucorreo@ejemplo.com"
                        className={errors.email ? 'error' : ''}
                      />
                    </div>
                    {errors.email ? (
                      <span className="error-msg">Por favor ingresa un correo electrónico válido</span>
                    ) : (
                      <span className="help-text">Te enviaremos la confirmación de tu pedido</span>
                    )}
                  </div>
                </div>
              )}

              {/* Paso 3: Elige Tu Estilo Musical */}
              {currentStep === 3 && (
                <>
                  <div className="generos-scroll-container">
                    <div className="generos-grid">
                      {generos.map((genero) => (
                        <button
                          key={genero.id}
                          className={`genero-btn ${formData.genero === genero.id ? 'selected' : ''}`}
                          onClick={() => selectGenero(genero.id)}
                        >
                          {genero.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  {errors.genero && <span className="error-msg">Por favor selecciona un género</span>}
                </>
              )}

              {/* Paso 4: Selecciona Tu Paquete */}
              {/* Paso 4: Selecciona Tu Paquete */}
              {currentStep === 4 && (
                <>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    maxHeight: '360px',
                    overflowY: 'auto',
                    paddingRight: '6px',
                    marginBottom: '16px'
                  }}>
                    {paquetes.sort((a, b) => a.position - b.position).map((paquete) => (
                      <button
                        key={paquete.id}
                        onClick={() => selectPaquete(paquete.id)}
                        style={{
                          position: 'relative',
                          width: '100%',
                          padding: '14px 16px',
                          borderRadius: '10px',
                          border: formData.paquete === paquete.id
                            ? '2px solid #11676a'
                            : paquete.highlighted
                              ? '2px solid #f89a3f'
                              : '1px solid #e5e7eb',
                          background: formData.paquete === paquete.id
                            ? 'linear-gradient(135deg, #11676a 0%, #2d8c89 100%)'
                            : 'white',
                          color: formData.paquete === paquete.id ? 'white' : '#111827',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          textAlign: 'left',
                          boxShadow: formData.paquete === paquete.id
                            ? '0 6px 20px rgba(17, 103, 106, 0.25)'
                            : paquete.highlighted
                              ? '0 2px 8px rgba(248, 154, 63, 0.15)'
                              : '0 1px 3px rgba(0, 0, 0, 0.08)',
                          overflow: 'visible'
                        }}
                        onMouseEnter={(e) => {
                          if (formData.paquete !== paquete.id) {
                            e.currentTarget.style.borderColor = paquete.highlighted ? '#f89a3f' : '#11676a';
                            e.currentTarget.style.boxShadow = paquete.highlighted
                              ? '0 4px 12px rgba(248, 154, 63, 0.2)'
                              : '0 3px 10px rgba(0, 0, 0, 0.12)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (formData.paquete !== paquete.id) {
                            e.currentTarget.style.borderColor = paquete.highlighted ? '#f89a3f' : '#e5e7eb';
                            e.currentTarget.style.boxShadow = paquete.highlighted
                              ? '0 2px 8px rgba(248, 154, 63, 0.15)'
                              : '0 1px 3px rgba(0, 0, 0, 0.08)';
                          }
                        }}
                      >
                        {/* Badge elegante */}
                        {paquete.highlighted && formData.paquete !== paquete.id && (
                          <div style={{
                            position: 'absolute',
                            top: '-1px',
                            right: '12px',
                            background: 'linear-gradient(135deg, #f89a3f 0%, #ff6b35 100%)',
                            color: 'white',
                            padding: '4px 10px',
                            borderRadius: '0 0 8px 8px',
                            fontSize: '9px',
                            fontWeight: 'bold',
                            letterSpacing: '0.5px',
                            textTransform: 'uppercase',
                            boxShadow: '0 2px 8px rgba(248, 154, 63, 0.3)'
                          }}>
                            Recomendado
                          </div>
                        )}

                        {/* Checkmark minimalista */}
                        {formData.paquete === paquete.id && (
                          <div style={{
                            position: 'absolute',
                            top: '10px',
                            right: '12px',
                            width: '20px',
                            height: '20px',
                            background: 'white',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)'
                          }}>
                            <svg style={{ width: '12px', height: '12px', color: '#10b981' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}

                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '12px'
                        }}>
                          {/* Lado izquierdo */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            {/* Nombre y subtítulo en una línea */}
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              marginBottom: '6px',
                              paddingRight: formData.paquete === paquete.id ? '24px' : '0'
                            }}>
                              <span style={{ fontSize: '22px', lineHeight: 1 }}>{paquete.icon}</span>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <h3 style={{
                                  fontSize: '15px',
                                  fontWeight: '700',
                                  margin: 0,
                                  lineHeight: 1.2,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}>
                                  {paquete.nombre}
                                </h3>
                                {paquete.subtitle && (
                                  <p style={{
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    color: formData.paquete === paquete.id ? 'rgba(255,255,255,0.85)' : '#6b7280',
                                    margin: 0,
                                    lineHeight: 1.2
                                  }}>
                                    {paquete.subtitle}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Features ultra compactos */}
                            <div style={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              gap: '4px',
                              fontSize: '10px',
                              lineHeight: 1
                            }}>
                              {paquete.duracion && (
                                <span style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '3px',
                                  padding: '4px 7px',
                                  borderRadius: '5px',
                                  background: formData.paquete === paquete.id
                                    ? 'rgba(255,255,255,0.25)'
                                    : '#f3f4f6',
                                  fontWeight: 600,
                                  whiteSpace: 'nowrap'
                                }}>
                                  <span style={{ fontSize: '11px' }}>⏱</span>
                                  <span>{paquete.duracion.replace(' Min. Aprox.', 'min')}</span>
                                </span>
                              )}
                              {paquete.features.map((feature, idx) => (
                                <span key={idx} style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '3px',
                                  padding: '4px 7px',
                                  borderRadius: '5px',
                                  background: formData.paquete === paquete.id
                                    ? 'rgba(255,255,255,0.25)'
                                    : '#f3f4f6',
                                  fontWeight: 500,
                                  whiteSpace: 'nowrap'
                                }}>
                                  <span style={{ fontSize: '11px' }}>{feature.icon}</span>
                                  <span style={{
                                    maxWidth: '80px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                  }}>
                                    {feature.text.length > 15 ? feature.text.substring(0, 12) + '...' : feature.text}
                                  </span>
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Precio lado derecho */}
                          <div style={{
                            textAlign: 'right',
                            flexShrink: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            justifyContent: 'center'
                          }}>
                            <div style={{
                              fontSize: '20px',
                              fontWeight: '900',
                              lineHeight: 1,
                              letterSpacing: '-0.5px'
                            }}>
                              {paquete.precio}
                            </div>
                            <div style={{
                              fontSize: '9px',
                              fontWeight: 600,
                              opacity: 0.7,
                              marginTop: '2px',
                              letterSpacing: '0.5px'
                            }}>
                              COP
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  {errors.paquete && <span className="error-msg">Por favor selecciona un paquete</span>}
                </>
              )}

              {/* Paso 5: Resumen */}
              {currentStep === 5 && (
                <div className="resumen">
                  <div className="resumen-section">
                    <h3>Detalles del Pedido</h3>
                    <div className="detalle-row">
                      <span>Nombre:</span>
                      <strong>{formData.nombre}</strong>
                    </div>
                    <div className="detalle-row">
                      <span>Para:</span>
                      <strong>{formData.paraQuien}</strong>
                    </div>
                    <div className="detalle-row">
                      <span>Tono emocional:</span>
                      <strong>{formData.tonoEmocional}</strong>
                    </div>
                    <div className="detalle-row">
                      <span>Ocasión:</span>
                      <strong>{formData.ocasion}</strong>
                    </div>
                    <div className="detalle-row">
                      <span>Género:</span>
                      <strong>{generos.find((g) => g.id === formData.genero)?.label || ''}</strong>
                    </div>
                    <div className="detalle-row">
                      <span>WhatsApp:</span>
                      <strong>{formData.whatsapp}</strong>
                    </div>
                    <div className="detalle-row">
                      <span>Email:</span>
                      <strong>{formData.email}</strong>
                    </div>
                  </div>

                  <div className="resumen-section paquete-seleccionado">
                    <h3>Paquete Seleccionado</h3>
                    {formData.paquete && (() => {
                      const paq = paquetes.find((p) => p.id === formData.paquete);
                      return paq ? (
                        <div className="paquete-detalle">
                          <div>
                            <h4>{paq.nombre}</h4>
                            <p>{paq.descripcion}</p>
                          </div>
                          <div className="precio-final">
                            <span className="precio">{paq.precio}</span>
                            <span className="moneda">COP</span>
                          </div>
                        </div>
                      ) : null;
                    })()}
                  </div>

                  <div className="metodos-pago">
                    <div className="pago-header">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                      </svg>
                      <h3>Selecciona tu Método de Pago</h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div className={`pago-opcion shadow-md border ${formData.metodoPago === 'online' ? 'selected' : ''}`} onClick={() => selectMetodoPago('online')}>
                        <div className="pago-icon">💳</div>
                        <div className="pago-text">
                          <strong>Pago en Línea</strong>
                          <p>Salta la fila, recibe tu canción en solo 24H</p>
                        </div>
                      </div>

                      <div
                        className={`pago-opcion shadow-md border ${formData.metodoPago === 'contraentrega' ? 'selected' : ''}`}
                        onClick={() => selectMetodoPago('contraentrega')}
                      >
                        <div className="pago-icon">💵</div>
                        <div className="pago-text">
                          <strong>Pago Contra Entrega</strong>
                          <p>Escucha primero, paga después si te encanta</p>
                        </div>
                      </div>
                    </div>

                    {errors.metodoPago && (
                      <span className="error-msg" style={{ display: 'block', marginTop: '8px' }}>
                        Por favor selecciona un método de pago
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Botones de navegación */}
            <div className="form-footer">
              {currentStep > 0 ? (
                <button className="btn-secondary" onClick={prevStep}>Atrás</button>
              ) : (
                <div></div>
              )}

              {currentStep < steps.length - 1 ? (
                <button className="btn-primary" onClick={nextStep}>Siguiente</button>
              ) : (
                <button
                  className="btn-primary"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Procesando...' : 'Finalizar Pedido'}
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
              <div className="success-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h1 className="success-title">¡Pedido Creado!</h1>
              <p className="success-subtitle">Tu canción personalizada está en camino</p>

              {/* Detalles del pedido */}
              <div className="order-details">
                <div className="order-number">
                  <p className="order-number-label">Número de Pedido</p>
                  <h2 className="order-number-value">{orderSuccess.orderNumber}</h2>
                </div>

                <div className="detail-grid">
                  <div className="detail-item">
                    <div className="detail-icon">👤</div>
                    <div className="detail-content">
                      <p className="detail-label">Cliente</p>
                      <p className="detail-value">{orderSuccess.nombre}</p>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-icon">🎵</div>
                    <div className="detail-content">
                      <p className="detail-label">Paquete Seleccionado</p>
                      <p className="detail-value">{orderSuccess.paquete}</p>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-icon">💰</div>
                    <div className="detail-content">
                      <p className="detail-label">Total a Pagar</p>
                      <p className="detail-value">{orderSuccess.precio} COP</p>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-icon">📱</div>
                    <div className="detail-content">
                      <p className="detail-label">WhatsApp</p>
                      <p className="detail-value">{orderSuccess.whatsapp}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Próximos pasos */}
              <div className="next-steps">
                <div className="next-steps-title">
                  <span style={{ fontSize: '20px' }}>⏰</span>
                  <h3>¿Qué sigue ahora?</h3>
                </div>

                <div className="steps-timeline">
                  <div className="timeline-step">
                    <div className="timeline-dot">1</div>
                    <div className="timeline-content">
                      <strong>Contacto en 24 horas:</strong> Nuestro equipo se comunicará contigo por WhatsApp para confirmar todos los detalles de tu canción.
                    </div>
                  </div>

                  <div className="timeline-step">
                    <div className="timeline-dot">2</div>
                    <div className="timeline-content">
                      <strong>Creación:</strong> Comenzaremos a trabajar en tu canción personalizada con todo el amor y dedicación que mereces.
                    </div>
                  </div>

                  <div className="timeline-step">
                    <div className="timeline-dot">3</div>
                    <div className="timeline-content">
                      <strong>Entrega:</strong> Te enviaremos un adelanto para que escuches tu canción antes de pagar.
                    </div>
                  </div>
                </div>
              </div>

              {/* Recordatorio de pago */}
              <div className="payment-reminder">
                <p>💵 Pagarás cuando recibas y escuches tu canción personalizada</p>
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
    </div>
  );
};

export default ModalCancionPersonalizada;

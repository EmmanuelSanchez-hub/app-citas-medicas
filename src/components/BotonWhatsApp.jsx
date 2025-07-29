export default function BotonWhatsapp({ numero, mensaje }) {
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="secondary-button">
        💬 Confirmar por WhatsApp
      </a>
    );
  }
  
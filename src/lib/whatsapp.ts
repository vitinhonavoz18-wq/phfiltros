import { site, isWhatsappConfigured } from "@/config/site";
import { attributionTag } from "./utm";

/** Monta o link do WhatsApp com a mensagem e a origem da visita (UTM). */
export function whatsappUrl(message: string = site.defaultWhatsappMessage, withAttribution = true) {
  const tag = withAttribution ? attributionTag() : "";
  const text = tag ? `${message}\n\n(${tag})` : message;
  const number = site.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export { isWhatsappConfigured };

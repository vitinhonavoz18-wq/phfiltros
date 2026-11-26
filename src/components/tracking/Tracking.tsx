"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { tracking } from "@/config/site";
import { captureAttribution } from "@/lib/utm";
import { CONSENT_CHANGE_EVENT, readConsent, type Consent } from "./consent";

/**
 * Carrega as ferramentas de medição de forma responsável:
 * - Google Tag Manager / GA4: carregam com o Consent Mode v2 (sem cookies até a autorização).
 * - Meta Pixel: só é carregado DEPOIS que o visitante aceita cookies de marketing.
 */
export function Tracking() {
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    captureAttribution();
    setMarketing(Boolean(readConsent()?.marketing));
    const onChange = (e: Event) => setMarketing(Boolean((e as CustomEvent<Consent>).detail?.marketing));
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  }, []);

  return (
    <>
      {tracking.gtmId && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${tracking.gtmId}');`}
        </Script>
      )}
      {!tracking.gtmId && tracking.ga4Id && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${tracking.ga4Id}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`gtag('js', new Date()); gtag('config', '${tracking.ga4Id}');`}
          </Script>
        </>
      )}
      {tracking.metaPixelId && marketing && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${tracking.metaPixelId}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}

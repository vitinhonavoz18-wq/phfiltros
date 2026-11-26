export const CONSENT_KEY = "ph_consent_v1";
export const CONSENT_OPEN_EVENT = "ph:consent-open";
export const CONSENT_CHANGE_EVENT = "ph:consent-change";

export type Consent = { analytics: boolean; marketing: boolean; ts: number };

export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

export function saveConsent(c: Omit<Consent, "ts">) {
  const value: Consent = { ...c, ts: Date.now() };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
  } catch {
    /* storage bloqueado */
  }
  applyConsent(value);
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: value }));
}

/** Consent Mode v2: atualiza as permissões do Google conforme a escolha. */
export function applyConsent(c: Consent) {
  window.dataLayer = window.dataLayer || [];
  const gtag = (...args: unknown[]) => window.dataLayer!.push(args);
  const a = c.analytics ? "granted" : "denied";
  const m = c.marketing ? "granted" : "denied";
  // gtag espera o objeto `arguments`; o formato em array também é aceito pelo GTM.
  (window.gtag ?? gtag)("consent", "update", {
    analytics_storage: a,
    ad_storage: m,
    ad_user_data: m,
    ad_personalization: m,
  });
  window.dataLayer.push({ event: "consent_update", consent_analytics: a, consent_marketing: m });
}

/** Script inline que roda antes de qualquer tag: tudo negado por padrão. */
export const consentDefaultsScript = `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
gtag('set','ads_data_redaction',true);
try{var c=JSON.parse(localStorage.getItem('${CONSENT_KEY}')||'null');if(c){var a=c.analytics?'granted':'denied',m=c.marketing?'granted':'denied';gtag('consent','update',{analytics_storage:a,ad_storage:m,ad_user_data:m,ad_personalization:m});}}catch(e){}
`;

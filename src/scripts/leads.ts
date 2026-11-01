/**
 * Lead events for GA4 — the measure of this site is enquiries, not visits.
 *
 * Every route to Ahmed is a link (WhatsApp, email, phone) or the contact
 * form, so one delegated listener covers the header, CTAs, footer, chatbot
 * and the call scheduler without touching any of them.
 *
 * Fires GA4's recommended `generate_lead` event with a `method` parameter.
 * Does nothing at all unless the visitor accepted analytics: `window.gtag`
 * only exists after consent (see ConsentBanner.astro), and only once a GA4
 * measurement ID is set in site.config.ts.
 */
type Gtag = (command: 'event', name: string, params: Record<string, string>) => void;

function track(method: string) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag !== 'function') return;
  gtag('event', 'generate_lead', {
    method,
    page_path: location.pathname,
    language: document.documentElement.lang || 'en',
  });
}

document.addEventListener('click', (event) => {
  const link = (event.target as Element | null)?.closest?.('a[href]');
  if (!link) return;
  const href = link.getAttribute('href') ?? '';
  if (href.startsWith('https://wa.me/')) track('whatsapp');
  else if (href.startsWith('mailto:')) track('email');
  else if (href.startsWith('tel:')) track('phone');
});

document.addEventListener('submit', (event) => {
  if ((event.target as Element | null)?.closest?.('form')) track('contact_form');
});

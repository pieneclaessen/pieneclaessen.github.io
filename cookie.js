/* ============================================================
   Claessen Tech — Cookie consent + Google Analytics loader
   GA laadt pas ná expliciete toestemming ("Accepteren").
   ============================================================ */
(function () {
  var GA_ID = 'G-QYRHMS5PSE';
  var CONSENT_KEY = 'ct_cookie_consent'; // 'granted' | 'denied'

  function loadGA() {
    if (window.__gaLoaded) return;
    window.__gaLoaded = true;

    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  function getConsent() { return localStorage.getItem(CONSENT_KEY); }
  function setConsent(v) { localStorage.setItem(CONSENT_KEY, v); }

  function hideBanner() {
    var b = document.getElementById('cookie-banner');
    if (b) b.remove();
  }

  function showBanner() {
    if (document.getElementById('cookie-banner')) return;

    var banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.innerHTML =
      '<div class="cookie-banner-inner">' +
        '<p>Ik gebruik Google Analytics om te zien hoe mijn site wordt gebruikt. ' +
        'Ga je hiermee akkoord? <a href="privacybeleid.html">Lees meer in mijn privacybeleid</a>.</p>' +
        '<div class="cookie-banner-actions">' +
          '<button type="button" class="btn btn-ghost" id="cookie-decline">Weigeren</button>' +
          '<button type="button" class="btn btn-primary" id="cookie-accept">Accepteren</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(banner);

    document.getElementById('cookie-accept').addEventListener('click', function () {
      setConsent('granted');
      hideBanner();
      loadGA();
    });
    document.getElementById('cookie-decline').addEventListener('click', function () {
      setConsent('denied');
      hideBanner();
    });
  }

  // Laat een "Cookie-instellingen"-link in de footer dit aanroepen
  // om de banner opnieuw te tonen (voorkeur wijzigen).
  window.openCookieSettings = showBanner;

  document.addEventListener('DOMContentLoaded', function () {
    var consent = getConsent();
    if (consent === 'granted') {
      loadGA();
    } else if (consent !== 'denied') {
      showBanner();
    }
  });
})();
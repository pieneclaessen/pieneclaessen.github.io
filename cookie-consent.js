/* ============================================================
   Claessen Tech — Cookie consent
   Toont de cookiebanner, onthoudt de keuze en laadt de
   analytics-tag pas na "Accepteren". Zonder toestemming
   wordt er niets geladen of gemeten.
   ============================================================ */
(function () {
  var MEASUREMENT_ID = "G-QYRHMS5PSE";
  var STORAGE_KEY = "ct_cookie_consent";

  function loadAnalytics() {
    if (window.__ctAnalyticsLoaded) return;
    window.__ctAnalyticsLoaded = true;

    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + MEASUREMENT_ID;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", MEASUREMENT_ID);
  }

  function getConsent() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {}
  }

  function hideBanner() {
    var el = document.getElementById("cookie-banner");
    if (el) el.remove();
  }

  function handleChoice(value) {
    setConsent(value);
    hideBanner();
    if (value === "accepted") loadAnalytics();
  }

  function renderBanner() {
    var wrap = document.createElement("div");
    wrap.id = "cookie-banner";
    wrap.className = "cookie-banner";
    wrap.setAttribute("role", "dialog");
    wrap.setAttribute("aria-label", "Cookiemelding");
    wrap.innerHTML =
      '<div class="cookie-banner-card">' +
      '<p class="cookie-banner-text">' +
      "We gebruiken cookies om te begrijpen hoe bezoekers onze site gebruiken. Je kunt dit accepteren of weigeren." +
      "</p>" +
      '<div class="cookie-banner-actions">' +
      '<button type="button" class="btn btn-ghost" id="cookie-decline">Weigeren</button>' +
      '<button type="button" class="btn btn-primary" id="cookie-accept">Accepteren</button>' +
      "</div>" +
      "</div>";

    document.body.appendChild(wrap);

    document.getElementById("cookie-accept").addEventListener("click", function () {
      handleChoice("accepted");
    });
    document.getElementById("cookie-decline").addEventListener("click", function () {
      handleChoice("declined");
    });
  }

  function init() {
    var consent = getConsent();
    if (consent === "accepted") {
      loadAnalytics();
      return;
    }
    if (consent === "declined") {
      return;
    }
    renderBanner();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
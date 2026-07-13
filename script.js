/* ============================================================
   Claessen Tech — Main Script
   Scroll-reveal: adds .in to .reveal elements when they
   enter the viewport, triggering the CSS fade+slide animation.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(function (el) {
    observer.observe(el);
  });

});
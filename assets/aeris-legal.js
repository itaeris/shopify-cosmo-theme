(function () {
  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  ready(function () {
    var storageKey = 'aeris-legal-lang';

    document.querySelectorAll('.aeris-legal, .aeris-faq').forEach(function (root) {
      var buttons = root.querySelectorAll('[data-legal-switch]');
      if (!buttons.length) return;

      function setLang(lang) {
        if (lang !== 'id' && lang !== 'en') lang = 'id';

        buttons.forEach(function (btn) {
          var active = btn.getAttribute('data-legal-switch') === lang;
          btn.classList.toggle('is-active', active);
          btn.setAttribute('aria-selected', active ? 'true' : 'false');
        });

        root.querySelectorAll('[data-legal-lang]').forEach(function (pane) {
          var match = pane.getAttribute('data-legal-lang') === lang;
          pane.hidden = !match;
          pane.classList.toggle('is-hidden', !match);
        });

        root.querySelectorAll('[data-legal-title-lang]').forEach(function (title) {
          var match = title.getAttribute('data-legal-title-lang') === lang;
          title.hidden = !match;
          title.classList.toggle('is-hidden', !match);
        });

        try {
          window.localStorage.setItem(storageKey, lang);
        } catch (e) {}
      }

      buttons.forEach(function (btn) {
        btn.addEventListener('click', function (event) {
          event.preventDefault();
          setLang(btn.getAttribute('data-legal-switch'));
        });
      });

      var saved = 'id';
      try {
        saved = window.localStorage.getItem(storageKey) || 'id';
      } catch (e) {}
      setLang(saved);
    });
  });
})();

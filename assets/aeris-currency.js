(function () {
  var KEY = "aeris-display-currency";
  var RATE_KEY = "aeris-usd-rate";
  var FALLBACK_IDR_PER_USD = 16700;
  var active =
    window.Shopify && Shopify.currency && Shopify.currency.active
      ? Shopify.currency.active
      : "IDR";

  function readChoice() {
    if (active === "USD") return "USD";
    try {
      return localStorage.getItem(KEY) === "USD" ? "USD" : "IDR";
    } catch (error) {
      return "IDR";
    }
  }

  var choice = readChoice();
  var label = document.querySelector("[data-aeris-currency-label]");
  var flag = document.querySelector("[data-aeris-currency-flag]");

  if (choice === "USD") {
    if (label) label.textContent = "USD";
    if (flag) {
      flag.className = flag.className.replace(
        /f-country-flags--[A-Z]{2}/,
        "f-country-flags--US"
      );
    }
  }

  document.querySelectorAll("[data-aeris-currency-item]").forEach(function (item) {
    if (item.getAttribute("data-aeris-currency-item") === choice) {
      item.classList.add("f-disclosure-list__item--current");
    }
  });

  document.addEventListener(
    "click",
    function (event) {
      var option = event.target.closest("[data-aeris-currency]");
      if (option) {
        event.preventDefault();
        event.stopPropagation();
        var next = option.getAttribute("data-aeris-currency") === "USD" ? "USD" : "IDR";
        try {
          localStorage.setItem(KEY, next);
        } catch (error) {}
        var stay =
          location.pathname === "/localization"
            ? "/"
            : location.pathname + location.search + location.hash;
        location.assign(stay);
        return;
      }

      var toggle = event.target.closest("[data-aeris-currency-toggle]");
      if (toggle) {
        event.preventDefault();
        var root = toggle.closest("[data-aeris-currency-root]");
        var open = !root.hasAttribute("open");
        root.toggleAttribute("open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        return;
      }

      document.querySelectorAll("[data-aeris-currency-root][open]").forEach(function (root) {
        root.removeAttribute("open");
        var button = root.querySelector("[data-aeris-currency-toggle]");
        if (button) button.setAttribute("aria-expanded", "false");
      });
    },
    true
  );

  if (choice !== "USD" || active === "USD") return;

  function loadRate() {
    try {
      var cached = JSON.parse(localStorage.getItem(RATE_KEY) || "null");
      if (
        cached &&
        cached.rate > 0 &&
        Date.now() - cached.at < 12 * 60 * 60 * 1000
      ) {
        return Promise.resolve(cached.rate);
      }
    } catch (error) {}

    return fetch("https://open.er-api.com/v6/latest/USD")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var rate = data && data.rates && Number(data.rates.IDR);
        if (!rate) throw new Error("missing rate");
        try {
          localStorage.setItem(
            RATE_KEY,
            JSON.stringify({ rate: rate, at: Date.now() })
          );
        } catch (error) {}
        return rate;
      })
      .catch(function () {
        return FALLBACK_IDR_PER_USD;
      });
  }

  function formatUsd(idrAmount, rate) {
    var usd = idrAmount / rate;
    return usd.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }

  var amountPattern = /(?:Rp|IDR)[\s\u00a0]*(\d{1,3}(?:,\d{3})+|\d+)/g;

  function convertText(text, rate) {
    return text.replace(amountPattern, function (match, num) {
      var idr = parseInt(num.replace(/,/g, ""), 10);
      if (!idr) return match;
      return formatUsd(idr, rate);
    });
  }

  function walk(root, rate) {
    if (!root) return;
    var scope = root.nodeType === 1 ? root : document.body;
    var walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
    var nodes = [];
    var node;
    while ((node = walker.nextNode())) nodes.push(node);
    nodes.forEach(function (textNode) {
      var parent = textNode.parentElement;
      if (!parent || parent.closest("script, style, .aeris-currency")) return;
      if (!/(?:Rp|IDR)[\s\u00a0]*\d/.test(textNode.nodeValue)) return;
      textNode.nodeValue = convertText(textNode.nodeValue, rate);
    });
  }

  function wrapFormatMoney(rate) {
    if (typeof window.formatMoney !== "function" || window.formatMoney.__aerisUsd) {
      return;
    }
    var original = window.formatMoney;
    window.formatMoney = function (cents) {
      var amount = typeof cents === "string" ? cents.replace(".", "") : cents;
      var idr = Number(amount) / 100;
      var usdCents = Math.round((idr / rate) * 100);
      return original(usdCents, "${{amount}}");
    };
    window.formatMoney.__aerisUsd = true;
  }

  loadRate().then(function (rate) {
    wrapFormatMoney(rate);
    var converting = false;
    var observer = new MutationObserver(function (records) {
      if (converting) return;
      converting = true;
      records.forEach(function (record) {
        record.addedNodes.forEach(function (node) {
          if (node.nodeType === 3) {
            if (node.parentElement) walk(node.parentElement, rate);
          } else if (node.nodeType === 1) {
            walk(node, rate);
          }
        });
        if (record.type === "characterData" && record.target.parentElement) {
          walk(record.target.parentElement, rate);
        }
      });
      converting = false;
    });

    walk(document.body, rate);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  });
})();

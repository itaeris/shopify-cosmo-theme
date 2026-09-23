(function () {
  const boot = () => {
    document.querySelectorAll("[data-aeris-stores]").forEach((root) => {
      if (root.dataset.bound === "true") return;
      root.dataset.bound = "true";

      const select = root.querySelector("[data-store-filter]");
      const count = root.querySelector("[data-store-count]");
      if (!select) return;

      const apply = () => {
        const value = select.value;
        root.classList.toggle("is-single", value !== "all");
        root.querySelectorAll("[data-store]").forEach((node) => {
          if (node === select) return;
          node.hidden = value !== "all" && node.dataset.store !== value;
        });
        if (count) {
          count.textContent = root.querySelectorAll(
            ".aeris-stores__card:not([hidden])"
          ).length;
        }
      };

      const fromHash = () => {
        const id = window.location.hash.replace("#", "");
        if (!id || id === "all") {
          select.value = "all";
          return;
        }
        const match = Array.from(select.options).some((option) => option.value === id);
        select.value = match ? id : "all";
      };

      select.addEventListener("change", () => {
        const next = select.value === "all" ? "" : "#" + select.value;
        const url = window.location.pathname + window.location.search + next;
        window.history.replaceState(null, "", url);
        apply();
      });

      fromHash();
      apply();
      window.addEventListener("hashchange", () => {
        fromHash();
        apply();
      });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

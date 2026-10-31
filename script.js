/* Quiet Systems — theme switching and mobile navigation.
   The rest of the experience is handled by HTML and CSS. */

(function () {
  "use strict";

  var root = document.documentElement;
  var toggle = document.querySelector("[data-theme-toggle]");
  var themeMeta = document.querySelector('meta[name="theme-color"]');

  function readSavedTheme() {
    try {
      return localStorage.getItem("theme");
    } catch (error) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem("theme", theme);
    } catch (error) {
      /* Storage can be unavailable in private or restricted browsing. */
    }
  }

  function syncThemeControl(theme) {
    if (!toggle) return;

    var isDark = theme === "dark";
    var label = toggle.querySelector("[data-theme-label]");

    toggle.setAttribute("aria-pressed", String(isDark));
    if (label) {
      label.textContent = isDark ? "Switch to light theme" : "Switch to dark theme";
    }

    if (themeMeta) {
      themeMeta.setAttribute("content", isDark ? "#0f0f1d" : "#f4ecdf");
    }
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    syncThemeControl(theme);
  }

  applyTheme(root.dataset.theme === "dark" ? "dark" : "light");

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(next);
      storeTheme(next);
    });
  }

  // Follow the operating-system preference until the visitor makes a choice.
  if (window.matchMedia) {
    var systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    var handleSystemTheme = function (event) {
      if (!readSavedTheme()) applyTheme(event.matches ? "dark" : "light");
    };

    if (systemTheme.addEventListener) {
      systemTheme.addEventListener("change", handleSystemTheme);
    } else if (systemTheme.addListener) {
      systemTheme.addListener(handleSystemTheme);
    }
  }

  // Close the mobile navigation after choosing a destination.
  var mobileNav = document.querySelector(".mobile-nav");
  if (mobileNav) {
    var summary = mobileNav.querySelector("summary");
    var mobileLinks = mobileNav.querySelectorAll("a");

    mobileNav.addEventListener("toggle", function () {
      if (summary) summary.setAttribute("aria-expanded", String(mobileNav.open));
    });

    mobileLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.open = false;
      });
    });

    document.addEventListener("click", function (event) {
      if (mobileNav.open && !mobileNav.contains(event.target)) {
        mobileNav.open = false;
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && mobileNav.open) {
        mobileNav.open = false;
        if (summary) summary.focus();
      }
    });
  }
})();

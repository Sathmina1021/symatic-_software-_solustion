document.addEventListener("DOMContentLoaded", () => {

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ── CUSTOM CROSSHAIR CURSOR (desktop only, disabled on touch/small screens) ──
  const dot  = document.getElementById("curDot");
  const ring = document.getElementById("curRing");
  let mx = 0, my = 0, rx = 0, ry = 0;
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  if (window.innerWidth > 768 && !isTouch) {
    document.addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; });

    (function animCursor() {
      if (dot)  { dot.style.left  = mx + "px"; dot.style.top  = my + "px"; }
      if (ring) {
        rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
        ring.style.left = rx + "px"; ring.style.top = ry + "px";
      }
      requestAnimationFrame(animCursor);
    })();

    document.querySelectorAll("a, button, .svc-card, .pmosaic-card, .c-item-v2, .team-card-v2").forEach(el => {
      el.addEventListener("mouseenter", () => {
        if (ring) {
          ring.style.transform = "translate(-50%,-50%) scale(1.5)";
          ring.style.borderColor = "rgba(255,138,50,0.85)";
        }
      });
      el.addEventListener("mouseleave", () => {
        if (ring) {
          ring.style.transform = "translate(-50%,-50%) scale(1)";
          ring.style.borderColor = "rgba(255,138,50,0.45)";
        }
      });
    });
  }

  // ── NAV SCROLL STATE ──────────────────────────────────────────
  const nav = document.getElementById("mainNav");
  window.addEventListener("scroll", () => {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 50);
  }, { passive: true });

  // ── SCROLL-TRIGGERED REVEALS ─────────────────────────────────
  const revealEls = document.querySelectorAll(".reveal");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(el => el.classList.add("in-view"));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(el => io.observe(el));
  }

  // ── IMAGE LIGHTBOX ────────────────────────────────────────────
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const closeBtn = document.querySelector(".modal-close");

  function openModal(src) {
    if (modal && modalImg && src) {
      modalImg.src = src;
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  }
  function closeModal() {
    if (modal) {
      modal.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  document.querySelectorAll(".popup-trigger").forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.classList.contains("live-site-link")) return;
      openModal(card.getAttribute("data-img"));
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (modal) {
    modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  }
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  // ── PORTFOLIO FILTERS ─────────────────────────────────────────
  const pfBtns = document.querySelectorAll(".pf-btn");
  const pCards = document.querySelectorAll(".pmosaic-card");

  pfBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      pfBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      pCards.forEach(card => {
        const match = filter === "all" || card.dataset.cat === filter;
        card.style.transition = "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
        if (match) {
          card.style.display = "flex";
          requestAnimationFrame(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          });
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.96)";
          setTimeout(() => { card.style.display = "none"; }, 350);
        }
      });
    });
  });

});

// ── PAGE LOAD ──────────────────────────────────────────────────
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => loader.style.display = "none", 500);
    }, 1300);
  }
});

// ── MOBILE MENU ────────────────────────────────────────────────
function openMobile() {
  const menu = document.getElementById("mobileMenu");
  if (menu) { menu.classList.add("active"); document.body.style.overflow = "hidden"; }
}
function closeMobile() {
  const menu = document.getElementById("mobileMenu");
  if (menu) { menu.classList.remove("active"); document.body.style.overflow = ""; }
}

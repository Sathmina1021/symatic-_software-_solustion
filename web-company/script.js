document.addEventListener("DOMContentLoaded", () => {

  // ── PREMIUM CUSTOM CURSOR INTERACTIVE DRIVER ─────────────────
  const dot  = document.getElementById("curDot");
  const ring = document.getElementById("curRing");
  let mx = 0, my = 0, rx = 0, ry = 0;

  if (window.innerWidth > 768) {
    document.addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; });
    
    (function animCursor() {
      if (dot)  { dot.style.left  = mx + "px"; dot.style.top  = my + "px"; }
      if (ring) {
        rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
        ring.style.left = rx + "px"; ring.style.top = ry + "px";
      }
      requestAnimationFrame(animCursor);
    })();

    // Expand target states on hover actions
    document.querySelectorAll("a, button, .svc-card, .pmosaic-card, .c-item-v2, .team-card-v2").forEach(el => {
      el.addEventListener("mouseenter", () => { 
        if(ring){
          ring.style.transform = "translate(-50%,-50%) scale(1.4)"; 
          ring.style.borderColor = "rgba(0,198,255,0.8)";
          ring.style.backgroundColor = "rgba(0,198,255,0.03)";
        } 
      });
      el.addEventListener("mouseleave", () => { 
        if(ring){
          ring.style.transform = "translate(-50%,-50%) scale(1)"; 
          ring.style.borderColor = "rgba(0,198,255,0.4)";
          ring.style.backgroundColor = "transparent";
        } 
      });
    });
  }

  // ── NAV SCROLL CONTEXT STRUCTURING ───────────────────────────
  const nav = document.getElementById("mainNav");
  window.addEventListener("scroll", () => {
    if(nav) nav.classList.toggle("scrolled", window.scrollY > 50);
  });

  // ── INTERACTIVE IMAGE POPUP SYSTEM (LIGHTBOX) ────────────────
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const closeBtn = document.querySelector(".modal-close");

  document.querySelectorAll(".popup-trigger").forEach(card => {
    card.addEventListener("click", (e) => {
      // If user clicks the live website anchor tag link, don't trigger the image popup modal
      if (e.target.classList.contains("live-site-link")) {
        return;
      }
      
      const imageSrc = card.getAttribute("data-img");
      if (modal && modalImg && imageSrc) {
        modalImg.src = imageSrc;
        modal.classList.add("open");
      }
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("open");
    });

    // Close when clicking outside the main image content container
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("open");
      }
    });
  }

  // ── PORTFOLIO CATEGORY INTERACTIVE FILTERS ───────────────────
  const pfBtns  = document.querySelectorAll(".pf-btn");
  const pCards  = document.querySelectorAll(".pmosaic-card");

  pfBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      pfBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const filter = btn.dataset.filter;
      pCards.forEach(card => {
        const match = filter === "all" || card.dataset.cat === filter;
        if (match) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.95)";
          setTimeout(() => { card.style.display = "none"; }, 350);
        }
        card.style.transition = "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
      });
    });
  });

});

// ── LOADING ENGINE STRUCTURING ────────────────────────────────
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  if(loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => loader.style.display = "none", 500);
    }, 1300);
  }
});

// ── MOBILE MENU MOTIONS ───────────────────────────────────────
function openMobile() { 
  const menu = document.getElementById("mobileMenu");
  if(menu) menu.classList.add("active"); 
}

function closeMobile() { 
  const menu = document.getElementById("mobileMenu");
  if(menu) menu.classList.remove("active"); 
}
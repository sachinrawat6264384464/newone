/**
 * 2026 PLAN - Application Logic
 * Exact replica of 2026.launchatscale.com
 */

(function () {
  'use strict';

  // --- Configuration & Constants ---
  const WEBHOOK_URL = "https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjcwNTZkMDYzZjA0MzY1MjY1NTUzNzUxMzUi_pc";
  const IDENTITY_OPTIONS = [
    "Already A Coach",
    "Want to become a coach",
    "Working professional",
    "Agency owner / Freelancer",
    "Business owner",
    "Student"
  ];

  // --- State ---
  let currentStep = "identity"; // 'identity' | 'coaching' | 'confidential' | 'commitment' | 'contact' | 'rejected'
  let selectedIdentity = "";
  let isSubmitting = false;

  // --- DOM Elements ---
  const modalOverlay = document.getElementById("modal-overlay");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalContentArea = document.getElementById("modal-step-content");
  const toastContainer = document.getElementById("toast-container");

  // Sticky Bar Countdown Elements
  const timerMinutesEl = document.getElementById("timer-minutes");
  const timerSecondsEl = document.getElementById("timer-seconds");
  const deadlineDateEl = document.getElementById("deadline-date");

  // --- Format Date for Sticky Bar ---
  function updateDeadlineDate() {
    if (!deadlineDateEl) return;
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    deadlineDateEl.textContent = `Deadline ${now.toLocaleDateString('en-US', options)}`;
  }

  // --- Countdown Timer Logic ---
  function initCountdownTimer() {
    let remainingSeconds = 240; // 4 minutes default
    const storedEndTime = sessionStorage.getItem("countdown-end-time");

    if (storedEndTime) {
      const diff = Math.max(0, parseInt(storedEndTime, 10) - Date.now());
      remainingSeconds = Math.floor(diff / 1000);
    } else {
      const endTime = Date.now() + 4 * 60 * 1000;
      sessionStorage.setItem("countdown-end-time", endTime.toString());
    }

    function updateDisplay(seconds) {
      if (!timerMinutesEl || !timerSecondsEl) return;
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      timerMinutesEl.textContent = String(m).padStart(2, "0");
      timerSecondsEl.textContent = String(s).padStart(2, "0");
    }

    updateDisplay(remainingSeconds);

    if (remainingSeconds <= 0) return;

    const interval = setInterval(() => {
      remainingSeconds--;
      if (remainingSeconds <= 0) {
        remainingSeconds = 0;
        updateDisplay(0);
        clearInterval(interval);
      } else {
        updateDisplay(remainingSeconds);
      }
    }, 1000);
  }

  // --- Toast Notification ---
  function showToast(title, description, isError = false) {
    if (!toastContainer) return;
    const toast = document.createElement("div");
    toast.className = `p-4 rounded-xl border shadow-xl flex items-start gap-3 transition-all duration-300 transform translate-y-2 opacity-0 max-w-sm w-full pointer-events-auto ${
      isError 
        ? "bg-destructive/90 text-white border-destructive" 
        : "bg-card text-foreground border-primary/50"
    }`;
    toast.innerHTML = `
      <div class="flex-1">
        <h4 class="font-display font-semibold text-sm">${escapeHtml(title)}</h4>
        <p class="font-body text-xs mt-1 text-muted-foreground">${escapeHtml(description)}</p>
      </div>
      <button class="text-xs opacity-70 hover:opacity-100 p-1" aria-label="Close">&times;</button>
    `;

    const closeBtn = toast.querySelector("button");
    closeBtn.addEventListener("click", () => {
      toast.classList.add("opacity-0", "translate-y-2");
      setTimeout(() => toast.remove(), 300);
    });

    toastContainer.appendChild(toast);
    requestAnimationFrame(() => {
      toast.classList.remove("opacity-0", "translate-y-2");
      toast.classList.add("opacity-100", "translate-y-0");
    });

    setTimeout(() => {
      if (toast.parentElement) {
        toast.classList.add("opacity-0", "translate-y-2");
        setTimeout(() => toast.remove(), 300);
      }
    }, 5000);
  }

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  // --- Modal Open & Close ---
  function openModal() {
    currentStep = "identity";
    selectedIdentity = "";
    isSubmitting = false;
    renderStep();
    if (modalOverlay) {
      modalOverlay.classList.remove("hidden");
      modalOverlay.classList.add("flex");
      document.body.style.overflow = "hidden";
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.add("hidden");
      modalOverlay.classList.remove("flex");
      document.body.style.overflow = "";
    }
    setTimeout(() => {
      currentStep = "identity";
      selectedIdentity = "";
      isSubmitting = false;
    }, 300);
  }

  // --- Modal Steps Rendering ---
  function renderStep() {
    if (!modalContentArea) return;

    if (currentStep === "identity") {
      modalContentArea.innerHTML = `
        <div class="text-center mb-6">
          <h3 class="font-display text-2xl text-gradient-gold">What Represents You The Best?</h3>
        </div>
        <div class="space-y-3 py-2" id="identity-options-container">
          ${IDENTITY_OPTIONS.map(opt => `
            <div class="identity-card flex items-center space-x-3 p-3 rounded-lg border border-border/50 hover:border-primary/50 transition-colors cursor-pointer bg-card/50" data-value="${escapeHtml(opt)}">
              <div class="custom-checkbox w-5 h-5 rounded-none border border-primary flex items-center justify-center transition-colors">
                <svg class="w-3.5 h-3.5 text-primary-foreground hidden check-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <label class="font-body text-lg text-foreground cursor-pointer flex-1">${escapeHtml(opt)}</label>
            </div>
          `).join('')}
        </div>
      `;

      const cards = modalContentArea.querySelectorAll(".identity-card");
      cards.forEach(card => {
        card.addEventListener("click", () => {
          const val = card.getAttribute("data-value");
          selectedIdentity = val;
          // Highlight card
          cards.forEach(c => {
            c.classList.remove("border-primary", "bg-primary/10");
            const box = c.querySelector(".custom-checkbox");
            const icon = c.querySelector(".check-icon");
            box.classList.remove("bg-primary");
            icon.classList.add("hidden");
          });
          card.classList.add("border-primary", "bg-primary/10");
          const box = card.querySelector(".custom-checkbox");
          const icon = card.querySelector(".check-icon");
          box.classList.add("bg-primary");
          icon.classList.remove("hidden");

          setTimeout(() => {
            if (val === "Student") {
              currentStep = "rejected";
            } else {
              currentStep = "coaching";
            }
            renderStep();
          }, 300);
        });
      });

    } else if (currentStep === "coaching") {
      modalContentArea.innerHTML = `
        <div class="text-center mb-6">
          <h3 class="font-display text-2xl text-gradient-gold">Do You Want to Build a 1 Crore Profitable Coaching Business in 2026?</h3>
        </div>
        <div class="space-y-3 py-4">
          <button type="button" class="step-btn w-full font-display text-lg py-5 px-4 rounded-lg border border-primary/50 text-foreground hover:bg-primary/10 hover:text-foreground transition-all duration-200" data-answer="yes">
            YES I WANT TO
          </button>
          <button type="button" class="step-btn w-full font-display text-lg py-5 px-4 rounded-lg border border-primary/50 text-foreground hover:bg-primary/10 hover:text-foreground transition-all duration-200" data-answer="no">
            NO NOT AT ALL
          </button>
          <button type="button" class="step-btn w-full font-display text-lg py-5 px-4 rounded-lg border border-primary/50 text-foreground hover:bg-primary/10 hover:text-foreground transition-all duration-200" data-answer="maybe">
            MAYBE
          </button>
        </div>
      `;

      modalContentArea.querySelectorAll(".step-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const ans = btn.getAttribute("data-answer");
          if (ans === "no") {
            currentStep = "rejected";
          } else {
            currentStep = "confidential";
          }
          renderStep();
        });
      });

    } else if (currentStep === "confidential") {
      modalContentArea.innerHTML = `
        <div class="text-center mb-6">
          <h3 class="font-display text-2xl text-gradient-gold">Do you understand this is LIVE & Confidential?</h3>
          <p class="text-muted-foreground text-center text-sm mt-2">(No replays will be provided)</p>
        </div>
        <div class="space-y-3 py-4">
          <button type="button" class="step-btn w-full font-display text-lg py-5 px-4 rounded-lg border border-primary/50 text-foreground hover:bg-primary/10 hover:text-foreground transition-all duration-200" data-answer="yes">
            YES
          </button>
          <button type="button" class="step-btn w-full font-display text-lg py-5 px-4 rounded-lg border border-primary/50 text-foreground hover:bg-primary/10 hover:text-foreground transition-all duration-200" data-answer="no">
            NO
          </button>
        </div>
      `;

      modalContentArea.querySelectorAll(".step-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const ans = btn.getAttribute("data-answer");
          if (ans === "no") {
            currentStep = "rejected";
          } else {
            currentStep = "commitment";
          }
          renderStep();
        });
      });

    } else if (currentStep === "commitment") {
      modalContentArea.innerHTML = `
        <div class="text-center mb-6">
          <h3 class="font-display text-2xl text-gradient-gold">Will you show up live on 17th January?</h3>
          <p class="text-muted-foreground text-center text-sm mt-2">(Can you give a commitment?)</p>
        </div>
        <div class="space-y-3 py-4">
          <button type="button" class="step-btn w-full font-display text-lg py-5 px-4 rounded-lg border border-primary/50 text-foreground hover:bg-primary/10 hover:text-foreground transition-all duration-200" data-answer="yes">
            YES
          </button>
          <button type="button" class="step-btn w-full font-display text-lg py-5 px-4 rounded-lg border border-primary/50 text-foreground hover:bg-primary/10 hover:text-foreground transition-all duration-200" data-answer="no">
            NO
          </button>
        </div>
      `;

      modalContentArea.querySelectorAll(".step-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const ans = btn.getAttribute("data-answer");
          if (ans === "no") {
            currentStep = "rejected";
          } else {
            currentStep = "contact";
          }
          renderStep();
        });
      });

    } else if (currentStep === "contact") {
      modalContentArea.innerHTML = `
        <div class="text-center mb-6">
          <h3 class="font-display text-2xl text-gradient-gold">Reserve Your Spot</h3>
        </div>
        <form id="contact-form" class="space-y-4 py-2" novalidate>
          <div class="space-y-2">
            <label for="name" class="font-body text-foreground block text-left">Full Name</label>
            <input id="name" name="name" type="text" placeholder="Enter your name" 
              class="w-full px-4 py-3 rounded-md bg-secondary text-foreground border border-border focus:border-primary focus:outline-none transition-colors" />
            <p id="error-name" class="text-red-500 text-sm hidden text-left"></p>
          </div>

          <div class="space-y-2">
            <label for="email" class="font-body text-foreground block text-left">Email Address</label>
            <input id="email" name="email" type="email" placeholder="Enter your email" 
              class="w-full px-4 py-3 rounded-md bg-secondary text-foreground border border-border focus:border-primary focus:outline-none transition-colors" />
            <p id="error-email" class="text-red-500 text-sm hidden text-left"></p>
          </div>

          <div class="space-y-2">
            <label for="phone" class="font-body text-foreground block text-left">Phone Number</label>
            <input id="phone" name="phone" type="tel" placeholder="Enter your phone number" 
              class="w-full px-4 py-3 rounded-md bg-secondary text-foreground border border-border focus:border-primary focus:outline-none transition-colors" />
            <p id="error-phone" class="text-red-500 text-sm hidden text-left"></p>
          </div>

          <button id="submit-contact-btn" type="submit" 
            class="mirror-button w-full text-primary-foreground font-display text-lg py-5 px-6 border-0 rounded-lg mt-6 font-semibold cursor-pointer">
            Claim My Spot
          </button>
        </form>
      `;

      const form = document.getElementById("contact-form");
      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const phoneInput = document.getElementById("phone");
      const submitBtn = document.getElementById("submit-contact-btn");

      const errName = document.getElementById("error-name");
      const errEmail = document.getElementById("error-email");
      const errPhone = document.getElementById("error-phone");

      // Clear errors on input
      nameInput.addEventListener("input", () => {
        errName.classList.add("hidden");
        nameInput.classList.remove("border-red-500");
      });
      emailInput.addEventListener("input", () => {
        errEmail.classList.add("hidden");
        emailInput.classList.remove("border-red-500");
      });
      phoneInput.addEventListener("input", () => {
        errPhone.classList.add("hidden");
        phoneInput.classList.remove("border-red-500");
      });

      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        let isValid = true;
        const nameVal = nameInput.value.trim();
        const emailVal = emailInput.value.trim();
        const phoneVal = phoneInput.value.trim();

        // Validate Name
        if (!nameVal) {
          errName.textContent = "Name is required";
          errName.classList.remove("hidden");
          nameInput.classList.add("border-red-500");
          isValid = false;
        } else if (nameVal.length < 2) {
          errName.textContent = "Name must be at least 2 characters";
          errName.classList.remove("hidden");
          nameInput.classList.add("border-red-500");
          isValid = false;
        }

        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailVal) {
          errEmail.textContent = "Email is required";
          errEmail.classList.remove("hidden");
          emailInput.classList.add("border-red-500");
          isValid = false;
        } else if (!emailRegex.test(emailVal)) {
          errEmail.textContent = "Please enter a valid email";
          errEmail.classList.remove("hidden");
          emailInput.classList.add("border-red-500");
          isValid = false;
        }

        // Validate Phone
        const digitsOnly = phoneVal.replace(/\D/g, "");
        if (!phoneVal) {
          errPhone.textContent = "Phone number is required";
          errPhone.classList.remove("hidden");
          phoneInput.classList.add("border-red-500");
          isValid = false;
        } else if (digitsOnly.length < 10) {
          errPhone.textContent = "Please enter a valid phone number";
          errPhone.classList.remove("hidden");
          phoneInput.classList.add("border-red-500");
          isValid = false;
        }

        if (!isValid) return;

        isSubmitting = true;
        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting...";
        submitBtn.style.opacity = "0.7";

        try {
          await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            mode: "no-cors",
            body: JSON.stringify({
              identity: selectedIdentity || "Already A Coach",
              name: nameVal,
              email: emailVal,
              phone: phoneVal,
              submitted_at: new Date().toISOString()
            })
          });

          // Track Meta Pixel Lead event if present
          if (typeof window !== "undefined" && window.fbq) {
            try { window.fbq("track", "Lead", {}); } catch (_) {}
          }

          closeModal();
          // Navigate to Thank You page
          window.location.href = "thank-you.html";

        } catch (err) {
          console.error("Error submitting form:", err);
          showToast("Error", "Something went wrong. Please try again.", true);
          submitBtn.disabled = false;
          submitBtn.textContent = "Claim My Spot";
          submitBtn.style.opacity = "1";
          isSubmitting = false;
        }
      });

    } else if (currentStep === "rejected") {
      modalContentArea.innerHTML = `
        <div class="text-center mb-6">
          <h3 class="font-display text-2xl text-gradient-gold">No Problem!</h3>
        </div>
        <div class="py-8 text-center">
          <p class="font-body text-xl text-foreground leading-relaxed">
            Good luck on your journey! We'll reach out to you whenever you feel like building one.
          </p>
          <p class="font-body text-muted-foreground mt-4 italic">
            "Rome wasn't built in a day, but they were laying bricks every hour."
          </p>
        </div>
        <button id="rejected-close-btn" type="button" 
          class="w-full font-display text-lg py-5 px-6 rounded-lg border border-primary/50 text-foreground hover:bg-primary/10 transition-all duration-200">
          Close
        </button>
      `;

      document.getElementById("rejected-close-btn").addEventListener("click", closeModal);
    }
  }

  // --- Attach Event Listeners ---
  function init() {
    updateDeadlineDate();
    initCountdownTimer();

    // Trigger buttons
    const triggerIds = ["hero-cta-btn", "session-cta-btn", "final-cta-btn", "sticky-cta-btn"];
    triggerIds.forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          openModal();
        });
      }
    });

    // Close button & overlay click
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener("click", closeModal);
    }

    if (modalOverlay) {
      modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
          closeModal();
        }
      });
    }

    // Keyboard Escape to close
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalOverlay && !modalOverlay.classList.contains("hidden")) {
        closeModal();
      }
    });
  }

  // Run on DOM loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const DEFAULT_WEBHOOK =
  "https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjcwNTZkMDYzZjA0MzY1MjY1NTUzNzUxMzUi_pc";

const IDENTITY_OPTIONS = [
  "Already A Coach",
  "Want to become a coach",
  "Working professional",
  "Agency owner / Freelancer",
  "Business owner",
  "Student",
];

export default function RegistrationModal({ content, isOpen, onClose }) {
  const router = useRouter();
  const webhookUrl = content?.webhookUrl || DEFAULT_WEBHOOK;

  const [step, setStep] = useState("identity"); // identity | coaching | confidential | commitment | contact | rejected
  const [selectedIdentity, setSelectedIdentity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({ name: "", email: "", phone: "" });
  const [toastMessage, setToastMessage] = useState(null);

  // Reset modal state on close
  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep("identity");
      setSelectedIdentity("");
      setFormData({ name: "", email: "", phone: "" });
      setErrors({ name: "", email: "", phone: "" });
      setIsSubmitting(false);
      setToastMessage(null);
    }, 300);
  };

  // Keyboard Escape listener
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Identity selection handler
  const handleSelectIdentity = (opt) => {
    setSelectedIdentity(opt);
    setTimeout(() => {
      if (opt === "Student") {
        setStep("rejected");
      } else {
        setStep("coaching");
      }
    }, 300);
  };

  // Step 2 Coaching question handler
  const handleCoachingAnswer = (ans) => {
    if (ans === "no") {
      setStep("rejected");
    } else {
      setStep("confidential");
    }
  };

  // Step 3 Confidential handler
  const handleConfidentialAnswer = (ans) => {
    if (ans === "no") {
      setStep("rejected");
    } else {
      setStep("commitment");
    }
  };

  // Step 4 Commitment handler
  const handleCommitmentAnswer = (ans) => {
    if (ans === "no") {
      setStep("rejected");
    } else {
      setStep("contact");
    }
  };

  // Form field change
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Form validation & submission
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    let valid = true;
    const newErrors = { name: "", email: "", phone: "" };

    // Full name check
    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      newErrors.name = "Name is required";
      valid = false;
    } else if (trimmedName.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      valid = false;
    }

    // Email check
    const trimmedEmail = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(trimmedEmail)) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }

    // Phone check
    const trimmedPhone = formData.phone.trim();
    const digits = trimmedPhone.replace(/\D/g, "");
    if (!trimmedPhone) {
      newErrors.phone = "Phone number is required";
      valid = false;
    } else if (digits.length < 10) {
      newErrors.phone = "Please enter a valid phone number";
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    setIsSubmitting(true);

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors",
        body: JSON.stringify({
          identity: selectedIdentity || "Already A Coach",
          name: trimmedName,
          email: trimmedEmail,
          phone: trimmedPhone,
          submitted_at: new Date().toISOString(),
        }),
      });

      if (typeof window !== "undefined" && window.fbq) {
        try {
          window.fbq("track", "Lead", {});
        } catch (_) {}
      }

      handleClose();
      router.push("/thank-you");
    } catch (err) {
      console.error("Submission error:", err);
      setToastMessage("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 animate-fade-in"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.88)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className="border-gradient-gold rounded-2xl p-4 sm:p-6 md:p-8 max-w-md w-full relative shadow-2xl max-h-[92vh] overflow-y-auto"
        style={{
          backgroundColor: "#191614",
          boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.95), 0 0 35px rgba(217, 165, 32, 0.25)",
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          type="button"
          className="absolute top-3 sm:top-4 right-3 sm:right-4 text-muted-foreground hover:text-foreground p-1.5 transition-colors rounded-full hover:bg-white/10 cursor-pointer z-10"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        {/* Toast alert if any error */}
        {toastMessage && (
          <div className="mb-4 p-3 rounded-lg bg-destructive/20 border border-destructive text-destructive-foreground text-sm">
            {toastMessage}
          </div>
        )}

        {/* STEP 1: IDENTITY */}
        {step === "identity" && (
          <div>
            <div className="text-center mb-6">
              <h3 className="font-display text-2xl text-gradient-gold">What Represents You The Best?</h3>
            </div>
            <div className="space-y-3 py-2">
              {IDENTITY_OPTIONS.map((opt) => {
                const isSelected = selectedIdentity === opt;
                return (
                  <div
                    key={opt}
                    onClick={() => handleSelectIdentity(opt)}
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors cursor-pointer bg-card/50 ${
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "border-border/50 hover:border-primary/50"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-none border border-primary flex items-center justify-center transition-colors ${
                        isSelected ? "bg-primary" : ""
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="w-3.5 h-3.5 text-primary-foreground"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <label className="font-body text-lg text-foreground cursor-pointer flex-1">
                      {opt}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: COACHING GOAL */}
        {step === "coaching" && (
          <div>
            <div className="text-center mb-6">
              <h3 className="font-display text-2xl text-gradient-gold">
                Do You Want to Build a 1 Crore Profitable Coaching Business in 2026?
              </h3>
            </div>
            <div className="space-y-3 py-4">
              <button
                type="button"
                onClick={() => handleCoachingAnswer("yes")}
                className="w-full font-display text-lg py-5 px-4 rounded-lg border border-primary/50 text-foreground hover:bg-primary/10 hover:text-foreground transition-all duration-200"
              >
                YES I WANT TO
              </button>
              <button
                type="button"
                onClick={() => handleCoachingAnswer("no")}
                className="w-full font-display text-lg py-5 px-4 rounded-lg border border-primary/50 text-foreground hover:bg-primary/10 hover:text-foreground transition-all duration-200"
              >
                NO NOT AT ALL
              </button>
              <button
                type="button"
                onClick={() => handleCoachingAnswer("maybe")}
                className="w-full font-display text-lg py-5 px-4 rounded-lg border border-primary/50 text-foreground hover:bg-primary/10 hover:text-foreground transition-all duration-200"
              >
                MAYBE
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CONFIDENTIAL */}
        {step === "confidential" && (
          <div>
            <div className="text-center mb-6">
              <h3 className="font-display text-2xl text-gradient-gold">
                Do you understand this is LIVE & Confidential?
              </h3>
              <p className="text-muted-foreground text-center text-sm mt-2">
                (No replays will be provided)
              </p>
            </div>
            <div className="space-y-3 py-4">
              <button
                type="button"
                onClick={() => handleConfidentialAnswer("yes")}
                className="w-full font-display text-lg py-5 px-4 rounded-lg border border-primary/50 text-foreground hover:bg-primary/10 hover:text-foreground transition-all duration-200"
              >
                YES
              </button>
              <button
                type="button"
                onClick={() => handleConfidentialAnswer("no")}
                className="w-full font-display text-lg py-5 px-4 rounded-lg border border-primary/50 text-foreground hover:bg-primary/10 hover:text-foreground transition-all duration-200"
              >
                NO
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: COMMITMENT */}
        {step === "commitment" && (
          <div>
            <div className="text-center mb-6">
              <h3 className="font-display text-2xl text-gradient-gold">
                Will you show up live on 17th January?
              </h3>
              <p className="text-muted-foreground text-center text-sm mt-2">
                (Can you give a commitment?)
              </p>
            </div>
            <div className="space-y-3 py-4">
              <button
                type="button"
                onClick={() => handleCommitmentAnswer("yes")}
                className="w-full font-display text-lg py-5 px-4 rounded-lg border border-primary/50 text-foreground hover:bg-primary/10 hover:text-foreground transition-all duration-200"
              >
                YES
              </button>
              <button
                type="button"
                onClick={() => handleCommitmentAnswer("no")}
                className="w-full font-display text-lg py-5 px-4 rounded-lg border border-primary/50 text-foreground hover:bg-primary/10 hover:text-foreground transition-all duration-200"
              >
                NO
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: CONTACT DETAILS */}
        {step === "contact" && (
          <div>
            <div className="text-center mb-6">
              <h3 className="font-display text-2xl text-gradient-gold">Reserve Your Spot</h3>
            </div>
            <form onSubmit={handleSubmitForm} className="space-y-4 py-2" noValidate>
              <div className="space-y-2">
                <label htmlFor="name" className="font-body text-foreground block text-left">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`w-full px-4 py-3 rounded-md bg-secondary text-foreground border ${
                    errors.name ? "border-red-500" : "border-border"
                  } focus:border-primary focus:outline-none transition-colors`}
                />
                {errors.name && <p className="text-red-500 text-sm text-left">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="font-body text-foreground block text-left">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full px-4 py-3 rounded-md bg-secondary text-foreground border ${
                    errors.email ? "border-red-500" : "border-border"
                  } focus:border-primary focus:outline-none transition-colors`}
                />
                {errors.email && <p className="text-red-500 text-sm text-left">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="font-body text-foreground block text-left">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`w-full px-4 py-3 rounded-md bg-secondary text-foreground border ${
                    errors.phone ? "border-red-500" : "border-border"
                  } focus:border-primary focus:outline-none transition-colors`}
                />
                {errors.phone && <p className="text-red-500 text-sm text-left">{errors.phone}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mirror-button w-full text-primary-foreground font-display text-base sm:text-lg py-3.5 sm:py-5 px-4 sm:px-6 border-0 rounded-lg mt-4 sm:mt-6 font-semibold cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Claim My Spot"}
              </button>
            </form>
          </div>
        )}

        {/* STEP: REJECTED */}
        {step === "rejected" && (
          <div>
            <div className="text-center mb-6">
              <h3 className="font-display text-2xl text-gradient-gold">No Problem!</h3>
            </div>
            <div className="py-8 text-center">
              <p className="font-body text-xl text-foreground leading-relaxed">
                Good luck on your journey! We&apos;ll reach out to you whenever you feel like building one.
              </p>
              <p className="font-body text-muted-foreground mt-4 italic">
                &ldquo;Rome wasn&apos;t built in a day, but they were laying bricks every hour.&rdquo;
              </p>
            </div>
            <button
              onClick={handleClose}
              type="button"
              className="w-full font-display text-lg py-5 px-6 rounded-lg border border-primary/50 text-foreground hover:bg-primary/10 transition-all duration-200"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

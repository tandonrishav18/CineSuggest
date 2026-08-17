// Motion — standalone DOM animation via window.Motion (motion/dist/motion.js IIFE)
const animateMini = window.Motion ? window.Motion.animateMini : (el, props, opts) => {};

// ─── Element refs ────────────────────────────────────────────────────────────
const form          = document.querySelector(".verification-card");
const input         = document.querySelector("#login-code");
const feedback      = document.querySelector("#verification-feedback");
const resendButton  = document.querySelector(".resend-button");
const goBackButton  = document.querySelector(".secondary-button");
const primaryButton = document.querySelector(".primary-button");
const brand         = document.querySelector(".brand");

// ─── Spring-like cubic bezier easings ────────────────────────────────────────
const easeSpring  = [0.22, 1.2, 0.36, 1];   // snappy with slight overshoot
const easeSettle  = [0.19, 1.0, 0.22, 1.0]; // gentle settle
const easeBounce  = [0.34, 1.56, 0.64, 1];  // bouncy press release

// ─── 1. Brand logo — slide in ────────────────────────────────────────────────
if (brand) {
  animateMini(
    brand,
    { opacity: [0, 1], transform: ["translateX(-28px)", "translateX(0px)"] },
    { duration: 0.75, easing: easeSpring }
  );
}

// ─── 2. Verification card — spring rise ──────────────────────────────────────
if (form) {
  animateMini(
    form,
    {
      opacity: [0, 1],
      transform: ["translateY(56px) scale(0.96)", "translateY(0px) scale(1)"],
    },
    { delay: 0.12, duration: 0.85, easing: easeSettle }
  );
}

// ─── 3. Card children — manual stagger ───────────────────────────────────────
const cardChildren = [
  ".card-heading-group",
  ".code-input",
  ".action-group",
  ".secondary-button",
];

cardChildren.forEach((selector, i) => {
  const el = document.querySelector(selector);
  if (!el) return;
  animateMini(
    el,
    { opacity: [0, 1], transform: ["translateY(18px)", "translateY(0px)"] },
    { duration: 0.5, delay: 0.32 + i * 0.09, easing: [0.22, 1, 0.36, 1] }
  );
});

// ─── 5. Button press micro-interactions ──────────────────────────────────────
function addPressAnim(el) {
  if (!el) return;
  el.addEventListener("pointerdown", () =>
    animateMini(el, { transform: "scale(0.95)" }, { duration: 0.1, easing: "ease-out" })
  );
  const release = () =>
    animateMini(
      el,
      { transform: ["scale(0.95)", "scale(1.03)", "scale(1)"] },
      { duration: 0.4, easing: easeBounce }
    );
  el.addEventListener("pointerup", release);
  el.addEventListener("pointerleave", release);
}

addPressAnim(primaryButton);
addPressAnim(goBackButton);

// ─── 6. Input focus ring ──────────────────────────────────────────────────────
if (input) {
  input.addEventListener("focus", () =>
    animateMini(
      input,
      { boxShadow: "0 0 0 4px rgba(229,9,20,0.35)" },
      { duration: 0.3, easing: [0.22, 1, 0.36, 1] }
    )
  );
  input.addEventListener("blur", () =>
    animateMini(
      input,
      { boxShadow: "0 0 0 0px rgba(229,9,20,0)" },
      { duration: 0.25, easing: "ease-out" }
    )
  );

  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "").slice(0, 6);
  });
}

// ─── 7. Form logic ────────────────────────────────────────────────────────────
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!input || input.value.length !== 6) {
      // Shake
      animateMini(
        form,
        {
          transform: [
            "translateX(0px)", "translateX(-10px)", "translateX(10px)",
            "translateX(-7px)", "translateX(7px)", "translateX(-3px)",
            "translateX(3px)", "translateX(0px)",
          ],
        },
        { duration: 0.5, easing: "linear" }
      );
      if (feedback) feedback.textContent = "Enter any 6 digit code.";
      return;
    }
    // Success bounce
    if (primaryButton) {
      animateMini(
        primaryButton,
        { transform: ["scale(1)", "scale(1.06)", "scale(1)"] },
        { duration: 0.4, easing: easeBounce }
      );
    }
    if (feedback) feedback.textContent = "Code submitted. Redirecting...";
    
    // Redirect to home page after the animation plays
    setTimeout(() => {
      window.location.href = "./home/";
    }, 500);
  });
}

if (resendButton) {
  resendButton.addEventListener("click", () => {
    if (feedback) feedback.textContent = "A new verification code has been sent to your email.";
  });
}

if (goBackButton) {
  goBackButton.addEventListener("click", () => {
    if (feedback) feedback.textContent = "Going back...";
    setTimeout(() => {
      window.location.href = "./landing/";
    }, 300);
  });
}


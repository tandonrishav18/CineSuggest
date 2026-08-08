import { useState } from "react";
import { motion } from "motion/react";

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [code, setCode] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      setIsShaking(true);
      setFeedback("Enter any 6 digit code.");
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    setIsBouncing(true);
    setFeedback("Code submitted. Redirecting...");
    setTimeout(() => {
      onLoginSuccess();
    }, 500);
  };

  const handleResend = () => {
    setFeedback("A new verification code has been sent to your email.");
  };

  return (
    <div className="screen min-h-screen bg-[#001017] text-white flex flex-col justify-center items-center relative overflow-hidden font-sans py-8">
      {/* Background shape grid & spotlight */}
      <div className="shape-grid absolute inset-0 pointer-events-none opacity-30" aria-hidden="true" />
      <div className="spotlight absolute inset-0 pointer-events-none opacity-40" aria-hidden="true" />

      {/* Brand Header Logo */}
      <header className="brand z-10 my-6 text-center select-none" aria-label="Cine Suggest">
        <div id="brand-logo" className="flex items-center justify-center gap-1">
          <span className="font-jaro text-6xl md:text-8xl font-black tracking-wider text-white">Cine</span>
          <span className="font-jaro text-6xl md:text-8xl font-black tracking-wider text-[#4df2d6]">Suggest</span>
        </div>
      </header>

      {/* Verification Card Form Shell */}
      <main className="verification-shell relative z-10 w-full max-w-lg px-4 pb-8 flex justify-center">
        <motion.form
          onSubmit={handleSubmit}
          animate={
            isShaking
              ? { x: [0, -10, 10, -7, 7, -3, 3, 0] }
              : { opacity: 1, scale: 1 }
          }
          transition={{ duration: 0.5, ease: "linear" }}
          className="verification-card w-full max-w-[494px] rounded-[28px] border border-white/20 bg-slate-950/70 backdrop-blur-xl p-8 md:p-12 flex flex-col items-center gap-6 shadow-2xl"
          aria-labelledby="verification-title"
        >
          <div className="card-heading-group flex flex-col items-center text-center gap-3 w-full">
            <h1 id="verification-title" className="font-share text-3xl md:text-4xl font-bold text-white tracking-wide">
              Verify your Identity
            </h1>
            <p className="text-slate-300 text-lg md:text-xl font-light">
              We have sent email with your login code
            </p>
          </div>

          <div className="w-full flex flex-col items-center gap-2">
            <label className="sr-only" htmlFor="login-code">
              Enter any 6 digit code
            </label>
            <input
              id="login-code"
              type="text"
              className="code-input w-full h-14 px-8 border border-white/40 rounded-full bg-white/10 text-white placeholder-white/50 text-center font-mono text-xl outline-none focus:border-[#4df2d6] focus:ring-2 focus:ring-[#4df2d6]/30 transition-all"
              name="login-code"
              inputMode="numeric"
              maxLength={6}
              pattern="[0-9]*"
              placeholder="Enter any 6 digit code..."
              autoComplete="one-time-code"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            />
          </div>

          <div className="action-group flex flex-col items-center gap-4 w-full">
            <motion.button
              type="submit"
              animate={isBouncing ? { scale: [1, 1.06, 1] } : {}}
              transition={{ duration: 0.4 }}
              className="primary-button w-full h-12 rounded-full bg-[#75d4cb] hover:bg-[#5dbcbc] text-black font-semibold text-lg transition-all cursor-pointer shadow-md flex items-center justify-center"
            >
              Continue
            </motion.button>
            <p className="resend-copy text-sm md:text-base font-light text-slate-300 text-center">
              Check your spam folder if you didn&rsquo;t get the mail. Still nothing?{" "}
              <button
                type="button"
                onClick={handleResend}
                className="resend-button font-bold text-white hover:text-[#75d4cb] transition-colors underline cursor-pointer"
              >
                Resend code.
              </button>
            </p>
          </div>

          {feedback && (
            <p className="text-sm font-mono text-[#4df2d6] text-center" aria-live="polite">
              {feedback}
            </p>
          )}

          <button
            type="button"
            onClick={() => setCode("")}
            className="secondary-button w-full h-12 rounded-full border border-white/40 text-[#75d4cb] hover:bg-white hover:text-black font-semibold text-lg transition-all cursor-pointer flex items-center justify-center"
          >
            Go Back
          </button>
        </motion.form>
      </main>
    </div>
  );
}

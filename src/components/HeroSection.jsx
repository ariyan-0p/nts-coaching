import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Phone, ChevronLeft, ChevronRight, TrendingUp, Users, Award, Zap } from "lucide-react";

const slides = [
  {
    id: 0,
    tag: "Sales Mastery",
    headline: ["Helping You Master", "Sales & Close"],
    accent: "High Ticket Deals",
    subtext: "Sales Coach | 18+ Years Experience | 500+ Corporate Workshops | Proven Results Across Industries",
  },
  {
    id: 1,
    tag: "Performance Coach",
    headline: ["Nail the Sale"],
    accent: "with Ankit",
    subtext: "Empowering Sales Professionals to Close Bigger, Better, Faster. Trained 5000+ Professionals in Sales Psychology.",
  },
  {
    id: 2,
    tag: "Team Transformation",
    headline: ["Transform Teams Into"],
    accent: "Closing Machines",
    subtext: "Blend battle-tested sales strategies with neuroscience-backed buyer psychology to crack even the toughest deals.",
  },
];

const stats = [
  { icon: TrendingUp, value: "18+", label: "Years Experience" },
  { icon: Users,      value: "5K+", label: "Professionals Trained" },
  { icon: Award,      value: "500+", label: "Corporate Workshops" },
  { icon: Zap,        value: "98%",  label: "Success Rate" },
];

function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState("0");
  useEffect(() => {
    if (!start) return;
    const num = parseInt(target.replace(/\D/g, ""));
    const suffix = target.replace(/[0-9]/g, "");
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * num) + suffix);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [start, target, duration]);
  return count;
}

function StatCard({ icon: Icon, value, label, delay, started }) {
  const display = useCounter(value, 1800, started);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="h-stat-card"
    >
      <div className="h-stat-icon"><Icon size={15} /></div>
      <div className="h-stat-value">{display}</div>
      <div className="h-stat-label">{label}</div>
    </motion.div>
  );
}

export default function HeroSection() {
  const [current, setCurrent]           = useState(0);
  const [statsStarted, setStatsStarted] = useState(false);
  const [mousePos, setMousePos]         = useState({ x: 0.5, y: 0.5 });
  const heroRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(p => (p + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setStatsStarted(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleMouse = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const next = () => setCurrent(p => (p + 1) % slides.length);
  const prev = () => setCurrent(p => (p - 1 + slides.length) % slides.length);

  return (
    <>
      <style>{`
        /* ─────────────────────────────────────────
           HERO — all colours from global CSS vars
           so both dark & light themes work
        ───────────────────────────────────────── */

        .hero {
          position: relative;
          min-height: 100svh;
          background: var(--bg);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          font-family: var(--font-body);
          transition: background var(--theme-speed);
        }

        /* Grid */
        .hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 100%, black 30%, transparent 100%);
          pointer-events: none;
          transition: opacity var(--theme-speed);
        }

        /* Mouse glow */
        .hero-glow {
          position: absolute; inset: 0;
          pointer-events: none;
        }

        /* Ambient blobs */
        .h-glow-1 {
          position: absolute; width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(220,38,38,0.12) 0%, transparent 70%);
          top: -100px; right: -100px; pointer-events: none;
          animation: h-pulse 8s ease-in-out infinite alternate;
        }
        .h-glow-2 {
          position: absolute; width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(220,38,38,0.06) 0%, transparent 70%);
          bottom: 0; left: 20%; pointer-events: none;
          animation: h-pulse 6s ease-in-out infinite alternate-reverse;
        }
        @keyframes h-pulse {
          from { transform: scale(1);   opacity: 0.6; }
          to   { transform: scale(1.2); opacity: 1;   }
        }
        /* Soften glows in light mode */
        [data-theme="light"] .h-glow-1 { background: radial-gradient(circle, rgba(220,38,38,0.06) 0%, transparent 70%); }
        [data-theme="light"] .h-glow-2 { background: radial-gradient(circle, rgba(220,38,38,0.03) 0%, transparent 70%); }

        /* Scanlines — dark only */
        .h-scanlines {
          position: absolute; inset: 0;
          background: repeating-linear-gradient(
            0deg, transparent, transparent 2px,
            rgba(0,0,0,0.025) 2px, rgba(0,0,0,0.025) 4px
          );
          pointer-events: none;
        }
        [data-theme="light"] .h-scanlines { display: none; }

        /* Diagonal accent */
        .h-diagonal {
          position: absolute; right: 35%; top: 0; bottom: 0; width: 1px;
          background: linear-gradient(to bottom,
            transparent,
            rgba(220,38,38,0.25) 30%,
            rgba(220,38,38,0.25) 70%,
            transparent
          );
          pointer-events: none;
        }
        @media (max-width: 768px) { .h-diagonal { display: none; } }

        /* Top progress bar */
        .h-progress-bar {
          position: absolute; top: 0; left: 0;
          height: 2px;
          background: var(--red);
          box-shadow: 0 0 10px rgba(220,38,38,0.6);
          z-index: 30;
        }

        /* ── Body grid ── */
        .hero-body {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          max-width: 1400px; width: 100%;
          margin: 0 auto; padding: 0 40px;
          align-items: center;
          position: relative; z-index: 10;
        }
        @media (max-width: 900px) {
          .hero-body { grid-template-columns: 1fr; padding: 0 20px; align-items: start; }
        }
        @media (max-width: 480px) { .hero-body { padding: 0 16px; } }

        /* ── Left ── */
        .hero-left {
          display: flex; flex-direction: column;
          padding: 32px 0 16px;
        }
        /* Push content below the fixed navbar (68px) on mobile */
        @media (max-width: 900px) { .hero-left { padding: 84px 0 16px; } }
        @media (max-width: 480px) { .hero-left { padding: 80px 0 12px; } }

        /* Slide tag */
        .h-slide-tag {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 14px;
          border: 1px solid var(--border-red);
          border-radius: 2px;
          background: var(--red-dim);
          color: var(--red);
          font-size: 0.7rem;
          font-family: var(--font-head);
          letter-spacing: 0.2em; text-transform: uppercase;
          margin-bottom: 16px; width: fit-content;
          transition: background var(--theme-speed), border-color var(--theme-speed);
        }

        .h-dot-blink {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--red);
          animation: h-blink 1.5s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes h-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.2; }
        }

        /* Slide wrapper */
        .h-slide-wrapper {
          position: relative; min-height: 280px; margin-bottom: 24px;
        }
        .h-slide-inner { position: absolute; top: 0; left: 0; width: 100%; }

        @media (max-width: 1200px) { .h-slide-wrapper { min-height: 300px; } }
        @media (max-width: 900px) {
          .h-slide-wrapper { min-height: unset; margin-bottom: 0; }
          .h-slide-inner   { position: relative; top: auto; left: auto; }
        }

        /* Headline */
        .h-headline {
          font-family: var(--font-head);
          font-weight: 800;
          font-size: clamp(2.6rem, 8vw, 4.8rem);
          line-height: 1.0; letter-spacing: -0.01em;
          color: var(--text); text-transform: uppercase;
          margin-bottom: 8px;
          transition: color var(--theme-speed);
        }
        @media (max-width: 400px) { .h-headline { font-size: 2.2rem; } }

        .h-headline-accent {
          display: block; color: var(--red);
          position: relative; width: fit-content;
        }
        .h-headline-accent::after {
          content: '';
          position: absolute; bottom: -4px; left: 0;
          width: 100%; height: 3px;
          background: linear-gradient(90deg, var(--red), transparent);
        }

        /* Subtext */
        .h-subtext {
          font-size: clamp(0.85rem, 1.5vw, 1rem);
          color: var(--text-muted); line-height: 1.65;
          max-width: 480px; font-weight: 300; margin-top: 16px;
          transition: color var(--theme-speed);
        }
        @media (max-width: 900px) { .h-subtext { font-size: 0.9rem; max-width: 100%; } }

        /* CTA row */
        .h-cta-row {
          display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 28px;
        }
        @media (max-width: 480px) {
          .h-cta-row { gap: 10px; margin-bottom: 20px; }
          .h-cta-row .h-btn-primary,
          .h-cta-row .h-btn-secondary { font-size: 0.8rem; padding: 12px 18px; }
        }

        /* Primary button */
        .h-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px;
          background: var(--red); color: #fff;
          font-family: var(--font-head); font-weight: 700;
          font-size: 0.95rem; letter-spacing: 0.12em; text-transform: uppercase;
          border: none; cursor: pointer;
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
          transition: all 0.2s;
          position: relative; overflow: hidden;
        }
        .h-btn-primary::before {
          content: ''; position: absolute; inset: 0;
          background: rgba(255,255,255,0.12);
          transform: translateX(-100%); transition: transform 0.3s;
        }
        .h-btn-primary:hover::before { transform: translateX(0); }
        .h-btn-primary:hover { box-shadow: 0 0 30px rgba(220,38,38,0.5); }

        /* Secondary button */
        .h-btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 24px;
          background: transparent; color: var(--text);
          font-family: var(--font-head); font-weight: 600;
          font-size: 0.95rem; letter-spacing: 0.12em; text-transform: uppercase;
          border: 1px solid var(--border); cursor: pointer;
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
          transition: all 0.2s;
        }
        .h-btn-secondary:hover {
          border-color: var(--border-red);
          background: var(--red-dim);
          color: var(--red);
        }

        .h-play-icon {
          width: 28px; height: 28px; border-radius: 50%;
          background: var(--red-dim); border: 1px solid var(--border-red);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }

        /* Stats bar */
        .h-stats-row {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1px; background: var(--border);
          border: 1px solid var(--border); overflow: hidden; margin-bottom: 8px;
        }
        @media (max-width: 600px) { .h-stats-row { grid-template-columns: repeat(2, 1fr); } }

        .h-stat-card {
          background: var(--surface); padding: 16px 12px;
          display: flex; flex-direction: column; align-items: center;
          gap: 4px; text-align: center; transition: background 0.2s;
        }
        .h-stat-card:hover { background: var(--red-dim); }

        .h-stat-icon {
          width: 28px; height: 28px; border-radius: 4px;
          background: var(--red-dim); border: 1px solid var(--border-red);
          display: flex; align-items: center; justify-content: center;
          color: var(--red); margin-bottom: 4px;
        }

        .h-stat-value {
          font-family: var(--font-head); font-weight: 800;
          font-size: 1.5rem; color: var(--text); line-height: 1;
          transition: color var(--theme-speed);
        }

        .h-stat-label {
          font-size: 0.62rem; color: var(--text-muted);
          letter-spacing: 0.08em; text-transform: uppercase;
          font-family: var(--font-head);
          transition: color var(--theme-speed);
        }

        /* ── Right column (desktop image) ── */
        .hero-right {
          position: relative; display: flex;
          align-items: center; justify-content: center; height: 100%;
        }
        @media (max-width: 900px) { .hero-right { display: none; } }

        .h-image-frame {
          position: relative; width: 100%; height: 100%;
          max-width: 460px; display: flex;
          align-items: center; justify-content: center;
        }

        /* HUD rings */
        .h-hud-ring {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 420px; height: 420px; border-radius: 50%;
          border: 1px solid rgba(220,38,38,0.12); pointer-events: none;
          animation: h-spin 20s linear infinite;
        }
        .h-hud-ring::before {
          content: ''; position: absolute; top: -3px; left: 30%;
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--red); box-shadow: 0 0 10px var(--red);
        }
        .h-hud-ring-2 {
          width: 360px; height: 360px;
          border-color: rgba(220,38,38,0.06);
          animation-direction: reverse; animation-duration: 15s;
        }
        @keyframes h-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }

        /* Corner brackets */
        .h-bracket { position: absolute; width: 24px; height: 24px; border-color: rgba(220,38,38,0.5); border-style: solid; }
        .h-bracket.tl { top: 0; left: 0; border-width: 2px 0 0 2px; }
        .h-bracket.tr { top: 0; right: 0; border-width: 2px 2px 0 0; }
        .h-bracket.bl { bottom: 0; left: 0; border-width: 0 0 2px 2px; }
        .h-bracket.br { bottom: 0; right: 0; border-width: 0 2px 2px 0; }

        .h-hero-img {
          position: relative; z-index: 5;
          width: 100%; max-height: 80vh;
          object-fit: contain; object-position: center;
          filter: drop-shadow(0 20px 60px rgba(0,0,0,0.6));
          transition: filter var(--theme-speed);
        }
        [data-theme="light"] .h-hero-img {
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.12));
        }

        /* HUD data tags */
        .h-hud-tag {
          position: absolute; right: -20px;
          background: var(--bg-2);
          border: 1px solid var(--border); border-left: 2px solid var(--red);
          padding: 8px 14px; backdrop-filter: blur(10px); z-index: 10;
          transition: background var(--theme-speed), border-color var(--theme-speed);
        }
        .h-hud-tag.t1 { top: 30%; }
        .h-hud-tag.t2 { top: 55%; right: -10px; }
        [data-theme="light"] .h-hud-tag { box-shadow: 0 4px 20px rgba(0,0,0,0.08); }

        .h-hud-tag-label {
          font-size: 0.6rem; color: var(--text-muted);
          letter-spacing: 0.15em; text-transform: uppercase;
          font-family: var(--font-head);
        }
        .h-hud-tag-value {
          font-family: var(--font-head); font-size: 1.1rem;
          font-weight: 700; color: var(--text); line-height: 1.2;
          transition: color var(--theme-speed);
        }

        /* ── Mobile image strip ── */
        .h-mobile-img {
          display: none; position: relative;
          height: 320px; overflow: visible; margin: 20px 0;
        }
        @media (max-width: 900px) {
          .h-mobile-img { display: flex; align-items: flex-end; justify-content: center; }
        }
        @media (max-width: 480px) { .h-mobile-img { height: 260px; margin: 16px 0; } }
        @media (max-width: 360px) { .h-mobile-img { height: 220px; } }

        .h-mobile-img img {
          display: block; height: 100%; width: auto; max-width: 100%;
          object-fit: contain; object-position: bottom center;
          filter: drop-shadow(0 0 50px rgba(220,38,38,0.3)) drop-shadow(0 20px 40px rgba(0,0,0,0.7));
          position: relative; z-index: 2;
          transition: filter var(--theme-speed);
        }
        [data-theme="light"] .h-mobile-img img {
          filter: drop-shadow(0 0 30px rgba(220,38,38,0.12)) drop-shadow(0 20px 40px rgba(0,0,0,0.1));
        }
        .h-mobile-img::before {
          content: ''; position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(220,38,38,0.18) 0%, transparent 70%);
          z-index: 1; pointer-events: none;
        }
        [data-theme="light"] .h-mobile-img::before {
          background: radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 70%);
        }
        .h-mobile-img::after {
          content: ''; position: absolute; bottom: -1px; left: 0; right: 0;
          height: 20%;
          background: linear-gradient(to top, var(--bg), transparent);
          z-index: 3; pointer-events: none;
        }

        /* ── Footer controls ── */
        .h-footer {
          position: relative; z-index: 20;
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 32px;
          border-top: 1px solid var(--border);
          backdrop-filter: blur(10px);
          background: var(--surface);
          transition: border-color var(--theme-speed), background var(--theme-speed);
        }
        @media (max-width: 600px) { .h-footer { padding: 12px 20px; } }
        @media (max-width: 400px) { .h-footer { padding: 10px 16px; } }

        .h-slide-counter {
          font-family: var(--font-head); font-size: 0.75rem;
          color: var(--text-muted); letter-spacing: 0.1em;
          transition: color var(--theme-speed);
        }
        .h-slide-counter span { color: var(--red); }

        .h-progress-dot {
          height: 2px; border-radius: 2px;
          transition: all 0.3s; cursor: pointer; border: none; padding: 0;
        }
        .h-progress-dot.active {
          width: 32px; background: var(--red);
          box-shadow: 0 0 8px rgba(220,38,38,0.5);
        }
        .h-progress-dot.inactive { width: 16px; background: var(--border); }

        .h-arrow-btn {
          width: 36px; height: 36px;
          background: var(--surface); border: 1px solid var(--border);
          color: var(--text); display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s;
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
        }
        .h-arrow-btn:hover {
          background: var(--red-dim); border-color: var(--border-red); color: var(--red);
        }

        /* ── FAB ── */
        .h-fab {
          position: fixed; bottom: 28px; right: 28px; z-index: 100;
          width: 52px; height: 52px;
          background: var(--red); color: white; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
          box-shadow: 0 0 20px rgba(220,38,38,0.4); transition: all 0.2s;
        }
        .h-fab:hover { transform: scale(1.08); box-shadow: 0 0 35px rgba(220,38,38,0.6); }

        /* ── Light theme overrides ── */
        [data-theme="light"] .hero {
          background: linear-gradient(160deg, #fafafa 60%, #fff5f5 100%);
        }
        [data-theme="light"] .hero-grid { opacity: 0.6; }
      `}</style>

      {/* Hero wrapper */}
      <div ref={heroRef} className="hero">

        {/* Background layers */}
        <div className="hero-grid" />
        <div
          className="hero-glow"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(220,38,38,0.08) 0%, transparent 60%)`,
          }}
        />
        <div className="h-glow-1" />
        <div className="h-glow-2" />
        <div className="h-scanlines" />
        <div className="h-diagonal" />

        {/* Top slide progress bar */}
        <motion.div
          className="h-progress-bar"
          key={current}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear" }}
        />

        {/* Hero body */}
        <div className="hero-body">

          {/* ── Left ── */}
          <div className="hero-left">

            {/* Slide tag */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`tag-${current}`}
                className="h-slide-tag"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="h-dot-blink" />
                {slides[current].tag}
              </motion.div>
            </AnimatePresence>

            {/* Sliding headline */}
            <div className="h-slide-wrapper">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${current}`}
                  initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -30, filter: "blur(6px)" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="h-slide-inner"
                >
                  <h1 className="h-headline">
                    {slides[current].headline.map((line, i) => (
                      <span key={i} style={{ display: "block" }}>{line}</span>
                    ))}
                    <span className="h-headline-accent">{slides[current].accent}</span>
                  </h1>
                  <p className="h-subtext">{slides[current].subtext}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile image */}
            <div className="h-mobile-img">
              <img src="/assets/ankit-hero.png" alt="Ankit Khare" />
            </div>

            {/* CTAs */}
            <div className="h-cta-row">
              <button className="h-btn-primary">Let's Connect Today</button>
              <button className="h-btn-secondary">
                <div className="h-play-icon">
                  <Play size={12} fill="#dc2626" color="#dc2626" />
                </div>
                Watch Video
              </button>
            </div>

            {/* Stats */}
            <div className="h-stats-row">
              {stats.map((s, i) => (
                <StatCard key={s.label} {...s} delay={0.8 + i * 0.1} started={statsStarted} />
              ))}
            </div>

          </div>

          {/* ── Right (desktop image) ── */}
          <div className="hero-right">
            <div className="h-image-frame">
              <div className="h-hud-ring" />
              <div className="h-hud-ring h-hud-ring-2" />
              <div className="h-bracket tl" /><div className="h-bracket tr" />
              <div className="h-bracket bl" /><div className="h-bracket br" />

              <motion.img
                src="/assets/ankit-hero.png"
                alt="Ankit Khare"
                className="h-hero-img"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              />

              <motion.div className="h-hud-tag t1"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                <div className="h-hud-tag-label">Experience</div>
                <div className="h-hud-tag-value">18+ Years</div>
              </motion.div>

              <motion.div className="h-hud-tag t2"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
                <div className="h-hud-tag-label">Trained</div>
                <div className="h-hud-tag-value">5K+ Pros</div>
              </motion.div>
            </div>
          </div>

        </div>

        {/* Footer controls */}
        <div className="h-footer">
          <div className="h-slide-counter">
            <span>0{current + 1}</span> / 0{slides.length}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {slides.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className={`h-progress-dot ${i === current ? "active" : "inactive"}`}
              />
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="h-arrow-btn" onClick={prev}><ChevronLeft size={16} /></button>
            <button className="h-arrow-btn" onClick={next}><ChevronRight size={16} /></button>
          </div>
        </div>

      </div>

      {/* FAB */}
      <motion.button className="h-fab"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        <Phone size={20} />
      </motion.button>
    </>
  );
}
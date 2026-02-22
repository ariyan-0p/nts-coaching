import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Play, Phone, ChevronLeft, ChevronRight, TrendingUp, Users, Award, Zap } from "lucide-react";

const slides = [
  {
    id: 0,
    tag: "Sales Mastery",
    headline: ["Helping You Master", "Sales & Close"],
    accent: "High Ticket Deals",
    subtext: "Sales Coach | 18+ Years Experience | 500+ Corporate Workshops | Proven Results Across Industries",
    color: "#dc2626",
  },
  {
    id: 1,
    tag: "Performance Coach",
    headline: ["Nail the Sale"],
    accent: "with Ankit",
    subtext: "Empowering Sales Professionals to Close Bigger, Better, Faster. Trained 5000+ Professionals in Sales Psychology.",
    color: "#dc2626",
  },
  {
    id: 2,
    tag: "Team Transformation",
    headline: ["Transform Teams Into"],
    accent: "Closing Machines",
    subtext: "Blend battle-tested sales strategies with neuroscience-backed buyer psychology to crack even the toughest deals.",
    color: "#dc2626",
  },
];

const stats = [
  { icon: TrendingUp, value: "18+", label: "Years Experience" },
  { icon: Users, value: "5K+", label: "Professionals Trained" },
  { icon: Award, value: "500+", label: "Corporate Workshops" },
  { icon: Zap, value: "98%", label: "Success Rate" },
];

// Animated counter hook
function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
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
  return count || "0";
}

function StatCard({ icon: Icon, value, label, delay, started }) {
  const display = useCounter(value, 1800, started);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="stat-card"
    >
      <div className="stat-icon-wrap">
        <Icon size={16} />
      </div>
      <div className="stat-value">{display}</div>
      <div className="stat-label">{label}</div>
    </motion.div>
  );
}

// Noise SVG filter for texture
const NoiseSVG = () => (
  <svg style={{ position: "absolute", width: 0, height: 0 }}>
    <defs>
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feBlend in="SourceGraphic" mode="multiply" />
      </filter>
    </defs>
  </svg>
);

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [statsStarted, setStatsStarted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const heroRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length);
    }, 6000);
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

  const next = () => setCurrent((p) => (p + 1) % slides.length);
  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);

  const glowX = mousePos.x * 100;
  const glowY = mousePos.y * 100;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --red: #dc2626;
          --red-dark: #991b1b;
          --red-glow: rgba(220, 38, 38, 0.35);
          --bg: #070707;
          --surface: rgba(255,255,255,0.03);
          --border: rgba(255,255,255,0.07);
          --text: #f1f1f1;
          --muted: #888;
        }

        .hero {
          position: relative;
          min-height: 100svh;
          background: var(--bg);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          font-family: 'Barlow', sans-serif;
        }

        /* Animated grid background */
        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 100%, black 30%, transparent 100%);
        }

        /* Dynamic cursor glow */
        .hero-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            600px circle at var(--gx, 50%) var(--gy, 40%),
            rgba(220,38,38,0.08) 0%,
            transparent 60%
          );
          pointer-events: none;
          transition: background 0.1s;
        }

        /* Static ambient glows */
        .glow-1 {
          position: absolute;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(220,38,38,0.12) 0%, transparent 70%);
          top: -100px; right: -100px;
          pointer-events: none;
          animation: pulse-glow 8s ease-in-out infinite alternate;
        }
        .glow-2 {
          position: absolute;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(220,38,38,0.06) 0%, transparent 70%);
          bottom: 0; left: 20%;
          pointer-events: none;
          animation: pulse-glow 6s ease-in-out infinite alternate-reverse;
        }

        @keyframes pulse-glow {
          from { transform: scale(1); opacity: 0.6; }
          to { transform: scale(1.2); opacity: 1; }
        }

        /* Scanline overlay */
        .scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.03) 2px,
            rgba(0,0,0,0.03) 4px
          );
          pointer-events: none;
        }

        /* Diagonal accent line */
        .diagonal-line {
          position: absolute;
          right: 35%;
          top: 0;
          bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(220,38,38,0.3) 30%, rgba(220,38,38,0.3) 70%, transparent);
          pointer-events: none;
        }
        @media (max-width: 768px) { .diagonal-line { display: none; } }

        /* Main content */
        .hero-body {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          max-width: 1400px;
          width: 100%;
          margin: 0 auto;
          padding: 0 40px;
          gap: 0;
          align-items: center;
          position: relative;
          z-index: 10;
        }

        @media (max-width: 900px) {
          .hero-body {
            grid-template-columns: 1fr;
            padding: 0 20px;
            align-items: start;
          }
        }

        @media (max-width: 480px) {
          .hero-body { padding: 0 16px; }
        }

        /* Mobile: consistent dark theme background with red side accent */
        @media (max-width: 900px) {
          .hero {
            background: linear-gradient(160deg, #0a0a0a 60%, #120404 100%);
          }
        }

        /* Left column */
        .hero-left {
          display: flex;
          flex-direction: column;
          gap: 0;
          padding: 32px 0 16px;
        }

        @media (max-width: 900px) {
          .hero-left { padding: 24px 0 16px; }
        }

        .slide-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border: 1px solid rgba(220,38,38,0.3);
          border-radius: 2px;
          background: rgba(220,38,38,0.06);
          color: #f87171;
          font-size: 0.7rem;
          font-family: 'Barlow Condensed', sans-serif;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 16px;
          width: fit-content;
        }

        .dot-blink {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--red);
          animation: blink 1.5s ease-in-out infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }

        .slide-content-wrapper {
          position: relative;
          min-height: 280px;
          margin-bottom: 24px;
        }

        /* slide-inner is absolute on desktop for smooth transitions */
        .slide-inner {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
        }

        @media (max-width: 1200px) {
          .slide-content-wrapper { min-height: 300px; }
        }

        /* On mobile: switch to normal flow so content pushes elements down */
        @media (max-width: 900px) {
          .slide-content-wrapper {
            min-height: unset;
            margin-bottom: 0;
          }
          .slide-inner {
            position: relative;
            top: auto;
            left: auto;
            width: 100%;
          }
        }

        .headline {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 800;
          font-size: clamp(2.6rem, 8vw, 4.8rem);
          line-height: 1.0;
          letter-spacing: -0.01em;
          color: var(--text);
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        @media (max-width: 400px) {
          .headline { font-size: 2.2rem; }
        }

        .headline-accent {
          display: block;
          color: var(--red);
          position: relative;
          width: fit-content;
        }

        /* Red underline slash on accent */
        .headline-accent::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, var(--red), transparent);
        }

        .subtext {
          font-size: clamp(0.85rem, 1.5vw, 1rem);
          color: var(--muted);
          line-height: 1.65;
          max-width: 480px;
          font-weight: 300;
          margin-top: 16px;
        }

        @media (max-width: 900px) {
          .subtext {
            font-size: 0.9rem;
            max-width: 100%;
            color: #aaa;
          }
        }

        /* CTA buttons */
        .cta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 28px;
        }

        @media (max-width: 480px) {
          .cta-row { gap: 10px; margin-bottom: 20px; }
          .cta-row .btn-primary,
          .cta-row .btn-secondary { font-size: 0.8rem; padding: 12px 18px; }
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: var(--red);
          color: #fff;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
        }
        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.1);
          transform: translateX(-100%);
          transition: transform 0.3s;
        }
        .btn-primary:hover::before { transform: translateX(0); }
        .btn-primary:hover { box-shadow: 0 0 30px rgba(220,38,38,0.5); }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 24px;
          background: transparent;
          color: var(--text);
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border: 1px solid var(--border);
          cursor: pointer;
          transition: all 0.2s;
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
        }
        .btn-secondary:hover {
          border-color: rgba(220,38,38,0.5);
          background: rgba(220,38,38,0.05);
        }

        .play-icon {
          width: 28px; height: 28px;
          border-radius: 50%;
          background: rgba(220,38,38,0.2);
          border: 1px solid rgba(220,38,38,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Stats bar */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
          overflow: hidden;
          margin-bottom: 8px;
        }

        @media (max-width: 600px) {
          .stats-row { grid-template-columns: repeat(2, 1fr); }
        }

        .stat-card {
          background: var(--surface);
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          text-align: center;
          position: relative;
          transition: background 0.2s;
        }
        .stat-card:hover {
          background: rgba(220,38,38,0.06);
        }

        .stat-icon-wrap {
          width: 28px; height: 28px;
          border-radius: 4px;
          background: rgba(220,38,38,0.1);
          border: 1px solid rgba(220,38,38,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--red);
          margin-bottom: 4px;
        }

        .stat-value {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 800;
          font-size: 1.5rem;
          color: var(--text);
          line-height: 1;
        }

        .stat-label {
          font-size: 0.65rem;
          color: var(--muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-family: 'Barlow Condensed', sans-serif;
        }

        /* Right column - image */
        .hero-right {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding-top: 0;
        }

        @media (max-width: 900px) {
          .hero-right {
            display: none;
          }
        }

        .image-frame {
          position: relative;
          width: 100%;
          height: 100%;
          max-width: 460px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* HUD ring decoration */
        .hud-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 420px;
          height: 420px;
          border-radius: 50%;
          border: 1px solid rgba(220,38,38,0.1);
          pointer-events: none;
          animation: spin-slow 20s linear infinite;
        }
        .hud-ring::before {
          content: '';
          position: absolute;
          top: -3px; left: 30%;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--red);
          box-shadow: 0 0 10px var(--red);
        }
        .hud-ring-2 {
          animation-direction: reverse;
          animation-duration: 15s;
          width: 360px; height: 360px;
          border-color: rgba(220,38,38,0.06);
        }

        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        /* Corner brackets on image */
        .corner-bracket {
          position: absolute;
          width: 24px; height: 24px;
          border-color: rgba(220,38,38,0.6);
          border-style: solid;
        }
        .corner-bracket.tl { top: 0; left: 0; border-width: 2px 0 0 2px; }
        .corner-bracket.tr { top: 0; right: 0; border-width: 2px 2px 0 0; }
        .corner-bracket.bl { bottom: 0; left: 0; border-width: 0 0 2px 2px; }
        .corner-bracket.br { bottom: 0; right: 0; border-width: 0 2px 2px 0; }

        .hero-img {
          position: relative;
          z-index: 5;
          width: 100%;
          max-height: 80vh;
          object-fit: contain;
          object-position: center;
          filter: drop-shadow(0 20px 60px rgba(0,0,0,0.8));
        }

        /* Data HUD overlays on image side */
        .hud-tag {
          position: absolute;
          right: -20px;
          top: 30%;
          background: rgba(7,7,7,0.9);
          border: 1px solid var(--border);
          border-left: 2px solid var(--red);
          padding: 8px 14px;
          backdrop-filter: blur(10px);
          z-index: 10;
        }
        .hud-tag-label {
          font-size: 0.6rem;
          color: var(--muted);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-family: 'Barlow Condensed', sans-serif;
        }
        .hud-tag-value {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text);
          line-height: 1.2;
        }

        .hud-tag-2 {
          top: 55%;
          right: -10px;
        }

        /* Bottom controls */
        .hero-footer {
          position: relative;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 32px;
          border-top: 1px solid var(--border);
          backdrop-filter: blur(10px);
        }

        @media (max-width: 600px) {
          .hero-footer { padding: 12px 20px; }
        }

        @media (max-width: 400px) {
          .hero-footer { padding: 10px 16px; }
          .slide-counter { font-size: 0.65rem; }
        }

        .progress-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .progress-dot {
          height: 2px;
          border-radius: 2px;
          transition: all 0.3s;
          cursor: pointer;
        }
        .progress-dot.active {
          width: 32px;
          background: var(--red);
          box-shadow: 0 0 8px rgba(220,38,38,0.5);
        }
        .progress-dot.inactive {
          width: 16px;
          background: rgba(255,255,255,0.15);
        }

        .slide-counter {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.75rem;
          color: var(--muted);
          letter-spacing: 0.1em;
        }
        .slide-counter span { color: var(--red); }

        .arrow-btn {
          width: 36px; height: 36px;
          border-radius: 2px;
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
        }
        .arrow-btn:hover {
          background: rgba(220,38,38,0.1);
          border-color: rgba(220,38,38,0.3);
          color: var(--red);
        }

        .arrows-row {
          display: flex;
          gap: 8px;
        }

        /* FAB */
        .fab {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 100;
          width: 52px; height: 52px;
          background: var(--red);
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
          box-shadow: 0 0 20px rgba(220,38,38,0.4);
          transition: all 0.2s;
        }
        .fab:hover {
          transform: scale(1.08);
          box-shadow: 0 0 35px rgba(220,38,38,0.6);
        }

        /* Mobile image strip */
        .mobile-image-strip {
          display: none;
          position: relative;
          height: 320px;
          overflow: visible;
          margin: 20px 0;
          background: transparent;
        }

        @media (max-width: 900px) {
          .mobile-image-strip {
            display: flex;
            align-items: flex-end;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .mobile-image-strip { height: 260px; margin: 16px 0; }
        }

        @media (max-width: 360px) {
          .mobile-image-strip { height: 220px; }
        }

        .mobile-image-strip img {
          display: block;
          height: 100%;
          width: auto;
          max-width: 100%;
          object-fit: contain;
          object-position: bottom center;
          filter: 
            drop-shadow(0 0 60px rgba(220,38,38,0.35))
            drop-shadow(0 20px 40px rgba(0,0,0,0.9));
          position: relative;
          z-index: 2;
        }

        /* Subtle red glow behind image only - no top fade */
        .mobile-image-strip::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(220,38,38,0.2) 0%, transparent 70%);
          z-index: 1;
          pointer-events: none;
        }

        /* Only a small bottom fade to blend into stats */
        .mobile-image-strip::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 20%;
          background: linear-gradient(to top, var(--bg), transparent);
          z-index: 3;
          pointer-events: none;
        }

        /* Progress bar animation at top */
        .progress-bar {
          position: absolute;
          top: 0;
          left: 0;
          height: 2px;
          background: var(--red);
          box-shadow: 0 0 10px var(--red);
        }
      `}</style>

      <NoiseSVG />

      {/* Hero wrapper */}
      <div ref={heroRef} className="hero">

        {/* Background layers */}
        <div className="hero-grid" />
        <div
          className="hero-glow"
          style={{ "--gx": `${glowX}%`, "--gy": `${glowY}%` }}
        />
        <div className="glow-1" />
        <div className="glow-2" />
        <div className="scanlines" />
        <div className="diagonal-line" />

        {/* Slide progress bar */}
        <motion.div
          className="progress-bar"
          key={current}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear" }}
        />

        {/* Hero body */}
        <div className="hero-body">

          {/* Left */}
          <div className="hero-left">

            {/* Tag */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`tag-${current}`}
                className="slide-tag"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="dot-blink" />
                {slides[current].tag}
              </motion.div>
            </AnimatePresence>

            {/* Sliding headline */}
            <div className="slide-content-wrapper">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${current}`}
                  initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -30, filter: "blur(6px)" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="slide-inner"
                >
                  <h1 className="headline">
                    {slides[current].headline.map((line, i) => (
                      <span key={i} style={{ display: "block" }}>{line}</span>
                    ))}
                    <span className="headline-accent">{slides[current].accent}</span>
                  </h1>
                  <p className="subtext">{slides[current].subtext}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile image */}
            <div className="mobile-image-strip">
              <img src="/assets/ankit-hero.png" alt="Ankit Khare" />
            </div>

            {/* CTAs */}
            <div className="cta-row">
              <button className="btn-primary">
                Let's Connect Today
              </button>
              <button className="btn-secondary">
                <div className="play-icon">
                  <Play size={12} fill="currentColor" color="#dc2626" />
                </div>
                Watch Video
              </button>
            </div>

            {/* Stats */}
            <div className="stats-row">
              {stats.map((s, i) => (
                <StatCard key={s.label} {...s} delay={0.8 + i * 0.1} started={statsStarted} />
              ))}
            </div>

          </div>

          {/* Right - Desktop image */}
          <div className="hero-right">
            <div className="image-frame">
              <div className="hud-ring" />
              <div className="hud-ring hud-ring-2" />
              <div className="corner-bracket tl" />
              <div className="corner-bracket tr" />
              <div className="corner-bracket bl" />
              <div className="corner-bracket br" />

              <motion.img
                src="/assets/ankit-hero.png"
                alt="Ankit Khare"
                className="hero-img"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              />

              {/* HUD data tags */}
              <motion.div
                className="hud-tag"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="hud-tag-label">Experience</div>
                <div className="hud-tag-value">18+ Years</div>
              </motion.div>

              <motion.div
                className="hud-tag hud-tag-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="hud-tag-label">Trained</div>
                <div className="hud-tag-value">5K+ Pros</div>
              </motion.div>
            </div>
          </div>

        </div>

        {/* Footer controls */}
        <div className="hero-footer">
          <div className="slide-counter">
            <span>0{current + 1}</span> / 0{slides.length}
          </div>
          <div className="progress-row">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`progress-dot ${i === current ? "active" : "inactive"}`}
                style={{ border: "none", padding: 0, cursor: "pointer" }}
              />
            ))}
          </div>
          <div className="arrows-row">
            <button className="arrow-btn" onClick={prev}><ChevronLeft size={16} /></button>
            <button className="arrow-btn" onClick={next}><ChevronRight size={16} /></button>
          </div>
        </div>

      </div>

      {/* FAB */}
      <motion.button
        className="fab"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        <Phone size={20} />
      </motion.button>
    </>
  );
}
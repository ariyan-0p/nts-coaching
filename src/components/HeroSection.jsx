import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Phone, ChevronLeft, ChevronRight, TrendingUp, Users, Award, Zap, ArrowUpRight } from "lucide-react";

const YOUTUBE_CHANNEL = "https://www.youtube.com/channel/UC5ArEQ8ZPw77_4oJ2HU13Zw";

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

const brands = [
  "Entrepreneur", "Forbes", "Elite Daily", "Inc.", "2GB 873AM",
  "Engadget", "Evan Carmichael", "Business.com", "Huffington Post",
  "TechCrunch", "Macquarie Media", "Mumbrella",
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
        y: (e.clientY - rect.top)  / rect.height,
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
        /* ═══════════════════════════════════
           HERO
        ═══════════════════════════════════ */
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
        [data-theme="light"] .hero {
          background: linear-gradient(160deg, #fafafa 60%, #fff5f5 100%);
        }
        .hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 100%, black 30%, transparent 100%);
          pointer-events: none;
        }
        [data-theme="light"] .hero-grid { opacity: 0.6; }
        .hero-glow { position: absolute; inset: 0; pointer-events: none; }
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
          from { transform: scale(1); opacity: 0.6; }
          to   { transform: scale(1.2); opacity: 1; }
        }
        .h-scanlines {
          position: absolute; inset: 0; pointer-events: none;
          background: repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.025) 2px,rgba(0,0,0,0.025) 4px);
        }
        [data-theme="light"] .h-scanlines { display: none; }
        .h-diagonal {
          position: absolute; right: 35%; top: 0; bottom: 0; width: 1px; pointer-events: none;
          background: linear-gradient(to bottom, transparent, rgba(220,38,38,0.25) 30%, rgba(220,38,38,0.25) 70%, transparent);
        }
        @media (max-width: 768px) { .h-diagonal { display: none; } }
        .h-progress-bar {
          position: absolute; top: 0; left: 0; height: 2px; z-index: 30;
          background: var(--red); box-shadow: 0 0 10px rgba(220,38,38,0.6);
        }

        .hero-body {
          flex: 1;
          display: grid; grid-template-columns: 1fr 1fr;
          max-width: 1400px; width: 100%;
          margin: 0 auto; padding: 0 40px;
          align-items: center; position: relative; z-index: 10;
        }
        @media (max-width: 900px) { .hero-body { grid-template-columns: 1fr; padding: 0 20px; align-items: start; } }
        @media (max-width: 480px) { .hero-body { padding: 0 16px; } }

        .hero-left { display: flex; flex-direction: column; padding: 32px 0 16px; }
        @media (max-width: 900px) { .hero-left { padding: 84px 0 16px; } }
        @media (max-width: 480px) { .hero-left { padding: 80px 0 12px; } }

        .h-slide-tag {
          display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px;
          border: 1px solid var(--border-red); border-radius: 2px; background: var(--red-dim);
          color: var(--red); font-size: 0.7rem; font-family: var(--font-head);
          letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 16px; width: fit-content;
          transition: background var(--theme-speed), border-color var(--theme-speed);
        }
        .h-dot-blink {
          width: 6px; height: 6px; border-radius: 50%; background: var(--red);
          animation: h-blink 1.5s ease-in-out infinite; flex-shrink: 0;
        }
        @keyframes h-blink { 0%,100%{opacity:1} 50%{opacity:0.2} }

        .h-slide-wrapper { position: relative; min-height: 280px; margin-bottom: 24px; }
        .h-slide-inner { position: absolute; top: 0; left: 0; width: 100%; }
        @media (max-width: 900px) {
          .h-slide-wrapper { min-height: unset; margin-bottom: 0; }
          .h-slide-inner { position: relative; top: auto; left: auto; }
        }

        .h-headline {
          font-family: var(--font-head); font-weight: 800;
          font-size: clamp(2.6rem, 8vw, 4.8rem); line-height: 1; letter-spacing: -0.01em;
          color: var(--text); text-transform: uppercase; margin-bottom: 8px;
          transition: color var(--theme-speed);
        }
        @media (max-width: 400px) { .h-headline { font-size: 2.2rem; } }
        .h-headline-accent { display: block; color: var(--red); position: relative; width: fit-content; }
        .h-headline-accent::after {
          content: ''; position: absolute; bottom: -4px; left: 0;
          width: 100%; height: 3px; background: linear-gradient(90deg, var(--red), transparent);
        }
        .h-subtext {
          font-size: clamp(0.85rem, 1.5vw, 1rem); color: var(--text-muted);
          line-height: 1.65; max-width: 480px; font-weight: 300; margin-top: 16px;
          transition: color var(--theme-speed);
        }
        @media (max-width: 900px) { .h-subtext { font-size: 0.9rem; max-width: 100%; } }

        .h-cta-row { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 28px; }
        .h-btn-primary {
          display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px;
          background: var(--red); color: #fff; font-family: var(--font-head); font-weight: 700;
          font-size: 0.95rem; letter-spacing: 0.12em; text-transform: uppercase;
          border: none; cursor: pointer;
          clip-path: polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px));
          transition: all 0.2s; position: relative; overflow: hidden;
        }
        .h-btn-primary::before {
          content: ''; position: absolute; inset: 0;
          background: rgba(255,255,255,0.12); transform: translateX(-100%); transition: transform 0.3s;
        }
        .h-btn-primary:hover::before { transform: translateX(0); }
        .h-btn-primary:hover { box-shadow: 0 0 30px rgba(220,38,38,0.5); }
        .h-btn-secondary {
          display: inline-flex; align-items: center; gap: 8px; padding: 13px 24px;
          background: transparent; color: var(--text); font-family: var(--font-head); font-weight: 600;
          font-size: 0.95rem; letter-spacing: 0.12em; text-transform: uppercase;
          border: 1px solid var(--border); cursor: pointer;
          clip-path: polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px));
          transition: all 0.2s;
        }
        .h-btn-secondary:hover { border-color: var(--border-red); background: var(--red-dim); color: var(--red); }
        .h-play-icon {
          width: 28px; height: 28px; border-radius: 50%; background: var(--red-dim);
          border: 1px solid var(--border-red); display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }

        .h-stats-row {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px;
          background: var(--border); border: 1px solid var(--border); overflow: hidden; margin-bottom: 8px;
        }
        @media (max-width: 600px) { .h-stats-row { grid-template-columns: repeat(2, 1fr); } }
        .h-stat-card {
          background: var(--surface); padding: 16px 12px;
          display: flex; flex-direction: column; align-items: center; gap: 4px; text-align: center; transition: background 0.2s;
        }
        .h-stat-card:hover { background: var(--red-dim); }
        .h-stat-icon {
          width: 28px; height: 28px; border-radius: 4px; background: var(--red-dim);
          border: 1px solid var(--border-red); display: flex; align-items: center; justify-content: center;
          color: var(--red); margin-bottom: 4px;
        }
        .h-stat-value { font-family: var(--font-head); font-weight: 800; font-size: 1.5rem; color: var(--text); line-height: 1; transition: color var(--theme-speed); }
        .h-stat-label { font-size: 0.62rem; color: var(--text-muted); letter-spacing: 0.08em; text-transform: uppercase; font-family: var(--font-head); transition: color var(--theme-speed); }

        .hero-right { position: relative; display: flex; align-items: center; justify-content: center; height: 100%; }
        @media (max-width: 900px) { .hero-right { display: none; } }
        .h-image-frame { position: relative; width: 100%; height: 100%; max-width: 460px; display: flex; align-items: center; justify-content: center; }
        .h-hud-ring {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
          width: 420px; height: 420px; border-radius: 50%; border: 1px solid rgba(220,38,38,0.12);
          pointer-events: none; animation: h-spin 20s linear infinite;
        }
        .h-hud-ring::before {
          content: ''; position: absolute; top: -3px; left: 30%; width: 6px; height: 6px;
          border-radius: 50%; background: var(--red); box-shadow: 0 0 10px var(--red);
        }
        .h-hud-ring-2 { width: 360px; height: 360px; border-color: rgba(220,38,38,0.06); animation-direction: reverse; animation-duration: 15s; }
        @keyframes h-spin {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }
        .h-bracket { position: absolute; width: 24px; height: 24px; border-color: rgba(220,38,38,0.5); border-style: solid; }
        .h-bracket.tl { top: 0; left: 0; border-width: 2px 0 0 2px; }
        .h-bracket.tr { top: 0; right: 0; border-width: 2px 2px 0 0; }
        .h-bracket.bl { bottom: 0; left: 0; border-width: 0 0 2px 2px; }
        .h-bracket.br { bottom: 0; right: 0; border-width: 0 2px 2px 0; }
        .h-hero-img {
          position: relative; z-index: 5; width: 100%; max-height: 80vh;
          object-fit: contain; object-position: center;
          filter: drop-shadow(0 20px 60px rgba(0,0,0,0.6)); transition: filter var(--theme-speed);
        }
        .h-hud-tag {
          position: absolute; right: -20px; background: var(--bg-2);
          border: 1px solid var(--border); border-left: 2px solid var(--red);
          padding: 8px 14px; backdrop-filter: blur(10px); z-index: 10;
          transition: background var(--theme-speed), border-color var(--theme-speed);
        }
        .h-hud-tag.t1 { top: 30%; }
        .h-hud-tag.t2 { top: 55%; right: -10px; }
        .h-hud-tag-label { font-size: 0.6rem; color: var(--text-muted); letter-spacing: 0.15em; text-transform: uppercase; font-family: var(--font-head); }
        .h-hud-tag-value { font-family: var(--font-head); font-size: 1.1rem; font-weight: 700; color: var(--text); line-height: 1.2; transition: color var(--theme-speed); }

        .h-mobile-img { display: none; position: relative; height: 320px; overflow: visible; margin: 20px 0; }
        @media (max-width: 900px) { .h-mobile-img { display: flex; align-items: flex-end; justify-content: center; } }
        @media (max-width: 480px) { .h-mobile-img { height: 260px; margin: 16px 0; } }
        .h-mobile-img img {
          display: block; height: 100%; width: auto; max-width: 100%;
          object-fit: contain; object-position: bottom center; position: relative; z-index: 2;
          filter: drop-shadow(0 0 50px rgba(220,38,38,0.3)) drop-shadow(0 20px 40px rgba(0,0,0,0.7));
        }
        .h-mobile-img::before {
          content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
          width: 200px; height: 200px; background: radial-gradient(circle,rgba(220,38,38,0.18) 0%,transparent 70%);
          z-index: 1; pointer-events: none;
        }
        .h-mobile-img::after {
          content: ''; position: absolute; bottom: -1px; left: 0; right: 0; height: 20%;
          background: linear-gradient(to top,var(--bg),transparent); z-index: 3; pointer-events: none;
        }

        .h-footer {
          position: relative; z-index: 20;
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 32px; border-top: 1px solid var(--border);
          backdrop-filter: blur(10px); background: var(--surface);
          transition: border-color var(--theme-speed), background var(--theme-speed);
        }
        @media (max-width: 600px) { .h-footer { padding: 12px 20px; } }
        .h-slide-counter { font-family: var(--font-head); font-size: 0.75rem; color: var(--text-muted); letter-spacing: 0.1em; }
        .h-slide-counter span { color: var(--red); }
        .h-progress-dot { height: 2px; border-radius: 2px; transition: all 0.3s; cursor: pointer; border: none; padding: 0; }
        .h-progress-dot.active  { width: 32px; background: var(--red); box-shadow: 0 0 8px rgba(220,38,38,0.5); }
        .h-progress-dot.inactive{ width: 16px; background: var(--border); }
        .h-arrow-btn {
          width: 36px; height: 36px; background: var(--surface); border: 1px solid var(--border);
          color: var(--text); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;
          clip-path: polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px));
        }
        .h-arrow-btn:hover { background: var(--red-dim); border-color: var(--border-red); color: var(--red); }

        /* ═══════════════════════════════════════════════════════
           VIDEO BROADCAST CARD OVERLAY - ADJUSTED MARGINS
        ═══════════════════════════════════════════════════════ */
        .vid-wrap {
          position: relative;
          margin: -20px auto 40px; /* <--- CHANGED: Removed negative bottom margin to prevent text overlap */
          width: calc(100% - 80px);
          max-width: 1100px;
          z-index: 30;
        }
        @media (max-width: 900px) { .vid-wrap { width: calc(100% - 40px); margin: -10px auto 40px; } }
        @media (max-width: 600px) { .vid-wrap { width: calc(100% - 32px); margin: -5px auto 30px; } }

        /* Outer glow ring */
        .vid-wrap::before {
          content: '';
          position: absolute;
          inset: -20px;
          border-radius: 22px;
          background: radial-gradient(ellipse at 50% 50%, rgba(220,38,38,0.12) 0%, transparent 70%);
          pointer-events: none;
          z-index: -1;
        }

        .vid-card {
          display: grid;
          grid-template-columns: 55fr 45fr;
          border-radius: 16px;
          overflow: hidden;
          box-shadow:
            0 50px 120px rgba(0,0,0,0.85),
            0 24px 56px rgba(0,0,0,0.55),
            0 0 0 1px rgba(220,38,38,0.18);
          cursor: pointer;
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .vid-card:hover {
          transform: translateY(-5px);
          box-shadow:
            0 64px 140px rgba(0,0,0,0.9),
            0 30px 70px rgba(0,0,0,0.6),
            0 0 0 1px rgba(220,38,38,0.28);
        }
        @media (max-width: 720px) {
          .vid-card { grid-template-columns: 1fr; }
        }

        /* ── LEFT: dark thumbnail panel ── */
        .vid-thumb {
          position: relative;
          aspect-ratio: 16 / 10;
          background: #060606;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 720px) { .vid-thumb { aspect-ratio: 16 / 9; } }

        .vid-thumb-bg {
          position: absolute; inset: 0;
          background-image: url('/assets/youtube-cover.png');
          background-size: cover;
          background-position: center;
        }
        
        
        .vid-thumb-glow {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background: radial-gradient(ellipse 55% 55% at 50% 50%, rgba(220,38,38,0.2) 0%, transparent 65%);
          animation: tglow 3.5s ease-in-out infinite alternate;
        }
        @keyframes tglow {
          from { opacity: 0.5; transform: scale(0.9); }
          to   { opacity: 1;   transform: scale(1.1); }
        }
        .vid-letterbox {
          position: absolute; left: 0; right: 0; height: 16%; z-index: 2; pointer-events: none;
          background: rgba(0,0,0,0.75);
        }
        .vid-letterbox.top { top: 0; }
        .vid-letterbox.bot { bottom: 0; }
        .vid-topline {
          position: absolute; top: 0; left: 0; right: 0; height: 2px; z-index: 6;
          background: linear-gradient(90deg, transparent, var(--red) 20%, var(--red) 80%, transparent);
          opacity: 0.9;
        }
        .vid-hud { position: absolute; width: 20px; height: 20px; border-color: rgba(220,38,38,0.6); border-style: solid; z-index: 6; pointer-events: none; }
        .vid-hud.tl { top: 10px; left: 10px;  border-width: 2px 0 0 2px; }
        .vid-hud.tr { top: 10px; right: 10px; border-width: 2px 2px 0 0; }
        .vid-hud.bl { bottom: 10px; left: 10px;  border-width: 0 0 2px 2px; }
        .vid-hud.br { bottom: 10px; right: 10px; border-width: 0 2px 2px 0; }

        .vid-rec {
          position: absolute; top: 16px; left: 16px; z-index: 7;
          display: flex; align-items: center; gap: 6px;
          background: rgba(0,0,0,0.7); backdrop-filter: blur(6px);
          border: 1px solid rgba(220,38,38,0.4); border-radius: 3px;
          padding: 4px 10px;
          font-family: var(--font-head); font-size: 0.6rem;
          letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.7);
        }
        .vid-rec-dot {
          width: 6px; height: 6px; border-radius: 50%; background: var(--red);
          box-shadow: 0 0 6px var(--red);
          animation: h-blink 1.2s ease-in-out infinite;
        }

        .vid-dur {
          position: absolute; bottom: 16px; right: 14px; z-index: 7;
          background: rgba(0,0,0,0.8); border-radius: 3px;
          padding: 3px 8px;
          font-family: var(--font-head); font-size: 0.65rem;
          letter-spacing: 0.08em; color: rgba(255,255,255,0.65);
        }

        .vid-play-btn {
          position: relative; z-index: 5;
          width: 80px; height: 80px; border-radius: 50%;
          background: var(--red);
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow:
            0 0 0 16px rgba(220,38,38,0.15),
            0 0 0 32px rgba(220,38,38,0.07),
            0 8px 40px rgba(220,38,38,0.65);
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .vid-play-btn:hover {
          transform: scale(1.12);
          box-shadow:
            0 0 0 20px rgba(220,38,38,0.2),
            0 0 0 40px rgba(220,38,38,0.09),
            0 12px 60px rgba(220,38,38,0.85);
        }
        .vid-ring { position: absolute; border-radius: 50%; border: 1.5px solid rgba(220,38,38,0.35); animation: vring 2.8s ease-out infinite; }
        .vid-ring--1 { inset: -16px; animation-delay: 0s; }
        .vid-ring--2 { inset: -32px; animation-delay: 0.9s; border-color: rgba(220,38,38,0.18); }
        .vid-ring--3 { inset: -48px; animation-delay: 1.8s; border-color: rgba(220,38,38,0.08); }
        @keyframes vring { 0%{opacity:1;transform:scale(0.88)} 100%{opacity:0;transform:scale(1.16)} }
        @media (max-width: 600px) { .vid-play-btn { width: 60px; height: 60px; } }

        /* ── RIGHT: red editorial panel ── */
        .vid-panel {
          position: relative;
          background: var(--red);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 28px 30px;
          overflow: hidden;
        }
        @media (max-width: 900px) { .vid-panel { padding: 22px 24px; } }
        @media (max-width: 720px) { .vid-panel { padding: 20px 20px; } }

        .vid-panel-bg-text {
          position: absolute;
          right: -10px; bottom: -10px;
          font-family: var(--font-head); font-weight: 900;
          font-size: 8rem; line-height: 1;
          color: rgba(0,0,0,0.12);
          text-transform: uppercase; pointer-events: none; user-select: none;
          letter-spacing: -0.04em;
        }
        @media (max-width: 900px) { .vid-panel-bg-text { font-size: 5.5rem; } }

        .vid-panel-slash {
          position: absolute; top: 0; right: 0;
          width: 0; height: 0;
          border-style: solid;
          border-width: 0 70px 70px 0;
          border-color: transparent rgba(255,255,255,0.1) transparent transparent;
          pointer-events: none;
        }

        .vid-panel-top {}
        .vid-panel-label {
          font-family: var(--font-head); font-size: 0.62rem;
          letter-spacing: 0.25em; text-transform: uppercase;
          color: rgba(255,255,255,0.6); margin-bottom: 10px;
          display: flex; align-items: center; gap: 8px;
        }
        .vid-panel-label::before {
          content: ''; display: block;
          width: 24px; height: 2px; background: rgba(255,255,255,0.5);
        }
        .vid-panel-headline {
          font-family: var(--font-head); font-weight: 900;
          font-size: clamp(1.3rem, 2.2vw, 1.7rem);
          line-height: 1.1; letter-spacing: -0.02em;
          color: #fff; text-transform: uppercase;
          margin-bottom: 14px;
        }
        .vid-panel-sub {
          font-size: 0.8rem; color: rgba(255,255,255,0.72);
          line-height: 1.55; font-weight: 400;
        }

        .vid-panel-cta {
          display: inline-flex; align-items: center; gap: 8px;
          margin-top: 18px;
          font-family: var(--font-head); font-size: 0.75rem;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: #fff; font-weight: 700;
          border-bottom: 1px solid rgba(255,255,255,0.35);
          padding-bottom: 3px;
          width: fit-content;
          transition: border-color 0.2s, gap 0.2s;
          cursor: pointer;
        }
        .vid-panel-cta:hover { border-color: #fff; gap: 12px; }

        .vid-panel-bottom {}
        .vid-panel-divider {
          height: 1px;
          background: rgba(255,255,255,0.2);
          margin: 16px 0 14px;
        }
        .vid-panel-seen {
          font-family: var(--font-head); font-size: 0.58rem;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.5); margin-bottom: 10px;
        }

        .vid-ticker-outer {
          overflow: hidden;
          mask-image: linear-gradient(90deg, transparent, black 12%, black 88%, transparent);
        }
        .vid-ticker {
          display: flex;
          gap: 24px;
          animation: ticker 18s linear infinite;
          width: max-content;
        }
        .vid-ticker:hover { animation-play-state: paused; }
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .vid-ticker-item {
          font-family: var(--font-head); font-weight: 700;
          font-size: 0.7rem; letter-spacing: 0.1em;
          text-transform: uppercase; color: rgba(255,255,255,0.55);
          white-space: nowrap;
          transition: color 0.2s;
        }
        .vid-ticker-item:hover { color: rgba(255,255,255,0.9); }
        .vid-ticker-sep {
          color: rgba(255,255,255,0.25);
          font-size: 0.6rem;
        }

        /* FAB */
        .h-fab {
          position: fixed; bottom: 28px; right: 28px; z-index: 100;
          width: 52px; height: 52px; background: var(--red); color: white; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          clip-path: polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px));
          box-shadow: 0 0 20px rgba(220,38,38,0.4); transition: all 0.2s;
        }
        .h-fab:hover { transform: scale(1.08); box-shadow: 0 0 35px rgba(220,38,38,0.6); }
      `}</style>

      {/* ═══ HERO ═══ */}
      <div ref={heroRef} className="hero">
        <div className="hero-grid" />
        <div className="hero-glow" style={{
          background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(220,38,38,0.08) 0%, transparent 60%)`,
        }} />
        <div className="h-glow-1" />
        <div className="h-glow-2" />
        <div className="h-scanlines" />
        <div className="h-diagonal" />

        <motion.div className="h-progress-bar" key={current}
          initial={{ width: "0%" }} animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear" }}
        />

        <div className="hero-body">
          <div className="hero-left">
            <AnimatePresence mode="wait">
              <motion.div key={`tag-${current}`} className="h-slide-tag"
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.3 }}>
                <div className="h-dot-blink" />
                {slides[current].tag}
              </motion.div>
            </AnimatePresence>

            <div className="h-slide-wrapper">
              <AnimatePresence mode="wait">
                <motion.div key={`content-${current}`} className="h-slide-inner"
                  initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -30, filter: "blur(6px)" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
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

            <div className="h-mobile-img">
              <img src="/assets/ankit-hero.png" alt="Ankit Khare" />
            </div>

            <div className="h-cta-row">
              <button className="h-btn-primary">Let's Connect Today</button>
              <button className="h-btn-secondary">
                <div className="h-play-icon">
                  <Play size={12} fill="#dc2626" color="#dc2626" />
                </div>
                Watch Video
              </button>
            </div>

            <div className="h-stats-row">
              {stats.map((s, i) => (
                <StatCard key={s.label} {...s} delay={0.8 + i * 0.1} started={statsStarted} />
              ))}
            </div>
          </div>

          <div className="hero-right">
            <div className="h-image-frame">
              <div className="h-hud-ring" />
              <div className="h-hud-ring h-hud-ring-2" />
              <div className="h-bracket tl" /><div className="h-bracket tr" />
              <div className="h-bracket bl" /><div className="h-bracket br" />
              <motion.img src="/assets/ankit-hero.png" alt="Ankit Khare" className="h-hero-img"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }} />
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

        {/* Footer */}
        <div className="h-footer">
          <div className="h-slide-counter">
            <span>0{current + 1}</span> / 0{slides.length}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {slides.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className={`h-progress-dot ${i === current ? "active" : "inactive"}`} />
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="h-arrow-btn" onClick={prev}><ChevronLeft size={16} /></button>
            <button className="h-arrow-btn" onClick={next}><ChevronRight size={16} /></button>
          </div>
        </div>

      </div>
      {/* END .hero */}

      {/* ═══ VIDEO BROADCAST CARD ═══ */}
      <motion.div
        className="vid-wrap"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="vid-card"
          onClick={() => window.open(YOUTUBE_CHANNEL, "_blank")}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === "Enter" && window.open(YOUTUBE_CHANNEL, "_blank")}
          aria-label="Watch on YouTube"
        >
          {/* LEFT — cinematic thumbnail */}
          <div className="vid-thumb">
            <div className="vid-thumb-bg" />
            <div className="vid-thumb-glow" />
            <div className="vid-topline" />
            <div className="vid-hud tl" /><div className="vid-hud tr" />
            <div className="vid-hud bl" /><div className="vid-hud br" />
            <div className="vid-rec">
              <span className="vid-rec-dot" />
              Feature Story
            </div>
            <div className="vid-dur">7:47</div>
            <button className="vid-play-btn" tabIndex={-1} aria-hidden="true">
              <div className="vid-ring vid-ring--1" />
              <div className="vid-ring vid-ring--2" />
              <div className="vid-ring vid-ring--3" />
              <Play size={30} fill="#fff" color="#fff" style={{ marginLeft: 4 }} />
            </button>
          </div>

          {/* RIGHT — editorial red panel */}
          <div className="vid-panel">
            <div className="vid-panel-bg-text">WATCH</div>
            <div className="vid-panel-slash" />

            <div className="vid-panel-top">
              <div className="vid-panel-label">Ankit Khare · Full Story</div>
              <div className="vid-panel-headline">
                From Zero to<br />Closing Machine
              </div>
              <div className="vid-panel-sub">
                The unfiltered story behind 18 years, 5,000+ professionals trained,
                and a sales system that works across every industry.
              </div>
              <div
                className="vid-panel-cta"
                onClick={e => { e.stopPropagation(); window.open(YOUTUBE_CHANNEL, "_blank"); }}
              >
                Watch on YouTube <ArrowUpRight size={14} />
              </div>
            </div>

            <div className="vid-panel-bottom">
              <div className="vid-panel-divider" />
              <div className="vid-panel-seen">As Featured In</div>
              <div className="vid-ticker-outer">
                <div className="vid-ticker">
                  {[...brands, ...brands].map((b, i) => (
                    <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 24 }}>
                      <span className="vid-ticker-item">{b}</span>
                      {i < brands.length * 2 - 1 && <span className="vid-ticker-sep">·</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.button className="h-fab"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        onClick={() => window.location.href = "tel:+919752809028"}
      >
        <Phone size={20} />
      </motion.button>
    </>
  );
}
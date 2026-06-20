import { motion } from "framer-motion";

interface HeroGeometricOverlayProps {
  pageKey?: string;
}

// Each variant returns SVG children + a sequence of {x,y} points for the green dot to travel.
type Variant = {
  shapes: JSX.Element;
  path: { x: number[]; y: number[] };
};

const stroke = "rgba(255,255,255,0.35)";
const fillSoft = "rgba(255,255,255,0.05)";

const variants: Record<string, Variant> = {
  "who-we-are": {
    shapes: (
      <>
        <motion.circle
          cx="15" cy="30" r="8"
          fill="none" stroke={stroke} strokeWidth="0.15"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "15% 30%" }}
        />
        <motion.polygon
          points="80,20 88,32 72,32"
          fill={fillSoft} stroke={stroke} strokeWidth="0.15"
          animate={{ rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "80% 26%" }}
        />
        <rect x="60" y="65" width="14" height="14" fill="none" stroke={stroke} strokeWidth="0.15" />
        <line x1="20" y1="75" x2="40" y2="75" stroke={stroke} strokeWidth="0.15" />
        <line x1="30" y1="65" x2="30" y2="85" stroke={stroke} strokeWidth="0.15" />
      </>
    ),
    path: { x: [15, 80, 67, 30, 15], y: [30, 26, 72, 75, 30] },
  },
  about: {
    shapes: (
      <>
        <motion.circle
          cx="25" cy="25" r="10" fill="none" stroke={stroke} strokeWidth="0.15"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ transformOrigin: "25% 25%" }}
        />
        <motion.circle
          cx="25" cy="25" r="5" fill={fillSoft} stroke={stroke} strokeWidth="0.15"
          animate={{ scale: [1, 0.85, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ transformOrigin: "25% 25%" }}
        />
        <polygon points="70,60 82,60 76,72" fill="none" stroke={stroke} strokeWidth="0.15" />
        <line x1="50" y1="20" x2="90" y2="20" stroke={stroke} strokeWidth="0.15" />
        <line x1="50" y1="25" x2="80" y2="25" stroke={stroke} strokeWidth="0.15" />
      </>
    ),
    path: { x: [25, 70, 76, 90, 25], y: [25, 60, 72, 20, 25] },
  },
  services: {
    shapes: (
      <>
        <rect x="10" y="20" width="18" height="18" fill="none" stroke={stroke} strokeWidth="0.15" />
        <motion.rect
          x="15" y="25" width="8" height="8" fill={fillSoft} stroke={stroke} strokeWidth="0.15"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "19% 29%" }}
        />
        <circle cx="80" cy="30" r="6" fill="none" stroke={stroke} strokeWidth="0.15" />
        <circle cx="80" cy="30" r="2" fill="rgba(98,173,78,0.4)" />
        <line x1="40" y1="70" x2="90" y2="70" stroke={stroke} strokeWidth="0.15" />
        <line x1="40" y1="75" x2="70" y2="75" stroke={stroke} strokeWidth="0.15" />
        <line x1="40" y1="80" x2="85" y2="80" stroke={stroke} strokeWidth="0.15" />
      </>
    ),
    path: { x: [19, 80, 70, 40, 19], y: [29, 30, 75, 70, 29] },
  },
  industries: {
    shapes: (
      <>
        <motion.polygon
          points="20,30 28,18 36,30 28,42"
          fill={fillSoft} stroke={stroke} strokeWidth="0.15"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "28% 30%" }}
        />
        <circle cx="75" cy="25" r="8" fill="none" stroke={stroke} strokeWidth="0.15" />
        <circle cx="85" cy="25" r="4" fill="none" stroke={stroke} strokeWidth="0.15" />
        <rect x="55" y="65" width="20" height="14" fill="none" stroke={stroke} strokeWidth="0.15" />
        <line x1="55" y1="72" x2="75" y2="72" stroke={stroke} strokeWidth="0.15" />
      </>
    ),
    path: { x: [28, 75, 85, 65, 28], y: [30, 25, 25, 72, 30] },
  },
  insights: {
    shapes: (
      <>
        <line x1="10" y1="80" x2="22" y2="60" stroke={stroke} strokeWidth="0.2" />
        <line x1="22" y1="60" x2="34" y2="68" stroke={stroke} strokeWidth="0.2" />
        <line x1="34" y1="68" x2="46" y2="40" stroke={stroke} strokeWidth="0.2" />
        <line x1="46" y1="40" x2="58" y2="50" stroke={stroke} strokeWidth="0.2" />
        <circle cx="10" cy="80" r="1" fill="rgba(255,255,255,0.4)" />
        <circle cx="22" cy="60" r="1" fill="rgba(255,255,255,0.4)" />
        <circle cx="34" cy="68" r="1" fill="rgba(255,255,255,0.4)" />
        <circle cx="46" cy="40" r="1" fill="rgba(255,255,255,0.4)" />
        <circle cx="58" cy="50" r="1" fill="rgba(255,255,255,0.4)" />
        <motion.circle
          cx="80" cy="30" r="10" fill="none" stroke={stroke} strokeWidth="0.15"
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "80% 30%" }}
        />
      </>
    ),
    path: { x: [10, 22, 34, 46, 58, 80, 10], y: [80, 60, 68, 40, 50, 30, 80] },
  },
  careers: {
    shapes: (
      <>
        <circle cx="20" cy="25" r="5" fill={fillSoft} stroke={stroke} strokeWidth="0.15" />
        <circle cx="35" cy="25" r="5" fill="none" stroke={stroke} strokeWidth="0.15" />
        <circle cx="50" cy="25" r="5" fill="none" stroke={stroke} strokeWidth="0.15" />
        <motion.polygon
          points="75,20 88,28 75,36"
          fill="none" stroke={stroke} strokeWidth="0.15"
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <rect x="20" y="65" width="60" height="12" fill="none" stroke={stroke} strokeWidth="0.15" />
        <line x1="35" y1="65" x2="35" y2="77" stroke={stroke} strokeWidth="0.15" />
        <line x1="50" y1="65" x2="50" y2="77" stroke={stroke} strokeWidth="0.15" />
        <line x1="65" y1="65" x2="65" y2="77" stroke={stroke} strokeWidth="0.15" />
      </>
    ),
    path: { x: [20, 35, 50, 81, 50, 20], y: [25, 25, 25, 28, 71, 25] },
  },
  contact: {
    shapes: (
      <>
        <motion.circle
          cx="80" cy="25" r="12" fill="none" stroke={stroke} strokeWidth="0.15"
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 5, repeat: Infinity }}
          style={{ transformOrigin: "80% 25%" }}
        />
        <motion.circle
          cx="80" cy="25" r="6" fill="none" stroke={stroke} strokeWidth="0.15"
          animate={{ scale: [1, 1.25, 1], opacity: [0.8, 0.3, 0.8] }}
          transition={{ duration: 5, repeat: Infinity, delay: 0.6 }}
          style={{ transformOrigin: "80% 25%" }}
        />
        <circle cx="80" cy="25" r="1.5" fill="rgba(98,173,78,0.6)" />
        <rect x="15" y="65" width="20" height="14" fill="none" stroke={stroke} strokeWidth="0.15" />
        <polyline points="15,65 25,73 35,65" fill="none" stroke={stroke} strokeWidth="0.15" />
        <line x1="50" y1="50" x2="70" y2="50" stroke={stroke} strokeWidth="0.15" />
      </>
    ),
    path: { x: [80, 60, 25, 50, 80], y: [25, 50, 72, 50, 25] },
  },
  clients: {
    shapes: (
      <>
        {[0, 1, 2, 3].map((i) => (
          <circle
            key={i}
            cx={15 + i * 12} cy="25" r="4"
            fill="none" stroke={stroke} strokeWidth="0.15"
          />
        ))}
        <motion.rect
          x="70" y="18" width="14" height="14" fill="none" stroke={stroke} strokeWidth="0.15"
          animate={{ rotate: 360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "77% 25%" }}
        />
        <line x1="15" y1="75" x2="85" y2="75" stroke={stroke} strokeWidth="0.15" />
        <line x1="15" y1="78" x2="60" y2="78" stroke={stroke} strokeWidth="0.15" />
      </>
    ),
    path: { x: [15, 27, 39, 51, 77, 85, 15], y: [25, 25, 25, 25, 25, 75, 25] },
  },
  gallery: {
    shapes: (
      <>
        {[0, 1, 2].map((i) => (
          <rect
            key={`r${i}`}
            x={12 + i * 14} y={20 + (i % 2) * 8} width="10" height="10"
            fill="none" stroke={stroke} strokeWidth="0.15"
          />
        ))}
        <motion.polygon
          points="75,20 88,32 75,44 62,32"
          fill={fillSoft} stroke={stroke} strokeWidth="0.15"
          animate={{ rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "75% 32%" }}
        />
        <circle cx="30" cy="72" r="6" fill="none" stroke={stroke} strokeWidth="0.15" />
        <line x1="50" y1="70" x2="80" y2="70" stroke={stroke} strokeWidth="0.15" />
        <line x1="50" y1="75" x2="70" y2="75" stroke={stroke} strokeWidth="0.15" />
      </>
    ),
    path: { x: [17, 31, 45, 75, 30, 80, 17], y: [25, 33, 25, 32, 72, 70, 25] },
  },
};

const fallback: Variant = {
  shapes: (
    <>
      <circle cx="20" cy="30" r="8" fill="none" stroke={stroke} strokeWidth="0.15" />
      <rect x="65" y="20" width="14" height="14" fill="none" stroke={stroke} strokeWidth="0.15" />
      <line x1="20" y1="70" x2="80" y2="70" stroke={stroke} strokeWidth="0.15" />
    </>
  ),
  path: { x: [20, 72, 80, 20], y: [30, 27, 70, 30] },
};

export function HeroGeometricOverlay({ pageKey }: HeroGeometricOverlayProps) {
  const variant = (pageKey && variants[pageKey]) || fallback;
  const duration = Math.max(12, variant.path.x.length * 2.5);

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      aria-hidden="true"
    >
      {/* Subtle grid */}
      <defs>
        <pattern id="hero-grid" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.1" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#hero-grid)" opacity="0.6" />

      {variant.shapes}

      {/* Traveling green dot */}
      <motion.circle
        r="0.9"
        fill="#62AD4E"
        animate={{ cx: variant.path.x, cy: variant.path.y }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          times: variant.path.x.map((_, i) => i / (variant.path.x.length - 1)),
        }}
        style={{ filter: "drop-shadow(0 0 1.2px rgba(98,173,78,0.9))" }}
      />
      <motion.circle
        r="2.2"
        fill="rgba(98,173,78,0.18)"
        animate={{ cx: variant.path.x, cy: variant.path.y }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          times: variant.path.x.map((_, i) => i / (variant.path.x.length - 1)),
        }}
      />
    </svg>
  );
}

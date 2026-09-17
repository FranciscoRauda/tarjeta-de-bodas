import type { ReactNode } from "react";
import { wedding } from "@/lib/wedding";

export function LeafDivider({ className = "" }: { className?: string }) {
  return (
    <svg className={`leaf-divider ${className}`} viewBox="0 0 180 30" fill="none" aria-hidden>
      <path d="M90 15c-18-8-36-10-54-8 16 2 28 8 54 8 26 0 38-6 54-8-18-2-36 0-54 8Z" fill="currentColor" opacity="0.35" />
      <path d="M90 15c-10-6-22-8-34-6M90 15c10-6 22-8 34-6" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <ellipse cx="62" cy="14" rx="8" ry="4" transform="rotate(-30 62 14)" fill="currentColor" opacity="0.4" />
      <ellipse cx="118" cy="14" rx="8" ry="4" transform="rotate(30 118 14)" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

export function GarlandArch({ className = "" }: { className?: string }) {
  return (
    <svg className={`garland-arch ${className}`} viewBox="0 0 240 80" fill="none" aria-hidden>
      <path d="M20 62 Q120 4 220 62" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
      <ellipse cx="50" cy="48" rx="10" ry="5" transform="rotate(-35 50 48)" fill="currentColor" opacity="0.35" />
      <ellipse cx="90" cy="28" rx="11" ry="5" transform="rotate(-20 90 28)" fill="currentColor" opacity="0.4" />
      <ellipse cx="120" cy="20" rx="12" ry="5" fill="currentColor" opacity="0.45" />
      <ellipse cx="150" cy="28" rx="11" ry="5" transform="rotate(20 150 28)" fill="currentColor" opacity="0.4" />
      <ellipse cx="190" cy="48" rx="10" ry="5" transform="rotate(35 190 48)" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

export function BotanicalEnvLeft({ className = "" }: { className?: string }) {
  return (
    <svg className={`bouquet ${className}`} viewBox="0 0 160 200" fill="none" aria-hidden>
      <path d="M80 190 C70 140 72 90 80 40" stroke="#7C8B6B" strokeWidth="1.5" opacity="0.7" />
      <path d="M80 120 C55 100 40 70 35 45" stroke="#7C8B6B" strokeWidth="1.2" opacity="0.55" />
      <path d="M80 130 C105 108 120 78 125 50" stroke="#7C8B6B" strokeWidth="1.2" opacity="0.55" />
      <ellipse cx="38" cy="42" rx="14" ry="7" transform="rotate(-40 38 42)" fill="#fff" opacity="0.9" />
      <ellipse cx="52" cy="38" rx="12" ry="6" transform="rotate(-25 52 38)" fill="#fff" opacity="0.85" />
      <ellipse cx="66" cy="36" rx="11" ry="5" transform="rotate(-10 66 36)" fill="#fff" opacity="0.8" />
      <ellipse cx="122" cy="48" rx="12" ry="6" transform="rotate(30 122 48)" fill="#fff" opacity="0.85" />
      <ellipse cx="108" cy="42" rx="11" ry="5" transform="rotate(15 108 42)" fill="#fff" opacity="0.8" />
    </svg>
  );
}

export function BotanicalEnvRight({ className = "" }: { className?: string }) {
  return (
    <svg className={`bouquet es-rama ${className}`} viewBox="0 0 140 180" fill="none" aria-hidden>
      <path d="M20 170 C40 120 60 70 90 20" stroke="#7C8B6B" strokeWidth="1.4" opacity="0.65" />
      <ellipse cx="55" cy="55" rx="14" ry="7" transform="rotate(-38 55 55)" fill="#7C8B6B" opacity="0.35" />
      <ellipse cx="78" cy="42" rx="13" ry="6" transform="rotate(-28 78 42)" fill="#7C8B6B" opacity="0.3" />
      <ellipse cx="98" cy="32" rx="12" ry="6" transform="rotate(-18 98 32)" fill="#7C8B6B" opacity="0.28" />
      <ellipse cx="68" cy="88" rx="15" ry="7" transform="rotate(-42 68 88)" fill="#7C8B6B" opacity="0.32" />
      <ellipse cx="92" cy="72" rx="14" ry="7" transform="rotate(-32 92 72)" fill="#7C8B6B" opacity="0.3" />
    </svg>
  );
}

export function GoldSeal({ className = "" }: { className?: string }) {
  const initials = wedding.couple.initials;

  return (
    <div className={`gold-seal ${className}`}>
      <svg viewBox="0 0 120 120" fill="none" aria-hidden>
        <defs>
          <radialGradient id="seal-gold" cx="36%" cy="28%" r="72%">
            <stop offset="0%" stopColor="#FFF6E0" />
            <stop offset="28%" stopColor="#E8C878" />
            <stop offset="62%" stopColor="#C6A15B" />
            <stop offset="100%" stopColor="#6E5210" />
          </radialGradient>
          <filter id="seal-shadow">
            <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#4A3810" floodOpacity="0.4" />
          </filter>
        </defs>
        <path
          filter="url(#seal-shadow)"
          d="M60 14
             C70 10 80 12 88 18 C96 12 108 10 118 16
             C124 24 122 36 120 48 C124 60 122 72 116 82
             C108 92 96 94 86 98 C76 104 64 104 54 98
             C44 94 32 92 24 82 C18 72 16 60 20 48
             C18 36 16 24 22 16 C32 10 44 12 52 18
             C56 14 58 14 60 14 Z"
          fill="url(#seal-gold)"
        />
        <ellipse cx="42" cy="36" rx="20" ry="11" fill="rgba(255,248,225,0.4)" />
        <ellipse cx="78" cy="72" rx="14" ry="8" fill="rgba(90,65,15,0.12)" />
      </svg>
      <span className="gold-seal-monogram">{initials}</span>
    </div>
  );
}

export function PergaminoCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`pergamino-card ${className}`}>
      <LeafDivider />
      {children}
    </div>
  );
}

export function DetailCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <article className={`detail-card ${className}`}>
      <h3 className="detail-card-title">{title}</h3>
      <div className="detail-card-body">{children}</div>
    </article>
  );
}

export function DressCodeBadge() {
  return (
    <div className="dress-badge" aria-hidden>
      <span>{wedding.dressCode.title}</span>
    </div>
  );
}

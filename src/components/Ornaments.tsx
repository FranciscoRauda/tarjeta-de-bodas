import type { ReactNode } from "react";
import { wedding } from "@/lib/wedding";

export function RibbonLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`ribbon-label ${className}`}>{children}</p>;
}

export function RingsIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`rings-icon ${className}`} viewBox="0 0 52 30" fill="none" aria-hidden>
      <circle cx="18" cy="15" r="10" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="34" cy="15" r="10" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

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
  const { partnerOne, partnerTwo, initials } = wedding.couple;

  return (
    <div className={`gold-seal ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/img/gold-seal.png"
        alt=""
        width={512}
        height={512}
        className="gold-seal-art"
        aria-hidden
        decoding="async"
      />
      <span className="gold-seal-monogram" aria-label={initials}>
        <span className="gold-seal-letter">{partnerOne.first[0]}</span>
        <span className="gold-seal-dot" aria-hidden>
          ·
        </span>
        <span className="gold-seal-letter">{partnerTwo.first[0]}</span>
      </span>
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

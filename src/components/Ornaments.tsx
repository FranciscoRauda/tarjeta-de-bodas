import type { ReactNode } from "react";
import { wedding } from "@/lib/wedding";

export function LaceCard({
  children,
  className = "",
  seal = false,
}: {
  children: ReactNode;
  className?: string;
  seal?: boolean;
}) {
  return (
    <div className={`lace-card ${className}`}>
      {seal ? <WaxSealBadge className="lace-card-seal" /> : null}
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
    <div className={`detail-card ${className}`}>
      <span className="detail-corner detail-corner-tl" aria-hidden />
      <span className="detail-corner detail-corner-tr" aria-hidden />
      <span className="detail-corner detail-corner-bl" aria-hidden />
      <span className="detail-corner detail-corner-br" aria-hidden />
      <h3 className="detail-card-title">{title}</h3>
      <div className="detail-card-body">{children}</div>
    </div>
  );
}

export function WaxSealBadge({ className = "" }: { className?: string }) {
  const a = wedding.couple.partnerOne.first[0];
  const b = wedding.couple.partnerTwo.first[0];

  return (
    <span className={`wax-badge ${className}`} aria-hidden>
      <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
        <circle cx="27" cy="27" r="26" fill="#b8b0a4" />
        <circle cx="27" cy="27" r="22" fill="#c4bcb0" />
        <circle cx="27" cy="27" r="20" fill="none" stroke="#ddd6cb" strokeWidth="0.8" opacity="0.8" />
      </svg>
      <span className="wax-badge-text">
        {a}
        <em>&</em>
        {b}
      </span>
    </span>
  );
}

export function EnvelopeGraphic({ className = "" }: { className?: string }) {
  const a = wedding.couple.partnerOne.first[0];
  const b = wedding.couple.partnerTwo.first[0];

  return (
    <div className={`cover-envelope ${className}`} aria-hidden>
      <div className="cover-envelope-body">
        <svg className="cover-envelope-floral" viewBox="0 0 240 120" fill="none">
          <path
            d="M120 8c-18 28-42 38-68 42 24 6 46 20 68 48 22-28 44-42 68-48-26-4-50-14-68-42Z"
            fill="rgba(180,170,155,0.18)"
          />
          <path
            d="M120 28c-8 12-20 16-32 18 10 2 18 8 32 22 14-14 22-20 32-22-12-2-24-6-32-18Z"
            stroke="rgba(150,140,125,0.35)"
            strokeWidth="0.8"
          />
          <path
            d="M88 52c6-8 14-10 22-8M152 52c-6-8-14-10-22-8"
            stroke="rgba(150,140,125,0.28)"
            strokeWidth="0.7"
          />
          <circle cx="120" cy="42" r="4" fill="rgba(150,140,125,0.22)" />
        </svg>
      </div>
      <div className="cover-envelope-flap">
        <svg className="cover-envelope-floral" viewBox="0 0 240 100" fill="none">
          <path
            d="M120 92c-22-18-48-28-76-32 26-4 50-16 76-38 26 22 50 34 76 38-28 4-54 14-76 32Z"
            fill="rgba(175,165,150,0.15)"
          />
          <path
            d="M120 70c-10 8-22 12-36 14 12 2 22 8 36 20 14-12 24-18 36-20-14-2-26-6-36-14Z"
            stroke="rgba(140,130,115,0.32)"
            strokeWidth="0.75"
          />
        </svg>
        <span className="cover-envelope-seal">
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
            <circle cx="26" cy="26" r="25" fill="#b5aea2" />
            <circle cx="26" cy="26" r="21" fill="#c2bab0" />
          </svg>
          <span className="cover-envelope-seal-text">
            {a}
            <em>&</em>
            {b}
          </span>
        </span>
      </div>
    </div>
  );
}

export function DressCodeBadge() {
  return (
    <div className="dress-badge" aria-hidden>
      <span>Código de vestimenta</span>
    </div>
  );
}

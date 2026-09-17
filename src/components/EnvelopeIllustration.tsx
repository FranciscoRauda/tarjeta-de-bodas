import Image from "next/image";

export function EnvelopeIllustration() {
  return (
    <Image
      src="/img/envelope-back.png"
      alt=""
      fill
      priority
      sizes="(max-width: 768px) 84vw, 420px"
      className="env-sheet-img"
      draggable={false}
      aria-hidden
    />
  );
}

import Image from "next/image";

type LogoProps = {
  className?: string;
  tone?: "dark" | "light";
};

/* Mark: una "O" di Oasi che racchiude una foglia e una linea di riflesso,
   usata come segno compatto nei mock UI. */
export function OasiMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M20 9c5 3 7.5 6.5 7.5 11 0 4.2-3.2 7.5-7.5 7.5S12.5 24.2 12.5 20c0-4.5 2.5-8 7.5-11z"
        fill="currentColor"
        opacity="0.16"
      />
      <path
        d="M20 27.5c0-6 1.4-10.4 5.2-14.2M20 27.5c0-6-1.4-10.4-5.2-14.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M13.5 22.5c2 .9 3.6 1.2 6.5 1.2s4.5-.3 6.5-1.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* Logo ufficiale Oasi Properties (palma + wordmark).
   Verde su fondo chiaro, bianco su fondo scuro. */
export function Logo({ className = "", tone = "dark" }: LogoProps) {
  const src = tone === "light" ? "/logo-oasi-white.png" : "/logo-oasi.png";
  return (
    <Image
      src={src}
      alt="Oasi Properties"
      width={202}
      height={100}
      priority
      className={`h-9 w-auto ${className}`}
    />
  );
}

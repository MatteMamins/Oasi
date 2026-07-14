import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

export const IconShield = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export const IconTrend = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 17l5-5 3 3 7-8" />
    <path d="M14 7h4v4" />
  </svg>
);

export const IconGuests = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M16 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1" />
    <circle cx="9.5" cy="8" r="3" />
    <path d="M17 4a3 3 0 0 1 0 6" />
    <path d="M21 20v-1a4 4 0 0 0-3-3.8" />
  </svg>
);

export const IconCare = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 13a8 8 0 0 1 16 0v4a2 2 0 0 1-2 2h-1v-6h3" />
    <path d="M4 13v4a2 2 0 0 0 2 2h1v-6H4" />
  </svg>
);

export const IconDoc = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5" />
    <path d="M9 13h6M9 17h4" />
  </svg>
);

export const IconTax = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="6" y="3" width="12" height="18" rx="2" />
    <path d="M9 8l6 8" />
    <circle cx="9.5" cy="8.5" r="0.6" fill="currentColor" />
    <circle cx="14.5" cy="15.5" r="0.6" fill="currentColor" />
  </svg>
);

export const IconMarketing = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 11v2a1 1 0 0 0 1 1h3l4 4V6L7 10H4a1 1 0 0 0-1 1z" />
    <path d="M16 9a3 3 0 0 1 0 6" />
    <path d="M18.5 6.5a6 6 0 0 1 0 11" />
  </svg>
);

export const IconTag = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 4h7l9 9-7 7-9-9V4z" />
    <circle cx="8" cy="8" r="1.4" />
  </svg>
);

export const IconUserCheck = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3 20v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 3 1" />
    <path d="M16 18l2 2 4-4" />
  </svg>
);

export const IconChart = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 4v16h16" />
    <path d="M8 15v3M12 10v8M16 13v5M20 7v11" />
  </svg>
);

export const IconApp = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="7" y="3" width="10" height="18" rx="2.5" />
    <path d="M11 18h2" />
  </svg>
);

export const IconArrow = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

export const IconStar = (p: IconProps) => (
  <svg {...base({ ...p, fill: "currentColor", stroke: "none" })}>
    <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5z" />
  </svg>
);

export const IconCamera = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
    <circle cx="12" cy="13" r="3.2" />
  </svg>
);

export const IconCalendar = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="4" y="5" width="16" height="16" rx="2" />
    <path d="M4 9h16M8 3v4M16 3v4" />
  </svg>
);

export const IconCheck = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export const IconPin = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 21c4-4 7-7.2 7-11a7 7 0 0 0-14 0c0 3.8 3 7 7 11z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

export const IconExternal = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M14 5h5v5" />
    <path d="M19 5l-7 7" />
    <path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
  </svg>
);

export const IconChevronDown = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const IconMenu = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const IconClose = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const IconQuote = (p: IconProps) => (
  <svg {...base({ ...p, fill: "currentColor", stroke: "none" })}>
    <path d="M10 7H5a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h3v3H6a1 1 0 0 1 0 0c1.8 0 3-1.5 3-3.5V8a1 1 0 0 0 1-1zm10 0h-5a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h3v3h-2c1.8 0 3-1.5 3-3.5V8a1 1 0 0 0 1-1z" />
  </svg>
);

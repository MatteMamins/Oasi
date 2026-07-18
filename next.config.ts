import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Le navigazioni via <Link> vengono avvolte in document.startViewTransition:
  // serve per la rotazione "a carta" tra landing proprietari e pagina Partner.
  experimental: { viewTransition: true },
};

export default nextConfig;

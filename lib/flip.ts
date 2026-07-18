/* Marca su <html> la direzione del passaggio proprietari ⇄ partner:
   il CSS in globals.css la usa per ruotare la pagina come una carta
   durante la view transition. L'attributo si auto-rimuove a fine giro. */
export function primeFlip(dir: "partner" | "owner") {
  const el = document.documentElement;
  el.dataset.flip = dir;
  window.setTimeout(() => {
    if (el.dataset.flip === dir) delete el.dataset.flip;
  }, 1000);
}

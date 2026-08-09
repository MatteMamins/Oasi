/* Lo smooth scroll è piacevole sui salti brevi, ma dal menu al modulo ci sono
   otto schermate: su mobile diventa un'attesa di secondi, con tutti i reveal
   che scattano lungo la strada. Oltre questa soglia si salta diretti. */
const LONG_JUMP_SCREENS = 3;

export function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return false;

  const distance = Math.abs(target.getBoundingClientRect().top);
  target.scrollIntoView({
    behavior:
      distance > window.innerHeight * LONG_JUMP_SCREENS ? "instant" : "smooth",
    block: "start",
  });

  /* Il salto manuale non sposta il focus come farebbe il browser: lo facciamo
     noi, così tastiera e screen reader restano allineati a ciò che si vede. */
  if (target.hasAttribute("tabindex")) target.focus({ preventScroll: true });
  return true;
}

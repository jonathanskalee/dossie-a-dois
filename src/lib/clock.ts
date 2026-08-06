/**
 * Fonte de tempo do jogo.
 *
 * O store nunca chama `Date.now()` direto: assim os testes conseguem simular
 * uma sessão longa, um resume dias depois ou o cronômetro do caso sem timers
 * falsos e sem esperar de verdade.
 */

const realClock = () => Date.now();
let source: () => number = realClock;

export function now(): number {
  return source();
}

/** Só para testes. */
export function setClock(fn: () => number) {
  source = fn;
}

/** Só para testes. */
export function resetClock() {
  source = realClock;
}

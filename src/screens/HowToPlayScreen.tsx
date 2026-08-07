/**
 * Como se joga — a primeira coisa que a dupla vê antes do arquivo de casos.
 *
 * Ensina mostrando: os destaques de alegação e de fato aparecem aqui com as
 * mesmas marcas do jogo, e o cruzamento fala × prova é a própria faixa que a
 * Mesa monta na hora de registrar. Quem leu esta tela reconhece a peça quando
 * ela aparecer de verdade.
 *
 * A numeração não é enfeite: é a ordem em que a noite acontece.
 */
import type { ReactNode } from "react";
import { useGame } from "../store/gameStore";
import { BigButton, RoleBadge, TopBar } from "../components/ui";
import { IconBalanca, IconLupa, IconRaio } from "../components/icons";

function Passo(props: { n: number; titulo: string; children: ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-accent/50 font-display text-lg text-accent">
        {props.n}
      </span>
      <div className="min-w-0 flex-1 pt-1">
        <h2 className="font-display text-xl leading-tight text-fg">{props.titulo}</h2>
        <div className="mt-2 leading-relaxed text-muted">{props.children}</div>
      </div>
    </li>
  );
}

export function HowToPlayScreen() {
  const goTitle = useGame((s) => s.goTitle);
  const finish = useGame((s) => s.finishHowToPlay);
  const jaSabia = useGame((s) => s.settings.onboarded);

  return (
    <main className="mx-auto min-h-dvh max-w-2xl px-5 pb-[calc(28px+env(safe-area-inset-bottom))]">
      <TopBar title="Como se joga" onBack={goTitle} />

      <p className="anim-fade-up mb-8 mt-1 text-lg leading-relaxed text-muted">
        Um crime, duas pessoas e um tablet só. Cada um de vocês enxerga metade da verdade — e o jogo
        não junta as metades por vocês.
      </p>

      <ol className="flex flex-col gap-8">
        <Passo n={1} titulo="Dividam os papéis">
          <div className="mb-3 flex flex-wrap gap-2">
            <RoleBadge role="detective" />
            <RoleBadge role="perito" />
          </div>
          O Detetive interroga os suspeitos. O Perito examina as provas. Decidam agora quem é quem —
          vale trocar a cada caso.
        </Passo>

        <Passo n={2} titulo="O tablet passa de mão em mão">
          Cada papel vê só o seu lado do dossiê. Na troca, aparece uma tela de passagem que exige
          segurar o botão: assim um toque sem querer não entrega o lado do outro.
        </Passo>

        <Passo n={3} titulo="Anotem o que está destacado">
          Nos depoimentos, os trechos <mark className="mark-claim">destacados</mark> são{" "}
          <strong className="text-fg">alegações</strong> — o que alguém <em>afirma</em>. Nos laudos, os
          trechos <mark className="mark-fact">destacados</mark> são{" "}
          <strong className="text-fg">fatos</strong> — o que a prova <em>mostra</em>.
        </Passo>

        <Passo n={4} titulo="Cruzem fala com prova na Mesa">
          Quando uma alegação bate de frente com um fato, vocês têm uma contradição. Ela derruba a
          mentira e costuma abrir pistas novas — mais suspeitos, mais perguntas, mais provas.
          <div className="mt-4 flex items-center gap-2 text-xs leading-tight">
            <span className="flex-1 rounded-lg bg-accent/15 px-2.5 py-2 text-accent">
              “fiquei no palco a noite toda”
            </span>
            <IconRaio className="size-5 shrink-0 text-danger" />
            <span className="flex-1 rounded-lg bg-accent2/15 px-2.5 py-2 text-accent2">
              foto de 23h40: o palco está vazio
            </span>
          </div>
        </Passo>

        <Passo n={5} titulo="Acusem: quem, como e por quê">
          <p className="flex items-center gap-2 font-semibold text-danger">
            <IconBalanca className="size-5 shrink-0" />
            Não há segunda chance.
          </p>
          <p className="mt-1.5">
            O epílogo conta a verdade inteira e vocês recebem uma nota de 0 a 100.
          </p>
        </Passo>
      </ol>

      {/* a regra que faz o jogo funcionar merece sair da lista */}
      <section className="panel anim-fade-up mt-10 p-6">
        <p className="flex items-center gap-2 font-display text-sm uppercase tracking-[0.2em] text-accent">
          <IconLupa /> A regra que faz o jogo
        </p>
        <p className="mt-3 text-lg leading-relaxed text-fg">
          Contem tudo em voz alta, um para o outro.
        </p>
        <p className="mt-2 leading-relaxed text-muted">
          Ninguém vê os dois lados. Se vocês não conversarem, a contradição nunca aparece — e o caso
          não fecha. Travou? A Mesa tem um botão de dica, e o caderno guarda tudo o que já
          descobriram.
        </p>
      </section>

      <div className="anim-fade-up mt-8 flex flex-col gap-3">
        <BigButton onClick={finish} className="w-full">
          {jaSabia ? "Voltar ao arquivo de casos" : "Entendemos, abrir o arquivo"}
        </BigButton>
        <BigButton onClick={goTitle} variant="ghost" className="w-full">
          Voltar à capa
        </BigButton>
      </div>
    </main>
  );
}

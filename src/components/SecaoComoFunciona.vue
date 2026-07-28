<template>
  <section id="como-funciona" class="funciona">
    <h2>{{ comoFunciona.titulo }}</h2>

    <div class="funciona__abordagens">
      <article v-for="abordagem in comoFunciona.abordagens" :key="abordagem.nome" class="cartao">
        <h3>{{ abordagem.nome }}</h3>
        <p>{{ escolherTexto(abordagem.texto, linguagem) }}</p>
      </article>
    </div>

    <h3 class="funciona__subtitulo">{{ comoFunciona.tituloEtapas }}</h3>

    <ol class="funciona__etapas">
      <li v-for="(etapa, indice) in comoFunciona.etapas" :key="etapa.nome" class="etapa">
        <span class="etapa__numero" aria-hidden="true">{{ indice + 1 }}</span>
        <div>
          <h4>{{ etapa.nome }}</h4>
          <p>{{ escolherTexto(etapa.texto, linguagem) }}</p>
        </div>
      </li>
    </ol>
  </section>
</template>

<script setup lang="ts">
import { usePreferenciasLeitura } from 'src/composables/usePreferenciasLeitura';
import { comoFunciona, escolherTexto } from 'src/conteudo';

const { linguagem } = usePreferenciasLeitura();
</script>

<style scoped>
.funciona__abordagens {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--s-4);
  margin: var(--s-5) 0 var(--s-8);
}

.cartao {
  background: var(--surface);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: var(--s-5);
}

.cartao h3 {
  margin-bottom: var(--s-2);
}

.cartao p {
  font-size: 0.94rem;
  color: var(--ink-soft);
}

.funciona__subtitulo {
  margin-bottom: var(--s-5);
}

.funciona__etapas {
  display: grid;
  gap: var(--s-5);
  list-style: none;
  counter-reset: etapa;
}

.etapa {
  display: flex;
  gap: var(--s-4);
  align-items: flex-start;
}

.etapa__numero {
  flex: none;
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  font-family: var(--font-numeral);
  font-weight: var(--display-weight);
  font-size: 0.9rem;
  background: var(--accent);
  color: var(--accent-ink);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius);
}

.etapa h4 {
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 1.04rem;
  line-height: 1.35;
  margin-bottom: var(--s-1);
}

.etapa p {
  font-size: 0.96rem;
  color: var(--ink-soft);
  max-width: var(--largura-leitura);
}
</style>

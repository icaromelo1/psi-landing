<template>
  <div>
    <a class="pular" href="#conteudo">{{ rotulos.pularParaConteudo }}</a>

    <CabecalhoSite />

    <main id="conteudo" class="pagina">
      <SecaoInicio />
      <SecaoPublicos class="bloco" />
      <SecaoComoFunciona class="bloco" />
      <SecaoSobre class="bloco" />
      <SecaoResponsaveis class="bloco" />
      <SecaoPoliticas class="bloco" />
      <SecaoDuvidas class="bloco" />
      <SecaoChamada class="bloco" />
      <RodapeSite />
    </main>

    <PainelPreferencias />
  </div>
</template>

<script setup lang="ts">
import CabecalhoSite from 'src/components/CabecalhoSite.vue';
import PainelPreferencias from 'src/components/PainelPreferencias.vue';
import RodapeSite from 'src/components/RodapeSite.vue';
import SecaoChamada from 'src/components/SecaoChamada.vue';
import SecaoComoFunciona from 'src/components/SecaoComoFunciona.vue';
import SecaoDuvidas from 'src/components/SecaoDuvidas.vue';
import SecaoInicio from 'src/components/SecaoInicio.vue';
import SecaoPoliticas from 'src/components/SecaoPoliticas.vue';
import SecaoPublicos from 'src/components/SecaoPublicos.vue';
import SecaoResponsaveis from 'src/components/SecaoResponsaveis.vue';
import SecaoSobre from 'src/components/SecaoSobre.vue';
import { rotulos } from 'src/conteudo';
</script>

<style scoped>
.pagina {
  position: relative;
  z-index: 1;
  max-width: var(--largura-conteudo);
  margin: 0 auto;
  padding: 0 var(--s-6);
}

.bloco {
  display: block;
  padding: var(--s-8) 0;
}

.pular {
  position: fixed;
  left: var(--s-4);
  top: -100px;
  z-index: 40;
  padding: var(--s-3) var(--s-5);
  background: var(--accent);
  color: var(--accent-ink);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius);
  font-weight: 700;
  text-decoration: none;
  transition: top 0.2s ease;
}

.pular:focus {
  top: var(--s-4);
}
</style>

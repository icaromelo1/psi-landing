<template>
  <header class="cabecalho">
    <div class="cabecalho__interno">
      <span class="cabecalho__marca">{{ identidade.nome }}</span>

      <nav class="cabecalho__nav" :aria-label="'Seções da página'">
        <a v-for="item in navegacao" :key="item.ancora" :href="item.ancora">{{ item.rotulo }}</a>
      </nav>

      <BotaoWhatsapp class="cabecalho__cta" />
    </div>
  </header>
</template>

<script setup lang="ts">
import BotaoWhatsapp from 'src/components/BotaoWhatsapp.vue';
import { identidade } from 'src/configuracaoSite';
import { navegacao } from 'src/conteudo';
</script>

<style scoped>
.cabecalho {
  position: sticky;
  top: 0;
  z-index: 20;
  background: var(--bg);
  border-bottom: var(--border-width) solid var(--border);
}

.cabecalho__interno {
  max-width: var(--largura-conteudo);
  margin: 0 auto;
  padding: var(--s-3) var(--s-6);
  display: flex;
  align-items: center;
  gap: var(--s-5);
}

.cabecalho__marca {
  font-family: var(--font-display);
  font-weight: var(--display-weight);
  letter-spacing: var(--display-tracking);
  font-size: calc(1rem * var(--display-scale));
}

.cabecalho__nav {
  display: flex;
  gap: var(--s-5);
  margin-left: auto;
  font-size: 0.94rem;
}

.cabecalho__nav a {
  display: flex;
  align-items: center;
  min-height: 44px;
  color: var(--ink);
  text-decoration: none;
  border-bottom: 2px solid transparent;
}

.cabecalho__nav a:hover {
  border-bottom-color: var(--primary);
}

.cabecalho__cta {
  min-height: 44px;
  padding: var(--s-2) var(--s-4);
  font-size: 0.92rem;
}

@media (max-width: 900px) {
  .cabecalho__nav {
    display: none;
  }

  .cabecalho__cta {
    margin-left: auto;
  }
}
</style>

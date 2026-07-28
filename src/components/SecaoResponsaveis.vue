<template>
  <section id="responsaveis" class="responsaveis">
    <h2>{{ responsaveis.titulo }}</h2>

    <p
      v-for="(paragrafo, indice) in responsaveis.paragrafos"
      :key="indice"
      class="responsaveis__paragrafo"
    >
      {{ escolherTexto(paragrafo, linguagem) }}
    </p>
  </section>
</template>

<script setup lang="ts">
import { usePreferenciasLeitura } from 'src/composables/usePreferenciasLeitura';
import { escolherTexto, responsaveis } from 'src/conteudo';

const { linguagem } = usePreferenciasLeitura();
</script>

<style scoped>
.responsaveis {
  background: var(--surface);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: var(--s-7) var(--s-6);
}

.responsaveis__paragrafo {
  margin-top: var(--s-4);
  max-width: var(--largura-leitura);
  color: var(--ink-soft);
}
</style>

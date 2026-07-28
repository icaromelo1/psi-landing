<template>
  <section id="duvidas" class="duvidas">
    <h2>{{ duvidas.titulo }}</h2>

    <div class="duvidas__lista">
      <details v-for="item in duvidas.itens" :key="item.pergunta" class="duvida">
        <summary>{{ item.pergunta }}</summary>
        <p>{{ escolherTexto(item.resposta, linguagem) }}</p>
      </details>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePreferenciasLeitura } from 'src/composables/usePreferenciasLeitura';
import { duvidas, escolherTexto } from 'src/conteudo';

const { linguagem } = usePreferenciasLeitura();
</script>

<style scoped>
.duvidas__lista {
  display: grid;
  gap: var(--s-3);
  margin-top: var(--s-5);
}

.duvida {
  background: var(--surface);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius);
  padding: var(--s-4) var(--s-5);
}

.duvida summary {
  font-weight: 700;
  cursor: pointer;
  list-style: none;
  display: flex;
  align-items: center;
  gap: var(--s-3);
  min-height: 44px;
}

.duvida summary::-webkit-details-marker {
  display: none;
}

.duvida summary::before {
  content: '';
  flex: none;
  width: 0;
  height: 0;
  border-left: 8px solid var(--primary);
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  transition: transform 0.2s ease;
}

.duvida[open] summary::before {
  transform: rotate(90deg);
}

.duvida p {
  font-size: 0.95rem;
  color: var(--ink-soft);
  margin-top: var(--s-3);
  padding-left: var(--s-5);
  max-width: var(--largura-leitura);
}
</style>

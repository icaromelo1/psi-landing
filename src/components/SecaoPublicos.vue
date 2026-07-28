<template>
  <section id="publicos" class="publicos">
    <h2>{{ publicos.titulo }}</h2>
    <p class="publicos__introducao">{{ introducao }}</p>

    <ul class="publicos__lista">
      <li v-for="item in publicos.itens" :key="item.nome" class="cartao">
        <h3>{{ item.nome }}</h3>
        <p>{{ escolherTexto(item.texto, linguagem) }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePreferenciasLeitura } from 'src/composables/usePreferenciasLeitura';
import { escolherTexto, publicos } from 'src/conteudo';

const { linguagem } = usePreferenciasLeitura();

const introducao = computed(() => escolherTexto(publicos.introducao, linguagem.value));
</script>

<style scoped>
.publicos__introducao {
  color: var(--ink-soft);
  max-width: var(--largura-leitura);
  margin: var(--s-3) 0 var(--s-6);
}

.publicos__lista {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--s-4);
  list-style: none;
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
</style>

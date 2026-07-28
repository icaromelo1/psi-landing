<template>
  <section id="politicas" class="politicas">
    <h2>{{ politicas.titulo }}</h2>
    <p class="politicas__introducao">{{ introducao }}</p>

    <dl class="politicas__lista">
      <div v-for="item in politicas.itens" :key="item.nome" class="politicas__item">
        <dt>{{ item.nome }}</dt>
        <dd>{{ item.texto }}</dd>
      </div>
    </dl>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePreferenciasLeitura } from 'src/composables/usePreferenciasLeitura';
import { escolherTexto, politicas } from 'src/conteudo';

const { linguagem } = usePreferenciasLeitura();

const introducao = computed(() => escolherTexto(politicas.introducao, linguagem.value));
</script>

<style scoped>
.politicas__introducao {
  color: var(--ink-soft);
  max-width: var(--largura-leitura);
  margin: var(--s-3) 0 var(--s-6);
}

.politicas__lista {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--s-4);
}

.politicas__item {
  border-left: 3px solid var(--primary);
  padding-left: var(--s-4);
}

.politicas__item dt {
  font-weight: 700;
  margin-bottom: var(--s-1);
}

.politicas__item dd {
  font-size: 0.94rem;
  color: var(--ink-soft);
}
</style>
